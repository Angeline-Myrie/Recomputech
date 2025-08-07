/**
 * Dark Mode Manager - Sistema unificado para Recomputech
 * Maneja el modo oscuro/claro de manera consistente en toda la aplicación
 */

class DarkModeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggleButtons = [];
        this.observers = [];
        this.init();
    }

    init() {
        // Aplicar tema guardado al cargar
        this.applySavedTheme();
        
        // Configurar listeners
        this.setupEventListeners();
        
        // Observar cambios en el DOM
        this.observeDOMChanges();
        
        // Aplicar tema a elementos existentes
        this.applyThemeToExistingElements();
        
        console.log('Dark Mode Manager initialized');
    }

    applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Aplicar al documento
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark-mode', theme === 'dark');
        
        // Aplicar al body
        document.body.setAttribute('data-theme', theme);
        document.body.classList.toggle('dark-mode', theme === 'dark');
        
        // Aplicar a todos los elementos con clase theme-aware
        this.applyThemeToAllElements(theme);
        
        // Aplicar a componentes web
        this.applyToWebComponents(theme);
        
        // Guardar preferencia
        localStorage.setItem('theme', theme);
        
        // Actualizar íconos
        this.updateThemeIcons(theme);
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme, previousTheme: this.currentTheme } 
        }));
        
        console.log(`Theme changed to: ${theme}`);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    applyThemeToAllElements(theme) {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Aplicar a elementos con clase theme-aware
            if (element.classList && element.classList.contains('theme-aware')) {
                element.classList.toggle('dark-mode', theme === 'dark');
                element.setAttribute('data-theme', theme);
            }
            
            // Aplicar a componentes web
            if (element.shadowRoot) {
                element.classList.toggle('dark-mode', theme === 'dark');
                element.setAttribute('data-theme', theme);
            }
        });

        // Aplicar específicamente a componentes web conocidos
        const webComponents = document.querySelectorAll('recomputech-header, recomputech-header-auth, recomputech-header-auth-technician');
        webComponents.forEach(component => {
            component.classList.toggle('dark-mode', theme === 'dark');
            component.setAttribute('data-theme', theme);
            
            // Actualizar íconos si el componente tiene el método
            if (component.updateThemeIcons && typeof component.updateThemeIcons === 'function') {
                component.updateThemeIcons(theme);
            }
        });
    }

    applyToWebComponents(theme) {
        // Aplicar a todos los componentes web
        const webComponents = document.querySelectorAll('*');
        webComponents.forEach(component => {
            if (component.shadowRoot) {
                // Aplicar a shadow DOM
                component.classList.toggle('dark-mode', theme === 'dark');
                component.setAttribute('data-theme', theme);
                
                // Aplicar también al shadow root
                if (component.shadowRoot) {
                    component.shadowRoot.classList.toggle('dark-mode', theme === 'dark');
                    component.shadowRoot.setAttribute('data-theme', theme);
                }
            }
        });

        // Aplicar específicamente a componentes web conocidos
        const knownWebComponents = document.querySelectorAll('recomputech-header, recomputech-header-auth, recomputech-header-auth-technician');
        knownWebComponents.forEach(component => {
            component.classList.toggle('dark-mode', theme === 'dark');
            component.setAttribute('data-theme', theme);
            
            // Actualizar íconos si el componente tiene el método
            if (component.updateThemeIcons && typeof component.updateThemeIcons === 'function') {
                component.updateThemeIcons(theme);
            }
        });
    }

    updateThemeIcons(theme) {
        // Buscar todos los botones de tema
        const themeToggles = document.querySelectorAll('[id*="theme-toggle"], .theme-toggle, [data-theme-toggle], #recomputech-theme-toggle');
        
        themeToggles.forEach(toggle => {
            const moonIcon = toggle.querySelector('.moon-icon, .fa-moon, [data-icon="moon"]');
            const sunIcon = toggle.querySelector('.sun-icon, .fa-sun, [data-icon="sun"]');
            
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

        // Actualizar íconos en componentes web (header, etc.)
        const webComponents = document.querySelectorAll('recomputech-header, recomputech-header-auth, recomputech-header-auth-technician');
        webComponents.forEach(component => {
            if (component.updateThemeIcons && typeof component.updateThemeIcons === 'function') {
                component.updateThemeIcons(theme);
            }
        });
    }

    setupEventListeners() {
        // Configurar listeners para botones de tema
        document.addEventListener('click', (e) => {
            const themeToggle = e.target.closest('[id*="theme-toggle"], .theme-toggle, [data-theme-toggle], #recomputech-theme-toggle');
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

        // Escuchar cambios de tema desde otros componentes
        document.addEventListener('themeChanged', (e) => {
            this.currentTheme = e.detail.theme;
            this.updateThemeIcons(e.detail.theme);
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

        this.observers.push(observer);
    }

    applyThemeToElement(element) {
        // Aplicar tema a un elemento específico
        if (element.classList && element.classList.contains('theme-aware')) {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
        }
        
        // Aplicar a componentes web
        if (element.shadowRoot) {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
        }

        // Aplicar a componentes web específicos
        if (element.tagName && ['RECOMPUTECH-HEADER', 'RECOMPUTECH-HEADER-AUTH', 'RECOMPUTECH-HEADER-AUTH-TECHNICIAN'].includes(element.tagName)) {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
            
            // Actualizar íconos si el componente tiene el método
            if (element.updateThemeIcons && typeof element.updateThemeIcons === 'function') {
                element.updateThemeIcons(this.currentTheme);
            }
        }
    }

    applyThemeToExistingElements() {
        // Aplicar tema a elementos que ya existen en el DOM
        const themeAwareElements = document.querySelectorAll('.theme-aware');
        themeAwareElements.forEach(element => {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
        });

        // Aplicar tema a componentes web existentes
        const webComponents = document.querySelectorAll('recomputech-header, recomputech-header-auth, recomputech-header-auth-technician');
        webComponents.forEach(component => {
            component.classList.toggle('dark-mode', this.currentTheme === 'dark');
            component.setAttribute('data-theme', this.currentTheme);
            
            // Actualizar íconos si el componente tiene el método
            if (component.updateThemeIcons && typeof component.updateThemeIcons === 'function') {
                component.updateThemeIcons(this.currentTheme);
            }
        });
    }

    // Método para forzar la aplicación del tema a todos los elementos
    forceThemeApplication() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.classList.toggle('dark-mode', this.currentTheme === 'dark');
            element.setAttribute('data-theme', this.currentTheme);
        });

        // Aplicar específicamente a componentes web
        const webComponents = document.querySelectorAll('recomputech-header, recomputech-header-auth, recomputech-header-auth-technician');
        webComponents.forEach(component => {
            component.classList.toggle('dark-mode', this.currentTheme === 'dark');
            component.setAttribute('data-theme', this.currentTheme);
            
            // Actualizar íconos si el componente tiene el método
            if (component.updateThemeIcons && typeof component.updateThemeIcons === 'function') {
                component.updateThemeIcons(this.currentTheme);
            }
        });
    }

    // Método para obtener el tema actual
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Método para verificar si está en modo oscuro
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    // Método para limpiar observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Crear instancia global
window.darkModeManager = new DarkModeManager();

// Funciones de compatibilidad para código existente
function toggleTheme() {
    window.darkModeManager.toggleTheme();
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
        window.darkModeManager.forceThemeApplication();
    }, 100);
});

// Aplicar tema inmediatamente si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeManager.forceThemeApplication();
    });
} else {
    window.darkModeManager.forceThemeApplication();
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DarkModeManager, toggleTheme, initializeTheme, setupThemeToggle };
}
