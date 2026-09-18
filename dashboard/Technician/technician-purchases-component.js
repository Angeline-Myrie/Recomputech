class TechnicianPurchasesComponent extends HTMLElement {
    constructor() {
        super();
        this.purchases = [];
    }

    connectedCallback() {
        this.loadPurchases();
    }

    async loadPurchases() {
        this.renderLoading();
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const userId = currentUser?.userId || currentUser?.id;

        if (!window.supabaseClient || !userId) {
            this.renderEmpty('Please sign in to view your purchase history.');
            return;
        }

        try {
            const { data, error } = await window.supabaseClient
                .from('orders')
                .select('*')
                .eq('buyer_id', userId)
                .order('created_at', { ascending: false });
            if (error) throw error;
            this.purchases = data || [];
            this.render();
        } catch (error) {
            console.error('Technician purchase history could not be loaded:', error);
            this.renderEmpty('No purchase history is available right now.');
        }
    }

    renderLoading() {
        this.innerHTML = `<section class="technician-welcome technician-page-banner"><div class="technician-welcome-header"><div class="technician-welcome-content"><h1>Purchases</h1><p>Loading your purchase history...</p></div></div></section>`;
    }

    renderEmpty(message) {
        this.innerHTML = `<section class="technician-welcome technician-page-banner"><div class="technician-welcome-header"><div class="technician-welcome-content"><h1>Purchases</h1><p>${message}</p></div></div></section><section class="technician-dashboard-panel mt-4"><div class="technician-empty-state"><i class="fas fa-shopping-bag"></i><h3>No purchases yet</h3><p>Your orders will appear here after checkout.</p></div></section>`;
    }

    render() {
        this.innerHTML = `
            <section class="technician-welcome technician-page-banner"><div class="technician-welcome-header"><div class="technician-welcome-content"><h1>Purchases</h1><p>Track your orders and purchase history from this Technician account.</p></div></div></section>
            <section class="technician-dashboard-panel mt-4">
                <div class="technician-panel-header"><div><h2><i class="fas fa-shopping-bag"></i> Purchase History</h2><p>${this.purchases.length} order${this.purchases.length === 1 ? '' : 's'} found.</p></div></div>
                ${this.purchases.length ? `<div class="table-responsive"><table class="table align-middle mb-0"><thead><tr><th>Order</th><th>Product</th><th>Price</th><th>Status</th><th>Date</th></tr></thead><tbody>${this.purchases.map((purchase) => `<tr><td>#${purchase.id || purchase.order_id || 'N/A'}</td><td>${purchase.product_name || purchase.name || 'Product'}</td><td>B/. ${Number(purchase.total_price ?? purchase.price ?? 0).toFixed(2)}</td><td><span class="badge ${this.statusClass(purchase.status)}">${(purchase.status || 'completed').toUpperCase()}</span></td><td>${this.formatDate(purchase.created_at || purchase.purchase_date)}</td></tr>`).join('')}</tbody></table></div>` : `<div class="technician-empty-state"><i class="fas fa-box-open"></i><h3>No purchases found</h3><p>Completed orders will appear in this table.</p></div>`}
            </section>
        `;
    }

    statusClass(status) {
        const value = (status || '').toLowerCase();
        if (['paid', 'completed', 'delivered'].includes(value)) return 'bg-success';
        if (['pending', 'processing'].includes(value)) return 'bg-warning text-dark';
        if (['cancelled', 'failed'].includes(value)) return 'bg-danger';
        return 'bg-secondary';
    }

    formatDate(value) {
        if (!value) return 'N/A';
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}

customElements.define('technician-purchases', TechnicianPurchasesComponent);
