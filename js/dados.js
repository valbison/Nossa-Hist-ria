/* =========================================================
   NOSSA HISTÓRIA — dados do livro
   ---------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para mudar
   o conteúdo: frases, títulos, ordem das fotos, capítulos.
   Fotos e vídeos vêm da pasta pública do Google Drive
   (só o ID de cada arquivo fica aqui).
   ========================================================= */

const LIVRO = {
  titulo: "Nossa História",
  autores: ["Valbison", "Jiclea"],

  // Início do namoro (ano-mês-dia). Usado no contador.
  inicioNamoro: "2025-08-12",

  musica: {
    // 1ª opção: arquivo dentro do projeto (recomendado no celular).
    local: "audio/musica.mp3",
    // 2ª opção (reserva): o mp3 que está no Drive.
    driveId: "1ChCFtyh4p-vXmG3tadwrrUsOe8FRzUu_",
    volume: 0.22,        // 0 a 1 — baixinho
    fadeEntrada: 5,      // segundos para chegar no volume
    fadeSaida: 1.6
  },

  // Página "antes das fotos"
  capituloZero: {
    titulo: "Antes das fotos",
    texto: "Os primeiros encontros não têm foto nenhuma. Ficaram guardados do jeito mais seguro que existe: na memória da gente."
  },

  /* Cada capítulo = um dia.
     midia: lista em ordem. { f: "ID" } é foto, { v: "ID" } é vídeo. */
  capitulos: [
    {
      data: "2025-08-31",
      frase: "As primeiras fotos. Finalmente resolvemos guardar o que já era bonito demais pra esquecer.",
      midia: [
        { f: "1WeRWv5Tbz55Bm35pHllkj8mcdPSqUVBF" },
        { v: "1hYIWAc8cesPnrJdWdihe2ODJgVs6jIll" },
        { f: "1sGP5haZ55K0W28FUsbemN4fa3SBa9kv8" },
        { f: "1mqA7oU6Z5PzuVH7ExYmTutL8kJjxYBFP" },
        { f: "16A-P96zDO45KoXGK9-cqr5GtboLdXvJb" },
        { f: "1x_RzA5thrv0liovEsyTc5VCNoesuKbld" },
        // sem data no nome (vieram junto com as de agosto)
        { f: "1S3Do5x5nFmUMebk0655YZ6kPcIgYFFj0" },
        { f: "1cJ7FQMVxSSqJZVd_QRJRjl4rtDFztIL6" },
        // do WhatsApp (data de recebimento: 01/09)
        { f: "1Iq6AoUPV1KoPjs2eViHhDLnqU7DfVh7w" },
        { f: "1ICX5un70CKaHXfaPhyvjNJgRv29-fxn2" }
      ]
    },
    {
      data: "2025-11-02",
      frase: "Tem dia que passa. E tem dia que fica.",
      midia: [
        { f: "1p5sQMCImUcl5PEnJryQaQu1NL3-gk4gS" },
        { v: "1-wncTULqMH991x2swoANSrDsCqp4AJ8r" },
        { f: "1BNvdsZz7CWz1bmnsceDRIAKLRzpUNsLg" },
        { f: "1oxQUlgCSVmwIvT-2BEvNA4CHla2pS3Sf" },
        { f: "1RfEVcpxFlJC0-lDA5jDSIXw36uHdtR4X" },
        { f: "1AuAWX5W5uUK9P5ShdttBZWBK0rVYCAwv" },
        { f: "1fwfMhrVd0nM6TEFPw9M1wxyW42nfV2i6" },
        { v: "1G9aOWyC42C-mhhYtwBWnADp1iwWtGdF_" }
      ]
    },
    {
      data: "2025-12-07",
      frase: "Do meio-dia ao fim da tarde, e ainda pareceu pouco.",
      midia: [
        { f: "1TjBMqXf7l4W-xSsvOMXuyYZDhjOamRff" },
        { v: "1lGYRxXupItyM8gPb95i0IAWhNDUu_3la" },
        { v: "1qbiH8EtrDlWSOmT2GDEl_1LPlkXou06E" },
        { v: "1LIs-2GKy7QyCuL4EsByvgsA86w7pbkcy" },
        { f: "1GWBxOKMWmUduqaPE6FXcTBFqtjwyZmIG" },
        { v: "1GRB61iCtBXhhe9SoQEY8UxQbAzl138gE" },
        { f: "1_Ru15bVy1AdaEPllpTSIdjjcLK_h1nwN" },
        { f: "1kUFtwIO1raVgTDkJ695RGLYremIZvgov" },
        { f: "1VuOtn6p4Q51cBOJRLtji9RZJ29tEG2xf" },
        { f: "1_bK7OAVWaCu26ELLn_AtP2Th1tKdloVe" },
        { v: "1nohtbyLy7ru3nD7FmSfDycAjofwF81KV" },
        { f: "18NSKWPTvC8SZ1MwbWl3s2q4RPH-QH0p-" },
        { f: "1mOth8lf7aLHsR47gFveqPsqVUA7-ArN2" },
        { f: "1HtUXMl8kt5WMTTBDew0KZAvVY2Mn7ksl" }
      ]
    },
    {
      data: "2025-12-28",
      frase: "Os últimos dias do ano. E você neles.",
      midia: [
        { v: "1kMCJx3-vhIjTfaDjiDjCUYKJKjfIE0dg" },
        { v: "1QeGYQSzk2U4CX-DnHR7DsCcGU9csuF0m" }
      ]
    },
    {
      data: "2026-03-13",
      frase: "Uma foto só. Às vezes, uma basta.",
      midia: [
        { f: "1M0BA4RQA-cdX9do7PW-36hzI9554EIEM" }
      ]
    },
    {
      data: "2026-03-15",
      frase: "Cada foto é um \"lembra daquele dia?\" guardado pra depois.",
      midia: [
        { f: "1evVeTI2GvY9MFHyFEX32XMD8ULmsd3S_" },
        { v: "1zrLiWELkzP0UDgwngcJJeRaqVJDHyNJZ" },
        { f: "1dClQQgfYl_SlQ4MRXyj5zmEHFO3gjZCC" },
        { f: "1QsUVuKVZ9_IYxJ4lqOPx6FTCKrSGphFo" },
        { f: "1Ilk-tJ5kYBUWmf-NUnHzErV6kZRYWC4G" },
        { f: "12bER_LhWYvD52ggLRIG3eAUWYiaXcXC_" },
        { f: "1FSZ82S7AylwGzF3WpnSs153vZKnsG-XC" },
        { f: "15uZ2srRki6u3SkXFFavg5IVGq_esuLpN" },
        { f: "1-CclPcUa6HudWfGXg6YtA7w5Ahhe07rD" },
        { v: "1cljulh0kM7l9mfU6A2HtUK6spAp_V2Yg" },
        { f: "1OAOjSpkUjKGZHk4XA5GRm0b7wNoB1Jiv" },
        { v: "1h0CM89Vme3qWHtSskz7DbA14mX329Fb0" },
        { f: "1BiR0Ywtdyye0LMf_EukkEIdhT_tDq4-q" },
        { f: "1xpH_gXwnJYEFSrsCH_h-eiOXDasKC0SQ" },
        { f: "18WWlb2xm8pkbbCKaQoO6WgR3hSA1xoNp" }
      ]
    },
    {
      data: "2026-05-10",
      frase: "Contigo, até o comum vira lembrança.",
      midia: [
        { f: "1WlUuSk_1ZiDLq6kIKQMzKSeTiWZmjC8M" },
        { f: "1CMWszVN1fGfwpTuGk0wd5YeaMkMxxMiV" },
        { f: "1hOHTE9Z1UEzhIteuiJraD3AogJR3-vDo" },
        { v: "1fmeiuLCbp83ezYa67iRTr02_VMwQMQ_r" },
        { f: "1XO-66lOmGDIMlpPmcN7APF8_UHuS3dLY" },
        { f: "12kFAdFTHE8wkYhAOncjb_PyjY8Gf5o17" },
        { v: "1QGNsl2tOHWkdd1KPmbTyCKFGHA-bEybJ" },
        { f: "1rwFhQHE3QeWvXVxzteXZXdMh1qaYU-C_" },
        { f: "1IqM8AGDjbYyXau4wlC0wa6Ad-PW7RGQ9" }
      ]
    },
    {
      data: "2026-07-12",
      frase: "Um monte de fotos em menos de uma hora. A gente não queria perder nem um segundo.",
      midia: [
        { f: "1vjoFwXLzrM33X87H4tF5tEG3hpIlFOXW" },
        { f: "13AS0DMkl0v7Jbn_yCCpRo6ntix4EU0Rc" },
        { f: "1ew_rNPkQUT4Y8DHr7B72ku1kL_YDR8WF" },
        { f: "16wFoMsmdnmr0jYrY86cylc6bNUCkopKG" },
        { f: "1BVwqmz2DC27uSefs9knkqSKjcvxpnB1Z" },
        { f: "1Fw0i-W5ejHToNuj7ll7MIGQeCKjO3DSG" },
        { f: "1oU3YEw6r1Rj5Y28MtWf5rOhGVnOytss0" },
        { f: "1xV3WcAQtwyhUHLgPRnuK29jN_i5emXYF" },
        { f: "1yvNzxXWPp-iauWZEhC1R69g1jyL7Hy67" },
        { f: "1Sir221YAky8NoOrHXlxIsO0d9CeCG7Zc" },
        { f: "1aKC2VvTwqYCG3lcqXd5mzm5yUsHBRem7" },
        { f: "1OAdPaK-8wPKKwYTWs4gzvQaXSc5aWLx-" },
        { f: "1tOA-ThDDKsKLJXI6tXD_1Et4fgDOQyM_" },
        { f: "1fW4oPtpgOg-5tTCJzALpc3SL04k5wVxr" },
        { f: "1RuF5rZNPrBYHV6Y5aj3OYqsQVx21oQF9" },
        { f: "1nCT8S4KSKRRfABlJMIUaOWw_pt_2ggff" },
        { f: "1FDRZ4J-F3fECJLv1yqnfD13sz5pcIXtF" },
        { f: "1ynlj8VxOgVqTZcsIroMPgbnlLalrgFEs" },
        { f: "1PYFE1cHd9ctQlmqoiD5vuQFVceMLu7dy" },
        { f: "1uuQoHkp8A5vrynw6FmEzAmqhmI81XqAx" },
        { f: "1BUuAmMKe58FJr56x-EdDVKgbReoChYPE" },
        { f: "1CTpqHiAHDJr2wC3b9PobCOnjYVBz9g11" },
        { f: "170ZXWTrXTvEc_4MXGW_u0GQjSO4w_XRu" },
        { f: "1nzwhXs3SNTMbAvFmN4uzi9IEjVr2BMlu" },
        { f: "1Tun5CzXRH_UFdulYDESZfe4pW5M-tOpe" },
        { f: "1ZBTJ_Y5kcXUzRQFJBeuBMiowUhPa0u8Z" },
        { f: "1rBxQSXBz88vuKQWSukHEHXg4-WKRkbmM" },
        { v: "1oMZZUIZpuGPaYSEZQy6RnP_eD4UbfSjf" },
        { f: "1nOu2fUmZ2U-11KzcrgnJh9A2i8Ysxdsj" }
      ]
    }
  ],

  final: {
    titulo: "Ainda estamos escrevendo esta história…",
    texto: "As próximas páginas estão em branco de propósito. São nossas."
  }
};
