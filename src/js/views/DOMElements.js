export const nodeList = {
  leftControlMenu: document.querySelector('.left_control_menu'),
  leftMenuOverlay: document.querySelector('.left_menu_overlay'),
  sectionItems: document.querySelector('#section_groups'),
  leftMenuItems: document.querySelector('#left_menu_items'),
  html: document.documentElement,
  body: document.body,
  leftMenu: document.querySelector('.left_menu'),
  resizeHandle: document.querySelector('.resize_handle'),
  mainContent: document.querySelector('.main_content'),
  prev: document.querySelector('#prev'),
  next: document.querySelector('#next'),
  dotWrapper: document.querySelector('.dot-wrapper')
}

  // Generate a item of the navigation
export const getMenuItems = category => `
  <li class="left_menu_item">
    <a href="#${category}"> 
      <img class="menu_item_icon" src="./svg/${category}.svg"></img>
      <span class="menu_item_content">${category}</span>
    </a>
  </li>
`;

  // Generate a section of the main content
export const getSections = category => `
  <section id="${category}" class="group" >
    <h2 class="group_title">${category}</h2>
    <div class="group_content">
      <ul class="row group_items"></ul>
    </div>
  </section>  
`;

  // Generate a list of the section 
export const getCards = resource => {
  let  logoEl = ``;
  resource.src 
    ? logoEl = `<img class="card_icon" src="${resource.src}">`
    : logoEl = `<span class="card_icon card_icon--noLogo"></span>`
  
    return `
      <li class="group_item col3">
        <a class="group_item_link" href="${resource.href}">
          <div class="card">
            ${logoEl}
            <div class="card_body">
              <h3 class="card_title">${resource.title}</h3>
              <p class="card_text">${resource.content}</p>
            </div>
          </div>
        </a>
      </li>
    `
};