// Back-to-top link: revealed once the page's title has scrolled away.
// Not the site header - it's sticky, so it never leaves the viewport.
// Observing fires twice per crossing, not on every scroll frame.
export function initToTop() {
  const link = document.querySelector(".to-top");
  const title = document.querySelector("main h1");
  if (!link || !title) return;
  link.hidden = false;
  new IntersectionObserver(([entry]) => {
    link.toggleAttribute(
      "data-visible",
      !entry.isIntersecting && entry.boundingClientRect.top < 0,
    );
  }).observe(title);
}
