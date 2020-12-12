// Represent the left menu opening or closing
// True means it's opening
let isActive = false;

export default function handleOverlay (selectors, names) {
  return function () {
    if (isActive) {
      selectors.html.classList.add('left_menu_show');
      selectors.html.classList.remove('left_menu_hidden');
      selectors.leftMenuOverlay.className = names.enterDone;
    } else {
      selectors.leftMenuOverlay.className = names.exitDone;
      selectors.html.classList.remove('left_menu_show');
      selectors.html.classList.add('left_menu_hidden');
    }

    isActive = !isActive;
  }
}
