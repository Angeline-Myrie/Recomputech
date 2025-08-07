class OverviewComponent extends HTMLElement {
    constructor() {
        super();
        this.userData = null;
        this.stats = {
            timeInProfile: 0,
            totalPurchases: 0,
            totalSales: 0,
            techniciansContacted: 0,
            totalSpent: 0,
            totalEarned: 0,
            activeListings: 0,
            reviewsGiven: 0
        };
    }

    connectedCallback() {
        this.loadUserData();
        this.generateMockData();
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

    generateMockData() {
        // Generar datos simulados basados en el usuario
        const userId = this.userData?.id || 1;
        
        // Tiempo en el perfil (días desde registro)
        const registrationDate = new Date(2024, 0, 15); // 15 de enero 2024
        const today = new Date();
        this.stats.timeInProfile = Math.floor((today - registrationDate) / (1000 * 60 * 60 * 24));
        
        // Datos simulados basados en el ID del usuario
        this.stats.totalPurchases = 12 + (userId * 3);
        this.stats.totalSales = 8 + (userId * 2);
        this.stats.techniciansContacted = 5 + userId;
        this.stats.totalSpent = 1250.50 + (userId * 150);
        this.stats.totalEarned = 890.75 + (userId * 100);
        this.stats.activeListings = 3 + (userId % 3);
        this.stats.reviewsGiven = 7 + (userId * 2);
    }

    render() {
        this.innerHTML = `
            <!-- Welcome Section -->
            <section class="welcome-section" data-aos="fade-up" style="width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; margin-top: 2.5rem; padding-top: 3.5rem;">
                <div class="welcome-header" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 260px; background: linear-gradient(135deg, #218DA6 0%, #1b6e82 100%); border-radius: 0 0 32px 32px; margin-bottom: 2.5rem; width: 100vw;">
                    <h1 style="font-size: 4rem; font-weight: 800; color: #fff; margin-bottom: 1rem; text-align: center; letter-spacing: -2px;">Welcome</h1>
                    <p data-aos="fade-in" data-aos-delay="200" style="font-size: 1.5rem; color: #e0f7fa; margin-bottom: 0; text-align: center; max-width: 600px;">
                        Here is a summary of your activity on Recomputech
                    </p>
                    <div class="welcome-user" style="margin-top: 1.5rem;">
                        <span style="font-size: 1.2rem; color: #fff; opacity: 0.85;">${this.userData?.name ? 'Hello, ' + this.userData.name + '!' : ''}</span>
                    </div>
                </div>
            </section>

            <!-- Stats Cards Single Row -->
            <section class="stats-section" data-aos="fade-up" data-aos-delay="100" style="margin-top: 2.5rem;">
                <div class="container-fluid">
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
                                    <h4>Technicians Contacted</h4>
                                </div>
                                <div class="stat-content">
                                    <h3>${this.stats.techniciansContacted}</h3>
                                    <p>Services requested</p>
                                </div>
                                <div class="stat-chart">
                                    <canvas id="techniciansChart" width="200" height="100"></canvas>
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
                                        <li class="activity-item">
                                            <div class="activity-icon">
                                                <i class="fas fa-shopping-cart"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h5>Purchase made</h5>
                                                <p>You bought "HP Victus Gaming Laptop" for $850.00</p>
                                                <span class="activity-time">2 days ago</span>
                                            </div>
                                        </li>
                                        <li class="activity-item">
                                            <div class="activity-icon">
                                                <i class="fas fa-box"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h5>Product sold</h5>
                                                <p>You sold "Refurbished Dell PC" for $450.00</p>
                                                <span class="activity-time">5 days ago</span>
                                            </div>
                                        </li>
                                        <li class="activity-item">
                                            <div class="activity-icon">
                                                <i class="fas fa-tools"></i>
                                            </div>
                                            <div class="activity-content">
                                                <h5>Contacted technician</h5>
                                                <p>You contacted María García for repair</p>
                                                <span class="activity-time">1 week ago</span>
                                            </div>
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
                                        <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/sell.html'">
                                            <i class="fas fa-plus-circle"></i>
                                            <span>Sell Product</span>
                                        </button>
                                        <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/cart.html'">
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
        // Add any specific event listeners for overview
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
                        data: [5, 10, 15, 20, 25, this.stats.timeInProfile],
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
                        data: [2, 4, 6, 8, 10, this.stats.totalPurchases],
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
                        data: [1, 3, 5, 7, 9, this.stats.totalSales],
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
                        data: [1, 2, 3, 4, 5, this.stats.techniciansContacted],
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
                        data: [3, 5, 2, 8, 4, 6],
                        backgroundColor: 'rgba(33, 141, 166, 0.7)', // azul principal
                        borderColor: '#218DA6',
                        borderWidth: 1
                    }, {
                        label: 'Sales',
                        data: [2, 3, 4, 5, 6, 7],
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