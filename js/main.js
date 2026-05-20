document.addEventListener('DOMContentLoaded', function () {

    // ── Dropdown User (dùng chung desktop + mobile) ──
    const btnUser = document.getElementById('btn-user');
    const userMenu = document.getElementById('user-menu');
    const btnAccountMobile = document.querySelector('.nav-item[data-action="account"]');

    function toggleUserMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        userMenu.classList.toggle('show');
    }

    if (btnUser) btnUser.addEventListener('click', toggleUserMenu);
    if (btnAccountMobile) btnAccountMobile.addEventListener('click', toggleUserMenu);

    // Bấm ra ngoài đóng
    document.addEventListener('click', function (e) {
        if (
            userMenu &&
            !userMenu.contains(e.target) &&
            !btnUser?.contains(e.target) &&
            !btnAccountMobile?.contains(e.target)
        ) {
            userMenu.classList.remove('show');
        }
    });

    // ── Bottom nav active state ──
    document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.mobile-bottom-nav .nav-item')
                .forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ── Drawer Danh Mục ──
    const btnDanhMuc = document.querySelector('.nav-item[data-action="menu"]');
    if (btnDanhMuc) btnDanhMuc.addEventListener('click', openMobileMenu);

    const btnClose = document.querySelector('.drawer-close');
    if (btnClose) btnClose.addEventListener('click', closeMobileMenu);

    const overlay = document.getElementById('mobileOverlay');
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

});

function openMobileMenu(e) {
    e.preventDefault();
    document.getElementById('mobileDrawer').classList.add('show');
    document.getElementById('mobileOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.getElementById('mobileDrawer').classList.remove('show');
    document.getElementById('mobileOverlay').classList.remove('show');
    document.body.style.overflow = '';
}


// chuyển ảnh
const slides = document.querySelectorAll(".slide");
let current = 0;

function nextSlide() {
    slides[current].classList.remove("active");

    current++;
    if (current >= slides.length) current = 0;

    slides[current].classList.add("active");
}

if (slides.length > 0) {
    setInterval(nextSlide, 3000);
}


// <!------------------------------------------------------------>
// <!-- VIEW - PRODUCT -->
// <!------------------------------------------------------------>

let currentProduct = {};

let currentImages = [];
let currentIndex = 0;

function openModal(btn) {
    const modal = document.getElementById("productModal");

    const name = btn.dataset.name;
    const price = btn.dataset.price;
    const img1 = btn.dataset.img1;
    const img2 = btn.dataset.img2;
    const img3 = btn.dataset.img3;
    const img4 = btn.dataset.img4;
    const img5 = btn.dataset.img5;
    const img6 = btn.dataset.img6;
    const desc = btn.dataset.desc;

    currentImages = [img1, img2, img3, img4, img5, img6].filter(Boolean);
    currentIndex = 0;

    document.getElementById("modal-name").innerText = name;
    document.getElementById("modal-price").innerText = price;
    document.getElementById("modal-img").src = currentImages[currentIndex];
    document.getElementById("modal-desc").innerText = desc;

    currentProduct = {
        id: name,
        name: name,
        price: price,
        img: img1
    };

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function changeSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    if (currentIndex >= currentImages.length) currentIndex = 0;

    document.getElementById("modal-img").src = currentImages[currentIndex];
}

window.addEventListener('click', function (e) {
    const modal = document.getElementById("productModal");
    if (e.target === modal) {
        closeModal();
    }
});

// <!------------------------------------------------------------>
// ĐĂNG NHẬP
// <!------------------------------------------------------------>

function validateForm() {

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    let emailError = document.getElementById("emailErrorMessage");
    let passwordError = document.getElementById("passwordErrorMessage");

    emailError.innerText = "";
    passwordError.innerText = "";

    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    let isValid = true;

    if (email === "") {

        emailError.innerText = "Vui lòng nhập email hoặc số điện thoại";

        emailInput.classList.add("input-error");

        if (isValid) {
            emailInput.focus();
        }

        isValid = false;
    }

    if (password === "") {

        passwordError.innerText = "Vui lòng nhập mật khẩu";

        passwordInput.classList.add("input-error");

        if (isValid) {
            passwordInput.focus();
        }

        isValid = false;
    }

    if (isValid) {
        alert("Đăng nhập thành công");
        
        window.location.href = "index.html";
    }
}
function togglePw(inputId, btn){

    let input = document.getElementById(inputId);
    let icon = btn.querySelector("i");

    if(input.type === "password"){

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function guestLogin(){
    window.location.href = "index.html";
}

// <!------------------------------------------------------------>
// ĐĂNG KÝ
// <!------------------------------------------------------------>

function validateRegister() {

    let fullname = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    let fullnameError = document.getElementById("fullnameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    fullnameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";

    let isValid = true;

    if(fullname === ""){
        fullnameError.innerText = "Vui lòng nhập họ tên";
        isValid = false;
    }

    if(email === ""){
        emailError.innerText = "Vui lòng nhập email";
        isValid = false;
    }

    if(password === ""){
        passwordError.innerText = "Vui lòng nhập mật khẩu";
        isValid = false;
    }

    if(confirmPassword === ""){
        confirmPasswordError.innerText = "Vui lòng xác nhận mật khẩu";
        isValid = false;
    }

    if(password !== confirmPassword){
        confirmPasswordError.innerText = "Mật khẩu không khớp";
        isValid = false;
    }

    if(isValid){

        alert("Đăng ký thành công");

        window.location.href = "login.html";
    }
}