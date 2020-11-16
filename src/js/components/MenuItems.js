export default function generateItem({ src, content }) {
  const li = document.createElement('li');
  li.className = 'left_menu_item';
  
  const icon = document.createElement('span');
  icon.className = 'menu_item_icon';
  
  const img = document.createElement('img');
  img.src = src;

  const p = document.createElement('p');
  p.className = 'menu_item_content';
  p.appendChild(document.createTextNode(content));

  icon.appendChild(img);
  li.appendChild(icon);
  li.appendChild(p);

  return li;
}