// calculados: registro como antes (usa registerLinks cuando esté disponible)
const calculadosCategory = {
  label: "Calculados",
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
    { desc: "Siguiente incentivo", fn: () => {
      const now = new Date();
      const month = now.getMonth();
      const incentiveMonths = [0, 3, 6, 9];
      const nextIncentive = incentiveMonths.find(m => m > month) ?? incentiveMonths[0];
      const nextDate = new Date(nextIncentive === 0 ? now.getFullYear() + 1 : now.getFullYear(), nextIncentive, 1);
      return nextDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    }},
    { desc: "Próxima ruleta de día en", fn: () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const daysUntilWednesday = (3 - dayOfWeek + 7) % 7 || 7;
      return `${daysUntilWednesday} día${daysUntilWednesday !== 1 ? 's' : ''}`;
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
    }}
    ,{ desc: "Precio luz (península)", fn: (() => {
      // Cache sencillo para que la interfaz mantenga la función síncrona
      let _cached = 'cargando...';
      let _last = 0;
      const TTL = 10 * 60 * 1000; // 10 minutos
      const zone = (typeof window !== 'undefined' && window.PRECIO_LUZ_ZONE) ? window.PRECIO_LUZ_ZONE : 'peninsula';
      // Si quieres usar otra API o un proxy (p. ej. por problemas de DNS/CORS),
      // define `window.PRECIO_LUZ_API_URL` antes de cargar los scripts.
      // Debe aceptar la misma consulta o devolver un array de objetos con
      // campos de tiempo y precio.

      async function fetchPrice() {
        try {
          const custom = (typeof window !== 'undefined' && window.PRECIO_LUZ_API_URL) ? window.PRECIO_LUZ_API_URL : null;
          const url = custom || `https://api.preciodelaluz.org/v1/prices?zone=${encodeURIComponent(zone)}`;
          let res = null;
          let usedUrl = url;
          try {
            res = await fetch(usedUrl, { cache: 'no-store' });
            if (!res.ok) throw new Error('network status ' + res.status);
          } catch (errFetch) {
            // Si no se proporcionó una URL personalizada, intentar un proxy CORS público
            if (!custom && !usedUrl.includes('allorigins')) {
              const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(usedUrl);
              try {
                res = await fetch(proxy, { cache: 'no-store' });
                usedUrl = proxy;
                if (!res.ok) throw new Error('proxy status ' + res.status);
              } catch (errProxy) {
                // rethrow el primer error para llegar al catch externo y mostrar info
                throw errFetch;
              }
            } else {
              throw errFetch;
            }
          }
          const data = await res.json();

          // Extraer entradas (compatible con apidatos.ree.es y otras APIs)
          function extractEntries(obj) {
            const out = [];
            function walk(o) {
              if (!o || typeof o !== 'object') return;
              if (Array.isArray(o)) {
                for (const it of o) walk(it);
                return;
              }
              // Si tiene un array `values` con objetos { value, datetime }
              if (Array.isArray(o.values) && o.values.length > 0) {
                for (const v of o.values) {
                  const tstr = v.datetime || v.date || v.from || v.start || v.timestamp;
                  const t = tstr ? Date.parse(tstr) : (typeof v.time === 'number' ? v.time : NaN);
                  const val = (typeof v.value === 'number') ? v.value : (typeof v.price === 'number' ? v.price : (typeof v.amount === 'number' ? v.amount : (typeof v.valor === 'number' ? v.valor : NaN)));
                  if (!Number.isNaN(t) && !Number.isNaN(val)) out.push({ t, v: val, raw: v });
                }
              }

              // Si el objeto tiene value/price directamente con fecha
              if ((typeof o.value === 'number' || typeof o.price === 'number' || typeof o.amount === 'number') && (o.datetime || o.date || o.timestamp || o.from || o.start)) {
                const tstr = o.datetime || o.date || o.timestamp || o.from || o.start;
                const t = tstr ? Date.parse(tstr) : NaN;
                const val = typeof o.value === 'number' ? o.value : (typeof o.price === 'number' ? o.price : (typeof o.amount === 'number' ? o.amount : NaN));
                if (!Number.isNaN(t) && !Number.isNaN(val)) out.push({ t, v: val, raw: o });
              }

              // Recorrer propiedades para encontrar estructuras anidadas
              for (const k of Object.keys(o)) {
                if (k === 'values') continue;
                try { walk(o[k]); } catch (e) { /* ignore */ }
              }
            }
            walk(obj);
            return out;
          }

          const now = Date.now();
          const candidates = extractEntries(data);

          // Si no hay candidatos, intentar heurística simple con arrays en la raíz
          if (candidates.length === 0) {
            const arr = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (Array.isArray(data.prices) ? data.prices : []));
            for (const it of arr) {
              const tstr = it.datetime || it.timestamp || it.from || it.date || it.start;
              const t = tstr ? Date.parse(tstr) : (typeof it.time === 'number' ? it.time : NaN);
              const v = (typeof it.price === 'number') ? it.price : (typeof it.value === 'number' ? it.value : (typeof it.amount === 'number' ? it.amount : (typeof it.valor === 'number' ? it.valor : NaN)));
              if (!Number.isNaN(t) && !Number.isNaN(v)) candidates.push({ t, v, raw: it });
            }
          }

          // Buscar la entrada que cubre la hora actual (t <= now < t+1h)
          let found = candidates.find(c => (now >= c.t && now < (c.t + 3600000)));
          if (!found && candidates.length) {
            // fallback: la más cercana en el tiempo
            found = candidates.reduce((a, b) => (Math.abs(a.t - now) < Math.abs(b.t - now) ? a : b));
          }

          if (found && typeof found.v === 'number') {
            let v = found.v;
            let unit = '€/kWh';
            // Si el valor parece grande (p.ej. > 1), es probable que venga en €/MWh
            if (v > 1) {
              v = v / 1000; // convertir a €/kWh
              unit = '€/kWh (convertido desde €/MWh)';
            }
            _cached = `${v.toFixed(4)} ${unit}`;
          } else {
            _cached = 'sin datos';
          }
        } catch (err) {
          // Guardar mensaje de error para depuración (p. ej. DNS failures)
          try {
            const msg = (err && err.message) ? err.message : String(err);
            _cached = `error: ${msg}`;
          } catch (e) {
            _cached = 'error';
          }
        } finally {
          _last = Date.now();
          if (typeof window !== 'undefined' && typeof window.renderAll === 'function') window.renderAll();
        }
      }

      // Devuelve siempre el valor cacheado; dispara la carga si es viejo
      return () => {
        try {
          if (!_last || (Date.now() - _last) > TTL) {
            // no await: actualizamos en background y renderAll() refrescará
            fetchPrice();
          }
        } catch (e) {
          // ignore
        }
        return _cached;
      };
    })() }
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
