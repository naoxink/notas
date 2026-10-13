// bookmark_scrips
const bookmark_scrips = {
  label: "Scripts en marcadores",
  links: [
    { desc: 'Oscurecer página', click2copy: "javascript:(function(){const ID='overlay-brillo-nocturno';const exist=document.getElementById(ID);if(exist){exist.remove();return;}const overlay=document.createElement('div');overlay.id=ID;Object.assign(overlay.style,{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',backgroundColor:'rgba(0,0,0,0.45)',pointerEvents:'none',zIndex:2147483647,transition:'opacity 0.2s ease'});document.documentElement.appendChild(overlay);})();"},
    { desc: 'Invertir colores de la página', click2copy: "javascript:(function(){const ID='overlay-brillo-nocturno';const exist=document.getElementById(ID);if(exist){exist.remove();return;}const overlay=document.createElement('div');overlay.id=ID;Object.assign(overlay.style,{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',backdropFilter:'invert(1)',pointerEvents:'none',zIndex:2147483647,transition:'opacity 0.2s ease'});document.documentElement.appendChild(overlay);})();"},
    { desc: 'Picture in picture', click2copy: "javascript:document.querySelector('video').requestPictureInPicture()"},
    { desc: 'Vídeo a tamaño completo', click2copy: 'javascript:(()=>{const K="__braveFullTabVideo";if(window[K]){window[K].restore();delete window[K];return;}const v=[...document.querySelectorAll("video")].filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0}).sort((a,b)=>{const x=a.getBoundingClientRect(),y=b.getBoundingClientRect();return y.width*y.height-x.width*x.height})[0];if(!v){alert("No se encontró ningún vídeo HTML5");return;}const old=v.getAttribute("style"),html=document.documentElement.getAttribute("style"),body=document.body.getAttribute("style");const restore=()=>{if(old===null)v.removeAttribute("style");else v.setAttribute("style",old);if(html===null)document.documentElement.removeAttribute("style");else document.documentElement.setAttribute("style",html);if(body===null)document.body.removeAttribute("style");else document.body.setAttribute("style",body)};window[K]={restore};const css={position:"fixed",inset:"0",width:"100vw",height:"100vh","max-width":"none","max-height":"none","z-index":"2147483647","object-fit":"contain",background:"black",margin:"0",transform:"none"};for(const [p,val]of Object.entries(css))v.style.setProperty(p,val,"important");document.documentElement.style.setProperty("overflow","hidden","important");document.body.style.setProperty("overflow","hidden","important");})();'},
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ bookmark_scrips: bookmark_scrips }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { bookmark_scrips });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.bookmark_scrips = bookmark_scrips;
}
