// THÊM VÀO GIỎ HÀNG TỪ MODAL
function addToCartFromModal() {
    if (!currentProduct || !currentProduct.name) return;
    addToCart(currentProduct.id, currentProduct.name, currentProduct.price, currentProduct.img);
}

// THÊM VÀO GIỎ HÀNG
function addToCart(id, name, price, img) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === id);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            img: img,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let total = 0;

    if (!container) return;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        // Bỏ qua item lỗi (data rác do gọi addToCart() không có tham số)
        if (!item.name || !item.price) return;
        let priceNumber = parseInt(item.price.replace(/\D/g, ""));
        let itemTotal = priceNumber * item.quantity;
        total += itemTotal;

        container.innerHTML += `
        <div class="cart-item">
            <img src="${item.img}" class="cart-img">
 
            <div class="cart-info">
                <h4>${item.name}</h4>
                <p class="price">${item.price}</p>
 
                <div class="quantity">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
 
            <div class="cart-right-item">
                <p class="item-total">${itemTotal.toLocaleString()}đ</p>
                <button class="delete-btn" onclick="removeItem(${index})">Xoá</button>
            </div>
        </div>
        `;
    });

    let totalBox = document.getElementById("total-price");
    if (totalBox) {
        totalBox.innerText = total.toLocaleString() + "đ";
    }
}

function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartIcon = document.querySelector(".cart-count");
    if (cartIcon) cartIcon.innerText = count;
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartCount();
});

// Đếm sản phẩm
function updateCount() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.product-card');
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = `Hiển thị ${cards.length} sản phẩm`;
}

// FIX: Sắp xếp sản phẩm
function sortProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const val = document.getElementById('sort-select').value;

    cards.sort((a, b) => {
        const btnA = a.querySelector('.btn-view');
        const btnB = b.querySelector('.btn-view');

        if (val === 'asc' || val === 'desc') {
            // parse giá: xoá tất cả ký tự không phải số
            const priceA = parseInt((btnA?.dataset.price || '0').replace(/\D/g, ''));
            const priceB = parseInt((btnB?.dataset.price || '0').replace(/\D/g, ''));
            return val === 'asc' ? priceA - priceB : priceB - priceA;
        }

        if (val === 'name') {
            const nameA = btnA?.dataset.name || '';
            const nameB = btnB?.dataset.name || '';
            return nameA.localeCompare(nameB, 'vi');
        }

        return 0; // mặc định: giữ nguyên thứ tự
    });

    cards.forEach(c => grid.appendChild(c));
}

document.addEventListener('DOMContentLoaded', updateCount);

// ----------------------------------------------------
// PAGINATION 
// ----------------------------------------------------

const ITEMS_PER_PAGE = 12;
let currentPage = 1;

function goToPage(page) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const buttons = document.querySelectorAll('.list-buttonNext .buttonNext');
    const total = Math.ceil(cards.length / ITEMS_PER_PAGE);

    if (page < 1) page = 1;
    if (page > total) page = total;
    currentPage = page;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    cards.forEach((card, i) => {
        card.style.display = (i >= start && i < end) ? '' : 'none';
    });

    buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i + 1 === currentPage);
    });

    const countEl = document.getElementById('product-count');
    const shown = cards.slice(start, end).length;
    if (countEl) countEl.textContent = `Hiển thị ${shown} / ${cards.length} sản phẩm`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.list-buttonNext .buttonNext');

    buttons.forEach((btn, i) => {
        btn.addEventListener('click', function () {
            goToPage(i + 1);
        });
    });

    goToPage(1);
});