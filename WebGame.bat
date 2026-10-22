@echo off
REM TEAM_001: launcher local — sobe server.py (se a porta estiver livre) e abre
REM o site em janela de aplicativo (Edge/Chrome --app: so o conteudo, sem UI do
REM navegador). Duplo clique para jogar.
setlocal

rem pasta do proprio .bat (funciona de qualquer diretorio/atalho)
cd /d "%~dp0"

rem porta e URL padrao do projeto
set "PORTA=3000"
set "URL=http://localhost:%PORTA%"

rem se o servidor ja estiver respondendo, vai direto abrir a pagina
curl -s -o nul --max-time 2 "%URL%/"
if not errorlevel 1 goto abre

rem sobe o servidor numa janela minimizada propria (fecha ao encerrar)
start "WebGame Server" /min cmd /c "python server.py %PORTA%"

rem aguarda o servidor comecar a responder antes de abrir a pagina
rem (caminho absoluto do timeout.exe: o timeout do Git Bash tem sintaxe outra)
:aguarda
"%SystemRoot%\System32\timeout.exe" /t 1 /nobreak >nul
curl -s -o nul --max-time 2 "%URL%/"
if errorlevel 1 goto aguarda

:abre
rem abre em janela de aplicativo: tenta Edge, depois Chrome, senao aba comum
set "EDGE1=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "EDGE2=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "CHROME1=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CHROME2=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "CHROME3=%LocalAppData%\Google\Chrome\Application\chrome.exe"

if exist "%EDGE1%"  (start "" "%EDGE1%"  --app=%URL% & goto fim)
if exist "%EDGE2%"  (start "" "%EDGE2%"  --app=%URL% & goto fim)
if exist "%CHROME1%" (start "" "%CHROME1%" --app=%URL% & goto fim)
if exist "%CHROME2%" (start "" "%CHROME2%" --app=%URL% & goto fim)
if exist "%CHROME3%" (start "" "%CHROME3%" --app=%URL% & goto fim)

rem sem navegador chromium: abre numa aba do navegador padrao
start "" %URL%

:fim
endlocal
