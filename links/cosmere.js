// cosmere
const cosmere = {
  label: "Universo Cosmere · Brandon Sanderson",
  links: [
    { link: "https://naoxink.github.io/ScadrialMatrix/", desc: "Test para descubrir tu metal personal", tags: [ { name: "GitHub", color: "#afafaf" } ], fav: true },
    { link: "https://cosmere.es/", desc: "Página dedicada al mundo cosmere [Español]" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ cosmere: cosmere }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { cosmere });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.cosmere = cosmere;
}
