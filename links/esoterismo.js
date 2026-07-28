// esoterismo
const esoterismo = {
  label: "Esoterismo",
  links: [
    { link: "https://www.astrolink.com/es/tarot", desc: "Significados de las cartas del tarot" },
    { link: "https://labyrinthos.co/", desc: "Labyrinthos app, significados y tiradas de tarot", tags: [ { name: 'Inglés', color: '#dd9c3a' } ] },
    { desc: "Tarot Daemonibus", link: "https://www.google.es/search?q=DAEMONIBUS+TAROT&ie=UTF-8&oe=UTF-8&hl=es-es" },
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ esoterismo: esoterismo }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { esoterismo });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.esoterismo = esoterismo;
}