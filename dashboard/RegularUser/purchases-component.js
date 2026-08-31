class PurchasesComponent extends HTMLElement {
    constructor() {
        super();
        this.purchases = [];
    }

    connectedCallback() {
        this.loadPurchases();
    }

    async loadPurchases() {
        this.innerHTML = `
            <section class="dashboard-section" data-aos="fade-up">
                <div class="welcome-section">
                    <div class="welcome-header">
                        <div class="welcome-content">
                            <h1>My Purchases</h1>
                            <p>Loading your recent purchases...</p>
                        </div>
                    </div>
                </div>
            </section>
        `;

        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            const userId = currentUser?.userId || currentUser?.id;

            if (!window.supabaseClient || !userId) {
                this.renderEmptyState('Please sign in to view your purchase history.');
                return;
            }

            const { data, error } = await window.supabaseClient
                .from('orders')
                .select('*')
                .eq('buyer_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            this.purchases = data || [];
            this.render();
        } catch (error) {
            console.error('Error loading purchases:', error);
            this.renderEmptyState('No purchase history available right now.');
        }
    }

    renderEmptyState(message) {
        this.innerHTML = `
            <section class="dashboard-section" data-aos="fade-up">
                <div class="welcome-section">
                    <div class="welcome-header">
                        <div class="welcome-content">
                            <h1>My Purchases</h1>
                            <p>${message}</p>
                        </div>
                    </div>
                </div>

                <div class="content-container mt-4">
                    <div class="dashboard-card">
                        <div class="card-body text-center py-5">
                            <i class="fas fa-shopping-bag fa-3x mb-3" style="color: #218DA6;"></i>
                            <h4 class="mb-2">No purchases yet</h4>
                            <p class="text-muted mb-0">Your orders will appear here once you make a purchase.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    render() {
        this.innerHTML = `
            <section class="dashboard-section" data-aos="fade-up">
                <div class="welcome-section">
                    <div class="welcome-header">
                        <div class="welcome-content">
                            <h1>My Purchases</h1>
                            <p>Track all your orders and purchase history.</p>
                        </div>
                    </div>
                </div>

                <div class="content-container mt-4">
                    <div class="dashboard-card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h3><i class="fas fa-shopping-bag"></i> Purchase History</h3>
                            <span class="badge bg-primary rounded-pill">${this.purchases.length} item${this.purchases.length === 1 ? '' : 's'}</span>
                        </div>
                        <div class="card-body p-0">
                            ${this.purchases.length === 0 ? `
                                <div class="text-center py-5">
                                    <i class="fas fa-box-open fa-3x mb-3" style="color: #218DA6;"></i>
                                    <h4 class="mb-2">No purchases found</h4>
                                    <p class="text-muted mb-0">There are no completed purchases yet.</p>
                                </div>
                            ` : `
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0 align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Order</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${this.purchases.map((purchase) => `
                                                <tr>
                                                    <td>#${purchase.id || purchase.order_id || 'N/A'}</td>
                                                    <td>${purchase.product_name || purchase.name || 'Product'}</td>
                                                    <td>B/. ${Number(purchase.total_price ?? purchase.price ?? 0).toFixed(2)}</td>
                                                    <td>
                                                        <span class="badge rounded-pill ${this.getStatusClass(purchase.status || 'completed')}">
                                                            ${(purchase.status || 'completed').toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td>${this.formatDate(purchase.created_at || purchase.purchase_date)}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getStatusClass(status) {
        const s = (status || '').toLowerCase();
        if (s === 'paid' || s === 'completed' || s === 'delivered') return 'bg-success';
        if (s === 'pending' || s === 'processing') return 'bg-warning text-dark';
        if (s === 'cancelled' || s === 'failed') return 'bg-danger';
        return 'bg-secondary';
    }

    formatDate(value) {
        if (!value) return 'N/A';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

customElements.define('purchases-component', PurchasesComponent);
