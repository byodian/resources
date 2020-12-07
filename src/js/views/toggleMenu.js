const selector = {
  leftControlMenu: document.querySelector('.left_control_menu'),
  leftMenuOverlay: document.querySelector('.left_menu_overlay'),
  contentWrapper: document.querySelector('.content_wrapper')
}

const classNames = {
  enterDone: 'left_menu_overlay left_menu_overlay-enter-done',
  exitDone: 'left_menu_overlay left_menu_overlay-exit-done'
}

// Represent the left menu opening or closing
// True means it's opening
let isActive = true;

const handleOverlay = function (classNames) {
  return function () {
    if (isActive) {
      selector.contentWrapper.classList.remove('is-closed');
      selector.leftMenuOverlay.className = classNames.enterDone;
    } else {
      selector.leftMenuOverlay.className = classNames.exitDone;
      selector.contentWrapper.classList.add('is-closed');
    }

    isActive = !isActive;
  }
}

export function changeOverlayStatus () {
  selector.leftControlMenu.addEventListener('click', handleOverlay(classNames));
}

export function closeMenu() {
  selector.leftMenuOverlay.addEventListener('click', handleOverlay(classNames));
}
