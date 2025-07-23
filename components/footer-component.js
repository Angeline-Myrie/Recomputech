class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                    color: #f9fafb;
                    margin-top: auto;
                }

                .recomputech-footer {
                    padding: 3rem 0 1rem 0;
                }

                .recomputech-footer-container {
                    padding-left: 60px;
                    padding-right: 60px;
                }

                .recomputech-footer-top {
                    padding-bottom: 2rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 2rem;
                }

                .recomputech-footer-widgets {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 2rem;
                }

                .recomputech-footer-widget h4 {
                    color: #218DA6;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    position: relative;
                }

                .recomputech-footer-widget h4::after {
                    content: '';
                    position: absolute;
                    bottom: -0.5rem;
                    left: 0;
                    width: 40px;
                    height: 3px;
                    background: linear-gradient(90deg, #218DA6, #3b82f6);
                    border-radius: 2px;
                }

                .recomputech-footer-widget p {
                    color: #d1d5db;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .recomputech-footer-widget ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .recomputech-footer-widget ul li {
                    margin-bottom: 0.75rem;
                }

                .recomputech-footer-widget ul li a {
                    color: #d1d5db;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .recomputech-footer-widget ul li a:hover {
                    color: #218DA6;
                    transform: translateX(5px);
                }

                .recomputech-footer-widget ul li a::before {
                    content: '→';
                    color: #218DA6;
                    font-weight: bold;
                    transition: transform 0.3s ease;
                }

                .recomputech-footer-widget ul li a:hover::before {
                    transform: translateX(3px);
                }

                .recomputech-contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .recomputech-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #d1d5db;
                }

                .recomputech-contact-icon {
                    width: 20px;
                    height: 20px;
                    color: #218DA6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .recomputech-contact-icon svg {
                    width: 16px;
                    height: 16px;
                    fill: currentColor;
                }

                .recomputech-newsletter-form {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .recomputech-newsletter-input {
                    flex: 1;
                    padding: 0.75rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 0.375rem;
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    font-size: 0.9rem;
                }

                .recomputech-newsletter-input::placeholder {
                    color: #9ca3af;
                }

                .recomputech-newsletter-input:focus {
                    outline: none;
                    border-color: #218DA6;
                    box-shadow: 0 0 0 3px rgba(33, 141, 166, 0.1);
                }

                .recomputech-newsletter-btn {
                    padding: 0.75rem 1rem;
                    background: linear-gradient(135deg, #218DA6, #1b6e82);
                    color: #fff;
                    border: none;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .recomputech-newsletter-btn:hover {
                    background: linear-gradient(135deg, #1b6e82, #155a6b);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(33, 141, 166, 0.3);
                }

                .recomputech-social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .recomputech-social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #d1d5db;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .recomputech-social-link:hover {
                    background: #218DA6;
                    color: #fff;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 16px rgba(33, 141, 166, 0.4);
                }

                .recomputech-social-link svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }

                /* Footer Bottom */
                .recomputech-footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .recomputech-footer-bottom-left {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .recomputech-copyright {
                    color: #9ca3af;
                    font-size: 0.9rem;
                }

                .recomputech-footer-links {
                    display: flex;
                    gap: 1.5rem;
                }

                .recomputech-footer-links a {
                    color: #d1d5db;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color 0.3s ease;
                }

                .recomputech-footer-links a:hover {
                    color: #218DA6;
                }

                .recomputech-payment-methods {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .recomputech-payment-icon {
                    width: 32px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 0.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #d1d5db;
                    font-size: 0.75rem;
                    font-weight: bold;
                }

                /* Responsive */
                @media (max-width: 991.98px) {
                    .recomputech-footer-widgets {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 2rem;
                    }

                    .recomputech-footer-container {
                        padding-left: 40px;
                        padding-right: 40px;
                    }
                }

                @media (max-width: 767.98px) {
                    .recomputech-footer {
                        padding: 2rem 0 1rem 0;
                    }

                    .recomputech-footer-widgets {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .recomputech-footer-bottom {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }

                    .recomputech-footer-bottom-left {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .recomputech-footer-links {
                        justify-content: center;
                    }

                    .recomputech-newsletter-form {
                        flex-direction: column;
                    }

                    .recomputech-social-links {
                        justify-content: center;
                    }

                    .recomputech-footer-container {
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                }

                @media (max-width: 575.98px) {
                    .recomputech-footer-widget h4 {
                        font-size: 1.1rem;
                    }

                    .recomputech-footer-bottom-left {
                        gap: 0.5rem;
                    }

                    .recomputech-footer-links {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }

                    .recomputech-footer-container {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
            </style>

            <footer class="recomputech-footer">
                <div class="recomputech-footer-container">
                    <!-- Footer Top - 4 Columns -->
                    <div class="recomputech-footer-top">
                        <div class="recomputech-footer-widgets">
                            <!-- Column 1: About/Brand -->
                            <div class="recomputech-footer-widget">
                                <h4>Recomputech</h4>
                                <p>Leading sustainable technology solutions. We specialize in refurbished devices and professional technical services, helping you save money while contributing to environmental conservation.</p>
                                <div class="recomputech-social-links">
                                    <a href="#" class="recomputech-social-link" title="Facebook">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <a href="#" class="recomputech-social-link" title="Twitter">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a href="#" class="recomputech-social-link" title="Instagram">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                                        </svg>
                                    </a>
                                    <a href="#" class="recomputech-social-link" title="LinkedIn">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <!-- Column 2: Quick Links -->
                            <div class="recomputech-footer-widget">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="/index.html">Home</a></li>
                                    <li><a href="/pages/products.html">Products</a></li>
                                    <li><a href="/pages/Aboutus.html">About Us</a></li>
                                    <li><a href="/pages/services.html">Services</a></li>
                                    <li><a href="/pages/technicians.html">Technicians</a></li>
                                    <li><a href="/contact.html">Contact</a></li>
                                </ul>
                            </div>

                            <!-- Column 3: Services -->
                            <div class="recomputech-footer-widget">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><a href="/pages/services.html">Device Repair</a></li>
                                    <li><a href="/pages/services.html">System Optimization</a></li>
                                    <li><a href="/pages/services.html">Data Recovery</a></li>
                                    <li><a href="/pages/services.html">Network Setup</a></li>
                                    <li><a href="/pages/services.html">Security Solutions</a></li>
                                    <li><a href="/pages/services.html">Warranty Services</a></li>
                                </ul>
                            </div>

                            <!-- Column 4: Contact & Newsletter -->
                            <div class="recomputech-footer-widget">
                                <h4>Contact & Newsletter</h4>
                                <div class="recomputech-contact-info">
                                    <div class="recomputech-contact-item">
                                        <div class="recomputech-contact-icon">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                            </svg>
                                        </div>
                                        <span>123 Main Street, City</span>
                                    </div>
                                    <div class="recomputech-contact-item">
                                        <div class="recomputech-contact-icon">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                            </svg>
                                        </div>
                                        <span>(123) 456-7890</span>
                                    </div>
                                    <div class="recomputech-contact-item">
                                        <div class="recomputech-contact-icon">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                            </svg>
                                        </div>
                                        <span>info@recomputech.com</span>
                                    </div>
                                </div>
                                
                                <div class="recomputech-newsletter-section">
                                    <p style="margin-bottom: 1rem; color: #d1d5db;">Subscribe to our newsletter</p>
                                    <form class="recomputech-newsletter-form">
                                        <input type="email" class="recomputech-newsletter-input" placeholder="Your email address">
                                        <button type="submit" class="recomputech-newsletter-btn">Subscribe</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <div class="recomputech-footer-bottom">
                        <div class="recomputech-footer-bottom-left">
                            <div class="recomputech-copyright">
                                © 2024 Recomputech. All rights reserved.
                            </div>
                            <div class="recomputech-footer-links">
                                <a href="#">Privacy Policy</a>
                                <a href="#">Terms of Service</a>
                                <a href="#">Cookie Policy</a>
                                <a href="#">Sitemap</a>
                            </div>
                        </div>
                        <div class="recomputech-payment-methods">
                            <div class="recomputech-payment-icon">VISA</div>
                            <div class="recomputech-payment-icon">MC</div>
                            <div class="recomputech-payment-icon">PP</div>
                            <div class="recomputech-payment-icon">BTC</div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('recomputech-footer', FooterComponent); 