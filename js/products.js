// products.js - Enhanced filtering and search for products.html

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('productSearch');
    const sortFilter = document.getElementById('sortFilter');
    const priceFilter = document.getElementById('priceFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const productCards = document.querySelectorAll('.product-card');
    const productsContainer = document.getElementById('products-list');
    
    // Create no products message element
    let noProductsMessage = document.getElementById('no-products-message');
    if (!noProductsMessage) {
        noProductsMessage = document.createElement('div');
        noProductsMessage.id = 'no-products-message';
        noProductsMessage.className = 'col-12 text-center py-5';
        noProductsMessage.innerHTML = `
            <div class="no-products-content">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted mb-2">No Products Found</h4>
                <p class="text-muted">Try adjusting your search criteria or filters to find what you're looking for.</p>
                <button class="btn btn-outline-primary mt-3" onclick="resetFilters()">
                    <i class="fas fa-refresh me-2"></i>Reset Filters
                </button>
            </div>
        `;
    }
    
    // Product data mapping
    const products = Array.from(productCards).map(card => {
        const priceText = card.querySelector('.price')?.textContent || '0';
        const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const title = card.querySelector('h5')?.textContent?.toLowerCase() || '';
        const category = getCategoryFromTitle(title);
        const ratingText = card.querySelector('.product-rating span')?.textContent || '(0)';
        const rating = parseFloat(ratingText.replace(/[^0-9.]/g, '')) || 0;
        
        return {
            element: card,
            title: title,
            price: price,
            category: category,
            condition: 'excellent', // Default condition
            rating: rating
        };
    });
    
    function getCategoryFromTitle(title) {
        if (title.includes('laptop')) return 'laptops';
        if (title.includes('pc') || title.includes('desktop') || title.includes('dell') || title.includes('hp') || title.includes('lenovo') || title.includes('mac')) return 'desktops';
        if (title.includes('phone') || title.includes('mobile') || title.includes('galaxy') || title.includes('pixel') || title.includes('iphone')) return 'phones';
        if (title.includes('tablet')) return 'tablets';
        if (title.includes('headphone') || title.includes('audífono') || title.includes('accessory')) return 'accessories';
        return 'all';
    }
    
    // Filter products function
    function filterProducts() {
        const searchTerm = searchInput?.value?.toLowerCase() || '';
        const selectedCategory = document.querySelector('.category-btn.active')?.dataset?.category || 'all';
        const selectedSort = sortFilter?.value || 'recent';
        const selectedPrice = priceFilter?.value || 'all';
        const selectedCondition = conditionFilter?.value || 'all';
        
        let visibleCount = 0;
        
        products.forEach(product => {
            let show = true;
            
            // Search filter
            if (searchTerm && !product.title.includes(searchTerm)) {
                show = false;
            }
            
            // Category filter
            if (selectedCategory !== 'all' && product.category !== selectedCategory) {
                show = false;
            }
            
            // Price filter
            if (selectedPrice !== 'all') {
                const [min, max] = selectedPrice.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
                if (product.price < min || (max !== Infinity && product.price > max)) {
                    show = false;
                }
            }
            
            // Show/hide product
            const parentCol = product.element.closest('.col-md-6, .col-lg-4');
            if (show) {
                parentCol.style.display = 'block';
                parentCol.style.animation = 'fadeIn 0.5s ease';
                visibleCount++;
            } else {
                parentCol.style.display = 'none';
            }
        });
        
        // Show/hide no products message
        if (visibleCount === 0) {
            if (!document.getElementById('no-products-message')) {
                productsContainer.appendChild(noProductsMessage);
            }
        } else {
            const existingMessage = document.getElementById('no-products-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        }
        
        // Sort products
        sortProducts(selectedSort);
        
        // Update results count
        updateResultsCount(visibleCount);
    }
    
    // Sort products function
    function sortProducts(sortType) {
        const visibleProducts = Array.from(products).filter(product => {
            const parentCol = product.element.closest('.col-md-6, .col-lg-4');
            return parentCol.style.display !== 'none';
        });
        
        // Sort based on criteria
        switch(sortType) {
            case 'price-low':
                visibleProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                visibleProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                visibleProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                visibleProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default: // recent
                // Keep original order
                break;
        }
        
        // Reorder DOM elements
        visibleProducts.forEach(product => {
            const parentCol = product.element.closest('.col-md-6, .col-lg-4');
            productsContainer.appendChild(parentCol);
        });
    }
    
    // Update results count
    function updateResultsCount(visibleCount) {
        console.log(`Showing ${visibleCount} products`);
        
        // You can add a results counter element if needed
        let resultsCounter = document.getElementById('results-counter');
        if (!resultsCounter) {
            resultsCounter = document.createElement('div');
            resultsCounter.id = 'results-counter';
            resultsCounter.className = 'results-counter';
            document.querySelector('.search-filter-container').appendChild(resultsCounter);
        }
        
        resultsCounter.textContent = `${visibleCount} product${visibleCount !== 1 ? 's' : ''} found`;
    }
    
    // Reset filters function
    window.resetFilters = function() {
        // Reset search
        if (searchInput) searchInput.value = '';
        
        // Reset category
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        const allBtn = document.querySelector('.category-btn[data-category="all"]');
        if (allBtn) allBtn.classList.add('active');
        
        // Reset other filters
        if (sortFilter) sortFilter.value = 'recent';
        if (priceFilter) priceFilter.value = 'all';
        if (conditionFilter) conditionFilter.value = 'all';
        
        // Re-filter
        filterProducts();
    };
    
    // Event listeners
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Filter products
                filterProducts();
            });
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (conditionFilter) {
        conditionFilter.addEventListener('change', filterProducts);
    }
    
    // Search button click
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterProducts);
    }
    
    // Initialize
    filterProducts();
    
    // --- MODAL DE DETALLE DE PRODUCTO (existing code) ---
    const productSpecsData = {
        // Smartphones
        'Galaxy S21 5G 128GB - Gray': {
            specs: [
                'Screen: 6.2" Dynamic AMOLED 2X, 120Hz',
                'Processor: Exynos 2100 / Snapdragon 888',
                'RAM: 8GB',
                'Storage: 128GB',
                'Camera: Triple 12+12+64MP',
                'Battery: 4000mAh',
                '5G, IP68, Android 13'
            ],
            vendor: 'Recomputech'
        },
        'Galaxy S23 FE 128GB - Gray': {
            specs: [
                'Screen: 6.4" Dynamic AMOLED 2X, 120Hz',
                'Processor: Exynos 2200 / Snapdragon 8 Gen 1',
                'RAM: 8GB',
                'Storage: 128GB',
                'Camera: Triple 12+12+8MP',
                'Battery: 4500mAh',
                '5G, IP68, Android 14'
            ],
            vendor: 'Recomputech'
        },
        'Galaxy S23 Ultra 256GB - Black': {
            specs: [
                'Screen: 6.8" Dynamic AMOLED 2X, 120Hz',
                'Processor: Snapdragon 8 Gen 2',
                'RAM: 12GB',
                'Storage: 256GB',
                'Camera: Quad 200+12+10+10MP',
                'Battery: 5000mAh',
                'S Pen, 5G, IP68, Android 14'
            ],
            vendor: 'Recomputech'
        },
        'Galaxy Z Flip6 256GB - Green': {
            specs: [
                'Screen: 6.7" Dynamic AMOLED 2X, 120Hz (foldable)',
                'Processor: Snapdragon 8 Gen 3',
                'RAM: 12GB',
                'Storage: 256GB',
                'Camera: Dual 50+12MP',
                'Battery: 4000mAh',
                'Foldable, 5G, IPX8, Android 14'
            ],
            vendor: 'Recomputech'
        },
        'Google Pixel 6a 128GB - Green': {
            specs: [
                'Screen: 6.1" OLED, 60Hz',
                'Processor: Google Tensor',
                'RAM: 6GB',
                'Storage: 128GB',
                'Camera: Dual 12.2+12MP',
                'Battery: 4410mAh',
                '5G, IP67, Android 13'
            ],
            vendor: 'Recomputech'
        },
        'Google Pixel 7 128GB - Black': {
            specs: [
                'Screen: 6.3" OLED, 90Hz',
                'Processor: Google Tensor G2',
                'RAM: 8GB',
                'Storage: 128GB',
                'Camera: Dual 50+12MP',
                'Battery: 4355mAh',
                '5G, IP68, Android 13'
            ],
            vendor: 'Recomputech'
        },
        'Google Pixel 8 128GB - Rose Gold': {
            specs: [
                'Screen: 6.2" OLED, 120Hz',
                'Processor: Google Tensor G3',
                'RAM: 8GB',
                'Storage: 128GB',
                'Camera: Dual 50+12MP',
                'Battery: 4575mAh',
                '5G, IP68, Android 14'
            ],
            vendor: 'Recomputech'
        },
        'Google Pixel 9 Pro XL 512GB - Black': {
            specs: [
                'Screen: 6.7" OLED, 120Hz',
                'Processor: Google Tensor G4',
                'RAM: 16GB',
                'Storage: 512GB',
                'Camera: Triple 50+48+48MP',
                'Battery: 5000mAh',
                '5G, IP68, Android 15'
            ],
            vendor: 'Recomputech'
        },
        'iPhone 13 128GB - Pink': {
            specs: [
                'Screen: 6.1" Super Retina XDR OLED',
                'Processor: Apple A15 Bionic',
                'RAM: 4GB',
                'Storage: 128GB',
                'Camera: Dual 12+12MP',
                'Battery: 3240mAh',
                '5G, IP68, iOS 17'
            ],
            vendor: 'Recomputech'
        },
        'iPhone 13 mini 256GB – Blue': {
            specs: [
                'Screen: 5.4" Super Retina XDR OLED',
                'Processor: Apple A15 Bionic',
                'RAM: 4GB',
                'Storage: 256GB',
                'Camera: Dual 12+12MP',
                'Battery: 2406mAh',
                '5G, IP68, iOS 17'
            ],
            vendor: 'Recomputech'
        },
        'iPhone 14 128GB - Midnight': {
            specs: [
                'Screen: 6.1" Super Retina XDR OLED',
                'Processor: Apple A15 Bionic',
                'RAM: 6GB',
                'Storage: 128GB',
                'Camera: Dual 12+12MP',
                'Battery: 3279mAh',
                '5G, IP68, iOS 17'
            ],
            vendor: 'Recomputech'
        },
        'iPhone SE (2022) 64GB – Midnight': {
            specs: [
                'Screen: 4.7" Retina HD LCD',
                'Processor: Apple A15 Bionic',
                'RAM: 3GB',
                'Storage: 64GB',
                'Camera: Single 12MP',
                'Battery: 2018mAh',
                '5G, IP67, iOS 17'
            ],
            vendor: 'Recomputech'
        }
    };

    function openProductModal(productCard) {
        const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
        const productName = productCard.querySelector('h5').textContent;
        const productImg = productCard.querySelector('img').src;
        const productDesc = productCard.querySelector('.product-description').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productOldPrice = productCard.querySelector('.original-price')?.textContent || '';
        const productRating = productCard.querySelector('.product-rating').innerHTML;

        // Set modal content
        document.getElementById('productDetailModalLabel').textContent = productName;
        document.getElementById('modalProductImg').src = productImg;
        document.getElementById('modalProductDesc').textContent = productDesc;
        document.getElementById('modalProductPrice').textContent = productPrice;
        document.getElementById('modalProductOldPrice').textContent = productOldPrice;
        document.getElementById('modalProductRating').innerHTML = productRating;

        // Set specifications
        const specsList = document.getElementById('modalProductSpecs');
        specsList.innerHTML = '';
        
        if (productSpecsData[productName]) {
            document.getElementById('modalProductVendor').innerHTML = `<i class="fas fa-store me-2"></i>${productSpecsData[productName].vendor}`;
            productSpecsData[productName].specs.forEach(spec => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex align-items-center';
                li.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>${spec}`;
                specsList.appendChild(li);
            });
        } else {
            document.getElementById('modalProductVendor').innerHTML = '<i class="fas fa-store me-2"></i>Recomputech';
            const defaultSpecs = [
                'Refurbished with warranty',
                'Quality tested',
                'Professional cleaning',
                'Original parts',
                '30-day return policy'
            ];
            defaultSpecs.forEach(spec => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex align-items-center';
                li.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>${spec}`;
                specsList.appendChild(li);
            });
        }

        modal.show();
    }

    // Add click event to all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            openProductModal(this);
        });
    });
}); 