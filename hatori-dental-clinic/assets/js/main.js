document.addEventListener('DOMContentLoaded', () => {
    console.log('Main.js loaded');

    // Hamburger Menu Toggle
    const menuTrigger = document.querySelector('.header__menu-trigger');
    const drawerMenu = document.querySelector('.drawer-menu');

    if (menuTrigger && drawerMenu) {
        menuTrigger.addEventListener('click', () => {
            const isExpanded = menuTrigger.getAttribute('aria-expanded') === 'true';
            menuTrigger.setAttribute('aria-expanded', !isExpanded);
            menuTrigger.classList.toggle('is-active');
            drawerMenu.classList.toggle('is-active');
        });

        // Close menu when link is clicked
        drawerMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuTrigger.setAttribute('aria-expanded', 'false');
                menuTrigger.classList.remove('is-active');
                drawerMenu.classList.remove('is-active');
            });
        });
    }

    // Basic Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Sticky Header Background change on scroll?
    // Not needed for now since it has background-color by default, but maybe shadow logic later.
});
