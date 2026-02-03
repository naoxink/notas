// guild_wars_2_moda
const guild_wars_2_moda = {
  label: "Guild Wars 2: moda",
  links: [
    { desc: 'Kralkatorrik Thief', fn: () => '[&D1gD3RkBAAEAAQABAIgvaQZpBlcFdQAnL1cFaQZpBkMApjMZAGkGVwV1AGkAVwVpBnUAAQCkL2kGaQZXBXUAqi+AAWkGVwV1AEwAlADGAcYBxgGVMAAAvSlKEmIOAAD/fg==]' },
    { desc: 'Guardián legendario', fn: () => '[&D1YDbitxBhEGwwFxBvUbGQAPAN8EAQDgGxkADwABAAEAwxvfBA8ADwABAMQbGQAPAAEAAQDdG1UC9QQCBg8AthtVAvUEAgYPAEwAcQbRBUMAQwBLEQsYqxUAAEISQxL9fg==]' },
    { desc: 'Guerrera de fuego', fn: () => '[&D1YDvyQBAAEAAQABAG0eTABdBV0FAQC1IEwAXQVMAF8FjyBdBU0ATQBfBV0eTAABAF0FAQBYHkwA0QUBAAEAkCBMAEwAAQBfBSQAOgZ9BsoClAB9Ep0SJCMkI28rAADdfg==]' }
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ guild_wars_2_moda: guild_wars_2_moda }, { after: 'guild_wars_2' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { guild_wars_2_moda });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.guild_wars_2_moda = guild_wars_2_moda;
}
