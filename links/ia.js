// ia
const ia = {
  label: "IA",
  links: [
    { link: "https://chatgpt.com/", desc: "ChatGPT", tags: [ { name: "Consulta", color: "#b6f4ff" } ] },
    { link: "https://copilot.microsoft.com/", desc: "Copilot", tags: [ { name: "Código", color: "#b6f4ff" } ] },
    { link: "https://suno.com/", desc: "Suno", tags: [ { name: "Música", color: "#b6f4ff" } ] },
    { link: "https://claude.ai/", desc: "Claude", tags: [ { name: "Consulta", color: "#b6f4ff" } ] },
    { link: "https://grok.x.ai/", desc: "Grok", tags: [ { name: "Consulta", color: "#b6f4ff" } ] },
    { link: "https://deepai.org/", desc: "deepAI", tags: [ { name: "Imágenes, vídeos", color: "#b6f4ff" } ] },
    { link: "https://www.midjourney.com/", desc: "Midjourney", tags: [ { name: "Imágenes", color: "#b6f4ff" } ] },
    { link: "https://pixlr.com/", desc: "Pixlr", tags: [ { name: "Imágenes", color: "#b6f4ff" } ] }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ ia: ia }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { ia });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.ia = ia;
}
