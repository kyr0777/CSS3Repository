document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for any internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in class to sections and observe them
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add interactive hover effects to command cards
  const commandCards = document.querySelectorAll('.command-card');
  commandCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // Add click-to-copy functionality for code blocks
  const codeBlocks = document.querySelectorAll('.code-block');
  codeBlocks.forEach(block => {
    // Add copy indicator
    block.style.cursor = 'pointer';
    block.title = 'Click to copy';
    block.addEventListener('click', function() {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalBg = this.style.background;
        this.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        this.textContent = 'Copied to clipboard!';
        setTimeout(() => {
          this.style.background = originalBg;
          this.textContent = text;
        }, 1500);
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // Visual feedback
        const originalBg = this.style.background;
        this.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        this.textContent = 'Copied to clipboard!';
        setTimeout(() => {
          this.style.background = originalBg;
          this.textContent = text;
        }, 1500);
      });
    });
  });

  // Add progress indicator for steps
  const steps = document.querySelectorAll('.step');
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  progressContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255,255,255,0.9);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    z-index: 1000;
    min-width: 200px;
  `;
  const progressTitle = document.createElement('h4');
  progressTitle.textContent = 'Progress';
  progressTitle.style.marginBottom = '10px';
  progressContainer.appendChild(progressTitle);

  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  `;
  const progressFill = document.createElement('div');
  progressFill.style.cssText = `
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 0%;
    transition: width 0.3s ease;
  `;
  progressBar.appendChild(progressFill);
  progressContainer.appendChild(progressBar);

  const progressText = document.createElement('p');
  progressText.style.cssText = `
    margin-top: 8px;
    font-size: 0.9rem;
    color: #4a5568;
  `;
  progressContainer.appendChild(progressText);

  document.body.appendChild(progressContainer);

  // Update progress based on scroll position
  const updateProgress = () => {
    const totalSteps = steps.length;
    let completedSteps = 0;
    steps.forEach(step => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) {
        completedSteps++;
      }
    });
    const progress = (completedSteps / totalSteps) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Step ${completedSteps} of ${totalSteps}`;
  };
  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Initial call

  // Add typewriter effect to the main heading
  const mainHeading = document.querySelector('.header h1');
  if (mainHeading) {
    const originalText = mainHeading.textContent;
    mainHeading.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        mainHeading.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Add hover-only floating animation to benefit cards
  const benefitCards = document.querySelectorAll('.benefit-card');
  benefitCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0px)';
    });
  });

  // Add slide-in keyframes for before/after sections
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Add slide-in animations for before/after sections
  const beforeCards = document.querySelectorAll('.before');
  const afterCards = document.querySelectorAll('.after');
  beforeCards.forEach(card => {
    card.style.animation = 'slideInLeft 0.6s ease forwards';
  });
  afterCards.forEach(card => {
    card.style.animation = 'slideInRight 0.6s ease forwards';
  });

  // Add easter egg: Konami code for special animation
  let konamiCode = [];
  const expectedCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > expectedCode.length) {
      konamiCode.shift();
    }
    if (konamiCode.length === expectedCode.length &&
        konamiCode.every((code, index) => code === expectedCode[index])) {
      // Easter egg activated!
      document.body.style.animation = 'rainbow 2s infinite';
      const easterEggStyle = document.createElement('style');
      easterEggStyle.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(easterEggStyle);
      // Show congratulations message
      const congratsMsg = document.createElement('div');
      congratsMsg.textContent = '🎉 Konami Code Activated! You found the easter egg! 🎉';
      congratsMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.2rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(congratsMsg);
      setTimeout(() => {
        document.body.removeChild(congratsMsg);
        document.body.style.animation = '';
      }, 3000);
      konamiCode = []; // Reset
    }
  });

  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'j' || e.key === 'ArrowDown') {
      e.preventDefault();
      scrollToNextSection();
    } else if (e.key === 'k' || e.key === 'ArrowUp') {
      e.preventDefault();
      scrollToPrevSection();
    }
  });

  function scrollToNextSection() {
    const sections = document.querySelectorAll('.section');
    const current = getCurrentSection();
    const nextIndex = current < sections.length - 1 ? current + 1 : current;
    sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToPrevSection() {
    const sections = document.querySelectorAll('.section');
    const current = getCurrentSection();
    const prevIndex = current > 0 ? current - 1 : 0;
    sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
  }

  function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    let current = 0;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        current = index;
      }
    });
    return current;
  }

  // Add tooltip for keyboard shortcuts
  const shortcutTooltip = document.createElement('div');
  shortcutTooltip.innerHTML = `
    <strong>Keyboard Shortcuts:</strong><br>
    J/↓ - Next section<br>
    K/↑ - Previous section<br>
    Click code blocks to copy
  `;
  shortcutTooltip.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
  `;
  document.body.appendChild(shortcutTooltip);
  // Show tooltip on first visit
  setTimeout(() => {
    shortcutTooltip.style.opacity = '1';
    setTimeout(() => {
      shortcutTooltip.style.opacity = '0';
    }, 5000);
  }, 2000);

  console.log('🎉 Git & GitHub Guide loaded successfully!');
  console.log('🎉 Try the Konami code for a surprise!');
  console.log('Use J/K or arrow keys to navigate between sections');
});
