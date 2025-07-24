class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cartItems = [];
        this.isMobile = window.innerWidth <= 767;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.loadCartFromStorage();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1030;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                :host(.dark-mode) {
                    background: rgba(24, 31, 42, 0.95);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .recomputech-header-navbar {
                    padding: 1rem 0;
                    font-size: 1.1rem;
                }

                .recomputech-navbar-container {
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    gap: 2rem;
                    padding-left: 60px;
                    padding-right: 60px;
                }

                /* Logo Section */
                .recomputech-navbar-brand {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }

                .recomputech-logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                    margin-right: 0.5rem;
                }

                .recomputech-logo-small {
                    width: 40px;
                    height: auto;
                }

                .recomputech-brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .recomputech-brand-name {
                    font-weight: 700;
                    font-size: 1.8rem;
                    color: #000;
                    margin: 0;
                }

                .recomputech-brand-tagline {
                    font-size: 1rem;
                    color: #666;
                    margin: 0;
                }

                :host(.dark-mode) .recomputech-brand-name,
                :host(.dark-mode) .recomputech-brand-tagline {
                    color: #fff;
                }

                /* Navigation Section */
                .recomputech-navbar-nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .recomputech-navbar-nav .recomputech-nav-link {
                    padding: 0 15px;
                    font-weight: 500;
                    font-size: 1.1rem;
                    color: #1f2937;
                    text-decoration: none;
                    transition: color 0.3s;
                }

                .recomputech-navbar-nav .recomputech-nav-link:hover {
                    color: #218DA6;
                }

                :host(.dark-mode) .recomputech-navbar-nav .recomputech-nav-link {
                    color: #fff;
                }

                :host(.dark-mode) .recomputech-navbar-nav .recomputech-nav-link:hover {
                    color: #3b82f6;
                }

                /* Actions Section */
                .recomputech-header-actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 1rem;
                }

                /* Cart Icon */
                .recomputech-cart-icon {
                    position: relative;
                    background: none;
                    border: none;
                    color: #218DA6;
                    font-size: 1.2rem;
                    padding: 8px;
                    border-radius: 0.375rem;
                    transition: color 0.3s, background-color 0.3s;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                }

                .recomputech-cart-icon:hover {
                    background-color: rgba(33, 141, 166, 0.1);
                    color: #1b6e82;
                }

                :host(.dark-mode) .recomputech-cart-icon {
                    color: #f1f1f1;
                }

                :host(.dark-mode) .recomputech-cart-icon:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: #218DA6;
                }

                .recomputech-cart-icon svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                .recomputech-cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    font-size: 0.7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                }

                /* Cart Sidebar */
                .recomputech-cart-sidebar {
                    position: fixed;
                    top: 0;
                    right: -400px;
                    width: 400px;
                    height: 100vh;
                    background: white;
                    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
                    z-index: 1050;
                    transition: right 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                :host(.dark-mode) .recomputech-cart-sidebar {
                    background: #1f2937;
                    color: white;
                }

                .recomputech-cart-sidebar.show {
                    right: 0;
                }

                .recomputech-cart-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1040;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }

                .recomputech-cart-overlay.show {
                    opacity: 1;
                    visibility: visible;
                }

                .recomputech-cart-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                :host(.dark-mode) .recomputech-cart-header {
                    border-bottom-color: #374151;
                }

                .recomputech-cart-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0;
                }

                :host(.dark-mode) .recomputech-cart-title {
                    color: white;
                }

                .recomputech-cart-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #666;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                :host(.dark-mode) .recomputech-cart-close {
                    color: #ccc;
                }

                .recomputech-cart-close svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                .recomputech-cart-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .recomputech-cart-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .recomputech-cart-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    background: #f9fafb;
                }

                :host(.dark-mode) .recomputech-cart-item {
                    border-color: #374151;
                    background: #374151;
                }

                .recomputech-cart-item-image {
                    width: 60px;
                    height: 60px;
                    background: #e5e7eb;
                    border-radius: 0.375rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                :host(.dark-mode) .recomputech-cart-item-image {
                    background: #4b5563;
                }

                .recomputech-cart-item-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .recomputech-cart-item-name {
                    font-weight: 600;
                    color: #1f2937;
                    margin: 0;
                }

                :host(.dark-mode) .recomputech-cart-item-name {
                    color: white;
                }

                .recomputech-cart-item-price {
                    color: #218DA6;
                    font-weight: 700;
                    font-size: 1.1rem;
                }

                .recomputech-cart-item-quantity {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .recomputech-cart-quantity-btn {
                    background: #f3f4f6;
                    border: 1px solid #d1d5db;
                    border-radius: 0.25rem;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                :host(.dark-mode) .recomputech-cart-quantity-btn {
                    background: #4b5563;
                    border-color: #6b7280;
                    color: white;
                }

                .recomputech-cart-quantity-btn:hover {
                    background: #e5e7eb;
                }

                :host(.dark-mode) .recomputech-cart-quantity-btn:hover {
                    background: #6b7280;
                }

                .recomputech-cart-quantity-input {
                    width: 40px;
                    text-align: center;
                    border: 1px solid #d1d5db;
                    border-radius: 0.25rem;
                    padding: 0.25rem;
                    font-size: 0.875rem;
                }

                :host(.dark-mode) .recomputech-cart-quantity-input {
                    background: #374151;
                    border-color: #6b7280;
                    color: white;
                }

                .recomputech-cart-item-remove {
                    background: none;
                    border: none;
                    color: #ef4444;
                    cursor: pointer;
                    padding: 0.25rem;
                    font-size: 1rem;
                }

                .recomputech-cart-item-remove:hover {
                    color: #dc2626;
                }

                .recomputech-cart-empty {
                    text-align: center;
                    padding: 2rem;
                    color: #6b7280;
                }

                :host(.dark-mode) .recomputech-cart-empty {
                    color: #9ca3af;
                }

                .recomputech-cart-footer {
                    padding: 1.5rem;
                    border-top: 1px solid #e5e7eb;
                    background: #f9fafb;
                }

                :host(.dark-mode) .recomputech-cart-footer {
                    border-top-color: #374151;
                    background: #374151;
                }

                .recomputech-cart-total {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                }

                .recomputech-cart-total-label {
                    color: #1f2937;
                }

                :host(.dark-mode) .recomputech-cart-total-label {
                    color: white;
                }

                .recomputech-cart-total-amount {
                    color: #218DA6;
                    font-size: 1.25rem;
                }

                .recomputech-cart-checkout {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: #218DA6;
                    color: white;
                    border: none;
                    border-radius: 0.375rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .recomputech-cart-checkout:hover {
                    background: #1b6e82;
                }

                /* Mobile Cart Page */
                .recomputech-mobile-cart-page {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: white;
                    z-index: 1060;
                    overflow-y: auto;
                }

                :host(.dark-mode) .recomputech-mobile-cart-page {
                    background: #1f2937;
                }

                .recomputech-mobile-cart-page.show {
                    display: block;
                }

                .recomputech-mobile-cart-header {
                    padding: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #f9fafb;
                }

                :host(.dark-mode) .recomputech-mobile-cart-header {
                    border-bottom-color: #374151;
                    background: #374151;
                }

                .recomputech-mobile-cart-back {
                    background: none;
                    border: none;
                    color: #218DA6;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .recomputech-mobile-cart-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin: 0;
                }

                :host(.dark-mode) .recomputech-mobile-cart-title {
                    color: white;
                }

                /* Responsive */
                @media (max-width: 767.98px) {
                    .recomputech-cart-sidebar {
                        width: 100%;
                        right: -100%;
                    }
                }

                /* Buttons */
                .recomputech-btn-icon {
                    font-size: 1.2rem;
                    padding: 8px;
                    background: none;
                    border: none;
                    color: #218DA6;
                    transition: color 0.3s, background-color 0.3s;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                }

                .recomputech-btn-icon:hover {
                    background-color: rgba(33, 141, 166, 0.1);
                    color: #1b6e82;
                }

                :host(.dark-mode) .recomputech-btn-icon {
                    color: #f1f1f1;
                }

                :host(.dark-mode) .recomputech-btn-icon:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: #218DA6;
                }

                .recomputech-btn-icon svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                .recomputech-btn-outline-primary {
                    padding: 8px 16px;
                    font-size: 1rem;
                    color: #218DA6;
                    background: transparent;
                    border: 1px solid #218DA6;
                    border-radius: 0.375rem;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .recomputech-btn-outline-primary:hover {
                    background: #218DA6;
                    color: #fff;
                }

                .recomputech-btn-primary {
                    padding: 8px 16px;
                    font-size: 1rem;
                    color: #fff;
                    background: #218DA6;
                    border: 1px solid #218DA6;
                    border-radius: 0.375rem;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .recomputech-btn-primary:hover {
                    background: #1b6e82;
                    border-color: #1b6e82;
                }

                /* Mobile Menu */
                .recomputech-navbar-toggler {
                    display: none;
                    background: none;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.375rem;
                    padding: 0.5rem;
                    color: #1f2937;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                }

                :host(.dark-mode) .recomputech-navbar-toggler {
                    border-color: #374151;
                    color: #fff;
                }

                .recomputech-navbar-toggler svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                /* Mobile Menu Overlay */
                .recomputech-mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1040;
                    display: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .recomputech-mobile-menu.show {
                    display: block;
                    opacity: 1;
                }

                .recomputech-mobile-menu-content {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
                    height: 100vh;
                    background: #fff;
                    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    padding: 2rem 1.5rem;
                    overflow-y: auto;
                }

                :host(.dark-mode) .recomputech-mobile-menu-content {
                    background: #1f2937;
                }

                .recomputech-mobile-menu.show .recomputech-mobile-menu-content {
                    transform: translateX(0);
                }

                .recomputech-mobile-menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                }

                :host(.dark-mode) .recomputech-mobile-menu-header {
                    border-bottom-color: #374151;
                }

                .recomputech-mobile-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #666;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                :host(.dark-mode) .recomputech-mobile-close {
                    color: #ccc;
                }

                .recomputech-mobile-close svg {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                .recomputech-mobile-nav {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 2rem 0;
                }

                .recomputech-mobile-nav li {
                    margin-bottom: 0.5rem;
                }

                .recomputech-mobile-nav a {
                    display: block;
                    padding: 1rem;
                    color: #1f2937;
                    text-decoration: none;
                    border-radius: 0.375rem;
                    transition: background-color 0.3s;
                    font-weight: 500;
                }

                .recomputech-mobile-nav a:hover {
                    background-color: #f3f4f6;
                    color: #218DA6;
                }

                :host(.dark-mode) .recomputech-mobile-nav a {
                    color: #fff;
                }

                :host(.dark-mode) .recomputech-mobile-nav a:hover {
                    background-color: #374151;
                    color: #3b82f6;
                }

                .recomputech-mobile-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .recomputech-mobile-cart {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 0.375rem;
                    margin-bottom: 1rem;
                }

                :host(.dark-mode) .recomputech-mobile-cart {
                    background: #374151;
                }

                .recomputech-mobile-cart-icon {
                    color: #218DA6;
                    font-size: 1.2rem;
                }

                .recomputech-mobile-cart-text {
                    color: #1f2937;
                    font-weight: 500;
                }

                :host(.dark-mode) .recomputech-mobile-cart-text {
                    color: #fff;
                }

                /* Responsive */
                @media (max-width: 991.98px) {
                    .recomputech-navbar-container {
                        grid-template-columns: 1fr auto;
                        gap: 1rem;
                        padding-left: 40px;
                        padding-right: 40px;
                    }

                    .recomputech-navbar-nav {
                        display: none;
                    }

                    .recomputech-navbar-toggler {
                        display: flex;
                    }

                    .recomputech-header-actions {
                        gap: 0.5rem;
                    }
                }

                @media (max-width: 767.98px) {
                    .recomputech-navbar-container {
                        grid-template-columns: 1fr auto;
                        padding-left: 30px;
                        padding-right: 30px;
                    }

                    .recomputech-brand-name {
                        font-size: 1.5rem;
                    }

                    .recomputech-brand-tagline {
                        font-size: 0.875rem;
                    }

                    .recomputech-logo {
                        width: 40px;
                        height: 40px;
                    }

                    .recomputech-header-actions {
                        gap: 0.25rem;
                    }

                    .recomputech-btn-outline-primary,
                    .recomputech-btn-primary {
                        padding: 6px 12px;
                        font-size: 0.9rem;
                    }

                    /* Hide cart, theme, and auth buttons on mobile */
                    .recomputech-cart-icon,
                    .recomputech-btn-icon,
                    .recomputech-btn-outline-primary,
                    .recomputech-btn-primary {
                        display: none;
                    }

                    /* Only show hamburger menu on mobile */
                    .recomputech-navbar-toggler {
                        display: flex;
                    }
                }

                @media (max-width: 575.98px) {
                    .recomputech-navbar-container {
                        padding-left: 20px;
                        padding-right: 20px;
                    }

                    .recomputech-brand-name {
                        font-size: 1.3rem;
                    }

                    .recomputech-brand-tagline {
                        font-size: 0.8rem;
                    }
                }
            </style>

            <nav class="recomputech-header-navbar">
                <div class="container">
                    <div class="recomputech-navbar-container">
                        <!-- Logo Section -->
                        <a class="recomputech-navbar-brand" href="index.html">
                            <img src="/assets/logos/logo-.png" alt="Logo" class="recomputech-logo recomputech-logo-small">
                            <div class="recomputech-brand-text">
                                <span class="recomputech-brand-name">Recomputech</span>
                                <span class="recomputech-brand-tagline">Sustainable Technology</span>
                            </div>
                        </a>

                        <!-- Navigation Section -->
                        <ul class="recomputech-navbar-nav">
                            <li><a class="recomputech-nav-link" href="/index.html">Home</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/marketplace.html">Marketplace</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/Aboutus.html">About Us</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/services.html">Services</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/contact.html">Contact</a></li>
                        </ul>

                        <!-- Actions Section -->
                        <div class="recomputech-header-actions">
                            <!-- Theme Toggle -->
                            <button class="recomputech-btn-icon" id="recomputech-theme-toggle" title="Toggle dark mode">
                                <svg class="moon-icon" viewBox="0 0 24 24">
                                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
                                </svg>
                                <svg class="sun-icon" viewBox="0 0 24 24" style="display: none;">
                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </button>

                                            <!-- Auth Buttons -->
                            <a href="/auth/auth.html" class="recomputech-btn-outline-primary">Login</a>
                            <a href="/auth/auth.html" class="recomputech-btn-primary">Register</a>

                            <!-- Cart Icon -->
                            <button class="recomputech-cart-icon" id="recomputech-cart-icon" title="Shopping Cart">
                                <svg viewBox="0 0 24 24">
                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                </svg>
                                <span class="recomputech-cart-badge" id="recomputech-cart-badge" style="display: none;">0</span>
                            </button>

                            <!-- Mobile Menu Toggle -->
                            <button class="recomputech-navbar-toggler" id="recomputech-navbar-toggler">
                                <svg viewBox="0 0 24 24">
                                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Mobile Menu Overlay -->
            <div class="recomputech-mobile-menu" id="recomputech-mobile-menu">
                <div class="recomputech-mobile-menu-content">
                    <div class="recomputech-mobile-menu-header">
                        <h3>Menu</h3>
                        <button class="recomputech-mobile-close" id="recomputech-mobile-close">
                            <svg viewBox="0 0 24 24">
                                <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <ul class="recomputech-mobile-nav">
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/pages/products.html">Products</a></li>
                        <li><a href="/pages/Aboutus.html">About Us</a></li>
                        <li><a href="/pages/services.html">Services</a></li>
                        <li><a href="/contact.html">Contact</a></li>
                    </ul>

                    <div class="recomputech-mobile-actions">
                        <div class="recomputech-mobile-cart" id="recomputech-mobile-cart">
                            <i class="fas fa-shopping-cart recomputech-mobile-cart-icon"></i>
                            <span class="recomputech-mobile-cart-text">Shopping Cart (0)</span>
                        </div>
                        
                        <div style="display: flex; gap: 1rem;">
                                            <a href="/auth/auth.html" class="recomputech-btn-outline-primary" style="flex: 1; text-align: center;">Login</a>
                <a href="/auth/auth.html" class="recomputech-btn-primary" style="flex: 1; text-align: center;">Register</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cart Sidebar -->
            <div class="recomputech-cart-overlay" id="recomputech-cart-overlay"></div>
            <div class="recomputech-cart-sidebar" id="recomputech-cart-sidebar">
                <div class="recomputech-cart-header">
                    <h3 class="recomputech-cart-title">Shopping Cart</h3>
                    <button class="recomputech-cart-close" id="recomputech-cart-close">
                        <svg viewBox="0 0 24 24">
                            <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                        </svg>
                    </button>
                </div>
                <div class="recomputech-cart-content">
                    <div class="recomputech-cart-items" id="recomputech-cart-items">
                        <!-- Cart items will be dynamically added here -->
                    </div>
                </div>
                <div class="recomputech-cart-footer">
                    <div class="recomputech-cart-total">
                        <span class="recomputech-cart-total-label">Total:</span>
                        <span class="recomputech-cart-total-amount" id="recomputech-cart-total">B/. 0.00</span>
                    </div>
                    <button class="recomputech-cart-checkout" id="recomputech-cart-checkout">
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            <!-- Mobile Cart Page -->
            <div class="recomputech-mobile-cart-page" id="recomputech-mobile-cart-page">
                <div class="recomputech-mobile-cart-header">
                    <button class="recomputech-mobile-cart-back" id="recomputech-mobile-cart-back">
                        <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Back
                    </button>
                    <h3 class="recomputech-mobile-cart-title">Shopping Cart</h3>
                    <div></div>
                </div>
                <div class="recomputech-cart-content">
                    <div class="recomputech-cart-items" id="recomputech-mobile-cart-items">
                        <!-- Mobile cart items will be dynamically added here -->
                    </div>
                </div>
                <div class="recomputech-cart-footer">
                    <div class="recomputech-cart-total">
                        <span class="recomputech-cart-total-label">Total:</span>
                        <span class="recomputech-cart-total-amount" id="recomputech-mobile-cart-total">B/. 0.00</span>
                    </div>
                    <button class="recomputech-cart-checkout" id="recomputech-mobile-cart-checkout">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const cartIcon = this.shadowRoot.getElementById('recomputech-cart-icon');
        const cartBadge = this.shadowRoot.getElementById('recomputech-cart-badge');
        const themeToggle = this.shadowRoot.getElementById('recomputech-theme-toggle');
        const mobileToggle = this.shadowRoot.getElementById('recomputech-navbar-toggler');
        const mobileMenu = this.shadowRoot.getElementById('recomputech-mobile-menu');
        const mobileClose = this.shadowRoot.getElementById('recomputech-mobile-close');
        const mobileCart = this.shadowRoot.getElementById('recomputech-mobile-cart');

        // Cart functionality
        cartIcon?.addEventListener('click', () => {
            this.handleCartClick();
        });

        // Mobile cart functionality
        mobileCart?.addEventListener('click', () => {
            this.handleCartClick();
            this.closeMobileMenu();
        });

        // Cart sidebar elements
        const cartSidebar = this.shadowRoot.getElementById('recomputech-cart-sidebar');
        const cartOverlay = this.shadowRoot.getElementById('recomputech-cart-overlay');
        const cartClose = this.shadowRoot.getElementById('recomputech-cart-close');
        const cartCheckout = this.shadowRoot.getElementById('recomputech-cart-checkout');

        // Mobile cart page elements
        const mobileCartPage = this.shadowRoot.getElementById('recomputech-mobile-cart-page');
        const mobileCartBack = this.shadowRoot.getElementById('recomputech-mobile-cart-back');
        const mobileCartCheckout = this.shadowRoot.getElementById('recomputech-mobile-cart-checkout');

        // Cart sidebar events
        cartClose?.addEventListener('click', () => {
            this.closeCart();
        });

        cartOverlay?.addEventListener('click', () => {
            this.closeCart();
        });

        cartCheckout?.addEventListener('click', () => {
            this.proceedToCheckout();
        });

        // Mobile cart page events
        mobileCartBack?.addEventListener('click', () => {
            this.closeMobileCart();
        });

        mobileCartCheckout?.addEventListener('click', () => {
            this.proceedToCheckout();
        });

        // Mobile menu toggle
        mobileToggle?.addEventListener('click', () => {
            this.openMobileMenu();
        });

        // Mobile menu close
        mobileClose?.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close mobile menu when clicking outside
        mobileMenu?.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                this.closeMobileMenu();
            }
        });

        // Theme toggle
        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Initialize theme
        this.initializeTheme();
    }

    handleCartClick() {
        if (this.isMobile) {
            this.openMobileCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartSidebar = this.shadowRoot.getElementById('recomputech-cart-sidebar');
        const cartOverlay = this.shadowRoot.getElementById('recomputech-cart-overlay');
        
        cartSidebar?.classList.add('show');
        cartOverlay?.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        this.renderCartItems();
    }

    closeCart() {
        const cartSidebar = this.shadowRoot.getElementById('recomputech-cart-sidebar');
        const cartOverlay = this.shadowRoot.getElementById('recomputech-cart-overlay');
        
        cartSidebar?.classList.remove('show');
        cartOverlay?.classList.remove('show');
        document.body.style.overflow = '';
    }

    openMobileCart() {
        const mobileCartPage = this.shadowRoot.getElementById('recomputech-mobile-cart-page');
        
        mobileCartPage?.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        this.renderMobileCartItems();
    }

    closeMobileCart() {
        const mobileCartPage = this.shadowRoot.getElementById('recomputech-mobile-cart-page');
        
        mobileCartPage?.classList.remove('show');
        document.body.style.overflow = '';
    }

    addToCart(product) {
        const existingItem = this.cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateCartBadge();
        this.saveCartToStorage();
        
        // Show notification
        this.showNotification(`${product.name} added to cart`, 'success');
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.updateCartBadge();
        this.saveCartToStorage();
        this.renderCartItems();
        this.renderMobileCartItems();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cartItems.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.updateCartBadge();
                this.saveCartToStorage();
                this.renderCartItems();
                this.renderMobileCartItems();
            }
        }
    }

    updateCartBadge() {
        const cartBadge = this.shadowRoot.getElementById('recomputech-cart-badge');
        const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        
        if (cartBadge) {
            if (totalItems > 0) {
                cartBadge.style.display = 'flex';
                cartBadge.textContent = totalItems;
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }

    renderCartItems() {
        const cartItemsContainer = this.shadowRoot.getElementById('recomputech-cart-items');
        const cartTotal = this.shadowRoot.getElementById('recomputech-cart-total');
        
        if (!cartItemsContainer) return;
        
        if (this.cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="recomputech-cart-empty">
                    <p>Your cart is empty</p>
                    <p>Add some products to get started!</p>
                </div>
            `;
            if (cartTotal) cartTotal.textContent = 'B/. 0.00';
            return;
        }
        
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="recomputech-cart-item">
                <div class="recomputech-cart-item-image">
                    <img src="${item.image || '/assets/images/laptop.avif'}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.375rem;">
                </div>
                <div class="recomputech-cart-item-info">
                    <h4 class="recomputech-cart-item-name">${item.name}</h4>
                    <div class="recomputech-cart-item-price">B/. ${item.price.toFixed(2)}</div>
                    <div class="recomputech-cart-item-quantity">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="recomputech-cart-quantity-input" value="${item.quantity}" min="1" onchange="this.getRootNode().host.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="recomputech-cart-item-remove" onclick="this.getRootNode().host.removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;">
                        <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                    </svg>
                </button>
            </div>
        `).join('');
        
        if (cartTotal) cartTotal.textContent = `B/. ${total.toFixed(2)}`;
    }

    renderMobileCartItems() {
        const mobileCartItemsContainer = this.shadowRoot.getElementById('recomputech-mobile-cart-items');
        const mobileCartTotal = this.shadowRoot.getElementById('recomputech-mobile-cart-total');
        
        if (!mobileCartItemsContainer) return;
        
        if (this.cartItems.length === 0) {
            mobileCartItemsContainer.innerHTML = `
                <div class="recomputech-cart-empty">
                    <p>Your cart is empty</p>
                    <p>Add some products to get started!</p>
                </div>
            `;
            if (mobileCartTotal) mobileCartTotal.textContent = 'B/. 0.00';
            return;
        }
        
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        mobileCartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="recomputech-cart-item">
                <div class="recomputech-cart-item-image">
                    <img src="${item.image || '/assets/images/laptop.avif'}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.375rem;">
                </div>
                <div class="recomputech-cart-item-info">
                    <h4 class="recomputech-cart-item-name">${item.name}</h4>
                    <div class="recomputech-cart-item-price">B/. ${item.price.toFixed(2)}</div>
                    <div class="recomputech-cart-item-quantity">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="recomputech-cart-quantity-input" value="${item.quantity}" min="1" onchange="this.getRootNode().host.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="recomputech-cart-item-remove" onclick="this.getRootNode().host.removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;">
                        <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                    </svg>
                </button>
            </div>
        `).join('');
        
        if (mobileCartTotal) mobileCartTotal.textContent = `B/. ${total.toFixed(2)}`;
    }

    saveCartToStorage() {
        localStorage.setItem('recomputech-cart', JSON.stringify(this.cartItems));
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('recomputech-cart');
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
            this.updateCartBadge();
        }
    }

    proceedToCheckout() {
        if (this.cartItems.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }
        
        // Here you can implement checkout logic
        console.log('Proceeding to checkout with items:', this.cartItems);
        this.showNotification('Redirecting to checkout...', 'success');
        
        // For demo purposes, you can redirect to a checkout page
        // window.location.href = '/checkout.html';
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 0.5rem;
            z-index: 9999;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    openMobileMenu() {
        const mobileMenu = this.shadowRoot.getElementById('recomputech-mobile-menu');
        mobileMenu?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileMenu = this.shadowRoot.getElementById('recomputech-mobile-menu');
        mobileMenu?.classList.remove('show');
        document.body.style.overflow = '';
    }

    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        const themeToggle = this.shadowRoot.getElementById('recomputech-theme-toggle');
        const moonIcon = themeToggle?.querySelector('.moon-icon');
        const sunIcon = themeToggle?.querySelector('.sun-icon');
        
        if (isDark) {
            // Switch to light mode
            body.classList.remove('dark-mode');
            this.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIcon) sunIcon.style.display = 'none';
        } else {
            // Switch to dark mode
            body.classList.add('dark-mode');
            this.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'block';
        }
        
        console.log('Theme toggled:', isDark ? 'light' : 'dark');
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const body = document.body;
        const themeToggle = this.shadowRoot.getElementById('recomputech-theme-toggle');
        const moonIcon = themeToggle?.querySelector('.moon-icon');
        const sunIcon = themeToggle?.querySelector('.sun-icon');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            this.classList.add('dark-mode');
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'block';
        } else {
            body.classList.remove('dark-mode');
            this.classList.remove('dark-mode');
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIcon) sunIcon.style.display = 'none';
        }
        
        console.log('Theme initialized:', savedTheme);
    }
}

customElements.define('recomputech-header', HeaderComponent); 