// Draws ```mermaid blocks (render-codeblock-mermaid.html) in the page's
// font, with Mermaid's light or dark theme following the OS; diagrams are
// redrawn from the saved sources when the OS theme changes.
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs";

const blocks = [...document.querySelectorAll("pre.mermaid")];
const sources = blocks.map((el) => el.textContent.trim());
const dark = matchMedia("(prefers-color-scheme: dark)");

let pass = 0;
const render = async () => {
  const n = ++pass;
  // Mermaid measures labels as it lays out, so the font must be loaded.
  await document.fonts.ready;
  mermaid.initialize({
    startOnLoad: false,
    theme: dark.matches ? "redux-dark-color" : "redux-color",
    themeVariables: {
      fontFamily: getComputedStyle(document.body).fontFamily,
      fontSize: "18px",
    },
  });
  for (const [i, el] of blocks.entries()) {
    try {
      const { svg } = await mermaid.render(`mermaid-${n}-${i}`, sources[i]);
      if (pass !== n) return;
      el.innerHTML = svg;
      // Mermaid draws at width 100%, so the panel can't size to the
      // diagram; give the SVG its natural width (CSS still caps it).
      const drawn = el.querySelector("svg");
      const width = drawn?.viewBox.baseVal?.width;
      if (width) drawn.style.width = `${width}px`;
    } catch {
      // Bad diagram source: keep the readable text fallback.
    }
  }
};

render();
dark.addEventListener("change", render);
