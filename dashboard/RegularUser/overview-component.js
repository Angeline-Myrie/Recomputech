class OverviewComponent extends HTMLElement {
    constructor() {
        super();
        this.userData = null;
        this.stats = {
            timeInProfile: 0,
            totalPurchases: 0,
            totalSales: 0,
            totalProducts: 0,
            techniciansContacted: 0,
            totalSpent: 0,
            totalEarned: 0,
            activeListings: 0,
            reviewsGiven: 0
        };
    }

    async connectedCallback() {
        this.loadUserData();
        await this.loadUserStats();
        this.render();
        this.setupEventListeners();
        this.initializeCharts();
    }

    loadUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.userData = currentUser;
        }
    }

 async loadUserStats() {
    try {
        const currentUser = JSON.parse(
            localStorage.getItem('currentUser')
        );

        // Calcular días desde el registro
        const registrationDate =
            currentUser?.createdAt || currentUser?.created_at;

        const today = new Date();

        this.stats.timeInProfile = registrationDate
            ? Math.max(
                0,
                Math.floor(
                    (today - new Date(registrationDate)) /
                    (1000 * 60 * 60 * 24)
                )
            )
            : 0;

        // Verificar Supabase
        if (!window.supabaseClient) {
            console.error('Supabase client is not available.');
            return;
        }

        // Verificar usuario
        if (!currentUser || !currentUser.userId) {
            console.error('No authenticated user found.');
            return;
        }

        // Contar productos reales del usuario
        const { count, error } = await window.supabaseClient
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('seller_id', currentUser.userId);

        if (error) {
            throw error;
        }

        this.stats.totalProducts = count || 0;

    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

    render() {
        this.innerHTML = `
            <!-- Welcome Section -->
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <!-- Animated background elements -->
                    <div class="welcome-bg-elements" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
                        <div class="floating-circle" style="position: absolute; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; top: 20%; left: 10%; animation: float 6s ease-in-out infinite;"></div>
                        <div class="floating-circle" style="position: absolute; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%; top: 60%; right: 15%; animation: float 8s ease-in-out infinite reverse;"></div>
                        <div class="floating-circle" style="position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.06); border-radius: 50%; bottom: 20%; left: 20%; animation: float 7s ease-in-out infinite;"></div>
                    </div>
                    
                    <!-- Main content -->
                    <div class="welcome-content">
                        <h1 data-aos="fade-down" data-aos-delay="100">
                            Welcome
                        </h1>
                        <p data-aos="fade-in" data-aos-delay="300">
                            Here is a summary of your activity on <span style="font-weight: 600; color: #fff;">Recomputech</span>
                        </p>
                        <div class="welcome-user" data-aos="fade-up" data-aos-delay="400">
                            <span>
                                ${this.userData?.name ? 'Hello, ' + this.userData.name + '! 👋' : 'Welcome back! 👋'}
                            </span>
                        </div>
                        
                        <!-- Animated stats preview -->
                        <div class="welcome-stats-preview" data-aos="fade-up" data-aos-delay="500">

                            <div class="stat-preview">
                            <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem;">
            ${this.stats.totalProducts}
        </div>
        <div style="font-size: 0.8rem; opacity: 0.8;">
            Products
        </div>
    </div>

    <div class="stat-preview">
        <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem;">
            ${this.stats.totalPurchases}
        </div>
        <div style="font-size: 0.8rem; opacity: 0.8;">
            Purchases
        </div>
    </div>

    <div class="stat-preview">
        <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem;">
            ${this.stats.totalSales}
        </div>
        <div style="font-size: 0.8rem; opacity: 0.8;">
            Sales
        </div>
    </div>

</div>
                    </div>
                </div>
            </section>

            <!-- Stats Cards Single Row -->
            <section class="stats-section" data-aos="fade-up" data-aos-delay="100">
                <div class="stats-row">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 col-md-6 col-12 mb-4">
                            <div class="stat-card h-100">
                                <div class="stat-header">
                                    <h4>Time on Profile</h4>
                                </div>
                                <div class="stat-content">
                                    <h3>${this.stats.timeInProfile}</h3>
                                    <p>Days since registration</p>
                                </div>
                                <div class="stat-chart">
                                    <canvas id="timeChart" width="200" height="100"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12 mb-4">
                            <div class="stat-card h-100">
                                <div class="stat-header">
                                    <h4>Purchases Made</h4>
                                </div>
                                <div class="stat-content">
                                    <h3>${this.stats.totalPurchases}</h3>
                                    <p>Total purchases</p>
                                </div>
                                <div class="stat-chart">
                                    <canvas id="purchasesChart" width="200" height="100"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12 mb-4">
                            <div class="stat-card h-100">
                                <div class="stat-header">
                                    <h4>Products Sold</h4>
                                </div>
                                <div class="stat-content">
                                    <h3>${this.stats.totalSales}</h3>
                                    <p>Total sales</p>
                                </div>
                                <div class="stat-chart">
                                    <canvas id="salesChart" width="200" height="100"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12 mb-4">
                            <div class="stat-card h-100">
                                <div class="stat-header">
                                    <h4>My Products</h4>
                                </div>
                                <div class="stat-content">
                                    <h3>${this.stats.totalProducts}</h3>
                                    <p>Total Products listed</p>
                                </div>
                                <div class="stat-chart">
                                    <canvas id="productsChart" width="200" height="100"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Charts Section (solo actividad mensual) -->
            <section class="charts-section" data-aos="fade-up" data-aos-delay="200">
                <div class="row">
                    <div class="col-lg-12 mb-4">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h4><i class="fas fa-chart-line"></i> Actividad Mensual</h4>
                                <p>Análisis de compras y ventas por mes</p>
                            </div>
                            <div class="chart-body">
                                <canvas id="monthlyActivityChart" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Recent Activity & Quick Actions Row -->
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-12 mb-4">
                        <section class="activity-section" data-aos="fade-up" data-aos-delay="250" style="height: 100%;">
                            <div class="card activity-card h-100">
                                <div class="card-header">
                                    <h3><i class="fas fa-history"></i> Recent Activity</h3>
                                </div>
                                <div class="card-body">
                                    <ul class="activity-list" id="activityList">
                                        <li class="activity-empty">
                                            <i class="fas fa-clock"></i>
                                            <p>Your activity will appear here.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="col-lg-6 col-12 mb-4">
                        <section class="quick-actions-section" data-aos="fade-up" data-aos-delay="300" style="height: 100%;">
                            <div class="quick-actions-card h-100">
                                <div class="card-header">
                                    <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                                </div>
                                <div class="card-body">
                                    <div class="quick-actions">
                                        <button class="quick-action-btn" data-action="sell" type="button">
                                            <i class="fas fa-plus-circle"></i>
                                            <span>Sell Product</span>
                                        </button>
                                        <button class="quick-action-btn" data-action="cart" type="button">
                                            <i class="fas fa-shopping-cart"></i>
                                            <span>View Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.addEventListener('click', (event) => {
            const action = event.target.closest('.quick-action-btn')?.dataset.action;
            if (action === 'sell') {
                window.location.hash = 'add-product';
            }
            if (action === 'cart') {
                document.querySelector('recomputech-header-auth')?.handleCartClick();
            }
        });
    }

    initializeCharts() {
        setTimeout(() => {
            if (window.Chart) {
                this.createMiniCharts();
                this.createMonthlyActivityChart();
            }
        }, 500);
    }

    createMiniCharts() {
        // Mini chart para tiempo en el perfil
        const timeCtx = document.getElementById('timeChart');
        if (timeCtx) {
            new Chart(timeCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        data: [0, 0, 0, 0, 0, this.stats.timeInProfile],
                        backgroundColor: '#218DA6', // azul principal
                        borderRadius: 8,
                        maxBarThickness: 18
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
        // Mini chart para compras realizadas
        const purchasesCtx = document.getElementById('purchasesChart');
        if (purchasesCtx) {
            new Chart(purchasesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        data: [0, 0, 0, 0, 0, this.stats.totalPurchases],
                        backgroundColor: '#1b6e82', // azul secundario
                        borderRadius: 8,
                        maxBarThickness: 18
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
        // Mini chart para productos vendidos
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        data: [0, 0, 0, 0, 0, this.stats.totalSales],
                        backgroundColor: '#155a6b', // acento
                        borderRadius: 8,
                        maxBarThickness: 18
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
        // Mini chart para técnicos contactados
        const techniciansCtx = document.getElementById('techniciansChart');
        if (techniciansCtx) {
            new Chart(techniciansCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        data: [0, 0, 0, 0, 0, this.stats.techniciansContacted],
                        backgroundColor: '#218DA6', // azul principal (repetido para consistencia)
                        borderRadius: 8,
                        maxBarThickness: 18
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
    }

    createMonthlyActivityChart() {
        const ctx = document.getElementById('monthlyActivityChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                    datasets: [{
                        label: 'Purchases',
                        data: [0, 0, 0, 0, 0, this.stats.totalPurchases],
                        backgroundColor: 'rgba(33, 141, 166, 0.7)', // azul principal
                        borderColor: '#218DA6',
                        borderWidth: 1
                    }, {
                        label: 'Sales',
                        data: [0, 0, 0, 0, 0, this.stats.totalSales],
                        backgroundColor: 'rgba(27, 110, 130, 0.7)', // azul secundario
                        borderColor: '#1b6e82',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    updateStats(stats) {
        if (stats.purchases !== undefined) {
            this.stats.totalPurchases = stats.purchases;
            this.querySelector('#totalPurchases').textContent = stats.purchases;
        }
        if (stats.listings !== undefined) {
            this.stats.activeListings = stats.listings;
            this.querySelector('#activeListings').textContent = stats.listings;
        }
        if (stats.reviews !== undefined) {
            this.stats.reviewsGiven = stats.reviews;
            this.querySelector('#totalReviews').textContent = stats.reviews;
        }
        if (stats.spent !== undefined) {
            this.stats.totalSpent = stats.spent;
            this.querySelector('#totalSpent').textContent = `B/. ${stats.spent.toFixed(2)}`;
        }
    }

    addActivity(activity) {
        const activityList = this.querySelector('#activityList');
        const activityItem = document.createElement('li');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${activity.icon || 'info-circle'}"></i>
            </div>
            <div class="activity-content">
                <h5>${activity.title}</h5>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.insertBefore(activityItem, activityList.firstChild);
    }
}

customElements.define('overview-component', OverviewComponent); 