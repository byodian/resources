Function.prototype.method = function(name, func) {
  if (this.prototype[name]) return;
  this.prototype[name] = func;
  return this;
}

export const Component = (function() {

  var Constructor = function(selector, options) {
    this.selector = selector;
    this.resources = options.resources;
    this.template = options.template;
  }

  Constructor.method('render', function() {
    const target = document.querySelector(this.selector);
    if (!target) return;
    target.innerHTML = this.handleTemplate(this.resources);
  })

  Constructor.method('handleTemplate', function() {
    if (this.resources.length < 1) return;

    return this.resources
      .map(resource => this.template(resource))
      .join('')
  })

  Constructor.method('setData', function(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperties(key)) {
        this.resources = obj[key];
      }
    }

    this.render();
  })

  Constructor.method('getData', function() {
    return Object.parse(Object.stringify(this.resources));
  })

  return Constructor;
})();