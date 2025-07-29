// Función para cambiar el tema
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    // Cambiar clases en el body
    if (isDark) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        body.setAttribute('data-theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        body.setAttribute('data-theme', 'dark');
    }
    
    // Actualizar el ícono
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Guardar preferencia
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Función para inicializar el tema
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeIcon = document.querySelector('#theme-toggle i');
    
    // Aplicar tema
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        body.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Función para configurar el evento del botón de tema
function setupThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        // Remover eventos anteriores si existen
        themeToggle.removeEventListener('click', toggleTheme);
        // Agregar nuevo evento
        themeToggle.addEventListener('click', toggleTheme);
        
        // Inicializar el tema inmediatamente
        initializeTheme();
    }
}

// Exportar funciones
window.themeManager = {
    toggle: toggleTheme,
    initialize: initializeTheme,
    setup: setupThemeToggle
};

// Script para mantener el modo dark entre páginas usando localStorage

document.addEventListener('DOMContentLoaded', function() {
    // Aplica el tema guardado al cargar la página
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Botón de cambio de tema (debe tener id="theme-toggle" en el header)
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            const isDark = !document.body.classList.contains('dark-mode');
            if (isDark) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}); 