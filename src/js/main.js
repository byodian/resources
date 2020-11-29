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
    if(!document.querySelector) return;
    const items = categories
      .map((category) => {
        return `
          <li class="left_menu_item">
            <img class="menu_item_icon" src="./svg/example.svg"></img>
            <span class="menu_item_content">${category}</span>
          </li>
        `;
      })
      .join('')

    document.querySelector(selector).innerHTML = items;
  };

  // Render section groups to document
  const renderSectionGroups = function(selector, categories) {
    if (!document.querySelector(selector)) return;
    if (typeof categories !== 'object') return;
    // Get section items
    const groups = categories.map((category) => {
      return `
        <section id="${category}" class="group" >
          <h3 class="group_title">${category}</h3>
          <div class="group_content">
            <ul class="row group_items"></ul>
          </div>
        </section>  
      `;
    });

    document.querySelector(selector).innerHTML = groups.join('');
  }

  // Get section items
  const renderSectionItmes = function(id, resources) {
    if (typeof resources !== 'object') return;
    if (!document.querySelector(`#${id} .group_items`)) return;
    const makeup = resources
      .filter(resource => resource.category.trim() === id)
      .map(resource => {
        return `
          <li class="group_item col3">
            <a class="group_item_link" href="${resource.linkHref}">
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
      })
      .join('')

    document.querySelector(`#${id} .group_items`).innerHTML = makeup;
  }

  // Update the content 
  var update = function(data) {
    defaults.resources = defaults.resources.concat(data);
    init(defaults.resources);
  }

  // Init events
  var init = function (options) {
    options = options || {};

    // Merge both user defaults and options.
    const settings = Object.assign({}, defaults, options);

    if (typeof settings.resources !== 'object') {
      console.log(defaults.resources);
      return;
    };
    // Get all categories of resources
    const categories = uniqueArray(settings.resources.map(
      (resource) => resource.category
    ));

    renderNavItems(settings.navItemContainer, categories);
    renderSectionGroups(settings.sectionsContainer, categories);

    // Render sections items on document
    categories.forEach(category => {          
      renderSectionItmes(category, settings.resources)
    })

    // Event
    document.querySelector('.top_bar_btn').addEventListener('click', toggleNav, false);
  };

  // Get resources from 
  resourcesService
    .getAll()
    .then(data => {
      update(data);
    });

  // resourcesService
  //   .create({
  //     "title": "社区",
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

  // TODO
  // Create the destory methods of plugin
})();