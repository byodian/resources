let showlideIndex = 1;

const handleBanner = function(callback) {
  const slides = document.querySelectorAll('.slides');
  const dots = document.querySelectorAll('.dot');

  if (!slides) return;
  if(!dots) return;

  const len = slides.length;
  
  callback(len);

  for(let i = 0; i < len; i++) {
    slides[i].style.display = 'none';
    dots[i].classList.remove('active');
  }

  slides[showlideIndex - 1].style.display = 'block';
  dots[showlideIndex - 1].classList.add('active');
}

export function showSlides(n = 1) {
  return handleBanner(function(len) {
    showlideIndex = n > len ? 1 : n < 1 ? len : showlideIndex;
  });
}

export function autoShowSlides() {
  handleBanner(function(len) {
    showlideIndex = showlideIndex > len ? 1 : showlideIndex;
  });

  setTimeout(autoShowSlides, 4000);
  showlideIndex++;
}

export function plusSlides(n) {
  return function() {
    showSlides(showlideIndex += n);
  }
}

export function currentSlide(n) {
  showSlides(showlideIndex = n);
}