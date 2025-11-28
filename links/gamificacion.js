// calculados: registro como antes (usa registerLinks cuando esté disponible)
const gamificacionCategory = {
  label: "Gamificación",
  links: [
    { desc: "Racha de visitas", fn: () => {
      const streak = (window.STREAK_DATA && window.STREAK_DATA.streak) || 0;
      return streak + " día" + (streak !== 1 ? "s" : "");
    }},
    { desc: "Logros desbloqueados hoy", fn: () => {
      const unlocked = (window.ACHIEVEMENTS_DATA && window.ACHIEVEMENTS_DATA.unlockedThisVisit) || [];
      if (unlocked.length === 0) return "Ninguno hoy";
      return unlocked.map(a => a.name).join(", ");
    }},
    { desc: "Total logros", fn: () => {
      const total = ((window.ACHIEVEMENTS_DATA && window.ACHIEVEMENTS_DATA.list) || []).length || 0;
      const unlocked = Object.keys((window.ACHIEVEMENTS_DATA && window.ACHIEVEMENTS_DATA.unlocked) || {}).length;
      return `${unlocked} / ${total}`;
    }},
  ]
};

// Registrar la categoría (como antes)
if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ gamificacion: gamificacionCategory }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { gamificacion: gamificacionCategory });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.gamificacion = gamificacionCategory;
}

// --- Interacción: al hacer click en el valor de "Total logros" mostrar listado
(function(){

  function getUnlockedList() {
    const data = window.ACHIEVEMENTS_DATA || { unlocked: {}, list: [], unlockedThisVisit: [] };
    const unlockedMap = data.unlocked || {};
    const all = data.list || [];
    const out = [];
    for (const a of all) {
      if (unlockedMap[a.id]) out.push(a);
    }
    return { unlocked: out, unlockedThisVisit: data.unlockedThisVisit || [] };
  }

  function attachClickToTotal() {
    const allLis = document.querySelectorAll('li');
    allLis.forEach(li => {
      if (!li.textContent) return;
      if (li.textContent.trim().startsWith('Total logros')) {
        const span = li.querySelector('.fn-result');
        if (!span) return;
        if (span.dataset.nxAttached === '1') return;
        span.style.cursor = 'pointer';
        span.title = 'Hacer click para ver los logros desbloqueados';
        span.dataset.nxAttached = '1';
        span.addEventListener('click', (e) => {
          e.preventDefault();
          const { unlocked, unlockedThisVisit } = getUnlockedList();
          var modalObj = null;
          if (typeof window !== 'undefined' && typeof window.nxCreateModal === 'function') {
            modalObj = window.nxCreateModal('Logros desbloqueados');
          }
          if (!modalObj) return; // no podemos mostrar modal
          const modal = modalObj.modal;
          const list = modalObj.body || modalObj.list || null;

          // Mostrar tanto desbloqueados como bloqueados para que el usuario vea
          // cuántos le quedan por desbloquear.
          const allAchievements = (window.ACHIEVEMENTS_DATA && window.ACHIEVEMENTS_DATA.list) || [];
          const unlockedMap = (window.ACHIEVEMENTS_DATA && window.ACHIEVEMENTS_DATA.unlocked) || {};

          const unlockedList = allAchievements.filter(a => !!unlockedMap[a.id]);
          const lockedList = allAchievements.filter(a => !unlockedMap[a.id]);

          // Encabezado con counts
          const hdrUnlocked = document.createElement('h4');
          hdrUnlocked.textContent = `Desbloqueados (${unlockedList.length})`;
          list.appendChild(hdrUnlocked);

          if (unlockedList.length === 0) {
            const p = document.createElement('div');
            p.textContent = 'No hay logros desbloqueados aún.';
            list.appendChild(p);
          } else {
            const ul = document.createElement('ul');
            ul.style.listStyle = 'none';
            ul.style.padding = '0';
            unlockedList.forEach(a => {
              const li2 = document.createElement('li');
              li2.style.marginBottom = '8px';
              const strong = document.createElement('strong');
              strong.textContent = a.name || a.id;
              li2.appendChild(strong);
              if (a.desc) {
                const dash = document.createTextNode(' — ' + a.desc);
                li2.appendChild(dash);
              }
              // marcar si fue desbloqueado en esta visita
              if (unlockedThisVisit.find(x => x.id === a.id)) {
                const tag = document.createElement('span');
                tag.textContent = ' (nuevo)';
                tag.className = 'nx-ach-new';
                li2.appendChild(tag);
              }
              ul.appendChild(li2);
            });
            list.appendChild(ul);
          }

          // Bloqueados
          const hdrLocked = document.createElement('h4');
          hdrLocked.textContent = `Bloqueados (${lockedList.length})`;
          list.appendChild(hdrLocked);

          if (lockedList.length === 0) {
            const p = document.createElement('div');
            p.textContent = 'Enhorabuena: has desbloqueado todos los logros.';
            list.appendChild(p);
          } else {
            const ul2 = document.createElement('ul');
            ul2.style.listStyle = 'none';
            ul2.style.padding = '0';
            lockedList.forEach(a => {
              const li3 = document.createElement('li');
              li3.style.marginBottom = '8px';
              li3.className = 'nx-ach-locked';
              const strong = document.createElement('strong');
              strong.textContent = a.name || a.id;
              li3.appendChild(strong);
              if (a.desc) {
                const dash = document.createTextNode(' — ' + a.desc);
                li3.appendChild(dash);
              }
              ul2.appendChild(li3);
            });
            list.appendChild(ul2);
          }

          document.body.appendChild(modal);
        });
      }
    });
  }

  function install() {
    try {
      attachClickToTotal();
    } catch (e) {
      // silencioso
    }
  }

  if (typeof window !== 'undefined') {
    if (typeof window.renderAll === 'function') {
      const _orig = window.renderAll.bind(window);
      window.renderAll = function() {
        const res = _orig.apply(this, arguments);
        install();
        return res;
      };
      setTimeout(install, 0);
    } else {
      window.addEventListener('DOMContentLoaded', install);
      setTimeout(install, 200);
    }
  }

})();