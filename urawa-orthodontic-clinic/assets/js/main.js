document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('js-menu-btn');
    const nav = document.getElementById('js-nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            if (nav.classList.contains('is-active')) {
                nav.style.display = 'block'; nav.style.position = 'fixed'; nav.style.top = '60px'; nav.style.left = '0'; nav.style.width = '100%'; nav.style.height = 'calc(100vh - 60px)'; nav.style.background = 'white'; nav.style.padding = '20px'; nav.style.overflowY = 'auto';
            } else { nav.style.display = ''; }
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (menuBtn && menuBtn.classList.contains('is-active')) { menuBtn.classList.remove('is-active'); nav.classList.remove('is-active'); nav.style.display = ''; }
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
    }, observerOptions);
    document.querySelectorAll('.section').forEach(section => { section.classList.add('fade-in-init'); observer.observe(section); });
});
