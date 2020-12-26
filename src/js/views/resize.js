import { elements } from "./DOMElements";

export const resize = (function() {

  const that = {}; 
  const defaults = {
    elements:  {
      leftMenu: document.querySelector('.left_menu'),
      resizeHandle: document.querySelector('.resize_handle'),
      mainContent: document.querySelector('.main_content')
    },
    classes: {
    show: 'left_menu_show',
    hidden: 'left_menu_hidden'
    },
    sizes: {
      maxWidth: 425,
      minWidth: 200,
      x: 250
    },
    callback: function(content) {
      return content
    }
  }

  // event
  const init = function(options) {
    options = options || {} 
    const settings = Object.assign({}, defaults, options);

    // methods
    const moveAt = function(x) {
      settings.elements.leftMenu.style.width = x + 'px';
      settings.elements.resizeHandle.style.left = x + 'px';
      settings.elements.mainContent.style.marginLeft = x + 'px';
    }

    const onMouseUp = function func() {
      elements.leftMenu.classList.remove('transition_none');
      elements.mainContent.classList.remove('transition_none');
      elements.body.classList.remove('no_user_selection');
      document.removeEventListener('mousemove', onMouseMove);
      this.removeEventListener('mouseup', func);
    }

    const onMouseMove = function(event) {
      const leftMenuWidth = parseInt(elements.leftMenu.style.width, 10);
      if (leftMenuWidth > settings.sizes.maxWidth || leftMenuWidth < settings.sizes.minWidth) {
        document.removeEventListener('mousemove', onMouseMove);
      } else if (leftMenuWidth <= settings.sizes.maxWidth && leftMenuWidth >= settings.sizes.minWidth) {
        elements.leftMenu.classList.add('transition_none');
        elements.mainContent.classList.add('transition_none');
        elements.body.classList.add('no_user_selection');
        moveAt(event.pageX);
      }
    }

    settings.elements.resizeHandle.addEventListener('mousedown', function(event) {
      document.addEventListener('mousemove', onMouseMove);
      this.addEventListener('mouseup', onMouseUp);

      this.addEventListener('dragstart', function(event) {
        event.preventDefault;
      });

    })

    settings.elements.resizeHandle.addEventListener('dblclick', function() {
      moveAt(settings.sizes.x);
    });


    // Initial 
    moveAt(settings.sizes.x);
  }

  that.init = init;

  return that;
})();