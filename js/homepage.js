// Homepage JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Filter products
            filterProducts(category);
        });
    });
    
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            
            if (category === 'all' || productCategory === category) {
                product.style.display = 'block';
                product.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                product.style.display = 'none';
            }
        });
        
        // Update results counter if exists
        updateResultsCounter(category);
    }
    
    function updateResultsCounter(category) {
        const visibleProducts = document.querySelectorAll('.product-card[style*="display: block"]').length;
        const resultsCounter = document.querySelector('.results-counter');
        
        if (resultsCounter) {
            if (category === 'all') {
                resultsCounter.textContent = `${visibleProducts} products found`;
            } else {
                resultsCounter.textContent = `${visibleProducts} ${category} found`;
            }
        }
    }
    
    // Initialize with "All" category active
    if (categoryButtons.length > 0) {
        filterProducts('all');
    }
    
    // Add smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Add hover effects for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add keyboard navigation for accessibility
    categoryButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Cart functionality
    window.addToCart = function(productId) {
        // Get the header component
        const header = document.querySelector('recomputech-header');
        
        if (header && header.addToCart) {
            // Find the product data based on productId
            const productData = getProductData(productId);
            if (productData) {
                header.addToCart(productData);
            }
        } else {
            console.warn('Header component not found or addToCart method not available');
        }
    };
    
    function getProductData(productId) {
        // Product data mapping for homepage products
        const products = {
            'dell-3070': {
                id: 'dell-3070',
                name: 'DELL OptiPlex 3070',
                price: 239.99,
                images: ['assets/images/pcs refurbished/DELL 3070.png']
            },
            'iphone-13': {
                id: 'iphone-13',
                name: 'iPhone 13 128GB',
                price: 599.99,
                images: ['assets/images/smartphones refurbished/iPhone 13 128GB.1.png']
            },
            'ipad-pro-11': {
                id: 'ipad-pro-11',
                name: 'iPad Pro 11"',
                price: 699.99,
                images: ['assets/images/Tablet 11 Pro.png']
            },
            'galaxy-s21': {
                id: 'galaxy-s21',
                name: 'Galaxy S21 5G',
                price: 399.99,
                images: ['assets/images/smartphones refurbished/Galaxy S21 5G 128GB - Gray.png']
            }
        };
        
        return products[productId];
    }
    
    // Add focus styles for better accessibility
    const focusableElements = document.querySelectorAll('button, a');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Export functions for potential external use
window.homepageFilters = {
    filterByCategory: function(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (category === 'all' || productCategory === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}; 