# 🔌 Complete API Integration Guide

## Frontend & Backend Communication Strategy

---

## Part 1: API Endpoint Configuration

### 1.1 Environment Configuration

Create a `frontend/js/config.js` file for API endpoints:

```javascript
// API Configuration
const API_CONFIG = {
    // Gateway endpoint (recommended approach)
    GATEWAY: 'http://localhost:8080/api',
    
    // Direct service endpoints (fallback)
    PRODUCT_SERVICE: 'http://localhost:8081',
    ORDER_SERVICE: 'http://localhost:8082',
    PAYMENT_SERVICE: 'http://localhost:8083',
    
    // Global settings
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json'
    }
};

// Helper function to add auth token
function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        ...API_CONFIG.HEADERS,
        'Authorization': token ? `Bearer ${token}` : ''
    };
}
```

---

## Part 2: Frontend API Calls

### 2.1 Product Service APIs

```javascript
// Fetch all products
async function fetchProducts(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/products?${params}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to load products');
        return { data: [] };
    }
}

// Fetch single product
async function fetchProductById(id) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/products/${id}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to load product');
        return null;
    }
}

// Search products
async function searchProducts(query, filters = {}) {
    try {
        const params = new URLSearchParams({
            q: query,
            ...filters
        });
        
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/products/search?${params}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Search failed');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

// Filter products
async function filterProducts(filters) {
    /*
    Filters object format:
    {
        category: 'audio',
        minPrice: 100,
        maxPrice: 500,
        rating: 4,
        inStock: true,
        page: 1,
        limit: 12
    }
    */
    try {
        const params = new URLSearchParams(
            Object.entries(filters)
                .filter(([, v]) => v !== null && v !== undefined)
                .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
        );
        
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/products?${params}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Filter failed');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}
```

### 2.2 Order Service APIs

```javascript
// Create order
async function createOrder(orderData) {
    /*
    Order data format:
    {
        userId: 'user123',
        items: [
            { productId: 1, quantity: 2 },
            { productId: 3, quantity: 1 }
        ],
        shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA'
        },
        shippingMethod: 'express',
        paymentMethod: 'creditCard',
        notes: 'Delivery instructions'
    }
    */
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/orders`,
            {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(orderData)
            }
        );
        
        if (!response.ok) throw new Error('Failed to create order');
        const result = await response.json();
        
        // Save order ID for payment processing
        localStorage.setItem('currentOrderId', result.data.orderId);
        return result;
    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to create order');
        return null;
    }
}

// Fetch user orders
async function fetchUserOrders(userId) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/orders/user/${userId}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

// Get single order
async function fetchOrderById(orderId) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/orders/${orderId}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Order not found');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Update order status
async function updateOrderStatus(orderId, status) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/orders/${orderId}/status`,
            {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status })
            }
        );
        
        if (!response.ok) throw new Error('Failed to update order');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Cancel order
async function cancelOrder(orderId) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/orders/${orderId}`,
            {
                method: 'DELETE',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Failed to cancel order');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to cancel order');
        return null;
    }
}
```

### 2.3 Payment Service APIs

```javascript
// Process payment
async function processPayment(paymentData) {
    /*
    Payment data format:
    {
        orderId: 'ORD-123456',
        amount: 299.99,
        currency: 'USD',
        paymentMethod: 'creditCard',
        cardDetails: {
            cardNumber: '4111111111111111',
            expiryDate: '12/25',
            cvv: '123',
            cardholderName: 'John Doe'
        },
        billingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA'
        }
    }
    */
    try {
        // Note: Don't send sensitive card data directly to backend
        // Use payment gateway tokens (Stripe, PayPal, etc.)
        
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/payments`,
            {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(paymentData)
            }
        );
        
        if (!response.ok) throw new Error('Payment failed');
        const result = await response.json();
        
        // Update order with payment ID
        if (result.data.paymentId) {
            localStorage.setItem('lastPaymentId', result.data.paymentId);
        }
        
        return result;
    } catch (error) {
        console.error('Error:', error);
        showAlert('Payment processing failed');
        return null;
    }
}

// Get payment status
async function fetchPaymentStatus(paymentId) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/payments/${paymentId}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Payment not found');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Get payment by order
async function fetchPaymentByOrder(orderId) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/payments/order/${orderId}`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Payment not found');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
```

### 2.4 Authentication APIs

```javascript
// Login
async function loginUser(email, password) {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/auth/login`,
            {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ email, password })
            }
        );
        
        if (!response.ok) throw new Error('Login failed');
        const result = await response.json();
        
        // Store token and user info
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('userId', result.data.userId);
        localStorage.setItem('userName', result.data.userName);
        
        showAlert('Login successful!');
        return result;
    } catch (error) {
        console.error('Error:', error);
        showAlert('Login failed. Check your credentials.');
        return null;
    }
}

// Signup
async function registerUser(userData) {
    /*
    User data format:
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'SecurePass123',
        phone: '+1234567890'
    }
    */
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/auth/register`,
            {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(userData)
            }
        );
        
        if (!response.ok) throw new Error('Registration failed');
        const result = await response.json();
        
        // Auto-login after registration
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('userId', result.data.userId);
        
        showAlert('Registration successful!');
        return result;
    } catch (error) {
        console.error('Error:', error);
        showAlert('Registration failed');
        return null;
    }
}

// Logout
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    showAlert('Logged out successfully');
    window.location.href = 'index.html';
}

// Get current user
async function fetchCurrentUser() {
    try {
        const response = await fetch(
            `${API_CONFIG.GATEWAY}/auth/me`,
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        
        if (!response.ok) throw new Error('Failed to fetch user');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
```

---

## Part 3: Frontend Integration in HTML Pages

### 3.1 Products Page Integration

```html
<!-- In products.html -->
<script>
// Replace the mock data with API call
async function loadProducts() {
    const filters = {
        page: currentPage,
        limit: itemsPerPage,
        category: selectedCategory,
        minPrice: minPrice,
        maxPrice: maxPrice
    };
    
    const result = await filterProducts(filters);
    filteredProducts = result.data || [];
    renderProducts();
}

// On component load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
</script>
```

### 3.2 Product Detail Page Integration

```html
<!-- In product.html -->
<script>
const productId = new URLSearchParams(window.location.search).get('id');

async function loadProductDetail() {
    const product = await fetchProductById(productId);
    
    if (product) {
        document.getElementById('productName').textContent = product.data.name;
        document.getElementById('productPrice').textContent = '$' + product.data.price;
        document.getElementById('productDescription').textContent = product.data.description;
        // ... more updates
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
});
</script>
```

### 3.3 Checkout Page Integration

```html
<!-- In checkout.html -->
<script>
document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Prepare order data
    const orderData = {
        userId: localStorage.getItem('userId'),
        items: JSON.parse(localStorage.getItem('cart')).map(item => ({
            productId: item.id,
            quantity: item.quantity
        })),
        shippingAddress: {
            street: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        },
        shippingMethod: document.querySelector('input[name="shipping"]:checked').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
    };
    
    // Create order
    const order = await createOrder(orderData);
    
    if (order) {
        // Proceed to payment
        await processPayment({
            orderId: order.data.orderId,
            amount: localStorage.getItem('total'),
            currency: 'USD',
            paymentMethod: 'creditCard'
        });
        
        // Clear cart and redirect
        localStorage.removeItem('cart');
        window.location.href = 'confirmation.html';
    }
});
</script>
```

---

## Part 4: Backend Implementation (Java/Spring Boot)

### 4.1 Enable CORS on All Services

```java
// Add to each Spring Boot service
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000", "http://localhost:5000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

### 4.2 Product Service Controller

```java
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "12") int limit
    ) {
        List<Product> products = productService.getProducts(category, minPrice, maxPrice, page, limit);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
    
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.status(201).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
        @PathVariable Long id,
        @RequestBody Product product
    ) {
        Product updated = productService.updateProduct(id, product);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
        @RequestParam String q,
        @RequestParam(required = false) String category
    ) {
        List<Product> results = productService.searchProducts(q, category);
        return ResponseEntity.ok(results);
    }
}
```

### 4.3 Order Service Controller

```java
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.status(201).body(order);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable String userId) {
        List<Order> orders = orderService.getUserOrders(userId);
        return ResponseEntity.ok(orders);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
        @PathVariable String id,
        @RequestBody StatusUpdateRequest request
    ) {
        Order order = orderService.updateOrderStatus(id, request.getStatus());
        return ResponseEntity.ok(order);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelOrder(@PathVariable String id) {
        orderService.cancelOrder(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 4.4 Payment Service Controller

```java
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequest request) {
        Payment payment = paymentService.processPayment(request);
        return ResponseEntity.status(201).body(payment);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable String id) {
        Payment payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrder(@PathVariable String orderId) {
        Payment payment = paymentService.getPaymentByOrder(orderId);
        return ResponseEntity.ok(payment);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Payment> updatePaymentStatus(
        @PathVariable String id,
        @RequestBody StatusUpdateRequest request
    ) {
        Payment payment = paymentService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(payment);
    }
}
```

---

## Part 5: Data Models (DTOs)

### 5.1 Product DTO

```java
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Double originalPrice;
    private String category;
    private List<String> images;
    private List<AttributeDTO> attributes;
    private Double rating;
    private Integer reviews;
    private Boolean inStock;
    private Integer stockQuantity;
    private String sku;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Getters and Setters
}
```

### 5.2 Order DTO

```java
public class OrderDTO {
    private String orderId;
    private String userId;
    private List<OrderItemDTO> items;
    private AddressDTO shippingAddress;
    private String shippingMethod;
    private String shippingCost;
    private String paymentMethod;
    private String paymentId;
    private Double subtotal;
    private Double tax;
    private Double total;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Getters and Setters
}
```

### 5.3 Payment DTO

```java
public class PaymentDTO {
    private String paymentId;
    private String orderId;
    private Double amount;
    private String currency;
    private String paymentMethod;
    private String status;
    private String transactionId;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    
    // Getters and Setters
}
```

---

## Part 6: Error Handling

### 6.1 Frontend Error Handler

```javascript
// Global error handler
async function handleApiError(error) {
    if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data.message;
        
        switch(status) {
            case 400:
                showAlert(`Validation Error: ${message}`);
                break;
            case 401:
                showAlert('Please login to continue');
                window.location.href = 'index.html#loginModal';
                break;
            case 403:
                showAlert('Access denied');
                break;
            case 404:
                showAlert('Resource not found');
                break;
            case 500:
                showAlert('Server error. Please try again later');
                break;
            default:
                showAlert(`Error: ${message}`);
        }
    } else if (error.request) {
        // Request made but no response
        showAlert('No response from server. Check your connection.');
    } else {
        // Error in request setup
        showAlert('Error: ' + error.message);
    }
}
```

### 6.2 Backend Global Exception Handler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse response = new ErrorResponse(
            "NOT_FOUND",
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(404).body(response);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse response = new ErrorResponse(
            "VALIDATION_ERROR",
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(400).body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        ErrorResponse response = new ErrorResponse(
            "INTERNAL_SERVER_ERROR",
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        return ResponseEntity.status(500).body(response);
    }
}
```

---

## Part 7: Running Everything

### 7.1 Startup Sequence

**Terminal 1: Product Service**
```bash
cd product-service
./gradlew bootRun
# Runs on http://localhost:8081
```

**Terminal 2: Order Service**
```bash
cd order-service
./gradlew bootRun
# Runs on http://localhost:8082
```

**Terminal 3: Payment Service**
```bash
cd payment-service
./gradlew bootRun
# Runs on http://localhost:8083
```

**Terminal 4: API Gateway** (Optional but recommended)
```bash
# If using Kong or Zuul gateway
# Runs on http://localhost:8080
```

**Terminal 5: Frontend**
```bash
cd ecommerce-frontend
python -m http.server 3000
# or: npm start
# Serves on http://localhost:3000
```

---

## Part 8: Testing API Endpoints

### 8.1 Using cURL

```bash
# Get all products
curl -X GET "http://localhost:8080/api/products" \
  -H "Accept: application/json"

# Create order
curl -X POST "http://localhost:8080/api/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": "user123",
    "items": [{"productId": 1, "quantity": 2}],
    "shippingAddress": {...}
  }'

# Process payment
curl -X POST "http://localhost:8080/api/payments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "orderId": "ORD-123",
    "amount": 299.99,
    "paymentMethod": "creditCard"
  }'
```

### 8.2 Using Postman

1. Create a new Postman collection
2. Add requests for each endpoint
3. Set up environment variables:
   - `{{baseUrl}}` = http://localhost:8080/api
   - `{{token}}` = JWT token from login
   - `{{orderId}}` = Order ID from create order response
4. Use Tests tab to validate responses

---

## Part 9: Database Schema

### 9.1 Products Table

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    stock_quantity INT,
    rating DECIMAL(3, 1),
    reviews_count INT,
    images JSON,
    attributes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 9.2 Orders Table

```sql
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    subtotal DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    total DECIMAL(10, 2),
    shipping_method VARCHAR(50),
    shipping_address JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(50) NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 9.3 Payments Table

```sql
CREATE TABLE payments (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50),
    transaction_id VARCHAR(100),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

---

## Next Steps

1. ✅ Create API configuration file
2. ✅ Implement API service functions
3. ✅ Update frontend pages to use APIs
4. ✅ Implement backend controllers and services
5. ✅ Set up database schema
6. ✅ Add authentication and authorization
7. ✅ Implement error handling
8. ✅ Test all endpoints
9. ✅ Deploy services
10. ✅ Monitor and optimize

**Your microservices architecture is ready for integration!**

