// listados
const listados = {
  label: "Listados personales",
  links: [
    { link: "https://naoxink.github.io/tengoenbr/", desc: "Listado de películas de mi colección en blu-ray" },
    { link: "https://naoxink.github.io/mibiblioteca/", desc: "Listado de libros personales" },
    { link: "https://naoxink.github.io/comidas/", desc: "Notas de las comidas que voy probando por ahí" },
    { link: "https://naoxink.github.io/ChaJi/", desc: "Listado de todos los tés que voy tomando y tengo" },
    { link: "https://naoxink.github.io/tarotdailycard/", desc: "Histórico de mi carta del tarot diaria" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ listados: listados }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { listados });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.listados = listados;
}
