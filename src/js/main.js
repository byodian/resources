import renderCard from "./components/Card";
import generateItem from "./components/MenuItems";

const resources = [
  {
    title: 'HTML Reference',
    content: '首页',
    src: './svg/example.svg',
    linkHref: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element'
  },
  {
    title: 'HTML Attribute Reference',
    content: 'HTML',
    src: './svg/example.svg',
    linkHref: 'https://www.w3schools.com/tags/ref_attributes.asp'
  },
  {
    title: 'glyphs(符号)',
    content: 'Javascript',
    src: './svg/example.svg',
    linkHref: 'https://css-tricks.com/snippets/html/glyphs/'
  }
]

const elements = {
  mainContent: document.querySelector('#content_wrapper'),
  leftControl: document.querySelector('.left_control'),
  leftMenuItems: document.querySelector('.left_menu_items'),
  groupItems: document.querySelector('.group_items')
}

const fragmentElements = {
  menuItemsFragment: document.createDocumentFragment(),
  cardsFragment: document.createDocumentFragment()
}

resources.forEach(resource => {
  fragmentElements.menuItemsFragment.append(generateItem(resource));
  fragmentElements.cardsFragment.append(renderCard(resource));
});

elements.leftControl.addEventListener('click', toggleSideBar);
elements.leftMenuItems.appendChild(fragmentElements.menuItemsFragment);
elements.groupItems.appendChild(fragmentElements.cardsFragment);

function toggleSideBar(e) {
  elements.mainContent.classList.toggle('hidden');
}