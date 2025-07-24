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
    }

    isValidSection(section) {
        const validSections = ['overview', 'contact', 'credentials', 'requests', 'stats', 'notifications'];
        return validSections.includes(section);
    }

    loadSection() {
        console.log('Loading section:', this.currentSection);
        
        switch (this.currentSection) {
            case 'overview':
                this.loadOverview();
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
    }

    loadOverview() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Welcome Section -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Welcome back, <span id="userName">${this.userData?.name || 'Technician'}</span>! 👋</h1>
                        <p>Here's your technician dashboard overview</p>
                    </div>
                </section>

                <div class="content-container">
                    <!-- Stats Cards -->
                    <div class="row" data-aos="fade-up" data-aos-delay="100">
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-tools"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="totalRequests">12</h3>
                                    <p>Total Requests</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="completedJobs">8</h3>
                                    <p>Completed Jobs</p>
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
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div class="stat-content">
                                    <h3 id="earnings">B/. 1,250</h3>
                                    <p>Total Earnings</p>
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
    }

    loadContact() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Contact Management</h1>
                        <p>Manage your client communications and contact information</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="row">
                        <div class="col-lg-8 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-envelope"></i> Contact Information</h3>
                                </div>
                                <div class="card-body">
                                    <div class="contact-info">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Email</label>
                                                <p class="form-control-static">${this.userData?.email || 'tech@example.com'}</p>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Phone</label>
                                                <p class="form-control-static">(123) 456-7890</p>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Location</label>
                                            <p class="form-control-static">Panama City, Panama</p>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Service Areas</label>
                                            <p class="form-control-static">Panama City, San Miguelito, Chorrera</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3><i class="fas fa-comments"></i> Recent Messages</h3>
                                </div>
                                <div class="card-body">
                                    <div class="message-list">
                                        <div class="message-item">
                                            <div class="message-avatar">
                                                <i class="fas fa-user"></i>
                                            </div>
                                            <div class="message-content">
                                                <h6>Maria Garcia</h6>
                                                <p>When can you come to fix my laptop?</p>
                                                <span class="message-time">2 hours ago</span>
                                            </div>
                                        </div>
                                        <div class="message-item">
                                            <div class="message-avatar">
                                                <i class="fas fa-user"></i>
                                            </div>
                                            <div class="message-content">
                                                <h6>Juan Perez</h6>
                                                <p>Great job on the repair! Thank you!</p>
                                                <span class="message-time">1 day ago</span>
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
                <!-- Section Header -->
                <section class="section-header">
                    <div class="header-content">
                        <h1>Service Requests</h1>
                        <p>Manage incoming repair and service requests</p>
                    </div>
                </section>

                <div class="content-container">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3><i class="fas fa-inbox"></i> Active Requests</h3>
                        </div>
                        <div class="card-body">
                            <div class="request-list">
                                <div class="request-item">
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
                                        <button class="btn btn-primary btn-sm">Accept</button>
                                        <button class="btn btn-outline-secondary btn-sm">View Details</button>
                                    </div>
                                </div>
                                <div class="request-item">
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
                                        <button class="btn btn-success btn-sm">Complete</button>
                                        <button class="btn btn-outline-secondary btn-sm">Update</button>
                                    </div>
                                </div>
                                <div class="request-item">
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
                                        <button class="btn btn-outline-success btn-sm">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
                                        <canvas id="earningsChart" width="400" height="200"></canvas>
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
            }
        });

        // Form submissions
        this.addEventListener('submit', (e) => {
            if (e.target.id === 'certificationForm') {
                e.preventDefault();
                this.handleCertificationForm(e.target);
            }
        });
    }

    handleCertificationForm(form) {
        // Handle certification form submission
        console.log('Certification form submitted');
        // Add form processing logic here
    }
}

customElements.define('technician-dashboard-content', TechnicianDashboardContent); 