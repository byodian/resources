// Represent the left menu opening or closing
// True means it's opening
let isActive = false;

export function hideMenu(nodelist, classes) {
  nodelist.html.className = classes.leftMenuHidden;
  nodelist.leftMenuOverlay.className = classes.exitDone;
  isActive = true;
}

export function handleOverlay (nodelist, classes) {
  return function () {
    if (isActive) {
      nodelist.html.className = classes.leftMenuShow;
      nodelist.leftMenuOverlay.className = classes.enterDone;
    } else {
      nodelist.html.className = classes.leftMenuHidden;
      nodelist.leftMenuOverlay.className = classes.exitDone;
    }

    isActive = !isActive;
  }
}

export function handleMenu(nodelist, classes) {
  return function() {
    if (nodelist.html.clientWidth < 750) {
      hideMenu(nodelist, classes);
    } else {
      nodelist.html.className = classes.leftMenuShow;
      nodelist.leftMenuOverlay.className = classes.enterDone;
      isActive = false;
    }
  }
}
