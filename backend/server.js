const express = require('express');
const path = require('path');

console.log('DEBUG: Modules loaded');

const app = express();
const PORT = 3000;

console.log('DEBUG: Express app created');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('DEBUG: Middleware configured');

// Serve static files - serve from parent directory (where index.html is)
const projectRoot = path.join(__dirname, '..');
console.log('DEBUG: Project root:', projectRoot);

app.use(express.static(projectRoot));

console.log('DEBUG: Static serving configured');

// Routes
// Serve the main page
app.get('/', (req, res) => {
    console.log('DEBUG: GET / requested');
    res.sendFile(path.join(projectRoot, 'index.html'));
});

// Basic API endpoint for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    res.json({ success: true, message: 'Login endpoint' });
});

// Sign Up endpoint
app.post('/api/signup', (req, res) => {
    res.json({ success: true, message: 'Signup endpoint' });
});

// Get featured products
app.get('/api/products/featured', (req, res) => {
    res.json([
        { id: 1, name: 'Wireless Headphones', price: 79.99 },
        { id: 2, name: 'Smart Watch', price: 199.99 },
        { id: 3, name: 'Tablet', price: 349.99 },
        { id: 4, name: 'Power Bank', price: 34.99 }
    ]);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    res.json({ success: true, message: 'Thank you for contacting us!' });
});

// Catch 404s
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║         🛍️  ShopHub Server 🛍️          ║');
    console.log('╚════════════════════════════════════════╝\n');
    console.log('✅ Server is running on: http://localhost:' + PORT);
    console.log('\n🔧 To stop: Press Ctrl + C\n');
});

server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

