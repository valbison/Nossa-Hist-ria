/* =========================================================
   NOSSA HISTÓRIA — música de fundo
   ---------------------------------------------------------
   - Começa baixinho (fade-in) quando a capa abre
   - Fica em loop até fechar o livro
   - Para se a pessoa sair da página (troca de aba, bloqueia
     a tela, fecha o navegador) e volta se ela retornar
     com o livro ainda aberto
   Por que Web Audio? No iPhone, audio.volume é ignorado
   (sempre 100%). Com um GainNode o volume baixo funciona
   em qualquer celular.
   ========================================================= */

const Musica = (() => {
  const cfg = LIVRO.musica;
  const audio = new Audio();
  audio.loop = true;
  audio.preload = "auto";
  audio.setAttribute("playsinline", "");

  let ctx = null;        // AudioContext
  let ganho = null;      // GainNode (controle de volume)
  let usaWebAudio = false;
  let tocando = false;   // estado desejado
  let mudo = false;
  let timerFade = null;

  const urlDrive = `https://drive.google.com/uc?export=download&id=${cfg.driveId}`;

  // Descobre, antes do clique, se o mp3 local existe.
  // Assim, no clique, já sabemos qual caminho usar.
  let fonteLocalOk = false;
  const verificacao = (location.protocol === "file:")
    ? Promise.resolve(false)
    : fetch(cfg.local, { method: "HEAD" })
        .then(r => r.ok)
        .catch(() => false);

  // valor inicial (vale também se o clique vier antes da verificação)
  audio.src = cfg.local;
  verificacao.then(ok => {
    fonteLocalOk = ok;
    // aberto direto do computador (file://): usa o arquivo local sem Web Audio
    if (!ok && location.protocol !== "file:") audio.src = urlDrive;
  });
  audio.addEventListener("error", () => {
    // arquivo local não existe → tenta o Drive
    if (!audio.src.includes("drive.google.com")) {
      audio.src = urlDrive;
      if (tocando) audio.play().catch(() => {});
    }
  });

  function prepararWebAudio() {
    // Só dá para usar Web Audio com arquivo do mesmo site
    // (o Drive não libera CORS e o som sairia mudo).
    if (ctx || !fonteLocalOk) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      const fonte = ctx.createMediaElementSource(audio);
      ganho = ctx.createGain();
      ganho.gain.value = 0;
      fonte.connect(ganho).connect(ctx.destination);
      usaWebAudio = true;
    } catch (e) {
      usaWebAudio = false;
    }
  }

  function volumeAtual() {
    return usaWebAudio ? ganho.gain.value : audio.volume;
  }

  // muda o volume suavemente até "alvo" em "segundos"
  function fade(alvo, segundos, depois) {
    clearInterval(timerFade);
    if (usaWebAudio) {
      const agora = ctx.currentTime;
      ganho.gain.cancelScheduledValues(agora);
      ganho.gain.setValueAtTime(ganho.gain.value, agora);
      ganho.gain.linearRampToValueAtTime(alvo, agora + segundos);
      if (depois) timerFade = setTimeout(depois, segundos * 1000);
      return;
    }
    const inicio = audio.volume;
    const passos = Math.max(1, Math.round(segundos * 30));
    let i = 0;
    timerFade = setInterval(() => {
      i++;
      audio.volume = Math.min(1, Math.max(0, inicio + (alvo - inicio) * (i / passos)));
      if (i >= passos) {
        clearInterval(timerFade);
        if (depois) depois();
      }
    }, (segundos * 1000) / passos);
  }

  function alvo() { return mudo ? 0 : cfg.volume; }

  /* Chamado DENTRO do clique (o celular só deixa tocar som
     depois de um toque). Toca em silêncio e sobe o volume
     depois de "atraso" segundos — quando a capa abre. */
  function iniciar(atraso = 0) {
    prepararWebAudio();
    if (ctx && ctx.state === "suspended") ctx.resume();
    tocando = true;
    if (usaWebAudio) ganho.gain.value = 0; else audio.volume = 0;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setTimeout(() => { if (tocando) fade(alvo(), cfg.fadeEntrada); }, atraso * 1000);
  }

  function parar() {
    tocando = false;
    fade(0, cfg.fadeSaida, () => {
      if (!tocando) { audio.pause(); audio.currentTime = 0; }
    });
  }

  // pausa temporária (vídeo aberto, saiu da página)
  function pausar(imediato = false) {
    if (!tocando) return;
    if (imediato) { clearInterval(timerFade); audio.pause(); return; }
    fade(0, 0.6, () => audio.pause());
  }

  function retomar() {
    if (!tocando) return;
    if (ctx && ctx.state === "suspended") ctx.resume();
    if (usaWebAudio) ganho.gain.value = 0; else audio.volume = 0;
    audio.play().catch(() => {});
    fade(alvo(), 2.5);
  }

  function alternarMudo() {
    mudo = !mudo;
    if (tocando) fade(alvo(), 0.8);
    return mudo;
  }

  // ---- saiu da página → para; voltou → retoma ----
  let pausadoPorSaida = false;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (tocando && !audio.paused) { pausar(true); pausadoPorSaida = true; }
    } else if (pausadoPorSaida) {
      pausadoPorSaida = false;
      if (!Livro.videoAberto()) retomar();
    }
  });
  window.addEventListener("pagehide", () => pausar(true));

  return { iniciar, parar, pausar, retomar, alternarMudo, get tocando() { return tocando; } };
})();
