// Configuration for paths - works with both Live Server and GitHub Pages
const CONFIG = {
    // Base paths
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '' : '/Recomputech',
    
    // Asset paths
    ASSETS_PATH: function() {
        return this.BASE_URL + '/assets';
    },
    
    // Image paths
    IMAGES_PATH: function() {
        return this.ASSETS_PATH() + '/images';
    },
    
    LOGOS_PATH: function() {
        return this.ASSETS_PATH() + '/logos';
    },
    
    // Script paths
    JS_PATH: function() {
        return this.BASE_URL + '/js';
    },
    
    COMPONENTS_PATH: function() {
        return this.BASE_URL + '/components';
    },
    
    PAGES_PATH: function() {
        return this.BASE_URL + '/pages';
    },
    
    // Helper functions
    getImagePath: function(imagePath) {
        return this.IMAGES_PATH() + '/' + imagePath;
    },
    
    getLogoPath: function(logoPath) {
        return this.LOGOS_PATH() + '/' + logoPath;
    },
    
    getScriptPath: function(scriptPath) {
        return this.JS_PATH() + '/' + scriptPath;
    },
    
    getComponentPath: function(componentPath) {
        return this.COMPONENTS_PATH() + '/' + componentPath;
    },
    
    getPagePath: function(pagePath) {
        return this.PAGES_PATH() + '/' + pagePath;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 