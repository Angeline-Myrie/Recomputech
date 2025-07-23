class DashboardContentComponent extends HTMLElement {
    constructor() {
        super();
        this.currentSection = 'overview';
        this.userData = null;
    }

    connectedCallback() {
        this.loadUserData();
        this.setupNavigation();
        this.loadSection();
        this.setupEventListeners();
    }

    loadUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.userData = currentUser;
        }
    }

    setupNavigation() {
        // Get initial section from URL hash
        const hash = window.location.hash.substring(1);
        if (hash && this.isValidSection(hash)) {
            this.currentSection = hash;
        }

        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.substring(1);
            if (this.isValidSection(newHash)) {
                this.currentSection = newHash;
                this.loadSection();
            }
        });

        // Listen for dropdown navigation events
        document.addEventListener('dashboard-navigate', (e) => {
            const section = e.detail.section;
            if (this.isValidSection(section)) {
                this.currentSection = section;
                window.location.hash = section;
                this.loadSection();
            }
        });
    }

    isValidSection(section) {
        const validSections = ['overview', 'sell', 'purchases', 'my-products', 'cart', 'settings'];
        return validSections.includes(section);
    }

    loadSection() {
        console.log('Loading section:', this.currentSection);
        
        switch (this.currentSection) {
            case 'overview':
                this.loadOverview();
                break;
            case 'sell':
                this.loadSell();
                break;
            case 'purchases':
                this.loadPurchases();
                break;
            case 'my-products':
                this.loadMyProducts();
                break;
            case 'cart':
                this.loadCart();
                break;
            case 'settings':
                this.loadSettings();
                break;
            default:
                this.loadOverview();
        }
    }

    loadOverview() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Welcome Section -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Welcome back, <span id="userName">${this.userData?.name || 'User'}</span>! 👋</h1>
                        <p>Here's what's happening with your account today</p>
                    </div>
                </section>

                <div class="content-container">
                    <!-- Stats Cards -->
                    <div class="row" data-aos="fade-up" data-aos-delay="100">
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

                    <!-- Recent Activity -->
                    <div class="row" data-aos="fade-up" data-aos-delay="200">
                        <div class="col-lg-8 mb-4">
                            <div class="dashboard-card">
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
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                                </div>
                                <div class="card-body">
                                    <div class="quick-actions">
                                        <button class="quick-action-btn" data-section="sell">
                                            <i class="fas fa-plus-circle"></i>
                                            <span>Sell a Product</span>
                                        </button>
                                        <button class="quick-action-btn" data-section="cart">
                                            <i class="fas fa-shopping-cart"></i>
                                            <span>View Cart</span>
                                        </button>
                                        <button class="quick-action-btn" onclick="window.location.href='/pages/marketplace.html'">
                                            <i class="fas fa-search"></i>
                                            <span>Browse Products</span>
                                        </button>
                                        <button class="quick-action-btn" data-section="settings">
                                            <i class="fas fa-cog"></i>
                                            <span>Account Settings</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadSell() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Sell Your Products</h1>
                        <p>List your refurbished technology and reach thousands of buyers</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="row">
                        <div class="col-lg-8 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-plus-circle"></i> Product Information</h3>
                                </div>
                                <div class="card-body">
                                    <form id="sellForm">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="productName" class="form-label">Product Name</label>
                                                <input type="text" class="form-control" id="productName" required>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="productCategory" class="form-label">Category</label>
                                                <select class="form-select" id="productCategory" required>
                                                    <option value="">Select Category</option>
                                                    <option value="laptop">Laptops</option>
                                                    <option value="desktop">Desktop PCs</option>
                                                    <option value="smartphone">Smartphones</option>
                                                    <option value="tablet">Tablets</option>
                                                    <option value="accessories">Accessories</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="productPrice" class="form-label">Price (B/.)</label>
                                                <input type="number" class="form-control" id="productPrice" step="0.01" required>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="productCondition" class="form-label">Condition</label>
                                                <select class="form-select" id="productCondition" required>
                                                    <option value="">Select Condition</option>
                                                    <option value="excellent">Excellent</option>
                                                    <option value="good">Good</option>
                                                    <option value="fair">Fair</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="productDescription" class="form-label">Description</label>
                                            <textarea class="form-control" id="productDescription" rows="4" required></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="productImages" class="form-label">Product Images</label>
                                            <input type="file" class="form-control" id="productImages" multiple accept="image/*">
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="warranty">
                                            <label class="form-check-label" for="warranty">
                                                Include warranty
                                            </label>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <button type="submit" class="btn btn-primary">
                                                <i class="fas fa-upload"></i> List Product
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary" onclick="this.reset()">
                                                <i class="fas fa-undo"></i> Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-lightbulb"></i> Selling Tips</h3>
                                </div>
                                <div class="card-body">
                                    <div class="tip-item">
                                        <div class="tip-icon">
                                            <i class="fas fa-camera"></i>
                                        </div>
                                        <div class="tip-content">
                                            <h5>High-Quality Photos</h5>
                                            <p>Take clear, well-lit photos from multiple angles</p>
                                        </div>
                                    </div>
                                    <div class="tip-item">
                                        <div class="tip-icon">
                                            <i class="fas fa-file-alt"></i>
                                        </div>
                                        <div class="tip-content">
                                            <h5>Detailed Description</h5>
                                            <p>Include specifications, condition, and any issues</p>
                                        </div>
                                    </div>
                                    <div class="tip-item">
                                        <div class="tip-icon">
                                            <i class="fas fa-tag"></i>
                                        </div>
                                        <div class="tip-content">
                                            <h5>Competitive Pricing</h5>
                                            <p>Research similar products to set fair prices</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadPurchases() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>My Purchases</h1>
                        <p>Track your orders and purchase history</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3><i class="fas fa-shopping-bag"></i> Purchase History</h3>
                        </div>
                        <div class="card-body">
                            <div class="purchase-list" id="purchaseList">
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="fas fa-box"></i>
                                    </div>
                                    <div class="activity-content">
                                        <h5>No purchases yet</h5>
                                        <p>Start shopping to see your purchase history here</p>
                                        <span class="activity-time">Ready to shop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadMyProducts() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>My Products</h1>
                        <p>Manage your listed products and track their performance</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3><i class="fas fa-box"></i> Listed Products</h3>
                        </div>
                        <div class="card-body">
                            <div class="product-grid" id="myProductsGrid">
                                <div class="text-center py-5">
                                    <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                                    <h5 class="text-muted">No products listed yet</h5>
                                    <p class="text-muted">Start selling to see your products here</p>
                                    <button class="btn btn-primary" data-section="sell">
                                        <i class="fas fa-plus-circle"></i> List Your First Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadCart() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Shopping Cart</h1>
                        <p>Review and checkout your selected items</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3><i class="fas fa-shopping-cart"></i> Cart Items</h3>
                        </div>
                        <div class="card-body">
                            <div class="cart-list" id="cartList">
                                <div class="text-center py-5">
                                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                                    <h5 class="text-muted">Your cart is empty</h5>
                                    <p class="text-muted">Add some products to get started</p>
                                    <button class="btn btn-primary" onclick="window.location.href='/pages/marketplace.html'">
                                        <i class="fas fa-shopping-bag"></i> Browse Products
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadSettings() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Account Settings</h1>
                        <p>Manage your profile and preferences</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="row">
                        <div class="col-lg-8 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-user"></i> Profile Information</h3>
                                </div>
                                <div class="card-body">
                                    <form id="profileForm">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="firstName" class="form-label">First Name</label>
                                                <input type="text" class="form-control" id="firstName" value="${this.userData?.firstName || ''}" required>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="lastName" class="form-label">Last Name</label>
                                                <input type="text" class="form-control" id="lastName" value="${this.userData?.lastName || ''}" required>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" value="${this.userData?.email || ''}" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="phone" class="form-label">Phone</label>
                                            <input type="tel" class="form-control" id="phone" value="${this.userData?.phone || ''}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="address" class="form-label">Address</label>
                                            <textarea class="form-control" id="address" rows="3">${this.userData?.address || ''}</textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fas fa-save"></i> Save Changes
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-shield-alt"></i> Security</h3>
                                </div>
                                <div class="card-body">
                                    <button class="btn btn-outline-primary w-100 mb-3">
                                        <i class="fas fa-key"></i> Change Password
                                    </button>
                                    <button class="btn btn-outline-secondary w-100 mb-3">
                                        <i class="fas fa-bell"></i> Notification Settings
                                    </button>
                                    <button class="btn btn-outline-danger w-100">
                                        <i class="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Quick action buttons
        this.addEventListener('click', (e) => {
            if (e.target.closest('.quick-action-btn[data-section]')) {
                e.preventDefault();
                const section = e.target.closest('.quick-action-btn[data-section]').getAttribute('data-section');
                this.currentSection = section;
                window.location.hash = section;
                this.loadSection();
            }
        });

        // Form submissions
        this.addEventListener('submit', (e) => {
            if (e.target.id === 'sellForm') {
                e.preventDefault();
                this.handleSellForm(e.target);
            } else if (e.target.id === 'profileForm') {
                e.preventDefault();
                this.handleProfileForm(e.target);
            }
        });
    }

    handleSellForm(form) {
        // Handle sell form submission
        console.log('Sell form submitted');
        // Add form processing logic here
    }

    handleProfileForm(form) {
        // Handle profile form submission
        console.log('Profile form submitted');
        // Add form processing logic here
    }
}

customElements.define('dashboard-content-component', DashboardContentComponent); 