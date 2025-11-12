// === Config ===
const VENUE_ID = 4437;
const LOCALE   = 'ro';
const DIRECT_URL = `https://ialoc.ro/?venueId=${VENUE_ID}&bookNow=true&locale=${LOCALE}`;

// === Official iAloC embed loader ===
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

// === Initialize widget safely ===
function initWidget() {
  try {
    ialocEmbedWidget.init({
      source: 'ialoc-widget-embed',
      locale: LOCALE,
      embedMode: 'popup'
    });
  } catch (e) {
    console.warn("Widget init failed (will retry)", e);
  }
}

// Wait for the iAloC script to be ready
window.ialocReady = new Promise((resolve) => {
  (function waitForIt(){
    if (window.ialocEmbedWidget && typeof ialocEmbedWidget.show === 'function') {
      initWidget();
      resolve(true);
    } else {
      setTimeout(waitForIt, 200);
    }
  })();
});

// === Button click handler ===
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('bookBtn');
  if (!btn) return;

  btn.addEventListener('click', async function (e) {
    e.preventDefault(); // stop default navigation first
    await window.ialocReady;

    try {
      ialocEmbedWidget.show({ venueId: VENUE_ID, bookNow: true, locale: LOCALE });
    } catch (err) {
      console.warn("Widget show failed → redirecting", err);
      window.open(DIRECT_URL, "_blank");
    }
  });
});
