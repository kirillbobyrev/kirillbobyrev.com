// Inlined in <head>, before first paint: apply a stored theme override so
// the page never flashes the OS theme first. See theme-toggle.js.
try {
  const theme = localStorage.getItem("theme");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch {
  // Storage blocked (private mode, sandboxing): follow the OS theme.
}
