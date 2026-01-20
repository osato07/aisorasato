document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-nav a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Toggle icon animation class if needed
    });

    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Simple Intersection Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Today's Open Status (Simple Logic - Can be refined)
    const statusElement = document.getElementById('open-status');
    const now = new Date();
    const day = now.getDay(); // 0:Sun, 1:Mon, ... 4:Thu, 6:Sat
    const hour = now.getHours();

    let isOpen = false;
    
    // Simple Mon-Sat logic
    // Mon, Tue, Wed, Fri: 9-13, 15-19:30
    // Thu: 9-13
    // Sat: 9-13, 15-17
    // Sun: Closed

    if (day === 0) { // Sunday
        isOpen = false;
    } else if (day === 4) { // Thursday
        if (hour >= 9 && hour < 13) isOpen = true;
    } else if (day === 6) { // Saturday
        if ((hour >= 9 && hour < 13) || (hour >= 15 && hour < 17)) isOpen = true;
    } else { // Mon, Tue, Wed, Fri
        if ((hour >= 9 && hour < 13) || (hour >= 15 && hour < 19.5)) isOpen = true;
    }

    if (statusElement) {
        if (isOpen) {
            statusElement.textContent = "診療中";
            statusElement.style.color = "var(--color-primary)";
        } else {
            statusElement.textContent = "時間外・休診";
            statusElement.style.color = "#d9534f"; // Reddish for closed
        }
    }
});
