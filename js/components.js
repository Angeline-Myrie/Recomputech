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

// Función para cargar web components
function loadWebComponents() {
    // Cargar header component
    const headerScript = document.createElement('script');
    headerScript.src = '../components/header-component.js';
    document.head.appendChild(headerScript);

    // Cargar footer component
    const footerScript = document.createElement('script');
    footerScript.src = '../components/footer-component.js';
    document.head.appendChild(footerScript);
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar web components
    loadWebComponents();
    
    // Para páginas que no usan web components, mantener la funcionalidad original
    const headerComponent = document.getElementById('header-component');
    const footerComponent = document.getElementById('footer-component');
    
    if (headerComponent && !headerComponent.querySelector('rc-header')) {
        loadComponent('header-component', '../components/header.html');
    }
    
    if (footerComponent && !footerComponent.querySelector('rc-footer')) {
        loadComponent('footer-component', '../components/footer.html');
    }
}); 