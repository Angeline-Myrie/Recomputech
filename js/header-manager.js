// Global Header Manager
class HeaderManager {
    constructor() {
        this.init();
    }

    init() {
        if (this.isEmbeddedInDashboard()) {
            this.applyEmbeddedDashboardMode();
            return;
        }

        // Check authentication status on page load
        this.checkAuthStatus();
        
        // Listen for storage changes (login/logout from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser') {
                this.checkAuthStatus();
            }
        });

        // Listen for custom logout event
        document.addEventListener('logout', () => {
            this.handleLogout();
        });
    }

    isEmbeddedInDashboard() {
        return window.self !== window.top;
    }

    applyEmbeddedDashboardMode() {
        const hideChrome = () => {
            const headerContainer = document.getElementById('headerContainer');
            if (headerContainer) {
                headerContainer.style.display = 'none';
                headerContainer.innerHTML = '';
            }

            document.querySelectorAll(
                'recomputech-header, recomputech-header-auth, recomputech-header-auth-technician, header'
            ).forEach(el => {
                el.style.display = 'none';
            });

            const footer = document.querySelector('recomputech-footer');
            if (footer) footer.style.display = 'none';

            document.documentElement.classList.add('dashboard-embedded');
            document.body?.classList.add('dashboard-embedded');
        };

        hideChrome();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', hideChrome);
        }
    }

    checkAuthStatus() {
        const currentUser = this.getCurrentUser();
        // If a specific home container exists, always render public header on homepage
        const headerContainerHome = document.getElementById('headerContainerHome');
        if (headerContainerHome) {
            if (!headerContainerHome.querySelector('recomputech-header')) {
                headerContainerHome.innerHTML = '<recomputech-header></recomputech-header>';
            }
            return;
        }
        const headerContainer = document.getElementById('headerContainer');
        
        if (!headerContainer) return;
        
        if (currentUser) {
            // User is logged in - show appropriate auth header based on role
            if (currentUser.role === 'technician') {
                if (!headerContainer.querySelector('recomputech-header-auth-technician')) {
                    headerContainer.innerHTML = '<recomputech-header-auth-technician></recomputech-header-auth-technician>';
                }
            } else {
                if (!headerContainer.querySelector('recomputech-header-auth')) {
                    headerContainer.innerHTML = '<recomputech-header-auth></recomputech-header-auth>';
                }
            }
        } else {
            // User is not logged in - show regular header
            if (!headerContainer.querySelector('recomputech-header')) {
                headerContainer.innerHTML = '<recomputech-header></recomputech-header>';
            }
        }
    }

    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    handleLogout() {
        // Clear user data
        localStorage.removeItem('currentUser');
        
        // Switch to normal header
        this.checkAuthStatus();
        
        // Redirect to home page if not already there
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            window.location.href = '/';
        }
    }

    // Method to trigger logout from other components
    logout() {
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('logout'));
        
        // Also call handleLogout directly
        this.handleLogout();
    }
}

// Initialize global header manager
const headerManager = new HeaderManager();

// Make it available globally
window.headerManager = headerManager; 