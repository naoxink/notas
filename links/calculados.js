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
    { desc: "Próxima ruleta de Día en", fn: () => {
      // Fecha de inicio de un ciclo conocido (ajusta si Día cambia el calendario)
      const cycleAnchor = new Date(2026, 7, 12); // 12 de agosto de 2026 (mes 7 = agosto, 0-indexado)
      const cycleLengthDays = 14; // del 12 al 25 = 14 días

      const now = new Date();
      // Normalizamos horas para comparar solo fechas
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const msPerDay = 24 * 60 * 60 * 1000;
      const daysSinceAnchor = Math.floor((startOfToday - cycleAnchor) / msPerDay);

      // Módulo que funciona también con números negativos (fechas anteriores al ancla)
      const daysIntoCycle = ((daysSinceAnchor % cycleLengthDays) + cycleLengthDays) % cycleLengthDays;
      const daysUntilNextCycle = (cycleLengthDays - daysIntoCycle) % cycleLengthDays;

      if (daysUntilNextCycle === 0) {
        return "¡Ruleta renovada hoy!";
      }
      return `${daysUntilNextCycle} día${daysUntilNextCycle !== 1 ? "s" : ""}`;
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
