// murrayslab
const murrayslab = {
  label: "Murray's Lab",
  links: [
    { link: "https://murrayslab.com/listascompartidas/", desc: "Listas compartidas sin registro", fav: true },
    { link: "https://dondelacienciacalla.com/", desc: "Blog ocultismo (medio IA medio real)" },
    { link: "https://umamicook.com/", desc: "Recetas de cocina" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ murrayslab: murrayslab }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { murrayslab });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.murrayslab = murrayslab;
}
