# ShopHub Local Server - PowerShell Version
# This script will serve the ecommerce site locally

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         🛍️  ShopHub Server 🛍️          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Function to check if command exists
function Test-CommandExists {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Check for Node.js
if (Test-CommandExists node) {
    Write-Host "✓ Node.js found! Starting Express server..." -ForegroundColor Green
    Write-Host ""
    & node server.js
    exit
}

# Check for Python
if (Test-CommandExists python) {
    Write-Host "✓ Python found! Starting Python HTTP server..." -ForegroundColor Green
    Write-Host ""
    & python -m http.server 3000
    exit
}

# Check for Python3
if (Test-CommandExists python3) {
    Write-Host "✓ Python3 found! Starting Python HTTP server..." -ForegroundColor Green
    Write-Host ""
    & python3 -m http.server 3000
    exit
}

# If nothing found, show alternatives
Write-Host "✗ No suitable server runtime found!" -ForegroundColor Red
Write-Host ""
Write-Host "Alternative Solutions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Install Node.js (Recommended)" -ForegroundColor Cyan
Write-Host "   Download: https://nodejs.org"
Write-Host "   Then run: npm install && npm start"
Write-Host ""
Write-Host "2️⃣  Install Python" -ForegroundColor Cyan
Write-Host "   Download: https://python.org"
Write-Host "   Then run: python -m http.server 3000"
Write-Host ""
Write-Host "3️⃣  Use VS Code Live Server Extension" -ForegroundColor Cyan
Write-Host "   1. Open VS Code"
Write-Host "   2. Install 'Live Server' extension"
Write-Host "   3. Right-click index.html → Open with Live Server"
Write-Host ""

Read-Host "Press Enter to exit"
