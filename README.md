# ShopHub - Ecommerce Landing Page

A modern, responsive ecommerce landing page built with HTML, CSS, and JavaScript. This is the foundation for a full-featured ecommerce platform.

## 📋 Project Overview

**Website Name:** ShopHub

ShopHub is a premium online shopping destination offering quality products at great prices. This landing page serves as the entry point to the ecommerce platform with key features for user engagement and conversion.

## ✨ Features

### Current Features (Frontend)
- **Modern Navigation Bar** - Sticky navigation with logo, menu links, and authentication buttons
- **Hero Section** - Eye-catching landing banner with call-to-action button
- **Featured Products** - Grid layout showcasing 4 sample products with:
  - Product images
  - Badges (New, Sale, Hot)
  - Star ratings
  - Price display
  - Add to Cart button
- **About Section** - Highlights key features:
  - Fast Shipping
  - Secure Payment
  - Easy Returns
  - 24/7 Support
- **Contact Section** - Contact form for customer inquiries
- **Footer** - Links, social media, and company info
- **Authentication Modals** - Login and Sign Up forms with validation
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Shopping Cart** - LocalStorage integration for cart management
- **Form Validation** - Email validation, password matching, and field checks

## 🏗️ Project Structure

```
ecommerce/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Git (optional)

### Installation

1. **Clone or Download the project:**
   ```bash
   cd c:\Users\AjeetSisodiya\Desktop\learningProjects\ecommerce
   ```

2. **Open in browser:**
   - Simply double-click `index.html` in the file explorer, OR
   - Open VS Code and use Live Server extension (recommended)

### Using Live Server in VS Code

1. Install the "Live Server" extension from VS Code extensions
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Page will open in browser at `http://localhost:5500`

## 📝 File Descriptions

### index.html
- Contains the complete HTML structure
- Navigation with login/signup buttons
- Hero section with call-to-action
- Product grid layout
- Modal dialogs for authentication
- Contact form
- Footer with social links

### style.css
- Modern, professional design system
- CSS variables for easy customization
- Flexbox and Grid layouts
- Responsive breakpoints for mobile, tablet, desktop
- Smooth animations and transitions
- Hover effects for interactive elements
- Dark theme footer and gradient sections

### script.js
- Modal management (open/close)
- Form validation and submission
- Email format validation
- Password strength checking
- LocalStorage integration for cart management
- Alert notifications system
- Smooth scrolling
- Mobile hamburger menu toggle
- Add to cart functionality

## 🎨 Design Features

### Color Scheme
- Primary: #007bff (Blue)
- Secondary: #6c757d (Gray)
- Success: #28a745 (Green)
- Danger: #dc3545 (Red)
- Warning: #ffc107 (Yellow)
- Dark: #212529
- Light: #f8f9fa

### Typography
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana
- Responsive font sizes
- Clear visual hierarchy

### Responsive Design
- Mobile: Up to 480px
- Tablet: 481px to 768px
- Desktop: 769px and above

## 🔐 Authentication Features

### Login Form
- Email input with validation
- Password input
- Remember me checkbox
- Form validation
- Redirect to signup option

### Sign Up Form
- Full name input
- Email input with validation
- Password input
- Confirm password matching
- Terms and conditions checkbox
- Form validation

**Note:** Currently uses browser alerts and localStorage. Backend integration coming soon.

## 🛒 Shopping Cart

The shopping cart uses browser's LocalStorage to store items:
- Add to cart functionality on product cards
- Items persist between sessions
- Cart items are stored as JSON
- Ready for backend integration

## 📱 Responsive Features

- Hamburger menu for mobile navigation
- Touch-friendly button sizes
- Flexible grid layouts
- Mobile-optimized modals
- Readable font sizes across devices

## 🔄 Planned Features for Backend Integration

- [ ] User authentication with secure login
- [ ] Product database and dynamic loading
- [ ] Shopping cart with checkout process
- [ ] Payment gateway integration
- [ ] Order management system
- [ ] User account dashboard
- [ ] Admin panel for product management
- [ ] Search and filter functionality
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Inventory management

## 🛠️ Technologies Used

### Frontend (Current)
- HTML5
- CSS3 (with Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

### Future Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB or PostgreSQL
- Authentication: JWT
- API: RESTful or GraphQL

## 📄 License

This project is open source and available for learning and development purposes.

## 👤 Author

Ajeet Sisodiya

## 📞 Contact

For questions or suggestions regarding ShopHub, please use the contact form on the website.

## 🎯 Next Steps

1. **Phase 1 (Current):** Frontend landing page with authentication UI ✅
2. **Phase 2:** Backend setup with Node.js/Express
3. **Phase 3:** Database integration (MongoDB/PostgreSQL)
4. **Phase 4:** User authentication and authorization
5. **Phase 5:** Product catalog and inventory management
6. **Phase 6:** Shopping cart and checkout system
7. **Phase 7:** Payment gateway integration
8. **Phase 8:** Order tracking and management
9. **Phase 9:** Additional features (reviews, wishlist, etc.)
10. **Phase 10:** Deployment and optimization

---

**Status:** 🟢 Frontend Complete - Ready for Backend Integration
