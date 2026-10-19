// Site behaviour, bundled by js.Build and inlined at the end of <body>
// (see _partials/script.html). Each part no-ops on pages without its
// element.
import { initThemeToggle } from "./theme-toggle.js";
import { initToTop } from "./to-top.js";
import { initToc } from "./toc.js";

initThemeToggle();
initToTop();
initToc();
