// Represent the left menu opening or closing
// True means it's opening
let isActive = false;

export function handleOverlay (selectors, classes) {
  return function () {
    if (isActive) {
      selectors.html.className = 'left_menu_show';
      selectors.leftMenuOverlay.className = classes.enterDone;
    } else {
      selectors.html.className = 'left_menu_hidden';
      selectors.leftMenuOverlay.className = classes.exitDone;
    }

    isActive = !isActive;
  }
}

export function hideMenu(selectors, classes) {
  return function() {
    if (selectors.html.clientWidth < 750) {
      selectors.html.className = 'left_menu_hidden';
      selectors.leftMenuOverlay.className = classes.exitDone;
      isActive = true;
    } else {
      selectors.html.className = 'left_menu_show';
      selectors.leftMenuOverlay.className = classes.enterDone;
      isActive = false;
    }
  }
}
