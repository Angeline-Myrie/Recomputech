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

            <!-- Stats Cards -->
            <section class="stats-section" data-aos="fade-up" data-aos-delay="100">
                <div class="row">
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="totalPurchases">0</h3>
                                <p>Total Purchases</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="activeListings">0</h3>
                                <p>Active Listings</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="totalReviews">0</h3>
                                <p>Reviews Given</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="totalSpent">B/. 0.00</h3>
                                <p>Total Spent</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Recent Activity -->
            <section class="activity-section" data-aos="fade-up" data-aos-delay="200">
                <div class="row">
                    <div class="col-lg-8 mb-4">
                        <div class="activity-card">
                            <div class="card-header">
                                <h3><i class="fas fa-history"></i> Recent Activity</h3>
                            </div>
                            <div class="card-body">
                                <div class="activity-list" id="activityList">
                                    <div class="activity-item">
                                        <div class="activity-icon">
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                        <div class="activity-content">
                                            <h5>Welcome to Recomputech!</h5>
                                            <p>Start exploring our marketplace for great deals on refurbished technology.</p>
                                            <span class="activity-time">Just now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
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
                    </div>
                </div>
            </section>

            <!-- Platform Guide -->
            <section class="guide-section" data-aos="fade-up" data-aos-delay="300">
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