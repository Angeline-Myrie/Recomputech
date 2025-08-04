// Modo oscuro/claro
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.remove('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Sidebar colapsable
  const sidebar = document.getElementById('sidebar');
  const collapseSidebar = document.getElementById('collapseSidebar');
  if (collapseSidebar) {
    collapseSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      collapseSidebar.querySelector('i').classList.toggle('fa-angle-double-left');
      collapseSidebar.querySelector('i').classList.toggle('fa-angle-double-right');
    });
  }
  // Sidebar responsive (móvil)
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapseSidebar');
  
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
      });
    }
  });

  // Navegación dinámica
  const mainContent = document.getElementById('mainContent');
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      loadSection(this.dataset.section);
      // Cierra sidebar en móvil
      if (window.innerWidth < 992) sidebar.classList.remove('open');
    });
  });

  // Carga inicial
  loadSection('overview');
});

// Función para cargar secciones
function loadSection(section) {
  const mainContent = document.getElementById('mainContent');
  switch (section) {
    case 'overview':
      mainContent.innerHTML = `
        <h2 class="mb-4"><i class="fas fa-chart-bar me-2"></i>Overview</h2>
        <div class="row g-4 mb-4">
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <div class="fs-2 fw-bold text-primary">12</div>
              <div class="mt-2">Ventas totales</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <div class="fs-2 fw-bold text-primary">$2,400</div>
              <div class="mt-2">Ganancias</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <div class="fs-2 fw-bold text-primary">5</div>
              <div class="mt-2">Productos activos</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <div class="fs-2 fw-bold text-primary">HP EliteBook</div>
              <div class="mt-2">Más vendido</div>
            </div>
          </div>
        </div>
        <div class="row g-4 mb-4">
          <div class="col-12">
            <div class="card p-4 h-100">
              <h5 class="mb-3">Ventas del año</h5>
              <canvas id="salesChart" height="180"></canvas>
            </div>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="card p-4 h-100">
              <h5 class="mb-3">Actividad reciente</h5>
              <canvas id="activityChart" height="180"></canvas>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card p-4 h-100">
              <h5 class="mb-3">Top productos más vistos</h5>
              <canvas id="topViewedChart" height="180"></canvas>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card p-4 h-100 mb-4">
              <h5 class="mb-3">Productos más vendidos</h5>
              <canvas id="topSoldChart" height="180"></canvas>
            </div>
          </div>
        </div>
      `;
      setTimeout(() => {
        renderChart();
        renderActivityChart();
        renderTopViewedChart();
        renderTopSoldChart();
      }, 100);
      break;
    case 'profile':
      mainContent.innerHTML = `
        <h2 class="mb-4"><i class="fas fa-user me-2"></i>Perfil de usuario</h2>
        <form id="profileForm" class="profile-modern card p-4">
          <div class="row g-4 align-items-center">
            <div class="col-md-4 text-center">
              <div class="profile-photo-wrapper mb-3">
                <img src="assets/images/portrait-female-working.jpg" class="profile-photo mb-2" id="profileImage" alt="Foto de perfil">
                <input type="file" id="profileImageInput" accept="image/*" class="d-none">
                <button type="button" class="btn btn-outline-secondary btn-sm mt-2" id="changePhotoBtn">Subir/Cambiar foto</button>
                <div class="form-text">Upload a different photo...</div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nombre completo</label>
                  <input type="text" class="form-control" id="profileName" value="Jane Doe">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control" id="profileEmail" value="jane@email.com">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Teléfono</label>
                  <input type="tel" class="form-control" id="profilePhone" value="555-1234">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Dirección <span class="text-muted">(opcional)</span></label>
                  <input type="text" class="form-control" id="profileAddress" placeholder="Dirección...">
                </div>
              </div>
              <hr>
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label">Contraseña actual</label>
                  <input type="password" class="form-control" id="currentPassword" autocomplete="current-password">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Nueva contraseña</label>
                  <input type="password" class="form-control" id="newPassword" autocomplete="new-password">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Confirmar nueva contraseña</label>
                  <input type="password" class="form-control" id="confirmPassword" autocomplete="new-password">
                </div>
              </div>
              <hr>
              <div class="row g-3 align-items-center">
                <div class="col-md-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="darkModeSwitch">
                    <label class="form-check-label" for="darkModeSwitch">Modo oscuro</label>
                  </div>
                  <div class="form-check form-switch mt-2">
                    <input class="form-check-input" type="checkbox" id="notifSwitch">
                    <label class="form-check-label" for="notifSwitch">Notificaciones</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-2"><strong>Fecha de registro:</strong> <span id="registerDate">2024-01-01</span></div>
                  <div><strong>Último acceso:</strong> <span id="lastAccess">2024-06-01 10:00</span></div>
                </div>
              </div>
              <hr>
              <div class="d-flex flex-wrap gap-2 mt-3">
                <button type="submit" class="btn btn-primary">Guardar cambios</button>
                <button type="reset" class="btn btn-outline-secondary">Restablecer</button>
                <button type="button" class="btn btn-outline-danger ms-auto" id="deleteAccountBtn">Eliminar cuenta</button>
              </div>
            </div>
          </div>
        </form>
      `;
      setTimeout(() => { // JS para foto y eliminar cuenta
        const changePhotoBtn = document.getElementById('changePhotoBtn');
        const profileImageInput = document.getElementById('profileImageInput');
        const profileImage = document.getElementById('profileImage');
        if (changePhotoBtn && profileImageInput && profileImage) {
          changePhotoBtn.addEventListener('click', () => profileImageInput.click());
          profileImageInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = ev => profileImage.src = ev.target.result;
              reader.readAsDataURL(file);
            }
          });
        }
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        if (deleteAccountBtn) {
          deleteAccountBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
              alert('Cuenta eliminada (simulado)');
            }
          });
        }
      }, 100);
      break;
    case 'products':
      mainContent.innerHTML = `
        <h2 class="mb-4"><i class="fas fa-box me-2"></i>Mis productos</h2>
        <div class="mb-3 text-end">
          <button class="btn btn-success"><i class="fas fa-plus"></i> Agregar producto</button>
        </div>
        <div class="card p-3">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Estado</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HP EliteBook 840</td>
                  <td><span class="badge bg-success">Activo</span></td>
                  <td>$350</td>
                  <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>iPad Pro 11"</td>
                  <td><span class="badge bg-warning text-dark">Vendido</span></td>
                  <td>$600</td>
                  <td>
                    <button class="btn btn-sm btn-secondary"><i class="fas fa-undo"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    case 'sales':
      mainContent.innerHTML = `
        <h2 class="mb-4"><i class="fas fa-shopping-cart me-2"></i>Mis ventas</h2>
        <div class="card p-3">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Comprador</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HP EliteBook 840</td>
                  <td>Juan Pérez</td>
                  <td><span class="badge bg-info">Enviado</span></td>
                  <td>2024-05-10</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>iPad Pro 11"</td>
                  <td>Maria López</td>
                  <td><span class="badge bg-success">Entregado</span></td>
                  <td>2024-04-22</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;
    case 'support':
      mainContent.innerHTML = `
        <h2 class="mb-4"><i class="fas fa-headset me-2"></i>Soporte</h2>
        <div class="card p-4">
          <h5>¿Tienes dudas o necesitas ayuda?</h5>
          <p>Contáctanos a través del siguiente formulario o revisa nuestras <a href="#">preguntas frecuentes</a>.</p>
          <form>
            <div class="mb-3">
              <label class="form-label">Tu correo</label>
              <input type="email" class="form-control" placeholder="tucorreo@email.com">
            </div>
            <div class="mb-3">
              <label class="form-label">Mensaje</label>
              <textarea class="form-control" rows="4" placeholder="Escribe tu mensaje..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      `;
      break;
    case 'settings':
      mainContent.innerHTML = `
        <h2 class="mb-4"><i class="fas fa-cog me-2"></i>Configuraciones</h2>
        <div class="card p-4">
          <div class="mb-3">
            <label class="form-label">Idioma</label>
            <select class="form-select">
              <option>Español</option>
              <option>English</option>
            </select>
          </div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="notifSwitch" checked>
            <label class="form-check-label" for="notifSwitch">Notificaciones</label>
          </div>
          <button class="btn btn-primary">Guardar cambios</button>
        </div>
      `;
      break;
    default:
      mainContent.innerHTML = `<div class="text-center py-5">Sección no encontrada.</div>`;
  }
}

// Gráfica animada (Overview)
function renderChart() {
  const ctx = document.getElementById('salesChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
      datasets: [{
        label: 'Ventas',
        data: [2, 3, 4, 5, 6, 7, 8, 9],
        borderColor: '#4b6b8a',
        backgroundColor: 'rgba(94,198,230,0.15)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#3b8bbd'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      },
      scales: {
        x: { grid: { color: 'rgba(75,107,138,0.08)' } },
        y: { grid: { color: 'rgba(75,107,138,0.08)' } }
      }
    }
  });
} 

// Agregar funciones para las nuevas gráficas
function renderActivityChart() {
  const ctx = document.getElementById('activityChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Login', 'Publicación', 'Venta', 'Comentario', 'Logout'],
      datasets: [{
        label: 'Actividades',
        data: [12, 7, 5, 9, 3],
        backgroundColor: [
          '#4b6b8a',
          '#3b8bbd',
          '#5ec6e6',
          '#7ff6fa',
          '#5a6b99'
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      animation: { duration: 1200, easing: 'easeOutQuart' },
      scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(75,107,138,0.08)' } } }
    }
  });
}
function renderTopViewedChart() {
  const ctx = document.getElementById('topViewedChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Laptop HP', 'iPad Pro', 'Mouse Logitech', 'Monitor LG', 'Otro'],
      datasets: [{
        label: 'Vistas',
        data: [120, 90, 70, 50, 30],
        backgroundColor: [
          '#4b6b8a',
          '#3b8bbd',
          '#5ec6e6',
          '#7ff6fa',
          '#5a6b99'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      cutout: '70%',
      animation: { duration: 1200, easing: 'easeOutQuart' }
    }
  });
}
function renderTopSoldChart() {
  const ctx = document.getElementById('topSoldChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['HP EliteBook', 'iPad Pro', 'Mouse Logitech', 'Monitor LG', 'Otro'],
      datasets: [{
        label: 'Ventas',
        data: [8, 5, 3, 2, 1],
        backgroundColor: [
          '#4b6b8a',
          '#3b8bbd',
          '#5ec6e6',
          '#7ff6fa',
          '#5a6b99'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      animation: { duration: 1200, easing: 'easeOutQuart' }
    }
  });
} 