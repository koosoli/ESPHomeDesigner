@echo off
cd /d "%~dp0"

echo ====================================
echo   ESPHome Designer - Local Editor
echo ====================================
echo.

:: Aggressive Cleanup (still good practice)
echo [INFO] Killing old processes...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq ESPHome Designer Server" >nul 2>&1
timeout /t 1 /nobreak >nul

if not exist "node_modules\" call npm install

echo.
echo [INFO] Starting Server on Port 5174...
echo [INFO] Browser will open automatically once connected...
echo.

:: Smart Launcher: Target strict 5174
start "" /B powershell -NoProfile -Command "$port=5174; $tcp = New-Object System.Net.Sockets.TcpClient; $start = Get-Date; while (-not $tcp.Connected) { try { $tcp.Connect('localhost', $port) } catch { Start-Sleep -Milliseconds 250 } if (((Get-Date) - $start).TotalSeconds -gt 30) { exit } }; $tcp.Close(); Start-Process 'http://localhost:5174/'"

call npm run dev
