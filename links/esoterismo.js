// esoterismo
const esoterismo = {
  label: "Esoterismo",
  links: [
    { link: "https://www.astrolink.com/es/tarot", desc: "Significados de las cartas del tarot" }
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
