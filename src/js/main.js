import renderCard from "./components/Card";
import generateItem from "./components/MenuItems";
import { createSectionWithInnerHTML as createSection }  from "./components/Section";
import * as helper from "./components/Helper";

const resources = [
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
]

const els = {
  mainContent: document.querySelector('#content_wrapper'),
  leftControl: document.querySelector('.left_control'),
  leftMenuItems: document.querySelector('.left_menu_items'),
  groupItems: document.querySelector('.group_items'),
  sectionsContainer: document.querySelector('#section_groups')
}

const fragmentElements = {
  menuItemsFragment: document.createDocumentFragment(),
  cardsFragment: document.createDocumentFragment()
}

resources.forEach(resource => {
  fragmentElements.menuItemsFragment.append(generateItem(resource));
  fragmentElements.cardsFragment.append(renderCard(resource));
});

els.leftControl.addEventListener('click', toggleSideBar);
els.leftMenuItems.appendChild(fragmentElements.menuItemsFragment);
els.sectionsContainer.innerHTML = renderSection();
els.groupItems.appendChild(fragmentElements.cardsFragment);


function renderSection() {
  const tags = resources.map(resource => resource.reference);
  const sectionTitle = helper.uniqueArray(tags);
  const sectionMakrup = createSection(sectionTitle);
  return sectionMakrup;
}

function toggleSideBar(e) {
  els.mainContent.classList.toggle('hidden');
}