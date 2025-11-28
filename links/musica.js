// musica
const musica = {
  label: "Música",
  links: [
    { link: "https://open.spotify.com/playlist/7BNaFTLFCkJz0EXcP4Jmo9?si=46333dbe1efc4cd4", desc: "Lista Tungsteno", tags: [ { color: '#1ed760', name: 'Spotify' } ] },
    { link: "https://open.spotify.com/playlist/73ljMKbZA61wO861nAXBEt?si=d13726af623040a2", desc: "Lista Tungsteno II", tags: [ { color: '#1ed760', name: 'Spotify' } ] },
    { link: "https://open.spotify.com/playlist/5jqP6Y1neQBsUEiO0vXKtw?si=0c8703f052c1433f", desc: "Lista Random", tags: [ { color: '#1ed760', name: 'Spotify' } ] }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ musica: musica }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { musica });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.musica = musica;
}
