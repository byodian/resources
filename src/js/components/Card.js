const renderCard = function ({ src, title, content, linkHref}) {
  const li = document.createElement('li');
  li.className = 'group_item col3';
  
  const link = document.createElement('a');
  link.className = 'group_item_link';
  link.href = linkHref;
  link.alt = content;

  const card = document.createElement('div');
  card.className = 'card';
  
  const cardIcon = document.createElement('img');
  cardIcon.className = "card_icon"
  cardIcon.alt = title;
  cardIcon.src = src;

  const cardBody = document.createElement('div');
  cardBody.className = 'card_body';

  const cardTitle = document.createElement('h4');
  cardTitle.className = 'card_title';
  cardTitle.appendChild(document.createTextNode(title));

  const cardText = document.createElement('p');
  cardText.className = 'card_text';
  cardText.appendChild(document.createTextNode(content));

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardIcon);
  card.appendChild(cardBody);
  link.appendChild(card);
  li.appendChild(link);

  return li;
}

export default renderCard;

