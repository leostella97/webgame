# TEAM_001: sobe ROMs (.bin/.cue) + BIOS para um item no Internet Archive.
#
# Uso (uma vez):
#   pip install internetarchive
#   ia configure            # login com sua conta archive.org
# Depois:
#   python upload-ia.py
#
# O identificador ITEM precisa bater com IA_ITEM em roms-config.js.
# Os arquivos sobem com o basename (assets/x.bin -> x.bin).

import glob
import os
import sys

try:
    from internetarchive import upload
except ImportError:
    sys.exit('rode: pip install internetarchive  &&  ia configure')

ITEM = 'webgame-ps1'

arquivos = sorted(glob.glob('assets/*.bin') + glob.glob('assets/*.cue'))
arquivos.append('data/bios/psx-bios.zip')

total = sum(os.path.getsize(a) for a in arquivos)
print(f'{len(arquivos)} arquivos -> item "{ITEM}" (~{total / 2**30:.1f} GB)')
for a in arquivos:
    print('  ', a, os.path.getsize(a) // 2**20, 'MB')

if input('\nConfirma upload? [s/N] ').strip().lower() != 's':
    sys.exit('cancelado')

resp = upload(
    ITEM,
    files=arquivos,
    metadata={
        'mediatype': 'software',
        'title': 'WebGame - assets de jogos PS1',
        'description': 'ROMs + BIOS consumidas pelo site leostella97.github.io/webgame via EmulatorJS.',
    },
    retries=10,
    verbose=True,
)
print('concluido:', [r.status_code for r in resp] if resp else resp)
