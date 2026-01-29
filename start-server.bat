@echo off
setlocal enabledelayedexpansion

REM ShopHub Local Server Launcher
REM This batch file will serve the ecommerce site locally

echo.
echo ╔════════════════════════════════════════╗
echo ║         🛍️  ShopHub Server 🛍️          ║
echo ╚════════════════════════════════════════╝
echo.
echo Attempting to start local server...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if !ERRORLEVEL! equ 0 (
    echo ✓ Node.js found! Starting Express server...
    echo.
    node server.js
    pause
    exit /b
)

REM Check if Python is installed
where python >nul 2>nul
if !ERRORLEVEL! equ 0 (
    echo ✓ Python found! Starting Python server...
    echo.
    python -m http.server 3000
    pause
    exit /b
)

REM If neither is found, show message
echo ✗ Neither Node.js nor Python found!
echo.
echo Please install one of the following:
echo   1. Node.js (https://nodejs.org)
echo   2. Python (https://python.org)
echo.
echo Alternatively, you can use VS Code's Live Server extension:
echo   1. Install "Live Server" extension from VS Code marketplace
echo   2. Right-click on index.html and select "Open with Live Server"
echo.
pause
