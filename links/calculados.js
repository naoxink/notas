// calculados: registro como antes (usa registerLinks cuando esté disponible)
const calculadosCategory = {
  label: "Calculados",
  links: [
    { desc: "Siguiente incentivo", fn: () => {
      const now = new Date();
      const month = now.getMonth();
      const incentiveMonths = [0, 3, 6, 9];
      // Si el mes actual es un mes de incentivo
      if (incentiveMonths.includes(month)) {
        return "¡Este mes!";
      }
      const nextIncentive = incentiveMonths.find(m => m > month) ?? incentiveMonths[0];
      const nextDate = new Date(nextIncentive === 0 ? now.getFullYear() + 1 : now.getFullYear(), nextIncentive, 1);
      return nextDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    }},
    { desc: "Próxima ruleta de día en", fn: () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = domingo, 3 = miércoles

      const daysUntilWednesday = (3 - dayOfWeek + 7) % 7;

      if (daysUntilWednesday === 0) {
        return "¡Ruleta renovada hoy!";
      }

      return `${daysUntilWednesday} día${daysUntilWednesday !== 1 ? "s" : ""}`;
    }},
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ calculados: calculadosCategory }, { position: 'start' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { calculados: calculadosCategory });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.calculados = calculadosCategory;
}
