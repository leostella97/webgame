// TEAM_001: origem das ROMs/BIOS — o site publicado (github.io) baixa tudo do
// item no Internet Archive; qualquer outro host (localhost, IP da rede, proxy)
// usa os arquivos locais em assets/ + data/bios/.
// Se o identificador do item no IA mudar, ajuste a constante IA_ITEM.
(function () {
  'use strict';
  const remoto = location.hostname.endsWith('github.io');
  const IA_ITEM = 'webgame-ps1';                      // identificador do item no archive.org
  const IA_BASE = 'https://archive.org/download/' + IA_ITEM + '/';

  window.ROM_BASE_URL = remoto ? IA_BASE : 'assets/';
  window.EJS_BIOS_URL = remoto ? IA_BASE + 'psx-bios.zip' : 'data/bios/psx-bios.zip';
})();
