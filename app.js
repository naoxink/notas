// Datos de enlaces: ahora vacíos por defecto. Cada sección se registrará desde
// archivos individuales en `links/` usando `window.registerLinks`.
let LINKS = {};

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

/**
 * nxCreateModal(title)
 * Devuelve { modal, body } donde `body` es un contenedor donde insertar contenido.
 * Se añade a `window` para uso global.
 */
function nxCreateModal(titleText) {
  const modal = document.createElement('div');
  modal.className = 'nx-modal';

  const box = document.createElement('div');
  box.className = 'nx-modal-box';

  const close = document.createElement('button');
  close.className = 'nx-modal-close';
  close.textContent = 'Cerrar';
  close.addEventListener('click', () => { if (modal.parentNode) modal.parentNode.removeChild(modal); });

  const title = document.createElement('h3');
  title.className = 'nx-modal-title';
  title.textContent = titleText || '';

  const body = document.createElement('div');
  body.className = 'nx-modal-body';

  box.appendChild(close);
  box.appendChild(title);
  box.appendChild(body);
  modal.appendChild(box);

  return { modal, body };
}

if (typeof window !== 'undefined') window.nxCreateModal = nxCreateModal;

// Small global toast helper to show short notifications across the site
function showToast(payload) {
  if (typeof document === 'undefined') return;
  try {
    const title = (payload && payload.name) || (payload && payload.title) || '';
    const message = (payload && payload.desc) || (payload && payload.message) || (typeof payload === 'string' ? payload : '');

    let container = document.getElementById('nx-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'nx-toast-container';
      container.className = 'nx-toast-container';
      document.body.appendChild(container);
    }

    const t = document.createElement('div');
    t.className = 'nx-toast';
    const inner = document.createElement('div');
    inner.className = 'nx-toast-inner';
    if (title) {
      const h = document.createElement('div');
      h.className = 'nx-toast-title';
      h.textContent = title;
      inner.appendChild(h);
    }
    if (message) {
      const p = document.createElement('div');
      p.className = 'nx-toast-message';
      p.textContent = message;
      inner.appendChild(p);
    }
    t.appendChild(inner);
    container.appendChild(t);

    // trigger animation
    requestAnimationFrame(() => { t.classList.add('nx-toast-enter'); });

    // remove after timeout
    const REMOVE_DELAY = 3500;
    setTimeout(() => {
      t.classList.remove('nx-toast-enter');
      t.classList.add('nx-toast-leave');
      setTimeout(() => { try { t.remove(); } catch (e) {} }, 300);
    }, REMOVE_DELAY);

    return t;
  } catch (e) { return null; }
}

if (typeof window !== 'undefined') window.showToast = showToast;

// Estado de búsqueda/filtrado inicializado desde la URL si existe
const urlParams = new URLSearchParams(window.location.search);
const state = {
  query: urlParams.get('q') || '',
  category: urlParams.get('cat') || 'all' // Lee el parámetro 'cat'
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

  const input = el('input', { id: 'search-input', type: 'search', placeholder: 'Buscar (texto o URL)' });
  input.value = state.query;
  input.addEventListener('input', (e) => {
    state.query = e.target.value;
    
    const url = new URL(window.location);
    if (state.query) url.searchParams.set('q', state.query);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);

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
    
    // Actualizar la URL de forma silenciosa
    const url = new URL(window.location);
    if (state.category === 'all') {
      url.searchParams.delete('cat');
    } else {
      url.searchParams.set('cat', state.category);
    }
    window.history.replaceState({}, '', url);

    renderAll();
  });

  const textFiltrarCategoria = el('span')
  textFiltrarCategoria.textContent = ' Filtrar categoría: '

  controls.appendChild(input);
  controls.appendChild(textFiltrarCategoria)
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
        a.title = item.link
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

      } else if (item.click2copy) {
        if (item.desc) {
          li.appendChild(document.createTextNode(item.desc + ': '));
        }
        const span = crearSpanCopiable(item.click2copy, '[Copiar código al portapapeles]')
        li.appendChild(span)

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

  // Guardar estado de foco/selección del input de búsqueda para restaurarlo.
  let searchState = null;
  try {
    const active = document.activeElement;
    if (active && active.tagName === 'INPUT' && active.type === 'search') {
      searchState = {
        value: active.value,
        selectionStart: active.selectionStart,
        selectionEnd: active.selectionEnd
      };
    }
  } catch (err) {
    searchState = null;
  }

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

  // Restaurar foco y selección en el input de búsqueda si procede
  if (searchState) {
    const newInput = document.getElementById('search-input');
    if (newInput) {
      newInput.focus();
      try {
        // restaurar selección/caret
        newInput.setSelectionRange(searchState.selectionStart, searchState.selectionEnd);
      } catch (e) {
        // ignore si no es soportado
      }
    }
  }
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

/**
 * Crea un elemento span que copia su contenido al portapapeles al hacer clic.
 * @param {string} texto - El texto que se mostrará y se copiará.
 * @returns {HTMLElement} El elemento span configurado.
 */
function crearSpanCopiable(texto, placeholder) {
    // 1. Creamos el elemento span
    const elSpan = document.createElement('span');
    elSpan.classList.add('fn-result')
    elSpan.textContent = placeholder;
    elSpan.style.cursor = 'pointer'

    // 3. Añadimos el listener del evento click
    elSpan.addEventListener('click', () => {
      copiar(texto)
    });

    return elSpan;
}

function copiar(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            showToast({
              title: '✅ ¡Éxito!',
              message: `${texto.substring(0, 35) + (texto.length > 35 ? '...' : '')} se ha copiado al portapapeles.`
            })
        })
        .catch(err => {
            console.error('❌ Error al intentar copiar: ', err);
        });
}