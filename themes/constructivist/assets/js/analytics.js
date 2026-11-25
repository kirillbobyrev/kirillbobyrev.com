// Google Analytics, loaded once the page is idle instead of during first
// render: gtag.js is ~170KB and ~300ms of main-thread work on a mid-range
// phone, which otherwise competes with fonts and layout. gtag() queues
// into dataLayer from the start, so the page view is still sent; a visit
// shorter than the idle delay goes uncounted.
import params from "@params";

const { id } = params;

window.dataLayer = window.dataLayer || [];
window.gtag = function () {
  // gtag.js reads the arguments object itself, not an array.
  window.dataLayer.push(arguments);
};
gtag("js", new Date());
gtag("config", id);

const load = () => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.append(script);
};
addEventListener(
  "load",
  () =>
    "requestIdleCallback" in window
      ? requestIdleCallback(load, { timeout: 4000 })
      : setTimeout(load, 2000),
  { once: true },
);
