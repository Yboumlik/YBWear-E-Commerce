// Screen Navigation
function switchScreen(screenId) {
    // Remove hash if present
    const cleanScreenId = screenId.replace('#', '');
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    const targetScreen = document.getElementById(cleanScreenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Set appropriate nav link as active
    const activeLink = document.querySelector(`.nav-link[href="#${cleanScreenId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update URL hash
    window.location.hash = cleanScreenId;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    // Navigation link click events
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const screenId = this.getAttribute('href');
            switchScreen(screenId);
        });
    });
    
    // Handle URL hash changes (back/forward buttons)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash) {
            switchScreen(hash);
        }
    });
    
    // Check initial URL hash on load
    if (window.location.hash) {
        switchScreen(window.location.hash);
    }
    
    // Thumbnail click events
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.main-image');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.style.backgroundImage = this.style.backgroundImage;
        });
    });
    
    // Size selector
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color selector
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const qtyButtons = document.querySelectorAll('.qty-btn');
    const qtyValue = document.querySelector('.qty-value');
    
    qtyButtons.forEach(button => {
        button.addEventListener('click', function() {
            let currentValue = parseInt(qtyValue.textContent);
            if (this.textContent === '+') {
                qtyValue.textContent = currentValue + 1;
            } else if (this.textContent === '-' && currentValue > 1) {
                qtyValue.textContent = currentValue - 1;
            }
        });
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! ✨');
            this.reset();
        });
    });
    
    // Checkout form submission
    const checkoutForm = document.querySelector('.checkout-form form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Order placed successfully! 🎉');
            switchScreen('home');
        });
    }
});

// Shopping Cart
function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.toggle('active');
}

function addToCart() {
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    showNotification('Added to cart! 🛍️');
    toggleCart();
}

// Product Details
function showProductDetail(productId) {
    switchScreen('product-detail');
}

// Notification System
function showNotification(message) {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--black);
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: 0;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 1002;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image, .about-hero');
    
    parallaxElements.forEach(element => {
        const rate = scrolled * 0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Initialize the app
console.log('🛍️ YBWear loaded - Modern minimalist fashion');