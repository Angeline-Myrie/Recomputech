// Path Fixer - Automatically adjusts paths for GitHub Pages vs Live Server
(function() {
    'use strict';
    
    // Detect if we're on GitHub Pages or Live Server
    const isGitHubPages = window.location.hostname !== 'localhost' && 
                         window.location.hostname !== '127.0.0.1' &&
                         window.location.hostname.includes('github.io');
    
    const isLiveServer = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    // Base path for assets
    const basePath = isGitHubPages ? '/Recomputech' : '';
    
    console.log('Path Fixer initialized:', {
        isGitHubPages: isGitHubPages,
        isLiveServer: isLiveServer,
        basePath: basePath,
        hostname: window.location.hostname,
        pathname: window.location.pathname
    });
    
    // Function to fix image paths
    function fixImagePaths() {
        const images = document.querySelectorAll('img[src*="assets/"]');
        images.forEach(img => {
            if (img.src.includes('assets/') && !img.src.startsWith('http')) {
                const currentSrc = img.getAttribute('src');
                if (!currentSrc.startsWith('/') && !currentSrc.startsWith('./')) {
                    img.src = basePath + '/' + currentSrc;
                }
            }
        });
        
        // Fix logo in header component specifically
        const headerLogos = document.querySelectorAll('img[src="assets/logos/logo-.png"]');
        headerLogos.forEach(img => {
            if (isGitHubPages) {
                img.src = '/Recomputech/assets/logos/logo-.png';
            }
        });
        
        // Also fix any logo in shadow DOM (for web components)
        const shadowRoots = document.querySelectorAll('*');
        shadowRoots.forEach(element => {
            if (element.shadowRoot) {
                const shadowImages = element.shadowRoot.querySelectorAll('img[src*="assets/"]');
                shadowImages.forEach(img => {
                    const currentSrc = img.getAttribute('src');
                    if (currentSrc && currentSrc.includes('assets/') && !currentSrc.startsWith('http')) {
                        if (isGitHubPages) {
                            img.src = '/Recomputech' + (currentSrc.startsWith('/') ? currentSrc : '/' + currentSrc);
                        }
                    }
                });
            }
        });
    }
    
    // Function to fix script paths
    function fixScriptPaths() {
        const scripts = document.querySelectorAll('script[src*="../"]');
        scripts.forEach(script => {
            const currentSrc = script.getAttribute('src');
            if (currentSrc && currentSrc.includes('../')) {
                const newSrc = currentSrc.replace('../', basePath + '/');
                script.src = newSrc;
            }
        });
    }
    
    // Function to fix link paths
    function fixLinkPaths() {
        const links = document.querySelectorAll('a[href*="pages/"]');
        links.forEach(link => {
            const currentHref = link.getAttribute('href');
            if (currentHref && currentHref.startsWith('pages/')) {
                link.href = basePath + '/' + currentHref;
            }
        });
        
        // Fix index.html links
        const indexLinks = document.querySelectorAll('a[href="index.html"], a[href="/index.html"]');
        indexLinks.forEach(link => {
            if (isGitHubPages) {
                link.href = '/Recomputech/';
            }
        });
    }
    
    // Function to fix all paths
    function fixAllPaths() {
        console.log('Fixing all paths for environment:', isGitHubPages ? 'GitHub Pages' : 'Live Server');
        fixImagePaths();
        fixScriptPaths();
        fixLinkPaths();
    }
    
    // Run fixes when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fixAllPaths();
        });
    } else {
        fixAllPaths();
    }
    
    // Export for use in other files
    window.PathFixer = {
        basePath: basePath,
        isGitHubPages: isGitHubPages,
        isLiveServer: isLiveServer,
        fixImagePaths: fixImagePaths,
        fixScriptPaths: fixScriptPaths,
        fixLinkPaths: fixLinkPaths,
        fixAllPaths: fixAllPaths
    };
})(); 