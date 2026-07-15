// Sistema de Tema Unificado para Recomputech
// Este archivo maneja el modo dark/light de manera consistente en toda la aplicación

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        // Aplicar tema guardado al cargar la página
        this.applySavedTheme();
        
        // Configurar listeners para botones de tema
        this.setupThemeToggles();
        
        // Aplicar tema a elementos que se cargan dinámicamente
        this.observeDOMChanges();
    }

    applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Aplicar al body
        document.body.setAttribute('data-theme', theme);
        document.body.classList.toggle('dark-mode', theme === 'dark');
        
        // Aplicar al html
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark-mode', theme === 'dark');
        
        // Aplicar a componentes web
        this.applyToWebComponents(theme);
        
        // Guardar preferencia
        localStorage.setItem('theme', theme);
        
        // Actualizar íconos
        this.updateThemeIcons(theme);
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    applyToWebComponents(theme) {
        // Aplicar a todos los componentes web
        const webComponents = document.querySelectorAll('*');
        webComponents.forEach(component => {
            if (component.shadowRoot) {
                // Aplicar a shadow DOM
                component.classList.toggle('dark-mode', theme === 'dark');
                component.setAttribute('data-theme', theme);
            }
        });
    }

    updateThemeIcons(theme) {
        // Actualizar íconos en botones de tema
        const themeToggles = document.querySelectorAll('[id*="theme-toggle"], .theme-toggle, [data-theme-toggle]');
        
        themeToggles.forEach(toggle => {
            const moonIcon = toggle.querySelector('.moon-icon, .fa-moon');
            const sunIcon = toggle.querySelector('.sun-icon, .fa-sun');
            
            if (moonIcon && sunIcon) {
                if (theme === 'dark') {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                } else {
                    moonIcon.style.display = 'block';
                    sunIcon.style.display = 'none';
                }
            }
            
            // Actualizar ícono único si existe
            const singleIcon = toggle.querySelector('i');
            if (singleIcon && !moonIcon && !sunIcon) {
                singleIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }

    setupThemeToggles() {
        // Configurar listeners para botones de tema existentes
        document.addEventListener('click', (e) => {
            const themeToggle = e.target.closest('[id*="theme-toggle"], .theme-toggle, [data-theme-toggle]');
            if (themeToggle) {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Configurar listener para teclado (Ctrl/Cmd + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    observeDOMChanges() {
        // Observar cambios en el DOM para aplicar tema a elementos nuevos
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.applyThemeToElement(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    applyThemeToElement(element) {
        // Aplicar tema a un elemento específico
        if (element.classList && element.classList.contains('theme-aware')) {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
        }
    }

    // Método para forzar la aplicación del tema a todos los elementos
    forceThemeApplication() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
        });
    }
}

// Crear instancia global
window.themeManager = new ThemeManager();

// Función de compatibilidad para código existente
function toggleTheme() {
    window.themeManager.toggleTheme();
}

function initializeTheme() {
    // Ya se inicializa automáticamente
}

function setupThemeToggle() {
    // Ya se configura automáticamente
}

// Aplicar tema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // El tema ya se aplica automáticamente en el constructor
    // Pero podemos forzar una aplicación adicional si es necesario
    setTimeout(() => {
        window.themeManager.forceThemeApplication();
    }, 100);
});

// Aplicar tema inmediatamente si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager.forceThemeApplication();
    });
} else {
    window.themeManager.forceThemeApplication();
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, toggleTheme, initializeTheme, setupThemeToggle };
} 