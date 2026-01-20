var burger = document.querySelector('.header__burger');
var nav = document.querySelector('.header__nav');
var statusText = document.getElementById('js-status-text');

// Mobile Menu Toggle
burger.addEventListener('click', function() {
    nav.classList.toggle('is-active');
    burger.classList.toggle('is-active');
    
    // Simple style toggle for visibility
    if (nav.classList.contains('is-active')) {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '60px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#fff';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.display = ''; // Revert to CSS
    }
});

// Clinic Status Logic
function updateStatus() {
    var now = new Date();
    var day = now.getDay(); // 0:Sun, 1:Mon... 6:Sat
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var time = hours * 100 + minutes;

    var isOpen = false;
    
    // Holidays (Simple Sunday check for now, can be expanded)
    if (day === 0) {
        isOpen = false;
    } else if (day === 6) { // Saturday
        // 9:30 - 13:00, 14:30 - 17:00
        if ((time >= 930 && time < 1300) || (time >= 1430 && time < 1700)) {
            isOpen = true;
        }
    } else { // Weekdays
        // 9:30 - 13:00, 14:30 - 19:00
        if ((time >= 930 && time < 1300) || (time >= 1430 && time < 1900)) {
            isOpen = true;
        }
    }

    if (statusText) {
        if (isOpen) {
            statusText.textContent = "只今の時間は診療中です";
            statusText.style.color = "#2E7D32"; // Green
            statusText.style.background = "#E8F5E9";
        } else {
            statusText.textContent = "只今の時間は休診・受付時間外です";
            statusText.style.color = "#C62828"; // Red
            statusText.style.background = "#FFEBEE";
        }
    }
}

updateStatus();
setInterval(updateStatus, 60000); // Update every minute
