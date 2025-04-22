// Simplified and structured version of scripts.js with logic preserved

window.addEventListener('DOMContentLoaded', () => {
  // DOM references
  const get = id => document.getElementById(id);
  const qs = sel => document.querySelector(sel);

  const ufo = get('ufo');
  const bubble = qs('.bubble-container');
  const bubbleText = get('ufoText');
  const bgMusic = get('bgMusic');
  const alien = get('alien');
  const alienBubble = qs('.alien-bubble');
  const alienText = get('alienText');
  const countdownButton = qs('.countdown-button');
  const rocket = qs('.rocket');
  const alienBubbleLeft = qs('.alien-bubble-left');
  const alienTextLeft = get('alienTextLeft');
  const countdownDisplay = get('countdownDisplay');
  const countdownText = get('countdownText');
  const nextButton = get('nextButton');
  const happyMsg = get('happyBirthdayMessage');

  let clickEnabled = false, ufoClicked = false, countdownEnabled = false;

  // Utility
  const enableClick = () => { clickEnabled = true; document.body.style.pointerEvents = 'auto'; };
  const disableClick = () => { clickEnabled = false; document.body.style.pointerEvents = 'none'; };

  const typeWriter = (text, el, speed, cb) => {
    let i = 0;
    el.innerHTML = '';
    (function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i++);
        setTimeout(type, speed);
      } else if (cb) cb();
    })();
  };

  // UFO dialogue type effect
  const ufoDialogues = [
    "Hawa mein mat dekho, screen pe tap karo..!!"
  ];

  const typeUFOAndEnableClick = () => {
    let i = 0;
    const next = () => {
      if (i < ufoDialogues.length) {
        typeWriter(ufoDialogues[i++], bubbleText, 50, () => setTimeout(next, 50));
      } else setTimeout(enableClick, 50);
    };
    next();
  };

  setTimeout(() => {
    ufo.style.opacity = 1;
  }, 1000);

  setTimeout(() => {
    bubble.style.opacity = 1;
    disableClick();
    typeUFOAndEnableClick();
  }, 2000); // delayed bubble by 1s

  document.body.addEventListener('click', () => {
    if (!clickEnabled || ufoClicked) return;
    ufoClicked = true;
    disableClick();

    // Start background music
    bgMusic.volume = 0.15;
    bgMusic.play().catch(console.log);

    // UFO flies away
    Object.assign(ufo.style, { transition: 'all 2s ease', bottom: '100%', opacity: 0 });
    bubble.style.opacity = 0;

    // Alien appears
    setTimeout(() => {
      alien.style.opacity = 1;
      alien.style.bottom = '33%';

      setTimeout(() => {
        alienBubble.style.opacity = 1;
        disableClick();
        typeAlienDialogue(() => {
          alien.style.transition = 'all 2s ease';
          alien.style.bottom = '45%';
          alien.style.left = '50%';
          alienBubble.style.transition = 'opacity 1s ease';
          alienBubble.style.opacity = 0;

          // Show countdown
          Object.assign(countdownButton.style, {
            opacity: 1,
            pointerEvents: 'none'
          });
          countdownButton.disabled = false;
          countdownButton.classList.add('visible');
          countdownEnabled = true;
          enableClick();

          rocket.style.transition = 'all 2s ease';
          rocket.style.opacity = 1;
          rocket.style.bottom = '5%';

          setTimeout(() => {
            alienBubbleLeft.style.opacity = 1;
            alienTextLeft.style.opacity = 1;
            typeLeftDialogue();
          }, 500);
        });
      }, 500);
    }, 700);
  });

  const typeAlienDialogue = cb => {
    const lines = [
      "Yeh kaun tapak gaya bhai... itna chamak ke?",
"Oye! Kisne meri neend disturb kari yeh shine leke?",
"Mujhe lagta hai sweet sapna chal raha...,",
"Aree ruk! Yeh dream nahi... filterless glow-up hai!",
"Haan yaad aaya... boss ne bola tha 'chamkile guest' aayenge!",
"Boss ne bola tha – ‘jab wo aaye, toh taali bajana!’",
"Oho cutiee! Tum toh expectations ke bhi upar nikli!"
    ];
    let i = 0;
    (function next() {
      if (i < lines.length) {
        typeWriter(lines[i++], alienText, 50, () => setTimeout(next, 1000));
      } else cb && cb();
    })();
  };

  const typeLeftDialogue = () => {
    const lines = [
      "Oye hoye... rocket ne tujhe dekha aur blushing mode on kar diya!",
"Boss ne bola tha: ‘isko dekhte hi rocket full swag mein udna chahiye!’",
"Chalo ab tap karo screen... rocket bhi wait mein hairfall kar raha hai!"
    ];
    let i = 0;
    (function next() {
      if (i < lines.length) {
        typeWriter(lines[i++], alienTextLeft, 50, () => setTimeout(next, 1000));
      } else setTimeout(() => countdownButton.style.pointerEvents = 'auto', 50);
    })();
  };

  countdownButton.addEventListener('click', () => {
    if (!countdownEnabled) return;
    countdownButton.disabled = true;
    countdownButton.style.opacity = 0;
    countdownButton.style.pointerEvents = 'none';

    alienBubbleLeft.style.transition = 'opacity 1s ease';
    alienBubbleLeft.style.opacity = 0;

    setTimeout(() => countdownButton.style.display = 'none', 100);
    startCountdown();
  });

  const startCountdown = () => {
    let time = 5;
    countdownDisplay.classList.add('visible');
    countdownText.textContent = time;

    const timer = setInterval(() => {
      countdownText.textContent = --time;
      if (time <= 0) {
        clearInterval(timer);
        countdownDisplay.classList.remove('visible');
        launchRocket();
      }
    }, 1000);
  };

  const launchRocket = () => {
    rocket.style.transition = 'all 2s ease';
    rocket.style.bottom = '80%';

    rocket.addEventListener('transitionend', () => {
      rocket.style.opacity = 0;
      rocket.style.display = 'none';
      triggerConfettiAndFireworks();
      setTimeout(() => happyMsg.classList.add('visible'), 100);
    }, { once: true });
  };

  const triggerConfettiAndFireworks = () => {
    const createVideo = (src, style = {}) => {
      const vid = document.createElement('video');
      vid.src = src;
      Object.assign(vid, { autoplay: true, loop: false });
      Object.assign(vid.style, style);
      document.body.appendChild(vid);
      vid.addEventListener('ended', () => vid.remove());
    };

    createVideo('animations/confetti.webm', {
      position: 'fixed', bottom: '80%', left: '50%', transform: 'translateX(-50%)', zIndex: 9999
    });

    createVideo('animations/fw.webm', {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999
    });

    const bubble = document.createElement('div');
    bubble.className = 'right-bubble';
    Object.assign(bubble.style, {
      position: 'absolute', bottom: '60%', left: '80%', transform: 'translateX(-50%)', opacity: 1,
      transition: 'opacity 1s ease'
    });

    const text = document.createElement('span');
    text.className = 'alien-text';
    text.textContent = 'Happy Birthday!';
    bubble.appendChild(text);
    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.style.opacity = 0;
      setTimeout(() => bubble.remove(), 1000);
    }, 4000);

    setTimeout(() => {
      nextButton.classList.remove('hidden');
      nextButton.classList.add('visible');
    }, 1800);

    nextButton.addEventListener('click', () => {
      window.location.href = 'page2.html';
    });
  };
});

// Emoji floating logic
const emojiContainer = document.getElementById('emojiContainer');
const emojiList = ['💕', '🚀', '🛸', '👽', '💫', '❤️', '🎂', '✨', '🦄'];

setInterval(() => {
  const count = Math.floor(Math.random() * 3) + 4; // 4 to 6 emojis at once
  for (let i = 0; i < count; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    emoji.style.left = `${Math.random() * 95}vw`;
    emoji.style.fontSize = `${0.8 + Math.random() * 0.5}rem`;
    emoji.style.zIndex = '1';
    
    // 👇 Add staggered delay to each emoji
    emoji.style.animationDelay = `${Math.random() * 1.5}s`;

    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 5000); // lifespan includes delay
  }
}, Math.random() * 500 + 800);
