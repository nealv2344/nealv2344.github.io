const btn  = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.hamburger-menu');

    btn.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Click outside to close
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
        }
    });