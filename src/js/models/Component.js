export const Component = (function() {

  var Constructor = function(selector, options) {
    this.selector = selector;
    this.resources = options.resources;
    this.callback = options.callback;
  }

  Constructor.prototype.render = function() {
    const target = document.querySelector(this.selector);
    if (!target) return;
    target.innerHTML = this.template(this.resources);
  }

  Constructor.prototype.template = function() {
    if (this.resources.length < 1) return;

    return this.resources
      .map(resource => this.callback(resource))
      .join('')
  }

  return Constructor;
})();