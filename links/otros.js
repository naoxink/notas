// otros
const otros = {
  label: "Otros",
  links: [
    { link: "https://circuloesceptico.org/", desc: "Círculo escéptico" },
    { link: "https://www.liveatc.net/", desc: "LiveATC (Air Traffic Comms)" },
    { link: "https://pixlr.com/es/editor/", desc: '"Photoshop" online (Pixlr)' },
    { link: "https://www.croxyproxy.com/_es/", desc: "CroxyProxy (proxy web)" },
    { link: "https://www.meteoalarm.org/en/live/", desc: "Alertas meteorológicas Europa" },
    { link: "https://farmaciamalaga.iurban.es/map", desc: "Farmacias en Málaga" },
    { link: "https://www.aesan.gob.es/AECOSAN/web/seguridad_alimentaria/subseccion/otras_alertas_alimentarias.htm", desc: "AESAN: Alertas alimentarias" },
    { link: "https://www.andavac.es/calendario-vacunaciones/", desc: "Calendario de vacunaciones Andalucía" },
    { link: "https://www.animefillerlist.com/shows/dragon-ball-z", desc: "DBZ: Listado de capitulos relleno" }
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
