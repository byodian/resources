const navBar = document.querySelector('.navbar--fixed');
const hero = document.querySelector('.hero');

document.addEventListener('scroll', scrollDown(navBar));

function scrollDown(element) {
  let prevScrollpos = window.pageYOffset;

  return function() {

    const currentScrollpos = window.pageYOffset;

    if (prevScrollpos > currentScrollpos) {
      element.style.top = "0";
    } else {
      element.style.top = "-100px";
    }

    prevScrollpos = currentScrollpos;
  }
}