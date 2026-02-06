// guild_wars_2
const guild_wars_2 = {
  label: "Guild Wars 2",
  links: [
    { link: "https://naoxink.github.io/Mazs", desc: "Daily Fractals, strikes & events" },
    { link: "https://wiki.guildwars2.com/wiki/Event_timers", desc: "Event Timer" },
    { link: "https://portfolio-naoxink.vercel.app/posts/guild-wars-ost-collection", desc: "Compilación OSTs" },
    { link: "https://es-forum.guildwars2.com/", desc: "Foro oficial" },
    { link: "https://wiki.guildwars2.com/wiki/Endless_Summer", desc: "[wiki] Verano infinito (anillo legendario nuevo)"},
    { link: "https://gw2efficiency.com/", desc: "GW2 Efficiency" },
    { link: "https://gw2efficiency.com/crafting/calculator/a~0!b~0!c~0!d~1-80248;1-80131;1-80190;1-80111;1-80356;1-80399!e~0!f~1", desc: "GW2 Efficiency: Armor legendaria ligera"},
    { link: "https://gw2efficiency.com/crafting/calculator/a~0!b~0!c~0!d~1-107022!e~0!f~1", desc: "GW2 Efficiency: Anillo legendario Verano infinito"}
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ guild_wars_2: guild_wars_2 }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { guild_wars_2 });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.guild_wars_2 = guild_wars_2;
}
