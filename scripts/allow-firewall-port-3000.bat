@echo off
:: Check for admin privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Please right-click this file and select "Run as administrator".
    pause
    exit /b 1
)

echo Adding Windows Firewall rule for Port 3000...
powershell -Command "New-NetFirewallRule -DisplayName 'NextJS Port 3000' -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow"

echo.
echo [SUCCESS] Port 3000 is now allowed through Windows Firewall!
echo Your local network users can now visit: http://192.168.1.130:3000
echo.
pause
