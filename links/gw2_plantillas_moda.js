// guild_wars_2_moda
const guild_wars_2_moda = {
  label: "Guild Wars 2: moda",
  links: []
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ guild_wars_2_moda: guild_wars_2_moda }, { after: 'guild_wars_2' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { guild_wars_2_moda });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.guild_wars_2_moda = guild_wars_2_moda;
}
