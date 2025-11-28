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
    ];

    // Cargar logros conseguidos
    let stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    let unlockedThisVisit = [];

    // Evaluar condiciones
    for (const ach of ACHIEVEMENTS_LIST) {
        const already = stored[ach.id] === true;
        if (!already && ach.condition()) {
            stored[ach.id] = true;
            unlockedThisVisit.push(ach);
        }
    }

    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    // Exponer globalmente
    window.ACHIEVEMENTS_DATA = {
        unlocked: stored,
        unlockedThisVisit: unlockedThisVisit,
        list: ACHIEVEMENTS_LIST
    };

})();
