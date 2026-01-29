# ShopHub - Project Structure Guide

## 📁 Complete Folder Structure

```
ecommerce/
│
├── 📄 index.html                    ← Main entry point (Root)
├── 📄 package.json                  ← Node.js dependencies
│
├── 📁 frontend/                     ← All frontend files
│   ├── 📁 css/
│   │   └── style.css                ✅ Main stylesheet
│   ├── 📁 js/
│   │   └── script.js                ✅ Main JavaScript
│   └── 📁 images/
│       ├── product1.svg             ✅ Headphones icon
│       ├── product2.svg             ✅ Smart Watch icon
│       ├── product3.svg             ✅ Tablet icon
│       └── product4.svg             ✅ Power Bank icon
│
├── 📁 backend/                      ← All backend/server files
│   ├── 📄 server.js                 ✅ Express.js server
│   ├── 📄 server.py                 ← Python alternative
│   └── 📁 routes/
│       └── 📁 api/                  ← API route files
│
├── 📁 docs/                         ← Documentation
│   ├── FOLDER-STRUCTURE.md
│   ├── STARTUP.md
│   └── ...
│
├── 📁 node_modules/                 ← Dependencies (auto-generated)
│
└── Configuration Files (in root):
    ├── start-server.bat
    ├── start-server.ps1
    ├── QUICK-START.txt
    ├── INSTALL-NODE.txt
    ├── README.md
    └── REORGANIZATION-COMPLETE.txt
```

---

## 📂 Folder Breakdown

### `frontend/`
**Contains all client-side code**
- **css/** → Stylesheets
  - `style.css` → Main stylesheet (all design & animations)
- **js/** → JavaScript files
  - `script.js` → All frontend logic (modals, forms, interactions)
- **images/** → All image assets
  - SVG product illustrations

### `backend/`
**Contains all server-side code**
- `server.js` → Main Express.js server
- `server.py` → Python HTTP server (alternative)
- **routes/api/** → API endpoint files (to be created)

### `docs/`
**Documentation files**
- Project guides
- Setup instructions
- API documentation (to be added)

---

## 🎯 How Files Work Together

### Frontend Flow:
```
index.html (root)
    ↓
Loads CSS from: frontend/css/style.css
    ↓
Loads JS from: frontend/js/script.js
    ↓
Loads images from: frontend/images/*.svg
```

### Backend Flow:
```
backend/server.js
    ↓
Serves static files from: frontend/
    ↓
Serves index.html from: root
    ↓
Handles API calls from: /api/*
```

---

## 🚀 Running the Server

```bash
cd backend
node server.js 3001
```

Then visit: **http://localhost:3001**

---

## ✨ Why This Structure?

✓ **Separation of Concerns** - Frontend and Backend clearly separated
✓ **Scalability** - Easy to add new features to each section
✓ **Maintainability** - Find files quickly
✓ **Professional** - Industry-standard folder structure
✓ **Collaboration** - Frontend team can work independently from backend team
✓ **API Ready** - Backend can grow with new routes

---

## 📝 File Reference Guide

| Purpose | Location |
|---------|----------|
| Main HTML | `index.html` (root) |
| Styling | `frontend/css/style.css` |
| JavaScript Logic | `frontend/js/script.js` |
| Product Images | `frontend/images/product*.svg` |
| Server Code | `backend/server.js` |
| API Routes | `backend/routes/api/` |
| Documentation | `docs/` |
| Dependencies | `package.json` (root) |

---

## 🔧 Adding New Features

**Frontend Feature:**
→ Create file in `frontend/css/` or `frontend/js/`

**Backend Feature:**
→ Create file in `backend/routes/api/`

**New Images:**
→ Add SVG/PNG to `frontend/images/`

**API Endpoint:**
→ Create file in `backend/routes/api/` and import in `backend/server.js`

---

Perfect structure! Clean, organized, and ready for growth. 🎉
