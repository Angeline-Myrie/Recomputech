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