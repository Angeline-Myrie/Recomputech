// CTA Component
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
                /* CTA Component Styles */
                .cta-section {
                    background: linear-gradient(135deg, #2191a6 0%, #1b6e82 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                    padding: 4rem 0;
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
                    color: white;
                    font-family: 'Poppins', sans-serif;
                }

                .cta-subtitle {
                    font-size: 1.3rem;
                    margin-bottom: 2.5rem;
                    opacity: 0.9;
                    line-height: 1.6;
                    font-family: 'Poppins', sans-serif;
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
                    background: white;
                    color: #2191a6;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .cta-btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
                    color: #2191a6;
                }

                .cta-btn-secondary {
                    background: transparent;
                    color: white;
                    border: 2px solid white;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                }

                .cta-btn-secondary:hover {
                    background: white;
                    color: #2191a6;
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
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .stat-item:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.15);
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.5rem;
                    display: block;
                    font-family: 'Poppins', sans-serif;
                }

                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    font-weight: 500;
                    font-family: 'Poppins', sans-serif;
                }

                /* Floating Elements Animation */
                .cta-section::after {
                    content: '';
                    position: absolute;
                    top: 20%;
                    right: 10%;
                    width: 100px;
                    height: 100px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    animation: float 6s ease-in-out infinite;
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
                                <a href="${basePath}pages/products.html" class="cta-btn cta-btn-primary">
                                    <i class="fas fa-laptop" style="margin-right: 0.5rem;"></i>
                                    Browse Products
                                </a>
                                <a href="${basePath}pages/technicians.html" class="cta-btn cta-btn-secondary">
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
    }
}

customElements.define('recomputech-cta', RecomputechCTA); 