// citas
// Cada entrada usa `quote` (el texto de la cita) en vez de `link`/`fn`/`click2copy`.
// `desc`, si se indica, se muestra como autoría/fuente de la cita.
const citas = {
  label: "Citas",
  links: [
    { quote: "No esperes nada de nadie.", desc: "Gaby" },
    { quote: "Mis mierdas me las pago yo.", desc: "Gaby" },
    { quote: "Bendita IA", desc: "Gaby" },
    { quote: "UUUhhh", desc: "Nico" },
    { quote: "When it all looks like heaven, but it feels like hell", desc: "Sleep Token" },
    { quote: "I just want to be a better human, but it's hard when everybody's acting stupid", desc: "Falling in Reverse" }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ citas: citas }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { citas });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.citas = citas;
}
