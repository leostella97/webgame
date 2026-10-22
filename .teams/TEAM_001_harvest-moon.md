# TEAM_001 — Inclusão de Harvest Moon: Back to Nature

Data: 2026-10-22

## O que foi feito

- Renomeado `assets/Harvest Moon - Back to Nature.cue` → `harvest-moon-back-to-nature.cue`
  e corrigida a linha `FILE` para apontar para `harvest-moon-back-to-nature.bin`
  (o `.bin` já existia com esse nome; o `.cue` antigo referenciava um nome inexistente).
- Criada capa `assets/covers/harvest-moon.png` (800x580, gerada via Pillow).
- Criada página `harvest-moon.html` seguindo o padrão de `jackie.html`
  (`EJS_gameUrl` = .cue, `EJS_gameParentUrl` = .bin, BIOS local).
- Adicionado card do jogo em `index.html`.
- Atualizada tabela de jogos no `README.md`.

## Adição posterior — Metal Slug X

- Extraído `assets/Metal Slug X.7z` (via py7zr — não havia 7z CLI no sistema) →
  `metal-slug-x.bin` (104 MB) + `metal-slug-x.cue`; corrigida linha `FILE` do `.cue`.
- Criada capa `assets/covers/metal-slug-x.png` (800x580, Pillow).
- Criada página `metal-slug-x.html`; card adicionado em `index.html`; README atualizado.

## Adição posterior — Mortal Kombat Trilogy (multi-track)

- O `.7z` tinha 30 tracks (1 dados MODE2/2352 + 29 áudio CDDA) e o EmulatorJS
  aceita apenas 1 arquivo extra via `EJS_gameParentUrl`.
- Solução: binmerge em Python — os 30 `.bin` foram concatenados num único
  `mortal-kombat-trilogy.bin` (577 MB / 245.404 setores) e o `.cue` reescrito
  com INDEX 00/01 absolutos por track (pregap de 150 setores preservado).
- Tracks originais removidos após o merge; `.cue` original descartado.
- Capa `assets/covers/mortal-kombat-trilogy.png` (800x580, Pillow).
- Página `mortal-kombat-trilogy.html`; card em `index.html`; README atualizado.

## Adição posterior — Tekken 3 (multi-track)

- ROM já estava extraída em `assets/` (`Tekken 3 (Track 1..3).bin` + `Tekken 3.cue`).
- Mesmo binmerge: 3 tracks → `tekken-3.bin` (688 MB / 292.635 setores) +
  `tekken-3.cue` com índices absolutos; originais removidos.
- Capa `assets/covers/tekken-3.png`; página `tekken-3.html`; card + README.

## Adição posterior — The King of Fighters '98

- ROM já estava extraída (`The King of Fighters '98 (Japan).bin/.cue`, 276 MB,
  track única) mas o `.cue` apontava para `[SLPM-86201]` — nome diferente do `.bin`.
- Renomeado para `king-of-fighters-98.bin` e `.cue` reescrito corretamente.
- Capa `assets/covers/king-of-fighters-98.png`; página `king-of-fighters-98.html`;
  card + README.

## Adição posterior — Dragon Ball GT: Final Bout

- ROM já estava extraída (`.bin`/`.cue`, 158 MB, track única); `.7z` não estava
  mais presente em `assets/`.
- Renomeado para `dragon-ball-gt-final-bout.bin` e `.cue` reescrito.
- Capa `assets/covers/dragon-ball-gt.png`; página `dragon-ball-gt.html`;
  card + README.

## Adição posterior — Crash Bandicoot 2: Cortex Strikes Back

- ROM já estava extraída (192 MB, track única).
- Renomeada para `crash-bandicoot-2.bin` + `.cue` reescrito.
- Capa `assets/covers/crash-bandicoot-2.png`; página `crash-bandicoot-2.html`;
  card + README.

## Adição posterior — CTR: Crash Team Racing

- ROM já estava extraída (605 MB, track única).
- Renomeada para `crash-team-racing.bin` + `.cue` reescrito.
- Capa `assets/covers/crash-team-racing.png`; página `crash-team-racing.html`;
  card + README.

## Adição posterior — Gran Turismo (v1.1)

- ROM já estava extraída (693 MB, track única — maior bin até agora).
- Renomeada para `gran-turismo.bin` + `.cue` reescrito.
- Capa `assets/covers/gran-turismo.png`; página `gran-turismo.html`;
  card + README.

## Adição posterior — Marvel vs. Capcom: Clash of Super Heroes

- ROM já estava extraída (428 MB, track única).
- Renomeada para `marvel-vs-capcom.bin` + `.cue` reescrito.
- Capa `assets/covers/marvel-vs-capcom.png`; página `marvel-vs-capcom.html`;
  card + README.

## Adição posterior — Castlevania: Symphony of the Night (multi-track)

- ROM já estava extraída em 2 tracks (1 dados + 1 áudio CDDA).
- Binmerge: `castlevania-sotn.bin` (583 MB / 248.015 setores) + `.cue`
  reescrito com índices absolutos; originais removidos.
- Capa `assets/covers/castlevania-sotn.png`; página `castlevania-sotn.html`;
  card + README.

## Adição posterior — Vigilante 8: 2nd Offense (multi-track)

- Observação: o disco disponível é **Vigilante 8: 2nd Offense** (sequência),
  não o Vigilante 8 original — adicionado como tal.
- 17 tracks (1 dados + 16 áudio CDDA) → binmerge em `vigilante-8-2nd-offense.bin`
  (718 MB / 305.336 setores) + `.cue` com índices absolutos; originais removidos.
- Capa `assets/covers/vigilante-8.png`; página `vigilante-8.html`; card + README.

## Adição posterior — Pepsiman (formato diferente)

- ROM veio como ISO single-file (`Pepsiman (Japan).iso`, 216 MB / 92.029
  setores) + `.cue` do IsoBuster com 8 tracks internos, referência quebrada
  (`Pepsiman.iso`) e diretivas `REM`/SESSION.
- Renomeado para `pepsiman.bin` e `.cue` reescrito limpo, preservando os
  MSFs originais de cada track (sem pregaps — tracks contíguos).
- Capa `assets/covers/pepsiman.png`; página `pepsiman.html`; card + README.

## Adição posterior — Resident Evil

- ROM já estava extraída (680 MB, track única).
- Renomeada para `resident-evil.bin` + `.cue` reescrito.
- Capa `assets/covers/resident-evil.png`; página `resident-evil.html`; card + README.
- RE2 e RE3 ainda estão em `.7z` sem página.

## Ajuste de UI

- Removido o badge "EmulatorJS local + BIOS real" (e o CSS `.badge` morto)
  das 16 páginas de jogo a pedido do usuário.
- Subtítulo do menu trocado para "Escolha um clássico e divirta-se!".
- Capas placeholder substituídas por boxart real do repo libretro-thumbnails
  (Named_Boxarts, região correta de cada disco — KOF'98 e Pepsiman = Japan).
- `.card img` mudado de `object-fit:cover` para `contain` (capa inteira visível).
- crash.png e jackie.png mantidos (já eram arte real).

## Adição posterior — Resident Evil 3: Nemesis

- ROM já estava extraída (722 MB, track única — maior bin do projeto).
- Renomeada para `resident-evil-3.bin` + `.cue` reescrito.
- Capa real baixada do libretro-thumbnails (`Resident Evil 3 - Nemesis (USA)`).
- Página `resident-evil-3.html`; card + README.
- RE2 (Disc 1) segue em `.7z` sem página.

## Adição posterior — Spider-Man

- ROM já estava extraída (729 MB, track única) — renomeada para
  `spider-man.bin` + `.cue` reescrito.
- Capa real do libretro-thumbnails (`Spider-Man (USA)`).
- Página `spider-man.html`; card + README.

## Ajuste de capas

- Cortada a faixa lateral da espinha ("PlayStation" + logo + selo ESRB)
  das boxarts baixadas: detecção automática da borda vertical espinha→arte
  (~53-84px conforme o scan) + refinamento manual em `castlevania-sotn`
  (+22px) e `dragon-ball-gt` (+15px) que tinham sobras.
- `king-of-fighters-98.png` não foi cortado — capa japonesa, sem espinha.

## Adição posterior — Resident Evil 2 (2 discos, página única)

- Cada disco tinha 2 tracks (dados + áudio) → binmerge:
  `resident-evil-2-disc1.bin` (656 MB) e `resident-evil-2-disc2.bin` (665 MB)
  + cues com índices absolutos.
- `resident-evil-2.html` é uma página única com tela de seleção:
  Leon (Disco 1) ou Claire (Disco 2); o clique injeta `data/loader.js`
  com o `EJS_gameUrl`/`EJS_gameParentUrl` do disco escolhido.
- Ambos os discos usam o mesmo `EJS_gameName` ("Resident Evil 2") para
  compartilhar o memory card — como no hardware real (cenários A/B).
- Capas `resident-evil-2.png` + `resident-evil-2-disc1/2.png` do
  libretro-thumbnails, com espinha cortada (74px no total).

## Adição posterior — Mega Man X4

- ROM já estava extraída (592 MB, track única) — `mega-man-x4.bin` + `.cue`.
- Capa real `Mega Man X4 (USA)` do libretro-thumbnails, espinha cortada (77px).
- Página `mega-man-x4.html`; card + README.
- Novos arquivos vistos em `assets/` ainda sem página: `Driver 2 (Disc 1)`,
  `Tenchu 2`, `Twisted Metal 4.7z`.

## Adição posterior — Twisted Metal 4 (multi-track)

- 23 tracks (1 dados + 22 áudio CDDA) → binmerge em `twisted-metal-4.bin`
  (747 MB / 317.757 setores — maior do projeto) + `.cue` com índices absolutos.
- Capa `Twisted Metal 4 (USA)` do libretro-thumbnails, espinha cortada (68px).
- Página `twisted-metal-4.html`; card + README.
- Ainda sem página: `Driver 2 (Disc 1)` (extraído) e `Tenchu 2.7z`.

## Adição posterior — Tenchu 2: Birth of the Stealth Assassins

- ROM já estava extraída (744 MB, track única) — `tenchu-2.bin` + `.cue`.
- Capa real `Tenchu 2 ... (USA)` do libretro-thumbnails, espinha cortada (83px).
- Página `tenchu-2.html`; card + README.
- Resta sem página: `Driver 2 (Disc 1)`.

## Adição posterior — Driver (Europe)

- Em `assets/` havia apenas `Driver (Europe).bin` (747 MB), SEM `.cue` —
  os arquivos de Driver 2 foram removidos pelo usuário.
- Varredura do bin: nenhum pregap de áudio (zero-runs < 100 setores) e
  todos os setores têm sync MODE2 → rip single-track de dados; `.cue`
  single-track criado manualmente.
- Capa `Driver (Europe)` do libretro-thumbnails (PAL: sem espinha lateral;
  cortada a faixa preta "PlayStation" da parte inferior, ~85px).
- Página `driver.html`; card + README.

## Adição posterior — Dino Crisis (v1.1, multi-track)

- 2 tracks (dados + áudio) → binmerge `dino-crisis.bin` (417 MB) + `.cue`.
- Capa `Dino Crisis (USA)` do libretro-thumbnails, espinha cortada (81px).
- Página `dino-crisis.html`; card + README.

## Adição posterior — Silent Hill (v1.1)

- ROM já estava extraída (616 MB, track única) — `silent-hill.bin` + `.cue`.
- Capa `Silent Hill (USA)` do libretro-thumbnails, espinha cortada (77px).
- Página `silent-hill.html`; card + README.

## Adição posterior — botões Salvar/Carregar progresso (todas as páginas)

- `save-buttons.js` (novo, compartilhado): injeta "💾 Salvar progresso" (baixa `.state`
  via `gameManager.getState()`) e "📂 Carregar progresso" (importa `.state` via
  `loadState()` ou memory card `.srm`/`.mcr`/`.sav` via `FS.writeFile` +
  `loadSaveFiles()`). Inserido abaixo de `#game` (antes de `.hint`).
- `'save-save-interval': '30'` adicionado ao `EJS_defaultOptions` das 25 páginas —
  memory card gravado no IndexedDB a cada 30s ("tempo real").
- Flush extra do memory card em `pagehide`/`visibilitychange` dentro de save-buttons.js.
- `crash.html` tinha `EJS_defaultOptions` em linha única — ajustado à parte.
- `node --check` ok; endpoints 200.

## Adição posterior — rebranding "WebGame" + favicon joystick

- "PS1 no Navegador" substituído por "WebGame" nos `<title>` das 26 páginas e no h1 do index.
- Favicon: `assets/covers/*.png` substituído por emoji 🎮 (SVG data-URI) em todas as páginas.
- Emojis temáticos dos `<h1>` das páginas de jogo trocados por 🎮.
- `README.md` H1 reduzido para `# WebGame`.

## Adição posterior — salvar rápido F1 / recarregar F2

- `save-buttons.js`: `keydown` F1 -> `getState()` -> `localStorage` (base64); F2 -> `loadState()`.
- Fallback IndexedDB (`webgame-quick`) quando o save state estoura a quota do localStorage.
- Chave do slot: `webgame:quick:<slug>:<cue>` — separa discos (RE2 disc1/disc2).
- Botões "⚡ Salvar rápido (F1)" e "↩️ Recarregar (F2)" na barra; hint das 25 páginas menciona os atalhos.

## Adição posterior — Grand Theft Auto

- 11 tracks (1 dados + 10 áudio) -> binmerge: `grand-theft-auto.bin` (715 MB / 304.282 setores).
- Pregap dentro dos arquivos: Track 02 = 150 setores, tracks 03-11 = 75 setores.
- Capa `Grand Theft Auto (USA)` do libretro-thumbnails; espinha cortada manual (78px —
  detector falhou por prédios escuros na arte).
- Página `grand-theft-auto.html`; card + README.

## Adição posterior — Grand Theft Auto 2

- Track única já extraída (545 MB) — `grand-theft-auto-2.bin` + `.cue`.
- Capa `Grand Theft Auto 2 (USA)` do libretro-thumbnails; espinha cortada em 73px
  (borda nítida: coluna 72 = 100% escura).
- Página `grand-theft-auto-2.html`; card + README.

## Adição posterior — Tony Hawk's Pro Skater

- Track única já extraída (660 MB) — `tony-hawk-pro-skater.bin` + `.cue`.
- Capa `Tony Hawk's Pro Skater (USA)` do libretro-thumbnails; espinha cortada em 77px.
- Página `tony-hawk-pro-skater.html`; card + README.
- Restam THPS 2, 3 e 4 em `assets/` sem página.

## Adição posterior — Tony Hawk's Pro Skater 2

- Track única já extraída (748 MB) — `tony-hawk-pro-skater-2.bin` + `.cue`.
- Capa `Tony Hawk's Pro Skater 2 (USA)` do libretro-thumbnails; espinha cortada em 78px.
- Página `tony-hawk-pro-skater-2.html`; card + README.
- Restam THPS 3 e 4 em `assets/` sem página.

## Adição posterior — Tony Hawk's Pro Skater 3

- Track única já extraída (706 MB) — `tony-hawk-pro-skater-3.bin` + `.cue`.
- Capa `Tony Hawk's Pro Skater 3 (USA)` do libretro-thumbnails; espinha cortada em 75px.
- Página `tony-hawk-pro-skater-3.html`; card + README.
- Resta THPS 4 em `assets/` sem página.

## Adição posterior — Tony Hawk's Pro Skater 4

- Track única já extraída (747 MB) — `tony-hawk-pro-skater-4.bin` + `.cue`.
- Capa `Tony Hawk's Pro Skater 4 (USA)` do libretro-thumbnails; espinha cortada em 78px.
- Página `tony-hawk-pro-skater-4.html`; card + README.
- Todos os `.bin`/`.cue` de `assets/` agora têm página própria.

## Publicação — GitHub Pages

- Repo git criado em `D:\dev\WebGame`; remote `origin` = github.com/leostella97/webgame.
- Commit com identidade do usuário (`leostella97 <leonstella97@gmail.com>`) — sem Devin.
- `.gitignore`: `assets/*.bin`, `assets/*.7z`, `data/bios/` (limite 100MB + copyright).
- Branches `main` e `gh-pages` publicadas; repo tornou-se público; Pages ativado
  via branch `gh-pages` (o push disparou a ativação automática quando público).
- Deploy fila→success após ~8min; `leostella97.github.io/webgame/` no ar (200).
- Alias `/WebGame` NÃO funciona: github.io é case-sensitive no nome do repo;
  exigiria renomear o repo para `WebGame` (redirect automático manteria `/webgame`).

## Hospedagem remota das ROMs — Internet Archive (escolha do usuário)

- `roms-config.js`: `location.hostname` local → `assets/` + `data/bios/`; senão
  → `https://archive.org/download/webgame-ps1/` (ROMs + `psx-bios.zip`).
- CORS verificado no IA (`Access-Control-Allow-Origin: *` nos downloads).
- 31 páginas reescritas: `EJS_gameUrl`/`EJS_gameParentUrl` = `ROM_BASE_URL + 'x'`
  e `EJS_biosUrl = EJS_BIOS_URL`; `<script src="roms-config.js">` no `<head>`.
- `upload-ia.py`: sobe `assets/*.bin`, `assets/*.cue` e `data/bios/psx-bios.zip`
  ao item `webgame-ps1` via lib `internetarchive` (exige `ia configure` do usuário).
- Pendente do usuário: criar conta archive.org, rodar o upload (~15 GB).

## Estado ao final

- Servidor rodando em http://localhost:3000 (porta 8080 bloqueada pelo Windows — WinError 10013).
- Sem testes automatizados no projeto; verificação feita via HTTP.

## Próximos passos

- Demais ROMs `.7z` em `assets/` ainda não têm página — extrair e adicionar conforme necessário.
- Capa do Harvest Moon é placeholder gerada; substituir por arte oficial se desejado.

## Launcher WebGame.bat (TEAM_001)

- `WebGame.bat`: duplo clique sobe `server.py` na porta 3000 (se a porta estiver livre) em janela minimizada e abre o site em janela de aplicativo (`--app=` no Edge/Chrome — so o conteudo, sem UI do navegador); sem Chromium cai para a aba padrao.
- Detalhes: `cd /d %~dp0` roda de qualquer atalho; checagem de porta evita instancia dupla; `timeout.exe` por caminho absoluto (o `timeout` do Git Bash tem sintaxe diferente); labels fora de blocos `()`.

## Icone do launcher (TEAM_001)

- `webgame.ico`: emoji 🎮 renderizado via Segoe UI Emoji (PIL, multi-size 16-256).
- `.bat` nao aceita icone embutido: `WebGame.lnk` aponta para o .bat com IconLocation=webgame.ico. O .lnk tem caminhos absolutos (D:\dev\WebGame) — fica local, fora do git.
