// Global Header Manager
class HeaderManager {
    constructor() {
        this.init();
    }

    init() {
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

    checkAuthStatus() {
        const currentUser = this.getCurrentUser();
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