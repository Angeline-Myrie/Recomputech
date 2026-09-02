class DashboardContentComponent extends HTMLElement {
    constructor() {
        super();
        this.currentSection = 'overview';
        this.userData = null;
        this.externalPageUrl = null;
    }

    connectedCallback() {
        this.loadUserData();
        this.setupNavigation();
        this.setupExternalPageListener();
        const loadedExternalPage = this.loadPendingExternalPage();
        if (!loadedExternalPage) {
            this.loadSection();
        }
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
                this.externalPageUrl = null;
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
            if (section === this.currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupExternalPageListener() {
        document.addEventListener('dashboard-load-external', (e) => {
            const url = e.detail?.url;
            if (url) {
                this.loadExternalPage(url);
            }
        });
    }

    loadPendingExternalPage() {
        const pendingUrl = sessionStorage.getItem('dashboardExternalPage');
        if (pendingUrl) {
            sessionStorage.removeItem('dashboardExternalPage');
            this.loadExternalPage(pendingUrl);
            return true;
        }
        return false;
    }

    isValidSection(section) {
        const validSections = ['overview', 'marketplace', 'technicians', 'my-products', 'add-product', 'purchases', 'settings'];
        return validSections.includes(section);
    }

    loadSection() {
        // Ensure dashboard UI is restored when leaving external pages
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
                this.loadSell(); // Reutiliza el formulario de venta
                break;
            case 'purchases':
                this.loadPurchases();
                break;
            case 'settings':
                this.loadSettings();
                break;
            default:
                this.loadOverview();
        }

        this.updateActiveNavLink();
    }

    loadOverview() {
        this.innerHTML = `<overview-component></overview-component>`;
    }

    loadSell() {
        this.innerHTML = `
            <div class="dashboard-section" data-aos="fade-up">
                <!-- Welcome Section -->
                <section class="welcome-section" data-aos="fade-up">
                    <div class="welcome-header">
                        <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                            <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                            <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                            <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                        </div>

                        <div class="welcome-content">
                            <h1>Sell Your Products</h1>
                            <p>List your refurbished technology and reach thousands of buyers</p>
                        </div>
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
        this.innerHTML = `<my-purchases-component></my-purchases-component>`;
    }

    loadMyProducts() {
        this.innerHTML = `<my-products-component></my-products-component>`;
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
                <section class="welcome-section" data-aos="fade-up">
                    <div class="welcome-header">
                        <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                            <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                            <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                            <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                        </div>

                        <div class="welcome-content">
                            <h1 data-aos="fade-down" data-aos-delay="100">Account Settings</h1>
                            <p data-aos="fade-in" data-aos-delay="300">Manage your profile and preferences.</p>
                        </div>
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

    <!-- Profile Picture -->
    <div class="text-center mb-4">
        <div class="mb-3">
            <img 
                id="profilePreview"
                src="${this.userData?.avatar || 'https://via.placeholder.com/120?text=User'}"
                alt="Profile Picture"
                style="
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #218DA6;
                "
            >
        </div>

        <label for="profileImage" class="btn btn-outline-primary">
            <i class="fas fa-camera"></i> Choose Profile Picture
        </label>

        <input
            type="file"
            id="profileImage"
            accept="image/*"
            style="display: none;"
        >

        <p class="text-muted mt-2">
            Upload a JPG or PNG image
        </p>
    </div>

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
                                    <button 
                                    type="button"
                                    id="changePasswordBtn"
                                    class="btn btn-outline-primary w-100 mb-3">
                                        <i class="fas fa-key"></i> Change Password
                                    </button>
                                    <button 
    type="button"
    id="notificationSettingsBtn"
    class="btn btn-outline-secondary w-100 mb-3">
    <i class="fas fa-bell"></i> Notification Settings
</button>
                                    <button 
    type="button"
    id="logoutBtn"
    class="btn btn-outline-danger w-100">
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

    loadExternalPage(url) {
        this.externalPageUrl = url;
        if (url) {
            if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }

            // Hide dashboard footer and prevent double scrollbars on parent
            const dashboardFooter = document.querySelector('recomputech-footer');
            if (dashboardFooter) dashboardFooter.style.display = 'none';
            document.documentElement.style.overflowY = 'hidden';
            document.body.style.overflowY = 'hidden';

            // Render iframe with responsive height (fills viewport under header)
            this.innerHTML = `
                <iframe id="external-page-frame" src="${url}" style="width:100%;border:none;display:block;"></iframe>
            `;

            const adjustIframeHeight = () => {
                const header = document.querySelector('recomputech-header-auth') || document.querySelector('recomputech-header');
                const headerHeight = header ? header.getBoundingClientRect().height : 0;
                const iframe = this.querySelector('#external-page-frame');
                if (iframe) {
                    iframe.style.height = Math.max(0, window.innerHeight - headerHeight) + 'px';
                }
            };

            // Hide embedded page chrome if it is already rendered inside the iframe after load
            const iframe = this.querySelector('#external-page-frame');
            iframe.addEventListener('load', () => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const embeddedHeader = iframeDoc.querySelector('#headerContainer');
                    if (embeddedHeader) {
                        embeddedHeader.style.display = 'none';
                    }
                } catch (e) {
                    // Cross-origin iframe; rely on page-side embedded dashboard logic
                }
            });

            // Initial adjust and on resize
            adjustIframeHeight();
            window.addEventListener('resize', adjustIframeHeight, { passive: true });
            // Store handler for cleanup
            this._adjustIframeHeightHandler = adjustIframeHeight;
        } else {
            this.loadSection();
        }
    }

    cleanupExternalPageUI() {
        // Restore footer and scrolling if previously modified
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

   setupEventListeners() {

    // Quick action buttons
    this.addEventListener('click', (e) => {
        if (e.target.closest('.quick-action-btn[data-section]')) {
            e.preventDefault();

            const section = e.target
                .closest('.quick-action-btn[data-section]')
                .getAttribute('data-section');

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

    // Profile image preview
    this.addEventListener('change', (e) => {
        if (e.target.id === 'profileImage') {

            const file = e.target.files[0];

            if (file) {
                const preview = this.querySelector('#profilePreview');

                if (preview) {
                    preview.src = URL.createObjectURL(file);
                }
            }
        }
    });

    // Security buttons
this.addEventListener('click', (e) => {

    // Change Password
    if (e.target.closest('#changePasswordBtn')) {
        e.preventDefault();
        this.handleChangePassword();
    }

    // Notification Settings
    if (e.target.closest('#notificationSettingsBtn')) {
        e.preventDefault();
        this.handleNotificationSettings();
    }

    // Logout
    if (e.target.closest('#logoutBtn')) {
        e.preventDefault();
        this.handleLogout();
    }

});
}

async handleChangePassword() {
    try {
        if (!window.supabaseClient) {
            alert('Supabase is not configured.');
            return;
        }

        const newPassword = prompt('Enter your new password:');

        if (!newPassword) {
            return;
        }

        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        const { error } = await window.supabaseClient.auth.updateUser({
            password: newPassword
        });

        if (error) {
            throw error;
        }

        alert('Password changed successfully!');

    } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password: ' + error.message);
    }
}

handleNotificationSettings() {
    const currentSetting =
        localStorage.getItem('notificationsEnabled') !== 'false';

    const newSetting = confirm(
        currentSetting
            ? 'Notifications are currently ON.\n\nDo you want to turn them OFF?'
            : 'Notifications are currently OFF.\n\nDo you want to turn them ON?'
    );

    localStorage.setItem(
        'notificationsEnabled',
        newSetting ? 'true' : 'false'
    );

    alert(
        newSetting
            ? 'Notifications enabled!'
            : 'Notifications disabled!'
    );
}

handleLogout() {
    const confirmLogout = confirm(
        'Are you sure you want to log out?'
    );

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');

    window.location.href = '/index.html';
}
    async handleSellForm(form) {
    try {
        if (!window.supabaseClient) {
            alert('Supabase is not configured.');
            return;
        }

        // Obtener el usuario que inició sesión
        const currentUser = JSON.parse(
            localStorage.getItem('currentUser')
        );

        if (!currentUser || !currentUser.userId) {
            alert('You must be logged in to list a product.');
            return;
        }

        // Obtener información del formulario
        const name = form.querySelector('#productName').value.trim();
        const category = form.querySelector('#productCategory').value;
        const price = form.querySelector('#productPrice').value;
        const description = form.querySelector('#productDescription').value.trim();

        // Guardar el producto en Supabase
        const { data, error } = await window.supabaseClient
            .from('products')
            .insert({
                seller_id: currentUser.userId,
                name: name,
                category: category,
                price: Number(price),
                description: description,
                status: 'available'
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        alert('Product listed successfully!');

        // Limpiar formulario
        form.reset();

        console.log('Product created:', data);

        // Ir a My Products
        window.location.hash = 'my-products';

    } catch (error) {
        console.error('Error creating product:', error);
        alert('Error creating product: ' + error.message);
    }
}

   async handleProfileForm(form) {
    try {
        if (!window.supabaseClient) {
            alert('Supabase is not configured.');
            return;
        }

        const currentUser = JSON.parse(
            localStorage.getItem('currentUser')
        );

        if (!currentUser) {
            alert('You must be logged in.');
            return;
        }

        const firstName = form.querySelector('#firstName').value.trim();
        const lastName = form.querySelector('#lastName').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const address = form.querySelector('#address').value.trim();

        const imageInput = this.querySelector('#profileImage');
        const file = imageInput?.files[0];

        let avatarUrl = currentUser.avatar || '';

        // SUBIR NUEVA FOTO SI EL USUARIO SELECCIONÓ UNA
        if (file) {

            const userId = currentUser.userId || currentUser.id;

            const fileExtension = file.name.split('.').pop();

            const fileName =
                `${userId}-${Date.now()}.${fileExtension}`;

            const filePath = `profiles/${fileName}`;

            const { error: uploadError } =
                await window.supabaseClient
                    .storage
                    .from('avatars')
                    .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Obtener URL pública
            const { data: publicUrlData } =
                window.supabaseClient
                    .storage
                    .from('avatars')
                    .getPublicUrl(filePath);

            avatarUrl = publicUrlData.publicUrl;
        }

        // ACTUALIZAR USUARIO EN LA BASE DE DATOS
        const { data, error } =
            await window.supabaseClient
                .from('users')
                .update({
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                    address: address,
                    avatar: avatarUrl
                })
                .eq('email', currentUser.email)
                .select()
                .single();

        if (error) {
            throw error;
        }

        // ACTUALIZAR LOCALSTORAGE
        const updatedUser = {
            ...currentUser,
            firstName: data.first_name,
            lastName: data.last_name,
            name: `${data.first_name} ${data.last_name}`.trim(),
            phone: data.phone || '',
            address: data.address || '',
            avatar: data.avatar || ''
        };

        localStorage.setItem(
            'currentUser',
            JSON.stringify(updatedUser)
        );
        // Actualizar el header con la nueva información
const header = document.querySelector('recomputech-header-auth');

if (header) {
    header.remove();
    
    const headerContainer = document.getElementById('headerContainer');

    if (headerContainer) {
        headerContainer.innerHTML =
            '<recomputech-header-auth></recomputech-header-auth>';
    }
}

        this.userData = updatedUser;

        alert('Profile updated successfully!');

        console.log('Updated profile:', data);

    } catch (error) {

        console.error('Error updating profile:', error);

        alert(
            'Error updating profile: ' + error.message
        );
    }
}
}

customElements.define('dashboard-content-component', DashboardContentComponent); 