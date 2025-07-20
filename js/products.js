// products.js - Filtrado dinámico para products.html

document.addEventListener('DOMContentLoaded', function () {
  // Obtener todos los productos del HTML
  const allProducts = Array.from(document.querySelectorAll('.main-products .col-md-6, .main-products .col-lg-4'));

  // Filtros
  const filterButtons = document.querySelectorAll('.filter-categories button[data-filter]');
  const sortSelect = document.querySelector('.filter-sort .form-select');

  function showProducts(category) {
    allProducts.forEach(card => {
      const productCard = card.querySelector('.product-card');
      if (!productCard) return;
      const name = productCard.querySelector('h5')?.textContent?.toLowerCase() || '';
      const desc = productCard.querySelector('.product-description')?.textContent?.toLowerCase() || '';
      let match = false;
      switch (category) {
        case 'laptops':
          match = name.includes('laptop');
          break;
        case 'desktops':
          match = name.includes('pc') || name.includes('dell') || name.includes('hp') || name.includes('lenovo') || name.includes('mac');
          break;
        case 'phones':
          match = name.includes('phone') || name.includes('smartphone') || name.includes('galaxy') || name.includes('pixel') || name.includes('iphone');
          break;
        case 'tablets':
          match = name.includes('tablet');
          break;
        case 'accessories':
          match = name.includes('headphone') || name.includes('audífono') || name.includes('accessory');
          break;
        case 'all':
        default:
          match = true;
      }
      card.style.display = match ? '' : 'none';
    });
  }

  function sortProducts(order) {
    const container = document.querySelector('.main-products .row');
    let cards = Array.from(container.children).filter(el => el.style.display !== 'none');
    cards.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price')?.textContent.replace(/[^\d.]/g, '') || 0);
      const priceB = parseFloat(b.querySelector('.price')?.textContent.replace(/[^\d.]/g, '') || 0);
      const ratingA = parseFloat(a.querySelector('.product-rating span')?.textContent.replace(/[^\d.]/g, '') || 0);
      const ratingB = parseFloat(b.querySelector('.product-rating span')?.textContent.replace(/[^\d.]/g, '') || 0);
      if (order === 'Lowest Price') return priceA - priceB;
      if (order === 'Highest Price') return priceB - priceA;
      if (order === 'Most Rated') return ratingB - ratingA;
      return 0; // Most Recent (default, keep order)
    });
    cards.forEach(card => container.appendChild(card));
  }

  // Evento de filtro por categoría
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-filter');
      showProducts(category);
      sortProducts(sortSelect.value);
    });
  });

  // Evento de ordenamiento
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      sortProducts(this.value);
    });
  }

  // Inicializar mostrando todos
  showProducts('all');
  sortProducts(sortSelect?.value || 'Most Recent');

  // --- MODAL DE DETALLE DE PRODUCTO ---
  const productSpecsData = {
    // Smartphones
    'Galaxy S21 5G 128GB - Gray': {
      specs: [
        'Pantalla: 6.2" Dynamic AMOLED 2X, 120Hz',
        'Procesador: Exynos 2100 / Snapdragon 888',
        'RAM: 8GB',
        'Almacenamiento: 128GB',
        'Cámara: Triple 12+12+64MP',
        'Batería: 4000mAh',
        '5G, IP68, Android 13'
      ],
      vendor: 'Recomputech'
    },
    'Galaxy S23 FE 128GB - Gray': {
      specs: [
        'Pantalla: 6.4" Dynamic AMOLED 2X, 120Hz',
        'Procesador: Exynos 2200 / Snapdragon 8 Gen 1',
        'RAM: 8GB',
        'Almacenamiento: 128GB',
        'Cámara: Triple 50+8+12MP',
        'Batería: 4500mAh',
        '5G, IP68, Android 14'
      ],
      vendor: 'Recomputech'
    },
    'Galaxy S23 Ultra 256GB - Black': {
      specs: [
        'Pantalla: 6.8" QHD+ AMOLED 120Hz',
        'Procesador: Snapdragon 8 Gen 2',
        'RAM: 8GB',
        'Almacenamiento: 256GB',
        'Cámara: Cuádruple 200+12+10+10MP',
        'Batería: 5000mAh',
        'S-Pen, 5G, IP68, Android 14'
      ],
      vendor: 'Recomputech'
    },
    'Galaxy Z Flip6 256GB - Green': {
      specs: [
        'Pantalla: 6.7" FHD+ AMOLED 120Hz (plegable)',
        'Procesador: Snapdragon 8 Gen 2',
        'RAM: 8GB',
        'Almacenamiento: 256GB',
        'Cámara: Dual 12+12MP',
        'Batería: 3700mAh',
        '5G, Android 14'
      ],
      vendor: 'Recomputech'
    },
    'Google Pixel 6a 128GB - Green': {
      specs: [
        'Pantalla: 6.1" OLED',
        'Procesador: Google Tensor',
        'RAM: 6GB',
        'Almacenamiento: 128GB',
        'Cámara: Dual 12.2+12MP',
        'Batería: 4410mAh',
        '5G, Android 13'
      ],
      vendor: 'Recomputech'
    },
    'Google Pixel 7 128GB - Black': {
      specs: [
        'Pantalla: 6.3" OLED, 90Hz',
        'Procesador: Google Tensor G2',
        'RAM: 8GB',
        'Almacenamiento: 128GB',
        'Cámara: Dual 50+12MP',
        'Batería: 4355mAh',
        '5G, Android 14'
      ],
      vendor: 'Recomputech'
    },
    'Google Pixel 8 128GB - Rose Gold': {
      specs: [
        'Pantalla: 6.2" OLED, 120Hz',
        'Procesador: Google Tensor G3',
        'RAM: 8GB',
        'Almacenamiento: 128GB',
        'Cámara: Dual 50+12MP',
        'Batería: 4575mAh',
        '5G, Android 14'
      ],
      vendor: 'Recomputech'
    },
    'Google Pixel 9 Pro XL 512GB - Black': {
      specs: [
        'Pantalla: 6.7" OLED, 120Hz',
        'Procesador: Google Tensor G4',
        'RAM: 12GB',
        'Almacenamiento: 512GB',
        'Cámara: Triple 50+48+48MP',
        'Batería: 5000mAh',
        '5G, Android 15'
      ],
      vendor: 'Recomputech'
    },
    'iPhone 13 128GB - Pink': {
      specs: [
        'Pantalla: 6.1" Super Retina XDR OLED',
        'Procesador: Apple A15 Bionic',
        'RAM: 4GB',
        'Almacenamiento: 128GB',
        'Cámara: Dual 12+12MP',
        'Batería: 3240mAh',
        'iOS 17, Face ID, 5G'
      ],
      vendor: 'Recomputech'
    },
    'iPhone 13 mini 256GB – Blue': {
      specs: [
        'Pantalla: 5.4" Super Retina XDR OLED',
        'Procesador: Apple A15 Bionic',
        'RAM: 4GB',
        'Almacenamiento: 256GB',
        'Cámara: Dual 12+12MP',
        'Batería: 2438mAh',
        'iOS 17, Face ID, 5G'
      ],
      vendor: 'Recomputech'
    },
    'iPhone 14 128GB - Midnight': {
      specs: [
        'Pantalla: 6.1" Super Retina XDR OLED',
        'Procesador: Apple A15 Bionic',
        'RAM: 6GB',
        'Almacenamiento: 128GB',
        'Cámara: Dual 12+12MP',
        'Batería: 3279mAh',
        'iOS 17, Face ID, 5G'
      ],
      vendor: 'Recomputech'
    },
    'iPhone SE (2022) 64GB – Midnight': {
      specs: [
        'Pantalla: 4.7" Retina IPS LCD',
        'Procesador: Apple A15 Bionic',
        'RAM: 4GB',
        'Almacenamiento: 64GB',
        'Cámara: 12MP',
        'Batería: 2018mAh',
        'iOS 17, Touch ID, 5G'
      ],
      vendor: 'Recomputech'
    },
    // PCs y otros productos
    'DELL 3070': {
      specs: [
        'Procesador: Intel Core i5-10500',
        'RAM: 16GB DDR4',
        'Almacenamiento: 512GB SSD',
        'Gráficos: Intel UHD 630',
        'Puertos: USB 3.1, HDMI, DisplayPort',
        'Red: Ethernet, WiFi',
        'Sistema: Windows 10 Pro'
      ],
      vendor: 'Recomputech'
    },
    'DELL 7060': {
      specs: [
        'Procesador: Intel Core i7-8700',
        'RAM: 16GB DDR4',
        'Almacenamiento: 512GB SSD',
        'Gráficos: Intel UHD 630',
        'Puertos: USB 3.1, HDMI, DisplayPort',
        'Red: Ethernet, WiFi',
        'Sistema: Windows 10 Pro'
      ],
      vendor: 'Recomputech'
    },
    'DELL Precision 5820': {
      specs: [
        'Procesador: Intel Xeon W-2123',
        'RAM: 32GB DDR4 ECC',
        'Almacenamiento: 1TB SSD',
        'Gráficos: NVIDIA Quadro P4000',
        'Puertos: USB 3.1, HDMI, DisplayPort',
        'Red: Ethernet',
        'Sistema: Windows 10 Pro'
      ],
      vendor: 'Recomputech'
    },
    'HP ELITEDESK 800 G3 MT': {
      specs: [
        'Procesador: Intel Core i5-7500',
        'RAM: 8GB DDR4',
        'Almacenamiento: 256GB SSD',
        'Gráficos: Intel HD 630',
        'Puertos: USB 3.1, VGA, DisplayPort',
        'Red: Ethernet',
        'Sistema: Windows 10 Pro'
      ],
      vendor: 'Recomputech'
    },
    'HP Elitedesk 800 g2 Mini PC': {
      specs: [
        'Procesador: Intel Core i5-6500T',
        'RAM: 8GB DDR4',
        'Almacenamiento: 256GB SSD',
        'Gráficos: Intel HD 530',
        'Puertos: USB 3.0, DisplayPort',
        'Red: Ethernet, WiFi',
        'Sistema: Windows 10 Pro'
      ],
      vendor: 'Recomputech'
    },
    'Lenovo M920q Mini PC': {
      specs: [
        'Procesador: Intel Core i5-8500T',
        'RAM: 8GB DDR4',
        'Almacenamiento: 256GB SSD',
        'Gráficos: Intel UHD 630',
        'Puertos: USB-C, USB 3.1, DisplayPort',
        'Red: Ethernet, WiFi',
        'Sistema: Windows 10 Pro'
      ],
      vendor: 'Recomputech'
    },
    'Mac mini 7,1': {
      specs: [
        'Procesador: Intel Core i5-4278U',
        'RAM: 8GB DDR3',
        'Almacenamiento: 256GB SSD',
        'Gráficos: Intel Iris 5100',
        'Puertos: Thunderbolt 2, HDMI, USB 3.0',
        'Red: Ethernet, WiFi',
        'Sistema: macOS Monterey'
      ],
      vendor: 'Recomputech'
    },
    'Refurbished Gaming Laptop': {
      specs: [
        'Pantalla: 15.6" FHD IPS 144Hz',
        'Procesador: Intel Core i7-10750H',
        'RAM: 16GB DDR4',
        'Almacenamiento: 512GB SSD',
        'Gráficos: NVIDIA GeForce GTX 1660 Ti',
        'Teclado retroiluminado',
        'Sistema: Windows 11 Home'
      ],
      vendor: 'Recomputech'
    },
    'Refurbished Gaming PC': {
      specs: [
        'Procesador: Intel Core i7-9700F',
        'RAM: 16GB DDR4',
        'Almacenamiento: 1TB SSD',
        'Gráficos: NVIDIA GeForce RTX 3060',
        'Fuente: 600W 80+ Bronze',
        'WiFi y Bluetooth',
        'Sistema: Windows 11 Home'
      ],
      vendor: 'Recomputech'
    },
    'Refurbished Pro Tablet': {
      specs: [
        'Pantalla: 12.9" Liquid Retina',
        'Procesador: Apple M1',
        'RAM: 8GB',
        'Almacenamiento: 256GB',
        'Cámara: 12MP',
        'Batería: 10758mAh',
        'Sistema: iPadOS 17'
      ],
      vendor: 'Recomputech'
    }
  };

  // Función para abrir el modal con la info del producto
  function openProductModal(productCard) {
    const name = productCard.querySelector('h5')?.textContent?.trim();
    const desc = productCard.querySelector('.product-description')?.textContent?.trim();
    const img = productCard.querySelector('img')?.getAttribute('src');
    const price = productCard.querySelector('.price')?.textContent;
    const oldPrice = productCard.querySelector('.original-price')?.textContent;
    const rating = productCard.querySelector('.product-rating span')?.textContent;

    document.getElementById('productDetailModalLabel').textContent = name;
    document.getElementById('modalProductImg').src = img;
    document.getElementById('modalProductDesc').textContent = desc;
    document.getElementById('modalProductPrice').textContent = price || '';
    document.getElementById('modalProductOldPrice').textContent = oldPrice || '';
    document.getElementById('modalProductRating').innerHTML = `<i class='fas fa-star text-warning'></i> ${rating || ''}`;

    // Especificaciones y vendedor
    const specsList = document.getElementById('modalProductSpecs');
    specsList.innerHTML = '';
    const productData = productSpecsData[name] || { specs: ['No specifications available.'], vendor: 'Recomputech' };
    (productData.specs || []).forEach(spec => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = spec;
      specsList.appendChild(li);
    });
    document.getElementById('modalProductVendor').innerHTML = `<i class='fas fa-store me-2'></i>${productData.vendor}`;

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();

    // Botón Buy Now
    document.getElementById('modalBuyNowBtn').onclick = function() {
      // Simulación de login: revisa si hay "userType" en localStorage
      const userType = localStorage.getItem('userType');
      if (!userType) {
        window.location.href = '../login.html';
      } else if (userType === 'user') {
        window.location.href = '../dashboard-user.html';
      } else if (userType === 'technician') {
        window.location.href = '../dashboard-technician.html';
      } else {
        window.location.href = '../login.html';
      }
    };
  }

  // Asignar evento a todas las cards de producto
  setTimeout(() => {
    document.querySelectorAll('.product-card').forEach(card => {
      card.onclick = function() {
        openProductModal(card);
      };
    });
  }, 500);
}); 