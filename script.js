// Wait for page to load
$(document).ready(function() {
  var cardWidth;
  var scrollPosition = 0;
  var totalCards = $(".carousel-item").length;
  var currentIndex = 0;
  var isMobile = false;

  // Function to check if we're in mobile view
  function checkMobile() {
    isMobile = $(window).width() < 576;
  }

  // Function to update card width (responsive)
  function updateCardWidth() {
    if (!isMobile) {
      cardWidth = $(".carousel-item").outerWidth(true);
    }
  }
	
// --- Shrink Header on Scroll ---
var shrinkHeader = 100;
$(window).scroll(function() {
	"use strict";
	var scroll = $(window).scrollTop(); // Use jQuery's scrollTop
	if ( scroll >= shrinkHeader ) {
		$('.header').addClass('scroll');
	}
	else {
		$('.header').removeClass('scroll');
	}
});

  // Initialize
  checkMobile();
  updateCardWidth();

  // Clone cards for infinite loop (only for desktop)
  function setupInfiniteLoop() {
    if (!isMobile) {
      var $carouselInner = $(".carousel-inner");
      var originalCards = $carouselInner.html();
      
      // Add cloned cards at the end for seamless loop
      $carouselInner.append(originalCards);
      
      // Update total cards count
      totalCards = $(".carousel-item").length / 2; // Since we doubled them
    }
  }

  // Mobile carousel function
  function handleMobileCarousel(direction) {
    var $items = $(".carousel-item");
    var $activeItem = $items.filter(".active");
    var activeIndex = $items.index($activeItem);
    var newIndex;

    if (direction === 'next') {
      newIndex = (activeIndex + 1) % $items.length;
    } else {
      newIndex = activeIndex - 1;
      if (newIndex < 0) newIndex = $items.length - 1;
    }

    $activeItem.removeClass("active");
    $items.eq(newIndex).addClass("active");
  }

  setupInfiniteLoop();

  // Custom next function
  $(".carousel-control-next").off('click').on("click", function (e) {
    e.preventDefault();
    
    if (isMobile) {
      handleMobileCarousel('next');
    } else {
      updateCardWidth();
      
      currentIndex++;
      scrollPosition = currentIndex * cardWidth;
      
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600, function() {
        // If we've scrolled past the original cards, reset to beginning
        if (currentIndex >= totalCards) {
          currentIndex = 0;
          scrollPosition = 0;
          $(".carousel-inner").scrollLeft(0);
        }
      });
    }
  });

  // Custom prev function
  $(".carousel-control-prev").off('click').on("click", function (e) {
    e.preventDefault();
    
    if (isMobile) {
      handleMobileCarousel('prev');
    } else {
      updateCardWidth();
      
      // If at beginning, jump to end of first set
      if (currentIndex <= 0) {
        currentIndex = totalCards - 1;
        scrollPosition = currentIndex * cardWidth;
        $(".carousel-inner").scrollLeft(scrollPosition);
      } else {
        currentIndex--;
        scrollPosition = currentIndex * cardWidth;
        $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
      }
    }
  });

  // Update on window resize
  $(window).resize(function() {
    var wasMobile = isMobile;
    checkMobile();
    
    // If we switched between mobile/desktop, reinitialize
    if (wasMobile !== isMobile) {
      location.reload(); // Simple solution - reload page
    } else if (!isMobile) {
      updateCardWidth();
      scrollPosition = currentIndex * cardWidth;
      $(".carousel-inner").scrollLeft(scrollPosition);
    }
  });
});

setTimeout(function() {
  setInterval(function() {
    $(".carousel-control-next").click();
  }, 3000);
}, 2000);