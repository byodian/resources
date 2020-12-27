import { Component } from './models/Component';
import {
  nodeList,
  getSections,
  getCards,
  getMenuItems,
} from './views/DOMElements';
import { getSkeleton, render } from './views/skeleton';
import service from './services/resources';
import { handleOverlay, handleMenu , hideMenu} from './views/handleMenu';
import { scrollHandler } from './views/scrollTo';
import { resize } from './views/resize';

const app = (function () {
  //
  // Variables
  //
  let settings;
  
  const that = {};
  const defaults = {
    selectors: {
      menuItemsGroup: '#left_menu_items',
      sectionsGroup: '#section_groups',
    },
    classes: {
      enterDone: 'left_menu_overlay left_menu_overlay-enter-done',
      exitDone: 'left_menu_overlay left_menu_overlay-exit-done',
      leftMenuShow: 'left_menu_show',
      leftMenuHidden: 'left_menu_hidden'
    },
    resources: [],
    callback: function (content) {
      return content;
    },
  };

  //
  // Methods
  //
  
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const uniqueResources = function (category) {
    return function (resources) {
      return resources.filter(
        (resource) => resource.category.trim() === category
      );
    };
  };

  const scrollTo = function (elems, offset) {
    for (let elem of elems) {
      elem.addEventListener('click', scrollHandler(offset));
    }

    return false;
  };

  /**
   * 
   * @param {String} selector The selector for the content parent element
   * @param {Array} resources The data for the content items
   * @param {Function} template The function render UI
   */
  const renderContent = function(selector, resources, template) {
    return new Component(selector, {
      resources: resources,
      template: template,
    });
  }

  const destory = function() {
    // Make sure the plugin has been initialized
    if (!settings) return;

    // Remove the table of contents
    settings.nodeList.leftMenuItems.innerHTML = '';
    settings.nodeList.sectionsItems.innerHTML = '';

    // Reset variables
    settings = null;
  }

  const init = function (options) {
    // Destory the current initialization
    destory();

    options = options || {};

    // Merge both user defaults and options.
    settings = Object.assign({}, defaults, options);

    // Get all categories of the resources
    const categories = uniqueArray(
      settings.resources.map((resource) => resource.category)
    );

    // Get all items of left menu items then append it to document
    renderContent(settings.selectors.menuItemsGroup, categories, getMenuItems).render();

    // Get all sections of main content
    renderContent(settings.selectors.sectionsGroup, categories, getSections).render();

    // Render the items into a unique section id
    categories.forEach((category) => {
      const selector = `#${category} .group_items`;

      // Get resources of the same category
      // For example: HTML、Javascript、Tools、podcast
      const resources = uniqueResources(category)(settings.resources);
      renderContent(selector, resources, getCards).render();
    });

    // Scroll to the specified category by clicking the menu
    scrollTo(document.querySelectorAll('.left_menu_item a'), 76);

    // Show or hide the left menu by resizing the size of document.documentElement.clientWidth
    handleMenu(nodeList, settings.classes)();

    // Resize the width of left_menu and main_content
    resize.initialize({ nodeList: nodeList });

    window.addEventListener('resize', handleMenu(nodeList, settings.classes));
    nodeList.leftControlMenu.addEventListener('click', handleOverlay(nodeList, settings.classes));
    nodeList.leftMenuOverlay.addEventListener('click', handleOverlay(nodeList, settings.classes));

    nodeList.leftMenu.addEventListener('click', function() {
      if (nodeList.html.clientWidth < 750) {
        hideMenu(nodeList, settings.classes);
      }
    });
    
    nodeList.leftMenu.addEventListener('mousedown', function (event) {
      event.preventDefault();
      return false;
    });
  };

  //
  // Inits & Events
  //

  // Render the skeleton screen before getting the resources from server
  render(defaults.selectors.sectionsGroup, getSkeleton);

  // Get resources from the service side
  service.getAll().then((resources) => {
    init(resources);
  });

  that.init = init;
  that.destory = destory;
  
  return that;
})();
