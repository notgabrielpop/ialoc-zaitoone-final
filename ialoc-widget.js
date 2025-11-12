!function(e,t,i,n,s,o,c,a,d,r){
  if(!e[n]){
    for(;a<c.length;)s(o,c[a++]);
    (d=t.createElement(i)).async=1;
    d.src="https://ialoc.ro/assets/widget-v2/embed.min.js";
    (r=t.getElementsByTagName(i)[0]).parentNode.insertBefore(d,r);
    e[n]=o;
  }
}(window,document,"script","ialocEmbedWidget",
  function(e,t){e[t]=function(){e._q.push([t,arguments])}},
  {_q:[]},
  "init show hide".split(" "),
  0
);

var widgetOptions = {
  source: 'ialoc-widget-embed',
  locale: 'ro', // ro / en
  embedMode: 'popup'
};

window.addEventListener("load", function() {
  try {
    ialocEmbedWidget.init(widgetOptions);
  } catch (e) {
    console.warn("iAloC init error:", e);
  }
});
