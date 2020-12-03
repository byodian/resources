import resourcesService from './services/resources';

const render = (function() {
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

  // Generate a item of the navigation
  const generateNavItem = category => `
    <li class="left_menu_item">
      <img class="menu_item_icon" src="./svg/example.svg"></img>
      <span class="menu_item_content">${category}</span>
    </li>
  `;

  // Generate a section of the main content
  const generateSection = category => `
    <section id="${category}" class="group" >
      <h3 class="group_title">${category}</h3>
      <div class="group_content">
        <ul class="row group_items"></ul>
      </div>
    </section>  
  `;

  // Generate a list of the section 
  const generateListOfSection = resource => `
    <li class="group_item col3">
      <a class="group_item_link" href="${resource.href}">
        <div class="card">
          <img class="card_icon" src="${resource.src}">
          <div class="card_body">
            <h4 class="card_title">${resource.title}</h4>
            <p class="card_text">${resource.content}</p>
          </div>
        </div>
      </a>
    </li>
  `;

  // Methods
  // Remove duplicate values from an array
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const toggleNav = function() {
    document.querySelector('#content_wrapper').classList.toggle('is-closed');
  }

  // Insert left navigation items into document
  const renderNavItems = function (selector, categories) {
    // Check the selector  for validity
    if(!document.querySelector(selector)) return;

    const items = categories
      .map(category => generateNavItem(category))
      .join('')
    document.querySelector(selector).innerHTML = items;
  };

  // Render section groups to document
  const renderSectionGroups = function(selector, categories) {
    // Check the selector for vaidity
    if (!document.querySelector(selector)) return;
    if (typeof categories !== 'object') return;
    
    // Get section items
    const groups = categories
      .map(category => generateSection(category))
      .join('');
    document.querySelector(selector).innerHTML = groups;
  }

  // Get section items
  const renderSectionItmes = function(id, resources) {
    if (typeof resources !== 'object') return;
    if (!document.querySelector(`#${id} .group_items`)) return;

    const makeup = resources
      .filter(resource => resource.category.trim() === id)
      .map(resource => generateListOfSection(resource))
      .join('')

    document.querySelector(`#${id} .group_items`).innerHTML = makeup;
  }

  //

  // Init events
  const init = function (options) {
    options = options || {};

    // Merge both user defaults and options.
    const settings = Object.assign({}, defaults, options);

    // Get all categories of resources
    const categories = uniqueArray(settings.resources.map(resource => resource.category));

    renderNavItems(settings.navItemContainer, categories);
    renderSectionGroups(settings.sectionsContainer, categories);

    // Render sections items on document
    categories.forEach(category => {          
      renderSectionItmes(category, settings.resources)
    })

    // Event
    document.querySelector('.top_bar_btn').addEventListener('click', toggleNav, false);
  };

    // Update the content 
  const update = function(data) {
    defaults.resources = defaults.resources.concat(data);
    init(defaults.resources);
  }

  // Get resources from the service side
  resourcesService
    .getAll()
    .then(data => {
      update(data);
    });

  // resourcesService
  //   .create({
  //     "title": "Happy Birthday",
  //     "content": "聚集地",
  //     "src": "./img/file-app.png",
  //     "linkHref": "https://eleduck.com/",
  //     "category": "blog",
  //   })
  //   .then(data => {
  //     update(data)
  //   })

// Inits & Events
  that.init = init;

  return that;
})();