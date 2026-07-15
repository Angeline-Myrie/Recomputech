 class MyProductsComponent extends HTMLElement {
    constructor() {
        super();
        this.products = [
            { 
                id: 1, 
                name: 'Gaming Laptop HP Victus', 
                status: 'active', 
                category: 'Laptops', 
                price: 1200, 
                date: '2024-06-01',
                image: '../../assets/images/laptops refurbished/HP Victus 15.jpg',
                description: 'High-performance gaming laptop with RTX graphics'
            },
            { 
                id: 2, 
                name: 'Refurbished Dell PC', 
                status: 'pending', 
                category: 'Desktops', 
                price: 800, 
                date: '2024-05-20',
                image: '../../assets/images/pcs refurbished/DELL 3070.png',
                description: 'Professional desktop computer for work and gaming'
            },
            { 
                id: 3, 
                name: 'iPad 11 Pro Max', 
                status: 'active', 
                category: 'Tablets', 
                price: 400, 
                date: '2024-04-15',
                image: '../../assets/images/iPad 11 pro max.jpg',
                description: 'Premium tablet with advanced features'
            },
            { 
                id: 4, 
                name: 'Samsung Galaxy Book4 Pro', 
                status: 'active', 
                category: 'Laptops', 
                price: 950, 
                date: '2024-06-10',
                image: '../../assets/images/laptops refurbished/Galaxy Book4 Pro.jpg',
                description: 'Ultra-portable laptop with long battery life'
            },
            { 
                id: 5, 
                name: 'Lenovo Mini PC', 
                status: 'pending', 
                category: 'Desktops', 
                price: 650, 
                date: '2024-05-25',
                image: '../../assets/images/pcs refurbished/Lenovo M920q Mini PC.png',
                description: 'Compact desktop perfect for small spaces'
            },
            { 
                id: 6, 
                name: 'Galaxy Buds Pro', 
                status: 'active', 
                category: 'Accessories', 
                price: 180, 
                date: '2024-06-05',
                image: '../../assets/images/accessories refurbished/Galaxy Buds2 Pro.jpg',
                description: 'Wireless earbuds with noise cancellation'
            }
        ];
        this.filteredProducts = [...this.products];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <!-- Welcome Section -->
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <!-- Animated background elements -->
                    <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                        <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                        <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                        <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                    </div>
                    
                    <!-- Main content -->
                    <div class="welcome-content">
                        <h1 data-aos="fade-down" data-aos-delay="100">
                            My Products
                        </h1>
                        <p data-aos="fade-in" data-aos-delay="300">
                            Manage and track all your products on <span style="font-weight: 600; color: #fff;">Recomputech</span>
                        </p>
                        
                        <!-- Stats preview -->
                        <div class="welcome-stats-preview" data-aos="fade-up" data-aos-delay="500">
                            <div class="stat-preview">
                                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem;">${this.products.length}</div>
                                <div style="font-size: 0.8rem; opacity: 0.8;">Total Products</div>
                            </div>
                            <div class="stat-preview">
                                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem;">${this.products.filter(p => p.status === 'active').length}</div>
                                <div style="font-size: 0.8rem; opacity: 0.8;">Active</div>
                            </div>
                            <div class="stat-preview">
                                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem;">${this.products.filter(p => p.status === 'pending').length}</div>
                                <div style="font-size: 0.8rem; opacity: 0.8;">Pending</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Filters Section -->
            <section class="filters-section" data-aos="fade-up" data-aos-delay="200">
                <div class="filters-card">
                    <div class="filters-header" style="margin-bottom: 1.5rem;">
                        <h3 style="color: #2c3e50; font-weight: 600; margin-bottom: 0.5rem;">
                            <i class="fas fa-filter" style="color: #218DA6; margin-right: 0.5rem;"></i>
                            Filter & Search
                        </h3>
                        <p style="color: #6c757d; margin: 0; font-size: 0.95rem;">Find your products quickly and efficiently</p>
                    </div>
                    
                    <div class="filters-content" style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
                        <div class="search-container" style="flex: 1; min-width: 250px;">
                            <input type="text" id="searchInput" class="form-control" placeholder="Search products..." 
                                   style="border-radius: 12px; border: 2px solid #e9ecef; padding: 0.8rem 1rem; transition: all 0.3s ease; background: #f8f9fa;">
                        </div>
                        <div class="filter-group" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <select id="statusFilter" class="form-select" 
                                    style="border-radius: 12px; border: 2px solid #e9ecef; padding: 0.8rem 1rem; min-width: 150px; transition: all 0.3s ease; background: #f8f9fa;">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                        </select>
                            <select id="categoryFilter" class="form-select" 
                                    style="border-radius: 12px; border: 2px solid #e9ecef; padding: 0.8rem 1rem; min-width: 150px; transition: all 0.3s ease; background: #f8f9fa;">
                            <option value="">All Categories</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Desktops">Desktops</option>
                            <option value="Tablets">Tablets</option>
                                <option value="Accessories">Accessories</option>
                        </select>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Products Grid -->
            <section class="products-section" data-aos="fade-up" data-aos-delay="300">
                <div class="centered-container">
                    <div class="products-header" style="margin-bottom: 2rem;">
                        <h3 style="color: #2c3e50; font-weight: 600; margin-bottom: 0.5rem;">
                            <i class="fas fa-box" style="color: #218DA6; margin-right: 0.5rem;"></i>
                            Your Products (${this.filteredProducts.length})
                        </h3>
                        <p style="color: #6c757d; margin: 0; font-size: 0.95rem;">Manage and monitor your product listings</p>
                    </div>
                    
                    <div class="products-grid">
                    ${this.filteredProducts.map(product => `
                        <div class="product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 300 + 100}" 
                             style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transition: all 0.3s ease; border: 1px solid #e9ecef; position: relative;">
                            
                            <!-- Product Image -->
                            <div class="product-image-container" style="position: relative; height: 200px; overflow: hidden; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
                                <img src="${product.image}" alt="${product.name}" 
                                     style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                                <div class="image-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(33, 141, 166, 0.1) 0%, rgba(27, 110, 130, 0.1) 100%); opacity: 0; transition: opacity 0.3s ease;"></div>
                                
                                <!-- Status Badge on Image -->
                                <div class="status-badge-image" style="position: absolute; top: 1rem; right: 1rem; z-index: 3;">
                                    <span class="status-badge" style="padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; background: ${product.status === 'active' ? 'rgba(40, 167, 69, 0.9)' : 'rgba(255, 193, 7, 0.9)'}; color: ${product.status === 'active' ? '#fff' : '#000'}; border: 1px solid ${product.status === 'active' ? '#28a745' : '#ffc107'}; backdrop-filter: blur(10px);">
                                        ${product.status}
                                    </span>
                                </div>
                                
                                <!-- Price Badge on Image -->
                                <div class="price-badge-image" style="position: absolute; bottom: 1rem; left: 1rem; z-index: 3;">
                                    <span style="padding: 0.5rem 1rem; border-radius: 15px; font-size: 1.1rem; font-weight: 700; background: rgba(33, 141, 166, 0.9); color: white; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
                                        B/. ${product.price}
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Product Header -->
                            <div class="product-header" style="background: linear-gradient(135deg, #218DA6 0%, #1b6e82 100%); color: white; padding: 1.5rem; position: relative; overflow: hidden;">
                                <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 10%; right: 10%; animation: float 6s ease-in-out infinite;"></div>
                                <h5 style="margin: 0; font-size: 1.3rem; font-weight: 600; position: relative; z-index: 2;">${product.name}</h5>
                                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9; position: relative; z-index: 2;">${product.description}</p>
                            </div>
                            
                            <!-- Product Body -->
                            <div class="product-body" style="padding: 1.5rem;">
                                <div class="product-info" style="margin-bottom: 1.5rem;">
                                    <div class="info-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; padding: 0.5rem 0; border-bottom: 1px solid #f8f9fa;">
                                        <span style="color: #6c757d; font-weight: 500;">
                                            <i class="fas fa-tag" style="margin-right: 0.5rem; color: #218DA6;"></i>Category:
                                        </span>
                                        <span style="color: #2c3e50; font-weight: 600;">${product.category}</span>
                                    </div>
                                    <div class="info-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; padding: 0.5rem 0; border-bottom: 1px solid #f8f9fa;">
                                        <span style="color: #6c757d; font-weight: 500;">
                                            <i class="fas fa-calendar" style="margin-right: 0.5rem; color: #218DA6;"></i>Listed:
                                        </span>
                                        <span style="color: #2c3e50; font-weight: 600;">${product.date}</span>
                                    </div>
                                    <div class="info-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0;">
                                        <span style="color: #6c757d; font-weight: 500;">
                                            <i class="fas fa-hashtag" style="margin-right: 0.5rem; color: #218DA6;"></i>Product ID:
                                        </span>
                                        <span style="color: #218DA6; font-weight: 600;">#${product.id}</span>
                                    </div>
                                </div>
                                
                                <div class="product-actions" style="display: flex; gap: 0.8rem;">
                                    <button class="btn btn-primary" data-id="${product.id}" 
                                            style="flex: 1; background: linear-gradient(135deg, #218DA6 0%, #1b6e82 100%); border: none; padding: 0.8rem; border-radius: 12px; color: white; font-weight: 600; transition: all 0.3s ease;">
                                        <i class="fas fa-eye" style="margin-right: 0.5rem;"></i>
                                        View Details
                                    </button>
                                    <button class="btn btn-outline-secondary" data-id="${product.id}" 
                                            style="flex: 1; border: 2px solid #6c757d; background: transparent; padding: 0.8rem; border-radius: 12px; color: #6c757d; font-weight: 600; transition: all 0.3s ease;">
                                        <i class="fas fa-edit" style="margin-right: 0.5rem;"></i>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    </div>
                    
                    ${this.filteredProducts.length === 0 ? `
                        <div class="empty-state" data-aos="fade-up" style="text-align: center; padding: 4rem 2rem; background: white; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                            <div class="empty-icon" style="width: 80px; height: 80px; background: linear-gradient(135deg, #218DA6 0%, #1b6e82 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: white; font-size: 2rem;">
                                <i class="fas fa-box-open"></i>
                            </div>
                            <h4 style="color: #2c3e50; font-weight: 600; margin-bottom: 0.5rem;">No Products Found</h4>
                            <p style="color: #6c757d; margin: 0 0 1.5rem 0;">Try adjusting your filters or add a new product</p>
                            <button class="btn btn-primary" style="background: linear-gradient(135deg, #218DA6 0%, #1b6e82 100%); border: none; padding: 1rem 2rem; border-radius: 12px; color: white; font-weight: 600;">
                                <i class="fas fa-plus" style="margin-right: 0.5rem;"></i>
                                Add New Product
                            </button>
                        </div>
                    ` : ''}
                </div>
            </section>
        `;
    }

    setupEventListeners() {
        this.querySelector('#searchInput').addEventListener('input', (e) => {
            this.filterProducts();
        });
        this.querySelector('#statusFilter').addEventListener('change', (e) => {
            this.filterProducts();
        });
        this.querySelector('#categoryFilter').addEventListener('change', (e) => {
            this.filterProducts();
        });
        
        // Event listeners para botones View Details
        this.querySelectorAll('.btn-primary[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = btn.getAttribute('data-id');
                this.viewProductDetails(productId);
            });
        });
        
        // Event listeners para botones Edit
        this.querySelectorAll('.btn-outline-secondary[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = btn.getAttribute('data-id');
                this.editProduct(productId);
            });
        });
    }

    viewProductDetails(productId) {
        // Encontrar el producto por ID
        const product = this.products.find(p => p.id == productId);
        if (product) {
            // Guardar el producto en localStorage para la página de detalles
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            localStorage.setItem('isOwnerView', 'true'); // Indicar que es vista del propietario
            
            // Redirigir a la página de detalles del producto
            window.location.href = 'my-product-details.html';
        }
    }

    editProduct(productId) {
        // Encontrar el producto por ID
        const product = this.products.find(p => p.id == productId);
        if (product) {
            // Guardar el producto en localStorage para la página de edición
            localStorage.setItem('editingProduct', JSON.stringify(product));
            
            // Redirigir a la página de edición del producto
            window.location.href = 'edit-product.html';
        }
    }

    filterProducts() {
        const search = this.querySelector('#searchInput').value.toLowerCase();
        const status = this.querySelector('#statusFilter').value;
        const category = this.querySelector('#categoryFilter').value;
        this.filteredProducts = this.products.filter(p => {
            return (
                (!search || p.name.toLowerCase().includes(search)) &&
                (!status || p.status === status) &&
                (!category || p.category === category)
            );
        });
        this.render();
        this.setupEventListeners();
    }
}
customElements.define('my-products-component', MyProductsComponent); 