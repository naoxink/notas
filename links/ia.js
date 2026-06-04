// ia
const ia = {
  label: "IA",
  links: [
    { link: "https://gemini.google.com/", desc: "Gemini"},
    { link: "https://chatgpt.com/", desc: "ChatGPT" },
    { link: "https://copilot.microsoft.com/", desc: "Copilot" },
    { link: "https://suno.com/", desc: "Suno" },
    { link: "https://claude.ai/", desc: "Claude" },
    { link: "https://grok.x.ai/", desc: "Grok" },
    { link: "https://deepai.org/", desc: "deepAI" },
    { link: "https://www.midjourney.com/", desc: "Midjourney" },
    { link: "https://pixlr.com/", desc: "Pixlr" }
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
