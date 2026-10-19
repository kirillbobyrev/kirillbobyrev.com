// Draws ```mermaid blocks (render-codeblock-mermaid.html), only on pages
// that have one. Mermaid's own defaults, with the theme's light or dark
// variant following the OS; diagrams are redrawn from the saved sources
// when it changes. Loaded from the CDN (kept external by js.Build).
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs";

const blocks = [...document.querySelectorAll("pre.mermaid")];
const sources = blocks.map((el) => el.textContent.trim());
const dark = matchMedia("(prefers-color-scheme: dark)");

let pass = 0;
const render = async () => {
  const n = ++pass;
  mermaid.initialize({
    startOnLoad: false,
    theme: dark.matches ? "redux-dark-color" : "redux-color",
  });
  for (const [i, el] of blocks.entries()) {
    try {
      const { svg } = await mermaid.render(`mermaid-${n}-${i}`, sources[i]);
      if (pass === n) el.innerHTML = svg;
    } catch {
      // Bad diagram source: keep the readable text fallback.
    }
  }
};

render();
dark.addEventListener("change", render);
