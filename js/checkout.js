// --- Utilidades para obtener el carrito desde localStorage (o simulado) ---
function getCartItems() {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
}

function getCartTotal(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
}

function renderCartSummary() {
    const cartItems = getCartItems();
    const container = document.getElementById('cartItemsContainer');
    const totalSpan = document.getElementById('cartTotal');
    container.innerHTML = '';
    if (cartItems.length === 0) {
        container.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalSpan.textContent = 'B/. 0.00';
        return;
    }
    let total = 0;
    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item-inspiration';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details-inspiration">
                <div class="cart-item-title-inspiration">${item.name}</div>
                <div class="cart-item-qty-inspiration">Cantidad: ${item.qty || 1}</div>
            </div>
            <div class="cart-item-price-inspiration">B/. ${(item.price * (item.qty || 1)).toFixed(2)}</div>
        `;
        container.appendChild(div);
        total += item.price * (item.qty || 1);
    });
    totalSpan.textContent = 'B/. ' + total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    renderCartSummary();
    const form = document.getElementById('checkoutForm');
    const confirmationScreen = document.getElementById('confirmationScreen');
    const yappyBtn = document.getElementById('yappyPayBtn');

    // Eliminar lógica de tarjeta interactiva

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateFacturaForm()) return;
        if (!validateCardForm()) return;
        setTimeout(() => {
            localStorage.removeItem('cartItems');
            form.style.display = 'none';
            confirmationScreen.classList.add('active');
        }, 900);
    });

    yappyBtn.addEventListener('click', function() {
        showYappyModal();
    });
});

function validateFacturaForm() {
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!email || !phone) {
        alert('Por favor, completa todos los campos.');
        return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false;
    }
    if (!/^\d{7,15}$/.test(phone)) {
        alert('Por favor, ingresa un número de teléfono válido.');
        return false;
    }
    return true;
}

function validateCardForm() {
    const cardHolder = document.getElementById('cardHolder').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVC = document.getElementById('cardCVC').value;
    if (!cardHolder || !cardNumber || !cardExpiry || !cardCVC) {
        alert('Por favor, completa todos los datos de la tarjeta.');
        return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Por favor, ingresa un número de tarjeta válido.');
        return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        alert('Por favor, ingresa una fecha de expiración válida (MM/AA).');
        return false;
    }
    if (!/^\d{3,4}$/.test(cardCVC)) {
        alert('Por favor, ingresa un CVV válido.');
        return false;
    }
    return true;
}

function showYappyModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.25)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '99999';
    modal.innerHTML = `
        <div style="background:#fff;padding:2.5rem 2rem;border-radius:18px;max-width:350px;text-align:center;box-shadow:0 4px 32px rgba(0,158,227,0.13);">
            <h2 style="color:#009ee3;font-size:1.5rem;margin-bottom:1rem;">Pago con Yappy</h2>
            <p style="color:#1e293b;font-size:1.08rem;margin-bottom:1.5rem;">Escanea el código QR o haz clic en el botón para continuar con Yappy.</p>
            <div style="margin-bottom:1.5rem;">
                <img src="https://yappy-assets.s3.amazonaws.com/qr-demo.png" alt="QR Yappy" style="width:120px;height:120px;object-fit:contain;border-radius:10px;border:1.5px solid #e5e7eb;background:#f6fbfd;">
            </div>
            <button style="background:#009ee3;color:#fff;padding:0.7rem 2rem;border:none;border-radius:8px;font-weight:600;font-size:1.08rem;cursor:pointer;" onclick="window.open('https://yappy.pagoseguro.panama/', '_blank')">Ir a Yappy</button>
            <br><br>
            <button style="background:#e5e7eb;color:#1e293b;padding:0.5rem 1.5rem;border:none;border-radius:8px;font-weight:500;font-size:1rem;cursor:pointer;" onclick="this.closest('div[style]').remove()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);
} 