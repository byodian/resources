const changeEnterDone = function () {
  // Check the left_menu_overlay-enter-active
  if (document.querySelector('.left_menu_overlay-enter-active')) {
    console.log(1)
    document.querySelector('.left_menu_overlay').classList.remove('left_menu_overlay-exit-done');
    document.querySelector('.left_menu_overlay').classList.add('left_menu_overlay-enter-done');
  } else {
    document.querySelector('.left_menu_overlay').classList.add('left_menu_overlay-exit-done');
    document.querySelector('.left_menu_overlay').classList.remove('left_menu_overlay-enter-done');
  }
}

const toggleEnterActive = function (className) {
  return function () {
    document.querySelector('.left_menu_overlay').classList.toggle(className);
    changeEnterDone();
  }
}

const toggleExitDone = function () {
    document.querySelector('.left_menu_overlay').classList.remove('left_menu_overlay-enter-done');
    document.querySelector('.left_menu_overlay').classList.add('left_menu_overlay-exit-done');
    document.querySelector('.left_menu_overlay').classList.remove('left_menu_overlay-enter-active');
    document.querySelector('.content_wrapper').classList.add('is-closed');
}

export default function () {
  const className = 'left_menu_overlay-enter-active';
  document.querySelector('.left_control_menu').addEventListener('click', toggleEnterActive(className));
}

export function closeMenu() {
  document.querySelector('.left_menu_overlay').addEventListener('click', toggleExitDone)
}
