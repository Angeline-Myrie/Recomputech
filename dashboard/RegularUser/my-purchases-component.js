class MyPurchasesComponent extends HTMLElement {
    constructor() {
        super();
        this.purchases = [];
    }

    connectedCallback() {
        this.loadPurchases();
    }

    async loadPurchases() {
        this.renderLoading();

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

    renderLoading() {
        this.innerHTML = `
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                        <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                        <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                        <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                    </div>

                    <div class="welcome-content">
                        <h1 data-aos="fade-down" data-aos-delay="100">My Purchases</h1>
                        <p data-aos="fade-in" data-aos-delay="300">Loading your recent purchases...</p>
                    </div>
                </div>
            </section>
        `;
    }

    renderEmptyState(message) {
        this.innerHTML = `
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                        <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                        <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                        <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                    </div>

                    <div class="welcome-content">
                        <h1 data-aos="fade-down" data-aos-delay="100">My Purchases</h1>
                        <p data-aos="fade-in" data-aos-delay="300">${message}</p>
                    </div>
                </div>
            </section>

            <div class="content-container mt-4">
                <div class="dashboard-card">
                    <div class="card-body text-center py-5">
                        <i class="fas fa-shopping-bag fa-3x mb-3" style="color: #218DA6;"></i>
                        <h4 class="mb-2">No purchases yet</h4>
                        <p class="text-muted mb-0">Your orders will appear here once you make a purchase.</p>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.innerHTML = `
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                        <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                        <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                        <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                    </div>

                    <div class="welcome-content">
                        <h1 data-aos="fade-down" data-aos-delay="100">My Purchases</h1>
                        <p data-aos="fade-in" data-aos-delay="300">Track all your orders and purchase history.</p>
                    </div>
                </div>
            </section>

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

customElements.define('my-purchases-component', MyPurchasesComponent);
