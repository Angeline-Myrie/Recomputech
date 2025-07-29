// Global Authentication Handler
class AuthHandler {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    init() {
        // Check authentication status on page load
        this.checkAuthStatus();
        
        // Listen for storage changes (login/logout from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser') {
                this.currentUser = this.getCurrentUser();
                this.checkAuthStatus();
            }
        });
    }

    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    checkAuthStatus() {
        const currentUser = this.getCurrentUser();
        
        // Update header if it exists
        this.updateHeader(currentUser);
        
        // Update page-specific elements
        this.updatePageElements(currentUser);
    }

    updateHeader(currentUser) {
        const headerContainer = document.getElementById('headerContainer');
        if (headerContainer) {
            if (currentUser) {
                // User is logged in - show appropriate auth header based on role
                if (currentUser.role === 'technician') {
                    headerContainer.innerHTML = '<recomputech-header-auth-technician></recomputech-header-auth-technician>';
                } else {
                    headerContainer.innerHTML = '<recomputech-header-auth></recomputech-header-auth>';
                }
            } else {
                // User is not logged in - show regular header
                headerContainer.innerHTML = '<recomputech-header></recomputech-header>';
            }
        }
    }

    updatePageElements(currentUser) {
        // Update elements that depend on authentication status
        const authElements = document.querySelectorAll('[data-auth]');
        
        authElements.forEach(element => {
            const authType = element.dataset.auth;
            
            if (authType === 'login' && currentUser) {
                element.style.display = 'none';
            } else if (authType === 'logout' && !currentUser) {
                element.style.display = 'none';
            } else if (authType === 'user' && currentUser) {
                element.style.display = 'block';
            } else if (authType === 'guest' && !currentUser) {
                element.style.display = 'block';
            }
        });

        // Update user-specific content
        if (currentUser) {
            const userNameElements = document.querySelectorAll('[data-user-name]');
            userNameElements.forEach(element => {
                element.textContent = currentUser.name;
            });

            const userRoleElements = document.querySelectorAll('[data-user-role]');
            userRoleElements.forEach(element => {
                element.textContent = this.formatRole(currentUser.role);
            });
        }
    }

    formatRole(role) {
        if (!role) return 'User';
        
        const roleMap = {
            'regular_user': 'Regular User',
            'technician': 'Technician',
            'admin': 'Administrator'
        };
        
        return roleMap[role] || role;
    }

    login(email, password) {
        // This would typically call the AuthService from users-data.js
        // For now, we'll use a simple check
        const users = [
            {
                email: "info@gmail.com",
                password: "123456",
                name: "Juan Pérez",
                role: "regular_user",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            {
                email: "tech1@gmail.com",
                password: "123456",
                name: "María García",
                role: "technician",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            {
                email: "user1@gmail.com",
                password: "123456",
                name: "Carlos López",
                role: "regular_user",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            {
                email: "tech2@gmail.com",
                password: "123456",
                name: "Ana Rodríguez",
                role: "technician",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            {
                email: "admin@gmail.com",
                password: "123456",
                name: "Admin User",
                role: "admin",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            }
        ];

        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            const userData = {
                id: user.id || Math.random(),
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUser = userData;
            this.checkAuthStatus();
            return userData;
        }
        
        return null;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.checkAuthStatus();
        
        // Redirect to home page
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    isTechnician() {
        return this.currentUser && this.currentUser.role === 'technician';
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }
}

// Initialize global auth handler
const authHandler = new AuthHandler();

// Make it available globally
window.authHandler = authHandler; 