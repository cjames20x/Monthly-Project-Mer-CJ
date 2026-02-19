const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById('progress-bar');
const counterText = document.getElementById('counter-text');

// New constants for the popup
const overlay = document.getElementById('overlay');
const backBtn = document.getElementById('back-btn');
const restartBtn = document.getElementById('restart-btn');

function updateProgress() {
    const totalItems = checkboxes.length;
    const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked').length;
    
    // Calculate percentage
    const percentage = (checkedItems / totalItems) * 100;
    progressBar.style.width = percentage + "%";
    counterText.innerText = `You've completed ${checkedItems}/${totalItems} items`;

    // Trigger Popup when 100% complete
    if (checkedItems === totalItems && totalItems > 0) {
        // We use a tiny delay (500ms) so the bar finishes its animation first
        setTimeout(() => {
            overlay.style.display = 'flex';
        }, 500);
    }
}

// 1. BACK BUTTON: Just hides the popup
backBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// 2. RESTART BUTTON: Clears everything and reloads page
restartBtn.addEventListener('click', () => {
    location.reload(); 
});

// Listener for checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

// New constants for Love Mail
// Love Mail Elements
const loveBtn = document.getElementById('lovemail-btn');
const loveOverlay = document.getElementById('lovemail-overlay');
const loveClose = document.getElementById('close-lovemail');

// Open the letter
loveBtn.addEventListener('click', () => {
    loveOverlay.style.display = 'flex';
});

// Close the letter
loveClose.addEventListener('click', () => {
    loveOverlay.style.display = 'none';
});

// Close when clicking on the dark background
window.addEventListener('click', (e) => {
    if (e.target === loveOverlay) {
        loveOverlay.style.display = 'none';
    }
});