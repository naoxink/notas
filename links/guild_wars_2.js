// guild_wars_2
const guild_wars_2 = {
  label: "Guild Wars 2",
  links: [
    { link: "https://naoxink.github.io/Mazs", desc: "Daily Fractals, strikes & events" },
    { link: "https://wiki.guildwars2.com/wiki/Event_timers", desc: "Event Timer", tags: [ { name: "Wiki", color: "#ffe59d" } ] },
    { link: "https://portfolio-naoxink.vercel.app/posts/guild-wars-ost-collection", desc: "Compilación OSTs" },
    { link: "https://es-forum.guildwars2.com/", desc: "Foro oficial" },
    { link: "https://wiki.guildwars2.com/wiki/Endless_Summer", desc: "Verano infinito (anillo legendario)", tags: [ { name: "Wiki", color: "#ffe59d" } ] },
    { link: "https://gw2efficiency.com/", desc: "GW2 Efficiency" },
    { link: "https://gw2efficiency.com/crafting/calculator/a~0!b~0!c~0!d~1-80248;1-80131;1-80190;1-80111;1-80356;1-80399!e~0!f~1", desc: "Armor legendaria ligera", tags: [ { name: "GW2 Efficiency", color: "#c46464" } ] },
    { link: "https://gw2efficiency.com/crafting/calculator/a~0!b~0!c~0!d~1-107022!e~0!f~1", desc: "Anillo legendario Verano infinito", tags: [ { name: "GW2 Efficiency", color: "#c46464" } ] },
    { desc: 'Kralkatorrik Thief', click2copy: '[&D1gD3RkBAAEAAQABAIgvaQZpBlcFdQAnL1cFaQZpBkMApjMZAGkGVwV1AGkAVwVpBnUAAQCkL2kGaQZXBXUAqi+AAWkGVwV1AEwAlADGAcYBxgGVMAAAvSlKEmIOAAD/fg==]', tags: [ { name: "Plantilla de moda", color: "#1fbbae" } ] },
    { desc: 'Guardián legendario', click2copy: '[&D1YDbitxBhEGwwFxBvUbGQAPAN8EAQDgGxkADwABAAEAwxvfBA8ADwABAMQbGQAPAAEAAQDdG1UC9QQCBg8AthtVAvUEAgYPAEwAcQbRBUMAQwBLEQsYqxUAAEISQxL9fg==]', tags: [ { name: "Plantilla de moda", color: "#1fbbae" } ] },
    { desc: 'Guerrera de fuego', click2copy: '[&D1YDvyQBAAEAAQABAG0eTABdBV0FAQC1IEwAXQVMAF8FjyBdBU0ATQBfBV0eTAABAF0FAQBYHkwA0QUBAAEAkCBMAEwAAQBfBSQAOgZ9BsoClAB9Ep0SJCMkI28rAADdfg==]', tags: [ { name: "Plantilla de moda", color: "#1fbbae" } ] }
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
