// ============================================
// STATE MANAGEMENT
// ============================================
let cart = [];
let currentUser = null;
let productQty = 1;

const PRODUCT = {
    id: 'serum-01',
    name: 'Radiant Glow Serum',
    price: 48.00,
    img: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23faf3ef\'/%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'70\' fill=\'%23dbb8ab\'/%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'50\' fill=\'%23b45f4b\' opacity=\'0.3\'/%3E%3Cpath d=\'M70 80 L130 80 L135 120 L65 120 Z\' fill=\'%23b45f4b\' opacity=\'0.6\'/%3E%3Ccircle cx=\'100\' cy=\'110\' r=\'18\' fill=\'%23fdf8f5\'/%3E%3C/svg%3E'
};

// ============================================
// ADMIN CREDENTIALS
// ============================================
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123';

// ============================================
// DOM REFERENCES
// ============================================
const cartBadge = document.getElementById('cartBadge');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalWrapper = document.getElementById('cartTotalWrapper');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartItemCount = document.getElementById('cartItemCount');

const qtyDisplay = document.getElementById('qtyDisplay');
const addToCartBtn = document.getElementById('addToCartBtn');
const qtyDecrease = document.getElementById('qtyDecrease');
const qtyIncrease = document.getElementById('qtyIncrease');

const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const profileModal = document.getElementById('profileModal');

const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileStatus = document.getElementById('profileStatus');

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-fixed');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// CART FUNCTIONS
// ============================================
function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartItemCount.textContent = totalItems + ' items';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-box-open"></i>
                <p>Your cart is empty</p>
                <span>Start your glow journey.</span>
            </div>
        `;
        cartTotalWrapper.classList.add('hidden');
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.img}" alt="${item.name}">
                    <div><strong>${item.name}</strong> × ${item.quantity} <span style="color:#8a7a6e;">$${itemTotal.toFixed(2)}</span></div>
                </div>
                <button class="cart-item-remove" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalWrapper.classList.remove('hidden');
    cartTotalPrice.textContent = '$' + total.toFixed(2);

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index, 10);
            cart.splice(idx, 1);
            updateCartUI();
        });
    });
}

function addToCart(quantity) {
    const existing = cart.find(item => item.id === PRODUCT.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...PRODUCT, quantity });
    }
    updateCartUI();
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(modal) {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    if (modal) modal.classList.add('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

function updateProfile() {
    if (currentUser) {
        profileName.textContent = currentUser.name;
        profileEmail.textContent = currentUser.email;
        profileStatus.textContent = currentUser.isAdmin ? '👑 Admin' : 'Logged In';
        profileStatus.style.color = currentUser.isAdmin ? '#b45f4b' : '#2d7d46';
    } else {
        profileName.textContent = 'Guest';
        profileEmail.textContent = 'guest@example.com';
        profileStatus.textContent = 'Guest';
        profileStatus.style.color = '#b45f4b';
    }
}

// ============================================
// ===== ABOUT BUTTON - SCROLLS DOWN TO ABOUT SECTION =====
// ============================================
document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
        setTimeout(function() {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
});

// ============================================
// HOME LINK - Scroll to top
// ============================================
document.getElementById('homeLink').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// LOGIN PAGE LINK
// ============================================
document.getElementById('loginPageLink').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'login.html';
});

// ============================================
// REGISTER PAGE LINK
// ============================================
document.getElementById('registerPageLink').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'register.html';
});

// ============================================
// PROFILE LINK
// ============================================
document.getElementById('profileLink').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentUser) {
        openModal(profileModal);
    } else {
        alert('Please log in first.');
        window.location.href = 'login.html';
    }
});

// ============================================
// QUANTITY SELECTOR
// ============================================
qtyDecrease.addEventListener('click', () => {
    if (productQty > 1) {
        productQty--;
        qtyDisplay.textContent = productQty;
    }
});

qtyIncrease.addEventListener('click', () => {
    productQty++;
    qtyDisplay.textContent = productQty;
});

// ============================================
// ADD TO CART
// ============================================
addToCartBtn.addEventListener('click', () => {
    const qty = parseInt(qtyDisplay.textContent, 10) || 1;
    addToCart(qty);
    productQty = 1;
    qtyDisplay.textContent = '1';
});

// ============================================
// SCROLL TO PRODUCT
// ============================================
document.getElementById('scrollToProduct').addEventListener('click', () => {
    document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('scrollToProductBtn').addEventListener('click', () => {
    document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// CART TOGGLE
// ============================================
document.getElementById('cartToggleBtn').addEventListener('click', () => {
    document.getElementById('cartPreview').scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// CLOSE MODAL BUTTONS
// ============================================
document.getElementById('closeLoginModal').addEventListener('click', closeAllModals);
document.getElementById('closeRegisterModal').addEventListener('click', closeAllModals);
document.getElementById('closeProfileModal').addEventListener('click', closeAllModals);

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAllModals();
        }
    });
});

// ============================================
// SWITCH MODALS
// ============================================
document.getElementById('switchToRegister').addEventListener('click', () => {
    openModal(registerModal);
});

document.getElementById('switchToLogin').addEventListener('click', () => {
    openModal(loginModal);
});

// ============================================
// LOGIN FORM - ADMIN CHECK
// ============================================
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // CHECK FOR ADMIN LOGIN
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        alert('👑 Welcome Admin! Redirecting to dashboard...');
        window.location.href = 'admin.html';
        return;
    }

    // Regular user login
    const email = username;
    const name = email.split('@')[0] || 'User';
    
    if (email.includes('@')) {
        currentUser = { name, email, isAdmin: false };
        updateProfile();
        closeAllModals();
        alert('✅ Logged in as ' + name);
    } else {
        alert('❌ Invalid credentials. For admin use: admin / 123');
    }
});

// ============================================
// REGISTER FORM
// ============================================
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value.trim() || 'User';
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

    if (password.length < 6) {
        alert('❌ Password must be at least 6 characters.');
        return;
    }
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match.');
        return;
    }
    
    currentUser = { name, email, isAdmin: false };
    updateProfile();
    closeAllModals();
    alert('🎉 Account created! Welcome ' + name);
});

// ============================================
// LOGOUT
// ============================================
document.getElementById('logoutBtn').addEventListener('click', function() {
    currentUser = null;
    updateProfile();
    closeAllModals();
    alert('👋 Logged out.');
});

// ============================================
// CHECKOUT (Demo)
// ============================================
document.getElementById('checkoutDummy').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('🛒 Cart is empty');
        return;
    }
    alert('✅ Thank you for your order! (demo)');
    cart = [];
    updateCartUI();
});

// ============================================
// INIT
// ============================================
updateCartUI();
updateProfile();

console.log('✨ AMAZE — Premium Cosmetics');
console.log('👑 Admin Login: admin / 123');
console.log('📍 Click "About" in navbar to scroll to About section');