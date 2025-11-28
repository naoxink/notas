// calculados: registro como antes (usa registerLinks cuando esté disponible)
const tonteriasVariasCategory = {
  label: "Tonterías varias",
  links: [
    { desc: "Porcentaje del año actual", fn: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const end = new Date(now.getFullYear() + 1, 0, 0);
      const percent = ((now - start) / (end - start)) * 100;
      return percent.toFixed(2) + '%';
    }},
    { desc: "Luna iluminada", fn: () => {
      const now = new Date();
      const synodic = 29.530588853;
      const knownNewMoon = Date.UTC(200, 0, 6, 18, 14, 0);
      const diffDays = (now.getTime() - knownNewMoon) / 86400000;
      let age = diffDays % synodic;
      if (age < 0) age += synodic;
      const phaseAngle = 2 * Math.PI * age / synodic;
      const illuminated = (1 - Math.cos(phaseAngle)) / 2 * 100;
      const direction = Math.sin(phaseAngle) > 0 ? '▲' : '▼';
      return illuminated.toFixed(1) + '% ' + direction;
    }},
    { desc: "Consejo del día", fn: () => {
      const tips = [
        'Bebe agua: intenta beber al menos 8 vasos hoy.',
        'Haz una pausa de 5 minutos cada hora: mueve el cuerpo.',
        'Prioriza 3 tareas hoy y céntrate en terminarlas.',
        'Da un paseo corto de 10 minutos para despejar la cabeza.',
        'Apaga las notificaciones durante 30 minutos y concéntrate.',
        'Ordena tu bandeja de entrada durante 15 minutos.',
        'Haz una respiración profunda de 4-4-4 (inhala, mantiene, exhala).',
        'Apaga la pantalla 1 hora antes de dormir para mejorar el sueño.',
        'Anota 3 cosas por las que estás agradecido hoy.',
        'Mira la luna esta noche y pide algo en silencio.',
        'Escribe una intención breve antes de dormir.',
        'Sostén una piedra o moneda y decide una intención por ella.',
        'Cierra los ojos 2 minutos y visualiza cómo quieres sentirte.',
        'Haz una pequeña ofrenda simbólica (una nota, una flor) a algo que agradezcas.',
        'Camina descalzo 1 minuto y siente la conexión con el suelo.',
        'Haz una copia de seguridad rápida de tus archivos más importantes.',
        'Vacía la carpeta de descargas: guarda lo necesario y borra el resto.',
        'Actualiza una contraseña débil hoy: usa un gestor si puedes.',
        'Programa un recordatorio de pago o factura para evitar sorpresas.',
        'Si encuentras un calcetín suelto, felicítalo por su libertad.',
        'Habla con una planta 30 segundos: ella te escucha (o no).',
        'Hoy es buen día para probar un sándwich raro: pepinillo+chocolate.',
        'Canta la primera línea de una canción al azar (voz alta, con orgullo).',
        'Ponte calcetines distintos y presume de ello.',
        'Nombra una nube y dale personalidad: ¿cómo se llama?'
      ];
      const now = new Date();
      const yearStart = new Date(now.getFullYear(), 0, 0);
      const dayOfYear = Math.floor((now - yearStart) / 86400000);
      return tips[dayOfYear % tips.length];
    }},
    { desc: "Distancia Sol-Tierra", fn: () => {
      const now = new Date();
      const day = (now - new Date(now.getFullYear(),0,0)) / 86400000;
      const eccentricity = 0.0167;
      const mean = 149597870; // km
      const dist = mean * (1 - eccentricity * Math.cos(2 * Math.PI * day / 365));
      // Formatear con separadores de miles/millones según locale español
      const rounded = Math.round(dist);
      const formatted = rounded.toLocaleString('es-ES');
      return formatted + " km";
    }},
    { desc: "Hash del día", fn: () => {
      const s = new Date().toISOString().slice(0,10);
      let h = 0;
      for (let c of s) h = (h * 167 + c.charCodeAt(0)) >>> 0;

      const chars = [];
      for (let i = 33; i <= 126; i++) chars.push(String.fromCharCode(i)); // ASCII visible

      let out = "";
      let x = h;

      for (let i = 0; i < 10; i++) {
        out += chars[x % chars.length];
        x = Math.floor(x / chars.length);
      }

      return out;
    }},
    { desc: "Nivel de ‘lunes’", fn: () => {
      const dow = new Date().getDay();
      const levels = ["😴", "☹️", "😕", "🙂", "😊", "😎", "🎉"];
      return levels[dow] + " (" + ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][dow] + ")";
    }},
    { desc: "Excusa del día", fn: () => {
      const causes = ["el servidor", "Mercurio retrógrado", "mi gato", "un bug cuántico", "la ley de Murphy"];
      const actions = ["rompió", "reinició", "desconfiguró", "boicoteó", "apagó"];
      const objects = ["todo", "la conexión", "el sistema", "el internet", "mi motivación"];

      // Crear una semilla diaria (YYYYMMDD → número)
      const seedStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
      let seed = Number(seedStr);

      // Pequeño PRNG determinístico *local*
      const rng = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };

      const cause  = causes[Math.floor(rng() * causes.length)];
      const action = actions[Math.floor(rng() * actions.length)];
      const object = objects[Math.floor(rng() * objects.length)];

      return `${cause} ${action} ${object}`;
    }},
    { desc: "Productividad", fn: () => {
      const hour = new Date().getHours();
      if (hour < 7) return "Esperando empezar";
      if (hour < 12) return "Preparando la productividad";
      if (hour < 15) return "Haciendo como que trabajo";
      return "Defunción laboral";
    }},
    {
      desc: "Segundos para el finde",
      fn: (() => {

        let installed = false;

        function calculate() {
          const now = new Date();
          const day = now.getDay();
          const weekendStart = new Date(now);
          weekendStart.setDate(now.getDate() + ((6 - day + 7) % 7));
          weekendStart.setHours(0,0,0,0);
          return Math.floor((weekendStart - now) / 1000) + "s";
        }

        return function() {

          if (!installed) {
            installed = true;

            setTimeout(() => {

              setInterval(() => {
                // Buscar siempre el span
                const allLis = document.querySelectorAll("li");
                let targetSpan = null;

                allLis.forEach(li => {
                  if (li.textContent.trim().startsWith("Segundos para el finde")) {
                    targetSpan = li.querySelector(".fn-result");
                  }
                });

                if (targetSpan) {
                  targetSpan.textContent = calculate();
                }

              }, 1000);

            }, 0);
          }

          return calculate();
        };

      })()
    }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ tonteriasVarias: tonteriasVariasCategory }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { tonteriasVarias: tonteriasVariasCategory });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.tonteriasVarias = tonteriasVariasCategory;
}
