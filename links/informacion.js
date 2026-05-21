// otros
const informacion = {
  label: "Información",
  links: [
    { link: "https://circuloesceptico.org/", desc: "Círculo escéptico" },
    { link: "https://ciencia.nasa.gov/", desc: "NASA: ciencia" },
    { link: "https://www.meteoalarm.org/en/live/", desc: "Alertas meteorológicas Europa" },
    { link: "https://farmaciamalaga.iurban.es/map", desc: "Farmacias en Málaga" },
    { link: "https://www.aesan.gob.es/AECOSAN/web/seguridad_alimentaria/subseccion/otras_alertas_alimentarias.htm", desc: "AESAN: Alertas alimentarias" },
    { link: "https://www.andavac.es/calendario-vacunaciones/", desc: "Calendario de vacunaciones Andalucía" },
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ informacion: informacion }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { informacion });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.informacion = informacion;
}
