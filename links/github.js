// github
const github = {
  label: "Github",
  links: [
    { link: "https://naoxink.github.io/teledesayuno", desc: "Chat encriptado efímero", fav: true },
    { link: "https://naoxink.github.io/bitacora/", desc: "Time tracker", fav: true },
    { link: "https://naoxink.github.io/zentab", desc: "Dashboard con varias utilidades" },
    { link: "https://naoxink.github.io/foldergallery", desc: "Galería de imágenes/vídeos de carpeta local" },
    { link: "http://portfolio-naoxink.vercel.app", desc: "Portfolio" },
    { link: "https://descuentos-nxk.vercel.app", desc: "Calculadora de descuentos a precios" },
    { link: "https://naoxink.github.io/yearpercent", desc: "Porcentaje pasado del año actual" },
    { link: "https://naoxink.github.io/dinferno", desc: "Progreso de la lectura de la Divina comedia" },
    { link: "https://naoxink.github.io/peaktime", desc: "Progreso de tiempo hasta horas curiosas" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ github: github }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { github });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.github = github;
}
