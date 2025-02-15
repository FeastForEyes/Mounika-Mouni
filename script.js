// Select elements
const protectedMedia = document.querySelectorAll('.protected-media');
const modal = document.getElementById('warning-modal');
const closeModalButton = document.getElementById('close-modal');

// Function to show the warning modal
function showModal() {
  modal.classList.remove('hidden');
}

// Function to hide the warning modal
closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Loop through all protected media elements
protectedMedia.forEach(media => {
  // Disable right-click on the media
  media.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showModal();
  });

  // Detect long press on the media element (for touch devices)
  let pressTimer;
  media.addEventListener('touchstart', (e) => {
    // Start a timer when the user touches the screen
    pressTimer = setTimeout(() => {
      e.preventDefault(); // Prevent default behavior
      showModal(); // Show the warning modal
    }, 1000); // Trigger after 1 second of holding
  });

  media.addEventListener('touchend', () => {
    // Clear the timer if the touch ends before 1 second
    clearTimeout(pressTimer);
  });

  media.addEventListener('touchmove', () => {
    // Clear the timer if the user moves their finger
    clearTimeout(pressTimer);
  });

  // Detect if the user tries to open the video in a new tab
  media.addEventListener('loadedmetadata', () => {
    const videoSrc = media.currentSrc || media.src;
    if (videoSrc) {
      media.addEventListener('play', () => {
        const isVideoPlayingInNewTab = !document.hasFocus();
        if (isVideoPlayingInNewTab) {
          showModal();
          media.pause(); // Pause the video
        }
      });
    }
  });
});

// Disable keyboard shortcuts (e.g., Ctrl+S, Ctrl+P) for the entire document
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
    e.preventDefault();
    showModal();
  }
});

// Detect network requests (e.g., video download attempts)
const originalFetch = window.fetch;
window.fetch = async (resource, config) => {
  if (typeof resource === 'string' && resource.includes('.mp4')) {
    showModal();
    return Promise.reject(new Error('Downloading videos is not allowed.'));
  }
  return originalFetch(resource, config);
};

// Select the alert modal, its content, and the close button
const alertModal = document.getElementById('alert-modal');
const alertMessage = document.getElementById('alert-message');

// Function to show the alert modal with a specific message and circular progress bar
function showAlert(message, duration) {
  const totalDuration = duration; // Total duration in milliseconds
  let remainingTime = Math.ceil(duration / 1000); // Convert milliseconds to seconds

  // Update the modal content with the message, circular progress bar, and close button
  alertMessage.innerHTML = `
    ${message}
    <div class="circular-progress-container">
      <svg class="circular-progress" viewBox="0 0 40 40">
        <circle class="circle-background" cx="20" cy="20" r="18"></circle>
        <circle class="circle-progress" cx="20" cy="20" r="18"></circle>
      </svg>
    </div>
    <div class="close-button" id="close-alert">×</div>
  `;
  alertModal.classList.remove('hidden'); // Show the modal

  const progressBar = alertMessage.querySelector('.circle-progress');
  const closeButton = alertMessage.querySelector('.close-button');

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * 18; // 2 * π * radius
  progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
  progressBar.style.strokeDashoffset = 0;

  // Start a countdown timer
  const countdownInterval = setInterval(() => {
    remainingTime--; // Decrease the remaining time by 1 second
    const progress = (remainingTime * 1000) / totalDuration; // Calculate progress percentage
    const offset = circumference - (progress * circumference) / 100; // Calculate dash offset
    progressBar.style.strokeDashoffset = offset;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval); // Stop the countdown
      progressBar.style.display = 'none'; // Hide the progress bar
      closeButton.style.display = 'block'; // Show the close button
    }
  }, 1000); // Update every second

  // Add event listener to close the modal when the close button is clicked
  closeButton.addEventListener('click', () => {
    alertModal.classList.add('hidden'); // Hide the modal
  });
}

// First message: Content warning
const contentWarningMessage = `
  <strong>⚠️ You are viewing 18+ content! ⚠️</strong><br>
  Use earphones 🎧 and watch videos when you are alone for safety.<br>
  Enjoy our videos! ❤️
`;

// Second message: Advertisement
const adMessage = `
  <strong>📣 Follow us on Instagram! 📸</strong><br>
  Keep supporting us by following the link below:<br>
  <em><a href="https://www.instagram.com" target="_blank">👉 Click here to follow us!</a></em>
`;

// Display the first message for 7 seconds
showAlert(contentWarningMessage, 7000);

// After 7 seconds, display the second message for 10 seconds
setTimeout(() => {
  showAlert(adMessage, 10000);
}, 7000);

