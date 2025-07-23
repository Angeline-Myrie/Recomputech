// ========================================
// AUTHENTICATION DYNAMIC SWITCHING
// ========================================

// Import users data
let USERS_DATA = [];
let AuthService = {};

// Load users data
async function loadUsersData() {
    try {
        const response = await fetch('../auth/users-data.js');
        const text = await response.text();
        
        // Extract USERS_DATA from the file
        const usersMatch = text.match(/const USERS_DATA = (\[[\s\S]*?\]);/);
        if (usersMatch) {
            USERS_DATA = eval(usersMatch[1]);
        }
        
        // Extract AuthService from the file
        const authServiceMatch = text.match(/const AuthService = ([\s\S]*?);/);
        if (authServiceMatch) {
            AuthService = eval('(' + authServiceMatch[1] + ')');
        }
    } catch (error) {
        console.error('Error loading users data:', error);
        // Fallback data
        USERS_DATA = [
            {
                id: 1,
                email: "info@gmail.com",
                password: "123456",
                name: "Juan Pérez",
                role: "regular_user",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            {
                id: 2,
                email: "tech1@gmail.com",
                password: "123456",
                name: "María García",
                role: "technician",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            }
        ];
        
        AuthService = {
            login: function(email, password) {
                const user = USERS_DATA.find(u => u.email === email && u.password === password);
                if (user) {
                    const userData = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        avatar: user.avatar
                    };
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    return userData;
                }
                return null;
            },
            logout: function() {
                localStorage.removeItem('currentUser');
            },
            getCurrentUser: function() {
                const userData = localStorage.getItem('currentUser');
                return userData ? JSON.parse(userData) : null;
            },
            isLoggedIn: function() {
                return this.getCurrentUser() !== null;
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Load users data first
    await loadUsersData();
    
    // Elements
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // Current mode
    let currentMode = 'login';

    // ========================================
    // TOGGLE BETWEEN LOGIN AND REGISTER
    // ========================================

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            
            if (mode === currentMode) return;

            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update content based on mode
            if (mode === 'login') {
                switchToLogin();
            } else {
                switchToRegister();
            }

            currentMode = mode;
        });
    });

    function switchToLogin() {
        // Update title and subtitle
        authTitle.textContent = 'Sign In';
        authSubtitle.textContent = 'Welcome back to Recomputech';

        // Hide register form with animation
        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            
            // Show login form with animation
            setTimeout(() => {
                loginForm.style.opacity = '1';
                loginForm.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }

    function switchToRegister() {
        // Update title and subtitle
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Join the Recomputech community';

        // Hide login form with animation
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            
            // Show register form with animation
            setTimeout(() => {
                registerForm.style.opacity = '1';
                registerForm.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }

    // ========================================
    // USER TYPE SELECTION
    // ========================================

    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // Update active button
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Store selected type
            localStorage.setItem('selectedUserType', type);
        });
    });

    // ========================================
    // PASSWORD TOGGLE FUNCTIONALITY
    // ========================================

    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ========================================
    // FORM VALIDATION
    // ========================================

    // Login form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Attempt login with local data
        showNotification('Signing in...', 'info');
        
        const user = AuthService.login(email, password);
        
        if (user) {
            showNotification(`Welcome back, ${user.name}!`, 'success');
            setTimeout(() => {
                // Redirect based on user role
                if (user.role === 'technician') {
                    window.location.href = '../dashboard/Technician/dashboard-technician.html';
                } else if (user.role === 'admin') {
                    window.location.href = '../dashboard/Admin/dashboard-admin.html';
                } else {
                    // Regular user - redirect to home page
                    window.location.href = '../index.html';
                }
            }, 1500);
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });

    // Register form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (!agreeTerms) {
            showNotification('Please agree to the Terms of Service', 'error');
            return;
        }

        // Simulate registration process
        showNotification('Creating account...', 'info');
        
        // Here you would typically make an API call
        setTimeout(() => {
            showNotification('Account created successfully!', 'success');
            // Redirect to dashboard or home page
            // window.location.href = '../dashboard-user.html';
        }, 2000);
    });

    // ========================================
    // SOCIAL LOGIN HANDLERS
    // ========================================

    // Google login
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.textContent.trim().toLowerCase();
            showNotification(`Signing in with ${provider}...`, 'info');
            
            // Here you would implement actual social login
            setTimeout(() => {
                showNotification(`Successfully signed in with ${provider}!`, 'success');
            }, 1500);
        });
    });

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.auth-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `auth-notification auth-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function getNotificationColor(type) {
        switch (type) {
            case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
            case 'error': return 'linear-gradient(135deg, #ef4444, #dc2626)';
            case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
            default: return 'linear-gradient(135deg, #218DA6, #1b6e82)';
        }
    }

    // ========================================
    // ANIMATION STYLES
    // ========================================

    // Add animation styles to head
    const animationStyles = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .auth-form {
            transition: all 0.3s ease;
            opacity: 1;
            transform: translateX(0);
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);

    // ========================================
    // INITIALIZATION
    // ========================================

    // Set initial form visibility
    loginForm.style.opacity = '1';
    loginForm.style.transform = 'translateX(0)';
    registerForm.style.opacity = '0';
    registerForm.style.transform = 'translateX(20px)';

    // Load saved user type
    const savedUserType = localStorage.getItem('selectedUserType');
    if (savedUserType) {
        userTypeBtns.forEach(btn => {
            if (btn.dataset.type === savedUserType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1 small';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('is-invalid');
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('is-invalid');
}

function showSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Theme handling
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme); 