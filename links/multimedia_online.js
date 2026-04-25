// multimedia_online
const multimedia_online = {
  label: "Multimedia online",
  links: [
    { link: "https://capitulosos.blogspot.com/p/series-gratis-online.html", desc: "Capitulosos" },
    { link: "https://fromserie.blogspot.com/", desc: "From (origen)", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
    { link: "https://verdragonball.online/", desc: "Dragon Ball", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
    { link: "https://cuatro.comunidadmontepinar.eu/", desc: "La que se avecina", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
    { link: "https://anhqv.eu/visualizador/", desc: "Aquí no hay quien viva", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
    { link: "https://cuatro.comunidadmontepinar.eu/aida/", desc: "Aída", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
    { link: "https://www.tokyvideo.com/es/serie/cosas-de-casa/8", desc: "Cosas de casa", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
    { link: "https://fmhy.net/", desc: "freemediaheckyeah: índice de utilidades y sitios" },
    { link: "https://pluto.tv/", desc: "PlutoTV" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ multimedia_online: multimedia_online }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { multimedia_online });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.multimedia_online = multimedia_online;
}
