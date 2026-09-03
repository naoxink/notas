// listados
const listados = {
  label: "Listados personales",
  links: [
    { link: "https://naoxink.github.io/tengoenbr/", desc: "Colección de películas" },
    { link: "https://naoxink.github.io/viendo/", desc: "Viendo: series que sigo", fav: true },
    { link: "https://naoxink-viendo.vercel.app", desc: "Viendo: series que sigo", tags: [{ name: "Mirror", color: "#007acc" }] },
    { link: "https://naoxink.github.io/mibiblioteca/", desc: "Mi biblioteca" },
    { link: "https://naoxink.github.io/comidas/", desc: "Comidas: reviews personales de restaurantes" },
    { link: "https://naoxink.github.io/ChaJi/", desc: "ChaJi: mis catas de té y mi inventario" },
    { link: "https://naoxink.github.io/tarotdailycard/", desc: "Carta del tarot diaria", fav: true }
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
