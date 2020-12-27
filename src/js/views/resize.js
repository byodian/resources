export const resize = (function() {
  let settings;

  const that = {}; 
  const defaults = {
    sizes: {
      maxWidth: 425,
      minWidth: 200,
      x: 250
    },
  }

  // Inits and Events
  const initialize = function(options) {
    options = options || {} 
    settings = Object.assign({}, defaults, options);

    // methods
    const moveAt = function(x) {
      settings.nodeList.leftMenu.style.width = x + 'px';
      settings.nodeList.resizeHandle.style.left = x + 'px';
      settings.nodeList.mainContent.style.marginLeft = x + 'px';
    }

    const onMouseUp = function func() {
      settings.nodeList.leftMenu.classList.remove('transition_none');
      settings.nodeList.mainContent.classList.remove('transition_none');
      settings.nodeList.body.classList.remove('no_user_selection');
      document.removeEventListener('mousemove', onMouseMove);
      this.removeEventListener('mouseup', func);
    }

    const onMouseMove = function(event) {
      const leftMenuWidth = parseInt(settings.nodeList.leftMenu.style.width, 10);
      if (leftMenuWidth > settings.sizes.maxWidth || leftMenuWidth < settings.sizes.minWidth) {
        document.removeEventListener('mousemove', onMouseMove);
      } else if (leftMenuWidth <= settings.sizes.maxWidth && leftMenuWidth >= settings.sizes.minWidth) {
        settings.nodeList.leftMenu.classList.add('transition_none');
        settings.nodeList.mainContent.classList.add('transition_none');
        settings.nodeList.body.classList.add('no_user_selection');
        moveAt(event.pageX);
      }
    }

    settings.nodeList.resizeHandle.addEventListener('mousedown', function(event) {
      document.addEventListener('mousemove', onMouseMove);
      this.addEventListener('mouseup', onMouseUp);

      this.addEventListener('dragstart', function(event) {
        event.preventDefault;
      });

    })

    settings.nodeList.resizeHandle.addEventListener('dblclick', function() {
      moveAt(settings.sizes.x);
    });

    // Initial 
    moveAt(settings.sizes.x);
  }

  that.initialize = initialize;

  return that;
})();