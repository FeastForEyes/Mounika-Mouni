document.addEventListener('DOMContentLoaded', function() {
  const alertModal = document.getElementById('alert-modal');
  const closeAlertBtn = document.getElementById('close-alert-btn');
  const adModal = document.getElementById('ad-modal');
  const closeAdBtn = document.getElementById('close-ad-btn');
  const unauthorizedModal = document.getElementById('unauthorized-modal');
  const unauthorizedMessage = document.getElementById('unauthorized-message');
  const closeUnauthorizedBtn = document.getElementById('close-unauthorized-btn');

  // Function to show unauthorized activity modal
  function showUnauthorizedModal(activityName) {
    unauthorizedMessage.textContent = `🚫 ${activityName} Unauthorized Activity Detected! 🛑`;
    unauthorizedModal.style.display = 'flex';
    // Show close button after 2 seconds
    setTimeout(() => {
      closeUnauthorizedBtn.style.display = 'block';
    }, 2000);
  }

  // Close unauthorized modal
  closeUnauthorizedBtn.addEventListener('click', () => {
    unauthorizedModal.style.display = 'none';
    closeUnauthorizedBtn.style.display = 'none';
  });

  // Detect unauthorized activities
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'p':
          event.preventDefault();
          showUnauthorizedModal('');
          break;
        case 'c':
          event.preventDefault();
          showUnauthorizedModal('');
          break;
        case 'u':
          event.preventDefault();
          showUnauthorizedModal(')');
          break;
        case 'v':
          event.preventDefault();
          showUnauthorizedModal('');
          break;
        case 's':
          event.preventDefault();
          showUnauthorizedModal('');
          break;
      }
    }
    if (event.key === 'F12') {
      event.preventDefault();
      showUnauthorizedModal('');
    }
  });

  // Detect right-click
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    showUnauthorizedModal('');
  });

  // Detect long press
  let pressTimer;
  document.addEventListener('mousedown', function(event) {
    pressTimer = setTimeout(() => {
      showUnauthorizedModal('Long Press');
    }, 1000);
  });
  document.addEventListener('mouseup', function() {
    clearTimeout(pressTimer);
  });
  document.addEventListener('mouseleave', function() {
    clearTimeout(pressTimer);
  });

  // Show alert modal immediately on page load
  alertModal.style.display = 'flex';

  // Show close button after 10 seconds
  setTimeout(() => {
    closeAlertBtn.style.display = 'block';
  }, 10000);

  // Close alert modal and show ad modal
  closeAlertBtn.addEventListener('click', () => {
    alertModal.style.display = 'none';
    adModal.style.display = 'flex';

    // Show close button after 5 seconds
    setTimeout(() => {
      closeAdBtn.style.display = 'block';
    }, 5000);
  });

  // Close ad modal
  closeAdBtn.addEventListener('click', () => {
    adModal.style.display = 'none';
  });
});
