class RecomputechHeaderAuthTechnician extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isMobile = window.innerWidth <= 767;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const currentUser = this.getCurrentUser();
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1030;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                :host(.dark-mode) {
                    background: rgba(24, 31, 42, 0.95);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .recomputech-header-navbar {
                    padding: 1rem 0;
                    font-size: 1.1rem;
                }
                .recomputech-navbar-container {
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    gap: 2rem;
                    padding-left: 60px;
                    padding-right: 60px;
                }
                .recomputech-navbar-brand {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
                .recomputech-logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                    margin-right: 0.5rem;
                }
                .recomputech-logo-small {
                    width: 40px;
                    height: auto;
                }
                .recomputech-brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }
                .recomputech-brand-name {
                    font-weight: 700;
                    font-size: 1.8rem;
                    color: #000;
                    margin: 0;
                }
                .recomputech-brand-tagline {
                    font-size: 1rem;
                    color: #666;
                    margin: 0;
                }
                :host(.dark-mode) .recomputech-brand-name,
                :host(.dark-mode) .recomputech-brand-tagline {
                    color: #fff;
                }
                .recomputech-navbar-nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 2rem;
                }
                .recomputech-nav-link {
                    text-decoration: none;
                    color: #374151;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }
                .recomputech-nav-link:hover {
                    color: #218DA6;
                }
                .recomputech-nav-link.active {
                    color: #218DA6;
                }
                .recomputech-nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #218DA6;
                    border-radius: 1px;
                }
                .recomputech-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .recomputech-btn-icon {
                    background: none;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                    color: #1f2937;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    transition: all 0.3s ease;
                }
                :host(.dark-mode) .recomputech-btn-icon {
                    border-color: #374151;
                    color: #fff;
                }
                .recomputech-btn-icon:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                }
                :host(.dark-mode) .recomputech-btn-icon:hover {
                    background: #374151;
                    border-color: #6b7280;
                }
                .recomputech-btn-icon svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }
                .recomputech-cart-icon {
                    background: none;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                    color: #1f2937;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    position: relative;
                    transition: all 0.3s ease;
                }
                :host(.dark-mode) .recomputech-cart-icon {
                    border-color: #374151;
                    color: #fff;
                }
                .recomputech-cart-icon:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                }
                :host(.dark-mode) .recomputech-cart-icon:hover {
                    background: #374151;
                    border-color: #6b7280;
                }
                .recomputech-cart-icon svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }
                .recomputech-cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                /* User Section Styles */
                .user-section {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }

                .user-info:hover {
                    background: #f8fafc;
                    border-color: #e5e7eb;
                }

                :host(.dark-mode) .user-info:hover {
                    background: #374151;
                    border-color: #4b5563;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e5e7eb;
                }

                :host(.dark-mode) .user-avatar {
                    border-color: #4b5563;
                }

                .user-details {
                    display: flex;
                    flex-direction: column;
                    gap: 0.1rem;
                }

                .user-name {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #1f2937;
                    line-height: 1.2;
                }

                :host(.dark-mode) .user-name {
                    color: #f9fafb;
                }

                .user-role {
                    font-size: 0.7rem;
                    color: #64748b;
                    text-transform: capitalize;
                    font-weight: 500;
                }

                :host(.dark-mode) .user-role {
                    color: #9ca3af;
                }

                /* Dropdown Menu */
                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    min-width: 220px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                    z-index: 1001;
                    border: 1px solid #e5e7eb;
                    padding: 0.5rem;
                    margin-top: 0.5rem;
                }

                :host(.dark-mode) .dropdown-menu {
                    background: #1f2937;
                    border-color: #374151;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }

                .dropdown-menu.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    text-decoration: none;
                    color: #374151;
                    transition: all 0.3s ease;
                    border-radius: 8px;
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                :host(.dark-mode) .dropdown-item {
                    color: #e5e7eb;
                }

                .dropdown-item:hover {
                    background: #f8fafc;
                    color: #218DA6;
                    transform: translateX(5px);
                }

                :host(.dark-mode) .dropdown-item:hover {
                    background: #374151;
                    color: #3b82f6;
                }

                .dropdown-item i {
                    font-size: 1rem;
                    width: 20px;
                    text-align: center;
                    color: #64748b;
                }

                :host(.dark-mode) .dropdown-item i {
                    color: #9ca3af;
                }

                .dropdown-item:hover i {
                    color: #218DA6;
                }

                :host(.dark-mode) .dropdown-item:hover i {
                    color: #3b82f6;
                }
            </style>
            <nav class="recomputech-header-navbar">
                <div class="container">
                    <div class="recomputech-navbar-container">
                        <!-- Logo Section -->
                        <a class="recomputech-navbar-brand" href="index.html">
                            <img src="/assets/logos/logo-.png" alt="Logo" class="recomputech-logo recomputech-logo-small">
                            <div class="recomputech-brand-text">
                                <span class="recomputech-brand-name">Recomputech</span>
                                <span class="recomputech-brand-tagline">Sustainable Technology</span>
                            </div>
                        </a>
                        <!-- Navigation Section -->
                        <ul class="recomputech-navbar-nav">
                            <li><a class="recomputech-nav-link" href="/dashboard/Technician/dashboard-technician.html">Dashboard</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/marketplace.html">Marketplace</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/contact.html">Contact</a></li>
                        </ul>
                        <!-- Actions Section -->
                        <div class="recomputech-header-actions">
                            <!-- Theme Toggle -->
                            <button class="recomputech-btn-icon" id="recomputech-theme-toggle" title="Toggle dark mode">
                                <svg class="moon-icon" viewBox="0 0 24 24">
                                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
                                </svg>
                                <svg class="sun-icon" viewBox="0 0 24 24" style="display: none;">
                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </button>
                            <!-- User Section -->
                            <div class="user-section">
                                <div class="user-info" id="userInfo">
                                    <img src="${currentUser?.avatar || '/assets/images/portrait-female-working.jpg'}" 
                                         alt="${currentUser?.name || 'User'}" 
                                         class="user-avatar"
                                         onerror="this.src='/assets/images/portrait-female-working.jpg'">
                                    <div class="user-details">
                                        <div class="user-name">${currentUser?.name || 'User'}</div>
                                        <div class="user-role">Technician role</div>
                                    </div>
                                </div>
                                <div class="dropdown-menu" id="dropdownMenu">
                                    <a href="/dashboard/Technician/dashboard-technician.html#overview" class="dropdown-item">
                                        <i class="fas fa-user-circle"></i>
                                        Overview
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#contact" class="dropdown-item">
                                        <i class="fas fa-envelope"></i>
                                        Contact
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#credentials" class="dropdown-item">
                                        <i class="fas fa-certificate"></i>
                                        Credentials
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#requests" class="dropdown-item">
                                        <i class="fas fa-inbox"></i>
                                        Requests
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#stats" class="dropdown-item">
                                        <i class="fas fa-chart-bar"></i>
                                        Stats
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#notifications" class="dropdown-item">
                                        <i class="fas fa-bell"></i>
                                        Notifications
                                    </a>
                                    <a href="#" class="dropdown-item" id="logoutBtn">
                                        <i class="fas fa-sign-out-alt"></i>
                                        Logout
                                    </a>
                                </div>
                            </div>
                            <!-- Mobile Menu Toggle -->
                            <button class="recomputech-navbar-toggler" id="recomputech-navbar-toggler">
                                <svg viewBox="0 0 24 24">
                                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const themeToggle = this.shadowRoot.getElementById('recomputech-theme-toggle');
        const mobileToggle = this.shadowRoot.getElementById('recomputech-navbar-toggler');
        const userInfo = this.shadowRoot.getElementById('userInfo');
        const dropdownMenu = this.shadowRoot.getElementById('dropdownMenu');
        const logoutBtn = this.shadowRoot.getElementById('logoutBtn');

        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
        mobileToggle?.addEventListener('click', () => {
            this.openMobileMenu();
        });
        userInfo?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!this.shadowRoot.contains(e.target)) {
                dropdownMenu?.classList.remove('show');
            }
        });
        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });
        this.initializeTheme();
        this.setActiveNavLink();
    }

    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    logout() {
        if (window.headerManager) {
            window.headerManager.logout();
        } else {
            localStorage.removeItem('currentUser');
            window.location.href = '/';
        }
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = this.shadowRoot.querySelectorAll('.recomputech-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }



    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        if (isDark) {
            document.documentElement.classList.remove('dark-mode');
            this.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark-mode');
            this.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        this.updateThemeIcon();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            this.classList.add('dark-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const moonIcon = this.shadowRoot.querySelector('.moon-icon');
        const sunIcon = this.shadowRoot.querySelector('.sun-icon');
        const isDark = document.documentElement.classList.contains('dark-mode');
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        }
    }

    openMobileMenu() {
        console.log('Opening mobile menu');
    }

    closeMobileMenu() {
        console.log('Closing mobile menu');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }
}

customElements.define('recomputech-header-auth-technician', RecomputechHeaderAuthTechnician); 