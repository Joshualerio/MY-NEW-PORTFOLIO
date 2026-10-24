/* ================================================================
   ONE PIECE CINEMATIC PORTFOLIO — script.js (COMPLETE)
   ================================================================ */

(function () {
  'use strict';

  /* ---------- 1. HELPERS ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 2. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 3. SMOOTH SCROLLING ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  /* ---------- 4. START ADVENTURE BUTTON ---------- */
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      const about = document.getElementById('about');
      if (about) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const top = about.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  }

  /* ---------- 5. SCROLL PROGRESS BAR ---------- */
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgress.style.width = percent + '%';
  }

  /* ---------- 6. BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.pageYOffset > 500);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 7. ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section.section');
  const navItems = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.pageYOffset + 150;
    let currentSection = 'home';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) currentSection = section.id;
    });
    navItems.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
  }

  /* ---------- 8. COMBINED SCROLL HANDLER ---------- */
  let scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        updateScrollProgress();
        updateBackToTop();
        updateActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  updateScrollProgress();
  updateBackToTop();
  updateActiveNav();

  /* ---------- 9. TREASURE CHEST ---------- */
  const treasureChest = document.getElementById('treasureChest');
  const treasureMessage = document.getElementById('treasureMessage');

  if (treasureChest && treasureMessage) {
    treasureChest.addEventListener('click', function () {
      const isOpen = treasureChest.classList.toggle('open');
      treasureChest.setAttribute('aria-expanded', String(isOpen));
      treasureMessage.classList.toggle('show', isOpen);
    });
  }

  /* ---------- 10. DEVIL FRUIT ---------- */
  const devilFruit = document.getElementById('devilFruit');
  const devilMessage = document.getElementById('devilMessage');

  if (devilFruit && devilMessage) {
    devilFruit.addEventListener('click', function () {
      const isOpen = devilFruit.classList.toggle('active');
      devilFruit.setAttribute('aria-expanded', String(isOpen));
      devilMessage.classList.toggle('show', isOpen);
    });
  }

  /* ---------- 11. EASTER EGG — 5 CLICKS ON LOGO ---------- */
  const logo = document.getElementById('logo');
  const easterEggOverlay = document.getElementById('easterEggOverlay');
  const closeEasterEgg = document.getElementById('closeEasterEgg');
  let logoClickCount = 0;
  let logoClickTimer = null;

  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      logoClickCount++;
      clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(function () { logoClickCount = 0; }, 2000);

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        if (easterEggOverlay) {
          easterEggOverlay.classList.add('show');
          easterEggOverlay.setAttribute('aria-hidden', 'false');
        }
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  }

  if (closeEasterEgg && easterEggOverlay) {
    closeEasterEgg.addEventListener('click', function () {
      easterEggOverlay.classList.remove('show');
      easterEggOverlay.setAttribute('aria-hidden', 'true');
    });
    easterEggOverlay.addEventListener('click', function (e) {
      if (e.target === easterEggOverlay) {
        easterEggOverlay.classList.remove('show');
        easterEggOverlay.setAttribute('aria-hidden', 'true');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && easterEggOverlay.classList.contains('show')) {
        easterEggOverlay.classList.remove('show');
        easterEggOverlay.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ---------- 12. BACKGROUND MUSIC ---------- */
  const soundToggle = document.getElementById('soundToggle');
  const bgMusic = document.getElementById('bgMusic');
  let soundOn = false;

  if (soundToggle && bgMusic) {
    bgMusic.volume = 0.35;

    bgMusic.addEventListener('error', function () {
      const soundText = soundToggle.querySelector('.sound-text');
      if (soundText) soundText.textContent = 'NO AUDIO';
      soundToggle.disabled = true;
      soundToggle.style.opacity = '0.4';
      soundToggle.style.cursor = 'not-allowed';
    });

    function fadeIn(audio, targetVolume, duration) {
      const steps = 30;
      const stepTime = duration / steps;
      const stepSize = targetVolume / steps;
      let current = 0;
      audio.volume = 0;
      const fade = setInterval(function () {
        current += stepSize;
        if (current >= targetVolume) {
          audio.volume = targetVolume;
          clearInterval(fade);
        } else {
          audio.volume = current;
        }
      }, stepTime);
    }

    function fadeOut(audio, duration, callback) {
      const startVolume = audio.volume;
      const steps = 30;
      const stepTime = duration / steps;
      const stepSize = startVolume / steps;
      let current = startVolume;
      const fade = setInterval(function () {
        current -= stepSize;
        if (current <= 0) {
          audio.volume = 0;
          clearInterval(fade);
          if (callback) callback();
        } else {
          audio.volume = current;
        }
      }, stepTime);
    }

    soundToggle.addEventListener('click', function () {
      const soundText = soundToggle.querySelector('.sound-text');
      if (!soundOn) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
          playPromise.then(function () {
            fadeIn(bgMusic, 0.35, 1500);
            soundOn = true;
            soundToggle.setAttribute('aria-pressed', 'true');
            soundToggle.classList.add('playing');
            if (soundText) soundText.textContent = 'SOUND ON';
          }).catch(function () {
            if (soundText) soundText.textContent = 'NO AUDIO';
          });
        }
      } else {
        fadeOut(bgMusic, 800, function () {
          bgMusic.pause();
          bgMusic.currentTime = 0;
        });
        soundOn = false;
        soundToggle.setAttribute('aria-pressed', 'false');
        soundToggle.classList.remove('playing');
        if (soundText) soundText.textContent = 'SOUND OFF';
      }
    });
  }

  /* ---------- 13. REVEAL ON SCROLL ---------- */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section-text, .skill-card, .hobby-card, .timeline-item, .wanted-poster, .contact-card, .treasure-wrap, .devil-fruit-wrap'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- 14. CHARACTER FRAME ENTRANCE ---------- */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const charFrames = document.querySelectorAll('.character-frame');
    const charObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('char-visible');
          charObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    charFrames.forEach(function (frame) { charObserver.observe(frame); });
  } else {
    document.querySelectorAll('.character-frame').forEach(function (frame) {
      frame.classList.add('char-visible');
    });
  }

  /* ---------- 15. KEYBOARD SUPPORT ---------- */
  document.querySelectorAll('.skill-card, .hobby-card').forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('focus-active');
      }
    });
  });

  /* ---------- 16. CONTACT PLACEHOLDER ---------- */
  document.querySelectorAll('.contact-card[data-placeholder="true"]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      alert('This is a placeholder link.\n\nOpen index.html and replace href="#" with your real link.');
    });
  });

  /* ---------- 17. CONSOLE EASTER EGG ---------- */
  console.log(
    '%c🏴‍☠️ Welcome to the Grand Line! 🏴‍☠️',
    'color: #d4af37; font-size: 20px; font-weight: bold;'
  );

  /* ---------- 18. FLOATING QUICK NAVIGATION ---------- */
  const quickNav = document.getElementById('quickNav');
  const quickNavToggle = document.getElementById('quickNavToggle');
  const quickNavLinks = document.querySelectorAll('.quick-nav-link');

  if (quickNav && quickNavToggle) {
    console.log('✅ Quick navigation loaded');

    quickNavToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = quickNav.classList.toggle('open');
      quickNavToggle.setAttribute('aria-expanded', String(isOpen));
    });

    quickNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        quickNav.classList.remove('open');
        quickNavToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!quickNav.contains(e.target)) {
        quickNav.classList.remove('open');
        quickNavToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && quickNav.classList.contains('open')) {
        quickNav.classList.remove('open');
        quickNavToggle.setAttribute('aria-expanded', 'false');
      }
    });

    function updateQuickNavActive() {
      const scrollPos = window.pageYOffset + 150;
      let currentSection = 'home';
      document.querySelectorAll('section.section').forEach(function (section) {
        if (section.offsetTop <= scrollPos) currentSection = section.id;
      });
      quickNavLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
      });
    }

    window.addEventListener('scroll', updateQuickNavActive);
    updateQuickNavActive();
  } else {
    console.error('❌ Quick nav HTML missing — add the <div class="quick-nav" id="quickNav"> block to index.html');
  }

  /* ---------- 19. CUSTOM THUNDER CURSOR ---------- */
  const cursorBolt = document.getElementById('cursorBolt');
  const spark1 = document.getElementById('spark1');
  const spark2 = document.getElementById('spark2');
  const spark3 = document.getElementById('spark3');
  const cursorRipple = document.getElementById('cursorRipple');

  if (cursorBolt && spark1 && spark2 && spark3 && cursorRipple && hasFinePointer && !prefersReducedMotion) {
    console.log('✅ Thunder cursor loaded');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x1 = mouseX, y1 = mouseY;
    let x2 = mouseX, y2 = mouseY;
    let x3 = mouseX, y3 = mouseY;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorBolt.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
    });

    function animateTrail() {
      x1 += (mouseX - x1) * 0.22;
      y1 += (mouseY - y1) * 0.22;
      x2 += (x1 - x2) * 0.22;
      y2 += (y1 - y2) * 0.22;
      x3 += (x2 - x3) * 0.22;
      y3 += (y2 - y3) * 0.22;

      spark1.style.transform = 'translate(' + x1 + 'px, ' + y1 + 'px) translate(-50%, -50%)';
      spark2.style.transform = 'translate(' + x2 + 'px, ' + y2 + 'px) translate(-50%, -50%)';
      spark3.style.transform = 'translate(' + x3 + 'px, ' + y3 + 'px) translate(-50%, -50%)';

      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    const clickables = document.querySelectorAll(
      'a, button, .skill-card, .hobby-card, .contact-card, .treasure-chest, .devil-fruit, .logo, .nav-link'
    );
    clickables.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursorBolt.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function () {
        cursorBolt.classList.remove('hovering');
      });
    });

    document.addEventListener('mousedown', function (e) {
      cursorRipple.style.left = e.clientX + 'px';
      cursorRipple.style.top = e.clientY + 'px';
      cursorRipple.classList.remove('active');
      void cursorRipple.offsetWidth;
      cursorRipple.classList.add('active');
    });

    document.addEventListener('mouseleave', function () {
      cursorBolt.style.opacity = '0';
      spark1.style.opacity = '0';
      spark2.style.opacity = '0';
      spark3.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      cursorBolt.style.opacity = '1';
      spark1.style.opacity = '0.75';
      spark2.style.opacity = '0.45';
      spark3.style.opacity = '0.25';
    });

    function updateCursorSection() {
      const scrollPos = window.pageYOffset + 200;
      let currentId = 'home';
      document.querySelectorAll('section.section').forEach(function (section) {
        if (section.offsetTop <= scrollPos) currentId = section.id;
      });
      Array.from(document.body.classList).forEach(function (cls) {
        if (cls.startsWith('section-')) document.body.classList.remove(cls);
      });
      document.body.classList.add('section-' + currentId);
    }

    window.addEventListener('scroll', updateCursorSection);
    updateCursorSection();
  }

  /* ---------- 20. THUNDER & LIGHTNING EFFECT ---------- */
  /* ---------- 20. THUNDER & LIGHTNING EFFECT ---------- */
  const thunderOverlay = document.getElementById('thunderOverlay');

  if (thunderOverlay && !prefersReducedMotion) {
    console.log('✅ Thunder effect loaded');

    let thunderCooldown = false;

    function triggerThunder() {
      if (thunderCooldown) return;
      thunderCooldown = true;
      thunderOverlay.classList.remove('flash');
      void thunderOverlay.offsetWidth;
      thunderOverlay.classList.add('flash');
      document.body.classList.add('thunder-shake');
      setTimeout(function () {
        thunderOverlay.classList.remove('flash');
        document.body.classList.remove('thunder-shake');
        thunderCooldown = false;
      }, 900);
    }

    function scheduleThunder() {
      const delay = 18000 + Math.random() * 27000;
      setTimeout(function () {
        triggerThunder();
        scheduleThunder();
      }, delay);
    }
    scheduleThunder();

    let lastThunderSection = 'home';
    function checkSectionThunder() {
      const scrollPos = window.pageYOffset + 200;
      let currentId = 'home';
      document.querySelectorAll('section.section').forEach(function (section) {
        if (section.offsetTop <= scrollPos) currentId = section.id;
      });
      if (currentId !== lastThunderSection) {
        lastThunderSection = currentId;
        setTimeout(triggerThunder, 250);
      }
    }
    window.addEventListener('scroll', checkSectionThunder);

    const logoForThunder = document.getElementById('logo');
    if (logoForThunder) {
      logoForThunder.addEventListener('dblclick', triggerThunder);
    }
  }

   /* ---------- 21. CHARACTER HOVER VIDEOS (ALL CHARACTERS) ---------- */
  const CHARACTER_VIDEOS = {
    luffy: 'luffy.mp4',
    nami:  'Namii.mp4',
    zoro:  'Zoroo.mp4',
    usopp: 'usopp.mp4',
    sanji: 'sanji.mp4',
    brook: 'brook.mp4',
    jinbe: 'jinbe.mp4'
  };

  document.querySelectorAll('.character-frame[data-char]').forEach(function (frame) {
    const charName = frame.dataset.char;
    const src = frame.dataset.video || CHARACTER_VIDEOS[charName];
    if (!src) return;

    // Fix pointer-events: none on .hero-character
    frame.style.pointerEvents = 'auto';
    frame.style.position = 'relative';

    // Wrap the img + fallback so the video hugs the photo's exact size & shape
    const img = frame.querySelector('.char-img');
    const fallback = frame.querySelector('.char-fallback');

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'char-media-wrap';
    mediaWrap.style.position = 'relative';
    mediaWrap.style.display = 'inline-block';
    mediaWrap.style.width = 'fit-content';
    mediaWrap.style.maxWidth = '100%';
    mediaWrap.style.lineHeight = '0';

    const anchor = img || fallback;
    if (anchor) {
      frame.insertBefore(mediaWrap, anchor);
      if (img) mediaWrap.appendChild(img);
      if (fallback) mediaWrap.appendChild(fallback);
    }

    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.loop = false;          // play ONCE, then fade back to photo
    video.playsInline = true;
    video.preload = 'auto';
    video.className = 'hover-video';
    video.setAttribute('aria-hidden', 'true');

    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.opacity = '0';
    video.style.transition = 'opacity 0.6s ease, transform 0.4s ease';
    video.style.zIndex = '10';
    video.style.pointerEvents = 'none';
    video.style.borderRadius = 'inherit';
    video.style.transform = 'scale(1)';

    mediaWrap.appendChild(video);

    video.addEventListener('error', function () {
      console.error('❌ Video failed to load:', src);
      video.style.display = 'none';
    });

    function playVideo() {
      video.style.opacity = '1';
      video.currentTime = 0;
      const p = video.play();
      if (p && p.catch) {
        p.catch(function (err) {
          console.warn('Autoplay blocked:', err.message);
          video.style.opacity = '0';
        });
      }
    }

    // When the video finishes → fade back to the photo
    video.addEventListener('ended', function () {
      video.style.opacity = '0';
    });

    // Hover: play video + scale it in sync with the img's hover scale
    frame.addEventListener('mouseenter', function () {
      video.style.transform = 'scale(1.03)';
      if (video.paused) playVideo();
    });

    frame.addEventListener('mouseleave', function () {
      video.style.transform = 'scale(1)';
    });

    // Auto-play ONCE the first time the section becomes visible
    // (fires on page load for Luffy, and on scroll / nav-click for all others)
    if ('IntersectionObserver' in window) {
      const autoPlayObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playVideo();
            autoPlayObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      autoPlayObserver.observe(frame);
    } else {
      // Fallback for very old browsers
      if (charName === 'luffy') playVideo();
    }
  });

  /* ---------- 22. CONTINUOUS LIGHTNING CURSOR ---------- */
  if (hasFinePointer && !prefersReducedMotion) {
    // Pulsing aura ring
    const aura = document.createElement('div');
    aura.className = 'cursor-aura';
    aura.setAttribute('aria-hidden', 'true');
    document.body.appendChild(aura);

    let lx = window.innerWidth / 2;
    let ly = window.innerHeight / 2;
    let lastArcSpawn = 0;
    let mouseInWindow = true;

    function spawnLightningArc(x, y) {
      if (document.hidden || !mouseInWindow) return;

      const arc = document.createElement('div');
      arc.className = 'cursor-arc';

      const angle = Math.random() * Math.PI * 2;
      const distance = 15 + Math.random() * 35;
      const ax = x + Math.cos(angle) * distance;
      const ay = y + Math.sin(angle) * distance;

      arc.style.left = ax + 'px';
      arc.style.top  = ay + 'px';

      const size = 10 + Math.random() * 10;
      arc.innerHTML =
        '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '">' +
        '<path d="M13 2 L4 14 L11 14 L10 22 L20 9 L13 9 Z" fill="currentColor"/>' +
        '</svg>';

      document.body.appendChild(arc);
      setTimeout(function () {
        if (arc.parentNode) arc.parentNode.removeChild(arc);
      }, 450);
    }

    document.addEventListener('mousemove', function (e) {
      lx = e.clientX;
      ly = e.clientY;
      aura.style.left = lx + 'px';
      aura.style.top  = ly + 'px';

      // Extra arcs when moving fast
      const now = Date.now();
      if (now - lastArcSpawn > 90) {
        lastArcSpawn = now;
        spawnLightningArc(lx, ly);
      }
    });

    document.addEventListener('mouseleave', function () { mouseInWindow = false; });
    document.addEventListener('mouseenter', function () { mouseInWindow = true; });

    // Nonstop arcs even when the mouse is still
    setInterval(function () {
      spawnLightningArc(lx, ly);
    }, 140);
  }
})();