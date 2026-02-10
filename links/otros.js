// otros
const otros = {
  label: "Otros",
  links: [
    { link: "https://www.liveatc.net/", desc: "LiveATC (Air Traffic Comms)" },
    { link: "https://pixlr.com/es/editor/", desc: '"Photoshop" online (Pixlr)' },
    { link: "https://www.croxyproxy.com/_es/", desc: "CroxyProxy (proxy web)" },
    { link: "https://www.meteoalarm.org/en/live/", desc: "Alertas meteorológicas Europa" },
    { link: "https://farmaciamalaga.iurban.es/map", desc: "Farmacias en Málaga" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ otros: otros }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { otros });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.otros = otros;
}
