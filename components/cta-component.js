//CTA Component
class RecomputechCTA extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Determine the base path based on current page
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const basePath = isHomePage ? '' : '../';
        
       this.shadowRoot.innerHTML = `
            <style>
                /* CSS Variables for Dark Mode Support */
                :host {
                    --cta-bg-primary: linear-gradient(135deg, #2191a6 0%, #1b6e82 100%);
                    --cta-bg-dark: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    --cta-text-primary: white;
                    --cta-text-dark: #e2e8f0;
                    --cta-btn-primary-bg: white;
                    --cta-btn-primary-color: #2191a6;
                    --cta-btn-primary-color-dark: #0ea5e9;
                    --cta-btn-secondary-bg: transparent;
                    --cta-btn-secondary-border: white;
                    --cta-btn-secondary-color: white;
                    --cta-btn-secondary-hover-bg: white;
                    --cta-btn-secondary-hover-color: #2191a6;
                    --cta-btn-secondary-hover-color-dark: #0ea5e9;
                    --cta-stat-bg: rgba(255, 255, 255, 0.1);
                    --cta-stat-bg-dark: rgba(255, 255, 255, 0.05);
                    --cta-stat-border: rgba(255, 255, 255, 0.2);
                    --cta-stat-border-dark: rgba(255, 255, 255, 0.1);
                    --cta-stat-hover-bg: rgba(255, 255, 255, 0.15);
                    --cta-stat-hover-bg-dark: rgba(255, 255, 255, 0.08);
                    --cta-floating-bg: rgba(255, 255, 255, 0.1);
                    --cta-floating-bg-dark: rgba(255, 255, 255, 0.05);
                }

                /* Dark Mode Styles */
                :host-context([data-theme="dark"]) .cta-section,
                :host-context(body.dark-mode) .cta-section,
                :host([data-theme="dark"]) .cta-section,
                :host(.dark-mode) .cta-section {
                    background: var(--cta-bg-dark);
                }

                :host-context([data-theme="dark"]) .cta-title,
                :host-context(body.dark-mode) .cta-title,
                :host([data-theme="dark"]) .cta-title,
                :host(.dark-mode) .cta-title {
                    color: var(--cta-text-dark);
                }

                :host-context([data-theme="dark"]) .cta-subtitle,
                :host-context(body.dark-mode) .cta-subtitle,
                :host([data-theme="dark"]) .cta-subtitle,
                :host(.dark-mode) .cta-subtitle {
                    color: var(--cta-text-dark);
                }

                :host-context([data-theme="dark"]) .cta-btn-primary,
                :host-context(body.dark-mode) .cta-btn-primary,
                :host([data-theme="dark"]) .cta-btn-primary,
                :host(.dark-mode) .cta-btn-primary {
                    background: var(--cta-btn-primary-bg);
                    color: var(--cta-btn-primary-color-dark);
                }

                :host-context([data-theme="dark"]) .cta-btn-primary:hover,
                :host-context(body.dark-mode) .cta-btn-primary:hover,
                :host([data-theme="dark"]) .cta-btn-primary:hover,
                :host(.dark-mode) .cta-btn-primary:hover {
                    color: var(--cta-btn-primary-color-dark);
                }

                :host-context([data-theme="dark"]) .cta-btn-secondary,
                :host-context(body.dark-mode) .cta-btn-secondary,
                :host([data-theme="dark"]) .cta-btn-secondary,
                :host(.dark-mode) .cta-btn-secondary {
                    border-color: var(--cta-btn-secondary-border);
                    color: var(--cta-btn-secondary-color);
                }

                :host-context([data-theme="dark"]) .cta-btn-secondary:hover,
                :host-context(body.dark-mode) .cta-btn-secondary:hover,
                :host([data-theme="dark"]) .cta-btn-secondary:hover,
                :host(.dark-mode) .cta-btn-secondary:hover {
                    background: var(--cta-btn-secondary-hover-bg);
                    color: var(--cta-btn-secondary-hover-color-dark);
                }

                :host-context([data-theme="dark"]) .stat-item,
                :host-context(body.dark-mode) .stat-item,
                :host([data-theme="dark"]) .stat-item,
                :host(.dark-mode) .stat-item {
                    background: var(--cta-stat-bg-dark);
                    border-color: var(--cta-stat-border-dark);
                }

                :host-context([data-theme="dark"]) .stat-item:hover,
                :host-context(body.dark-mode) .stat-item:hover,
                :host([data-theme="dark"]) .stat-item:hover,
                :host(.dark-mode) .stat-item:hover {
                    background: var(--cta-stat-hover-bg-dark);
                }

                :host-context([data-theme="dark"]) .stat-number,
                :host-context(body.dark-mode) .stat-number,
                :host([data-theme="dark"]) .stat-number,
                :host(.dark-mode) .stat-number {
                    color: var(--cta-text-dark);
                }

                :host-context([data-theme="dark"]) .stat-label,
                :host-context(body.dark-mode) .stat-label,
                :host([data-theme="dark"]) .stat-label,
                :host(.dark-mode) .stat-label {
                    color: var(--cta-text-dark);
                }

                :host-context([data-theme="dark"]) .cta-section::after,
                :host-context(body.dark-mode) .cta-section::after,
                :host([data-theme="dark"]) .cta-section::after,
                :host(.dark-mode) .cta-section::after {
                    background: var(--cta-floating-bg-dark);
                }

                /* CTA Component Styles */
                .cta-section {
                    background: var(--cta-bg-primary);
                    color: var(--cta-text-primary);
                    position: relative;
                    overflow: hidden;
                    padding: 4rem 0;
                    transition: all 0.3s ease;
                }

                .cta-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                    opacity: 0.3;
                }

                .cta-container {
                    position: relative;
                    z-index: 2;
                }

                .cta-content {
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                }

                .cta-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: var(--cta-text-primary);
                    font-family: 'Poppins', sans-serif;
                    transition: color 0.3s ease;
                }

                .cta-subtitle {
                    font-size: 1.3rem;
                    margin-bottom: 2.5rem;
                    opacity: 0.9;
                    line-height: 1.6;
                    font-family: 'Poppins', sans-serif;
                    transition: color 0.3s ease;
                }

                .cta-actions {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }

                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    font-family: 'Poppins', sans-serif;
                }

                .cta-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .cta-btn:hover::before {
                    left: 100%;
                }

                .cta-btn-primary {
                    background: var(--cta-btn-primary-bg);
                    color: var(--cta-btn-primary-color);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .cta-btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
                    color: var(--cta-btn-primary-color);
                }

                .cta-btn-secondary {
                    background: var(--cta-btn-secondary-bg);
                    color: var(--cta-btn-secondary-color);
                    border: 2px solid var(--cta-btn-secondary-border);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                }

                .cta-btn-secondary:hover {
                    background: var(--cta-btn-secondary-hover-bg);
                    color: var(--cta-btn-secondary-hover-color);
                    transform: translateY(-3px);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
                }

                .cta-stats {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    flex-wrap: wrap;
                }

                .stat-item {
                    text-align: center;
                    padding: 1rem;
                    background: var(--cta-stat-bg);
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--cta-stat-border);
                    transition: all 0.3s ease;
                }

                .stat-item:hover {
                    transform: translateY(-5px);
                    background: var(--cta-stat-hover-bg);
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--cta-text-primary);
                    margin-bottom: 0.5rem;
                    display: block;
                    font-family: 'Poppins', sans-serif;
                    transition: color 0.3s ease;
                }

                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    font-weight: 500;
                    font-family: 'Poppins', sans-serif;
                    transition: color 0.3s ease;
                }

                /* Floating Elements Animation */
                .cta-section::after {
                    content: '';
                    position: absolute;
                    top: 20%;
                    right: 10%;
                    width: 100px;
                    height: 100px;
                    background: var(--cta-floating-bg);
                    border-radius: 50%;
                    animation: float 6s ease-in-out infinite;
                    transition: background 0.3s ease;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .cta-title {
                        font-size: 2.5rem;
                    }
                    
                    .cta-subtitle {
                        font-size: 1.1rem;
                        margin-bottom: 2rem;
                    }
                    
                    .cta-actions {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }
                    
                    .cta-btn {
                        width: 100%;
                        max-width: 300px;
                        justify-content: center;
                    }
                    
                    .cta-stats {
                        gap: 1.5rem;
                    }
                    
                    .stat-item {
                        padding: 0.75rem;
                        min-width: 120px;
                    }
                    
                    .stat-number {
                        font-size: 2rem;
                    }
                    
                    .stat-label {
                        font-size: 0.8rem;
                    }
                }

                @media (max-width: 576px) {
                    .cta-title {
                        font-size: 2rem;
                    }
                    
                    .cta-subtitle {
                        font-size: 1rem;
                    }
                    
                    .cta-btn {
                        padding: 0.875rem 1.5rem;
                        font-size: 1rem;
                    }
                    
                    .cta-stats {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }
                    
                    .stat-item {
                        width: 100%;
                        max-width: 200px;
                    }
                }
            </style>
            
            <section class="cta-section">
                <div class="container">
                    <div class="cta-container">
                        <div class="cta-content">
                            <h2 class="cta-title">Ready to find what you need?</h2>
                            <p class="cta-subtitle">Explore our quality products or find the perfect technician for your project</p>
                            
                            <div class="cta-actions">
                                <a href="/pages/marketplace.html" class="cta-btn cta-btn-primary">
                                    <i class="fas fa-laptop" style="margin-right: 0.5rem;"></i>
                                    Browse Products
                                </a>
                                <a href="/pages/technician/info-technician.html" class="cta-btn cta-btn-secondary">
                                    <i class="fas fa-tools" style="margin-right: 0.5rem;"></i>
                                    Find Technicians
                                </a>
                            </div>
                            
                            <div class="cta-stats">
                                <div class="stat-item">
                                    <div class="stat-number">500+</div>
                                    <div class="stat-label">Available Products</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">50+</div>
                                    <div class="stat-label">Expert Technicians</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">1000+</div>
                                    <div class="stat-label">Satisfied Customers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Apply dark mode when component is connected
        this.applyDarkMode();
        
        // Listen for theme changes
        this.addEventListener('themeChanged', this.applyDarkMode.bind(this));
        
        // Observe theme changes from parent
        this.observeThemeChanges();
    }

    applyDarkMode() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || 
                          document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            this.setAttribute('data-theme', 'dark');
            this.classList.add('dark-mode');
        } else {
            this.setAttribute('data-theme', 'light');
            this.classList.remove('dark-mode');
        }
    }

    observeThemeChanges() {
        // Create a mutation observer to watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'data-theme' || 
                     mutation.target.classList.contains('dark-mode'))) {
                    this.applyDarkMode();
                }
            });
        });

        // Observe the document element for theme changes
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        // Observe the body for class changes
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

customElements.define('recomputech-cta', RecomputechCTA);