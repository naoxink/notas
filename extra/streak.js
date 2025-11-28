(function() {

    const STORAGE_KEY = "nx_streak_data";

    // Carga desde localStorage o inicia valores
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        lastVisit: null,
        streak: 0
    };

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // yyyy-mm-dd

    let isNewDay = false;

    if (data.lastVisit !== todayStr) {
        // Si la última visita fue ayer
        if (data.lastVisit) {
            const last = new Date(data.lastVisit);
            const diff = (today - last) / (1000 * 60 * 60 * 24);

            if (diff < 2) {
                data.streak += 1;
            } else {
                data.streak = 1; // reiniciar racha
            }
        } else {
            data.streak = 1; // primera visita
        }

        data.lastVisit = todayStr;
        isNewDay = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // ↓↓↓ Se expone globalmente ↓↓↓
    window.STREAK_DATA = {
        streak: data.streak,
        lastVisit: data.lastVisit,
        isNewDay: isNewDay
    };

})();
