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
    {
      desc: "Siguiente luna llena", fn: () => {
        // Duración media del ciclo sinódico lunar
        const N = 29.530588853;

        // Luna llena de referencia (NASA)
        const ref = new Date(Date.UTC(2017, 0, 12, 11, 34));

        const now = new Date();
        const diffDays = (now - ref) / 86400000;
        const cycles = diffDays / N;
        const nextCycle = Math.ceil(cycles);

        const nextFullMoon = new Date(ref.getTime() + nextCycle * N * 86400000);

        // Formato español requerido
        const dias = [
          "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
        ];

        const meses = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const d = nextFullMoon;
        const diaSemana = dias[d.getUTCDay()];
        const diaMes = d.getUTCDate();
        const mes = meses[d.getUTCMonth()];

        return `${diaSemana} ${diaMes} de ${mes}`;
      }
    },
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
      let h1 = 0x9e3779b97f4a7c15n;   // semillas grandes (BigInt)
      let h2 = 0x6a09e667f3bcc908n;

      for (let c of s) {
        const x = BigInt(c.charCodeAt(0));
        h1 = (h1 ^ x) * 0xbf58476d1ce4e5b9n;
        h2 = (h2 + x) * 0x94d049bb133111ebn;
      }

      let h = (h1 ^ h2) & ((1n << 64n) - 1n); // 64 bits

      const chars = [];
      for (let i = 33; i <= 126; i++) chars.push(String.fromCharCode(i));

      let out = "";
      const base = BigInt(chars.length);

      for (let i = 0; i < 10; i++) {
        out += chars[Number(h % base)];
        h /= base;
      }

      return out;
    }}
  ]
};

// Registrar la categoría (como antes)
if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ tonteriasVarias: tonteriasVariasCategory }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { tonteriasVarias: tonteriasVariasCategory });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.tonteriasVarias = tonteriasVariasCategory;
}
