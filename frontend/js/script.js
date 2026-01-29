// Get all the necessary DOM elements
let loginBtn = document.getElementById('loginBtn');
let signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const hamburger = document.getElementById('hamburger');
const shopBtn = document.getElementById('shopBtn');

// Authentication State
let currentUser = null;

// Helper function to attach login/signup listeners
function attachAuthListeners() {
    const newLoginBtn = document.getElementById('loginBtn');
    const newSignupBtn = document.getElementById('signupBtn');
    
    if (newLoginBtn) {
        newLoginBtn.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (newSignupBtn) {
        newSignupBtn.addEventListener('click', () => {
            if (signupModal) {
                signupModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }
}

// Login Modal Functions
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (loginModal) {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
}

if (closeLogin) {
    closeLogin.addEventListener('click', () => {
        if (loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Signup Modal Functions
if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        if (signupModal) {
            signupModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
}

if (closeSignup) {
    closeSignup.addEventListener('click', () => {
        if (signupModal) {
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Switch between Login and Signup
if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal && signupModal) {
            loginModal.style.display = 'none';
            signupModal.style.display = 'block';
        }
    });
}

if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal && signupModal) {
            signupModal.style.display = 'none';
            loginModal.style.display = 'block';
        }
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (loginModal && e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (signupModal && e.target === signupModal) {
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Clear any previous errors
        const errorContainer = loginForm.querySelector('.form-error');
        if (errorContainer) errorContainer.remove();
        
        // Basic validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Get registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user exists and password matches
        const user = registeredUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            showAlert('Invalid email or password. Please check and try again.', 'error');
            return;
        }
        
        // Login successful - store current user session
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Store user preference for remember me
        if (rememberMe) {
            localStorage.setItem('rememberEmail', email);
        } else {
            localStorage.removeItem('rememberEmail');
        }
        
        // Success message
        showAlert(`Welcome back, ${user.name}!`, 'success');
        
        // Reset form and close modal
        loginForm.reset();
        setTimeout(() => {
            if (loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            updateAuthUI();
        }, 1500);
    });
}

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Check password length
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    // Check if terms are agreed
    if (!agreeTerms) {
        showAlert('You must agree to the Terms and Conditions', 'error');
        return;
    }
    
    // Get existing users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (registeredUsers.some(u => u.email === email)) {
        showAlert('This email is already registered. Please log in instead.', 'error');
        return;
    }
    
    // Add new user to localStorage
    const newUser = { name, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(registeredUsers));
    
    // Success message
    showAlert('Account created successfully! Please log in now.', 'success');
    
    // Reset form and switch to login modal
    signupForm.reset();
    setTimeout(() => {
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 1500);
});

// Shop Button
shopBtn.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// Add to Cart Button
const addToCartButtons = document.querySelectorAll('.btn-add-cart');
addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-info h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        showAlert(`${productName} added to cart!`, 'success');
        
        // You would typically add the item to a cart array/object here
        addToCart({
            name: productName,
            price: productPrice
        });
    });
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        const formData = {};
        
        inputs.forEach(input => {
            formData[input.placeholder] = input.value;
        });
        
        // Validate
        if (!formData['Your Name'] || !formData['Your Email'] || !formData['Your Message']) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        console.log('Contact Form Data:', formData);
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    const navbarMenu = document.querySelector('.navbar-menu');
    navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarMenu = document.querySelector('.navbar-menu');
        navbarMenu.style.display = 'none';
    });
});

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#28a745';
        alertDiv.style.color = 'white';
    } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#dc3545';
        alertDiv.style.color = 'white';
    }
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

function addToCart(product) {
    // Get or initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    // Add product to cart
    cart.push({
        ...product,
        id: Date.now(),
        quantity: 1
    });
    
    // Save to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    
    // You could emit an event here to update cart count in header
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartCount = cart.length;
    
    // You can display cart count somewhere in the header if needed
    console.log('Cart count:', cartCount);
}

// Update UI based on authentication state
function updateAuthUI() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Update navbar-auth (index.html style)
    const authContainer = document.querySelector('.navbar-auth');
    if (authContainer) {
        if (user) {
            // User is logged in
            authContainer.innerHTML = `
                <span class="user-greeting" style="color: var(--primary-color); font-weight: 500; margin-right: 1rem;">👋 Welcome, ${user.name}!</span>
                <button class="btn-login logout-btn" id="logoutBtn" style="background-color: var(--danger-color); color: white; border-color: var(--danger-color);">Logout</button>
            `;
            document.getElementById('logoutBtn').addEventListener('click', logout);
        } else {
            // User is not logged in
            authContainer.innerHTML = `
                <button class="btn-login" id="loginBtn">Login</button>
                <button class="btn-signup" id="signupBtn">Sign Up</button>
            `;
            attachAuthListeners();
        }
    }
    
    // Update nav-auth-container (products.html style)
    const navAuthContainer = document.querySelector('.nav-auth-container');
    if (navAuthContainer) {
        if (user) {
            // User is logged in - show user name and logout
            navAuthContainer.innerHTML = `
                <span class="user-greeting-icon" style="color: var(--primary-color); font-weight: 600; margin-right: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-user-circle"></i>
                    ${user.name}
                </span>
                <button class="nav-icon logout-btn" id="logoutBtn" title="Logout" style="color: var(--danger-color);">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            `;
            document.getElementById('logoutBtn').addEventListener('click', logout);
        } else {
            // User is not logged in
            navAuthContainer.innerHTML = `
                <button class="nav-icon" id="loginBtn" title="Login">
                    <i class="fas fa-user"></i>
                </button>
            `;
            const newLoginBtn = document.getElementById('loginBtn');
            if (newLoginBtn) {
                newLoginBtn.addEventListener('click', () => {
                    if (loginModal) {
                        loginModal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        }
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAlert('You have been logged out', 'success');
    updateAuthUI();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load current user session if exists
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
    
    // Load remembered email if it exists
    const rememberedEmail = localStorage.getItem('rememberEmail');
    const loginEmailInput = document.getElementById('loginEmail');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    if (rememberedEmail && loginEmailInput) {
        loginEmailInput.value = rememberedEmail;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }
    
    // Update UI based on auth state
    updateAuthUI();
    
    // Initialize cart count
    updateCartCount();
});

// Add CSS animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);
