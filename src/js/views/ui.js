export const elements = {
  leftControlMenu: document.querySelector('.left_control_menu'),
  leftMenuOverlay: document.querySelector('.left_menu_overlay'),
  html: document.documentElement,
  leftMenu: document.querySelector('.left_menu'),
  resizeHandle: document.querySelector('.resize_handle'),
  mainContent: document.querySelector('.main_content')
}

export const classes = {
  enterDone: 'left_menu_overlay left_menu_overlay-enter-done',
  exitDone: 'left_menu_overlay left_menu_overlay-exit-done'
}

  // Generate a item of the navigation
export const getMenuItems = category => `
  <li class="left_menu_item">
    <img class="menu_item_icon" src="./svg/example.svg"></img>
    <span class="menu_item_content">${category}</span>
  </li>
`;

  // Generate a section of the main content
export const getSections = category => `
  <section id="${category}" class="group" >
    <h3 class="group_title">${category}</h3>
    <div class="group_content">
      <ul class="row group_items"></ul>
    </div>
  </section>  
`;

  // Generate a list of the section 
export const getCards = resource => `
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