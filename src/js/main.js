const render = (function() {

  //
  // Variables
  //
  
  const defaults = {
    resources: [
      {
        title: 'HTML Reference',
        content: '首页',
        src: './svg/example.svg',
        linkHref: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
        reference: 'javascript'
      },
      {
        title: 'HTML Attribute Reference',
        content: 'HTML',
        src: './svg/example.svg',
        linkHref: 'https://www.w3schools.com/tags/ref_attributes.asp',
        reference: 'javascript'
      },
      {
        title: 'glyphs(符号)',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
          reference: 'css'
      },
        {
        title: 'glyphs(符号)',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        reference: 'html'
      },
        {
        title: 'glyphs(符号)',
        content: 'Javascript',
        src: './svg/example.svg',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        reference: 'icon'
      }
    ],
    callback: function(content) {
      return content;
    }
  }

  //
  // Methods
  //

  // TODO 
  // 1. Create the render methods of left aside navigation items
  // 2. Create the render methods of section groups
  const renderItems = function() {
    return;
  }

  //
  // Inits & Events
  //

  // Public Methods APIs
  return {
    init: function(options) {

      options = options || {};
      // Merge both user defaults and options.
      const settings = Object.assign({}, defaults, options)

      // Get the left aside navigation element
      const leftMenusItems = document.querySelector('.left_menu_items');

      // Get the container of the section groups
      const groupsContainer = document.querySelector('#section_groups');

    
      // Render left aside navigation items
      const items = settings.resources.map(resource => {
        return `
          <li class="left_menu_item">
            <img class="menu_item_icon" src="/svg/example.svg"></img>
            <p class="menu_item_content">${resource.reference}</p>
          </li>
        `;
      });


      // TODO
      // 1. Get unique resource reference
      // 2. Get unique menu item

      // Get section items
      const groups = settings.resources.map(resource => {          
        return `
          <section id="javascript" class="group" >
            <h3 class="group_title">${resource.reference}</h3>
            <div class="group_content">
              <ul class="row group_items">
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
              </ul>
            </div>
          </section>  
        `;
      })

      leftMenusItems.innerHTML = items.join('');
      groupsContainer.innerHTML = groups.join('');
    }
  }

  // TODO
  // Create the destory methods of plugin

})();

render.init();