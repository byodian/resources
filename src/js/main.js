import resourcesService from './services/resources';
import { getSections, getCards, getMenuItems, render } from './views/ui';
import renderSkeletonScreen from './views/skeleton';

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

  const toggleNav = function() {
    document.querySelector('#content_wrapper').classList.toggle('is-closed');
  }

  const appendMakeup = function(selector, makeup) {
    if (!document.querySelector(selector)) return;
    document.querySelector(selector).innerHTML = makeup;
  }

  const renderCards = function(category, resources) {
    const selector = `#${category} .group_items`;
    const uniqueResources = resources.filter(
      resource => resource.category.trim() === category
    );

    const makeup = render(uniqueResources, getCards);

    appendMakeup(selector, makeup);
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
    const menuItems =  render(categories, getMenuItems);
    appendMakeup(settings.navItemContainer, menuItems);

    // Get all sections of main content
    const groups = render(categories, getSections);
    appendMakeup(settings.sectionsContainer, groups);

    // Render sections items on document
    categories.forEach(category => {          
      renderCards(category, settings.resources)
    })
    
    // Event
    document.querySelector('.top_bar_btn').addEventListener('click', toggleNav, false);
  };


  // Render the skeleton screen before getting the resources from server
  appendMakeup(defaults.sectionsContainer, renderSkeletonScreen());

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
