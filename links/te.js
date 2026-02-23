// te
const te = {
  label: "Té",
  links: [
    { link: "https://puntodete.com/85-te-a-granel", desc: "Punto de Té - España" },
    { link: "https://meileaf.com", desc: "Mei Leaf - Reino Unido" },
    { link: "https://yunnansourcing.com", desc: "Yunnan Sourcing - China" },
    { link: "https://www.nannuoshan.org", desc: "Nannuoshan - Alemania" },
    { link: "https://www.teyte.net", desc: "Té y Té - España" },
    { link: "https://crimsonlotustea.com", desc: "Crimson Lotus Tea - Estados Unidos" },
    { link: "https://what-cha.com", desc: "What-Cha - Reino Unido" },
    { link: "https://teashop.com", desc: "Tea Shop - España" },
    { link: "https://tiendagoldentips.com/tienda/", desc: "Golden Tips - España"}
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
