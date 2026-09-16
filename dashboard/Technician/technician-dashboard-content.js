class TechnicianDashboardContent extends HTMLElement {
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

        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const links = document.querySelectorAll('.dashboard-sidebar .nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href') || '';
            const section = href.startsWith('#') ? href.substring(1) : '';
            link.classList.toggle('active', section === this.currentSection);
        });
    }

    isValidSection(section) {
        const validSections = ['overview', 'marketplace', 'technicians', 'my-products', 'add-product', 'purchases', 'settings', 'contact', 'credentials', 'requests', 'stats', 'notifications'];
        return validSections.includes(section);
    }

    loadSection() {
        this.cleanupExternalPageUI();
        console.log('Loading section:', this.currentSection);
        
        switch (this.currentSection) {
            case 'overview':
                this.loadOverview();
                break;
            case 'marketplace':
                this.loadMarketplace();
                break;
            case 'technicians':
                this.loadTechnicians();
                break;
            case 'my-products':
                this.loadMyProducts();
                break;
            case 'add-product':
                this.loadAddProduct();
                break;
            case 'purchases':
                this.loadPurchases();
                break;
            case 'settings':
                this.loadSettings();
                break;
            case 'contact':
                this.loadContact();
                break;
            case 'credentials':
                this.loadCredentials();
                break;
            case 'requests':
                this.loadRequests();
                break;
            case 'stats':
                this.loadStats();
                break;
            case 'notifications':
                this.loadNotifications();
                break;
            default:
                this.loadOverview();
        }

        this.updateActiveNavLink();
    }

    loadExternalPage(url) {
        this.externalPageUrl = url;
        if (!url) {
            this.loadSection();
            return;
        }

        if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }

        const dashboardFooter = document.querySelector('recomputech-footer');
        if (dashboardFooter) dashboardFooter.style.display = 'none';
        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'hidden';

        this.innerHTML = `
            <iframe id="external-page-frame" src="${url}" title="Marketplace" style="width:100%;border:none;display:block;"></iframe>
        `;

        const adjustIframeHeight = () => {
            const header = document.querySelector('recomputech-header-auth-technician');
            const headerHeight = header ? header.getBoundingClientRect().height : 0;
            const iframe = this.querySelector('#external-page-frame');
            if (iframe) {
                iframe.style.height = Math.max(0, window.innerHeight - headerHeight) + 'px';
            }
        };

        const iframe = this.querySelector('#external-page-frame');
        iframe.addEventListener('load', () => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const embeddedHeader = iframeDoc.querySelector('#headerContainer');
                if (embeddedHeader) embeddedHeader.style.display = 'none';
            } catch (error) {
                // The embedded page may be cross-origin in deployed environments.
            }
        });

        adjustIframeHeight();
        window.addEventListener('resize', adjustIframeHeight, { passive: true });
        this._adjustIframeHeightHandler = adjustIframeHeight;
    }

    cleanupExternalPageUI() {
        const dashboardFooter = document.querySelector('recomputech-footer');
        if (dashboardFooter) dashboardFooter.style.display = '';
        document.documentElement.style.overflowY = '';
        document.body.style.overflowY = '';
        if (this._adjustIframeHeightHandler) {
            window.removeEventListener('resize', this._adjustIframeHeightHandler);
            this._adjustIframeHeightHandler = null;
        }
    }

    loadMarketplace() {
        this.loadExternalPage('../../pages/marketplace.html');
    }

    loadTechnicians() {
        this.loadExternalPage('../../pages/technician/info-technician.html');
    }

    loadMyProducts() {
        this.innerHTML = '<technician-my-products></technician-my-products>';
    }

    loadPurchases() {
        this.innerHTML = '<technician-purchases></technician-purchases>';
    }

    loadAddProduct() {
        this.innerHTML = `
            <div class="dashboard-section technician-page-section" data-aos="fade-up">
                <section class="technician-welcome technician-page-banner">
                    <div class="technician-welcome-header">
                        <div class="technician-welcome-content">
                            <h1>Add Product</h1>
                            <p>List a refurbished product from your Technician account.</p>
                        </div>
                    </div>
                </section>
                <section class="technician-dashboard-panel mt-4">
                    <div class="technician-panel-header"><div><h2><i class="fas fa-plus-circle"></i> Product Information</h2><p>Complete the details below to publish your listing.</p></div></div>
                    <form id="technicianSellForm">
                        <div class="row g-3">
                            <div class="col-md-6"><label for="technicianProductName" class="form-label">Product name</label><input id="technicianProductName" class="form-control" required></div>
                            <div class="col-md-6"><label for="technicianProductCategory" class="form-label">Category</label><select id="technicianProductCategory" class="form-select" required><option value="">Choose a category</option><option>Laptops</option><option>Desktops</option><option>Tablets</option><option>Accessories</option><option>Smartphones</option></select></div>
                            <div class="col-md-6"><label for="technicianProductPrice" class="form-label">Price (B/.)</label><input id="technicianProductPrice" class="form-control" type="number" min="0" step="0.01" required></div>
                            <div class="col-12"><label for="technicianProductDescription" class="form-label">Description</label><textarea id="technicianProductDescription" class="form-control" rows="5" required></textarea></div>
                        </div>
                        <div class="mt-4"><button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Publish Product</button></div>
                    </form>
                </section>
            </div>
        `;
    }

    loadSettings() {
        this.innerHTML = `
            <div class="dashboard-section technician-page-section" data-aos="fade-up">
                <section class="technician-settings-hero" data-aos="fade-up">
                    <div class="technician-settings-hero-header">
                        <div class="technician-settings-hero-circle technician-settings-hero-circle-large"></div>
                        <div class="technician-settings-hero-circle technician-settings-hero-circle-medium"></div>
                        <div class="technician-settings-hero-circle technician-settings-hero-circle-small"></div>
                        <div class="technician-settings-hero-content">
                            <h1>Account Settings</h1>
                            <p>Manage your profile and preferences.</p>
                        </div>
                    </div>
                </section>
                <div class="technician-settings-grid mt-4">
                    <section class="dashboard-card technician-settings-card">
                        <div class="card-header"><h3><i class="fas fa-user"></i> Profile Information</h3></div>
                        <div class="card-body">
                            <form id="technicianProfileForm">
                                <div class="row g-3">
                                    <div class="col-md-6"><label for="technicianFirstName" class="form-label">First Name</label><input id="technicianFirstName" class="form-control" value="${this.userData?.firstName || ''}" required></div>
                                    <div class="col-md-6"><label for="technicianLastName" class="form-label">Last Name</label><input id="technicianLastName" class="form-control" value="${this.userData?.lastName || ''}" required></div>
                                    <div class="col-12"><label for="technicianEmail" class="form-label">Email</label><input id="technicianEmail" class="form-control" type="email" value="${this.userData?.email || ''}" required></div>
                                    <div class="col-md-6"><label for="technicianPhone" class="form-label">Phone</label><input id="technicianPhone" class="form-control" type="tel" value="${this.userData?.phone || ''}"></div>
                                    <div class="col-md-6"><label for="technicianAddress" class="form-label">Address</label><input id="technicianAddress" class="form-control" value="${this.userData?.address || ''}"></div>
                                </div>
                                <div class="mt-4"><button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Save Changes</button></div>
                            </form>
                        </div>
                    </section>
                    <section class="dashboard-card technician-settings-card technician-security-card">
                        <div class="card-header"><h3><i class="fas fa-shield-alt"></i> Security</h3></div>
                        <div class="card-body">
                            <div class="technician-settings-actions">
                                <button id="technicianChangePassword" class="btn btn-outline-primary" type="button"><i class="fas fa-key"></i> Change Password</button>
                                <button id="technicianNotificationSettings" class="btn btn-outline-secondary" type="button"><i class="fas fa-bell"></i> Notification Settings</button>
                                <button id="technicianLogout" class="btn btn-outline-danger" type="button"><i class="fas fa-sign-out-alt"></i> Logout</button>
                            </div>
                        </div>
                    </section>
                </div>
                <section id="technicianNotificationPanel" class="dashboard-card technician-notification-panel" hidden>
                    <div class="card-header"><h3><i class="fas fa-bell"></i> Notification Settings</h3></div>
                    <div class="card-body">
                        <form id="technicianNotificationForm">
                            <label class="technician-setting-toggle"><span><strong>Service requests</strong><small>Notify me when a client sends a request.</small></span><input type="checkbox" name="requests" checked></label>
                            <label class="technician-setting-toggle"><span><strong>Messages</strong><small>Notify me when a client contacts me.</small></span><input type="checkbox" name="messages" checked></label>
                            <label class="technician-setting-toggle"><span><strong>Payments and earnings</strong><small>Notify me about completed payments.</small></span><input type="checkbox" name="payments" checked></label>
                            <button class="btn btn-primary mt-3" type="submit"><i class="fas fa-save"></i> Save Notifications</button>
                        </form>
                    </div>
                </section>
            </div>
        `;
        this.restoreTechnicianNotificationSettings();
    }

    loadOverview() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Welcome Section -->
                <section class="technician-welcome" data-aos="fade-up">
                    <div class="technician-welcome-header">
                        <div class="technician-welcome-circle technician-welcome-circle-large"></div>
                        <div class="technician-welcome-circle technician-welcome-circle-medium"></div>
                        <div class="technician-welcome-circle technician-welcome-circle-small"></div>
                        <div class="technician-welcome-content">
                            <h1>Welcome back, <strong id="userName">${this.userData?.name || 'Technician'}</strong>! 👋</h1>
                            <p>Here's a summary of your technician activity on <strong>Recomputech</strong></p>
                            <div class="technician-welcome-user">
                                <strong>Technician dashboard overview</strong>
                            </div>
                            <div class="technician-welcome-stats">
                                <div class="technician-stat-preview">
                                    <strong>120</strong>
                                    <span>Profile Views</span>
                                </div>
                                <div class="technician-stat-preview">
                                    <strong>B/. 2,500</strong>
                                    <span>Total Sold</span>
                                </div>
                                <div class="technician-stat-preview">
                                    <strong>4.8</strong>
                                    <span>Average Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="content-container">
                    <!-- Stats Cards -->
                    <div class="row" data-aos="fade-up" data-aos-delay="100">
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="profileViews">120</h3>
                                    <p>Profile Views</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="totalSales">B/. 2,500</h3>
                                    <p>Total Sold</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="totalPurchases">B/. 1,200</h3>
                                    <p>Total Purchased</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-star"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="rating">4.8</h3>
                                    <p>Average Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Gráfica de actividad -->
                    <div class="chart-container my-4">
                        <canvas id="technicianOverviewChart"></canvas>
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
                                                <i class="fas fa-tools"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h5>Laptop repair completed</h5>
                                                <p>Successfully repaired a Dell laptop for client Maria Garcia</p>
                                                <span class="activity-time">2 hours ago</span>
                                            </div>
                                        </div>
                                        <div class="activity-item">
                                            <div class="activity-icon">
                                                <i class="fas fa-clock"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h5>New repair request</h5>
                                                <p>Received request for iPhone screen replacement</p>
                                                <span class="activity-time">4 hours ago</span>
                                            </div>
                                        </div>
                                        <div class="activity-item">
                                            <div class="activity-icon">
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h5>5-star review received</h5>
                                                <p>Excellent service! Very professional and quick turnaround</p>
                                                <span class="activity-time">1 day ago</span>
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
                                        <button class="quick-action-btn" data-section="requests">
                                            <i class="fas fa-inbox"></i>
                                            <span>View Requests</span>
                                        </button>
                                        <button class="quick-action-btn" data-section="contact">
                                            <i class="fas fa-envelope"></i>
                                            <span>Contact Clients</span>
                                        </button>
                                        <button class="quick-action-btn" data-section="credentials">
                                            <i class="fas fa-certificate"></i>
                                            <span>Update Credentials</span>
                                        </button>
                                        <button class="quick-action-btn" data-section="stats">
                                            <i class="fas fa-chart-bar"></i>
                                            <span>View Statistics</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            if (window.Chart) {
                const ctx = document.getElementById('technicianOverviewChart').getContext('2d');
                const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('dark-mode');
                
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [
                            {
                                label: 'Profile Views',
                                data: [20, 35, 40, 60, 80, 120],
                                backgroundColor: 'rgba(33, 141, 166, 0.7)'
                            },
                            {
                                label: 'Sales',
                                data: [2, 3, 4, 5, 6, 7],
                                backgroundColor: 'rgba(21, 90, 107, 0.7)'
                            },
                            {
                                label: 'Purchases',
                                data: [1, 2, 1, 3, 2, 4],
                                backgroundColor: 'rgba(246, 189, 22, 0.7)'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: { 
                            legend: { 
                                position: 'top',
                                labels: {
                                    color: isDarkMode ? '#f8fafc' : '#1f2937'
                                }
                            } 
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: isDarkMode ? '#f8fafc' : '#1f2937'
                                },
                                grid: {
                                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                }
                            },
                            y: {
                                ticks: {
                                    color: isDarkMode ? '#f8fafc' : '#1f2937'
                                },
                                grid: {
                                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                }
                            }
                        }
                    }
                });
            }
        }, 500);
    }

    loadContact() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <section class="section-header">
                    <div class="header-content">
                        <h1>Contact Clients</h1>
                        <p>Find a client and start a conversation about their service.</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="row">
                        <div class="col-lg-7 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-users"></i> Client Directory</h3>
                                </div>
                                <div class="card-body">
                                    <div class="client-directory-tools">
                                        <label class="visually-hidden" for="technicianClientSearch">Search clients</label>
                                        <input id="technicianClientSearch" class="form-control" type="search" placeholder="Search by client or service...">
                                    </div>
                                    <div class="technician-client-list">
                                        <article class="technician-client-card" data-search="maria garcia iphone screen replacement maria@example.com">
                                            <div class="technician-client-avatar"><i class="fas fa-user"></i></div>
                                            <div class="technician-client-details"><h4>Maria Garcia</h4><p>iPhone screen replacement</p><small>maria@example.com</small></div>
                                            <button class="btn btn-outline-primary btn-sm client-contact-btn" type="button" data-email="maria@example.com" data-client="Maria Garcia"><i class="fas fa-envelope"></i><span>Message</span></button>
                                        </article>
                                        <article class="technician-client-card" data-search="juan perez laptop virus removal juan@example.com">
                                            <div class="technician-client-avatar"><i class="fas fa-user"></i></div>
                                            <div class="technician-client-details"><h4>Juan Perez</h4><p>Laptop virus removal</p><small>juan@example.com</small></div>
                                            <button class="btn btn-outline-primary btn-sm client-contact-btn" type="button" data-email="juan@example.com" data-client="Juan Perez"><i class="fas fa-envelope"></i><span>Message</span></button>
                                        </article>
                                        <article class="technician-client-card" data-search="carlos rodriguez pc hardware upgrade carlos@example.com">
                                            <div class="technician-client-avatar"><i class="fas fa-user"></i></div>
                                            <div class="technician-client-details"><h4>Carlos Rodriguez</h4><p>PC hardware upgrade</p><small>carlos@example.com</small></div>
                                            <button class="btn btn-outline-primary btn-sm client-contact-btn" type="button" data-email="carlos@example.com" data-client="Carlos Rodriguez"><i class="fas fa-envelope"></i><span>Message</span></button>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-paper-plane"></i> New Message</h3>
                                </div>
                                <div class="card-body">
                                    <form id="technicianMessageForm">
                                        <div class="mb-3"><label for="technicianMessageClient" class="form-label">Client</label><input id="technicianMessageClient" class="form-control" required></div>
                                        <div class="mb-3"><label for="technicianMessageEmail" class="form-label">Email</label><input id="technicianMessageEmail" class="form-control" type="email" required></div>
                                        <div class="mb-3"><label for="technicianMessageBody" class="form-label">Message</label><textarea id="technicianMessageBody" class="form-control" rows="5" placeholder="Write a message about the service..." required></textarea></div>
                                        <button class="btn btn-primary w-100" type="submit"><i class="fas fa-paper-plane"></i> Open Email</button>
                                        <small class="form-text">Your default email application will open with this message.</small>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.querySelector('#technicianClientSearch')?.addEventListener('input', (event) => {
            this.filterClients(event.target.value);
        });
    }

    loadCredentials() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Credentials & Certifications</h1>
                        <p>Manage your professional credentials and certifications</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="row">
                        <div class="col-lg-8 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-certificate"></i> Certifications</h3>
                                </div>
                                <div class="card-body">
                                    <div class="certification-list">
                                        <div class="certification-item">
                                            <div class="cert-icon">
                                                <i class="fas fa-certificate"></i>
                                            </div>
                                            <div class="cert-content">
                                                <h5>CompTIA A+ Certification</h5>
                                                <p>Computer hardware and software certification</p>
                                                <span class="cert-date">Issued: January 2023</span>
                                            </div>
                                        </div>
                                        <div class="certification-item">
                                            <div class="cert-icon">
                                                <i class="fas fa-certificate"></i>
                                            </div>
                                            <div class="cert-content">
                                                <h5>Cisco CCNA</h5>
                                                <p>Network administration and configuration</p>
                                                <span class="cert-date">Issued: March 2022</span>
                                            </div>
                                        </div>
                                        <div class="certification-item">
                                            <div class="cert-icon">
                                                <i class="fas fa-certificate"></i>
                                            </div>
                                            <div class="cert-content">
                                                <h5>Apple Certified Technician</h5>
                                                <p>Apple hardware and software repair</p>
                                                <span class="cert-date">Issued: June 2023</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-plus-circle"></i> Add Certification</h3>
                                </div>
                                <div class="card-body">
                                    <form id="certificationForm">
                                        <div class="mb-3">
                                            <label for="certName" class="form-label">Certification Name</label>
                                            <input type="text" class="form-control" id="certName" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="certDescription" class="form-label">Description</label>
                                            <textarea class="form-control" id="certDescription" rows="3"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="certDate" class="form-label">Issue Date</label>
                                            <input type="date" class="form-control" id="certDate" required>
                                        </div>
                                        <button type="submit" class="btn btn-primary w-100">
                                            <i class="fas fa-plus"></i> Add Certification
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadRequests() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <section class="section-header">
                    <div class="header-content">
                        <h1>Service Requests</h1>
                        <p>Review, accept and track incoming repair requests.</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <div class="request-header-row"><h3><i class="fas fa-inbox"></i> Service Requests</h3><select id="technicianRequestFilter" class="form-select form-select-sm"><option value="all">All requests</option><option value="pending">Pending</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></div>
                        </div>
                        <div class="card-body">
                            <div class="request-list">
                                <div class="request-item" data-request-status="pending">
                                    <div class="request-status pending">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="request-content">
                                        <h5>iPhone Screen Replacement</h5>
                                        <p><strong>Client:</strong> Maria Garcia</p>
                                        <p><strong>Device:</strong> iPhone 13</p>
                                        <p><strong>Issue:</strong> Cracked screen, needs replacement</p>
                                        <span class="request-time">Requested: 2 hours ago</span>
                                    </div>
                                    <div class="request-actions">
                                        <button class="btn btn-primary btn-sm request-action" data-action="accept">Accept</button>
                                        <button class="btn btn-outline-secondary btn-sm request-action" data-action="details">View Details</button>
                                    </div>
                                </div>
                                <div class="request-item" data-request-status="in-progress">
                                    <div class="request-status in-progress">
                                        <i class="fas fa-tools"></i>
                                    </div>
                                    <div class="request-content">
                                        <h5>Laptop Virus Removal</h5>
                                        <p><strong>Client:</strong> Juan Perez</p>
                                        <p><strong>Device:</strong> Dell Inspiron</p>
                                        <p><strong>Issue:</strong> Malware infection, slow performance</p>
                                        <span class="request-time">Started: 1 day ago</span>
                                    </div>
                                    <div class="request-actions">
                                        <button class="btn btn-success btn-sm request-action" data-action="complete">Complete</button>
                                        <button class="btn btn-outline-secondary btn-sm request-action" data-action="details">View Details</button>
                                    </div>
                                </div>
                                <div class="request-item" data-request-status="completed">
                                    <div class="request-status completed">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div class="request-content">
                                        <h5>PC Hardware Upgrade</h5>
                                        <p><strong>Client:</strong> Carlos Rodriguez</p>
                                        <p><strong>Device:</strong> Custom PC</p>
                                        <p><strong>Issue:</strong> RAM and SSD upgrade</p>
                                        <span class="request-time">Completed: 3 days ago</span>
                                    </div>
                                    <div class="request-actions">
                                        <button class="btn btn-outline-success btn-sm request-action" data-action="details">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.querySelector('#technicianRequestFilter')?.addEventListener('change', (event) => {
            this.filterRequests(event.target.value);
        });
    }

    loadStats() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Performance Statistics</h1>
                        <p>Track your service performance and earnings</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="row">
                        <div class="col-lg-6 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-chart-line"></i> Monthly Earnings</h3>
                                </div>
                                <div class="card-body">
                                    <div class="stats-chart">
                                        <div class="stats-chart-toolbar">
                                            <div>
                                                <span class="stats-chart-label">LAST 6 MONTHS</span>
                                                <strong id="earningsTotal">B/. 0.00</strong>
                                            </div>
                                            <span id="earningsPeriod" class="stats-chart-period"></span>
                                        </div>
                                        <canvas id="earningsChart" aria-label="Monthly earnings chart"></canvas>
                                        <div id="earningsChartEmpty" class="stats-chart-empty" role="status">
                                            <i class="fas fa-chart-line"></i>
                                            <strong>No completed earnings yet</strong>
                                            <span>Finished services will appear here.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-chart-pie"></i> Service Types</h3>
                                </div>
                                <div class="card-body">
                                    <div class="service-stats">
                                        <div class="service-item">
                                            <span class="service-name">Hardware Repair</span>
                                            <span class="service-count">45%</span>
                                        </div>
                                        <div class="service-item">
                                            <span class="service-name">Software Issues</span>
                                            <span class="service-count">30%</span>
                                        </div>
                                        <div class="service-item">
                                            <span class="service-name">Virus Removal</span>
                                            <span class="service-count">15%</span>
                                        </div>
                                        <div class="service-item">
                                            <span class="service-name">Upgrades</span>
                                            <span class="service-count">10%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-calendar"></i> Recent Performance</h3>
                                </div>
                                <div class="card-body">
                                    <div class="performance-metrics">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="metric-item">
                                                    <h4>95%</h4>
                                                    <p>Completion Rate</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="metric-item">
                                                    <h4>4.8/5</h4>
                                                    <p>Average Rating</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="metric-item">
                                                    <h4>2.3 days</h4>
                                                    <p>Average Response Time</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="metric-item">
                                                    <h4>150+</h4>
                                                    <p>Happy Clients</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.loadEarningsChart();
    }

    async loadEarningsChart() {
        const canvas = this.querySelector('#earningsChart');
        const emptyState = this.querySelector('#earningsChartEmpty');
        const totalElement = this.querySelector('#earningsTotal');
        const periodElement = this.querySelector('#earningsPeriod');
        if (!canvas || !window.Chart) return;

        const months = [];
        const earningsByMonth = {};
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
        const currentDate = new Date();

        for (let index = 5; index >= 0; index -= 1) {
            const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - index, 1);
            const key = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`;
            months.push({ key, label: monthFormatter.format(monthDate) });
            earningsByMonth[key] = 0;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const technicianId = String(currentUser?.userId || currentUser?.id || '');
        let attributedOrders = 0;

        if (window.supabaseClient && technicianId) {
            try {
                const { data, error } = await window.supabaseClient
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                (data || []).forEach((order) => {
                    const ownerId = order.technician_id || order.seller_id || order.provider_id || order.service_provider_id || order.assigned_technician_id;
                    if (!ownerId || String(ownerId) !== technicianId) return;

                    const status = String(order.status || '').toLowerCase();
                    if (status && !['paid', 'completed', 'delivered', 'finished', 'approved'].includes(status)) return;

                    const dateValue = order.completed_at || order.service_date || order.created_at || order.purchase_date;
                    const orderDate = new Date(dateValue);
                    if (Number.isNaN(orderDate.getTime())) return;

                    const key = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
                    if (!(key in earningsByMonth)) return;

                    const amount = Number(order.technician_fee ?? order.service_price ?? order.total_price ?? order.amount ?? order.price ?? 0);
                    if (Number.isFinite(amount) && amount > 0) {
                        earningsByMonth[key] += amount;
                        attributedOrders += 1;
                    }
                });
            } catch (error) {
                console.error('Technician earnings could not be loaded:', error);
            }
        }

        const existingChart = Chart.getChart(canvas);
        if (existingChart) existingChart.destroy();

        const values = months.map((month) => Number(earningsByMonth[month.key].toFixed(2)));
        const totalEarnings = values.reduce((total, value) => total + value, 0);
        const hasEarnings = attributedOrders > 0;
        const chartContext = canvas.getContext('2d');
        const chartGradient = chartContext.createLinearGradient(0, 0, 0, 280);
        chartGradient.addColorStop(0, 'rgba(33, 141, 166, 0.35)');
        chartGradient.addColorStop(1, 'rgba(33, 141, 166, 0.02)');

        if (totalElement) totalElement.textContent = `B/. ${totalEarnings.toFixed(2)}`;
        if (periodElement) periodElement.textContent = `${months[0].label} - ${months[months.length - 1].label}`;
        if (emptyState) emptyState.classList.toggle('is-hidden', hasEarnings);

        new Chart(chartContext, {
            type: 'line',
            data: {
                labels: months.map((month) => month.label),
                datasets: [{
                    label: 'Earnings (B/.)',
                    data: values,
                    backgroundColor: chartGradient,
                    borderColor: '#218DA6',
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#218DA6',
                    pointBorderWidth: 3,
                    pointRadius: hasEarnings ? 4 : 3,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        displayColors: false,
                        callbacks: {
                            label: (context) => ` B/. ${Number(context.raw || 0).toFixed(2)}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: hasEarnings ? undefined : 100,
                        grid: {
                            color: 'rgba(31, 41, 55, 0.09)',
                            borderDash: [4, 4]
                        },
                        ticks: {
                            maxTicksLimit: 5,
                            callback: (value) => `B/. ${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    loadNotifications() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Notifications</h1>
                        <p>Stay updated with important alerts and messages</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3><i class="fas fa-bell"></i> Recent Notifications</h3>
                        </div>
                        <div class="card-body">
                            <div class="notification-list">
                                <div class="notification-item unread">
                                    <div class="notification-icon">
                                        <i class="fas fa-inbox"></i>
                                    </div>
                                    <div class="notification-content">
                                        <h5>New Service Request</h5>
                                        <p>Maria Garcia has requested iPhone screen replacement</p>
                                        <span class="notification-time">2 hours ago</span>
                                    </div>
                                    <div class="notification-action">
                                        <button class="btn btn-primary btn-sm">View</button>
                                    </div>
                                </div>
                                <div class="notification-item">
                                    <div class="notification-icon">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="notification-content">
                                        <h5>New Review Received</h5>
                                        <p>Juan Perez left a 5-star review for your service</p>
                                        <span class="notification-time">1 day ago</span>
                                    </div>
                                    <div class="notification-action">
                                        <button class="btn btn-outline-primary btn-sm">View</button>
                                    </div>
                                </div>
                                <div class="notification-item">
                                    <div class="notification-icon">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                    <div class="notification-content">
                                        <h5>Payment Received</h5>
                                        <p>Payment of B/. 150 received for laptop repair</p>
                                        <span class="notification-time">2 days ago</span>
                                    </div>
                                    <div class="notification-action">
                                        <button class="btn btn-outline-primary btn-sm">View</button>
                                    </div>
                                </div>
                                <div class="notification-item">
                                    <div class="notification-icon">
                                        <i class="fas fa-certificate"></i>
                                    </div>
                                    <div class="notification-content">
                                        <h5>Certification Expiring</h5>
                                        <p>Your CompTIA A+ certification expires in 30 days</p>
                                        <span class="notification-time">3 days ago</span>
                                    </div>
                                    <div class="notification-action">
                                        <button class="btn btn-outline-warning btn-sm">Renew</button>
                                    </div>
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
            } else if (e.target.closest('.request-action')) {
                e.preventDefault();
                this.handleRequestAction(e.target.closest('.request-action'));
            } else if (e.target.closest('.client-contact-btn')) {
                e.preventDefault();
                this.prepareClientMessage(e.target.closest('.client-contact-btn'));
            } else if (e.target.closest('#technicianChangePassword')) {
                window.location.href = '../../auth/forgot-password.html';
            } else if (e.target.closest('#technicianNotificationSettings')) {
                const panel = this.querySelector('#technicianNotificationPanel');
                if (panel) panel.hidden = !panel.hidden;
            } else if (e.target.closest('#technicianLogout')) {
                this.logoutTechnician();
            }
        });

        this.addEventListener('input', (e) => {
            if (e.target.id === 'technicianClientSearch') {
                this.filterClients(e.target.value);
            }
        });

        this.addEventListener('change', (e) => {
            if (e.target.id === 'technicianRequestFilter') {
                this.filterRequests(e.target.value);
            }
        });

        // Form submissions
        this.addEventListener('submit', (e) => {
            if (e.target.id === 'certificationForm') {
                e.preventDefault();
                this.handleCertificationForm(e.target);
            } else if (e.target.id === 'technicianSellForm') {
                e.preventDefault();
                this.handleTechnicianSellForm(e.target);
            } else if (e.target.id === 'technicianProfileForm') {
                e.preventDefault();
                this.handleTechnicianProfileForm(e.target);
            } else if (e.target.id === 'technicianMessageForm') {
                e.preventDefault();
                this.openClientEmail(e.target);
            } else if (e.target.id === 'technicianNotificationForm') {
                e.preventDefault();
                this.saveTechnicianNotificationSettings(e.target);
            }
        });

        // Listen for theme changes
        document.addEventListener('themeChanged', () => {
            this.updateCharts();
        });

        // Listen for dark mode toggle
        document.addEventListener('darkModeToggled', () => {
            this.updateCharts();
        });
    }

    updateCharts() {
        // Update existing charts with new theme colors
        const charts = Chart.getChart ? Chart.getChart('technicianOverviewChart') : null;
        if (charts) {
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('dark-mode');
            
            charts.options.plugins.legend.labels.color = isDarkMode ? '#f8fafc' : '#1f2937';
            charts.options.scales.x.ticks.color = isDarkMode ? '#f8fafc' : '#1f2937';
            charts.options.scales.y.ticks.color = isDarkMode ? '#f8fafc' : '#1f2937';
            charts.options.scales.x.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            charts.options.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            
            charts.update();
        }
    }

    handleCertificationForm(form) {
        // Handle certification form submission
        console.log('Certification form submitted');
        // Add form processing logic here
    }

    filterRequests(status) {
        this.querySelectorAll('.request-item[data-request-status]').forEach((request) => {
            request.hidden = status !== 'all' && request.dataset.requestStatus !== status;
        });
    }

    handleRequestAction(button) {
        const request = button.closest('.request-item');
        if (!request) return;

        if (button.dataset.action === 'details') {
            const title = request.querySelector('.request-content h5')?.textContent || 'Service request';
            alert(`${title}\n\nReview the client details and contact them to coordinate the service.`);
            return;
        }

        const nextStatus = button.dataset.action === 'accept' ? 'in-progress' : 'completed';
        const statusElement = request.querySelector('.request-status');
        const statusIcon = statusElement?.querySelector('i');
        request.dataset.requestStatus = nextStatus;
        statusElement?.classList.remove('pending', 'in-progress', 'completed');
        statusElement?.classList.add(nextStatus);
        if (statusIcon) statusIcon.className = nextStatus === 'completed' ? 'fas fa-check-circle' : 'fas fa-tools';

        const actionArea = request.querySelector('.request-actions');
        if (nextStatus === 'in-progress') {
            button.textContent = 'Complete';
            button.dataset.action = 'complete';
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
        } else {
            actionArea?.replaceChildren();
            const detailsButton = document.createElement('button');
            detailsButton.type = 'button';
            detailsButton.className = 'btn btn-outline-success btn-sm request-action';
            detailsButton.dataset.action = 'details';
            detailsButton.textContent = 'View Details';
            actionArea?.append(detailsButton);
        }
    }

    filterClients(searchValue) {
        const search = searchValue.trim().toLowerCase();
        this.querySelectorAll('.technician-client-card').forEach((client) => {
            client.hidden = Boolean(search) && !client.dataset.search.includes(search);
        });
    }

    prepareClientMessage(button) {
        const clientField = this.querySelector('#technicianMessageClient');
        const emailField = this.querySelector('#technicianMessageEmail');
        if (clientField) clientField.value = button.dataset.client || '';
        if (emailField) emailField.value = button.dataset.email || '';
        this.querySelector('#technicianMessageBody')?.focus();
    }

    openClientEmail(form) {
        const client = form.querySelector('#technicianMessageClient').value.trim();
        const email = form.querySelector('#technicianMessageEmail').value.trim();
        const body = form.querySelector('#technicianMessageBody').value.trim();
        const subject = `Recomputech service update for ${client}`;
        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    restoreTechnicianNotificationSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('technicianNotificationSettings') || 'null');
        if (!savedSettings) return;
        const form = this.querySelector('#technicianNotificationForm');
        if (!form) return;
        Object.entries(savedSettings).forEach(([name, checked]) => {
            const input = form.querySelector(`[name="${name}"]`);
            if (input) input.checked = Boolean(checked);
        });
    }

    saveTechnicianNotificationSettings(form) {
        const settings = Object.fromEntries([...form.querySelectorAll('input[type="checkbox"]')].map((input) => [input.name, input.checked]));
        localStorage.setItem('technicianNotificationSettings', JSON.stringify(settings));
        alert('Notification settings saved successfully.');
    }

    logoutTechnician() {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('dashboardExternalPage');
        window.location.href = '../../auth/auth.html';
    }

    async handleTechnicianSellForm(form) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!window.supabaseClient || !currentUser?.userId) {
            alert('You must be logged in and have Supabase configured to list a product.');
            return;
        }

        try {
            const { error } = await window.supabaseClient.from('products').insert({
                seller_id: currentUser.userId,
                name: form.querySelector('#technicianProductName').value.trim(),
                category: form.querySelector('#technicianProductCategory').value,
                price: Number(form.querySelector('#technicianProductPrice').value),
                description: form.querySelector('#technicianProductDescription').value.trim(),
                status: 'available'
            });
            if (error) throw error;
            alert('Product listed successfully.');
            window.location.hash = 'my-products';
        } catch (error) {
            console.error('Technician product could not be created:', error);
            alert(`Could not list product: ${error.message}`);
        }
    }

    async handleTechnicianProfileForm(form) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!window.supabaseClient || !currentUser?.email) {
            alert('You must be logged in and have Supabase configured to update your profile.');
            return;
        }

        try {
            const firstName = form.querySelector('#technicianFirstName').value.trim();
            const lastName = form.querySelector('#technicianLastName').value.trim();
            const email = form.querySelector('#technicianEmail').value.trim();
            const phone = form.querySelector('#technicianPhone').value.trim();
            const address = form.querySelector('#technicianAddress').value.trim();
            const { data, error } = await window.supabaseClient.from('users').update({ email, first_name: firstName, last_name: lastName, phone, address }).eq('email', currentUser.email).select().single();
            if (error) throw error;
            const updatedUser = { ...currentUser, email: data.email, firstName: data.first_name, lastName: data.last_name, name: `${data.first_name} ${data.last_name}`, phone: data.phone, address: data.address };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.userData = updatedUser;
            alert('Profile updated successfully.');
        } catch (error) {
            console.error('Technician profile could not be updated:', error);
            alert(`Could not update profile: ${error.message}`);
        }
    }
}

customElements.define('technician-dashboard-content', TechnicianDashboardContent); 