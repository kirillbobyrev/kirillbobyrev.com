// Inlined right after the table of contents (page.html), so the first
// part runs before first paint. The <details> ships open so it works
// without JS; collapse it on screens too narrow for the rail. The query
// must match the rail's in article.css.
const toc = document.querySelector(".toc");
const wide = matchMedia("(min-width: 76rem)");
const sync = () => {
  toc.open = wide.matches;
};
sync();
wide.addEventListener("change", sync);

// Mark the section being read: the last heading above a line a third of
// the way down the viewport. The observer's root ends at that line, so
// it reports headings as they cross it instead of measuring every frame.
addEventListener("DOMContentLoaded", () => {
  const links = new Map();
  for (const link of toc.querySelectorAll("a")) {
    const heading = document.getElementById(
      decodeURIComponent(link.hash.slice(1)),
    );
    if (heading) links.set(heading, link);
  }
  const headings = [...links.keys()];
  const above = new Map();
  let current = null;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        above.set(
          entry.target,
          entry.boundingClientRect.top < entry.rootBounds.bottom,
        );
      }
      const next = links.get(headings.findLast((h) => above.get(h))) ?? null;
      if (next === current) return;
      current?.removeAttribute("aria-current");
      next?.setAttribute("aria-current", "location");
      current = next;
    },
    { rootMargin: "0px 0px -67% 0px" },
  );
  for (const heading of headings) observer.observe(heading);
});
