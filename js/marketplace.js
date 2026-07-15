// Modern Tech Marketplace JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product data with corrected paths
    const products = [
        {
            id: 'dell-3070',
            name: 'DELL OptiPlex 3070',
            description: 'High-performance desktop computer with warranty',
            price: 239.99,
            originalPrice: 399.99,
            category: 'PCs Refurbished',
            image: '../assets/images/pcs refurbished/DELL 3070.png',
            rating: 4.8
        },
        {
            id: 'iphone-13',
            name: 'iPhone 13 128GB',
            description: 'Premium smartphone with excellent performance',
            price: 599.99,
            originalPrice: 899.99,
            category: 'Smartphones Refurbished',
            image: '../assets/images/smartphones refurbished/iPhone 13 128GB - Pink.png',
            rating: 4.9
        },
        {
            id: 'ipad-pro-11',
            name: 'iPad Pro 11"',
            description: 'Professional tablet with Apple M1 chip',
            price: 699.99,
            originalPrice: 999.99,
            category: 'Tablets',
            image: '../assets/images/tablet.png',
            rating: 4.8
        },
        {
            id: 'galaxy-s21',
            name: 'Galaxy S21 5G',
            description: 'Flagship Samsung smartphone with 5G capability',
            price: 399.99,
            originalPrice: 699.99,
            category: 'Smartphones Refurbished',
            image: '../assets/images/smartphones refurbished/Galaxy S21 5G 128GB - Gray.png',
            rating: 4.8
        },
        {
            id: 'lenovo-m920q',
            name: 'Lenovo M920q Mini PC',
            description: 'Compact desktop computer for business use',
            price: 189.99,
            originalPrice: 349.99,
            category: 'PCs Refurbished',
            image: '../assets/images/pcs refurbished/Lenovo M920q Mini PC.png',
            rating: 4.7
        },
        {
            id: 'galaxy-buds2',
            name: 'Galaxy Buds2 Pro',
            description: 'Wireless earbuds with active noise cancellation',
            price: 89.99,
            originalPrice: 199.99,
            category: 'Accessories Refurbished',
            image: '../assets/images/accessories refurbished/Galaxy Buds2 Pro.jpg',
            rating: 4.6
        }
    ];

    let currentProducts = [...products];
    let currentView = 'grid';

    // Initialize marketplace
    loadProducts();
    setupEventListeners();
    updateResultsCount();

    function loadProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = '';

        currentProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        col.setAttribute('data-category', product.category);

        col.innerHTML = `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    <div class="product-badge">Refurbished</div>
                </div>
                <div class="product-content">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">B/. ${product.price.toFixed(2)}</span>
                        <span class="original-price">B/. ${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>${product.rating}</span>
                    </div>
                    <div class="product-actions d-flex gap-2">
                        <a href="/pages/products/product-detail.html?id=${product.id}" class="btn btn-primary flex-grow-1">View Details</a>
                        <button class="btn btn-light" onclick="addToCart('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        return col;
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    function setupEventListeners() {
        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                filterProducts(category);
            });
        });

        // Sort select
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                sortProducts(this.value);
            });
        }

        // View buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                viewBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const view = this.getAttribute('data-view');
                changeView(view);
            });
        });

        // Search input
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                searchProducts(this.value);
            });
        }

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchProducts(searchInput.value);
                }
            });
        }

        // Load more button
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                loadMoreProducts();
            });
        }
    }

    function filterProducts(category) {
        if (category === 'all') {
            currentProducts = [...products];
        } else {
            currentProducts = products.filter(product => product.category === category);
        }
        
        loadProducts();
        updateResultsCount();
    }

    function searchProducts(query) {
        if (!query.trim()) {
            currentProducts = [...products];
        } else {
            const searchTerm = query.toLowerCase();
            currentProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        loadProducts();
        updateResultsCount();
    }

    function sortProducts(sortType) {
        switch (sortType) {
            case 'price-low':
                currentProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                currentProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                currentProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Keep original order for 'featured'
                break;
        }
        
        loadProducts();
    }

    function changeView(view) {
        currentView = view;
        const productsGrid = document.getElementById('productsGrid');
        
        if (view === 'list') {
            productsGrid.style.gridTemplateColumns = '1fr';
        } else {
            productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }

    function updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = currentProducts.length;
        }
    }

    function loadMoreProducts() {
        // Simulate loading more products
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Load More Products';
                loadMoreBtn.disabled = false;
                // Here you would typically load more products from an API
            }, 2000);
        }
    }

    // Add to cart functionality
    window.addToCart = function(productId) {
        const header = document.querySelector('recomputech-header') || document.querySelector('recomputech-header-auth');
        if (header && header.addToCart) {
            const productData = {
                'dell-3070': {
                    id: 'dell-3070',
                    name: 'DELL OptiPlex 3070',
                    price: 239.99,
                    image: '../assets/images/pcs refurbished/DELL 3070.png'
                },
                'iphone-13': {
                    id: 'iphone-13',
                    name: 'iPhone 13 128GB',
                    price: 599.99,
                    image: '../assets/images/smartphones refurbished/iPhone 13 128GB - Pink.png'
                },
                'ipad-pro-11': {
                    id: 'ipad-pro-11',
                    name: 'iPad Pro 11"',
                    price: 699.99,
                    image: '../assets/images/tablet.png'
                },
                'galaxy-s21': {
                    id: 'galaxy-s21',
                    name: 'Galaxy S21 5G',
                    price: 399.99,
                    image: '../assets/images/smartphones refurbished/Galaxy S21 5G 128GB - Gray.png'
                },
                'lenovo-m920q': {
                    id: 'lenovo-m920q',
                    name: 'Lenovo M920q Mini PC',
                    price: 189.99,
                    image: '../assets/images/pcs refurbished/Lenovo M920q Mini PC.png'
                },
                'galaxy-buds2': {
                    id: 'galaxy-buds2',
                    name: 'Galaxy Buds2 Pro',
                    price: 89.99,
                    image: '../assets/images/accessories refurbished/Galaxy Buds2 Pro.jpg'
                }
            };

            const product = productData[productId];
            if (product) {
                header.addToCart(product);
                
                // Show success message
                showNotification('Product added to cart!', 'success');
            }
        }
    };

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 