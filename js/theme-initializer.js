/**
 * Theme Initializer - Aplica el tema inmediatamente en el head
 * Previene el flash de contenido sin estilo
 */

(function() {
    'use strict';
    
    // Obtener el tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar inmediatamente al documento
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark');
    
    // Aplicar al body si ya existe
    if (document.body) {
        document.body.setAttribute('data-theme', savedTheme);
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
    
    // Aplicar a todos los elementos existentes
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.classList.toggle('dark-mode', savedTheme === 'dark');
        element.setAttribute('data-theme', savedTheme);
    });
    
    console.log('Theme initialized immediately:', savedTheme);
})();
