(function() {

    const STORAGE_KEY = "nx_achievements_data";

    // Lista de logros configurables:
    const ACHIEVEMENTS_LIST = [
        {
            id: "first_visit",
            name: "¡Primera visita!",
            desc: "Has visitado la página por primera vez.",
            condition: () => {
                const s = window.STREAK_DATA;
                return !!s?.lastVisit && s.streak >= 1;
            }
        },
        {
            id: "three_day_streak",
            name: "Ritmo constante",
            desc: "Has conseguido una racha de 3 días.",
            condition: () => (window.STREAK_DATA?.streak || 0) >= 3
        },
        {
            id: "seven_day_streak",
            name: "Una semana completa",
            desc: "7 días seguidos visitando la página.",
            condition: () => (window.STREAK_DATA?.streak || 0) >= 7
        },
        {
            id: "return_after_break",
            name: "Volviendo con ganas",
            desc: "Has vuelto tras romper la racha.",
            condition: () => {
                if (!window.STREAK_DATA) return false;
                return window.STREAK_DATA.streak === 1 && window.STREAK_DATA.isNewDay;
            }
        },
        {
            id: "month_streak",
            name: "Un mes completo",
            desc: "30 días seguidos visitando la página.",
            condition: () => (window.STREAK_DATA?.streak || 0) >= 30
        },
        {
            id: "visit_saturday",
            name: "Sábado explorador",
            desc: "Has visitado la web un sábado.",
            condition: () => {
                try {
                    return (new Date().getDay() === 6);
                } catch (e) { return false; }
            }
        },
        {
            id: "visit_sunday",
            name: "Dominguero",
            desc: "Has visitado la web un domingo.",
            condition: () => {
                try {
                    return (new Date().getDay() === 0);
                } catch (e) { return false; }
            }
        },

        {
            id: "christmas_visit",
            name: "Navideño",
            desc: "Has visitado la web el día de Navidad (25 de diciembre).",
            condition: () => {
                try {
                    const now = new Date();
                    return (now.getMonth() === 11 && now.getDate() === 25);
                } catch (e) { return false; }
            }
        },
        {
            id: "newyear_visit",
            name: "Año nuevo",
            desc: "Has visitado la web el día de Año Nuevo (1 de enero).",
            condition: () => {
                try {
                    const now = new Date();
                    return (now.getMonth() === 0 && now.getDate() === 1);
                } catch (e) { return false; }
            }
        },
        {
            id: "valentines_visit",
            name: "San Valentín",
            desc: "Has visitado la web el día de San Valentín (14 de febrero).",
            condition: () => {
                try {
                    const now = new Date();
                    return (now.getMonth() === 1 && now.getDate() === 14);
                } catch (e) { return false; }
            }
        },
        {
            id: "blue_monday",
            name: "Blue Monday",
            desc: "Has visitado la web el Blue Monday (tercer lunes de enero).",
            condition: () => {
                try {
                    const now = new Date();
                    const year = now.getFullYear();
                    if (now.getMonth() !== 0) return false; // enero
                    const d = new Date(year, 0, 1); // 1 de enero
                    const offset = (1 - d.getDay() + 7) % 7; // días hasta el primer lunes
                    const firstMondayDate = 1 + offset;
                    const thirdMondayDate = firstMondayDate + 14;
                    return now.getDate() === thirdMondayDate;
                } catch (e) { return false; }
            }
        },

            // Logros por clicks en enlaces
            {
                id: "links_1",
                name: "Explorador",
                desc: "Has hecho 1 click en enlaces de la página.",
                condition: () => (window.LINKS_DATA?.clicks || 0) >= 1
            },
            {
                id: "links_5",
                name: "Curioso",
                desc: "Has hecho 5 clicks en enlaces de la página.",
                condition: () => (window.LINKS_DATA?.clicks || 0) >= 5
            },
            {
                id: "links_10",
                name: "Navegante",
                desc: "Has hecho 10 clicks en enlaces de la página.",
                condition: () => (window.LINKS_DATA?.clicks || 0) >= 10
            },
            {
                id: "links_25",
                name: "Enlazador",
                desc: "Has usado 25 links de esta página.",
                condition: () => (window.LINKS_DATA?.clicks || 0) >= 25
            },
            {
                id: "links_50",
                name: "Manual del explorador",
                desc: "Has usado 50 links de esta página.",
                condition: () => (window.LINKS_DATA?.clicks || 0) >= 50
            },
            {
                id: "links_100",
                name: "Fanático de enlaces",
                desc: "Has usado 100 links de esta página.",
                condition: () => (window.LINKS_DATA?.clicks || 0) >= 100
            },

    ];

    // Seguimiento de clicks en enlaces (persistente en localStorage)
    const LINKS_STORAGE_KEY = "nx_link_clicks";
    let _linksStored = {};
    try { _linksStored = JSON.parse(localStorage.getItem(LINKS_STORAGE_KEY)) || {}; } catch (e) { _linksStored = {}; }
    const LINKS_DATA = { clicks: _linksStored.clicks || 0, lastClick: _linksStored.lastClick || null };
    window.LINKS_DATA = LINKS_DATA;
    function _saveLinkClicks() {
        try { localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify({ clicks: LINKS_DATA.clicks, lastClick: LINKS_DATA.lastClick })); } catch (e) {}
    }
    if (typeof document !== 'undefined') {
        document.addEventListener('click', function (e) {
            try {
                const a = e.target && e.target.closest && e.target.closest('a');
                if (!a) return;
                LINKS_DATA.clicks = (LINKS_DATA.clicks || 0) + 1;
                LINKS_DATA.lastClick = new Date().toISOString();
                window.LINKS_DATA = LINKS_DATA;
                _saveLinkClicks();
            } catch (e) { }
        }, true);
    }

    // Cargar logros conseguidos
    let stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    // Fecha en formato YYYY-MM-DD para marcar desbloqueos por día
    const today = new Date().toISOString().slice(0,10);

    // Reconstruir los logros desbloqueados en esta visita (si ya hay marcas con fecha de hoy)
    let unlockedThisVisit = [];
    for (const ach of ACHIEVEMENTS_LIST) {
        const val = stored[ach.id];
        if (typeof val === 'string' && val === today) {
            unlockedThisVisit.push(ach);
        }
    }

    // Evaluar condiciones y marcar nuevos desbloqueos con la fecha de hoy
    for (const ach of ACHIEVEMENTS_LIST) {
        const already = !!stored[ach.id]; // compatible con boolean true o string fecha
        if (!already && ach.condition()) {
            stored[ach.id] = today;
            unlockedThisVisit.push(ach);
        }
    }

    // Guardar en localStorage (map id -> fecha ISO o true en versiones antiguas)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    // Si existe `window.showToast`, usarlo para notificar logros desbloqueados
    try {
        if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
            for (const ach of unlockedThisVisit) {
                try { window.showToast(ach); } catch (e) {}
            }
        }
    } catch (e) {}

    // Exponer globalmente
    window.ACHIEVEMENTS_DATA = {
        unlocked: stored,
        unlockedThisVisit: unlockedThisVisit,
        list: ACHIEVEMENTS_LIST
    };

})();
