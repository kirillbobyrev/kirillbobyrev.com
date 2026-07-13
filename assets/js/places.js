// World map for /places: Equal Earth projection, no dependencies.
// Geography: world-atlas countries-110m (Natural Earth, ISC) fetched as
// TopoJSON and decoded here. Place data comes from the JSON script tag
// rendered by layouts/places.html out of data/places.toml.
//
// Interaction model: hovering a legend name previews a zoom; clicking a
// legend name, a visited country, or any land (which zooms to its
// continent) PINS the view until the same target is clicked again, the
// ocean is clicked, or Escape is pressed.

(async () => {
  const svg = document.getElementById("places-map");
  if (!svg) return;
  const gCountries = document.getElementById("places-map-countries");
  const gDots = document.getElementById("places-map-dots");
  const tooltip = document.getElementById("places-tooltip");
  const places = JSON.parse(document.getElementById("places-data").textContent);

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
  const countryEls = new Map();
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
    const el = addPath(
      gCountries,
      d,
      visited.has(c.name) ? "map-country map-visited" : "map-country",
    );
    if (visited.has(c.name)) countryEls.set(c.name, { el, rings: c.rings });
  }

  // --- View geometry helpers.
  const world = { x: 0, y: 0, w: W, h: H };
  let view = { ...world };
  const dots = [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const viewForBox = (x0, y0, x1, y1) => {
    const pad = Math.max((x1 - x0) * 0.15, (y1 - y0) * 0.15, 12);
    x0 -= pad;
    y0 -= pad;
    x1 += pad;
    y1 += pad;
    // Match the frame's aspect ratio and never zoom past the world view.
    let w = x1 - x0;
    let h = y1 - y0;
    if (w / h > W / H) h = (w * H) / W;
    else w = (h * W) / H;
    w = Math.min(w, W);
    h = Math.min(h, H);
    return { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h };
  };

  const viewForRings = (rings) => {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const r of rings) {
      for (const [lon, lat] of r) {
        const [x, y] = project(lon, lat);
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
    return viewForBox(x0, y0, x1, y1);
  };

  // Sample the edges of a lon/lat box (projection edges curve).
  const boxOfGeoBox = (lonMin, latMin, lonMax, latMax) => {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    const take = (lon, lat) => {
      const [x, y] = project(lon, lat);
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    };
    for (let lon = lonMin; lon <= lonMax; lon += 2) {
      take(lon, latMin);
      take(lon, latMax);
    }
    for (let lat = latMin; lat <= latMax; lat += 2) {
      take(lonMin, lat);
      take(lonMax, lat);
    }
    return [x0, y0, x1, y1];
  };

  // Continents as geographic boxes: [lonMin, latMin, lonMax, latMax].
  const CONTINENTS = [
    ["Europe", -25, 34, 45, 72],
    ["Asia", 25, -11, 180, 78],
    ["Africa", -18, -35, 52, 38],
    ["North America", -168, 7, -52, 84],
    ["South America", -82, -56, -34, 13],
    ["Oceania", 110, -48, 180, 0],
  ];
  const continents = CONTINENTS.map(([name, ...geo]) => {
    const box = boxOfGeoBox(...geo);
    return {
      name,
      box,
      area: (box[2] - box[0]) * (box[3] - box[1]),
      view: viewForBox(...box),
    };
  }).sort((a, b) => a.area - b.area); // smallest first for hit-testing

  // --- Pinned view + animated transitions.
  let pinned = null; // { key, view }
  let animId = 0;

  const applyView = (v) => {
    view = v;
    svg.setAttribute("viewBox", `${v.x} ${v.y} ${v.w} ${v.h}`);
    const z = W / v.w;
    for (const d of dots) {
      d.hit.setAttribute("r", 10 / z);
      d.halo.setAttribute("r", 7 / z);
      d.dot.setAttribute("r", 3.5 / z);
      d.dot.setAttribute("stroke-width", 1.5 / z);
    }
  };

  const animateView = (target, onDone) => {
    tooltip.hidden = true;
    cancelAnimationFrame(animId);
    if (reduced) {
      applyView(target);
      if (onDone) onDone();
      return;
    }
    const from = { ...view };
    const t0 = performance.now();
    const DUR = 320;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / DUR);
      const e = 1 - (1 - t) ** 3;
      applyView({
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        w: from.w + (target.w - from.w) * e,
        h: from.h + (target.h - from.h) * e,
      });
      if (t < 1) animId = requestAnimationFrame(tick);
      else if (onDone) onDone();
    };
    animId = requestAnimationFrame(tick);
  };

  const syncPressed = () => {
    for (const b of document.querySelectorAll(".line-item")) {
      b.setAttribute("aria-pressed", String(b.dataset.key === pinned?.key));
    }
    svg.classList.toggle("is-zoomed", pinned !== null);
  };

  const pin = (key, v, onDone) => {
    pinned = { key, view: v };
    animateView(v, onDone);
    syncPressed();
  };

  const unpin = () => {
    pinned = null;
    animateView({ ...world });
    syncPressed();
  };

  // Click toggles the pin; clicking a different target re-pins.
  const togglePin = (key, v, onDone) => {
    if (pinned?.key === key) unpin();
    else pin(key, v, onDone);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pinned) unpin();
  });

  // Visited countries on the map: click to pin their zoom.
  for (const [name, { el, rings }] of countryEls) {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePin("country:" + name, viewForRings(rings));
    });
  }

  // Anywhere else on the map: land zooms to its continent (smallest
  // matching pixel box wins); ocean or the frame releases the pin.
  svg.addEventListener("click", (e) => {
    const t = e.target;
    if (
      t.classList?.contains("map-country") &&
      !t.classList.contains("map-visited")
    ) {
      const rect = svg.getBoundingClientRect();
      const px = view.x + ((e.clientX - rect.left) / rect.width) * view.w;
      const py = view.y + ((e.clientY - rect.top) / rect.height) * view.h;
      const c = continents.find(
        ({ box: [x0, y0, x1, y1] }) =>
          px >= x0 && px <= x1 && py >= y0 && py <= y1,
      );
      if (c) {
        togglePin("continent:" + c.name, c.view);
        return;
      }
    }
    if (pinned) unpin();
  });

  // --- Render place dots with hover tooltips.
  const showTip = (p) => {
    tooltip.querySelector(".tip-city").textContent = p.city;
    tooltip.querySelector(".tip-meta").textContent =
      p.country + (p.when ? " · " + p.when : "");
    const rect = svg.getBoundingClientRect();
    const [x, y] = project(p.lon, p.lat);
    tooltip.style.left = ((x - view.x) / view.w) * rect.width + "px";
    tooltip.style.top = ((y - view.y) / view.h) * rect.height + "px";
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
    dot.setAttribute("stroke-width", "1.5");
    g.append(hit, halo, dot);
    g.addEventListener("pointerenter", () => showTip(p));
    g.addEventListener("pointerleave", () => (tooltip.hidden = true));
    g.addEventListener("click", (e) => e.stopPropagation());
    gDots.append(g);
    dots.push({ g, hit, halo, dot });
  }

  // --- Legend lines: hovering previews a zoom (with a short delay so
  // sweeping across the line doesn't thrash); clicking pins it.
  const HOVER_DELAY = 120;

  const wireLegend = (btn, key, getView, extra = {}) => {
    btn.dataset.key = key;
    let timer;
    const enter = () => {
      if (extra.onEnter) extra.onEnter();
      if (pinned) return; // previews stay out of the way of a pinned view
      timer = setTimeout(() => animateView(getView(), extra.onShown), HOVER_DELAY);
    };
    const leave = () => {
      clearTimeout(timer);
      if (extra.onLeave) extra.onLeave();
      tooltip.hidden = true;
      if (!pinned) animateView({ ...world });
    };
    btn.addEventListener("pointerenter", enter);
    btn.addEventListener("pointerleave", leave);
    btn.addEventListener("focus", enter);
    btn.addEventListener("blur", leave);
    btn.addEventListener("click", () => {
      clearTimeout(timer);
      togglePin(key, getView(), extra.onShown);
    });
  };

  for (const btn of document.querySelectorAll(".line-item[data-continent]")) {
    const c = continents.find((x) => x.name === btn.dataset.continent);
    if (c) wireLegend(btn, "continent:" + c.name, () => c.view);
  }

  for (const btn of document.querySelectorAll(".line-item[data-country]")) {
    const name = ATLAS_ALIAS[btn.dataset.country] || btn.dataset.country;
    const entry = countryEls.get(name);
    if (!entry) continue;
    wireLegend(btn, "country:" + name, () => viewForRings(entry.rings), {
      onEnter: () => entry.el.classList.add("is-hot"),
      onLeave: () => entry.el.classList.remove("is-hot"),
    });
  }

  for (const btn of document.querySelectorAll(".line-item[data-place]")) {
    const i = Number(btn.dataset.place);
    const p = places[i];
    if (!p) continue;
    const getView = () => {
      const [x, y] = project(p.lon, p.lat);
      const w = W / 7;
      const h = H / 7;
      return { x: x - w / 2, y: y - h / 2, w, h };
    };
    wireLegend(btn, "place:" + i, getView, {
      onEnter: () => dots[i].g.classList.add("is-active"),
      onLeave: () => dots[i].g.classList.remove("is-active"),
      onShown: () => showTip(p),
    });
  }
})();
