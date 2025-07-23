// Local Users Database
const USERS_DATA = [
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
    },
    {
        id: 3,
        email: "user1@gmail.com",
        password: "123456",
        name: "Carlos López",
        role: "regular_user",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 4,
        email: "tech2@gmail.com",
        password: "123456",
        name: "Ana Rodríguez",
        role: "technician",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 5,
        email: "admin@gmail.com",
        password: "123456",
        name: "Admin User",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
];

// Authentication functions
const AuthService = {
    // Login function
    login: function(email, password) {
        const user = USERS_DATA.find(u => u.email === email && u.password === password);
        if (user) {
            // Store user data in localStorage (without password for security)
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

    // Logout function
    logout: function() {
        localStorage.removeItem('currentUser');
    },

    // Get current user
    getCurrentUser: function() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    // Check if user is logged in
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },

    // Check if user is technician
    isTechnician: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'technician';
    },

    // Check if user is admin
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
}; 