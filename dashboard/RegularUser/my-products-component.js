class MyProductsComponent extends HTMLElement {
    constructor() {
        super();
        this.products = [
            { id: 1, name: 'Gaming Laptop', status: 'active', category: 'Laptops', price: 1200, date: '2024-06-01' },
            { id: 2, name: 'Refurbished PC', status: 'pending', category: 'Desktops', price: 800, date: '2024-05-20' },
            { id: 3, name: 'Tablet', status: 'active', category: 'Tablets', price: 400, date: '2024-04-15' }
        ];
        this.filteredProducts = [...this.products];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="dashboard-section">
                <div class="section-header">
                    <h2>My Products</h2>
                    <div class="filters mb-3 d-flex flex-wrap gap-2">
                        <input type="text" id="searchInput" class="form-control" placeholder="Search products..." style="max-width:200px;">
                        <select id="statusFilter" class="form-select" style="max-width:150px;">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                        </select>
                        <select id="categoryFilter" class="form-select" style="max-width:150px;">
                            <option value="">All Categories</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Desktops">Desktops</option>
                            <option value="Tablets">Tablets</option>
                        </select>
                    </div>
                </div>
                <div class="product-list row">
                    ${this.filteredProducts.map(product => `
                        <div class="col-md-4 mb-4">
                            <div class="product-card p-3 shadow-sm rounded">
                                <h5>${product.name}</h5>
                                <p>Status: <span class="badge bg-${product.status === 'active' ? 'success' : 'warning'}">${product.status}</span></p>
                                <p>Category: ${product.category}</p>
                                <p>Price: B/. ${product.price}</p>
                                <p>Date: ${product.date}</p>
                                <button class="btn btn-outline-primary btn-sm" data-id="${product.id}">View Details</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
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
        this.querySelectorAll('button[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                alert('Show details for product ID: ' + id);
            });
        });
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