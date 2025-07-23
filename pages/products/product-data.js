// Product Database for Recomputech
const PRODUCTS_DATABASE = {
    // PCs Refurbished
    'dell-3070': {
        id: 'dell-3070',
        name: 'DELL OptiPlex 3070',
        category: 'PCs Refurbished',
        price: 239.99,
        originalPrice: 399.99,
        discount: 40,
        images: [
            '/assets/images/pcs refurbished/DELL 3070.png',
            '/assets/images/pcs refurbished/DELL 3070.png',
            '/assets/images/pcs refurbished/DELL 3070.png'
        ],
        specs: {
            processor: 'Intel Core i5-8500 (6th Gen)',
            ram: '8GB DDR4',
            storage: '256GB SSD',
            graphics: 'Intel UHD Graphics 630',
            os: 'Windows 10 Pro',
            ports: 'USB 3.1, DisplayPort, VGA, Ethernet',
            warranty: '6 months'
        },
        description: 'High-performance desktop computer perfect for office work, light gaming, and multimedia tasks. Features a powerful Intel processor and fast SSD storage.',
        features: [
            'Fast Intel Core i5 processor',
            '8GB RAM for smooth multitasking',
            '256GB SSD for quick boot times',
            'Windows 10 Pro included',
            'Professional office-ready setup',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 15,
        sku: 'DELL-3070-REF',
        tags: ['desktop', 'office', 'intel', 'windows', 'refurbished']
    },

    'dell-7060': {
        id: 'dell-7060',
        name: 'DELL OptiPlex 7060',
        category: 'PCs Refurbished',
        price: 299.99,
        originalPrice: 499.99,
        discount: 40,
        images: [
            '/assets/images/pcs refurbished/DELL 7060.png',
            '/assets/images/pcs refurbished/DELL 7060.png',
            '/assets/images/pcs refurbished/DELL 7060.png'
        ],
        specs: {
            processor: 'Intel Core i7-8700 (8th Gen)',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            graphics: 'Intel UHD Graphics 630',
            os: 'Windows 10 Pro',
            ports: 'USB 3.1, DisplayPort, HDMI, Ethernet',
            warranty: '6 months'
        },
        description: 'Professional-grade desktop with Intel i7 processor, perfect for demanding applications, video editing, and multitasking.',
        features: [
            'Intel Core i7 processor',
            '16GB RAM for heavy workloads',
            '512GB SSD storage',
            'Windows 10 Pro',
            'Professional workstation',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 8,
        sku: 'DELL-7060-REF',
        tags: ['desktop', 'professional', 'intel', 'windows', 'refurbished']
    },

    'hp-elitedesk-800-g3': {
        id: 'hp-elitedesk-800-g3',
        name: 'HP EliteDesk 800 G3',
        category: 'PCs Refurbished',
        price: 349.99,
        originalPrice: 599.99,
        discount: 42,
        images: [
            '/assets/images/pcs refurbished/HP ELITEDESK 800 G3 MT.png',
            '/assets/images/pcs refurbished/HP ELITEDESK 800 G3 MT.png',
            '/assets/images/pcs refurbished/HP ELITEDESK 800 G3 MT.png'
        ],
        specs: {
            processor: 'Intel Core i7-7700 (7th Gen)',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            graphics: 'Intel HD Graphics 630',
            os: 'Windows 10 Pro',
            ports: 'USB 3.1, DisplayPort, VGA, Ethernet',
            warranty: '6 months'
        },
        description: 'Enterprise-grade desktop computer with powerful Intel i7 processor, ideal for business environments and professional use.',
        features: [
            'Intel Core i7 processor',
            '16GB RAM for multitasking',
            '512GB SSD storage',
            'Windows 10 Pro',
            'Enterprise security features',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 12,
        sku: 'HP-800G3-REF',
        tags: ['desktop', 'enterprise', 'intel', 'windows', 'refurbished']
    },

    // Laptops Refurbished


    'galaxy-book4-pro': {
        id: 'galaxy-book4-pro',
        name: 'Samsung Galaxy Book4 Pro',
        category: 'Laptops Refurbished',
        price: 999.99,
        originalPrice: 1449.99,
        discount: 31,
        images: [
            '/assets/images/laptops refurbished/Galaxy Book4 Pro.jpg',
            '/assets/images/laptops refurbished/Galaxy Book4 Pro.jpg',
            '/assets/images/laptops refurbished/Galaxy Book4 Pro.jpg'
        ],
        specs: {
            processor: 'Intel Core Ultra 7 155H',
            ram: '16GB LPDDR5X',
            storage: '512GB SSD',
            graphics: 'Intel Arc Graphics',
            display: '14\" Dynamic AMOLED 2X (2880 x 1800)',
            os: 'Windows 11 Home',
            battery: '63Wh',
            warranty: '6 months'
        },
        description: 'Ultra-light and powerful, the Galaxy Book4 Pro features a stunning AMOLED display and the latest Intel Core Ultra processor for exceptional performance and portability.',
        features: [
            'Intel Core Ultra 7 processor',
            '14\" Dynamic AMOLED 2X display',
            '16GB LPDDR5X RAM',
            '512GB SSD storage',
            'Sleek and lightweight design',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 7,
        sku: 'SAMSUNG-GB4PRO-REF',
        tags: ['laptop', 'ultrabook', 'samsung', 'intel', 'windows', 'refurbished']
    },

    'hp-pavilion-15': {
        id: 'hp-pavilion-15',
        name: 'HP Pavilion 15 Laptop',
        category: 'Laptops Refurbished',
        price: 549.99,
        originalPrice: 799.99,
        discount: 31,
        images: [
            '/assets/images/laptops refurbished/HP Portátil de alto rendimiento.png',
            '/assets/images/laptops refurbished/HP Portátil de alto rendimiento.png',
            '/assets/images/laptops refurbished/HP Portátil de alto rendimiento.png'
        ],
        specs: {
            processor: 'AMD Ryzen 7 5700U',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            graphics: 'AMD Radeon Graphics',
            display: '15.6\" Full HD (1920 x 1080)',
            os: 'Windows 11 Home',
            battery: '3-Cell 41Wh',
            warranty: '6 months'
        },
        description: 'A reliable and versatile laptop for everyday tasks, entertainment, and productivity, featuring a powerful AMD Ryzen 7 processor and a vibrant Full HD display.',
        features: [
            'AMD Ryzen 7 5700U processor',
            '16GB DDR4 RAM',
            '512GB SSD storage',
            '15.6\" Full HD display',
            'Lightweight and portable',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 10,
        sku: 'HP-PAV15-R7-REF',
        tags: ['laptop', 'hp', 'amd', 'windows', 'refurbished']
    },

    'hp-victus-15': {
        id: 'hp-victus-15',
        name: 'HP Victus 15 Gaming Laptop',
        category: 'Laptops Refurbished',
        price: 699.99,
        originalPrice: 999.99,
        discount: 30,
        images: [
            '/assets/images/laptops refurbished/HP Victus 15.jpg',
            '/assets/images/laptops refurbished/HP Victus 15.jpg',
            '/assets/images/laptops refurbished/HP Victus 15.jpg'
        ],
        specs: {
            processor: 'Intel Core i5-13420H (13th Gen)',
            ram: '8GB DDR4',
            storage: '512GB SSD',
            graphics: 'NVIDIA GeForce RTX 3050 6GB',
            display: '15.6\" FHD (1920x1080) 144Hz',
            os: 'Windows 11 Home',
            battery: '4-Cell 70Wh',
            warranty: '6 months'
        },
        description: 'Enter the world of gaming with the HP Victus 15, featuring a powerful Intel Core i5 processor, RTX 3050 graphics, and a fast 144Hz display for a competitive edge.',
        features: [
            '13th Gen Intel Core i5 processor',
            'NVIDIA GeForce RTX 3050 GPU',
            '15.6\" 144Hz high-refresh display',
            '8GB DDR4 RAM',
            '512GB SSD storage',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 8,
        sku: 'HP-VICTUS15-I5-REF',
        tags: ['laptop', 'gaming', 'hp', 'intel', 'nvidia', 'windows', 'refurbished']
    },

    'hp-probook-445-g11': {
        id: 'hp-probook-445-g11',
        name: 'HP ProBook 445 G11',
        category: 'Laptops Refurbished',
        price: 649.99,
        originalPrice: 949.99,
        discount: 32,
        images: [
            '/assets/images/laptops refurbished/Hp ProBook 445 G11.jpg',
            '/assets/images/laptops refurbished/Hp ProBook 445 G11.jpg',
            '/assets/images/laptops refurbished/Hp ProBook 445 G11.jpg'
        ],
        specs: {
            processor: 'AMD Ryzen 5 7530U',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            graphics: 'AMD Radeon Graphics',
            display: '14\" Full HD (1920 x 1080)',
            os: 'Windows 11 Pro',
            battery: '3-Cell 51Wh',
            warranty: '6 months'
        },
        description: 'A business-ready laptop offering robust performance and security features. The HP ProBook 445 G11 is perfect for professionals on the go.',
        features: [
            'AMD Ryzen 5 7530U processor',
            '16GB DDR4 RAM',
            '512GB SSD storage',
            'Windows 11 Pro for business',
            'HP Wolf Security',
            'Durable and lightweight design',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 12,
        sku: 'HP-PB445G11-REF',
        tags: ['laptop', 'business', 'hp', 'amd', 'windows', 'refurbished']
    },

    'lenovo-ideapad-gaming-3': {
        id: 'lenovo-ideapad-gaming-3',
        name: 'Lenovo IdeaPad Gaming 3',
        category: 'Laptops Refurbished',
        price: 599.99,
        originalPrice: 899.99,
        discount: 33,
        images: [
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Gaming 3.png',
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Gaming 3.png',
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Gaming 3.png'
        ],
        specs: {
            processor: 'AMD Ryzen 5 6600H',
            ram: '8GB DDR5',
            storage: '256GB SSD',
            graphics: 'NVIDIA GeForce RTX 3050 4GB',
            display: '15.6\" FHD (1920x1080) 120Hz',
            os: 'Windows 11 Home',
            battery: '45Wh',
            warranty: '6 months'
        },
        description: 'Step up your game with the Lenovo IdeaPad Gaming 3, featuring a powerful AMD Ryzen processor and NVIDIA RTX graphics for an immersive gaming experience.',
        features: [
            'AMD Ryzen 5 6600H processor',
            'NVIDIA GeForce RTX 3050 GPU',
            '15.6\" 120Hz high-refresh display',
            '8GB DDR5 RAM',
            '256GB SSD storage',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 9,
        sku: 'LENOVO-IPG3-REF',
        tags: ['laptop', 'gaming', 'lenovo', 'amd', 'nvidia', 'windows', 'refurbished']
    },

    'lenovo-ideapad-slim-3i': {
        id: 'lenovo-ideapad-slim-3i',
        name: 'Lenovo IdeaPad Slim 3i',
        category: 'Laptops Refurbished',
        price: 399.99,
        originalPrice: 599.99,
        discount: 33,
        images: [
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Slim 3i.png',
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Slim 3i.png',
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Slim 3i.png'
        ],
        specs: {
            processor: 'Intel Core i3-1215U (12th Gen)',
            ram: '8GB DDR4',
            storage: '256GB SSD',
            graphics: 'Intel UHD Graphics',
            display: '15.6\" Full HD (1920 x 1080)',
            os: 'Windows 11 Home',
            battery: '45Wh',
            warranty: '6 months'
        },
        description: 'A sleek and lightweight laptop for everyday productivity and entertainment, featuring a 12th Gen Intel Core i3 processor and a crisp Full HD display.',
        features: [
            '12th Gen Intel Core i3 processor',
            '8GB DDR4 RAM',
            '256GB SSD storage',
            '15.6\" Full HD display',
            'Thin and light design',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 15,
        sku: 'LENOVO-IPS3I-REF',
        tags: ['laptop', 'lenovo', 'intel', 'windows', 'refurbished']
    },

    'lenovo-ideapad-slim-5i': {
        id: 'lenovo-ideapad-slim-5i',
        name: 'Lenovo IdeaPad Slim 5i',
        category: 'Laptops Refurbished',
        price: 699.99,
        originalPrice: 999.99,
        discount: 30,
        images: [
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Slim 5i.png',
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Slim 5i.png',
            '/assets/images/laptops refurbished/Laptop Lenovo IdeaPad Slim 5i.png'
        ],
        specs: {
            processor: 'Intel Core i7-1355U (13th Gen)',
            ram: '16GB LPDDR5',
            storage: '512GB SSD',
            graphics: 'Intel Iris Xe Graphics',
            display: '16\" WUXGA (1920x1200) OLED',
            os: 'Windows 11 Home',
            battery: '56.6Wh',
            warranty: '6 months'
        },
        description: 'Experience stunning visuals with the OLED display and powerful performance with the 13th Gen Intel Core i7 processor. The IdeaPad Slim 5i is perfect for creative professionals.',
        features: [
            '13th Gen Intel Core i7 processor',
            '16\" OLED display',
            '16GB LPDDR5 RAM',
            '512GB SSD storage',
            'Lightweight and premium design',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 6,
        sku: 'LENOVO-IPS5I-REF',
        tags: ['laptop', 'lenovo', 'intel', 'oled', 'windows', 'refurbished']
    },

    'lenovo-ideapad-1': {
        id: 'lenovo-ideapad-1',
        name: 'Lenovo IdeaPad 1',
        category: 'Laptops Refurbished',
        price: 249.99,
        originalPrice: 399.99,
        discount: 38,
        images: [
            '/assets/images/laptops refurbished/Lenovo IdeaPad 1 Laptop.png',
            '/assets/images/laptops refurbished/Lenovo IdeaPad 1 Laptop.png',
            '/assets/images/laptops refurbished/Lenovo IdeaPad 1 Laptop.png'
        ],
        specs: {
            processor: 'AMD Ryzen 3 3250U',
            ram: '8GB DDR4',
            storage: '128GB SSD',
            graphics: 'AMD Radeon Graphics',
            display: '14\" HD (1366 x 768)',
            os: 'Windows 11 Home in S Mode',
            battery: '35Wh',
            warranty: '6 months'
        },
        description: 'An affordable and reliable laptop for everyday tasks like browsing, email, and streaming. The IdeaPad 1 is perfect for students and casual users.',
        features: [
            'AMD Ryzen 3 3250U processor',
            '8GB DDR4 RAM',
            '128GB SSD storage',
            'Compact and lightweight',
            'Windows 11 Home in S Mode',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 20,
        sku: 'LENOVO-IP1-REF',
        tags: ['laptop', 'lenovo', 'amd', 'windows', 'refurbished']
    },

    'lenovo-yoga-book-9i': {
        id: 'lenovo-yoga-book-9i',
        name: 'Lenovo Yoga Book 9i Dual-Screen',
        category: 'Laptops Refurbished',
        price: 1499.99,
        originalPrice: 2299.99,
        discount: 35,
        images: [
            '/assets/images/laptops refurbished/Lenovo Yoga Book 9i.png',
            '/assets/images/laptops refurbished/Lenovo Yoga Book 9i.png',
            '/assets/images/laptops refurbished/Lenovo Yoga Book 9i.png'
        ],
        specs: {
            processor: 'Intel Core i7-1355U (13th Gen)',
            ram: '16GB LPDDR5X',
            storage: '1TB SSD',
            graphics: 'Intel Iris Xe Graphics',
            display: 'Dual 13.3\" 2.8K (2880x1800) OLED',
            os: 'Windows 11 Home',
            battery: '80Wh',
            warranty: '6 months'
        },
        description: 'Unleash your creativity with the revolutionary dual-screen Yoga Book 9i. Two full-sized OLED displays offer unmatched multitasking and versatility.',
        features: [
            'Dual 13.3\" 2.8K OLED displays',
            '13th Gen Intel Core i7 processor',
            '16GB LPDDR5X RAM',
            '1TB SSD storage',
            '360° hinge for multiple modes',
            'Windows 11 Home',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 4,
        sku: 'LENOVO-YB9I-REF',
        tags: ['laptop', 'dual-screen', 'lenovo', 'intel', 'oled', 'windows', 'refurbished']
    },

    'samsung-galaxy-book3-business': {
        id: 'samsung-galaxy-book3-business',
        name: 'Samsung Galaxy Book3 Business',
        category: 'Laptops Refurbished',
        price: 799.99,
        originalPrice: 1199.99,
        discount: 33,
        images: [
            '/assets/images/laptops refurbished/SAMSUNG Computadora portátil empresarial Galaxy Book3.jpg',
            '/assets/images/laptops refurbished/SAMSUNG Computadora portátil empresarial Galaxy Book3.jpg',
            '/assets/images/laptops refurbished/SAMSUNG Computadora portátil empresarial Galaxy Book3.jpg'
        ],
        specs: {
            processor: 'Intel Core i7-1355U (13th Gen)',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            graphics: 'Intel Iris Xe Graphics',
            display: '15.6\" Full HD (1920 x 1080)',
            os: 'Windows 11 Pro',
            battery: '54Wh',
            warranty: '6 months'
        },
        description: 'A powerful and secure business laptop designed for productivity. The Galaxy Book3 for Business offers robust performance and enterprise-grade features.',
        features: [
            '13th Gen Intel Core i7 processor',
            '16GB DDR4 RAM',
            '512GB SSD storage',
            'Windows 11 Pro for business',
            'Durable and professional design',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 11,
        sku: 'SAMSUNG-GB3BIZ-REF',
        tags: ['laptop', 'business', 'samsung', 'intel', 'windows', 'refurbished']
    },

    'samsung-galaxy-chromebook-go': {
        id: 'samsung-galaxy-chromebook-go',
        name: 'Samsung Galaxy Chromebook Go',
        category: 'Laptops Refurbished',
        price: 179.99,
        originalPrice: 299.99,
        discount: 40,
        images: [
            '/assets/images/laptops refurbished/Samsung Computadora portátil Galaxy Chromebook Go.jpg',
            '/assets/images/laptops refurbished/Samsung Computadora portátil Galaxy Chromebook Go.jpg',
            '/assets/images/laptops refurbished/Samsung Computadora portátil Galaxy Chromebook Go.jpg'
        ],
        specs: {
            processor: 'Intel Celeron N4500',
            ram: '4GB LPDDR4X',
            storage: '32GB eMMC',
            graphics: 'Intel UHD Graphics',
            display: '14\" HD (1366 x 768)',
            os: 'ChromeOS',
            battery: '42.3Wh',
            warranty: '6 months'
        },
        description: 'A light, durable, and affordable Chromebook perfect for students and on-the-go productivity. Enjoy the simplicity and security of ChromeOS.',
        features: [
            'Intel Celeron N4500 processor',
            '4GB LPDDR4X RAM',
            '32GB eMMC storage',
            'Lightweight and durable design',
            'ChromeOS',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 25,
        sku: 'SAMSUNG-CBGO-REF',
        tags: ['laptop', 'chromebook', 'samsung', 'intel', 'chromeos', 'refurbished']
    },

    // Smartphones Refurbished
    'galaxy-s21': {
        id: 'galaxy-s21',
        name: 'Galaxy S21 5G',
        category: 'Smartphones Refurbished',
        price: 399.99,
        originalPrice: 699.99,
        discount: 43,
        images: [
            '/assets/images/smartphones refurbished/Galaxy S21 5G 128GB - Gray.png',
            '/assets/images/smartphones refurbished/Galaxy S21 5G 128GB - Gray.png',
            '/assets/images/smartphones refurbished/Galaxy S21 5G 128GB - Gray.png'
        ],
        specs: {
            processor: 'Exynos 2100 / Snapdragon 888',
            ram: '8GB',
            storage: '128GB',
            display: '6.2" Dynamic AMOLED 2X',
            camera: '64MP + 12MP + 12MP',
            battery: '4000mAh',
            os: 'Android 11, One UI 3.1',
            warranty: '6 months'
        },
        description: 'Flagship Samsung smartphone with 5G capability, professional camera system, and premium design. Perfect for photography and productivity.',
        features: [
            '5G connectivity',
            'Professional camera system',
            'Dynamic AMOLED display',
            'Fast charging',
            'Wireless charging',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 25,
        sku: 'SAMSUNG-S21-REF',
        tags: ['smartphone', '5g', 'samsung', 'android', 'refurbished']
    },

    'iphone-13': {
        id: 'iphone-13',
        name: 'iPhone 13 128GB',
        category: 'Smartphones Refurbished',
        price: 599.99,
        originalPrice: 899.99,
        discount: 33,
        images: [
            '/assets/images/smartphones refurbished/iPhone 13 128GB - Pink.png',
            '/assets/images/smartphones refurbished/iPhone 13 128GB - Pink.png',
            '/assets/images/smartphones refurbished/iPhone 13 128GB - Pink.png'
        ],
        specs: {
            processor: 'Apple A15 Bionic',
            ram: '4GB',
            storage: '128GB',
            display: '6.1" Super Retina XDR',
            camera: '12MP + 12MP',
            battery: '3240mAh',
            os: 'iOS 15',
            warranty: '6 months'
        },
        description: 'Apple iPhone 13 with A15 Bionic chip, advanced camera system, and all-day battery life. Perfect for photography and iOS ecosystem.',
        features: [
            'A15 Bionic chip',
            'Advanced camera system',
            'Super Retina XDR display',
            'All-day battery life',
            'iOS 15',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 18,
        sku: 'APPLE-IPHONE13-REF',
        tags: ['smartphone', 'apple', 'ios', 'camera', 'refurbished']
    },

    // Tablets
    'ipad-pro-11': {
        id: 'ipad-pro-11',
        name: 'iPad Pro 11"',
        category: 'Tablets',
        price: 699.99,
        originalPrice: 999.99,
        discount: 30,
        images: [
            '/assets/images/tablet.png',
            '/assets/images/tablet.png',
            '/assets/images/tablet.png'
        ],
        specs: {
            processor: 'Apple M1 chip',
            ram: '8GB',
            storage: '256GB',
            display: '11" Liquid Retina',
            camera: '12MP + 10MP',
            battery: 'All-day battery',
            os: 'iPadOS 15',
            warranty: '6 months'
        },
        description: 'Professional iPad Pro with M1 chip, perfect for creative work, note-taking, and productivity. Compatible with Apple Pencil and Magic Keyboard.',
        features: [
            'Apple M1 chip',
            'Liquid Retina display',
            'Apple Pencil compatible',
            'Magic Keyboard compatible',
            'iPadOS 15',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 10,
        sku: 'APPLE-IPADPRO11-REF',
        tags: ['tablet', 'apple', 'ipados', 'creative', 'refurbished']
    },

    // Mini PCs
    'lenovo-m920q': {
        id: 'lenovo-m920q',
        name: 'Lenovo M920q Mini PC',
        category: 'Mini PCs',
        price: 199.99,
        originalPrice: 349.99,
        discount: 43,
        images: [
            '/assets/images/pcs refurbished/Lenovo M920q Mini PC.png',
            '/assets/images/pcs refurbished/Lenovo M920q Mini PC.png',
            '/assets/images/pcs refurbished/Lenovo M920q Mini PC.png'
        ],
        specs: {
            processor: 'Intel Core i5-8500T',
            ram: '8GB DDR4',
            storage: '256GB SSD',
            graphics: 'Intel UHD Graphics 630',
            os: 'Windows 10 Pro',
            ports: 'USB 3.1, DisplayPort, VGA, Ethernet',
            warranty: '6 months'
        },
        description: 'Compact mini PC perfect for space-constrained environments. Ideal for office work, digital signage, and home theater setups.',
        features: [
            'Compact design',
            'Intel Core i5 processor',
            '8GB RAM',
            '256GB SSD',
            'Windows 10 Pro',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 127,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 20,
        sku: 'LENOVO-M920Q-REF',
        tags: ['mini-pc', 'compact', 'intel', 'windows', 'refurbished']
    }
};

// Helper functions
function getProductById(id) {
    return PRODUCTS_DATABASE[id] || null;
}

function getProductsByCategory(category) {
    return Object.values(PRODUCTS_DATABASE).filter(product => product.category === category);
}

function getRelatedProducts(currentProduct, limit = 4) {
    const related = Object.values(PRODUCTS_DATABASE).filter(product => 
        product.id !== currentProduct.id && 
        (product.category === currentProduct.category || 
         product.tags.some(tag => currentProduct.tags.includes(tag)))
    );
    return related.slice(0, limit);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(PRODUCTS_DATABASE).filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTS_DATABASE,
        getProductById,
        getProductsByCategory,
        getRelatedProducts,
        searchProducts
    };
} 