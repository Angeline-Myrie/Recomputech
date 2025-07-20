// Función para cargar componentes
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            
            // Si es el header, inicializar el tema después de cargarlo
            if (elementId === 'header-component') {
                // Inicializar el tema inmediatamente
                if (window.themeManager) {
                    window.themeManager.setup();
                }
            }
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Para prueba: rutas relativas para /pages
    loadComponent('header-component', '../components/header.html');
    loadComponent('footer-component', '../components/footer.html');
}); 