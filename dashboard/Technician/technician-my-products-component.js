class TechnicianMyProductsComponent extends HTMLElement {
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
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const userId = currentUser?.userId || currentUser?.id;

        if (!window.supabaseClient || !userId) {
            this.products = [];
            this.filteredProducts = [];
            return;
        }

        try {
            const { data, error } = await window.supabaseClient
                .from('products')
                .select('*')
                .eq('seller_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.products = (data || []).map((product) => ({
                id: product.id,
                name: product.name || 'Unnamed product',
                description: product.description || 'No description available.',
                price: Number(product.price || 0).toFixed(2),
                category: product.category || 'Other',
                image: product.image_url || '../../assets/images/laptop.avif',
                status: product.status || 'available',
                date: product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'
            }));
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Technician products could not be loaded:', error);
            this.products = [];
            this.filteredProducts = [];
        }
    }

    render() {
        this.innerHTML = `
            <section class="technician-welcome technician-page-banner">
                <div class="technician-welcome-header">
                    <div class="technician-welcome-content">
                        <h1>My Products</h1>
                        <p>Manage the products you have listed in the Technician dashboard.</p>
                        <div class="technician-welcome-stats">
                            <div class="technician-stat-preview"><strong>${this.products.length}</strong><span>Total Products</span></div>
                            <div class="technician-stat-preview"><strong>${this.products.filter((product) => product.status === 'active' || product.status === 'available').length}</strong><span>Available</span></div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="technician-dashboard-panel mt-4">
                <div class="technician-panel-header">
                    <div><h2><i class="fas fa-box"></i> Product Listings</h2><p>Search and review your current listings.</p></div>
                    <a class="btn btn-primary" href="#add-product"><i class="fas fa-plus"></i> Add Product</a>
                </div>
                <div class="row g-3 mb-4">
                    <div class="col-md-8"><input id="technicianProductsSearch" class="form-control" type="search" placeholder="Search products..."></div>
                    <div class="col-md-4"><select id="technicianProductsStatus" class="form-select"><option value="">All statuses</option><option value="available">Available</option><option value="active">Active</option><option value="pending">Pending</option></select></div>
                </div>
                <div class="row g-4">
                    ${this.filteredProducts.length ? this.filteredProducts.map((product) => `
                        <div class="col-md-6 col-xl-4">
                            <article class="technician-product-card">
                                <img src="${product.image}" alt="${product.name}">
                                <div class="p-3">
                                    <div class="d-flex justify-content-between gap-2"><h3>${product.name}</h3><span class="badge bg-info">${product.status}</span></div>
                                    <p>${product.description}</p>
                                    <div class="d-flex justify-content-between"><strong>B/. ${product.price}</strong><span>${product.category}</span></div>
                                    <small>Listed: ${product.date}</small>
                                </div>
                            </article>
                        </div>
                    `).join('') : `
                        <div class="col-12"><div class="technician-empty-state"><i class="fas fa-box-open"></i><h3>No products found</h3><p>Your Technician listings will appear here.</p><a class="btn btn-primary" href="#add-product">Add your first product</a></div></div>
                    `}
                </div>
            </section>
        `;
    }

    setupEventListeners() {
        this.querySelector('#technicianProductsSearch')?.addEventListener('input', () => this.filterProducts());
        this.querySelector('#technicianProductsStatus')?.addEventListener('change', () => this.filterProducts());
    }

    filterProducts() {
        const search = (this.querySelector('#technicianProductsSearch')?.value || '').toLowerCase();
        const status = this.querySelector('#technicianProductsStatus')?.value || '';
        this.filteredProducts = this.products.filter((product) => {
            const matchesSearch = !search || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search);
            const matchesStatus = !status || product.status === status;
            return matchesSearch && matchesStatus;
        });
        this.render();
        this.setupEventListeners();
    }
}

customElements.define('technician-my-products', TechnicianMyProductsComponent);
