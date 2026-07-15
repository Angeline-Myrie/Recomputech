// ========================================
// TECHNICIAN AUTHENTICATION
// ========================================

let USERS_DATA = [];
let AuthService = {};

async function loadUsersData() {
    try {
        const response = await fetch('../auth/users-data.js');
        const text = await response.text();

        const usersMatch = text.match(/const USERS_DATA = (\[[\s\S]*?\]);/);
        if (usersMatch) {
            USERS_DATA = eval(usersMatch[1]);
        }

        const authServiceMatch = text.match(/const AuthService = ([\s\S]*?);/);
        if (authServiceMatch) {
            AuthService = eval('(' + authServiceMatch[1] + ')');
        }
    } catch (error) {
        console.error('Error loading users data:', error);
    }

    mergeRegisteredUsers();
}

function mergeRegisteredUsers() {
    const registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    registered.forEach(user => {
        if (!USERS_DATA.find(u => u.email === user.email)) {
            USERS_DATA.push(user);
        }
    });
}

function getTechnicianProfiles() {
    return JSON.parse(localStorage.getItem('technicianProfiles') || '[]');
}

function saveTechnicianProfile(profile) {
    const profiles = getTechnicianProfiles();
    profiles.push(profile);
    localStorage.setItem('technicianProfiles', JSON.stringify(profiles));
}

function registerTechnicianUser(userRecord) {
    const registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    registered.push(userRecord);
    localStorage.setItem('registeredUsers', JSON.stringify(registered));
    USERS_DATA.push(userRecord);
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.auth-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

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

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

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

document.addEventListener('DOMContentLoaded', async function() {
    await loadUsersData();

    const urlParams = new URLSearchParams(window.location.search);
    const initialMode = urlParams.get('mode') === 'register' ? 'register' : 'login';

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const profilePhotoInput = document.getElementById('profilePhoto');
    const profilePhotoPreview = document.getElementById('profilePhotoPreview');
    const profilePhotoImg = document.getElementById('profilePhotoImg');
    const removeProfilePhotoBtn = document.getElementById('removeProfilePhoto');
    const certificationPhotosInput = document.getElementById('certificationPhotos');
    const certificationPhotosPreview = document.getElementById('certificationPhotosPreview');

    let currentMode = initialMode;
    let profilePhotoData = null;
    let certificationPhotoData = [];

    toggleBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === initialMode);
    });

    if (initialMode === 'register') {
        loginForm.style.display = 'none';
        loginForm.style.opacity = '0';
        registerForm.style.display = 'block';
        registerForm.style.opacity = '1';
        registerForm.style.transform = 'translateX(0)';
        authTitle.textContent = 'Create Technician Profile';
        authSubtitle.textContent = 'Join our network of certified professionals';
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            if (mode === currentMode) return;

            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (mode === 'login') {
                switchToLogin();
            } else {
                switchToRegister();
            }

            currentMode = mode;
        });
    });

    function switchToLogin() {
        authTitle.textContent = 'Technician Sign In';
        authSubtitle.textContent = 'Access your technician dashboard';

        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(20px)';

        setTimeout(() => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            setTimeout(() => {
                loginForm.style.opacity = '1';
                loginForm.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }

    function switchToRegister() {
        authTitle.textContent = 'Create Technician Profile';
        authSubtitle.textContent = 'Join our network of certified professionals';

        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            setTimeout(() => {
                registerForm.style.opacity = '1';
                registerForm.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }

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

    profilePhotoInput.addEventListener('change', async function() {
        const file = this.files[0];
        if (!file) return;

        profilePhotoData = await readFileAsDataURL(file);
        profilePhotoImg.src = profilePhotoData;
        profilePhotoPreview.hidden = false;
    });

    removeProfilePhotoBtn.addEventListener('click', function() {
        profilePhotoData = null;
        profilePhotoInput.value = '';
        profilePhotoPreview.hidden = true;
        profilePhotoImg.src = '';
    });

    certificationPhotosInput.addEventListener('change', async function() {
        const files = Array.from(this.files);
        certificationPhotoData = [];

        for (const file of files) {
            certificationPhotoData.push(await readFileAsDataURL(file));
        }

        certificationPhotosPreview.innerHTML = certificationPhotoData.map((src, index) => `
            <div class="photo-preview-item">
                <img src="${src}" alt="Certification ${index + 1}">
            </div>
        `).join('');
    });

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

        showNotification('Signing in...', 'info');

        const user = AuthService.login(email, password);

        if (user && user.role === 'technician') {
            showNotification(`Welcome back, ${user.name}!`, 'success');
            setTimeout(() => {
                window.location.href = '../dashboard/Technician/dashboard-technician.html';
            }, 1500);
        } else if (user && user.role !== 'technician') {
            AuthService.logout();
            showNotification('This account is not registered as a technician. Please use the regular sign-in page.', 'error');
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const experienceDescription = document.getElementById('experienceDescription').value.trim();
        const specialty = document.getElementById('specialty').value.trim();
        const experienceYears = document.getElementById('experienceYears').value;
        const location = document.getElementById('location').value.trim();
        const agreeTerms = document.getElementById('agreeTerms').checked;
        const technologies = getCheckedValues('technologies');
        const products = getCheckedValues('products');

        if (!firstName || !lastName || !email || !password || !confirmPassword || !experienceDescription || !specialty || !experienceYears || !location) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!isValidPassword(password)) {
            showNotification('Password must be at least 8 characters with uppercase, lowercase, and numbers', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (technologies.length === 0) {
            showNotification('Please select at least one technology', 'error');
            return;
        }

        if (products.length === 0) {
            showNotification('Please select at least one product category', 'error');
            return;
        }

        if (!agreeTerms) {
            showNotification('Please agree to the Terms of Service', 'error');
            return;
        }

        if (USERS_DATA.some(user => user.email === email)) {
            showNotification('An account with this email already exists', 'error');
            return;
        }

        showNotification('Creating your technician profile...', 'info');

        const certifications = document.getElementById('certifications').value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);

        const languages = document.getElementById('languages').value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);

        const newUserId = Date.now();
        const avatar = profilePhotoData || 'https://via.placeholder.com/150/218DA6/ffffff?text=' + encodeURIComponent(firstName.charAt(0));

        const userRecord = {
            id: newUserId,
            email,
            password,
            name: `${firstName} ${lastName}`,
            role: 'technician',
            avatar
        };

        const technicianProfile = {
            userId: newUserId,
            firstName,
            lastName,
            email,
            specialty,
            experienceYears: Number(experienceYears),
            location,
            description: experienceDescription,
            certifications,
            certificationPhotos: certificationPhotoData,
            profilePhoto: avatar,
            technologies,
            products,
            languages,
            availability: document.getElementById('availability').value.trim(),
            hourlyRate: document.getElementById('hourlyRate').value ? Number(document.getElementById('hourlyRate').value) : null,
            professionalInfo: document.getElementById('professionalInfo').value.trim(),
            status: 'pending_review',
            createdAt: new Date().toISOString()
        };

        registerTechnicianUser(userRecord);
        saveTechnicianProfile(technicianProfile);

        AuthService.login(email, password);

        showNotification('Technician profile created successfully!', 'success');
        setTimeout(() => {
            window.location.href = '../dashboard/Technician/dashboard-technician.html';
        }, 1500);
    });

    const animationStyles = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
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

    loginForm.style.opacity = initialMode === 'login' ? '1' : '0';
    loginForm.style.transform = 'translateX(0)';
    registerForm.style.opacity = initialMode === 'register' ? '1' : '0';
    registerForm.style.transform = initialMode === 'register' ? 'translateX(0)' : 'translateX(20px)';

    document.documentElement.style.scrollBehavior = 'smooth';
});

const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);
