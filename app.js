// Datos de enlaces organizados por categoría
let LINKS = {
  github: {
    label: "Github",
    links: [
      { link: "https://descuentos-nxk.vercel.app/", desc: "Calculadora de descuentos a precios" },
      { link: "https://naoxink.github.io/tengoenbr/", desc: "Listado de películas de mi colección en blu-ray" },
      { link: "https://naoxink.github.io/mibiblioteca/", desc: "Listado de libros personales" },
      { link: "https://naoxink.github.io/yearpercent/", desc: "Porcentaje pasado del año actual" }
    ]
  },
  musica: {
    label: "Música",
    links: [
      { link: "https://open.spotify.com/playlist/7BNaFTLFCkJz0EXcP4Jmo9?si=46333dbe1efc4cd4", desc: "Lista Tungsteno", tags: [ { color: '#1ed760', name: 'Spotify' } ] },
      { link: "https://open.spotify.com/playlist/73ljMKbZA61wO861nAXBEt?si=d13726af623040a2", desc: "Lista Tungsteno II", tags: [ { color: '#1ed760', name: 'Spotify' } ] },
      { link: "https://open.spotify.com/playlist/5jqP6Y1neQBsUEiO0vXKtw?si=0c8703f052c1433f", desc: "Lista Random", tags: [ { color: '#1ed760', name: 'Spotify' } ] }
    ]
  },
  griego: {
    label: "Griego",
    links: [
      { link: "https://live24.gr/radio/realfm.jsp", desc: "Radio Real FM" },
      { link: "https://www.ertecho.gr/", desc: "ERT Echo" },
      { link: "https://www.ertflix.gr/", desc: "ERTFlix" },
      { link: "https://www.easygreek.fm", desc: "EasyGreek" },
      { link: "https://www.youtube.com/playlist?list=PLZrFrWywdBn12Qc1x7XqECf65lyg63nt1", desc: "Curso: gramática y vocabulario en Griego Moderno" },
      { link: "http://naoxink.epizy.com/transcriptor/", desc: "Transcriptor griego (tontería)" }
    ]
  },
  multimedia_online: {
    label: "Multimedia online",
    links: [
      { link: "https://capitulosos.blogspot.com/p/series-gratis-online.html", desc: "Capitulosos" },
      { link: "https://verdragonball.online/", desc: "Dragon Ball", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
      { link: "https://cuatro.comunidadmontepinar.eu/", desc: "La que se avecina", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
      { link: "https://anhqv.eu/visualizador/", desc: "Aquí no hay quien viva", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
      { link: "https://cuatro.comunidadmontepinar.eu/aida/", desc: "Aída", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
      { link: "https://www.tokyvideo.com/es/serie/cosas-de-casa/8", desc: "Cosas de casa", tags: [ { color: '#8dcfd8', name: 'Serie online' } ] },
      { link: "https://fmhy.net/", desc: "freemediaheckyeah: índice de utilidades y sitios" },
      // { link: "https://www.cineby.app/", desc: "Cineby", tags: [ { color: "#970808", name: "Bloqueo ISP España" } ] },
      { link: "https://pluto.tv/", desc: "PlutoTV" }
    ]
  },
  guild_wars_2: {
    label: "Guild Wars 2",
    links: [
      { link: "https://naoxink.github.io/Mazs", desc: "Daily Fractals, strikes & events" },
      { link: "https://gw2efficiency.com/", desc: "GW2 Efficiency" },
      { link: "https://wiki.guildwars2.com/wiki/Event_timers", desc: "Event Timer" },
      { link: "https://portfolio-naoxink.vercel.app/posts/guild-wars-ost-collection", desc: "Compilación OSTs" },
      { link: "https://gw2efficiency.com/crafting/calculator/a~1!b~0!c~0!d~1-80248;1-80131;1-80190;1-80111;1-80356;1-80399!e~0", desc: "Armadura legendaria ligera raid" },
      { link: "https://gw2efficiency.com/crafting/calculator/a~1!b~0!c~0!d~1-101516;1-101462;1-101499;1-101536;1-101501;1-101535!e~0", desc: "Armadura legendaria ligera SotO" }
    ]
  },
  ia: {
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
  },
  otros: {
    label: "Otros",
    links: [
      { link: "https://www.liveatc.net/", desc: "LiveATC (Air Traffic Comms)" },
      { link: "https://pixlr.com/es/editor/", desc: '\"Photoshop\" online (Pixlr)' },
      { link: "https://www.croxyproxy.com/_es/", desc: "CroxyProxy (proxy web)" }
    ]
  },
};

// Publicar/mezclar LINKS en `window` de forma segura para que archivos
// separados (como `links_calculados.js`) puedan añadir categorías.
if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, LINKS);
  // Mantener la referencia local `LINKS` sincronizada con `window.LINKS`
  LINKS = window.LINKS;
  // Mantener un array con el orden de las claves para poder insertar
  // categorías en posiciones concretas.
  window.LINKS_ORDER = window.LINKS_ORDER || Object.keys(window.LINKS);
}

// Helper para crear elementos con atributos y children
function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k === 'id') e.id = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  for (const c of children) {
    if (c == null) continue;
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  }
  return e;
}

// Estado de búsqueda/filtrado
const state = {
  query: '',
  category: 'all'
};

function normalize(s) {
  return String(s || '').toLowerCase();
}

function filterData() {
  const q = normalize(state.query);
  const onlyCat = state.category;
  const result = {};
  const order = (typeof window !== 'undefined' && Array.isArray(window.LINKS_ORDER)) ? window.LINKS_ORDER : Object.keys(LINKS);

  for (const key of order) {
    if (onlyCat !== 'all' && key !== onlyCat) continue;
    const cat = LINKS[key];
    const filteredLinks = cat.links.filter(item => {
      if (!q) return true;
      let fnResult = '';
      if (item && item.fn) {
        try {
          fnResult = (typeof item.fn === 'function') ? item.fn() : item.fn;
        } catch (err) {
          fnResult = '';
        }
      }
      const hay = normalize(item.desc) + ' ' + normalize(item.link) + ' ' + normalize(fnResult);
      return hay.indexOf(q) !== -1;
    });
    if (filteredLinks.length > 0) {
      result[key] = { label: cat.label, links: filteredLinks };
    }
  }
  return result;
}

function renderSearchControls(container) {
  const searchBlock = el('div', { class: 'block' });
  const h2 = el('h2', {}, 'Índice');
  const controls = el('div', { class: 'controls' });

  const input = el('input', { type: 'search', placeholder: 'Buscar (texto o URL)' });
  input.value = state.query;
  input.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderAll();
  });

  const select = el('select');
  select.appendChild(el('option', { value: 'all' }, 'Todas las categorías'));
  const orderForSelect = (typeof window !== 'undefined' && Array.isArray(window.LINKS_ORDER)) ? window.LINKS_ORDER : Object.keys(LINKS);
  for (const key of orderForSelect) {
    const opt = el('option', { value: key }, LINKS[key].label || key);
    if (state.category === key) opt.selected = true;
    select.appendChild(opt);
  }
  select.addEventListener('change', (e) => {
    state.category = e.target.value;
    renderAll();
  });

  controls.appendChild(input);
  controls.appendChild(select);
  searchBlock.appendChild(h2);
  searchBlock.appendChild(controls);
  container.appendChild(searchBlock);
}

function renderIndex(container, data) {
  const idx = el('div', { class: 'index' });
  for (const key of Object.keys(data)) {
    const cat = data[key];
    const a = el('a', { href: `#${key}` }, cat.label || key);
    idx.appendChild(a);
    const keys = Object.keys(data);
    const isLast = key === keys[keys.length - 1];
    if (!isLast) {
        idx.appendChild(el('span', { class: 'sep' }, ' | '));
    }
  }
  container.appendChild(idx);
}

function renderSections(container, data) {
  for (const key of Object.keys(data)) {
    const cat = data[key];
    const block = el('div', { class: 'block', id: key });
    block.appendChild(el('h2', {}, cat.label || key));
    const ul = el('ul');
    for (const item of cat.links) {
      const li = el('li');

      // Si hay un link, mostrar como antes (enlace clicable + descripción)
      if (item.link) {
        const a = el('a', { href: item.link, target: '_blank', rel: 'noopener noreferrer' }, '[>] ');
        li.appendChild(a);
        if (item.desc) {
          const descSpan = el('span', { class: 'desc' }, item.desc);
          li.appendChild(descSpan);
        }

      // Si no hay link pero sí hay fn, mostrar "desc: resultadoDeFn" (o solo resultado si no hay desc)
      } else if (item.fn) {
        let fnResult = '';
        try {
          fnResult = (typeof item.fn === 'function') ? item.fn() : item.fn;
        } catch (err) {
          fnResult = '';
        }
        if (item.desc) {
          li.appendChild(document.createTextNode(item.desc + ': '));
        }
        const resultSpan = el('span', { class: 'fn-result' }, String(fnResult));
        li.appendChild(resultSpan);

      // Fallback: sin link ni fn, mostrar la descripción si existe
      } else {
        if (item.desc) {
          const descSpan = el('span', { class: 'desc' }, item.desc);
          li.appendChild(descSpan);
        }
      }

      // Tags (si las hay)
      if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
          const tagSpan = el('span', { 
            class: 'tag', 
            style: `color: ${tag.color}; font-size: 0.85em; margin-left: 8px; background-color: ${darkenColor(tag.color, 0.7)}; border: 1px solid ${tag.color};` 
          }, tag.name);
          li.appendChild(tagSpan);
        });
      }

      ul.appendChild(li);
    }
    block.appendChild(ul);
    container.appendChild(block);
  }
}

function renderAll() {
  const toc = document.getElementById('toc');
  const sections = document.getElementById('sections');
  if (!toc || !sections) return;

  // limpiar
  toc.innerHTML = '';
  sections.innerHTML = '';

  // datos filtrados
  const filtered = filterData();

  // render search controls + index
  renderSearchControls(toc);
  renderIndex(toc, filtered);

  // render sections
  renderSections(sections, filtered);
}

document.addEventListener('DOMContentLoaded', renderAll);

// Exportar LINKS si se usa en otros módulos (opcional)
if (typeof module !== 'undefined') {
  module.exports = { LINKS };
}

// Exponer API para que otros archivos puedan registrar/añadir enlaces
// de forma centralizada y forzar re-render cuando sea necesario.
if (typeof window !== 'undefined') {
  window.renderAll = renderAll;
  /**
   * registerLinks(newLinks, opts)
   * - newLinks: object map key -> { label, links }
   * - opts: { position: 'start'|'end'|'index', index: number, before: key, after: key }
   */
  window.registerLinks = function(newLinks, opts = {}) {
    window.LINKS = Object.assign(window.LINKS || {}, newLinks || {});
    // asegurar orden
    window.LINKS_ORDER = window.LINKS_ORDER || [];

    const incomingKeys = Object.keys(newLinks || {});
    incomingKeys.forEach(k => {
      if (window.LINKS_ORDER.indexOf(k) !== -1) return; // ya existe
      // determinar posición
      if (opts.position === 'start') {
        window.LINKS_ORDER.unshift(k);
      } else if (typeof opts.index === 'number') {
        const idx = Math.max(0, Math.min(opts.index, window.LINKS_ORDER.length));
        window.LINKS_ORDER.splice(idx, 0, k);
      } else if (opts.before && window.LINKS_ORDER.indexOf(opts.before) !== -1) {
        const idx = window.LINKS_ORDER.indexOf(opts.before);
        window.LINKS_ORDER.splice(idx, 0, k);
      } else if (opts.after && window.LINKS_ORDER.indexOf(opts.after) !== -1) {
        const idx = window.LINKS_ORDER.indexOf(opts.after) + 1;
        window.LINKS_ORDER.splice(idx, 0, k);
      } else {
        // por defecto al final
        window.LINKS_ORDER.push(k);
      }
    });

    // sincronizar variable local
    LINKS = window.LINKS;
    if (typeof window.renderAll === 'function') window.renderAll();
  };
  // helper para obtener enlaces desde consola o extensiones
  window.getLinks = function() { return window.LINKS; };
  window.getLinksOrder = function() { return window.LINKS_ORDER; };
}

function darkenColor(color, percent) {
  // Asegurarnos de que el color esté en formato hexadecimal y válido
  if (color.startsWith('#') && color.length === 7) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Oscurecer cada componente RGB en función del porcentaje
    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));

    // Asegurarse de que los valores de RGB estén en el rango [0, 255]
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convertir los valores RGB oscurecidos de vuelta a hexadecimal
    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }
  return color; // Si el color no es hexadecimal, devolverlo tal cual
}

