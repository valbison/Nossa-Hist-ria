# Nossa História

Book digital do Valbison e da Jiclea. É só HTML, CSS e JavaScript puros, sem banco de dados e sem build.

## Estrutura

```
nossa-historia/
├── index.html
├── css/style.css
├── js/
│   ├── dados.js    ← ÚNICO arquivo pra editar o conteúdo
│   ├── musica.js   ← música de fundo (fade, loop, pausa ao sair)
│   └── livro.js    ← capa, cadeado, páginas, gestos, vídeos
└── audio/
    └── musica.mp3  ← coloque a música aqui (ver abaixo)
```

## 1. Colocar a música

Baixe o `Sweet Child O_ Mine(MP3_160K).mp3` da pasta `audio` do Drive,
renomeie para **musica.mp3** e coloque em `audio/`.

Sem esse arquivo o site tenta tocar direto do Drive. Funciona no computador,
mas no iPhone o volume não fica baixinho e às vezes nem toca.

## 2. Editar frases, datas e fotos

Tudo fica em `js/dados.js`:

- `frase`: o texto de cada capítulo
- `midia`: a ordem das fotos e vídeos. `{ f: "ID" }` é foto, `{ v: "ID" }` é vídeo
- `volume`: volume da música, de 0 a 1 (está em 0.22)
- `capituloZero`: a página "Antes das fotos"
- `final`: a última página

O ID de uma foto é o trecho entre `/d/` e `/view` no link do Drive.

## 3. Testar

Abra com o Live Server do VS Code (ou `python -m http.server`).
Se abrir o `index.html` direto com duplo clique, a música não passa pelo
controle de volume baixinho.

## 4. Publicar (GitHub Pages)

1. Suba a pasta pra um repositório no GitHub (o `musica.mp3` vai junto).
2. Settings → Pages → Branch `main` / pasta `/root` → Save.
3. Em 1 ou 2 minutos sai o link `https://SEU-USUARIO.github.io/nossa-historia/`.

As fotos e vídeos continuam no Drive. A pasta precisa ficar como
"Qualquer pessoa com o link pode ver".
