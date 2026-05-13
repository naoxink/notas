// esoterismo
const esoterismo = {
  label: "Esoterismo",
  links: [
    { link: "https://www.astrolink.com/es/tarot", desc: "Significados de las cartas del tarot" },
    { link: "https://labyrinthos.co/", desc: "Labyrinthos app, significados y tiradas de tarot", tags: [ { name: 'Inglés', color: '#dd9c3a' } ] },
    { desc: "Tarot Daemonibus", link: "https://www.google.es/search?q=DAEMONIBUS+TAROT&ie=UTF-8&oe=UTF-8&hl=es-es" },
    { desc: "Tarot Thoth Alister Crowley", link: "https://www.google.es/search?client=safari&hs=KbzU&sca_esv=891cb67090587ec1&hl=es-es&udm=2&q=tarot+crowley+thoth&spell=1&sa=X&ved=2ahUKEwj4j9T_x9mTAxXQ9gIHHS2JF8EQBSgAegQICBAB&biw=375&bih=635&dpr=3" },
    { desc: "Tarot Vox Arcana", link: "https://www.google.es/search?q=tarot+vox+arcana&client=safari&hs=9DK&sca_esv=a6fe58f4c6c3d920&hl=es-es&udm=2&biw=375&bih=635&ei=cK_TaYykOOGUi-gPmNqf6Ak&oq=tarot+vox+arcana&gs_lp=EhJtb2JpbGUtZ3dzLXdpei1pbWciEHRhcm90IHZveCBhcmNhbmEyBRAAGIAEMgYQABgFGB4yBhAAGAgYHjIGEAAYCBgeMgYQABgIGB5IjBVQqwlYlxJwAHgAkAEBmAF1oAGHBaoBAzcuMbgBA8gBAPgBAZgCB6ACpwTCAggQABiABBiiBMICBBAhGBXCAgQQABgemAMAiAYBkgcDNi4xoAfhC7IHAzYuMbgHpwTCBwUxLjIuNMgHEoAIAA&sclient=mobile-gws-wiz-img" },
    { desc: "Carta del día", fn() {
      const carta = obtenerCartaDelDia();
      return `${carta.n} [${carta.s}]`
    }}
  ]
};

if (typeof window !== 'undefined' && typeof window.registerLinks === 'function') {
  window.registerLinks({ esoterismo: esoterismo }, { position: 'end' });
} else if (typeof window !== 'undefined') {
  window.LINKS = Object.assign(window.LINKS || {}, { esoterismo });
  if (typeof window.renderAll === 'function') window.renderAll();
} else if (typeof LINKS !== 'undefined') {
  LINKS.esoterismo = esoterismo;
}


function obtenerCartaDelDia() {
  const mazo = [
    // --- ARCANOS MAYORES (0-21) ---
    { n: "El Loco", s: "Inicios, libertad, fe, espontaneidad" },
    { n: "El Mago", s: "Poder, acción, ingenio, manifestación" },
    { n: "La Suma Sacerdotisa", s: "Intuición, misterio, subconsciente, silencio" },
    { n: "La Emperatriz", s: "Abundancia, naturaleza, fertilidad, creatividad" },
    { n: "El Emperador", s: "Estructura, autoridad, control, estabilidad" },
    { n: "El Hierofante", s: "Tradición, sabiduría, ética, conformidad" },
    { n: "Los Enamorados", s: "Amor, armonía, elección, valores" },
    { n: "El Carro", s: "Éxito, voluntad, dirección, victoria" },
    { n: "La Fuerza", s: "Coraje, paciencia, compasión, control suave" },
    { n: "El Ermitaño", s: "Soledad, introspección, guía, retiro" },
    { n: "La Rueda de la Fortuna", s: "Cambio, destino, suerte, ciclos" },
    { n: "La Justicia", s: "Equidad, verdad, ley, causa y efecto" },
    { n: "El Colgado", s: "Pausa, perspectiva, sacrificio, rendición" },
    { n: "La Muerte", s: "Finales, transformación, transición, soltar" },
    { n: "La Templanza", s: "Equilibrio, moderación, paciencia, propósito" },
    { n: "El Diablo", s: "Atadura, sombra, materialismo, tentación" },
    { n: "La Torre", s: "Caos, revelación, despertar, ruptura" },
    { n: "La Estrella", s: "Esperanza, fe, renovación, inspiración" },
    { n: "La Luna", s: "Miedo, ilusión, intuición, confusión" },
    { n: "El Sol", s: "Alegría, éxito, vitalidad, confianza" },
    { n: "El Juicio", s: "Absolución, llamada, renacer, evaluación" },
    { n: "El Mundo", s: "Logro, viaje, cierre, integridad" },

    // --- BASTOS (Acción / Pasión) ---
    { n: "As de Bastos", s: "Inspiración, potencial, chispa, deseo" },
    { n: "Dos de Bastos", s: "Planificación, decisiones, descubrimiento, progreso" },
    { n: "Tres de Bastos", s: "Expansión, previsión, confianza, espera" },
    { n: "Cuatro de Bastos", s: "Celebración, hogar, alegría, armonía" },
    { n: "Cinco de Bastos", s: "Competencia, conflicto, tensión, diversidad" },
    { n: "Seis de Bastos", s: "Reconocimiento, victoria, orgullo, éxito" },
    { n: "Siete de Bastos", s: "Defensa, perseverancia, reto, posición" },
    { n: "Ocho de Bastos", s: "Velocidad, movimiento, noticias, alineación" },
    { n: "Nueve de Bastos", s: "Resiliencia, cautela, última parada, vigor" },
    { n: "Diez de Bastos", s: "Carga, responsabilidad, agotamiento, culminación" },
    { n: "Sota de Bastos", s: "Entusiasmo, exploración, noticia libre" },
    { n: "Caballero de Bastos", s: "Energía, pasión, impulsividad, aventura" },
    { n: "Reina de Bastos", s: "Confianza, calidez, coraje, independencia" },
    { n: "Rey de Bastos", s: "Liderazgo, visión, honor, emprendimiento" },

    // --- COPAS (Emociones / Relaciones) ---
    { n: "As de Copas", s: "Amor nuevo, intuición, espiritualidad" },
    { n: "Dos de Copas", s: "Conexión, asociación, atracción, unidad" },
    { n: "Tres de Copas", s: "Amistad, comunidad, celebración, apoyo" },
    { n: "Cuatro de Copas", s: "Apatía, introspección, meditación, rechazo" },
    { n: "Cinco de Copas", s: "Pérdida, arrepentimiento, decepción, duelo" },
    { n: "Seis de Copas", s: "Nostalgia, inocencia, reencuentro, pasado" },
    { n: "Siete de Copas", s: "Ilusiones, opciones, sueños, fantasía" },
    { n: "Ocho de Copas", s: "Abandono, retiro, búsqueda de verdad" },
    { n: "Nueve de Copas", s: "Deseo cumplido, gratitud, placer" },
    { n: "Diez de Copas", s: "Felicidad divina, familia, plenitud" },
    { n: "Sota de Copas", s: "Sensibilidad, mensaje, creatividad incipiente" },
    { n: "Caballero de Copas", s: "Romance, encanto, idealismo, invitación" },
    { n: "Reina de Copas", s: "Empatía, compasión, madurez emocional" },
    { n: "Rey de Copas", s: "Control emocional, calma, generosidad" },

    // --- ESPADAS (Mente / Desafíos) ---
    { n: "As de Espadas", s: "Claridad, avance, intelecto, verdad" },
    { n: "Dos de Espadas", s: "Indecisión, estancamiento, tregua, ceguera" },
    { n: "Tres de Espadas", s: "Dolor, traición, pena, separación" },
    { n: "Cuatro de Espadas", "s": "Descanso, recuperación, calma, meditación" },
    { n: "Cinco de Espadas", s: "Derrota, deshonor, conflicto, victoria vacía" },
    { n: "Seis de Espadas", s: "Transición, alejamiento, alivio, viaje" },
    { n: "Siete de Espadas", s: "Estrategia, sigilo, engaño, independencia" },
    { n: "Ocho de Espadas", s: "Atrapamiento, impotencia, autolimitación" },
    { n: "Nueve de Espadas", s: "Ansiedad, pesadilla, miedo, angustia" },
    { n: "Diez de Espadas", s: "Final drástico, victimismo, traición total" },
    { n: "Sota de Espadas", s: "Curiosidad, vigilancia, agudeza, ideas" },
    { n: "Caballero de Espadas", s: "Acción rápida, ambición, lógica, asertividad" },
    { n: "Reina de Espadas", s: "Objetividad, franqueza, agudeza mental" },
    { n: "Rey de Espadas", s: "Autoridad mental, verdad, juicio, lógica" },

    // --- OROS (Mundo Físico / Trabajo) ---
    { n: "As de Oros", s: "Oportunidad, prosperidad, seguridad, salud" },
    { n: "Dos de Oros", s: "Equilibrio, prioridad, adaptación, flujo" },
    { n: "Tres de Oros", s: "Trabajo en equipo, aprendizaje, maestría" },
    { n: "Cuatro de Oros", s: "Ahorro, posesividad, seguridad, control" },
    { n: "Cinco de Oros", s: "Dificultad, carencia, aislamiento, pobreza" },
    { n: "Seis de Oros", s: "Generosidad, caridad, equilibrio financiero" },
    { n: "Siete de Oros", s: "Inversión, paciencia, cosecha, evaluación" },
    { n: "Ocho de Oros", s: "Diligencia, oficio, detalle, mejora" },
    { n: "Nueve de Oros", s: "Independencia, lujo, autosuficiencia, calma" },
    { n: "Diez de Oros", s: "Legado, herencia, familia, riqueza duradera" },
    { n: "Sota de Oros", s: "Dedicación, metas, estudio, enfoque práctico" },
    { n: "Caballero de Oros", s: "Rutina, fiabilidad, paciencia, lealtad" },
    { n: "Reina de Oros", s: "Nutrición, practicidad, seguridad doméstica" },
    { n: "Rey de Oros", s: "Éxito material, disciplina, abundancia" }
  ];

  const hoy = new Date();
  // Creamos un identificador numérico para hoy (ej: 20260331)
  const fechaSeed = hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();

  // Algoritmo para mezclar un poco la semilla y que no sea correlativo
  // Usamos el residuo para obtener el índice final de las 78 cartas
  const indice = (fechaSeed * 73 + 13) % mazo.length;

  return mazo[indice];
}