const render = (function() {
  //
  // Variables
  //

  const defaults = {
    navItemContainer: '.left_menu_items',
    sectionsContainer: '#section_groups',
    resources: [
      {
        title: 'HTML Reference',
        content: '首页',
        src: './svg/example.svg',
        linkHref: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
        category: 'javascript',
      },
      {
        title: 'HTML Attribute Reference',
        content: 'HTML',
        src: './svg/example.svg',
        linkHref: 'https://www.w3schools.com/tags/ref_attributes.asp',
        category: 'javascript',
      },
      {
        title: 'glyphs(符号)',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        category: 'css',
      },
      {
        title: 'glyphs(符号)',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        category: 'html',
      },
      {
        title: 'glyphs(符号)',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        category: 'icon',
      },
      {
        title: 'Hello world',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        category: 'icon',
      }
    ],
    callback: function (content) {
      return content;
    },
  };

  //
  // Methods
  //

  // Remove duplicate values from an array
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const renderNavItems = function (selector, categories) {
    const items = categories.map((category) => {
      return `
        <li class="left_menu_item">
          <img class="menu_item_icon" src="/svg/example.svg"></img>
          <p class="menu_item_content">${category}</p>
        </li>
      `;
    });

    document.querySelector(selector).innerHTML = items.join('');
  };

  const renderSectionGroups = function(selector, categories) {
    // Get section items
    const groups = categories.map((category) => {
      return `
        <section id="${category}" class="group" >
          <h3 class="group_title">${category}</h3>
          <div class="group_content">
            
          </div>
        </section>  
      `;
    });

    document.querySelector(selector).innerHTML = groups.join('');
  }

  //
  // Inits & Events
  //

  // Public Methods APIs
  return {
    init: function (options) {
      options = options || {};
      // Merge both user defaults and options.
      const settings = Object.assign({}, defaults, options);

      // Get all categories of resources
      const categories = uniqueArray(settings.resources.map(
        (resource) => resource.category
      ));

      renderNavItems(settings.navItemContainer, categories);
      renderSectionGroups(settings.sectionsContainer, categories);
    },
  };

  // TODO
  // Create the destory methods of plugin
})();

render.init();