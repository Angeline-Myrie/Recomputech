class MyPurchasesComponent extends HTMLElement {
    constructor() {
        super();
        this.purchases = [
            { id: 1, name: 'Gaming Laptop', date: '2024-06-01', status: 'completed', description: 'High-end gaming laptop', amount: 1200 },
            { id: 2, name: 'Tablet', date: '2024-05-15', status: 'pending', description: 'Android tablet', amount: 400 }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="dashboard-section">
                <div class="section-header">
                    <h2>My Purchases</h2>
                </div>
                <div class="purchase-list row">
                    ${this.purchases.map(purchase => `
                        <div class="col-md-6 mb-4">
                            <div class="purchase-card p-3 shadow-sm rounded">
                                <h5>${purchase.name}</h5>
                                <p>Date: ${purchase.date}</p>
                                <p>Status: <span class="badge bg-${purchase.status === 'completed' ? 'success' : 'warning'}">${purchase.status}</span></p>
                                <p>Description: ${purchase.description}</p>
                                <p>Amount: B/. ${purchase.amount}</p>
                                <button class="btn btn-outline-primary btn-sm" data-id="${purchase.id}">View Details</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.querySelectorAll('button[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                alert('Show details for purchase ID: ' + id);
            });
        });
    }
}
customElements.define('my-purchases-component', MyPurchasesComponent); 