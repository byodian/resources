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
        content: 'MDN HTML 属性参考',
        src: './img/mdn.png',
        linkHref: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
        category: 'HTML',
      },
      {
        title: 'HTML Attribute Reference',
        content: 'w3schools HTML 属性参考',
        src: './img/w3schools.png',
        linkHref: 'https://www.w3schools.com/tags/ref_attributes.asp',
        category: 'HTML',
      },
      {
        title: 'glyphs (符号)',
        content: 'HTML 特殊符号名字和数字代码',
        src: './img/mdn.png',
        linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
        category: 'HTML',
      },
      {
        title: 'HTML&CSS Tutorial',
        content: 'HTML CSS Sass 基础教程',
        src: './img/marksheet.png',
        linkHref: 'https://marksheet.io/',
        category: 'HTML',
      },
      {
        title: 'CSS Reference',
        content: 'MDN CSS 参考',
        src: './img/mdn.png',
        linkHref: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference',
        category: 'HTML',
      },
      {
        title: 'CSS Reference',
        content: '受欢迎属性说明, 附有生动的例子',
        src: './img/cssio.png',
        linkHref: 'https://cssreference.io/',
        category: 'HTML',
      },
      {
        title: 'CSS Reference',
        content: '广泛的 CSS 属性参考文章',
        src: './img/codrops.png',
        linkHref: 'https://cssreference.io/',
        category: 'HTML',
      },
      {
        title: '你必须要记住的 30 个选择器',
        content: '文章',
        src: './img/tutsplus.png',
        linkHref: 'https://cssreference.io/',
        category: 'HTML',
      },
      {
        title: 'Absolute Centering',
        content: '使用绝对定位实现居中布局',
        src: './img/codepen.png',
        linkHref: 'https://codepen.io/shshaw/full/gEiDt',
        category: 'HTML',
      },
      {
        title: 'A Complete Guide to Flexbox',
        content: 'Flexbox 完整指南',
        src: './img/csstricks.png',
        linkHref: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        category: 'HTML',
      },
      {
        title: 'A Complete Guide to Grid',
        content: 'Grid 完整指南网格布局',
        src: './img/csstricks.png',
        linkHref: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
        category: 'HTML',
      },
      {
        title: 'The Shapes of CSS',
        content: 'CSS 形状',
        src: './img/csstricks.png',
        linkHref: 'https://css-tricks.com/the-shapes-of-css/',
        category: 'HTML',
      },
      {
        title: '为什么人们讨厌 CSS',
        content: '文章',
        src: './img/csshate.png',
        linkHref: 'https://aulcpederson.com/articles/css-for-people-who-hate-css/',
        category: 'HTML',
      },
      {
        title: 'This is Responsive',
        content: '收集创造响应式网站的模块和资源',
        src: './img/file-app.png',
        linkHref: 'https://bradfrost.github.io/this-is-responsive/',
        category: 'HTML',
      },
      {
        title: '你需要知道的 CSS 技巧',
        content: 'CSS 技巧',
        src: './img/43-tricks.png',
        linkHref: 'https://lhammer.cn/You-need-to-know-css/#/',
        category: 'HTML',
      },
      {
        title: 'css 样式规范指南',
        content: '详细的 CSS 规范指南',
        src: './img/cssguidelin.png',
        linkHref: 'https://cssguidelin.es/',
        category: 'HTML',
      },
      {
        title: 'css 样式规范指南',
        content: '常规的规范指南',
        src: './img/codeguide.png',
        linkHref: 'https://codeguide.co/',
        category: 'HTML',
      },
      {
        title: 'Web Technology',
        content: '一个前端学习路径',
        src: './img/mdn.png',
        linkHref: 'https://developer.mozilla.org/en-US/docs/Web',
        category: 'javascript',
      },
      {
        title: '网道',
        content: 'JavaScript 语言入门教程',
        src: './img/wangdao.png',
        linkHref: 'https://wangdoc.com/javascript/',
        category: 'javascript',
      },
      {
        title: '现代 JavaScript 教程',
        content: '从基础到高阶的 JavaScript 相关知识',
        src: './img/jsinfo.png',
        linkHref: 'https://zh.javascript.info/',
        category: 'javascript',
      },
      {
        title: '学习 ES2015',
        content: 'ES6 新特性',
        src: './img/babeles6+.png',
        linkHref: 'https://babeljs.io/docs/en/learn#destructuring',
        category: 'javascript',
      },
      {
        title: 'ECMAScript 6 入门',
        content: '阮一峰老师的开源教程',
        src: './img/javascript.png',
        linkHref: 'http://es6.ruanyifeng.com/',
        category: 'javascript',
      },
      {
        title: '你不知道的 js 系列丛书',
        content: 'getify 开源项目',
        src: './img/github.png',
        linkHref: 'https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN',
        category: 'javascript',
      },
      {
        title: '前端开发者手册',
        content: 'By Frontend Masters',
        src: './img/frontmaster.png',
        linkHref: 'https://frontendmasters.com/books/front-end-handbook/2019/',
        category: 'javascript',
      },
      {
        title: '在线照片编辑器',
        content: '具备滤镜, 覆盖, 模糊, 剪裁等功能，可快速处理照片。',
        src: './img/file-app.png',
        linkHref: 'https://pixlr.com/',
        category: 'tool',
      },
      {
        title: 'SVGOMG',
        content: 'svg 文件优化在线应用',
        src: './img/file-app.png',
        linkHref: 'https://jakearchibald.github.io/svgomg/',
        category: 'tool',
      },
      {
        title: 'WebGradients',
        content: '180 个颜色线性渐变样式, 可方便复制 CSS 代码。',
        src: './img/file-app.png',
        linkHref: 'https://webgradients.com/',
        category: 'tool',
      },
      {
        title: 'uigradients',
        content: '为设计师和开发人员精心挑选的美丽色彩渐变系列',
        src: './img/file-app.png',
        linkHref: 'https://uigradients.com/',
        category: 'tool',
      },
      {
        title: '贝塞尔曲线',
        content: '可自定义贝塞尔曲线值的图形界面应用',
        src: './img/file-app.png',
        linkHref: 'https://cubic-bezier.com/',
        category: 'tool',
      },
      {
        title: 'Easing functions',
        content: '贝塞尔曲线库',
        src: './img/file-app.png',
        linkHref: 'https://easings.net/',
        category: 'tool',
      },
      {
        title: 'Web 工具',
        content: '学习 HTML-CSS- JS 的在线工具集合',
        src: './img/file-app.png',
        linkHref: 'https://html-css-js.com/',
        category: 'tool',
      },
      {
        title: '正则表达式',
        content: '在线学习正则表达式工具',
        src: './img/file-app.png',
        linkHref: 'https://regex101.com/',
        category: 'tool',
      },
      {
        title: 'Modular Scale',
        content: '字体比例尺',
        src: './img/file-app.png',
        linkHref: 'https://www.modularscale.com/',
        category: 'tool',
      },
      {
        title: 'Lorem Picsum',
        content: '各种尺寸图片自动生成器，图片来自于 Unsplash',
        src: './img/file-app.png',
        linkHref: 'https://picsum.photos/',
        category: 'tool',
      },
      {
        title: '图片生成器',
        content: '可选尺寸的占位符图片生成器',
        src: './img/file-app.png',
        linkHref: 'https://dummyimage.com/',
        category: 'tool',
      },
      {
        title: 'W3Schools How To',
        content: '学习编写 UI 组件',
        src: './img/file-app.png',
        linkHref: 'https://www.w3schools.com/howto/default.asp',
        category: 'tool',
      },
      {
        title: 'Pexels',
        content: '免费, 支持多种尺寸下载',
        src: './img/pexels.png',
        linkHref: 'https://coverr.co/',
        category: 'photo',
      },
      {
        title: 'Unsplash',
        content: '免费, 好用',
        src: './img/unsplash.png',
        linkHref: 'https://unsplash.com/',
        category: 'photo',
      },
      {
        title: 'New Old Stock',
        content: '黑白历史照片',
        src: './img/newold.jpg',
        linkHref: 'https://nos.twnsnd.co/',
        category: 'photo',
      },
      {
        title: 'StreetWill',
        content: '街区照片',
        src: './img/streetwill.png',
        linkHref: 'http://streetwill.co/',
        category: 'photo',
      },
      {
        title: 'IconMoon',
        content: '管理图标应用, 支持多种格式下载',
        src: './img/iconapp.png',
        linkHref: 'https://icomoon.io/',
        category: 'icon',
      },
      {
        title: 'iconfont',
        content: '2100+ 免费图标, icon font & SVG',
        src: './img/icofont.png',
        linkHref: 'https://icofont.com/',
        category: 'icon',
      },
      {
        title: 'Font Awesome',
        content: '1553 免费图标, SVG & Social logos',
        src: './img/fontawesomw.png',
        linkHref: 'https://fontawesome.com/',
        category: 'icon',
      },
      {
        title: 'Awwwards',
        content: '炫酷的网页集合',
        src: './img/awards.png',
        linkHref: 'https://www.awwwards.com/',
        category: 'inspiration',
      },
      {
        title: 'inspiring online',
        content: '有创作力的在线应用集合',
        src: './img/file-app.png',
        linkHref: 'https://inspiring.online/',
        category: 'inspiration',
      },
      {
        title: 'HTML5 UP',
        content: '响应式网站模板集合',
        src: './img/h5telemplete.png',
        linkHref: 'https://html5up.net/',
        category: 'inspiration',
      },
      {
        title: 'Slides',
        content: 'CSS 组件',
        src: './img/file-app.png',
        linkHref: 'https://slides.com/wireframe?debug=2#forms',
        category: 'inspiration',
      },
      {
        title: 'A Single Div',
        content: 'CSS 图形集合',
        src: './img/file-app.png',
        linkHref: 'https://a.singlediv.com/',
        category: 'inspiration',
      },
      {
        title: 'TextExpander Blog',
        content: 'Tutorial blog',
        src: './img/file-app.png',
        linkHref: 'https://textexpander.com/blog/',
        category: 'blog',
      },
      {
        title: 'shopify blog',
        content: 'Tutorial blog，Newsletter',
        src: './img/file-app.png',
        linkHref: 'https://www.shopify.com/blog',
        category: 'blog',
      },
      {
        title: 'Momentum Blog',
        content: 'Tutorial blog',
        src: './img/file-app.png',
        linkHref: 'https://momentumdash.com/blog/',
        category: 'blog',
      },
      {
        title: 'Music for markers Blog',
        content: 'Tutorial blog',
        src: './img/file-app.png',
        linkHref: 'https://musicformakers.com/blog/',
        category: 'blog',
      },
      {
        title: 'Sanebox blog',
        content: 'Tutorial blog，Newsletter',
        src: './img/file-app.png',
        linkHref: 'https://blog.sanebox.com/',
        category: 'blog',
      },
      {
        title: 'Scott H. Young',
        content: '读书，写作 | Newsletter',
        src: './img/file-app.png',
        linkHref: 'https://www.scotthyoung.com/blog/',
        category: 'blog',
      },
      {
        title: 'linmi.cc',
        content: 'Notion 教程',
        src: './img/file-app.png',
        linkHref: 'https://linmi.cc/',
        category: 'blog',
      },
      {
        title: 'EngFluent',
        content: '学习英语系列教程',
        src: './img/file-app.png',
        linkHref: 'https://engfluent.com/blog/',
        category: 'blog',
      },
      {
        title: '栞的心灵角落',
        content: '读书博客',
        src: './img/file-app.png',
        linkHref: 'https://twinsyang.net/',
        category: 'blog',
      },
      {
        title: 'V2EX',
        content: 'v2ex',
        src: './img/file-app.png',
        linkHref: 'https://www.v2ex.com/',
        category: 'blog',
      },
      {
        title: '电鸭社区',
        content: '互联网工作者们的聚集地',
        src: './img/file-app.png',
        linkHref: 'https://eleduck.com/',
        category: 'blog',
      },
      {
        title: 'surplusvalue',
        content: '剩余价值',
        src: './img/file-app.png',
        linkHref: 'https://www.surplusvalue.club/',
        category: 'podcast',
      },
      {
        title: '中文独立播客',
        content: '发现与推荐高质量的中文独立播客',
        src: './img/file-app.png',
        linkHref: 'https://typlog.com/podlist/',
        category: 'podcast',
      },
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
            <p class="menu_item_content">${category}</p>
          </li>
        `;
      })
      .join('')

    document.querySelector(selector).innerHTML = items;
  };

  // Render section groups to document
  const renderSectionGroups = function(selector, categories) {
    if (!document.querySelector(selector)) return;
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

      // Render sections items on document
      categories.forEach(category => {          
        renderSectionItmes(category, settings.resources)
      })

      // Event
      document.querySelector('.top_bar_btn').addEventListener('click', toggleNav, false);
    },
  };

  // TODO
  // Create the destory methods of plugin
})();

render.init();