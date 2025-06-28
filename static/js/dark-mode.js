// Apply saved theme on page load
if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}

// Toggle dark mode on button click
document.getElementById("dark-mode-toggle")?.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
});
