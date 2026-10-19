// The header's light/dark toggle. The default follows the OS through
// CSS; the toggle stores an override in html[data-theme] (applied before
// first paint by theme-init.js) and drops it again when it matches the
// OS, so the site keeps tracking OS changes live.
export function initThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  button.hidden = false;

  const root = document.documentElement;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const system = () => (mq.matches ? "dark" : "light");
  const current = () => root.dataset.theme || system();

  // Embeds (the `embed` shortcode) run in a sandboxed iframe without
  // allow-same-origin: an opaque origin that can't see data-theme or
  // read our localStorage, and that a postMessage targetOrigin of
  // location.origin would never reach - hence "*". Embeds that want to
  // follow the toggle listen for this message (see static/embeds/).
  const broadcast = (theme) => {
    for (const frame of document.querySelectorAll(".embed-frame")) {
      frame.contentWindow?.postMessage({ kbTheme: theme }, "*");
    }
  };

  const apply = (theme) => {
    try {
      if (theme === system()) {
        delete root.dataset.theme;
        localStorage.removeItem("theme");
      } else {
        root.dataset.theme = theme;
        localStorage.setItem("theme", theme);
      }
    } catch {
      // Storage blocked: the override still applies for this page.
    }
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
    broadcast(theme);
  };

  apply(current());
  mq.addEventListener("change", () => apply(current()));
  button.addEventListener("click", () =>
    apply(current() === "dark" ? "light" : "dark"),
  );
  // Lazy embed iframes load after the first apply(); sync each on load.
  for (const frame of document.querySelectorAll(".embed-frame")) {
    frame.addEventListener("load", () => broadcast(current()));
  }
}
