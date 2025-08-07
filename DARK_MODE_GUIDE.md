# Guía del Sistema de Dark Mode - Recomputech

## 📋 Descripción General

Este sistema de dark mode está diseñado para funcionar de manera consistente en toda la aplicación Recomputech. Utiliza variables CSS y JavaScript para manejar el cambio de temas de forma dinámica.

## 🚀 Características Principales

- ✅ **Cambio automático**: Se aplica automáticamente a todos los elementos
- ✅ **Persistencia**: Guarda la preferencia del usuario en localStorage
- ✅ **Transiciones suaves**: Cambios animados entre temas
- ✅ **Compatibilidad**: Funciona con componentes web y elementos dinámicos
- ✅ **Atajo de teclado**: Ctrl/Cmd + T para cambiar tema
- ✅ **Responsive**: Funciona en todos los dispositivos

## 📁 Archivos del Sistema

### 1. `js/dark-mode-manager.js`
**Archivo principal del sistema**
- Maneja la lógica de cambio de temas
- Aplica el tema a componentes web
- Observa cambios en el DOM
- Gestiona eventos de teclado

### 2. `css/dark-mode-variables.css`
**Variables CSS para ambos temas**
- Define todas las variables de color
- Incluye estilos específicos para dark mode
- Maneja transiciones y utilidades

### 3. `css/styles.css`
**Estilos principales**
- Importa las variables de dark mode
- Aplica estilos globales

## 🎨 Variables CSS Disponibles

### Colores Principales
```css
--primary-color: #218DA6;
--secondary-color: #1b6e82;
--accent-color: #155a6b;
```

### Colores de Texto
```css
--text-color: #1f2937;          /* Dark: #f3f4f6 */
--text-light: #4b5563;          /* Dark: #d1d5db */
--text-muted: #6b7280;          /* Dark: #9ca3af */
--text-inverse: #ffffff;        /* Dark: #111827 */
```

### Colores de Fondo
```css
--bg-color: #ffffff;            /* Dark: #111827 */
--bg-light: #f8fafc;           /* Dark: #1f2937 */
--bg-lighter: #f1f5f9;         /* Dark: #374151 */
--card-bg: #ffffff;            /* Dark: #1f2937 */
```

### Colores de Formularios
```css
--input-bg: #ffffff;            /* Dark: #374151 */
--input-border: #d1d5db;       /* Dark: #4b5563 */
--input-text: #1f2937;         /* Dark: #f3f4f6 */
--input-placeholder: #9ca3af;  /* Dark: #9ca3af */
```

## 🔧 Cómo Usar

### 1. Aplicar a Elementos HTML

```html
<!-- El sistema se aplica automáticamente -->
<div class="card">
    <h3>Mi Título</h3>
    <p>Mi contenido</p>
</div>

<!-- Para elementos específicos -->
<div class="theme-aware">
    <!-- Este elemento responderá automáticamente al tema -->
</div>
```

### 2. Usar Variables CSS

```css
.mi-componente {
    background-color: var(--card-bg);
    color: var(--text-color);
    border: 1px solid var(--card-border);
}
```

### 3. JavaScript - Cambiar Tema

```javascript
// Cambiar tema programáticamente
window.darkModeManager.setTheme('dark');
window.darkModeManager.setTheme('light');

// Alternar tema
window.darkModeManager.toggleTheme();

// Verificar tema actual
const currentTheme = window.darkModeManager.getCurrentTheme();
const isDark = window.darkModeManager.isDarkMode();
```

### 4. Escuchar Cambios de Tema

```javascript
document.addEventListener('themeChanged', (e) => {
    console.log('Tema cambiado a:', e.detail.theme);
    // Tu código aquí
});
```

## 🎯 Botones de Tema

### Estructura HTML Recomendada

```html
<!-- Botón con íconos separados -->
<button class="theme-toggle" id="theme-toggle">
    <svg class="moon-icon" viewBox="0 0 24 24">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
    </svg>
    <svg class="sun-icon" viewBox="0 0 24 24" style="display: none;">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
</button>

<!-- Botón con ícono único -->
<button class="theme-toggle" id="theme-toggle">
    <i class="fas fa-moon"></i>
</button>
```

### Clases CSS para Botones

```css
.theme-toggle {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 8px;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background-color: var(--bg-light);
}
```

## 📱 Componentes Web

### Integración con Shadow DOM

```javascript
class MiComponente extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // El sistema aplica automáticamente el tema
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                :host(.dark-mode) {
                    /* Estilos específicos para dark mode */
                    background-color: var(--card-bg);
                    color: var(--text-color);
                }
            </style>
            <div class="mi-componente">
                <!-- Contenido -->
            </div>
        `;
    }
}
```

## 🎨 Personalización

### 1. Agregar Nuevas Variables

```css
/* En css/dark-mode-variables.css */
:root {
    --mi-nueva-variable: #valor-claro;
}

[data-theme="dark"] {
    --mi-nueva-variable: #valor-oscuro;
}
```

### 2. Crear Estilos Específicos

```css
/* Para elementos específicos en dark mode */
[data-theme="dark"] .mi-clase-especial {
    background-color: var(--card-bg);
    color: var(--text-color);
}
```

### 3. Override de Bootstrap

```css
/* Sobrescribir clases de Bootstrap */
[data-theme="dark"] .bg-light {
    background-color: var(--bg-light) !important;
}

[data-theme="dark"] .text-dark {
    color: var(--text-color) !important;
}
```

## 🔍 Debugging

### Verificar Estado del Tema

```javascript
// En la consola del navegador
console.log('Tema actual:', window.darkModeManager.getCurrentTheme());
console.log('¿Es dark mode?', window.darkModeManager.isDarkMode());
console.log('Elementos con tema:', document.querySelectorAll('[data-theme]'));
```

### Forzar Aplicación de Tema

```javascript
// Forzar aplicación a todos los elementos
window.darkModeManager.forceThemeApplication();
```

## 📋 Checklist de Implementación

- [ ] Incluir `dark-mode-manager.js` en el HTML
- [ ] Importar `dark-mode-variables.css` en `styles.css`
- [ ] Agregar botón de tema con estructura correcta
- [ ] Usar variables CSS en lugar de colores hardcodeados
- [ ] Probar en diferentes páginas
- [ ] Verificar persistencia en localStorage
- [ ] Probar atajo de teclado (Ctrl/Cmd + T)

## 🐛 Problemas Comunes

### 1. Elementos no cambian de tema
**Solución**: Agregar clase `theme-aware` o usar variables CSS

### 2. Transiciones no funcionan
**Solución**: Verificar que no haya `transition: none` en el elemento

### 3. Componentes web no responden
**Solución**: Asegurar que el shadowRoot tenga los estilos correctos

### 4. Bootstrap no responde
**Solución**: Usar selectores específicos con `!important`

## 🚀 Mejores Prácticas

1. **Siempre usar variables CSS** en lugar de colores directos
2. **Probar en ambos temas** durante el desarrollo
3. **Usar transiciones suaves** para mejor UX
4. **Mantener consistencia** en el naming de variables
5. **Documentar cambios** en componentes personalizados

## 📞 Soporte

Para problemas o preguntas sobre el sistema de dark mode:
- Revisar la consola del navegador para errores
- Verificar que todos los archivos estén cargados
- Comprobar que las variables CSS estén definidas
- Usar las herramientas de debugging mencionadas arriba
