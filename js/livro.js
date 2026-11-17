/* =========================================================
   NOSSA HISTÓRIA — o livro (montagem, páginas, gestos)
   ========================================================= */

const Livro = (() => {
  const $ = (s, el = document) => el.querySelector(s);

  const cena       = $("#cena");
  const livro      = $("#livro");
  const capa       = $("#capa");
  const paginasEl  = $("#paginas");
  const btnAbrir   = $("#btnAbrir");
  const btnAnt     = $("#btnAnterior");
  const btnProx    = $("#btnProxima");
  const contadorPg = $("#contadorPaginas");
  const btnSom     = $("#btnSom");
  const janela     = $("#videoJanela");
  const moldura    = $("#videoMoldura");

  let paginas = [];
  let atual = 0;
  let ocupado = false;       // evita cliques durante animações
  let videoEstaAberto = false;
  const pilhas = [];         // estado das fotos de cada capítulo

  /* ---------------- utilidades ---------------- */
  const ROMANOS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
                   "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

  function dataLocal(iso) {
    const [a, m, d] = iso.split("-").map(Number);
    return new Date(a, m - 1, d);
  }

  function dataExtenso(iso) {
    return dataLocal(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  }

  const urlFoto  = (id, w = 1000) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
  const urlFoto2 = (id, w = 1000) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;
  const urlVideo = id => `https://drive.google.com/file/d/${id}/preview`;

  function criar(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---------------- capa ---------------- */
  function preencherCapa() {
    $('[data-field="titulo"]').textContent = LIVRO.titulo;
    $('[data-field="autores"]').textContent = LIVRO.autores.join(" & ");
    const d = dataLocal(LIVRO.inicioNamoro);
    const p = n => String(n).padStart(2, "0");
    $('[data-field="desde"]').textContent = `desde ${p(d.getDate())} · ${p(d.getMonth() + 1)} · ${d.getFullYear()}`;
    document.title = LIVRO.titulo;
  }

  /* ---------------- montagem das páginas ---------------- */
  function paginaRosto() {
    let coracoes = "";
    for (let i = 0; i < 9; i++) {
      const x = 8 + Math.random() * 84;
      const t = 10 + Math.random() * 12;
      const d = 8 + Math.random() * 7;
      const a = Math.random() * 8;
      coracoes += `<span style="--x:${x}%;--t:${t}px;--d:${d}s;--a:${a}s">♥</span>`;
    }
    return `
      <div class="pg pg-rosto">
        <div class="coracoes">${coracoes}</div>
        <p class="rosto-rotulo anima" style="--atraso:.3s">juntos há</p>
        <div class="contador anima" style="--atraso:.5s">
          <div class="contador-item"><span class="contador-num" data-field="anos">0</span><span class="contador-rot" data-field="anos-rot">anos</span></div>
          <div class="contador-item"><span class="contador-num" data-field="meses">0</span><span class="contador-rot" data-field="meses-rot">meses</span></div>
          <div class="contador-item"><span class="contador-num" data-field="dias">0</span><span class="contador-rot" data-field="dias-rot">dias</span></div>
        </div>
        <p class="relogio anima" style="--atraso:.7s">
          <span data-field="relogio">00:00:00</span>
          <small>horas · minutos · segundos</small>
        </p>
        <p class="rosto-total anima" style="--atraso:1s">
          São <strong data-field="total-dias">0</strong> dias desde ${dataExtenso(LIVRO.inicioNamoro)}.
        </p>
        <p class="rosto-ornamento anima" style="--atraso:1.2s">❦</p>
        <p class="pg-dica">arraste para o lado →</p>
      </div>`;
  }

  function paginaZero(num) {
    const z = LIVRO.capituloZero;
    return `
      <div class="pg pg-zero">
        <p class="cap-numero anima" style="--atraso:.1s">Capítulo zero</p>
        <svg class="zero-desenho" viewBox="0 0 150 140" aria-hidden="true">
          <rect class="moldura-foto" x="22" y="6" width="106" height="128" rx="2" fill="none"/>
          <path d="M75 112 C 30 84, 30 46, 52 40 C 64 37, 72 45, 75 53 C 78 45, 86 37, 98 40 C 120 46, 120 84, 75 112 Z"/>
        </svg>
        <h2 class="zero-titulo anima" style="--atraso:1.4s">${z.titulo}</h2>
        <p class="zero-texto anima" style="--atraso:2s">${z.texto}</p>
        <span class="pg-numero">${num}</span>
      </div>`;
  }

  function paginaCapitulo(cap, n, num) {
    const total = cap.midia.length;
    return `
      <div class="pg pg-cap">
        <header class="cap-topo anima" style="--atraso:.15s">
          <p class="cap-numero">Capítulo ${ROMANOS[n] || n}</p>
          <h2 class="cap-data">${dataExtenso(cap.data)}</h2>
        </header>
        <div class="cap-palco anima" style="--atraso:.4s">
          <div class="pilha ${total > 1 ? "varias" : ""}">
            <figure class="polaroid carregando">
              <img alt="" draggable="false">
              <span class="play" aria-hidden="true"></span>
              <figcaption class="polaroid-legenda"></figcaption>
            </figure>
          </div>
        </div>
        <p class="cap-frase anima" style="--atraso:.9s">${cap.frase}</p>
        <p class="cap-contagem anima" style="--atraso:1.1s"></p>
        <span class="pg-numero">${num}</span>
      </div>`;
  }

  function paginaFinal(num) {
    const f = LIVRO.final;
    return `
      <div class="pg pg-final">
        <h2 class="final-titulo anima" style="--atraso:.2s">${f.titulo}</h2>
        <div class="linhas anima" style="--atraso:.6s">
          <span class="linhas-escrita">o próximo capítulo começa amanhã…</span>
          <span class="pena" aria-hidden="true">✒️</span>
        </div>
        <p class="final-texto anima" style="--atraso:1.4s">${f.texto}</p>
        <div class="sonhos anima" style="--atraso:1.8s">
          <p class="sonhos-titulo">Planos &amp; Sonhos</p>
          <p class="sonhos-sub">um capítulo que ainda vamos escrever juntos · em breve</p>
        </div>
        <button class="btn-fechar anima" style="--atraso:2.2s" type="button" data-acao="fechar">
          Fechar o livro
        </button>
        <span class="pg-numero">${num}</span>
      </div>`;
  }

  function montar() {
    const htmls = [paginaRosto(), paginaZero(1)];
    LIVRO.capitulos.forEach((cap, i) => htmls.push(paginaCapitulo(cap, i + 1, i + 2)));
    htmls.push(paginaFinal(LIVRO.capitulos.length + 2));

    paginasEl.innerHTML = "";
    paginas = htmls.map((h, i) => {
      const pg = document.createElement("section");
      pg.className = "pagina";
      pg.style.zIndex = String(htmls.length - i);
      pg.appendChild(criar(h));
      paginasEl.appendChild(pg);
      return pg;
    });

    // estado das pilhas de fotos (páginas 2 .. n-1)
    LIVRO.capitulos.forEach((cap, i) => {
      const pg = paginas[i + 2];
      pilhas[i + 2] = {
        cap,
        idx: 0,
        carregada: false,
        polaroid: $(".polaroid", pg),
        img: $(".polaroid img", pg),
        legenda: $(".polaroid-legenda", pg),
        contagem: $(".cap-contagem", pg)
      };
    });
  }

  /* ---------------- fotos e vídeos de cada capítulo ---------------- */
  function mostrarMidia(p, animar) {
    const item = p.cap.midia[p.idx];
    const ehVideo = !!item.v;
    const id = item.v || item.f;
    const total = p.cap.midia.length;

    const aplicar = () => {
      p.polaroid.classList.remove("falhou", "saindo");
      p.polaroid.classList.toggle("video", ehVideo);
      p.polaroid.classList.add("carregando");
      p.polaroid.style.setProperty("--r", `${(Math.random() * 5 - 2.5).toFixed(1)}deg`);
      p.img.dataset.tentativa = "1";
      p.img.dataset.id = id;
      p.img.src = urlFoto(id);
      p.img.alt = `${ehVideo ? "Vídeo" : "Foto"} ${p.idx + 1} de ${total} — ${dataExtenso(p.cap.data)}`;
      p.legenda.textContent = ehVideo ? "vídeo" : "";
      p.contagem.textContent = total > 1
        ? `toque na foto para ver a próxima · ${p.idx + 1} / ${total}`
        : (ehVideo ? "toque no play para assistir" : "");
      if (ehVideo && total > 1) p.contagem.textContent = `toque no play para assistir · ${p.idx + 1} / ${total}`;
      if (animar) {
        p.polaroid.classList.remove("entrando");
        void p.polaroid.offsetWidth;
        p.polaroid.classList.add("entrando");
      }
      // já deixa a próxima baixando
      const prox = p.cap.midia[(p.idx + 1) % total];
      if (prox) new Image().src = urlFoto(prox.v || prox.f);
    };

    if (animar) {
      p.polaroid.classList.add("saindo");
      setTimeout(aplicar, 280);
    } else {
      aplicar();
    }
  }

  function prepararEventosFoto(p) {
    p.img.addEventListener("load", () => p.polaroid.classList.remove("carregando"));
    p.img.addEventListener("error", () => {
      // 1ª falha: tenta o outro endereço do Google; 2ª: mostra um coração
      if (p.img.dataset.tentativa === "1") {
        p.img.dataset.tentativa = "2";
        p.img.src = urlFoto2(p.img.dataset.id);
      } else {
        p.polaroid.classList.remove("carregando");
        p.polaroid.classList.add("falhou");
      }
    });
  }

  function carregarPilha(i) {
    const p = pilhas[i];
    if (!p || p.carregada) return;
    p.carregada = true;
    prepararEventosFoto(p);
    mostrarMidia(p, false);
  }

  function proximaMidia(p) {
    if (p.cap.midia.length < 2) return;
    p.idx = (p.idx + 1) % p.cap.midia.length;
    mostrarMidia(p, true);
  }

  /* ---------------- virar páginas ---------------- */
  function atualizar() {
    paginas.forEach((pg, i) => pg.classList.toggle("atual", i === atual));
    contadorPg.textContent = `${atual + 1} / ${paginas.length}`;
    btnAnt.disabled = atual === 0;
    btnProx.disabled = atual === paginas.length - 1;
    // carrega as fotos da página atual e da próxima
    carregarPilha(atual);
    carregarPilha(atual + 1);
  }

  function proxima() {
    if (!livroAberto() || atual >= paginas.length - 1) return;
    paginas[atual].classList.add("virada");
    atual++;
    atualizar();
  }

  function anterior() {
    if (!livroAberto() || atual <= 0) return;
    atual--;
    paginas[atual].classList.remove("virada");
    atualizar();
  }

  const livroAberto = () => cena.classList.contains("livro-aberto");

  /* ---------------- abrir e fechar ---------------- */
  function abrir() {
    if (ocupado || livroAberto()) return;
    ocupado = true;

    resetarPaginas();
    cena.classList.add("abrindo");

    // a música começa (em silêncio) já no toque e sobe quando a capa abre
    Musica.iniciar(1.9);

    livro.classList.add("girando");                                   // chave gira
    setTimeout(() => livro.classList.add("destrancado"), 800);        // arco solta
    setTimeout(() => livro.classList.add("soltando"), 1250);          // correia cai
    setTimeout(() => {                                                // capa abre
      livro.classList.add("aberto");
      atualizar();
    }, 1900);
    setTimeout(() => {
      capa.classList.add("sumiu");
      cena.classList.remove("abrindo");
      cena.classList.add("livro-aberto");
      ocupado = false;
    }, 3400);
  }

  function fechar() {
    if (ocupado || !livroAberto()) return;
    ocupado = true;
    Musica.parar();
    cena.classList.remove("livro-aberto");
    cena.classList.add("abrindo"); // mantém o botão da chave escondido

    capa.classList.remove("sumiu");
    livro.classList.add("fechando");
    void capa.offsetWidth;
    livro.classList.remove("aberto");                                  // capa volta

    setTimeout(() => {
      resetarPaginas();
      livro.classList.remove("soltando");                              // correia volta
    }, 1500);
    setTimeout(() => livro.classList.remove("destrancado"), 2100);     // arco fecha
    setTimeout(() => livro.classList.remove("girando"), 2450);         // chave volta
    setTimeout(() => {
      livro.classList.remove("fechando");
      cena.classList.remove("abrindo");
      ocupado = false;
    }, 3300);
  }

  function resetarPaginas() {
    livro.classList.add("sem-transicao");
    paginas.forEach(pg => pg.classList.remove("virada", "atual"));
    void paginasEl.offsetWidth;
    livro.classList.remove("sem-transicao");
    atual = 0;
  }

  /* ---------------- vídeo ---------------- */
  function abrirVideo(id) {
    videoEstaAberto = true;
    Musica.pausar();
    moldura.innerHTML = `<iframe src="${urlVideo(id)}" allow="autoplay; fullscreen" allowfullscreen title="Vídeo"></iframe>`;
    janela.classList.add("aberta");
    janela.setAttribute("aria-hidden", "false");
  }

  function fecharVideo() {
    if (!videoEstaAberto) return;
    videoEstaAberto = false;
    janela.classList.remove("aberta");
    janela.setAttribute("aria-hidden", "true");
    setTimeout(() => { moldura.innerHTML = ""; }, 350);
    Musica.retomar();
  }

  /* ---------------- contador do namoro ---------------- */
  function atualizarContador() {
    const pg = paginas[0];
    if (!pg) return;
    const inicio = dataLocal(LIVRO.inicioNamoro);
    const agora = new Date();

    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    if (dias < 0) {
      meses--;
      dias += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    }
    if (meses < 0) { anos--; meses += 12; }

    const p = n => String(n).padStart(2, "0");
    const set = (campo, valor) => { const el = $(`[data-field="${campo}"]`, pg); if (el) el.textContent = valor; };

    set("anos", anos);   set("anos-rot", anos === 1 ? "ano" : "anos");
    set("meses", meses); set("meses-rot", meses === 1 ? "mês" : "meses");
    set("dias", dias);   set("dias-rot", dias === 1 ? "dia" : "dias");
    set("relogio", `${p(agora.getHours())}:${p(agora.getMinutes())}:${p(agora.getSeconds())}`);
    set("total-dias", Math.floor((agora - inicio) / 86400000).toLocaleString("pt-BR"));
  }

  /* ---------------- gestos (arrastar / tocar) ---------------- */
  function prepararGestos() {
    let x0 = 0, y0 = 0, alvo = null, ativo = false;

    paginasEl.addEventListener("pointerdown", e => {
      if (e.target.closest("button")) return;
      ativo = true; x0 = e.clientX; y0 = e.clientY; alvo = e.target;
    });

    paginasEl.addEventListener("pointerup", e => {
      if (!ativo) return;
      ativo = false;
      const dx = e.clientX - x0, dy = e.clientY - y0;

      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        dx < 0 ? proxima() : anterior();
        return;
      }
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
        const p = pilhas[atual];
        if (!p) return;
        const item = p.cap.midia[p.idx];
        if (item.v && (alvo.closest(".play") || p.cap.midia.length === 1)) {
          abrirVideo(item.v);
        } else if (alvo.closest(".polaroid") || alvo.closest(".pilha")) {
          proximaMidia(p);
        }
      }
    });

    paginasEl.addEventListener("pointercancel", () => { ativo = false; });

    // botões dentro das páginas
    paginasEl.addEventListener("click", e => {
      if (e.target.closest('[data-acao="fechar"]')) fechar();
    });

    document.addEventListener("keydown", e => {
      if (videoEstaAberto) { if (e.key === "Escape") fecharVideo(); return; }
      if (e.key === "ArrowRight") proxima();
      if (e.key === "ArrowLeft") anterior();
    });
  }

  /* ---------------- início ---------------- */
  function iniciar() {
    preencherCapa();
    montar();
    prepararGestos();
    atualizarContador();
    setInterval(atualizarContador, 1000);

    btnAbrir.addEventListener("click", abrir);
    btnProx.addEventListener("click", proxima);
    btnAnt.addEventListener("click", anterior);
    btnSom.addEventListener("click", () => btnSom.classList.toggle("mudo", Musica.alternarMudo()));
    $("#videoFechar").addEventListener("click", fecharVideo);
    janela.addEventListener("click", e => { if (e.target === janela) fecharVideo(); });
  }

  iniciar();

  return { videoAberto: () => videoEstaAberto, proxima, anterior, abrir, fechar };
})();
