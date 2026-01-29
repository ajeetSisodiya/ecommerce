import os
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import sys

PORT = 3000

class ShopHubRequestHandler(SimpleHTTPRequestHandler):
    """Custom HTTP request handler for ShopHub server"""
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # API Endpoints
        if path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = json.dumps({
                'status': 'Server is running!',
                'timestamp': str(__import__('datetime').datetime.now())
            })
            self.wfile.write(response.encode())
            return
        
        elif path == '/api/products/featured':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            products = [
                {
                    'id': 1,
                    'name': 'Premium Wireless Headphones',
                    'price': 79.99,
                    'description': 'High-quality sound with noise cancellation',
                    'image': 'https://via.placeholder.com/250x250?text=Product+1',
                    'badge': 'New'
                },
                {
                    'id': 2,
                    'name': 'Smart Watch Pro',
                    'price': 199.99,
                    'description': 'Track your fitness with style and elegance',
                    'image': 'https://via.placeholder.com/250x250?text=Product+2',
                    'badge': 'Sale'
                },
                {
                    'id': 3,
                    'name': 'Ultra-Slim Tablet',
                    'price': 349.99,
                    'description': 'Portable entertainment at its finest',
                    'image': 'https://via.placeholder.com/250x250?text=Product+3',
                    'badge': 'Hot'
                },
                {
                    'id': 4,
                    'name': 'Portable Power Bank',
                    'price': 34.99,
                    'description': 'Keep your devices charged on the go',
                    'image': 'https://via.placeholder.com/250x250?text=Product+4',
                    'badge': None
                }
            ]
            response = json.dumps(products)
            self.wfile.write(response.encode())
            return
        
        # Serve static files
        if path == '/' or path == '':
            path = '/index.html'
        
        if path.startswith('/'):
            path = path[1:]
        
        if os.path.exists(path):
            if path.endswith('.html'):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
            elif path.endswith('.css'):
                self.send_response(200)
                self.send_header('Content-type', 'text/css')
            elif path.endswith('.js'):
                self.send_response(200)
                self.send_header('Content-type', 'application/javascript')
            else:
                self.send_response(200)
            
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            with open(path, 'rb') as f:
                self.wfile.write(f.read())
            return
        
        self.send_response(404)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = json.dumps({'error': 'File not found'})
        self.wfile.write(response.encode())
    
    def do_POST(self):
        """Handle POST requests"""
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        
        try:
            data = json.loads(body) if body else {}
        except:
            data = {}
        
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Login endpoint
        if path == '/api/login':
            email = data.get('email')
            password = data.get('password')
            
            if not email or not password:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                response = json.dumps({'error': 'Email and password are required'})
                self.wfile.write(response.encode())
                return
            
            print(f'[LOGIN] Attempt from: {email}')
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = json.dumps({
                'success': True,
                'message': 'Login successful',
                'user': {'email': email}
            })
            self.wfile.write(response.encode())
            return
        
        # Signup endpoint
        elif path == '/api/signup':
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            
            if not name or not email or not password:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                response = json.dumps({'error': 'Name, email, and password are required'})
                self.wfile.write(response.encode())
                return
            
            print(f'[SIGNUP] New user: {name} ({email})')
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = json.dumps({
                'success': True,
                'message': 'Account created successfully',
                'user': {'name': name, 'email': email}
            })
            self.wfile.write(response.encode())
            return
        
        # Contact endpoint
        elif path == '/api/contact':
            name = data.get('name')
            email = data.get('email')
            message = data.get('message')
            
            if not name or not email or not message:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                response = json.dumps({'error': 'All fields are required'})
                self.wfile.write(response.encode())
                return
            
            print(f'[CONTACT] Message from {name} ({email}): {message[:50]}...')
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = json.dumps({
                'success': True,
                'message': 'Thank you for contacting us!'
            })
            self.wfile.write(response.encode())
            return
        
        self.send_response(404)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = json.dumps({'error': 'Endpoint not found'})
        self.wfile.write(response.encode())
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        """Custom logging format"""
        if '200' in str(args):
            print(f'[✓] {self.address_string()} - {format%args}')
        elif '404' in str(args):
            print(f'[✗] {self.address_string()} - {format%args}')
        else:
            print(f'[•] {self.address_string()} - {format%args}')

if __name__ == '__main__':
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, ShopHubRequestHandler)
    
    print("""
╔════════════════════════════════════════╗
║         🛍️  ShopHub Server 🛍️          ║
╚════════════════════════════════════════╝

✅ Server is running on:
   👉 http://localhost:3000
   
📝 API Endpoints:
   - GET  http://localhost:3000/api/health
   - POST http://localhost:3000/api/login
   - POST http://localhost:3000/api/signup
   - GET  http://localhost:3000/api/products/featured
   - POST http://localhost:3000/api/contact

🔧 To stop the server: Press Ctrl + C

Ready for backend integration! 🚀
════════════════════════════════════════
    """)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n[STOPPED] Server shutdown requested")
        httpd.server_close()
        sys.exit(0)
