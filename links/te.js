// te
const te = {
  label: "Té",
  links: [
    { link: "https://puntodete.com/85-te-a-granel", desc: "Punto de Té", tags: [ { name: "España", color: "#F4F4F4" } ] },
    { link: "https://meileaf.com", desc: "Mei Leaf", tags: [ { name: "Reino Unido", color: "#F4F4F4" } ] },
    { link: "https://yunnansourcing.com", desc: "Yunnan Sourcing", tags: [ { name: "China", color: "#F4F4F4" } ] },
    { link: "https://www.nannuoshan.org", desc: "Nannuoshan", tags: [ { name: "Alemania", color: "#F4F4F4" } ] },
    { link: "https://www.teyte.net", desc: "Té y Té", tags: [ { name: "España", color: "#F4F4F4" } ] },
    { link: "https://crimsonlotustea.com", desc: "Crimson Lotus Tea", tags: [ { name: "Estados Unidos", color: "#F4F4F4" } ] },
    { link: "https://what-cha.com", desc: "What-Cha", tags: [ { name: "Reino Unido", color: "#F4F4F4" } ] },
    { link: "https://teashop.com", desc: "Tea Shop", tags: [ { name: "España", color: "#F4F4F4" } ] },
    { link: "https://tiendagoldentips.com/tienda/", desc: "Golden Tips", tags: [ { name: "España", color: "#F4F4F4" } ] }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ te: te }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { te });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.te = te;
}
