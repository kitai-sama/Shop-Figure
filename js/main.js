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