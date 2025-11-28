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
