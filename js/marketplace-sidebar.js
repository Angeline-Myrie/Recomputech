/**
 * Mantiene el sidebar del marketplace visible al hacer scroll en los productos.
 */
(function () {
    const DESKTOP_MQ = window.matchMedia('(min-width: 1201px)');

    let sidebar = null;
    let column = null;
    let footer = null;
    let rafId = null;

    function getStickyTop() {
        return window.self !== window.top ? 16 : 100;
    }

    function resetSidebar() {
        if (!sidebar || !column) return;
        sidebar.classList.remove('is-fixed');
        sidebar.style.position = '';
        sidebar.style.top = '';
        sidebar.style.right = '';
        sidebar.style.bottom = '';
        sidebar.style.left = '';
        sidebar.style.width = '';
        sidebar.style.maxHeight = '';
        column.style.minHeight = '';
    }

    function updateSidebar() {
        if (!sidebar || !column || !DESKTOP_MQ.matches) {
            resetSidebar();
            return;
        }

        const stickyTop = getStickyTop();
        const columnRect = column.getBoundingClientRect();
        const sidebarHeight = sidebar.offsetHeight;
        const isEmbedded = window.self !== window.top;
        const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;

        if (columnRect.top > stickyTop) {
            resetSidebar();
            return;
        }

        if (!isEmbedded && footerTop <= stickyTop + sidebarHeight) {
            sidebar.classList.remove('is-fixed');
            sidebar.style.position = 'absolute';
            sidebar.style.top = 'auto';
            sidebar.style.right = '0';
            sidebar.style.bottom = '0';
            sidebar.style.left = '0';
            sidebar.style.width = '100%';
            sidebar.style.maxHeight = 'calc(100vh - ' + (stickyTop + 20) + 'px)';
            column.style.minHeight = sidebarHeight + 'px';
            return;
        }

        sidebar.classList.add('is-fixed');
        sidebar.style.position = 'fixed';
        sidebar.style.top = stickyTop + 'px';
        sidebar.style.left = columnRect.left + 'px';
        sidebar.style.width = columnRect.width + 'px';
        sidebar.style.maxHeight = 'calc(100vh - ' + (stickyTop + 20) + 'px)';
        column.style.minHeight = sidebarHeight + 'px';
    }

    function onScrollOrResize() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(function () {
            rafId = null;
            updateSidebar();
        });
    }

    function init() {
        sidebar = document.getElementById('sidebar');
        column = document.querySelector('.sidebar-column');
        footer = document.querySelector('recomputech-footer');
        if (!sidebar || !column) return;

        resetSidebar();
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize, { passive: true });
        DESKTOP_MQ.addEventListener('change', function () {
            resetSidebar();
            updateSidebar();
        });
        updateSidebar();
        window.addEventListener('load', updateSidebar);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
