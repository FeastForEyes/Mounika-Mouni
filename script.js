document.addEventListener('DOMContentLoaded', function () {
  const humanVerificationModal = document.getElementById('human-verification-modal');
  const yesHumanBtn = document.getElementById('yes-human-btn');
  const mathChallengeModal = document.getElementById('math-challenge-modal');
  const mathProblem = document.getElementById('math-problem');
  const mathAnswer = document.getElementById('math-answer');
  const submitMathBtn = document.getElementById('submit-math-btn');
  const mathFeedback = document.getElementById('math-feedback');
  const alertModal = document.getElementById('alert-modal');
  const closeAlertBtn = document.getElementById('close-alert-btn');
  const adModal = document.getElementById('ad-modal');
  const closeAdBtn = document.getElementById('close-ad-btn');
  const unauthorizedModal = document.getElementById('unauthorized-modal');
  const unauthorizedMessage = document.getElementById('unauthorized-message');
  const closeUnauthorizedBtn = document.getElementById('close-unauthorized-btn');
  const mediaWrapper = document.querySelector('.media-wrapper');
  const videoIframe = document.getElementById('video-iframe');

  let correctAnswer;
  let isEasyQuestion = false;
  let touchStartTime;

  // Check if the user has already been verified as human
  if (localStorage.getItem('human_verified') === '1') {
    // Skip human verification and math challenge
    alertModal.style.display = 'flex';
    setTimeout(() => {
      closeAlertBtn.style.display = 'block';
    }, 7000);
  } else {
    // Show human verification modal on page load
    humanVerificationModal.style.display = 'flex';
  }

  // Proceed to math challenge if user confirms they are human
  yesHumanBtn.addEventListener('click', () => {
    humanVerificationModal.style.display = 'none';
    generateMathProblem();
    mathChallengeModal.style.display = 'flex';
  });

  // Generate a random math problem
  function generateMathProblem() {
    let num1, num2;
    if (isEasyQuestion) {
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
    } else {
      num1 = Math.floor(Math.random() * 99) + 1;
      num2 = Math.floor(Math.random() * 99) + 1;
    }

    const operator = Math.random() > 0.5 ? '+' : '-';
    if (operator === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    mathProblem.textContent = `${num1} ${operator} ${num2}`;
    correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
  }

  // Check the user's answer to the math problem
  submitMathBtn.addEventListener('click', () => {
    const userAnswer = parseInt(mathAnswer.value, 10);
    if (userAnswer === correctAnswer) {
      mathFeedback.textContent = '✅ Correct! You are human!';
      mathFeedback.style.color = 'green';
      setTimeout(() => {
        mathChallengeModal.style.display = 'none';
        localStorage.setItem('human_verified', '1'); // Store verification status
        alertModal.style.display = 'flex';
        setTimeout(() => {
          closeAlertBtn.style.display = 'block';
        }, 7000);
      }, 1500);
    } else {
      mathFeedback.textContent = '❌ Incorrect! Try again.';
      mathFeedback.style.color = 'red';
      isEasyQuestion = true;
      generateMathProblem();
      mathAnswer.value = '';
    }
  });

  // Close alert modal and show ad modal
  closeAlertBtn.addEventListener('click', () => {
    alertModal.style.display = 'none';
    adModal.style.display = 'flex';
    setTimeout(() => {
      closeAdBtn.style.display = 'block';
    }, 1000);
  });

  // Close ad modal
  closeAdBtn.addEventListener('click', () => {
    adModal.style.display = 'none';
  });

  // Unauthorized activity handling
  function showUnauthorizedModal(activityName) {
    unauthorizedMessage.textContent = `🚫 Unauthorized Activity Detected: ${activityName} 🛑`;
    unauthorizedModal.style.display = 'flex';
    setTimeout(() => {
      closeUnauthorizedBtn.style.display = 'block';
    }, 2000);
  }

  closeUnauthorizedBtn.addEventListener('click', () => {
    unauthorizedModal.style.display = 'none';
    closeUnauthorizedBtn.style.display = 'none';
  });

  // Detect Ctrl key press and prevent default behavior
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault(); // Prevent default Ctrl key behavior
      showUnauthorizedModal('Ctrl Key Press');
    }
  });

  // Detect long press on small screens
  mediaWrapper.addEventListener('touchstart', (event) => {
    touchStartTime = new Date().getTime(); // Record the start time of the touch
  });

  mediaWrapper.addEventListener('touchend', (event) => {
    const touchEndTime = new Date().getTime();
    const touchDuration = touchEndTime - touchStartTime;

    // If the touch duration is more than 1000ms (1 second), consider it a long press
    if (touchDuration > 1000) {
      event.preventDefault();
      showUnauthorizedModal('Long Press');
    }
  });

  // Disable right-click and keyboard shortcuts
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showUnauthorizedModal('Right-Click');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'F12') {
      event.preventDefault();
      showUnauthorizedModal('F12 Key Press');
    }
  });

  mediaWrapper.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showUnauthorizedModal('Right-Click');
  });

  mediaWrapper.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.key === 'F12') {
      event.preventDefault();
      showUnauthorizedModal('Keyboard Shortcut');
    }
  });
});



