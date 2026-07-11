// World map for /travel: Equal Earth projection, no dependencies.
// Geography: world-atlas countries-110m (Natural Earth, ISC) fetched as
// TopoJSON and decoded here. Place data comes from the JSON script tag
// rendered by layouts/travel.html out of data/travel.toml.

(async () => {
  const svg = document.getElementById("travel-map");
  if (!svg) return;
  const gCountries = document.getElementById("travel-countries");
  const gDots = document.getElementById("travel-dots");
  const tooltip = document.getElementById("travel-tooltip");
  const places = JSON.parse(
    document.getElementById("travel-places").textContent,
  );

  const W = 920;
  const H = 470;
  const PAD = 8;

  // Display names -> Natural Earth names where they differ.
  const ATLAS_ALIAS = {
    "United States": "United States of America",
    England: "United Kingdom",
    Scotland: "United Kingdom",
    Wales: "United Kingdom",
    Czechia: "Czech Republic",
    "Bosnia and Herzegovina": "Bosnia and Herz.",
  };
  const visited = new Set(places.map((p) => ATLAS_ALIAS[p.country] || p.country));

  const topo = await (
    await fetch("/data/countries-110m.json", { cache: "force-cache" })
  ).json();

  // --- TopoJSON -> per-country polygons (absolute lon/lat coordinates).
  const { scale, translate } = topo.transform;
  const arcs = topo.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
  const ring = (indexes) => {
    const pts = [];
    for (const i of indexes) {
      const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
      // Consecutive arcs share their join point; drop the duplicate.
      pts.push(...(pts.length ? a.slice(1) : a));
    }
    return pts;
  };
  const countries = topo.objects.countries.geometries
    .filter((g) => g.properties.name !== "Antarctica")
    .map((g) => ({
      name: g.properties.name,
      rings:
        g.type === "Polygon"
          ? g.arcs.map(ring)
          : g.type === "MultiPolygon"
            ? g.arcs.flatMap((poly) => poly.map(ring))
            : [],
    }));

  // --- Equal Earth forward projection (Šavrič, Patterson & Jenny 2018).
  const A1 = 1.340264;
  const A2 = -0.081106;
  const A3 = 0.000893;
  const A4 = 0.003796;
  const M = Math.sqrt(3) / 2;
  const RAD = Math.PI / 180;
  const raw = (lon, lat) => {
    const t = Math.asin(M * Math.sin(lat * RAD));
    const t2 = t * t;
    const t6 = t2 * t2 * t2;
    return [
      (lon * RAD * Math.cos(t)) /
        (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2))),
      t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2)),
    ];
  };

  // The frame: the full Equal Earth outline, cropped below 58°S where
  // only Antarctica lives. Sampled as a closed ring of lon/lat points.
  const LAT_MIN = -58;
  const frameRing = [];
  for (let lon = -180; lon <= 180; lon += 2) frameRing.push([lon, 90]);
  for (let lat = 90; lat >= LAT_MIN; lat -= 2) frameRing.push([180, lat]);
  for (let lon = 180; lon >= -180; lon -= 2) frameRing.push([lon, LAT_MIN]);
  for (let lat = LAT_MIN; lat <= 90; lat += 2) frameRing.push([-180, lat]);

  // Fit the frame into the viewBox (y flips: SVG grows down).
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [lon, lat] of frameRing) {
    const [x, y] = raw(lon, lat);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const k = Math.min((W - 2 * PAD) / (maxX - minX), (H - 2 * PAD) / (maxY - minY));
  const tx = (W - k * (minX + maxX)) / 2;
  const ty = (H + k * (minY + maxY)) / 2;
  const project = (lon, lat) => {
    const [x, y] = raw(lon, lat);
    return [x * k + tx, ty - y * k];
  };

  const NS = "http://www.w3.org/2000/svg";
  const fmt = (n) => Math.round(n * 10) / 10;
  const linePath = (pts, close) => {
    let d = "";
    pts.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      d += (i ? "L" : "M") + fmt(x) + "," + fmt(y);
    });
    return close ? d + "Z" : d;
  };
  const addPath = (parent, d, cls) => {
    const el = document.createElementNS(NS, "path");
    el.setAttribute("d", d);
    el.setAttribute("class", cls);
    parent.append(el);
    return el;
  };

  // --- Ocean wash + frame outline.
  addPath(gCountries, linePath(frameRing, true), "map-ocean");

  // --- Render countries. Unvisited land draws as one quiet silhouette
  // (stroke matches fill to seal seams between neighbours); visited
  // countries articulate themselves with the tint and a crisp edge.
  for (const c of countries) {
    let d = "";
    for (const r of c.rings) {
      // Break the path where a ring crosses the antimeridian (Fiji, the
      // Russian far east) so it doesn't streak across the whole map.
      let prevLon = null;
      for (const [lon, lat] of r) {
        const [x, y] = project(lon, lat);
        const jump = prevLon !== null && Math.abs(lon - prevLon) > 180;
        d += (prevLon === null || jump ? "M" : "L") + fmt(x) + "," + fmt(y);
        prevLon = lon;
      }
      d += "Z";
    }
    if (!d) continue;
    addPath(
      gCountries,
      d,
      visited.has(c.name) ? "map-country map-visited" : "map-country",
    );
  }

  // --- Render place dots with hover tooltips.
  const showTip = (p) => {
    tooltip.querySelector(".tip-city").textContent = p.city;
    tooltip.querySelector(".tip-meta").textContent =
      p.country + (p.when ? " · " + p.when : "");
    const rect = svg.getBoundingClientRect();
    const [x, y] = project(p.lon, p.lat);
    tooltip.style.left = (x / W) * rect.width + "px";
    tooltip.style.top = (y / H) * rect.height + "px";
    tooltip.hidden = false;
  };
  for (const p of places) {
    const [x, y] = project(p.lon, p.lat);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "map-dot");
    g.setAttribute("transform", `translate(${fmt(x)},${fmt(y)})`);
    const hit = document.createElementNS(NS, "circle");
    hit.setAttribute("r", "10");
    hit.setAttribute("fill", "transparent");
    const halo = document.createElementNS(NS, "circle");
    halo.setAttribute("r", "7");
    halo.setAttribute("class", "map-dot-halo");
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("r", "3.5");
    dot.setAttribute("class", "map-dot-mark");
    g.append(hit, halo, dot);
    g.addEventListener("pointerenter", () => showTip(p));
    g.addEventListener("pointerleave", () => (tooltip.hidden = true));
    gDots.append(g);
  }
})();
