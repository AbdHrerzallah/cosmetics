// ============================================
// AMAZE ADMIN DASHBOARD - MAIN SCRIPT
// ============================================

// ============================================
// SIDEBAR NAVIGATION - Smooth Scrolling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Sidebar navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all links
            document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Get page name from data-page attribute
            const page = this.dataset.page;
            
            // Map pages to section IDs
            const sections = {
                'dashboard': null,
                'orders': 'ordersSection',
                'inventory': 'inventorySection',
                'clients': 'clientsSection',
                'stock': 'stockSection',
                'reviews': 'reviewsSection',
                'settings': null
            };

            const sectionId = sections[page];
            if (sectionId) {
                document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    animateStats();

    // ============================================
    // RESTOCK BUTTONS
    // ============================================
    document.querySelectorAll('.stock-alert .restock-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.stock-alert-item').querySelector('.product-name').textContent;
            if (confirm(`Restock ${productName}?`)) {
                this.textContent = '✓ Restocked';
                this.style.background = '#2d7d46';
                setTimeout(() => {
                    this.textContent = 'Restock';
                    this.style.background = '#b45f4b';
                }, 2000);
            }
        });
    });

    // ============================================
    // VIEW ALL BUTTONS
    // ============================================
    document.querySelectorAll('.view-all-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.section-card').querySelector('h3').textContent.trim();
            alert(`📋 Viewing all ${section}`);
        });
    });

    // ============================================
    // ADD PRODUCT BUTTON
    // ============================================
    const addProductBtn = document.querySelector('.add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            const productName = prompt('Enter product name:');
            if (productName) {
                const sku = prompt('Enter SKU:');
                if (sku) {
                    alert(`✅ Product "${productName}" (SKU: ${sku}) added successfully!`);
                }
            }
        });
    }

    // ============================================
    // LOGOUT FUNCTION
    // ============================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }

    // ============================================
    // REFRESH DATA
    // ============================================
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    }

    // ============================================
    // ORDER STATUS UPDATE
    // ============================================
    document.querySelectorAll('.order-status-select').forEach(select => {
        select.addEventListener('change', function() {
            const orderId = this.dataset.orderId;
            const newStatus = this.value;
            alert(`✅ Order ${orderId} status updated to: ${newStatus}`);
        });
    });

    console.log('✨ AMAZE Admin Dashboard Loaded');
});

// ============================================
// STATS COUNTER ANIMATION FUNCTION
// ============================================
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;

        let current = 0;
        const increment = Math.ceil(target / 40);
        const duration = 800;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, stepTime);
    });
}

// ============================================
// EXPORT FUNCTIONS FOR OTHER SCRIPTS
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { animateStats };
}