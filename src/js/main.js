import { elements, classes } from './views/elements'
import resourcesService from './services/resources';
import { getSections, getCards, getMenuItems, render, template } from './views/ui';
import renderSkeletonScreen from './views/skeleton';
import handleOverlay from './views/toggleMenu';
import { resize } from './views/resize';

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

    render(selector, template(uniqueResources, getCards));
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
    render(settings.navItemContainer, template(categories, getMenuItems));

    // Get all sections of main content
    render(settings.sectionsContainer, template(categories, getSections));

    // Render sections items on document
    categories.forEach(category => {          
      renderCards(category, settings.resources)
    })

    // Event 
  elements.leftControlMenu.addEventListener('click', handleOverlay(elements, classes));
  elements.leftMenuOverlay.addEventListener('click', handleOverlay(elements, classes));
  resize.init();
  };


  // Render the skeleton screen before getting the resources from server
  render(defaults.sectionsContainer, renderSkeletonScreen());

    // Get resources from the service side
  resourcesService
    .getAll()
    .then(resources => {
      init(resources);
    });


// Inits & Events
  that.init = init;

  return that;
})();