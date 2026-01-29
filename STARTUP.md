# 🚀 How to Run ShopHub Locally

Your ecommerce platform is ready to run! Here are multiple ways to host it locally for backend integration.

## ✅ QUICK START OPTIONS

### Option 1: VS Code Live Server (EASIEST - No Installation!)
This is the simplest solution if you already have VS Code installed.

**Steps:**
1. Open this project in VS Code
2. Install "Live Server" extension (search in extensions marketplace)
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. Browser will open at `http://localhost:5500` (or similar)

**Advantages:**
- ✓ No additional installation needed
- ✓ Auto-refreshes on file changes
- ✓ Built-in preview server
- ✓ Perfect for development

---

### Option 2: Using Node.js & Express (RECOMMENDED for Backend Integration)
Best option if you plan to add a backend server.

**Prerequisites:**
- Install Node.js from https://nodejs.org (includes npm)

**Steps:**
```bash
# 1. Navigate to project directory
cd c:\Users\AjeetSisodiya\Desktop\learningProjects\ecommerce

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

**Result:**
- Server runs at `http://localhost:3000`
- Express setup is ready for backend integration
- API endpoints already configured in `server.js`

---

### Option 3: Using Python HTTP Server
If you have Python installed but not Node.js.

**Prerequisites:**
- Install Python from https://python.org

**Steps:**
```powershell
# Navigate to project directory
cd c:\Users\AjeetSisodiya\Desktop\learningProjects\ecommerce

# Run Python HTTP server
python -m http.server 3000
```

**Result:**
- Server runs at `http://localhost:3000`
- Basic static file serving (no API endpoints)

---

### Option 4: Automated Scripts
Use the provided startup scripts.

**Windows Batch File:**
```batch
# Just double-click: start-server.bat
```

**PowerShell:**
```powershell
# Run in PowerShell
.\start-server.ps1
```

Both scripts auto-detect your installed runtime and start the appropriate server.

---

## 📋 FILE STRUCTURE

```
ecommerce/
├── index.html              # Main landing page
├── style.css               # Styling
├── script.js               # Frontend JavaScript
├── server.py               # Python HTTP server
├── server.js               # Node.js Express server (requires npm install)
├── package.json            # Node.js dependencies
├── start-server.bat        # Windows batch launcher
├── start-server.ps1        # PowerShell launcher
├── STARTUP.md              # This file
└── README.md               # Project documentation
```

---

## 🔌 API ENDPOINTS (When Using Node.js)

Once running, these endpoints are available:

```
GET http://localhost:3000/api/health
  Returns: Server status

GET http://localhost:3000/api/products/featured
  Returns: List of featured products

POST http://localhost:3000/api/login
  Body: { email, password }

POST http://localhost:3000/api/signup
  Body: { name, email, password }

POST http://localhost:3000/api/contact
  Body: { name, email, message }
```

---

## 🔧 BACKEND INTEGRATION SETUP

The server is already configured for backend integration. Here's what's set up:

### Server Files:
- **server.js** - Express server with basic API routes
- **server.py** - Python HTTP server alternative
- **package.json** - Node.js dependencies

### Ready-to-Integrate Features:
1. **CORS Enabled** - Frontend can communicate with backend
2. **Body Parser** - Automatic JSON request parsing
3. **Static File Serving** - HTML/CSS/JS served automatically
4. **API Routes** - Placeholder endpoints ready for database integration
5. **Error Handling** - Basic error responses included

### Next Steps for Backend:
1. Keep the server running on port 3000
2. Database can be added (MongoDB, PostgreSQL, etc.)
3. User authentication can be integrated
4. Product data can come from database
5. Forms can submit to real backend logic

---

## ⚠️ TROUBLESHOOTING

### "Command not recognized"
- Install Node.js or Python
- Restart VS Code after installation
- Try using the alternative server option

### Port 3000 already in use
```powershell
# Find what's using port 3000 and kill it
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module not found error (Node.js)
```bash
# Reinstall dependencies
npm install --force
npm start
```

### CORS errors in console
- Use the provided server.py or server.js
- They have CORS configured properly
- Don't use plain Python http.server for API calls

---

## 🌐 ACCESSING YOUR SITE

After starting the server:

1. **Local Access:**
   - Open browser and go to: `http://localhost:3000` (or 5500 for Live Server)

2. **Mobile/Other Device (same network):**
   - Find your computer's IP: `ipconfig` command in PowerShell
   - Use: `http://<your-ip>:3000`

3. **View Server Logs:**
   - Check terminal where server is running
   - Shows all requests and errors

---

## 📊 RECOMMENDED SETUP

For the best development experience:

1. **Use Node.js + Express** (Option 2)
   - Most scalable for adding features
   - Ready for database integration
   - Can add authentication easily

2. **Use VS Code Live Server** (Option 1)
   - While waiting for backend setup
   - Or for frontend-only testing

3. **Keep terminal open**
   - See real-time logs
   - Monitor API calls

---

## 🎯 DEVELOPMENT WORKFLOW

```
1. Start Server:
   npm start (port 3000)

2. Open in Browser:
   http://localhost:3000

3. Edit Files:
   - Frontend: index.html, style.css, script.js
   - Backend: server.js (when ready)

4. Auto-refresh:
   - Hard refresh browser (Ctrl+Shift+R) or Live Server auto-refresh
   - Changes take effect immediately

5. Test API:
   - Use browser DevTools Network tab
   - Or Postman/Insomnia apps
```

---

## 📞 SUPPORT

If you encounter issues:
1. Check the README.md for project info
2. Ensure Node.js/Python is properly installed
3. Try using a different server option
4. Clear browser cache (Ctrl+Shift+Delete)

---

Happy coding! 🚀

The site is now ready for backend integration. Start adding your database, authentication, and business logic whenever you're ready!
