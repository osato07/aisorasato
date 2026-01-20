document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('is-active');
        toggleMenu(!isOpen);
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    function toggleMenu(open) {
        if (open) {
            mobileMenu.classList.add('is-active');
            menuBtn.classList.add('is-active');
            // Animate hamburger icon to X
            menuBtn.children[0].style.top = '21px';
            menuBtn.children[0].style.transform = 'rotate(45deg)';
            menuBtn.children[1].style.opacity = '0';
            menuBtn.children[2].style.top = '21px';
            menuBtn.children[2].style.transform = 'rotate(-45deg)';
        } else {
            mobileMenu.classList.remove('is-active');
            menuBtn.classList.remove('is-active');
            // Reset hamburger icon
            menuBtn.children[0].style.top = '14px';
            menuBtn.children[0].style.transform = 'rotate(0)';
            menuBtn.children[1].style.opacity = '1';
            menuBtn.children[2].style.top = '28px';
            menuBtn.children[2].style.transform = 'rotate(0)';
        }
    }

    /* ==========================================================================
       Smooth Scroll & Offset
       ========================================================================== */
    const headerHeight = 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       Scroll Animation (Fade In)
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Runs only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

});
