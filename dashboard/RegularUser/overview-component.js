class OverviewComponent extends HTMLElement {
    constructor() {
        super();
        this.userData = null;
    }

    connectedCallback() {
        this.loadUserData();
        this.render();
        this.setupEventListeners();
    }

    loadUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.userData = currentUser;
        }
    }

    render() {
        this.innerHTML = `
            <!-- Welcome Section -->
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <div class="welcome-text">
                        <h1>Welcome back, <span id="userName">${this.userData?.name || 'User'}</span>! 👋</h1>
                        <p>Here's what's happening with your account today</p>
                    </div>
                    <div class="welcome-actions">
                        <button class="btn btn-light" onclick="window.location.href='/pages/marketplace.html'">
                            <i class="fas fa-shopping-cart"></i>
                            Browse Products
                        </button>
                    </div>
                </div>
            </section>

            <!-- Stats Cards y Gráfica -->
            <section class="stats-section" data-aos="fade-up" data-aos-delay="100">
                <div class="stats-row d-flex flex-row flex-wrap justify-content-between align-items-stretch">
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-icon">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalPurchases">0</h3>
                            <p>Total Purchases</p>
                        </div>
                    </div>
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-icon">
                            <i class="fas fa-box"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="activeListings">0</h3>
                            <p>Active Listings</p>
                        </div>
                    </div>
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalReviews">0</h3>
                            <p>Reviews Given</p>
                        </div>
                    </div>
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalSpent">B/. 0.00</h3>
                            <p>Total Spent</p>
                        </div>
                    </div>
                </div>
                <div class="chart-container my-4" style="width:100%;max-width:600px;margin:auto;">
                    <canvas id="overviewChart"></canvas>
                </div>
            </section>

            <!-- Actividad Reciente -->
            <section class="activity-section" data-aos="fade-up" data-aos-delay="200">
                <div class="card activity-card">
                    <div class="card-header">
                        <h3><i class="fas fa-history"></i> Recent Activity</h3>
                    </div>
                    <div class="card-body">
                        <ul class="activity-list" id="activityList">
                            <li class="activity-item">You purchased "Gaming Laptop" on 2024-06-01</li>
                            <li class="activity-item">You added "Refurbished PC" for sale</li>
                            <li class="activity-item">You received a review for "Tablet"</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Quick Actions -->
            <section class="quick-actions-section" data-aos="fade-up" data-aos-delay="300">
                <div class="quick-actions-card">
                    <div class="card-header">
                        <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                    </div>
                    <div class="card-body">
                        <div class="quick-actions">
                            <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/sell.html'">
                                <i class="fas fa-plus-circle"></i>
                                <span>Sell a Product</span>
                            </button>
                            <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/cart.html'">
                                <i class="fas fa-shopping-cart"></i>
                                <span>View Cart</span>
                            </button>
                            <button class="quick-action-btn" onclick="window.location.href='/pages/marketplace.html'">
                                <i class="fas fa-search"></i>
                                <span>Browse Products</span>
                            </button>
                            <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/settings.html'">
                                <i class="fas fa-cog"></i>
                                <span>Account Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Platform Guide -->
            <section class="guide-section" data-aos="fade-up" data-aos-delay="400">
                <div class="guide-card">
                    <div class="card-header">
                        <h3><i class="fas fa-graduation-cap"></i> Platform Guide</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="guide-item">
                                    <div class="guide-icon">
                                        <i class="fas fa-shopping-cart"></i>
                                    </div>
                                    <div class="guide-content">
                                        <h5>How to Buy</h5>
                                        <p>Browse our marketplace, add items to cart, and complete your purchase securely.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="guide-item">
                                    <div class="guide-icon">
                                        <i class="fas fa-plus-circle"></i>
                                    </div>
                                    <div class="guide-content">
                                        <h5>How to Sell</h5>
                                        <p>List your refurbished products with detailed descriptions and competitive pricing.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="guide-item">
                                    <div class="guide-icon">
                                        <i class="fas fa-tools"></i>
                                    </div>
                                    <div class="guide-content">
                                        <h5>Find Technicians</h5>
                                        <p>Connect with certified technicians for repair and maintenance services.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="guide-item">
                                    <div class="guide-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="guide-content">
                                        <h5>Quality Assurance</h5>
                                        <p>All products are tested and certified for quality and performance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        setTimeout(() => {
            if (window.Chart) {
                const ctx = document.getElementById('overviewChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Purchases',
                            data: [3, 5, 2, 8, 4, 6],
                            backgroundColor: 'rgba(33, 141, 166, 0.7)'
                        }, {
                            label: 'Sales',
                            data: [2, 3, 4, 5, 6, 7],
                            backgroundColor: 'rgba(21, 90, 107, 0.7)'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { position: 'top' } }
                    }
                });
            }
        }, 500);
    }

    setupEventListeners() {
        // Add any specific event listeners for overview
    }

    updateStats(stats) {
        if (stats.purchases !== undefined) {
            this.querySelector('#totalPurchases').textContent = stats.purchases;
        }
        if (stats.listings !== undefined) {
            this.querySelector('#activeListings').textContent = stats.listings;
        }
        if (stats.reviews !== undefined) {
            this.querySelector('#totalReviews').textContent = stats.reviews;
        }
        if (stats.spent !== undefined) {
            this.querySelector('#totalSpent').textContent = `B/. ${stats.spent.toFixed(2)}`;
        }
    }

    addActivity(activity) {
        const activityList = this.querySelector('#activityList');
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${activity.icon || 'info-circle'}"></i>
            </div>
            <div class="activity-content">
                <h5>${activity.title}</h5>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.insertBefore(activityItem, activityList.firstChild);
    }
}

customElements.define('overview-component', OverviewComponent); 