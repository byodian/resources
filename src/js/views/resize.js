Function.prototype.method = function(name, func) {
  if (this.prototype[name]) return;
  this.prototype[name] = func;
  return this;
}

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
      maxpageX: 425,
      minpageX: 250,
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
      defaults.elements.leftMenu.style.width = x + 'px';
      defaults.elements.resizeHandle.style.left = x + 'px';
      defaults.elements.mainContent.style.marginLeft = x + 'px';
    }

    const onMouseUp = function() {
      console.log(123);
      document.removeEventListener('mousemove', onMouseMove);
      this.removeEventListener('mouseup', onMouseUp);
    }

    const onMouseMove = function(event) {
      moveAt(event.pageX);
    }

    moveAt(settings.sizes.x);
    
    settings.elements.resizeHandle.addEventListener('mousedown', function(event) {
      document.addEventListener('mousemove', onMouseMove);
      this.addEventListener('mouseup', onMouseUp);

      this.ondragstart = function() {
        return false;
      }
    })
  }

  that.init = init;

  return that;
})();