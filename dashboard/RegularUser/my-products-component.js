 class MyProductsComponent extends HTMLElement {
    constructor() {
    super();
    this.products = [];
    this.filteredProducts = [];
   }

    async connectedCallback() {
    await this.loadProducts();
    this.render();
    this.setupEventListeners();
   }

  async loadProducts() {
    try {
        if (!window.supabaseClient) {
            console.error('Supabase client is not available.');
            return;
        }

        const currentUser = JSON.parse(
            localStorage.getItem('currentUser')
        );

        // Aceptar userId o id
        const userId = currentUser?.userId || currentUser?.id;

        console.log('Current user:', currentUser);
        console.log('User ID being used:', userId);

        if (!currentUser || !userId) {
            console.error('No logged-in user found.');
            return;
        }

        const { data, error } = await window.supabaseClient
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

console.log('ALL PRODUCTS FROM SUPABASE:', data);
console.log('CURRENT USER ID:', userId);
console.log(
    'SELLER IDs:',
    data?.map(product => product.seller_id)
);

        if (error) {
            throw error;
        }

        console.log('Products loaded:', data);

        this.products = (data || []).map(product => ({
            id: product.id,
            name: product.name,
            description: product.description || 'No description available.',
            specifications: product.specifications || {},
            price: product.price,
            category: product.category,
            image: product.image_url || '../../assets/images/laptop.avif',
            status: product.status,
            date: product.created_at
                ? new Date(product.created_at).toLocaleDateString()
                : ''
        }));

        this.filteredProducts = [...this.products];

    } catch (error) {
        console.error('Error loading products:', error);
        this.products = [];
        this.filteredProducts = [];
    }
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
                    
                    <div class="products-grid my-products-grid">
                    ${this.filteredProducts.map(product => `
                        <article class="product-card my-product-card" data-aos="fade-up" data-aos-delay="${Math.random() * 300 + 100}">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}" onerror="this.src='../../assets/images/laptop.avif';">
                                <span class="product-badge">${product.status || 'Available'}</span>
                            </div>
                            <div class="product-info">
                                <div class="product-category">${product.category || 'Technology'}</div>
                                <h3 class="product-title">${product.name}</h3>
                                <p class="product-description">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
                                <div class="product-price-container">
                                    <span class="product-price">B/. ${Number(product.price || 0).toFixed(2)}</span>
                                </div>
                                <div class="my-product-details">
                                    <span><i class="fas fa-calendar"></i> Listed ${product.date}</span>
                                    <span><i class="fas fa-hashtag"></i> #${product.id}</span>
                                </div>
                                <div class="product-actions">
                                    <button class="btn-view-details" data-id="${product.id}">
                                        <i class="fas fa-eye"></i> View Details
                                    </button>
                                    <button class="btn-edit-product" data-id="${product.id}" aria-label="Edit ${product.name}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>
                        </article>
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
        this.querySelectorAll('.btn-view-details[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = btn.getAttribute('data-id');
                this.viewProductDetails(productId);
            });
        });
        
        // Event listeners para botones Edit
        this.querySelectorAll('.btn-edit-product[data-id]').forEach(btn => {
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