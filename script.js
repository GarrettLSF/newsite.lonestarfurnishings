document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const shrinkHeader = 100;

  if (header) {
    const toggleHeader = () => {
      if (window.scrollY >= shrinkHeader) {
        header.classList.add('scroll');
      } else {
        header.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', toggleHeader, { passive: true });
    toggleHeader();
  }

  const carousel = document.querySelector('#k12-carousel');
  if (!carousel) {
    return;
  }

  const track = carousel.querySelector('.carousel-inner');
  const prev = carousel.querySelector('.carousel-control-prev');
  const next = carousel.querySelector('.carousel-control-next');
  const pauseBtn = carousel.querySelector('#carouselPause');
  const originalItems = track ? Array.from(track.children) : [];

  if (!track || !prev || !next || !pauseBtn || originalItems.length === 0) {
    return;
  }

  if (originalItems.length <= 1) {
    pauseBtn.hidden = true;
    prev.disabled = true;
    next.disabled = true;
    prev.setAttribute('aria-disabled', 'true');
    next.setAttribute('aria-disabled', 'true');
    return;
  }

  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.classList.remove('active');
    track.appendChild(clone);
  });

  const total = originalItems.length;
  let cardWidth = originalItems[0].getBoundingClientRect().width;
  let index = 0;
  let autoTimer = null;
  let isAnimating = false;
  let isManuallyPaused = false;

  function jumpTo(i) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = i * cardWidth;
    // Force layout before restoring smooth scrolling
    track.getBoundingClientRect();
    track.style.scrollBehavior = 'smooth';
  }

  function animateTo(targetIndex) {
    if (isAnimating) {
      return;
    }

    isAnimating = true;
    track.style.scrollBehavior = 'smooth';
    track.scrollLeft = targetIndex * cardWidth;

    window.setTimeout(() => {
      if (targetIndex >= total) {
        index = 0;
        jumpTo(index);
      } else if (targetIndex < 0) {
        index = total - 1;
        jumpTo(index);
      } else {
        index = targetIndex;
      }

      isAnimating = false;
    }, 500);
  }

  function goNext() {
    animateTo(index + 1);
  }

  function goPrev() {
    if (index === 0) {
      index = total;
      jumpTo(index);
    }

    animateTo(index - 1);
  }

  function stopAuto() {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function startAuto() {
    if (autoTimer || total <= 1) {
      return;
    }

    autoTimer = window.setInterval(() => {
      goNext();
    }, 3000);
  }

  function restartAutoIfNeeded() {
    if (!isManuallyPaused) {
      startAuto();
    }
  }

  function pauseForInteraction() {
    if (!isManuallyPaused) {
      stopAuto();
    }
  }

  function resumeAfterInteraction() {
    if (!isManuallyPaused) {
      startAuto();
    }
  }

  next.addEventListener('click', (event) => {
    event.preventDefault();
    stopAuto();
    goNext();
    restartAutoIfNeeded();
  });

  prev.addEventListener('click', (event) => {
    event.preventDefault();
    stopAuto();
    goPrev();
    restartAutoIfNeeded();
  });

  pauseBtn.addEventListener('click', () => {
    if (isManuallyPaused) {
      isManuallyPaused = false;
      pauseBtn.textContent = 'Pause';
      pauseBtn.setAttribute('aria-label', 'Pause autoplay');
      pauseBtn.setAttribute('aria-pressed', 'false');
      startAuto();
    } else {
      isManuallyPaused = true;
      pauseBtn.textContent = 'Play';
      pauseBtn.setAttribute('aria-label', 'Start autoplay');
      pauseBtn.setAttribute('aria-pressed', 'true');
      stopAuto();
    }
  });

  track.addEventListener('mouseenter', pauseForInteraction);
  track.addEventListener('mouseleave', resumeAfterInteraction);
  track.addEventListener('focusin', pauseForInteraction);
  track.addEventListener('focusout', resumeAfterInteraction);
  carousel.addEventListener('touchstart', pauseForInteraction, { passive: true });
  carousel.addEventListener('touchend', resumeAfterInteraction, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAuto();
    } else if (!isManuallyPaused) {
      startAuto();
    }
  });

  window.addEventListener('resize', () => {
    cardWidth = originalItems[0].getBoundingClientRect().width;
    jumpTo(index);
  });

  pauseBtn.textContent = 'Pause';
  pauseBtn.setAttribute('aria-label', 'Pause autoplay');
  pauseBtn.setAttribute('aria-pressed', 'false');

  jumpTo(index);
  startAuto();
});
