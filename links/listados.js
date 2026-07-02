// listados
const listados = {
  label: "Listados personales",
  links: [
    { link: "https://naoxink.github.io/tengoenbr/", desc: "Películas de mi colección en blu-ray" },
    { link: "https://naoxink.github.io/viendo/", desc: "Series Tracker: series que estoy viendo (y he visto)" },
    { link: "https://naoxink-viendo.vercel.app", desc: "Series Tracker: alternativa vercel" },
    { link: "https://naoxink.github.io/mibiblioteca/", desc: "Libros personales" },
    { link: "https://naoxink.github.io/comidas/", desc: "Comidas que voy probando por ahí" },
    { link: "https://naoxink.github.io/ChaJi/", desc: "Tés que voy tomando y tengo" },
    { link: "https://naoxink.github.io/tarotdailycard/", desc: "Carta del tarot diaria" }
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
