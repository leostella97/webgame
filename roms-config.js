// TEAM_001: origem das ROMs/BIOS — local (server.py) usa assets/ + data/bios/;
// publicado (github.io) baixa tudo do item no Internet Archive.
// Se o identificador do item no IA mudar, ajuste a constante IA_ITEM.
(function () {
  'use strict';
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  const IA_ITEM = 'webgame-ps1';                      // identificador do item no archive.org
  const IA_BASE = 'https://archive.org/download/' + IA_ITEM + '/';

  window.ROM_BASE_URL = local ? 'assets/' : IA_BASE;
  window.EJS_BIOS_URL = local ? 'data/bios/psx-bios.zip' : IA_BASE + 'psx-bios.zip';
})();
