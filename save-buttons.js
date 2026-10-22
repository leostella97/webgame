// TEAM_001: botões "Salvar"/"Carregar" progresso + salvar rápido F1/F2
// injetados nas páginas de jogo.
// "Salvar" baixa um save state (.state); "Carregar" importa .state ou
// memory card (.srm/.mcr/.sav) de volta ao emulador em tempo real.
// F1 guarda o estado exato no armazenamento local do navegador; F2 recarrega.
// O memory card também é gravado no navegador automaticamente a cada 30s
// (opção 'save-save-interval' definida no EJS_defaultOptions de cada página).
(function () {
  'use strict';

  // Estilo dos botões, combinando com o tema escuro das páginas.
  const CSS = `
    .svwrap{display:flex;gap:.6rem;justify-content:center;padding:.4rem 1rem .2rem;max-width:800px;width:100%;flex-wrap:wrap}
    .svbtn{background:#1a1a2e;border:1px solid #e94560;color:#e0e0e0;border-radius:6px;
           padding:.45rem 1.1rem;font-size:.82rem;cursor:pointer;transition:background .15s}
    .svbtn:hover{background:#2a2a4a}
    .svbtn:active{transform:scale(.97)}
    .svbtn kbd{background:#333;border:1px solid #555;border-radius:3px;padding:0 4px;
               font-family:monospace;font-size:.75rem;margin-left:.3rem}
  `;

  // Converte o nome do jogo em nome de arquivo/chave segura.
  function slug() {
    const nome = (window.EJS_gameName || document.title || 'jogo').toString();
    return nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
               .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  // Chave do slot rápido: inclui o nome do .cue para separar discos
  // (ex.: RE2 -> resident-evil-2:resident-evil-2-disc1).
  function chaveRapida() {
    const disc = (window.EJS_gameUrl || '').split('/').pop().replace(/\.[^.]+$/, '');
    return 'webgame:quick:' + slug() + (disc ? ':' + disc : '');
  }

  // Mostra mensagem dentro do emulador quando possível; senão, alert().
  function aviso(texto) {
    if (window.EJS_emulator && typeof EJS_emulator.displayMessage === 'function') {
      EJS_emulator.displayMessage(texto);
    } else {
      alert(texto);
    }
  }

  // Retorna o gameManager só quando o jogo já iniciou de fato.
  function gerente() {
    const e = window.EJS_emulator;
    return (e && e.started && e.gameManager) ? e.gameManager : null;
  }

  // --- codificação base64 para guardar bytes no localStorage ---

  function paraBase64(bytes) {
    let bin = '';
    const passo = 0x8000; // evita estourar a pilha com chunks grandes
    for (let i = 0; i < bytes.length; i += passo) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + passo));
    }
    return btoa(bin);
  }

  function deBase64(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  // --- IndexedDB como fallback quando o localStorage estoura a quota ---
  // (estados de PS1 podem passar de 5 MB)

  function banco() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('webgame-quick', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('states');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function gravarFallback(chave, bytes) {
    const db = await banco();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('states', 'readwrite');
      tx.objectStore('states').put(bytes, chave);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  async function lerFallback(chave) {
    const db = await banco();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('states', 'readonly');
      const req = tx.objectStore('states').get(chave);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  // --- salvar rápido (F1) / recarregar (F2) ---

  async function salvarRapido() {
    const gm = gerente();
    if (!gm) { aviso('Aguarde o jogo iniciar para salvar.'); return; }
    let bytes;
    try { bytes = gm.getState(); } catch (e) { aviso('Falha ao gerar o save state.'); return; }
    const chave = chaveRapida();
    try {
      // tentativa principal: localStorage (síncrono, instantâneo)
      localStorage.setItem(chave, paraBase64(bytes));
      aviso('⚡ Salvo rápido! (F1)');
    } catch (e) {
      // quota excedida: fallback para IndexedDB
      try {
        localStorage.removeItem(chave); // remove sobra parcial, se houver
        await gravarFallback(chave, bytes);
        aviso('⚡ Salvo rápido! (F1)');
      } catch (e2) { aviso('Sem espaço para o save rápido.'); }
    }
  }

  async function carregarRapido() {
    const gm = gerente();
    if (!gm) { aviso('Aguarde o jogo iniciar para carregar.'); return; }
    const chave = chaveRapida();
    const b64 = localStorage.getItem(chave);
    let bytes = null;
    if (b64) bytes = deBase64(b64);
    else bytes = await lerFallback(chave);
    if (!bytes) { aviso('Nenhum save rápido (F1) neste jogo ainda.'); return; }
    gm.loadState(bytes);
    aviso('↩️ Estado recarregado! (F2)');
  }

  // --- salvar arquivo (.state) / carregar arquivo ---

  // Baixa o save state atual como arquivo .state.
  function salvar() {
    const gm = gerente();
    if (!gm) { aviso('Aguarde o jogo iniciar para salvar.'); return; }
    let bytes;
    try { bytes = gm.getState(); } catch (e) { aviso('Falha ao gerar o save state.'); return; }
    const url = URL.createObjectURL(new Blob([bytes]));
    const a = document.createElement('a');
    a.href = url;
    a.download = slug() + '.state';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    aviso('Progresso exportado como ' + a.download);
  }

  // Importa um arquivo de progresso escolhido pelo usuário.
  async function carregarArquivo(arq) {
    const gm = gerente();
    if (!gm) { aviso('Aguarde o jogo iniciar para carregar.'); return; }
    const bytes = new Uint8Array(await arq.arrayBuffer());
    const ext = (arq.name.split('.').pop() || '').toLowerCase();
    if (ext === 'state') {
      // Save state: snapshot completo, carrega instantaneamente no ponto salvo.
      gm.loadState(bytes);
      aviso('Progresso carregado!');
    } else {
      // Memory card (.srm/.mcr/.sav): grava no FS do core e avisa o emulador.
      const caminho = gm.getSaveFilePath();
      if (!caminho) { aviso('Este jogo não usa memory card.'); return; }
      try { gm.FS.unlink(caminho); } catch (e) { /* arquivo ainda não existe */ }
      gm.FS.writeFile(caminho, bytes);
      gm.loadSaveFiles();
      aviso('Memory card importado!');
    }
  }

  // Monta a barra de botões e liga os eventos.
  function montar() {
    const estilo = document.createElement('style');
    estilo.textContent = CSS;
    document.head.appendChild(estilo);

    const barra = document.createElement('div');
    barra.className = 'svwrap';
    barra.innerHTML =
      '<button type="button" class="svbtn" id="sv-rapido">⚡ Salvar rápido<kbd>F1</kbd></button>' +
      '<button type="button" class="svbtn" id="sv-voltar">↩️ Recarregar<kbd>F2</kbd></button>' +
      '<button type="button" class="svbtn" id="sv-salvar">💾 Salvar progresso</button>' +
      '<button type="button" class="svbtn" id="sv-carregar">📂 Carregar progresso</button>' +
      '<input type="file" id="sv-arquivo" accept=".state,.srm,.mcr,.sav" hidden>';

    // Posição preferida: logo abaixo da tela do jogo, acima da dica de controles.
    const dica = document.querySelector('.hint');
    if (dica) dica.before(barra); else document.body.appendChild(barra);

    barra.querySelector('#sv-rapido').addEventListener('click', salvarRapido);
    barra.querySelector('#sv-voltar').addEventListener('click', carregarRapido);
    barra.querySelector('#sv-salvar').addEventListener('click', salvar);
    barra.querySelector('#sv-carregar').addEventListener('click',
      () => barra.querySelector('#sv-arquivo').click());
    barra.querySelector('#sv-arquivo').addEventListener('change', (ev) => {
      if (ev.target.files && ev.target.files[0]) carregarArquivo(ev.target.files[0]);
      ev.target.value = ''; // permite reimportar o mesmo arquivo
    });
  }

  // Atalhos de teclado: F1 salva o estado exato, F2 recarrega.
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'F1') { ev.preventDefault(); salvarRapido(); }
    else if (ev.key === 'F2') { ev.preventDefault(); carregarRapido(); }
  });

  // Ao fechar/trocar de aba, grava o memory card pendente no navegador.
  function gravarPendente() {
    try { gerente() && gerente().saveSaveFiles(); } catch (e) { /* emulador ainda não pronto */ }
  }
  window.addEventListener('pagehide', gravarPendente);
  document.addEventListener('visibilitychange',
    () => { if (document.hidden) gravarPendente(); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();
