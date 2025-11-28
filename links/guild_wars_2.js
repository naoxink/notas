// guild_wars_2
const guild_wars_2 = {
  label: "Guild Wars 2",
  links: [
    { link: "https://naoxink.github.io/Mazs", desc: "Daily Fractals, strikes & events" },
    { link: "https://gw2efficiency.com/", desc: "GW2 Efficiency" },
    { link: "https://wiki.guildwars2.com/wiki/Event_timers", desc: "Event Timer" },
    { link: "https://portfolio-naoxink.vercel.app/posts/guild-wars-ost-collection", desc: "Compilación OSTs" },
    { link: "https://gw2efficiency.com/crafting/calculator/a~1!b~0!c~0!d~1-80248;1-80131;1-80190;1-80111;1-80356;1-80399!e~0", desc: "Armadura legendaria ligera raid" },
    { link: "https://gw2efficiency.com/crafting/calculator/a~1!b~0!c~0!d~1-101516;1-101462;1-101499;1-101536;1-101501;1-101535!e~0", desc: "Armadura legendaria ligera SotO" }
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
