const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.argv[2] || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Basic API endpoint for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!', timestamp: new Date() });
});

// Login endpoint (placeholder for future integration)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // This is a placeholder - will be integrated with database later
    console.log('Login attempt:', email);
    
    res.json({
        success: true,
        message: 'Login functionality will be integrated with database',
        user: {
            email: email,
            // Add more user data here later
        }
    });
});

// Sign Up endpoint (placeholder for future integration)
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    
    // This is a placeholder - will be integrated with database later
    console.log('Signup attempt:', { name, email });
    
    res.json({
        success: true,
        message: 'Signup functionality will be integrated with database',
        user: {
            name: name,
            email: email
        }
    });
});

// Get featured products (placeholder)
app.get('/api/products/featured', (req, res) => {
    const featuredProducts = [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 79.99,
            description: 'High-quality sound with noise cancellation',
            image: 'https://via.placeholder.com/250x250?text=Product+1',
            badge: 'New'
        },
        {
            id: 2,
            name: 'Smart Watch Pro',
            price: 199.99,
            description: 'Track your fitness with style and elegance',
            image: 'https://via.placeholder.com/250x250?text=Product+2',
            badge: 'Sale'
        },
        {
            id: 3,
            name: 'Ultra-Slim Tablet',
            price: 349.99,
            description: 'Portable entertainment at its finest',
            image: 'https://via.placeholder.com/250x250?text=Product+3',
            badge: 'Hot'
        },
        {
            id: 4,
            name: 'Portable Power Bank',
            price: 34.99,
            description: 'Keep your devices charged on the go',
            image: 'https://via.placeholder.com/250x250?text=Product+4',
            badge: null
        }
    ];
    
    res.json(featuredProducts);
});

// Contact form endpoint (placeholder)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // This is a placeholder - will integrate with email service later
    console.log('Contact form submission:', { name, email, message });
    
    res.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.'
    });
});

// 404 Error handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║         🛍️  ShopHub Server 🛍️          ║
╚════════════════════════════════════════╝
    
✅ Server is running on:
   👉 http://localhost:${PORT}
   
📝 API Endpoints:
   - GET  http://localhost:${PORT}/api/health
   - POST http://localhost:${PORT}/api/login
   - POST http://localhost:${PORT}/api/signup
   - GET  http://localhost:${PORT}/api/products/featured
   - POST http://localhost:${PORT}/api/contact

🔧 To stop the server: Press Ctrl + C

Ready for backend integration! 🚀
════════════════════════════════════════
    `);
});
