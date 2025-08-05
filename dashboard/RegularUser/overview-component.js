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
            <section class="welcome-section" data-aos="fade-up">
                <div class="welcome-header">
                    <div class="welcome-text">
                        <h1>¡Bienvenido de vuelta, <span id="userName">${this.userData?.name || 'Usuario'}</span>! 👋</h1>
                        <p>Aquí tienes un resumen de tu actividad en Recomputech</p>
                    </div>
                    <div class="welcome-actions">
                        <button class="btn btn-light" onclick="window.location.href='/pages/marketplace.html'">
                            <i class="fas fa-shopping-cart"></i>
                            Explorar Productos
                        </button>
                    </div>
                </div>
            </section>

            <!-- Stats Cards Row 1 -->
            <section class="stats-section" data-aos="fade-up" data-aos-delay="100">
                <div class="stats-row d-flex flex-row flex-wrap justify-content-between align-items-stretch mb-4">
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-header">
                            <h4>Tiempo en el Perfil</h4>
                            <div class="stat-change positive">+${Math.floor(Math.random() * 10) + 1}%</div>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.timeInProfile}</h3>
                            <p>Días desde tu registro</p>
                        </div>
                        <div class="stat-chart">
                            <canvas id="timeChart" width="200" height="60"></canvas>
                        </div>
                    </div>
                    
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-header">
                            <h4>Compras Realizadas</h4>
                            <div class="stat-change positive">+${Math.floor(Math.random() * 20) + 5}%</div>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.totalPurchases}</h3>
                            <p>Total de compras</p>
                        </div>
                        <div class="stat-chart">
                            <canvas id="purchasesChart" width="200" height="60"></canvas>
                        </div>
                    </div>
                    
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-header">
                            <h4>Productos Vendidos</h4>
                            <div class="stat-change positive">+${Math.floor(Math.random() * 15) + 3}%</div>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.totalSales}</h3>
                            <p>Total de ventas</p>
                        </div>
                        <div class="stat-chart">
                            <canvas id="salesChart" width="200" height="60"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats Cards Row 2 -->
            <section class="stats-section" data-aos="fade-up" data-aos-delay="150">
                <div class="stats-row d-flex flex-row flex-wrap justify-content-between align-items-stretch mb-4">
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-header">
                            <h4>Técnicos Contactados</h4>
                            <div class="stat-change positive">+${Math.floor(Math.random() * 8) + 2}%</div>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.techniciansContacted}</h3>
                            <p>Servicios solicitados</p>
                        </div>
                        <div class="stat-chart">
                            <canvas id="techniciansChart" width="200" height="60"></canvas>
                        </div>
                    </div>
                    
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-header">
                            <h4>Dinero Gastado</h4>
                            <div class="stat-change positive">+${Math.floor(Math.random() * 12) + 3}%</div>
                        </div>
                        <div class="stat-content">
                            <h3>B/. ${this.stats.totalSpent.toFixed(2)}</h3>
                            <p>Total invertido</p>
                        </div>
                        <div class="stat-chart">
                            <canvas id="spentChart" width="200" height="60"></canvas>
                        </div>
                    </div>
                    
                    <div class="stat-card flex-fill mx-2 mb-3">
                        <div class="stat-header">
                            <h4>Dinero Ganado</h4>
                            <div class="stat-change positive">+${Math.floor(Math.random() * 18) + 5}%</div>
                        </div>
                        <div class="stat-content">
                            <h3>B/. ${this.stats.totalEarned.toFixed(2)}</h3>
                            <p>Total ganado</p>
                        </div>
                        <div class="stat-chart">
                            <canvas id="earnedChart" width="200" height="60"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Charts Section -->
            <section class="charts-section" data-aos="fade-up" data-aos-delay="200">
                <div class="row">
                    <div class="col-lg-8 mb-4">
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
                    
                    <div class="col-lg-4 mb-4">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h4><i class="fas fa-chart-pie"></i> Distribución de Gastos</h4>
                                <p>¿En qué gastas tu dinero?</p>
                            </div>
                            <div class="chart-body">
                                <canvas id="expensesChart" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Recent Activity -->
            <section class="activity-section" data-aos="fade-up" data-aos-delay="250">
                <div class="card activity-card">
                    <div class="card-header">
                        <h3><i class="fas fa-history"></i> Actividad Reciente</h3>
                    </div>
                    <div class="card-body">
                        <ul class="activity-list" id="activityList">
                            <li class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <div class="activity-content">
                                    <h5>Compra realizada</h5>
                                    <p>Compraste "Laptop Gaming HP Victus" por B/. 850.00</p>
                                    <span class="activity-time">Hace 2 días</span>
                                </div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-box"></i>
                                </div>
                                <div class="activity-content">
                                    <h5>Producto vendido</h5>
                                    <p>Vendiste "PC Refurbished Dell" por B/. 450.00</p>
                                    <span class="activity-time">Hace 5 días</span>
                                </div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-tools"></i>
                                </div>
                                <div class="activity-content">
                                    <h5>Contacto con técnico</h5>
                                    <p>Contactaste a María García para reparación</p>
                                    <span class="activity-time">Hace 1 semana</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Quick Actions -->
            <section class="quick-actions-section" data-aos="fade-up" data-aos-delay="300">
                <div class="quick-actions-card">
                    <div class="card-header">
                        <h3><i class="fas fa-bolt"></i> Acciones Rápidas</h3>
                    </div>
                    <div class="card-body">
                        <div class="quick-actions">
                            <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/sell.html'">
                                <i class="fas fa-plus-circle"></i>
                                <span>Vender Producto</span>
                            </button>
                            <button class="quick-action-btn" onclick="window.location.href='/dashboard/RegularUser/cart.html'">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Ver Carrito</span>
                            </button>
                            <button class="quick-action-btn" onclick="window.location.href='/pages/marketplace.html'">
                                <i class="fas fa-search"></i>
                                <span>Explorar Productos</span>
                            </button>
                            <button class="quick-action-btn" onclick="window.location.href='/pages/technicians.html'">
                                <i class="fas fa-tools"></i>
                                <span>Buscar Técnicos</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
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
                this.createExpensesChart();
            }
        }, 500);
    }

    createMiniCharts() {
        // Mini chart para tiempo en perfil
        const timeCtx = document.getElementById('timeChart');
        if (timeCtx) {
            new Chart(timeCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        data: [0, 15, 30, 45, 60, this.stats.timeInProfile],
                        borderColor: '#218DA6',
                        backgroundColor: 'rgba(33, 141, 166, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { point: { radius: 0 } }
                }
            });
        }

        // Mini chart para compras
        const purchasesCtx = document.getElementById('purchasesChart');
        if (purchasesCtx) {
            new Chart(purchasesCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        data: [2, 4, 3, 6, 8, this.stats.totalPurchases],
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { point: { radius: 0 } }
                }
            });
        }

        // Mini chart para ventas
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        data: [1, 3, 2, 5, 6, this.stats.totalSales],
                        borderColor: '#ffc107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { point: { radius: 0 } }
                }
            });
        }

        // Mini chart para técnicos
        const techniciansCtx = document.getElementById('techniciansChart');
        if (techniciansCtx) {
            new Chart(techniciansCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        data: [0, 1, 2, 3, 4, this.stats.techniciansContacted],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { point: { radius: 0 } }
                }
            });
        }

        // Mini chart para dinero gastado
        const spentCtx = document.getElementById('spentChart');
        if (spentCtx) {
            new Chart(spentCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        data: [200, 350, 280, 450, 600, this.stats.totalSpent],
                        borderColor: '#6f42c1',
                        backgroundColor: 'rgba(111, 66, 193, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { point: { radius: 0 } }
                }
            });
        }

        // Mini chart para dinero ganado
        const earnedCtx = document.getElementById('earnedChart');
        if (earnedCtx) {
            new Chart(earnedCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        data: [150, 250, 200, 350, 400, this.stats.totalEarned],
                        borderColor: '#20c997',
                        backgroundColor: 'rgba(32, 201, 151, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { point: { radius: 0 } }
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
                        label: 'Compras',
                        data: [3, 5, 2, 8, 4, 6],
                        backgroundColor: 'rgba(33, 141, 166, 0.7)',
                        borderColor: '#218DA6',
                        borderWidth: 1
                    }, {
                        label: 'Ventas',
                        data: [2, 3, 4, 5, 6, 7],
                        backgroundColor: 'rgba(255, 193, 7, 0.7)',
                        borderColor: '#ffc107',
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

    createExpensesChart() {
        const ctx = document.getElementById('expensesChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Laptops', 'PCs', 'Accesorios', 'Servicios'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: [
                            '#218DA6',
                            '#28a745',
                            '#ffc107',
                            '#dc3545'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15
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