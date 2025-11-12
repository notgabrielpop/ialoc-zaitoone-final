// ==== Config ====
const VENUE_ID = 4437;        // <-- change if needed
const LOCALE   = 'ro';
const DIRECT_URL = `https://ialoc.ro/?venueId=${VENUE_ID}&bookNow=true&locale=${LOCALE}`;

// ---- Official iAloC loader (unchanged) ----
!function(e,t,i,n,s,o,c,a,d,r){
  if(!e[n]){
    for(;a<c.length;)s(o,c[a++]);
    (d=t.createElement(i)).async=1;
    d.src="https://ialoc.ro/assets/widget-v2/embed.min.js";
    (r=t.getElementsByTagName(i)[0]).parentNode.insertBefore(d,r);
    e[n]=o;
  }
}(window,document,"script","ialocEmbedWidget",function(e,t){
  e[t]=function(){e._q.push([t,arguments])}
},{_q:[]},"init show hide".split(" "),0);

// ---- Make a ready-promise so clicks wait until widget is loaded ----
let _ialocInited = false;
function initOnce() {
  if (_ialocInited) return;
  _ialocInited = true;
  try {
    ialocEmbedWidget.init({
      source: 'ialoc-widget-embed',
      locale: LOCALE,
      embedMode: 'popup'
    });
  } catch (e) { /* ignore; we retry after the script is fully ready */ }
}

window.ialocReady = new Promise((resolve) => {
  (function waitForIt(){
    if (window.ialocEmbedWidget && typeof ialocEmbedWidget.show === 'function') {
      initOnce();
      resolve(true);
    } else {
      setTimeout(waitForIt, 150);
    }
  })();
});

// Expose an opener used by the click handler
window.openIaloc = function openIaloc() {
  try {
    initOnce();
    if (window.ialocEmbedWidget && typeof ialocEmbedWidget.show === 'function') {
      ialocEmbedWidget.show({ venueId: VENUE_ID, bookNow: true, locale: LOCALE });
      return true; // popup opened
    }
  } catch (e) {}
  return false; // not ready
};

// Also export the fallback URL for convenience
window.IALOC_DIRECT_URL = DIRECT_URL;
