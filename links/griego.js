// griego
const griego = {
  label: "Griego",
  links: [
    { link: "https://live24.gr/radio/realfm.jsp", desc: "Radio Real FM" },
    { link: "https://www.ertecho.gr/", desc: "ERT Echo" },
    { link: "https://www.ertflix.gr/", desc: "ERTFlix" },
    { link: "https://www.easygreek.fm", desc: "EasyGreek" },
    { link: "https://www.youtube.com/playlist?list=PLZrFrWywdBn12Qc1x7XqECf65lyg63nt1", desc: "Curso: gramática y vocabulario en Griego Moderno" },
    { link: "http://naoxink.epizy.com/transcriptor/", desc: "Transcriptor griego (tontería)" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ griego: griego }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { griego });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.griego = griego;
}
