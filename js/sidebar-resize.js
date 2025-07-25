
// Unificado: Sidebar resizable con flecha central, desktop y móvil
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const productsGrid = document.querySelector('.products-grid');
  if (!sidebar) return;

  // Si el handle no existe, lo crea (sin flecha visual)
  let resizeHandle = sidebar.querySelector('.sidebar-resize-handle');
  if (!resizeHandle) {
    resizeHandle = document.createElement('div');
    resizeHandle.className = 'sidebar-resize-handle';
    // Sin contenido visual, solo área interactiva
    sidebar.appendChild(resizeHandle);
  }

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  function setSidebarWidth(newWidth) {
    sidebar.style.width = newWidth + 'px';
    if (productsGrid) {
      if (newWidth <= 90) {
        sidebar.classList.add('collapsed');
        productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(400px, 1fr))';
      } else {
        sidebar.classList.remove('collapsed');
        productsGrid.style.gridTemplateColumns = '';
      }
    }
  }

  // Mouse
  resizeHandle.addEventListener('mousedown', function (e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = sidebar.offsetWidth;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  window.addEventListener('mousemove', function (e) {
    if (!isResizing) return;
    let newWidth = startWidth + (e.clientX - startX);
    newWidth = Math.max(80, Math.min(320, newWidth));
    setSidebarWidth(newWidth);
  });

  window.addEventListener('mouseup', function () {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });

  // Touch
  resizeHandle.addEventListener('touchstart', function (e) {
    isResizing = true;
    startX = e.touches[0].clientX;
    startWidth = sidebar.offsetWidth;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  window.addEventListener('touchmove', function (e) {
    if (!isResizing) return;
    let newWidth = startWidth + (e.touches[0].clientX - startX);
    newWidth = Math.max(80, Math.min(320, newWidth));
    setSidebarWidth(newWidth);
  });

  window.addEventListener('touchend', function () {
    if (isResizing) {
      isResizing = false;
      document.body.style.userSelect = '';
    }
  });
});
