// otros
const otros = {
  label: "Otros",
  links: [
    { link: "https://www.liveatc.net/", desc: "LiveATC (Air Traffic Comms)" },
    { link: "https://pixlr.com/es/editor/", desc: '"Photoshop" online (Pixlr)' },
    { link: "https://www.croxyproxy.com/_es/", desc: "CroxyProxy (proxy web)" },
    { link: "https://www.animefillerlist.com/shows/dragon-ball-z", desc: "DBZ: Listado de capitulos relleno" },
    { link: "https://www.fringeconnections.com/", desc: "Fringe connections" }
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
