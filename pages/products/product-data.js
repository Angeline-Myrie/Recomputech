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
            '/assets/images/pcs refurbished/DELL 3070.2.png',
            '/assets/images/pcs refurbished/DELL 3070.3.png'
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
            '/assets/images/pcs refurbished/DELL 7060.1.png',
            '/assets/images/pcs refurbished/DELL 7060.2.png',
            '/assets/images/pcs refurbished/DELL 7060.3.png'
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
            '/assets/images/pcs refurbished/HP ELITEDESK 800 G3 MT..png',
            '/assets/images/pcs refurbished/HP ELITEDESK 800 G3 MT..2.png',
            '/assets/images/pcs refurbished/HP ELITEDESK 800 G3 MT.3.png'
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
            '/assets/images/smartphones refurbished/Galaxy S21 5G 128GB.3.png',
            '/assets/images/smartphones refurbished/Galaxy S21 5G 128GB.2.png'
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
            '/assets/images/smartphones refurbished/iphone-13-pink.png',
            '/assets/images/smartphones refurbished/iPhone 13 128GB.2.png',
            '/assets/images/smartphones refurbished/iPhone 13 128GB.3.png'
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

    'galaxy-s23-fe': {
        id: 'galaxy-s23-fe',
        name: 'Galaxy S23 FE 128GB',
        category: 'Smartphones Refurbished',
        price: 499.99,
        originalPrice: 799.99,
        discount: 38,
        images: [
            '/assets/images/smartphones refurbished/Galaxy S23 FE 128GB - Gray.png',
            '/assets/images/smartphones refurbished/Galaxy S23 FE 128GB - Gray.png',
            '/assets/images/smartphones refurbished/Galaxy S23 FE 128GB - Gray.png'
        ],
        specs: {
            processor: 'Exynos 2200 / Snapdragon 8 Gen 1',
            ram: '8GB',
            storage: '128GB',
            display: '6.4\" Dynamic AMOLED 2X',
            camera: '50MP + 12MP + 8MP',
            battery: '4500mAh',
            os: 'Android 13, One UI 5.1',
            warranty: '6 months'
        },
        description: 'The Galaxy S23 FE brings fan-favorite features to a new flagship, with a pro-grade camera and powerful performance.',
        features: [
            'Pro-grade camera',
            'Vibrant AMOLED display',
            'All-day battery',
            'Powerful performance',
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
        sku: 'SAMSUNG-S23FE-REF',
        tags: ['smartphone', 'samsung', 'android', 'camera', 'refurbished']
    },

    'galaxy-s23-ultra': {
        id: 'galaxy-s23-ultra',
        name: 'Galaxy S23 Ultra 256GB',
        category: 'Smartphones Refurbished',
        price: 899.99,
        originalPrice: 1299.99,
        discount: 31,
        images: [
            '/assets/images/smartphones refurbished/Galaxy S23 Ultra 256GB - Black.png',
            '/assets/images/smartphones refurbished/Galaxy S23 Ultra 256GB - Black.png',
            '/assets/images/smartphones refurbished/Galaxy S23 Ultra 256GB - Black.png'
        ],
        specs: {
            processor: 'Snapdragon 8 Gen 2 for Galaxy',
            ram: '12GB',
            storage: '256GB',
            display: '6.8\" Dynamic AMOLED 2X',
            camera: '200MP + 12MP + 10MP + 10MP',
            battery: '5000mAh',
            os: 'Android 13, One UI 5.1',
            warranty: '6 months'
        },
        description: 'The ultimate flagship experience with a groundbreaking 200MP camera, built-in S Pen, and unparalleled performance.',
        features: [
            '200MP camera system',
            'Built-in S Pen',
            'Dynamic AMOLED 2X display',
            'Next-gen gaming performance',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.9,
            reviews: 210,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 10,
        sku: 'SAMSUNG-S23ULTRA-REF',
        tags: ['smartphone', 'samsung', 'android', 's-pen', 'camera', 'refurbished']
    },

    'galaxy-z-flip6': {
        id: 'galaxy-z-flip6',
        name: 'Galaxy Z Flip6 256GB',
        category: 'Smartphones Refurbished',
        price: 799.99,
        originalPrice: 1099.99,
        discount: 27,
        images: [
            '/assets/images/smartphones refurbished/Galaxy Z Flip6 256GB - Green.png',
            '/assets/images/smartphones refurbished/Galaxy Z Flip6 256GB - Green.png',
            '/assets/images/smartphones refurbished/Galaxy Z Flip6 256GB - Green.png'
        ],
        specs: {
            processor: 'Snapdragon 8 Gen 3 for Galaxy',
            ram: '8GB',
            storage: '256GB',
            display: '6.7\" Foldable Dynamic AMOLED 2X',
            camera: '50MP + 12MP',
            battery: '4000mAh',
            os: 'Android 14, One UI 6.1',
            warranty: '6 months'
        },
        description: 'A stylish and compact foldable phone that fits in your pocket. The large cover screen offers new ways to interact and create.',
        features: [
            'Foldable design',
            'Large cover screen',
            'FlexCam for hands-free photos',
            'Powerful performance',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.7,
            reviews: 95,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 12,
        sku: 'SAMSUNG-ZFLIP6-REF',
        tags: ['smartphone', 'foldable', 'samsung', 'android', 'refurbished']
    },

    'google-pixel-6a': {
        id: 'google-pixel-6a',
        name: 'Google Pixel 6a 128GB',
        category: 'Smartphones Refurbished',
        price: 349.99,
        originalPrice: 449.99,
        discount: 22,
        images: [
            '/assets/images/smartphones refurbished/Google Pixel 6a 128GB - Green.png',
            '/assets/images/smartphones refurbished/Google Pixel 6a 128GB - Green.png',
            '/assets/images/smartphones refurbished/Google Pixel 6a 128GB - Green.png'
        ],
        specs: {
            processor: 'Google Tensor',
            ram: '6GB',
            storage: '128GB',
            display: '6.1\" OLED',
            camera: '12.2MP + 12MP',
            battery: '4410mAh',
            os: 'Android 12',
            warranty: '6 months'
        },
        description: 'The smarts of Google in a powerful and affordable package. Features the Google Tensor chip and an amazing camera.',
        features: [
            'Google Tensor chip',
            'Incredible camera quality',
            'All-day battery',
            'Clean Android experience',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.6,
            reviews: 88,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 20,
        sku: 'GOOGLE-PIXEL6A-REF',
        tags: ['smartphone', 'google', 'pixel', 'android', 'camera', 'refurbished']
    },

    'google-pixel-7': {
        id: 'google-pixel-7',
        name: 'Google Pixel 7 128GB',
        category: 'Smartphones Refurbished',
        price: 499.99,
        originalPrice: 599.99,
        discount: 17,
        images: [
            '/assets/images/smartphones refurbished/Google Pixel 7 128GB - Black.png',
            '/assets/images/smartphones refurbished/Google Pixel 7 128GB - Black.png',
            '/assets/images/smartphones refurbished/Google Pixel 7 128GB - Black.png'
        ],
        specs: {
            processor: 'Google Tensor G2',
            ram: '8GB',
            storage: '128GB',
            display: '6.3\" OLED, 90Hz',
            camera: '50MP + 12MP',
            battery: '4355mAh',
            os: 'Android 13',
            warranty: '6 months'
        },
        description: 'The helpful Google phone, with the powerful Tensor G2 chip, an advanced camera, and amazing AI features.',
        features: [
            'Google Tensor G2 chip',
            'Advanced camera with Real Tone',
            'Smooth 90Hz display',
            'VPN by Google One included',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.7,
            reviews: 150,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 18,
        sku: 'GOOGLE-PIXEL7-REF',
        tags: ['smartphone', 'google', 'pixel', 'android', 'camera', 'refurbished']
    },

    'google-pixel-8': {
        id: 'google-pixel-8',
        name: 'Google Pixel 8 128GB',
        category: 'Smartphones Refurbished',
        price: 649.99,
        originalPrice: 799.99,
        discount: 19,
        images: [
            '/assets/images/smartphones refurbished/Google Pixel 8 128GB - Rose Gold.png',
            '/assets/images/smartphones refurbished/Google Pixel 8 128GB - Rose Gold.png',
            '/assets/images/smartphones refurbished/Google Pixel 8 128GB - Rose Gold.png'
        ],
        specs: {
            processor: 'Google Tensor G3',
            ram: '8GB',
            storage: '128GB',
            display: '6.2\" Actua OLED, 120Hz',
            camera: '50MP + 12MP',
            battery: '4575mAh',
            os: 'Android 14',
            warranty: '6 months'
        },
        description: 'The Google Pixel 8, engineered by Google with the powerful Tensor G3 chip and cutting-edge AI for a more helpful and personal experience.',
        features: [
            'Google Tensor G3 chip',
            'Best Take and Magic Editor',
            'Super bright 120Hz display',
            '7 years of OS updates',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 190,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 14,
        sku: 'GOOGLE-PIXEL8-REF',
        tags: ['smartphone', 'google', 'pixel', 'android', 'ai', 'camera', 'refurbished']
    },

    'google-pixel-9-pro-xl': {
        id: 'google-pixel-9-pro-xl',
        name: 'Google Pixel 9 Pro XL 512GB',
        category: 'Smartphones Refurbished',
        price: 999.99,
        originalPrice: 1399.99,
        discount: 29,
        images: [
            '/assets/images/smartphones refurbished/Google Pixel 9 Pro XL 512GB - Black.png',
            '/assets/images/smartphones refurbished/Google Pixel 9 Pro XL 512GB - Black.png',
            '/assets/images/smartphones refurbished/Google Pixel 9 Pro XL 512GB - Black.png'
        ],
        specs: {
            processor: 'Google Tensor G4',
            ram: '16GB',
            storage: '512GB',
            display: '6.8\" Super Actua LTPO OLED, 120Hz',
            camera: '50MP + 50MP + 50MP',
            battery: '5100mAh',
            os: 'Android 15',
            warranty: '6 months'
        },
        description: 'The ultimate Pixel experience with the most advanced camera system, a pro-level display, and the powerful Google Tensor G4 chip.',
        features: [
            'Google Tensor G4 chip',
            'Pro camera system with manual controls',
            'Largest Pixel display ever',
            'AI-powered features',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.9,
            reviews: 250,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 8,
        sku: 'GOOGLE-PIXEL9PROXL-REF',
        tags: ['smartphone', 'google', 'pixel', 'pro', 'android', 'camera', 'refurbished']
    },

    'iphone-13-mini': {
        id: 'iphone-13-mini',
        name: 'iPhone 13 mini 256GB',
        category: 'Smartphones Refurbished',
        price: 549.99,
        originalPrice: 799.99,
        discount: 31,
        images: [
            '/assets/images/smartphones refurbished/iPhone 13 mini 256GB – Blue.png',
            '/assets/images/smartphones refurbished/iPhone 13 mini 256GB – Blue.png',
            '/assets/images/smartphones refurbished/iPhone 13 mini 256GB – Blue.png'
        ],
        specs: {
            processor: 'Apple A15 Bionic',
            ram: '4GB',
            storage: '256GB',
            display: '5.4\" Super Retina XDR',
            camera: '12MP + 12MP',
            battery: '2438mAh',
            os: 'iOS 15',
            warranty: '6 months'
        },
        description: 'A compact powerhouse with the A15 Bionic chip, advanced dual-camera system, and a bright Super Retina XDR display.',
        features: [
            'A15 Bionic chip',
            'Compact 5.4-inch display',
            'Advanced dual-camera system',
            'Ceramic Shield front',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.7,
            reviews: 110,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 16,
        sku: 'APPLE-IPHONE13MINI-REF',
        tags: ['smartphone', 'apple', 'ios', 'compact', 'refurbished']
    },

    'iphone-14': {
        id: 'iphone-14',
        name: 'iPhone 14 128GB',
        category: 'Smartphones Refurbished',
        price: 699.99,
        originalPrice: 999.99,
        discount: 30,
        images: [
            '/assets/images/smartphones refurbished/iPhone 14 128GB - Midnight.png',
            '/assets/images/smartphones refurbished/iPhone 14 128GB - Midnight.png',
            '/assets/images/smartphones refurbished/iPhone 14 128GB - Midnight.png'
        ],
        specs: {
            processor: 'Apple A15 Bionic',
            ram: '6GB',
            storage: '128GB',
            display: '6.1\" Super Retina XDR',
            camera: '12MP + 12MP',
            battery: '3279mAh',
            os: 'iOS 16',
            warranty: '6 months'
        },
        description: 'The iPhone 14 features an impressive dual-camera system, the powerful A15 Bionic chip, and vital new safety features.',
        features: [
            'A15 Bionic chip',
            'Crash Detection and Emergency SOS',
            'Impressive dual-camera system',
            'All-day battery life',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.8,
            reviews: 180,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 22,
        sku: 'APPLE-IPHONE14-REF',
        tags: ['smartphone', 'apple', 'ios', 'camera', 'refurbished']
    },

    'iphone-se-2022': {
        id: 'iphone-se-2022',
        name: 'iPhone SE (2022) 64GB',
        category: 'Smartphones Refurbished',
        price: 329.99,
        originalPrice: 429.99,
        discount: 23,
        images: [
            '/assets/images/smartphones refurbished/iPhone SE (2022) 64GB – Midnight.png',
            '/assets/images/smartphones refurbished/iPhone SE (2022) 64GB – Midnight.png',
            '/assets/images/smartphones refurbished/iPhone SE (2022) 64GB – Midnight.png'
        ],
        specs: {
            processor: 'Apple A15 Bionic',
            ram: '4GB',
            storage: '64GB',
            display: '4.7\" Retina HD',
            camera: '12MP',
            battery: '2018mAh',
            os: 'iOS 15',
            warranty: '6 months'
        },
        description: 'A powerful smartphone in a classic design. Features the A15 Bionic chip, 5G, and a great camera, all at an incredible price.',
        features: [
            'A15 Bionic chip',
            '5G connectivity',
            'Classic design with Home button',
            'Durable design and water resistance',
            '6-month warranty'
        ],
        condition: 'Refurbished - Excellent',
        seller: {
            name: 'Recomputech Panama',
            rating: 4.6,
            reviews: 99,
            verified: true,
            location: 'Panama City, Panama'
        },
        stock: 30,
        sku: 'APPLE-IPHONESE2022-REF',
        tags: ['smartphone', 'apple', 'ios', 'compact', 'refurbished']
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
            '/assets/images/iPad 11 pro max.jpg',
            '/assets/images/Tablet 11 Pro.png'
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
    },

    // Accessories Refurbished
    'wireless-headphones-mic-nc': {
        id: 'wireless-headphones-mic-nc',
        name: 'Wireless Headphones with Microphone & Noise Cancelling',
        category: 'Accessories Refurbished',
        price: 59.99,
        originalPrice: 89.99,
        discount: 33,
        images: [
            '/assets/images/accessories refurbished/Audífonos inalámbricos con micrófono y noise cancelling.png'
        ],
        specs: {
            type: 'Over-ear',
            connectivity: 'Bluetooth 5.0',
            microphone: 'Built-in',
            noiseCancelling: 'Active',
            battery: '30 hours',
            warranty: '6 months'
        },
        description: 'Enjoy immersive sound and clear calls with these wireless headphones featuring active noise cancelling and a built-in microphone.',
        features: [
            'Active noise cancelling',
            'Built-in microphone',
            'Bluetooth 5.0 wireless',
            'Up to 30 hours battery life',
            'Comfortable over-ear design',
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
        sku: 'ACC-WH-NC-REF',
        tags: ['headphones', 'wireless', 'noise-cancelling', 'accessory', 'refurbished']
    },
    'wireless-headphones-nc': {
        id: 'wireless-headphones-nc',
        name: 'Wireless Headphones with Noise Cancelling',
        category: 'Accessories Refurbished',
        price: 49.99,
        originalPrice: 79.99,
        discount: 37,
        images: [
            '/assets/images/accessories refurbished/Audífonos inalámbricos con noise cancelling.png'
        ],
        specs: {
            type: 'Over-ear',
            connectivity: 'Bluetooth',
            noiseCancelling: 'Active',
            battery: '25 hours',
            warranty: '6 months'
        },
        description: 'Wireless over-ear headphones with active noise cancelling for a distraction-free listening experience.',
        features: [
            'Active noise cancelling',
            'Bluetooth wireless',
            '25 hours battery life',
            'Comfortable fit',
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
        sku: 'ACC-WH-NC2-REF',
        tags: ['headphones', 'wireless', 'noise-cancelling', 'accessory', 'refurbished']
    },
    'sony-wireless-headphones': {
        id: 'sony-wireless-headphones',
        name: 'Sony Wireless Headphones',
        category: 'Accessories Refurbished',
        price: 69.99,
        originalPrice: 109.99,
        discount: 36,
        images: [
            '/assets/images/accessories refurbished/Audífonos inalámbricos Sony.png'
        ],
        specs: {
            type: 'Over-ear',
            connectivity: 'Bluetooth',
            brand: 'Sony',
            battery: '35 hours',
            warranty: '6 months'
        },
        description: 'Sony wireless headphones deliver high-fidelity sound and long battery life for music lovers on the go.',
        features: [
            'Sony quality sound',
            'Bluetooth wireless',
            '35 hours battery life',
            'Comfortable over-ear design',
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
        sku: 'ACC-SONY-WH-REF',
        tags: ['headphones', 'sony', 'wireless', 'accessory', 'refurbished']
    },
    'hp-ku-0316-keyboard': {
        id: 'hp-ku-0316-keyboard',
        name: 'HP KU-0316 Wired Keyboard',
        category: 'Accessories Refurbished',
        price: 19.99,
        originalPrice: 29.99,
        discount: 33,
        images: [
            '/assets/images/accessories refurbished/Teclado HP KU-0316 434821-001.jpg'
        ],
        specs: {
            type: 'Wired',
            brand: 'HP',
            layout: 'QWERTY',
            warranty: '6 months'
        },
        description: 'Reliable HP wired keyboard with QWERTY layout, perfect for office and home use.',
        features: [
            'HP original keyboard',
            'Wired USB connection',
            'QWERTY layout',
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
        sku: 'ACC-HP-KU0316-REF',
        tags: ['keyboard', 'hp', 'wired', 'accessory', 'refurbished']
    },
    'hp-gk400f-mechanical-keyboard': {
        id: 'hp-gk400f-mechanical-keyboard',
        name: 'HP GK400F Wired Mechanical Keyboard',
        category: 'Accessories Refurbished',
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        images: [
            '/assets/images/accessories refurbished/Teclado mecánico con cable HP GK400F.jpg'
        ],
        specs: {
            type: 'Mechanical',
            brand: 'HP',
            connectivity: 'Wired',
            warranty: '6 months'
        },
        description: 'HP mechanical keyboard with tactile feedback and durable build, ideal for gaming and productivity.',
        features: [
            'Mechanical switches',
            'Wired USB connection',
            'HP build quality',
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
        sku: 'ACC-HP-GK400F-REF',
        tags: ['keyboard', 'hp', 'mechanical', 'accessory', 'refurbished']
    },
    'rapoo-wireless-keyboard': {
        id: 'rapoo-wireless-keyboard',
        name: 'Rapoo Wireless Keyboard',
        category: 'Accessories Refurbished',
        price: 24.99,
        originalPrice: 39.99,
        discount: 38,
        images: [
            '/assets/images/accessories refurbished/Rapoo Teclado inalámbrico.jpg'
        ],
        specs: {
            type: 'Wireless',
            brand: 'Rapoo',
            layout: 'QWERTY',
            warranty: '6 months'
        },
        description: 'Compact and reliable wireless keyboard from Rapoo, perfect for work and travel.',
        features: [
            'Wireless connection',
            'QWERTY layout',
            'Compact design',
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
        sku: 'ACC-RAPOO-WK-REF',
        tags: ['keyboard', 'rapoo', 'wireless', 'accessory', 'refurbished']
    },
    'sr-mini-keyboard': {
        id: 'sr-mini-keyboard',
        name: 'SR Mini Wireless Keyboard',
        category: 'Accessories Refurbished',
        price: 17.99,
        originalPrice: 27.99,
        discount: 36,
        images: [
            '/assets/images/accessories refurbished/SR Mini teclado.jpg'
        ],
        specs: {
            type: 'Mini',
            connectivity: 'Wireless',
            warranty: '6 months'
        },
        description: 'Ultra-compact mini wireless keyboard, ideal for smart TVs, tablets, and portable use.',
        features: [
            'Mini size',
            'Wireless connection',
            'Portable and lightweight',
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
        sku: 'ACC-SR-MINI-REF',
        tags: ['keyboard', 'mini', 'wireless', 'accessory', 'refurbished']
    },
    'logitech-g502-hero': {
        id: 'logitech-g502-hero',
        name: 'Logitech G502 HERO Gaming Mouse',
        category: 'Accessories Refurbished',
        price: 39.99,
        originalPrice: 69.99,
        discount: 43,
        images: [
            '/assets/images/accessories refurbished/Logitech G502 HERO.jpg'
        ],
        specs: {
            type: 'Gaming Mouse',
            brand: 'Logitech',
            dpi: 'Up to 16,000',
            buttons: '11 programmable',
            warranty: '6 months'
        },
        description: 'High-performance gaming mouse with HERO sensor, customizable DPI, and 11 programmable buttons.',
        features: [
            'HERO sensor up to 16,000 DPI',
            '11 programmable buttons',
            'Customizable weight system',
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
        sku: 'ACC-LOGI-G502-REF',
        tags: ['mouse', 'logitech', 'gaming', 'accessory', 'refurbished']
    },
    'virtusx-ai-mouse': {
        id: 'virtusx-ai-mouse',
        name: 'Virtusx AI Wireless Mouse',
        category: 'Accessories Refurbished',
        price: 21.99,
        originalPrice: 34.99,
        discount: 37,
        images: [
            '/assets/images/accessories refurbished/Virtusx Ratón AI.jpg'
        ],
        specs: {
            type: 'Wireless Mouse',
            brand: 'Virtusx',
            warranty: '6 months'
        },
        description: 'Smart wireless mouse with AI features for enhanced productivity and comfort.',
        features: [
            'AI-powered features',
            'Wireless connection',
            'Ergonomic design',
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
        stock: 14,
        sku: 'ACC-VIRTUSX-AI-REF',
        tags: ['mouse', 'virtusx', 'ai', 'wireless', 'accessory', 'refurbished']
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