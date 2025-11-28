// ia
const ia = {
  label: "IA",
  links: [
    { link: "https://chatgpt.com/", desc: "ChatGPT — Consulta" },
    { link: "https://copilot.microsoft.com/", desc: "Copilot — Consulta, imágenes" },
    { link: "https://suno.com/", desc: "Suno — Música" },
    { link: "https://claude.ai/", desc: "Claude — Consulta" },
    { link: "https://grok.x.ai/", desc: "Grok — Consulta" },
    { link: "https://deepai.org/", desc: "deepAI — Consulta, imágenes, vídeos" },
    { link: "https://www.midjourney.com/", desc: "Midjourney — Imágenes" },
    { link: "https://pixlr.com/", desc: "Pixlr — Imágenes" }
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
