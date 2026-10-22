# WebGame

## Como jogar

```bash
cd D:\dev\WebGame
python server.py        # porta 8080 (padrao)
# ou outra porta:
python server.py 9000
```

Abra http://localhost:8080 no navegador, escolha o jogo e clique em **Jogar**.

## Conteudo

| Pagina | Jogo |
|---|---|
| `index.html` | Menu de selecao |
| `jackie.html` | Jackie Chan Stuntmaster |
| `crash.html` | Crash Bandicoot |
| `harvest-moon.html` | Harvest Moon: Back to Nature |
| `metal-slug-x.html` | Metal Slug X |
| `mega-man-x4.html` | Mega Man X4 |
| `mortal-kombat-trilogy.html` | Mortal Kombat Trilogy |
| `tekken-3.html` | Tekken 3 |
| `king-of-fighters-98.html` | The King of Fighters '98 |
| `dragon-ball-gt.html` | Dragon Ball GT: Final Bout |
| `crash-bandicoot-2.html` | Crash Bandicoot 2 |
| `crash-team-racing.html` | Crash Team Racing |
| `gran-turismo.html` | Gran Turismo |
| `marvel-vs-capcom.html` | Marvel vs. Capcom |
| `castlevania-sotn.html` | Castlevania: Symphony of the Night |
| `vigilante-8.html` | Vigilante 8: 2nd Offense |
| `twisted-metal-4.html` | Twisted Metal 4 |
| `tenchu-2.html` | Tenchu 2: Birth of the Stealth Assassins |
| `driver.html` | Driver |
| `dino-crisis.html` | Dino Crisis |
| `silent-hill.html` | Silent Hill |
| `grand-theft-auto.html` | Grand Theft Auto |
| `grand-theft-auto-2.html` | Grand Theft Auto 2 |
| `tony-hawk-pro-skater.html` | Tony Hawk's Pro Skater |
| `tony-hawk-pro-skater-2.html` | Tony Hawk's Pro Skater 2 |
| `tony-hawk-pro-skater-3.html` | Tony Hawk's Pro Skater 3 |
| `tony-hawk-pro-skater-4.html` | Tony Hawk's Pro Skater 4 |
| `pepsiman.html` | Pepsiman |
| `resident-evil.html` | Resident Evil |
| `resident-evil-2.html` | Resident Evil 2 (seleção Leon/Claire) |
| `resident-evil-3.html` | Resident Evil 3: Nemesis |
| `spider-man.html` | Spider-Man |

- Emulador: EmulatorJS 4.2.3 local (`data/`), core pcsx_rearmed, BIOS real (scph*)
- `.bin` + `.cue` em `assets/`; saves ficam no IndexedDB do navegador
- Memory card gravado automaticamente a cada 30s (`save-save-interval`)
- Botoes embaixo da tela de jogo (`save-buttons.js`):
  - **Salvar rapido / Recarregar** (`F1`/`F2`) — estado exato no localStorage do navegador (fallback IndexedDB se o save estourar a quota)
  - **Salvar progresso** — baixa um save state `.state`
  - **Carregar progresso** — importa `.state` ou memory card `.srm`/`.mcr`/`.sav`
- Requer apenas Python 3 (ou qualquer servidor estatico: `npx serve`, `python -m http.server`)
