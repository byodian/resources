function createSectionWithInnerHTML(tags) {
  const rows = tags.map(tag=> {
    return `
    <section id="${tag}" class="group" >
      <h3 class="group_title">${tag}</h3>
      <div class="group_content">
        <ul class="row group_items">
          <li class="group_item col3">
            <a class="group_item_link" href="https://developer.mozilla.org/en-US/docs/Web" target="_blank">
              <div class="card">
                <img class="card_icon" src="./img/mdn.png">
                <div class="card_body">
                  <h4 class="card_title">
                    Web Technology</h4>
                  <p class="card_text">一个前端学习路径</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
    `;
  })

  return rows.join(' ');
}

export {createSectionWithInnerHTML};