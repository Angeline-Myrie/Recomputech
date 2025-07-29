// Deployment Check - Verifies project configuration for GitHub Pages
(function() {
    'use strict';
    
    console.log('🔍 Deployment Check - Starting verification...');
    
    // Environment detection
    const isGitHubPages = window.location.hostname !== 'localhost' && 
                         window.location.hostname !== '127.0.0.1' &&
                         window.location.hostname.includes('github.io');
    
    const isLiveServer = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    console.log('📍 Environment:', {
        hostname: window.location.hostname,
        pathname: window.location.pathname,
        isGitHubPages: isGitHubPages,
        isLiveServer: isLiveServer
    });
    
    // Check if required scripts are loaded
    function checkRequiredScripts() {
        const requiredScripts = [
            'config.js',
            'path-fixer.js'
        ];
        
        const missingScripts = [];
        requiredScripts.forEach(script => {
            const scriptElement = document.querySelector(`script[src*="${script}"]`);
            if (!scriptElement) {
                missingScripts.push(script);
            }
        });
        
        if (missingScripts.length > 0) {
            console.error('❌ Missing required scripts:', missingScripts);
            return false;
        } else {
            console.log('✅ All required scripts loaded');
            return true;
        }
    }
    
    // Check if CONFIG is available
    function checkConfig() {
        if (typeof window.CONFIG === 'undefined') {
            console.error('❌ CONFIG not available globally');
            return false;
        } else {
            console.log('✅ CONFIG available globally');
            return true;
        }
    }
    
    // Check if PathFixer is available
    function checkPathFixer() {
        if (typeof window.PathFixer === 'undefined') {
            console.error('❌ PathFixer not available globally');
            return false;
        } else {
            console.log('✅ PathFixer available globally');
            return true;
        }
    }
    
    // Check image paths
    function checkImagePaths() {
        const images = document.querySelectorAll('img[src*="assets/"]');
        let brokenImages = 0;
        
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                if (isGitHubPages && !src.startsWith('/Recomputech')) {
                    console.warn('⚠️ Image path might not work on GitHub Pages:', src);
                    brokenImages++;
                }
            }
        });
        
        if (brokenImages === 0) {
            console.log('✅ All image paths look correct');
            return true;
        } else {
            console.warn(`⚠️ ${brokenImages} image paths might need attention`);
            return false;
        }
    }
    
    // Check link paths
    function checkLinkPaths() {
        const links = document.querySelectorAll('a[href]');
        let problematicLinks = 0;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                if (isGitHubPages && href.startsWith('pages/') && !href.startsWith('/Recomputech')) {
                    console.warn('⚠️ Link path might not work on GitHub Pages:', href);
                    problematicLinks++;
                }
            }
        });
        
        if (problematicLinks === 0) {
            console.log('✅ All link paths look correct');
            return true;
        } else {
            console.warn(`⚠️ ${problematicLinks} link paths might need attention`);
            return false;
        }
    }
    
    // Check script paths
    function checkScriptPaths() {
        const scripts = document.querySelectorAll('script[src]');
        let problematicScripts = 0;
        
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src && src.includes('../') && isGitHubPages) {
                console.warn('⚠️ Script path might not work on GitHub Pages:', src);
                problematicScripts++;
            }
        });
        
        if (problematicScripts === 0) {
            console.log('✅ All script paths look correct');
            return true;
        } else {
            console.warn(`⚠️ ${problematicScripts} script paths might need attention`);
            return false;
        }
    }
    
    // Run all checks
    function runAllChecks() {
        console.log('\n🔍 Running deployment checks...\n');
        
        const checks = [
            { name: 'Required Scripts', fn: checkRequiredScripts },
            { name: 'CONFIG Availability', fn: checkConfig },
            { name: 'PathFixer Availability', fn: checkPathFixer },
            { name: 'Image Paths', fn: checkImagePaths },
            { name: 'Link Paths', fn: checkLinkPaths },
            { name: 'Script Paths', fn: checkScriptPaths }
        ];
        
        let passedChecks = 0;
        
        checks.forEach(check => {
            console.log(`\n📋 Checking: ${check.name}`);
            if (check.fn()) {
                passedChecks++;
            }
        });
        
        console.log(`\n📊 Results: ${passedChecks}/${checks.length} checks passed`);
        
        if (passedChecks === checks.length) {
            console.log('🎉 All checks passed! Your project is ready for deployment.');
        } else {
            console.log('⚠️ Some checks failed. Please review the warnings above.');
        }
        
        return passedChecks === checks.length;
    }
    
    // Run checks when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllChecks);
    } else {
        runAllChecks();
    }
    
    // Export for manual testing
    window.DeploymentCheck = {
        runAllChecks: runAllChecks,
        checkRequiredScripts: checkRequiredScripts,
        checkConfig: checkConfig,
        checkPathFixer: checkPathFixer,
        checkImagePaths: checkImagePaths,
        checkLinkPaths: checkLinkPaths,
        checkScriptPaths: checkScriptPaths
    };
    
})();