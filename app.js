// Datos de enlaces organizados por categoría
const LINKS = {
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
      { link: "https://open.spotify.com/playlist/7BNaFTLFCkJz0EXcP4Jmo9?si=46333dbe1efc4cd4", desc: "Lista Tungsteno (Spotify)" },
      { link: "https://open.spotify.com/playlist/5jqP6Y1neQBsUEiO0vXKtw?si=0c8703f052c1433f", desc: "Lista Random (Spotify)" }
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
  series_online: {
    label: "Series online",
    links: [
      { link: "https://capitulosos.blogspot.com/p/series-gratis-online.html", desc: "Capitulosos" },
      { link: "https://verdragonball.online/", desc: "Dragon Ball" },
      { link: "https://cuatro.comunidadmontepinar.eu/", desc: "La que se avecina" },
      { link: "https://anhqv.eu/visualizador/", desc: "Aquí no hay quien viva" },
      { link: "https://www.tokyvideo.com/es/serie/cosas-de-casa/8", desc: "Cosas de casa" },
      { link: "https://fmhy.net/", desc: "freemediaheckyeah" },
      { link: "https://pstream.mov/", desc: "pstream" },
      { link: "https://www.cineby.app/", desc: "Cineby" },
      { link: "https://pluto.tv/", desc: "PlutoTV" }
    ]
  },
  guild_wars_2: {
    label: "Guild Wars 2",
    links: [
      { link: "https://naoxink.github.io/Mazs", desc: "Daily Fractals, strikes & events" },
      { link: "https://gw2efficiency.com/", desc: "GW2 Efficiency" },
      { link: "https://wiki.guildwars2.com/wiki/Event_timers", desc: "Event Timer" },
      { link: "https://portfolio-naoxink.vercel.app/posts/guild-wars-ost-collection", desc: "Compilación OSTs" }
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
      { link: "https://pixlr.com/es/editor/", desc: '\"Photoshop\" online (Pixlr)' }
    ]
  }
};

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

  for (const key of Object.keys(LINKS)) {
    if (onlyCat !== 'all' && key !== onlyCat) continue;
    const cat = LINKS[key];
    const filteredLinks = cat.links.filter(item => {
      if (!q) return true;
      const hay = normalize(item.desc) + ' ' + normalize(item.link);
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
  for (const key of Object.keys(LINKS)) {
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
      // El enlace visible es la URL (clickable). La descripción va después como texto sin enlace.
      const a = el('a', { href: item.link, target: '_blank', rel: 'noopener noreferrer' }, item.link);
      const li = el('li');
      li.appendChild(a);
      if (item.desc) {
        // separar con un guion largo y un espacio
        const descSpan = el('span', { class: 'desc' }, ' — ' + item.desc);
        li.appendChild(descSpan);
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
