// Marks the section being read in the table of contents: the last
// heading that has scrolled above a line a third of the way down the
// viewport. An IntersectionObserver whose root ends at that line reports
// each heading's position as it crosses, so nothing is measured per
// scroll frame.
export function initToc() {
  const toc = document.querySelector(".toc");
  if (!toc) return;

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
    // Shrink the root to the top third of the viewport.
    { rootMargin: "0px 0px -67% 0px" },
  );
  for (const heading of headings) observer.observe(heading);
}
