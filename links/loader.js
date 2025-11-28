(function(){
  const sources = window.LINKS_SOURCES || [];
  // Cargar secuencialmente para mantener orden y dependencias
  function loadNext(i){
    if (i >= sources.length) return;
    const s = document.createElement('script');
    s.src = sources[i];
    s.defer = false; // ejecutar en cuanto se descargue
    s.onload = () => loadNext(i+1);
    s.onerror = () => loadNext(i+1);
    document.head.appendChild(s);
  }
  // arrancar tras un pequeño timeout para favorecer que app.js ya haya corrido
  setTimeout(() => loadNext(0), 0);
})();
