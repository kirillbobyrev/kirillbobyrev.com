// Inlined right after the table of contents, before first paint. The
// <details> ships open so it works without JS; this collapses it on
// narrow screens, where it sits above the prose instead of in the rail.
const toc = document.querySelector(".toc");
// Must match the min-width of the rail's media query in article.css.
const wide = window.matchMedia("(min-width: 76rem)");
const sync = () => {
  toc.open = wide.matches;
};
sync();
wide.addEventListener("change", sync);
