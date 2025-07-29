// Configuration for paths - works with both Live Server and GitHub Pages
const CONFIG = {
    // Environment detection
    isGitHubPages: function() {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1' &&
               window.location.hostname.includes('github.io');
    },
    
    isLiveServer: function() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    },
    
    // Base paths
    getBaseUrl: function() {
        return this.isGitHubPages() ? '/Recomputech' : '';
    },
    
    // Asset paths
    ASSETS_PATH: function() {
        return this.getBaseUrl() + '/assets';
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
        return this.getBaseUrl() + '/js';
    },
    
    COMPONENTS_PATH: function() {
        return this.getBaseUrl() + '/components';
    },
    
    PAGES_PATH: function() {
        return this.getBaseUrl() + '/pages';
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
    },
    
    // Logo path resolver - handles both local and GitHub Pages
    getLogoPathForCurrentLocation: function() {
        // Detect if we're on GitHub Pages or local
        const isGitHubPages = this.isGitHubPages();
        
        // Get the current path to determine the correct relative path
        const currentPath = window.location.pathname;
        let logoPath;
        
        if (isGitHubPages) {
            // GitHub Pages - always use absolute path
            logoPath = '/Recomputech/assets/logos/logo-.png';
        } else {
            // Local development - calculate relative path based on current location
            if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/')) {
                // Root directory
                logoPath = 'assets/logos/logo-.png';
            } else if (currentPath.includes('/pages/')) {
                // Pages directory
                logoPath = '../assets/logos/logo-.png';
            } else if (currentPath.includes('/dashboard/')) {
                // Dashboard directory
                logoPath = '../../assets/logos/logo-.png';
            } else if (currentPath.includes('/auth/')) {
                // Auth directory
                logoPath = '../assets/logos/logo-.png';
            } else {
                // Fallback to absolute path
                logoPath = '/assets/logos/logo-.png';
            }
        }
        
        console.log('Logo path resolved:', logoPath, 'for path:', currentPath, 'GitHub Pages:', isGitHubPages);
        return logoPath;
    },
    
    // Function to fix all paths in the document
    fixAllPaths: function() {
        this.fixImagePaths();
        this.fixLinkPaths();
        this.fixScriptPaths();
    },
    
    // Fix image paths
    fixImagePaths: function() {
        const images = document.querySelectorAll('img[src*="assets/"]');
        images.forEach(img => {
            const currentSrc = img.getAttribute('src');
            if (currentSrc && currentSrc.includes('assets/') && !currentSrc.startsWith('http')) {
                if (this.isGitHubPages()) {
                    // For GitHub Pages, ensure absolute paths
                    if (!currentSrc.startsWith('/Recomputech')) {
                        img.src = '/Recomputech' + (currentSrc.startsWith('/') ? currentSrc : '/' + currentSrc);
                    }
                }
            }
        });
    },
    
    // Fix link paths
    fixLinkPaths: function() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const currentHref = link.getAttribute('href');
            if (currentHref && !currentHref.startsWith('http') && !currentHref.startsWith('#')) {
                if (this.isGitHubPages()) {
                    // For GitHub Pages, ensure proper paths
                    if (currentHref.startsWith('pages/') || currentHref.startsWith('/pages/')) {
                        link.href = '/Recomputech/' + currentHref.replace(/^\/+/, '');
                    } else if (currentHref === 'index.html' || currentHref === '/index.html') {
                        link.href = '/Recomputech/';
                    }
                }
            }
        });
    },
    
    // Fix script paths
    fixScriptPaths: function() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const currentSrc = script.getAttribute('src');
            if (currentSrc && currentSrc.includes('../') && this.isGitHubPages()) {
                // For GitHub Pages, fix relative script paths
                const newSrc = currentSrc.replace(/\.\.\//g, '/Recomputech/');
                script.src = newSrc;
            }
        });
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make CONFIG available globally
window.CONFIG = CONFIG;

// Auto-fix paths when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        CONFIG.fixAllPaths();
    });
} else {
    CONFIG.fixAllPaths();
} 