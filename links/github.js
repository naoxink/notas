// github
const github = {
  label: "Github",
  links: [
    { link: "https://descuentos-nxk.vercel.app/", desc: "Calculadora de descuentos a precios" },
    { link: "https://naoxink.github.io/tengoenbr/", desc: "Listado de películas de mi colección en blu-ray" },
    { link: "https://naoxink.github.io/mibiblioteca/", desc: "Listado de libros personales" },
    { link: "https://naoxink.github.io/yearpercent/", desc: "Porcentaje pasado del año actual" }
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
