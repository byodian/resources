import { Component } from './models/Component';
import { elements, classes, getSections, getCards, getMenuItems } from './views/ui';
import { resize } from './views/resize';
import { getSkeleton, render } from './views/skeleton';
import service from './services/resources';
import handleOverlay from './views/toggleMenu';

const app = (function() {
  // Variables
  const that = {};
  const defaults = {
    navItemContainer: '.left_menu_items',
    sectionsContainer: '#section_groups',
    resources: [],
    callback: function (content) {
      return content;
    },
  };

  // Methods
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const renderCards = function(category, resources) {
    const selector = `#${category} .group_items`;
    const uniqueResources = resources.filter(
      resource => resource.category.trim() === category
    );

    const cards = new Component(selector, {
      resources: resources,
      callback: getCards
    });

    cards.render();
  }

  // Init events
  const init = function (options) {
    options = options || {};
    // Merge both user defaults and options.
    const settings = Object.assign({}, defaults, options);
    // Get all categories of resources
    const categories = uniqueArray(
      settings.resources.map(resource => resource.category)
    );

    // Get all items of left menu items then append it to document
    const menuItems = new Component(settings.navItemContainer, {
      resources: categories,
      callback: getMenuItems
    });
    menuItems.render();

    // Get all sections of main content
    const sections = new Component(settings.sectionsContainer, {
      resources: categories,
      callback: getSections
    })
    sections.render();

    // Render sections items on document
    categories.forEach(category => {          
      renderCards(category, settings.resources)
    })

    // Event 
    elements.leftControlMenu.addEventListener('click', handleOverlay(elements, classes));
    elements.leftMenuOverlay.addEventListener('click', handleOverlay(elements, classes));
    resize.init();
  };


// Inits & Events
  that.init = init;

  // Render the skeleton screen before getting the resources from server
  render(defaults.sectionsContainer, getSkeleton());

    // Get resources from the service side
  service
    .getAll()
    .then(resources => {
      init(resources);
    });

  return that;
})();