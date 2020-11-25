/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    document.querySelector('#content_wrapper').classList.toggle('hidden');
  }
  // Insert left navigation items into document
  const renderNavItems = function (selector, categories) {
    if(!document.querySelector) return;
    const items = categories
      .map((category) => {
        return `
          <li class="left_menu_item">
            <img class="menu_item_icon" src="/svg/example.svg"></img>
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQyxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsR0FBRztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGtCQUFrQjtBQUNqRTtBQUNBLDhDQUE4QyxhQUFhO0FBQzNEO0FBQ0EsMkNBQTJDLGVBQWU7QUFDMUQseUNBQXlDLGlCQUFpQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLCtCQUErQixHQUFHO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0M7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxjIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9tYWluLmpzXCIpO1xuIiwiY29uc3QgcmVuZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gIC8vXHJcbiAgLy8gVmFyaWFibGVzXHJcbiAgLy9cclxuXHJcbiAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICBuYXZJdGVtQ29udGFpbmVyOiAnLmxlZnRfbWVudV9pdGVtcycsXHJcbiAgICBzZWN0aW9uc0NvbnRhaW5lcjogJyNzZWN0aW9uX2dyb3VwcycsXHJcbiAgICByZXNvdXJjZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnSFRNTCBSZWZlcmVuY2UnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdNRE4gSFRNTCDlsZ7mgKflj4LogIMnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL21kbi5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50JyxcclxuICAgICAgICBjYXRlZ29yeTogJ0hUTUwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdIVE1MIEF0dHJpYnV0ZSBSZWZlcmVuY2UnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICd3M3NjaG9vbHMgSFRNTCDlsZ7mgKflj4LogIMnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL3czc2Nob29scy5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9hdHRyaWJ1dGVzLmFzcCcsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnZ2x5cGhzICjnrKblj7cpJyxcclxuICAgICAgICBjb250ZW50OiAnSFRNTCDnibnmrornrKblj7flkI3lrZflkozmlbDlrZfku6PnoIEnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL21kbi5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9odG1sL2dseXBocy8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0hUTUwmQ1NTIFR1dG9yaWFsJyxcclxuICAgICAgICBjb250ZW50OiAnSFRNTCBDU1MgU2FzcyDln7rnoYDmlZnnqIsnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL21hcmtzaGVldC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9tYXJrc2hlZXQuaW8vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ0hUTUwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdDU1MgUmVmZXJlbmNlJyxcclxuICAgICAgICBjb250ZW50OiAnTUROIENTUyDlj4LogIMnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL21kbi5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL1JlZmVyZW5jZScsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnQ1NTIFJlZmVyZW5jZScsXHJcbiAgICAgICAgY29udGVudDogJ+WPl+asoui/juWxnuaAp+ivtOaYjiwg6ZmE5pyJ55Sf5Yqo55qE5L6L5a2QJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9jc3Npby5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jc3NyZWZlcmVuY2UuaW8vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ0hUTUwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdDU1MgUmVmZXJlbmNlJyxcclxuICAgICAgICBjb250ZW50OiAn5bm/5rOb55qEIENTUyDlsZ7mgKflj4LogIPmlofnq6AnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2NvZHJvcHMucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3NzcmVmZXJlbmNlLmlvLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5L2g5b+F6aG76KaB6K6w5L2P55qEIDMwIOS4qumAieaLqeWZqCcsXHJcbiAgICAgICAgY29udGVudDogJ+aWh+eroCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvdHV0c3BsdXMucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3NzcmVmZXJlbmNlLmlvLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnQWJzb2x1dGUgQ2VudGVyaW5nJyxcclxuICAgICAgICBjb250ZW50OiAn5L2/55So57ud5a+55a6a5L2N5a6e546w5bGF5Lit5biD5bGAJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9jb2RlcGVuLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2NvZGVwZW4uaW8vc2hzaGF3L2Z1bGwvZ0VpRHQnLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0EgQ29tcGxldGUgR3VpZGUgdG8gRmxleGJveCcsXHJcbiAgICAgICAgY29udGVudDogJ0ZsZXhib3gg5a6M5pW05oyH5Y2XJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9jc3N0cmlja3MucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL2EtZ3VpZGUtdG8tZmxleGJveC8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0EgQ29tcGxldGUgR3VpZGUgdG8gR3JpZCcsXHJcbiAgICAgICAgY29udGVudDogJ0dyaWQg5a6M5pW05oyH5Y2X572R5qC85biD5bGAJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9jc3N0cmlja3MucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL2NvbXBsZXRlLWd1aWRlLWdyaWQvJyxcclxuICAgICAgICBjYXRlZ29yeTogJ0hUTUwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdUaGUgU2hhcGVzIG9mIENTUycsXHJcbiAgICAgICAgY29udGVudDogJ0NTUyDlvaLnirYnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2Nzc3RyaWNrcy5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS90aGUtc2hhcGVzLW9mLWNzcy8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+S4uuS7gOS5iOS6uuS7rOiuqOWOjCBDU1MnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfmlofnq6AnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2Nzc2hhdGUucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vYXVsY3BlZGVyc29uLmNvbS9hcnRpY2xlcy9jc3MtZm9yLXBlb3BsZS13aG8taGF0ZS1jc3MvJyxcclxuICAgICAgICBjYXRlZ29yeTogJ0hUTUwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdUaGlzIGlzIFJlc3BvbnNpdmUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfmlLbpm4bliJvpgKDlk43lupTlvI/nvZHnq5nnmoTmqKHlnZflkozotYTmupAnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2JyYWRmcm9zdC5naXRodWIuaW8vdGhpcy1pcy1yZXNwb25zaXZlLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5L2g6ZyA6KaB55+l6YGT55qEIENTUyDmioDlt6cnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdDU1Mg5oqA5benJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy80My10cmlja3MucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vbGhhbW1lci5jbi9Zb3UtbmVlZC10by1rbm93LWNzcy8jLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnY3NzIOagt+W8j+inhOiMg+aMh+WNlycsXHJcbiAgICAgICAgY29udGVudDogJ+ivpue7hueahCBDU1Mg6KeE6IyD5oyH5Y2XJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9jc3NndWlkZWxpbi5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jc3NndWlkZWxpbi5lcy8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ2NzcyDmoLflvI/op4TojIPmjIfljZcnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfluLjop4TnmoTop4TojIPmjIfljZcnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2NvZGVndWlkZS5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jb2RlZ3VpZGUuY28vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ0hUTUwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdXZWIgVGVjaG5vbG9neScsXHJcbiAgICAgICAgY29udGVudDogJ+S4gOS4quWJjeerr+WtpuS5oOi3r+W+hCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvbWRuLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYicsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdqYXZhc2NyaXB0JyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn572R6YGTJyxcclxuICAgICAgICBjb250ZW50OiAnSmF2YVNjcmlwdCDor63oqIDlhaXpl6jmlZnnqIsnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL3dhbmdkYW8ucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vd2FuZ2RvYy5jb20vamF2YXNjcmlwdC8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnamF2YXNjcmlwdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+eOsOS7oyBKYXZhU2NyaXB0IOaVmeeoiycsXHJcbiAgICAgICAgY29udGVudDogJ+S7juWfuuehgOWIsOmrmOmYtueahCBKYXZhU2NyaXB0IOebuOWFs+efpeivhicsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvanNpbmZvLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3poLmphdmFzY3JpcHQuaW5mby8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnamF2YXNjcmlwdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+WtpuS5oCBFUzIwMTUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdFUzYg5paw54m55oCnJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9iYWJlbGVzNisucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vYmFiZWxqcy5pby9kb2NzL2VuL2xlYXJuI2Rlc3RydWN0dXJpbmcnLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnamF2YXNjcmlwdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0VDTUFTY3JpcHQgNiDlhaXpl6gnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfpmK7kuIDls7DogIHluIjnmoTlvIDmupDmlZnnqIsnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2phdmFzY3JpcHQucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHA6Ly9lczYucnVhbnlpZmVuZy5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2phdmFzY3JpcHQnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfkvaDkuI3nn6XpgZPnmoQganMg57O75YiX5Lib5LmmJyxcclxuICAgICAgICBjb250ZW50OiAnZ2V0aWZ5IOW8gOa6kOmhueebricsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZ2l0aHViLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2dpdGh1Yi5jb20vZ2V0aWZ5L1lvdS1Eb250LUtub3ctSlMvdHJlZS8xZWQtemgtQ04nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnamF2YXNjcmlwdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+WJjeerr+W8gOWPkeiAheaJi+WGjCcsXHJcbiAgICAgICAgY29udGVudDogJ0J5IEZyb250ZW5kIE1hc3RlcnMnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2Zyb250bWFzdGVyLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2Zyb250ZW5kbWFzdGVycy5jb20vYm9va3MvZnJvbnQtZW5kLWhhbmRib29rLzIwMTkvJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2phdmFzY3JpcHQnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICflnKjnur/nhafniYfnvJbovpHlmagnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICflhbflpIfmu6TplZwsIOimhuebliwg5qih57OKLCDliaroo4HnrYnlip/og73vvIzlj6/lv6vpgJ/lpITnkIbnhafniYfjgIInLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3BpeGxyLmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAndG9vbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ1NWR09NRycsXHJcbiAgICAgICAgY29udGVudDogJ3N2ZyDmlofku7bkvJjljJblnKjnur/lupTnlKgnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2pha2VhcmNoaWJhbGQuZ2l0aHViLmlvL3N2Z29tZy8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAndG9vbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ1dlYkdyYWRpZW50cycsXHJcbiAgICAgICAgY29udGVudDogJzE4MCDkuKrpopzoibLnur/mgKfmuJDlj5jmoLflvI8sIOWPr+aWueS+v+WkjeWItiBDU1Mg5Luj56CB44CCJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly93ZWJncmFkaWVudHMuY29tLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICd0b29sJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAndWlncmFkaWVudHMnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfkuLrorr7orqHluIjlkozlvIDlj5HkurrlkZjnsr7lv4PmjJHpgInnmoTnvo7kuL3oibLlvanmuJDlj5jns7vliJcnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3VpZ3JhZGllbnRzLmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAndG9vbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+i0neWhnuWwlOabsue6vycsXHJcbiAgICAgICAgY29udGVudDogJ+WPr+iHquWumuS5iei0neWhnuWwlOabsue6v+WAvOeahOWbvuW9oueVjOmdouW6lOeUqCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3ViaWMtYmV6aWVyLmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAndG9vbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0Vhc2luZyBmdW5jdGlvbnMnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfotJ3loZ7lsJTmm7Lnur/lupMnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2Vhc2luZ3MubmV0LycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICd0b29sJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnV2ViIOW3peWFtycsXHJcbiAgICAgICAgY29udGVudDogJ+WtpuS5oCBIVE1MLUNTUy0gSlMg55qE5Zyo57q/5bel5YW36ZuG5ZCIJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9odG1sLWNzcy1qcy5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ3Rvb2wnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICfmraPliJnooajovr7lvI8nLFxyXG4gICAgICAgIGNvbnRlbnQ6ICflnKjnur/lrabkuaDmraPliJnooajovr7lvI/lt6XlhbcnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3JlZ2V4MTAxLmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAndG9vbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ01vZHVsYXIgU2NhbGUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICflrZfkvZPmr5TkvovlsLonLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3d3dy5tb2R1bGFyc2NhbGUuY29tLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICd0b29sJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnTG9yZW0gUGljc3VtJyxcclxuICAgICAgICBjb250ZW50OiAn5ZCE56eN5bC65a+45Zu+54mH6Ieq5Yqo55Sf5oiQ5Zmo77yM5Zu+54mH5p2l6Ieq5LqOIFVuc3BsYXNoJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICd0b29sJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5Zu+54mH55Sf5oiQ5ZmoJyxcclxuICAgICAgICBjb250ZW50OiAn5Y+v6YCJ5bC65a+455qE5Y2g5L2N56ym5Zu+54mH55Sf5oiQ5ZmoJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9kdW1teWltYWdlLmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAndG9vbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ1czU2Nob29scyBIb3cgVG8nLFxyXG4gICAgICAgIGNvbnRlbnQ6ICflrabkuaDnvJblhpkgVUkg57uE5Lu2JyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9ob3d0by9kZWZhdWx0LmFzcCcsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICd0b29sJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnUGV4ZWxzJyxcclxuICAgICAgICBjb250ZW50OiAn5YWN6LS5LCDmlK/mjIHlpJrnp43lsLrlr7jkuIvovb0nLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL3BleGVscy5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jb3ZlcnIuY28vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ3Bob3RvJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnVW5zcGxhc2gnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICflhY3otLksIOWlveeUqCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvdW5zcGxhc2gucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vdW5zcGxhc2guY29tLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdwaG90bycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ05ldyBPbGQgU3RvY2snLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfpu5Hnmb3ljoblj7LnhafniYcnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL25ld29sZC5qcGcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9ub3MudHduc25kLmNvLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdwaG90bycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ1N0cmVldFdpbGwnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfooZfljLrnhafniYcnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL3N0cmVldHdpbGwucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHA6Ly9zdHJlZXR3aWxsLmNvLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdwaG90bycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0ljb25Nb29uJyxcclxuICAgICAgICBjb250ZW50OiAn566h55CG5Zu+5qCH5bqU55SoLCDmlK/mjIHlpJrnp43moLzlvI/kuIvovb0nLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ljb25hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vaWNvbW9vbi5pby8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnaWNvbicsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ2ljb25mb250JyxcclxuICAgICAgICBjb250ZW50OiAnMjEwMCsg5YWN6LS55Zu+5qCHLCBpY29uIGZvbnQgJiBTVkcnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ljb2ZvbnQucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vaWNvZm9udC5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2ljb24nLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdGb250IEF3ZXNvbWUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICcxNTUzIOWFjei0ueWbvuaghywgU1ZHICYgU29jaWFsIGxvZ29zJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9mb250YXdlc29tdy5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9mb250YXdlc29tZS5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2ljb24nLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdBd3d3YXJkcycsXHJcbiAgICAgICAgY29udGVudDogJ+eCq+mFt+eahOe9kemhtembhuWQiCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvYXdhcmRzLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3d3dy5hd3d3YXJkcy5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2luc3BpcmF0aW9uJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnaW5zcGlyaW5nIG9ubGluZScsXHJcbiAgICAgICAgY29udGVudDogJ+acieWIm+S9nOWKm+eahOWcqOe6v+W6lOeUqOmbhuWQiCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vaW5zcGlyaW5nLm9ubGluZS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnaW5zcGlyYXRpb24nLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdIVE1MNSBVUCcsXHJcbiAgICAgICAgY29udGVudDogJ+WTjeW6lOW8j+e9keermeaooeadv+mbhuWQiCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvaDV0ZWxlbXBsZXRlLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL2h0bWw1dXAubmV0LycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdpbnNwaXJhdGlvbicsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ1NsaWRlcycsXHJcbiAgICAgICAgY29udGVudDogJ0NTUyDnu4Tku7YnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3NsaWRlcy5jb20vd2lyZWZyYW1lP2RlYnVnPTIjZm9ybXMnLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnaW5zcGlyYXRpb24nLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdBIFNpbmdsZSBEaXYnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdDU1Mg5Zu+5b2i6ZuG5ZCIJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9hLnNpbmdsZWRpdi5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2luc3BpcmF0aW9uJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnVGV4dEV4cGFuZGVyIEJsb2cnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdUdXRvcmlhbCBibG9nJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly90ZXh0ZXhwYW5kZXIuY29tL2Jsb2cvJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2Jsb2cnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdzaG9waWZ5IGJsb2cnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdUdXRvcmlhbCBibG9n77yMTmV3c2xldHRlcicsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vd3d3LnNob3BpZnkuY29tL2Jsb2cnLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnYmxvZycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ01vbWVudHVtIEJsb2cnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdUdXRvcmlhbCBibG9nJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9tb21lbnR1bWRhc2guY29tL2Jsb2cvJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2Jsb2cnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdNdXNpYyBmb3IgbWFya2VycyBCbG9nJyxcclxuICAgICAgICBjb250ZW50OiAnVHV0b3JpYWwgYmxvZycsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vbXVzaWNmb3JtYWtlcnMuY29tL2Jsb2cvJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2Jsb2cnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdTYW5lYm94IGJsb2cnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdUdXRvcmlhbCBibG9n77yMTmV3c2xldHRlcicsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vYmxvZy5zYW5lYm94LmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnYmxvZycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ1Njb3R0IEguIFlvdW5nJyxcclxuICAgICAgICBjb250ZW50OiAn6K+75Lmm77yM5YaZ5L2cIHwgTmV3c2xldHRlcicsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vd3d3LnNjb3R0aHlvdW5nLmNvbS9ibG9nLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdibG9nJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnbGlubWkuY2MnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdOb3Rpb24g5pWZ56iLJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9saW5taS5jYy8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnYmxvZycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0VuZ0ZsdWVudCcsXHJcbiAgICAgICAgY29udGVudDogJ+WtpuS5oOiLseivreezu+WIl+aVmeeoiycsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vZW5nZmx1ZW50LmNvbS9ibG9nLycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdibG9nJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5qCe55qE5b+D54G16KeS6JC9JyxcclxuICAgICAgICBjb250ZW50OiAn6K+75Lmm5Y2a5a6iJyxcclxuICAgICAgICBzcmM6ICcuL2ltZy9maWxlLWFwcC5wbmcnLFxyXG4gICAgICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly90d2luc3lhbmcubmV0LycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdibG9nJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAnVjJFWCcsXHJcbiAgICAgICAgY29udGVudDogJ3YyZXgnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3d3dy52MmV4LmNvbS8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnYmxvZycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+eUtem4reekvuWMuicsXHJcbiAgICAgICAgY29udGVudDogJ+S6kuiBlOe9keW3peS9nOiAheS7rOeahOiBmumbhuWcsCcsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vZWxlZHVjay5jb20vJyxcclxuICAgICAgICBjYXRlZ29yeTogJ2Jsb2cnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdzdXJwbHVzdmFsdWUnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfliankvZnku7flgLwnLFxyXG4gICAgICAgIHNyYzogJy4vaW1nL2ZpbGUtYXBwLnBuZycsXHJcbiAgICAgICAgbGlua0hyZWY6ICdodHRwczovL3d3dy5zdXJwbHVzdmFsdWUuY2x1Yi8nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAncG9kY2FzdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+S4reaWh+eLrOeri+aSreWuoicsXHJcbiAgICAgICAgY29udGVudDogJ+WPkeeOsOS4juaOqOiNkOmrmOi0qOmHj+eahOS4reaWh+eLrOeri+aSreWuoicsXHJcbiAgICAgICAgc3JjOiAnLi9pbWcvZmlsZS1hcHAucG5nJyxcclxuICAgICAgICBsaW5rSHJlZjogJ2h0dHBzOi8vdHlwbG9nLmNvbS9wb2RsaXN0LycsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICdwb2RjYXN0JyxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIC8vXHJcbiAgLy8gTWV0aG9kc1xyXG4gIC8vXHJcblxyXG4gIC8vIFJlbW92ZSBkdXBsaWNhdGUgdmFsdWVzIGZyb20gYW4gYXJyYXlcclxuICBjb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIHJldHVybiBhcnIuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0b2dnbGVOYXYgPSBmdW5jdGlvbigpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50X3dyYXBwZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgLy8gSW5zZXJ0IGxlZnQgbmF2aWdhdGlvbiBpdGVtcyBpbnRvIGRvY3VtZW50XHJcbiAgY29uc3QgcmVuZGVyTmF2SXRlbXMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNhdGVnb3JpZXMpIHtcclxuICAgIGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSByZXR1cm47XHJcbiAgICBjb25zdCBpdGVtcyA9IGNhdGVnb3JpZXNcclxuICAgICAgLm1hcCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwibGVmdF9tZW51X2l0ZW1cIj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1lbnVfaXRlbV9pY29uXCIgc3JjPVwiL3N2Zy9leGFtcGxlLnN2Z1wiPjwvaW1nPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIm1lbnVfaXRlbV9jb250ZW50XCI+JHtjYXRlZ29yeX08L3A+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIGA7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKCcnKVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmlubmVySFRNTCA9IGl0ZW1zO1xyXG4gIH07XHJcblxyXG4gIC8vIFJlbmRlciBzZWN0aW9uIGdyb3VwcyB0byBkb2N1bWVudFxyXG4gIGNvbnN0IHJlbmRlclNlY3Rpb25Hcm91cHMgPSBmdW5jdGlvbihzZWxlY3RvciwgY2F0ZWdvcmllcykge1xyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkgcmV0dXJuO1xyXG4gICAgLy8gR2V0IHNlY3Rpb24gaXRlbXNcclxuICAgIGNvbnN0IGdyb3VwcyA9IGNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiJHtjYXRlZ29yeX1cIiBjbGFzcz1cImdyb3VwXCIgPlxyXG4gICAgICAgICAgPGgzIGNsYXNzPVwiZ3JvdXBfdGl0bGVcIj4ke2NhdGVnb3J5fTwvaDM+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBfY29udGVudFwiPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJyb3cgZ3JvdXBfaXRlbXNcIj48L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPiAgXHJcbiAgICAgIGA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5pbm5lckhUTUwgPSBncm91cHMuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgc2VjdGlvbiBpdGVtc1xyXG4gIGNvbnN0IHJlbmRlclNlY3Rpb25JdG1lcyA9IGZ1bmN0aW9uKGlkLCByZXNvdXJjZXMpIHtcclxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9IC5ncm91cF9pdGVtc2ApKSByZXR1cm47XHJcbiAgICBjb25zdCBtYWtldXAgPSByZXNvdXJjZXNcclxuICAgICAgLmZpbHRlcihyZXNvdXJjZSA9PiByZXNvdXJjZS5jYXRlZ29yeS50cmltKCkgPT09IGlkKVxyXG4gICAgICAubWFwKHJlc291cmNlID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwiZ3JvdXBfaXRlbSBjb2wzXCI+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCIgaHJlZj1cIiR7cmVzb3VyY2UubGlua0hyZWZ9XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkX2ljb25cIiBzcmM9XCIke3Jlc291cmNlLnNyY31cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX2JvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF90aXRsZVwiPiR7cmVzb3VyY2UudGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHRcIj4ke3Jlc291cmNlLmNvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oJycpXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9IC5ncm91cF9pdGVtc2ApLmlubmVySFRNTCA9IG1ha2V1cDtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gSW5pdHMgJiBFdmVudHNcclxuICAvL1xyXG5cclxuICAvLyBQdWJsaWMgTWV0aG9kcyBBUElzXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAvLyBNZXJnZSBib3RoIHVzZXIgZGVmYXVsdHMgYW5kIG9wdGlvbnMuXHJcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgLy8gR2V0IGFsbCBjYXRlZ29yaWVzIG9mIHJlc291cmNlc1xyXG4gICAgICBjb25zdCBjYXRlZ29yaWVzID0gdW5pcXVlQXJyYXkoc2V0dGluZ3MucmVzb3VyY2VzLm1hcChcclxuICAgICAgICAocmVzb3VyY2UpID0+IHJlc291cmNlLmNhdGVnb3J5XHJcbiAgICAgICkpO1xyXG5cclxuICAgICAgcmVuZGVyTmF2SXRlbXMoc2V0dGluZ3MubmF2SXRlbUNvbnRhaW5lciwgY2F0ZWdvcmllcyk7XHJcbiAgICAgIHJlbmRlclNlY3Rpb25Hcm91cHMoc2V0dGluZ3Muc2VjdGlvbnNDb250YWluZXIsIGNhdGVnb3JpZXMpO1xyXG5cclxuICAgICAgLy8gUmVuZGVyIHNlY3Rpb25zIGl0ZW1zIG9uIGRvY3VtZW50XHJcbiAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7ICAgICAgICAgIFxyXG4gICAgICAgIHJlbmRlclNlY3Rpb25JdG1lcyhjYXRlZ29yeSwgc2V0dGluZ3MucmVzb3VyY2VzKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gRXZlbnRcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcF9iYXJfYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVOYXYsIGZhbHNlKTtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy8gVE9ET1xyXG4gIC8vIENyZWF0ZSB0aGUgZGVzdG9yeSBtZXRob2RzIG9mIHBsdWdpblxyXG59KSgpO1xyXG5cclxucmVuZGVyLmluaXQoKTsiXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMjFoYVc0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMREpEUVVFeVF5eFRRVUZUTzBGQlEzQkVPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVFrRkJkVUlzVTBGQlV6dEJRVU5vUXl4dlEwRkJiME1zVTBGQlV6dEJRVU0zUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeHZRMEZCYjBNc1IwRkJSenRCUVVOMlF6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc0swTkJRU3RETEd0Q1FVRnJRanRCUVVOcVJUdEJRVU5CTERoRFFVRTRReXhoUVVGaE8wRkJRek5FTzBGQlEwRXNNa05CUVRKRExHVkJRV1U3UVVGRE1VUXNlVU5CUVhsRExHbENRVUZwUWp0QlFVTXhSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPenRCUVVWQkxDdENRVUVyUWl4SFFVRkhPMEZCUTJ4RE96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNkVU5CUVhWRE96dEJRVVYyUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2MwTTdRVUZEUVR0QlFVTkJMRTlCUVU4N08wRkJSVkE3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVERzN1FVRkZRVHRCUVVOQk8wRkJRMEVzUTBGQlF6czdRVUZGUkN4aklpd2labWxzWlNJNklqQm1NVE00TmpVMlptWXpOVGcyWkdFek1qRmhMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwSUh0Y2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmlCY2RGeDBmVnh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBhVG9nYlc5a2RXeGxTV1FzWEc0Z1hIUmNkRngwYkRvZ1ptRnNjMlVzWEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMxY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaR1ZtYVc1bElHZGxkSFJsY2lCbWRXNWpkR2x2YmlCbWIzSWdhR0Z5Ylc5dWVTQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SekxDQnVZVzFsTENCblpYUjBaWElwSUh0Y2JpQmNkRngwYVdZb0lWOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieWhsZUhCdmNuUnpMQ0J1WVcxbEtTa2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCdVlXMWxMQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUdkbGREb2daMlYwZEdWeUlIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1gxOWxjMDF2WkhWc1pTQnZiaUJsZUhCdmNuUnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuSWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpLU0I3WEc0Z1hIUmNkR2xtS0hSNWNHVnZaaUJUZVcxaWIyd2dJVDA5SUNkMWJtUmxabWx1WldRbklDWW1JRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeWtnZTF4dUlGeDBYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY3NJSHNnZG1Gc2RXVTZJQ2ROYjJSMWJHVW5JSDBwTzF4dUlGeDBYSFI5WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENBblgxOWxjMDF2WkhWc1pTY3NJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmpjbVZoZEdVZ1lTQm1ZV3RsSUc1aGJXVnpjR0ZqWlNCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQXhPaUIyWVd4MVpTQnBjeUJoSUcxdlpIVnNaU0JwWkN3Z2NtVnhkV2x5WlNCcGRGeHVJRngwTHk4Z2JXOWtaU0FtSURJNklHMWxjbWRsSUdGc2JDQndjbTl3WlhKMGFXVnpJRzltSUhaaGJIVmxJR2x1ZEc4Z2RHaGxJRzV6WEc0Z1hIUXZMeUJ0YjJSbElDWWdORG9nY21WMGRYSnVJSFpoYkhWbElIZG9aVzRnWVd4eVpXRmtlU0J1Y3lCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQTRmREU2SUdKbGFHRjJaU0JzYVd0bElISmxjWFZwY21WY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1ZENBOUlHWjFibU4wYVc5dUtIWmhiSFZsTENCdGIyUmxLU0I3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUF4S1NCMllXeDFaU0E5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2RtRnNkV1VwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnT0NrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUnBaaWdvYlc5a1pTQW1JRFFwSUNZbUlIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkbUZzZFdVZ0ppWWdkbUZzZFdVdVgxOWxjMDF2WkhWc1pTa2djbVYwZFhKdUlIWmhiSFZsTzF4dUlGeDBYSFIyWVhJZ2JuTWdQU0JQWW1wbFkzUXVZM0psWVhSbEtHNTFiR3dwTzF4dUlGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5Jb2JuTXBPMXh1SUZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvYm5Nc0lDZGtaV1poZFd4MEp5d2dleUJsYm5WdFpYSmhZbXhsT2lCMGNuVmxMQ0IyWVd4MVpUb2dkbUZzZFdVZ2ZTazdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXlJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQWhQU0FuYzNSeWFXNW5KeWtnWm05eUtIWmhjaUJyWlhrZ2FXNGdkbUZzZFdVcElGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2h1Y3l3Z2EyVjVMQ0JtZFc1amRHbHZiaWhyWlhrcElIc2djbVYwZFhKdUlIWmhiSFZsVzJ0bGVWMDdJSDB1WW1sdVpDaHVkV3hzTENCclpYa3BLVHRjYmlCY2RGeDBjbVYwZFhKdUlHNXpPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdaMlYwUkdWbVlYVnNkRVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm1iM0lnWTI5dGNHRjBhV0pwYkdsMGVTQjNhWFJvSUc1dmJpMW9ZWEp0YjI1NUlHMXZaSFZzWlhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YmlBOUlHWjFibU4wYVc5dUtHMXZaSFZzWlNrZ2UxeHVJRngwWEhSMllYSWdaMlYwZEdWeUlEMGdiVzlrZFd4bElDWW1JRzF2WkhWc1pTNWZYMlZ6VFc5a2RXeGxJRDljYmlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSRVpXWmhkV3gwS0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsV3lka1pXWmhkV3gwSjEwN0lIMGdPbHh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEUxdlpIVnNaVVY0Y0c5eWRITW9LU0I3SUhKbGRIVnliaUJ0YjJSMWJHVTdJSDA3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNoblpYUjBaWElzSUNkaEp5d2daMlYwZEdWeUtUdGNiaUJjZEZ4MGNtVjBkWEp1SUdkbGRIUmxjanRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiRnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZJRDBnWm5WdVkzUnBiMjRvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2tnZXlCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFtVmpkQ3dnY0hKdmNHVnlkSGtwT3lCOU8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dVhHNGdYSFF2THlCTWIyRmtJR1Z1ZEhKNUlHMXZaSFZzWlNCaGJtUWdjbVYwZFhKdUlHVjRjRzl5ZEhOY2JpQmNkSEpsZEhWeWJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y3lBOUlGd2lMaTl6Y21NdmFuTXZiV0ZwYmk1cWMxd2lLVHRjYmlJc0ltTnZibk4wSUhKbGJtUmxjaUE5SUNobWRXNWpkR2x2YmlncElIdGNjbHh1SUNBdkwxeHlYRzRnSUM4dklGWmhjbWxoWW14bGMxeHlYRzRnSUM4dlhISmNibHh5WEc0Z0lHTnZibk4wSUdSbFptRjFiSFJ6SUQwZ2UxeHlYRzRnSUNBZ2JtRjJTWFJsYlVOdmJuUmhhVzVsY2pvZ0p5NXNaV1owWDIxbGJuVmZhWFJsYlhNbkxGeHlYRzRnSUNBZ2MyVmpkR2x2Ym5ORGIyNTBZV2x1WlhJNklDY2pjMlZqZEdsdmJsOW5jbTkxY0hNbkxGeHlYRzRnSUNBZ2NtVnpiM1Z5WTJWek9pQmJYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjBoVVRVd2dVbVZtWlhKbGJtTmxKeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBblRVUk9JRWhVVFV3ZzViR2U1b0NuNVkrQzZJQ0RKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OXRaRzR1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBoVVRVd3ZSV3hsYldWdWRDY3NYSEpjYmlBZ0lDQWdJQ0FnWTJGMFpXZHZjbms2SUNkSVZFMU1KeXhjY2x4dUlDQWdJQ0FnZlN4Y2NseHVJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJSFJwZEd4bE9pQW5TRlJOVENCQmRIUnlhV0oxZEdVZ1VtVm1aWEpsYm1ObEp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuZHpOelkyaHZiMnh6SUVoVVRVd2c1YkdlNW9DbjVZK0M2SUNESnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTkzTTNOamFHOXZiSE11Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2ZDNkM0xuY3pjMk5vYjI5c2N5NWpiMjB2ZEdGbmN5OXlaV1pmWVhSMGNtbGlkWFJsY3k1aGMzQW5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBblNGUk5UQ2NzWEhKY2JpQWdJQ0FnSUgwc1hISmNiaUFnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0IwYVhSc1pUb2dKMmRzZVhCb2N5QW81NnltNVkrM0tTY3NYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSjBoVVRVd2c1NG01NXE2SzU2eW01WSszNVpDTjVhMlg1WktNNXBXdzVhMlg1THVqNTZDQkp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5dFpHNHVjRzVuSnl4Y2NseHVJQ0FnSUNBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZZM056TFhSeWFXTnJjeTVqYjIwdmMyNXBjSEJsZEhNdmFIUnRiQzluYkhsd2FITXZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0owaFVUVXduTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2RJVkUxTUprTlRVeUJVZFhSdmNtbGhiQ2NzWEhKY2JpQWdJQ0FnSUNBZ1kyOXVkR1Z1ZERvZ0owaFVUVXdnUTFOVElGTmhjM01nNVorNjU2R0E1cFdaNTZpTEp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5dFlYSnJjMmhsWlhRdWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dmJXRnlhM05vWldWMExtbHZMeWNzWEhKY2JpQWdJQ0FnSUNBZ1kyRjBaV2R2Y25rNklDZElWRTFNSnl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuUTFOVElGSmxabVZ5Wlc1alpTY3NYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSjAxRVRpQkRVMU1nNVkrQzZJQ0RKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OXRaRzR1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBOVFV5OVNaV1psY21WdVkyVW5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBblNGUk5UQ2NzWEhKY2JpQWdJQ0FnSUgwc1hISmNiaUFnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0IwYVhSc1pUb2dKME5UVXlCU1pXWmxjbVZ1WTJVbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2ZsajVmbXJLTG92NDdsc1o3bWdLZm9yN1RtbUk0c0lPbVpoT2FjaWVlVW4rV0txT2VhaE9TK2krV3RrQ2NzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZZM056YVc4dWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dlkzTnpjbVZtWlhKbGJtTmxMbWx2THljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RJVkUxTUp5eGNjbHh1SUNBZ0lDQWdmU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lIUnBkR3hsT2lBblExTlRJRkpsWm1WeVpXNWpaU2NzWEhKY2JpQWdJQ0FnSUNBZ1kyOXVkR1Z1ZERvZ0orVzV2K2F6bStlYWhDQkRVMU1nNWJHZTVvQ241WStDNklDRDVwYUg1NnVnSnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTlqYjJSeWIzQnpMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMMk56YzNKbFptVnlaVzVqWlM1cGJ5OG5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBblNGUk5UQ2NzWEhKY2JpQWdJQ0FnSUgwc1hISmNiaUFnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0IwYVhSc1pUb2dKK1M5b09XL2hlbWh1K2ltZ2VpdXNPUzlqK2VhaENBek1DRGt1S3JwZ0lubWk2bmxtYWduTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZm1sb2ZucTZBbkxGeHlYRzRnSUNBZ0lDQWdJSE55WXpvZ0p5NHZhVzFuTDNSMWRITndiSFZ6TG5CdVp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJOemMzSmxabVZ5Wlc1alpTNXBieThuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5TRlJOVENjc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjBGaWMyOXNkWFJsSUVObGJuUmxjbWx1Wnljc1hISmNiaUFnSUNBZ0lDQWdZMjl1ZEdWdWREb2dKK1M5ditlVXFPZTduZVd2dWVXdW11UzlqZVd1bnVlT3NPV3hoZVM0cmVXNGcrV3hnQ2NzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZZMjlrWlhCbGJpNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OWpiMlJsY0dWdUxtbHZMM05vYzJoaGR5OW1kV3hzTDJkRmFVUjBKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0owaFVUVXduTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2RCSUVOdmJYQnNaWFJsSUVkMWFXUmxJSFJ2SUVac1pYaGliM2duTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZEdiR1Y0WW05NElPV3VqT2FWdE9hTWgrV05seWNzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZZM056ZEhKcFkydHpMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMMk56Y3kxMGNtbGphM011WTI5dEwzTnVhWEJ3WlhSekwyTnpjeTloTFdkMWFXUmxMWFJ2TFdac1pYaGliM2d2Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKMGhVVFV3bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkQklFTnZiWEJzWlhSbElFZDFhV1JsSUhSdklFZHlhV1FuTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZEhjbWxrSU9XdWpPYVZ0T2FNaCtXTmwrZTlrZWFndk9XNGcrV3hnQ2NzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZZM056ZEhKcFkydHpMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMMk56Y3kxMGNtbGphM011WTI5dEwzTnVhWEJ3WlhSekwyTnpjeTlqYjIxd2JHVjBaUzFuZFdsa1pTMW5jbWxrTHljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RJVkUxTUp5eGNjbHh1SUNBZ0lDQWdmU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lIUnBkR3hsT2lBblZHaGxJRk5vWVhCbGN5QnZaaUJEVTFNbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2REVTFNZzViMmk1NHEySnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTlqYzNOMGNtbGphM011Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2WTNOekxYUnlhV05yY3k1amIyMHZkR2hsTFhOb1lYQmxjeTF2WmkxamMzTXZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0owaFVUVXduTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2ZrdUxya3U0RGt1WWprdXJya3U2em9ycWpsam93Z1ExTlRKeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBbjVwYUg1NnVnSnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTlqYzNOb1lYUmxMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMMkYxYkdOd1pXUmxjbk52Ymk1amIyMHZZWEowYVdOc1pYTXZZM056TFdadmNpMXdaVzl3YkdVdGQyaHZMV2hoZEdVdFkzTnpMeWNzWEhKY2JpQWdJQ0FnSUNBZ1kyRjBaV2R2Y25rNklDZElWRTFNSnl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuVkdocGN5QnBjeUJTWlhOd2IyNXphWFpsSnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW41cFMyNlp1RzVZaWI2WUNnNVpPTjVicVU1YnlQNTcyUjU2dVo1NXFFNXFpaDVaMlg1WktNNkxXRTVycVFKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OW1hV3hsTFdGd2NDNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OWljbUZrWm5KdmMzUXVaMmwwYUhWaUxtbHZMM1JvYVhNdGFYTXRjbVZ6Y0c5dWMybDJaUzhuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5TRlJOVENjc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSitTOW9PbWNnT2ltZ2VlZnBlbUJrK2VhaENCRFUxTWc1b3FBNWJlbkp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuUTFOVElPYUtnT1czcHljc1hISmNiaUFnSUNBZ0lDQWdjM0pqT2lBbkxpOXBiV2N2TkRNdGRISnBZMnR6TG5CdVp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJ4b1lXMXRaWEl1WTI0dldXOTFMVzVsWldRdGRHOHRhMjV2ZHkxamMzTXZJeThuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5TRlJOVENjc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjJOemN5RG1vTGZsdkkvb3A0VG9qSVBtaklmbGpaY25MRnh5WEc0Z0lDQWdJQ0FnSUdOdmJuUmxiblE2SUNmb3I2Ym51NGJubW9RZ1ExTlRJT2luaE9pTWcrYU1oK1dObHljc1hISmNiaUFnSUNBZ0lDQWdjM0pqT2lBbkxpOXBiV2N2WTNOelozVnBaR1ZzYVc0dWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dlkzTnpaM1ZwWkdWc2FXNHVaWE12Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKMGhVVFV3bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkamMzTWc1cUMzNWJ5UDZLZUU2SXlENW95SDVZMlhKeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBbjViaTQ2S2VFNTVxRTZLZUU2SXlENW95SDVZMlhKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OWpiMlJsWjNWcFpHVXVjRzVuSnl4Y2NseHVJQ0FnSUNBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZZMjlrWldkMWFXUmxMbU52THljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RJVkUxTUp5eGNjbHh1SUNBZ0lDQWdmU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lIUnBkR3hsT2lBblYyVmlJRlJsWTJodWIyeHZaM2tuTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZmt1SURrdUtybGlZM25xNi9scmFia3VhRG90Ni9sdm9RbkxGeHlYRzRnSUNBZ0lDQWdJSE55WXpvZ0p5NHZhVzFuTDIxa2JpNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSW5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBbmFtRjJZWE5qY21sd2RDY3NYSEpjYmlBZ0lDQWdJSDBzWEhKY2JpQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhWFJzWlRvZ0orZTlrZW1Ca3ljc1hISmNiaUFnSUNBZ0lDQWdZMjl1ZEdWdWREb2dKMHBoZG1GVFkzSnBjSFFnNksrdDZLaUE1WVdsNlplbzVwV1o1NmlMSnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTkzWVc1blpHRnZMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMM2RoYm1ka2IyTXVZMjl0TDJwaGRtRnpZM0pwY0hRdkp5eGNjbHh1SUNBZ0lDQWdJQ0JqWVhSbFoyOXllVG9nSjJwaGRtRnpZM0pwY0hRbkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNmbmpyRGt1Nk1nU21GMllWTmpjbWx3ZENEbWxabm5xSXNuTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZmt1NDdsbjdybm9ZRGxpTERwcTVqcG1MYm5tb1FnU21GMllWTmpjbWx3ZENEbm03amxoYlBubjZYb3I0WW5MRnh5WEc0Z0lDQWdJQ0FnSUhOeVl6b2dKeTR2YVcxbkwycHphVzVtYnk1d2JtY25MRnh5WEc0Z0lDQWdJQ0FnSUd4cGJtdEljbVZtT2lBbmFIUjBjSE02THk5NmFDNXFZWFpoYzJOeWFYQjBMbWx1Wm04dkp5eGNjbHh1SUNBZ0lDQWdJQ0JqWVhSbFoyOXllVG9nSjJwaGRtRnpZM0pwY0hRbkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNmbHJhYmt1YUFnUlZNeU1ERTFKeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBblJWTTJJT2FXc09lSnVlYUFweWNzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZZbUZpWld4bGN6WXJMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMMkpoWW1Wc2FuTXVhVzh2Wkc5amN5OWxiaTlzWldGeWJpTmtaWE4wY25WamRIVnlhVzVuSnl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKMnBoZG1GelkzSnBjSFFuTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2RGUTAxQlUyTnlhWEIwSURZZzVZV2w2WmVvSnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW42Wml1NUxpQTViT3c2SUNCNWJpSTU1cUU1YnlBNXJxUTVwV1o1NmlMSnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTlxWVhaaGMyTnlhWEIwTG5CdVp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndPaTh2WlhNMkxuSjFZVzU1YVdabGJtY3VZMjl0THljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RxWVhaaGMyTnlhWEIwSnl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuNUwyZzVMaU41NStsNllHVDU1cUVJR3B6SU9lenUrV0lsK1M0bStTNXBpY3NYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSjJkbGRHbG1lU0RsdklEbXVwRHBvYm5ubTY0bkxGeHlYRzRnSUNBZ0lDQWdJSE55WXpvZ0p5NHZhVzFuTDJkcGRHaDFZaTV3Ym1jbkxGeHlYRzRnSUNBZ0lDQWdJR3hwYm10SWNtVm1PaUFuYUhSMGNITTZMeTluYVhSb2RXSXVZMjl0TDJkbGRHbG1lUzlaYjNVdFJHOXVkQzFMYm05M0xVcFRMM1J5WldVdk1XVmtMWHBvTFVOT0p5eGNjbHh1SUNBZ0lDQWdJQ0JqWVhSbFoyOXllVG9nSjJwaGRtRnpZM0pwY0hRbkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNmbGlZM25xNi9sdklEbGo1SG9nSVhtaVl2bGhvd25MRnh5WEc0Z0lDQWdJQ0FnSUdOdmJuUmxiblE2SUNkQ2VTQkdjbTl1ZEdWdVpDQk5ZWE4wWlhKekp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5bWNtOXVkRzFoYzNSbGNpNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OW1jbTl1ZEdWdVpHMWhjM1JsY25NdVkyOXRMMkp2YjJ0ekwyWnliMjUwTFdWdVpDMW9ZVzVrWW05dmF5OHlNREU1THljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RxWVhaaGMyTnlhWEIwSnl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuNVp5bzU3cS81NFduNTRtSDU3eVc2TDZSNVptb0p5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuNVlXMzVhU0g1cnVrNlpXY0xDRG9wb2JubTVZc0lPYW9vZWV6aWl3ZzVZbXE2S09CNTYySjVZcWY2SU85Nzd5TTVZK3Y1YityNllDZjVhU0U1NUNHNTRXbjU0bUg0NENDSnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTltYVd4bExXRndjQzV3Ym1jbkxGeHlYRzRnSUNBZ0lDQWdJR3hwYm10SWNtVm1PaUFuYUhSMGNITTZMeTl3YVhoc2NpNWpiMjB2Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKM1J2YjJ3bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkVFZrZFBUVWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZHpkbWNnNXBhSDVMdTI1THlZNVl5VzVaeW81N3EvNWJxVTU1U29KeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OW1hV3hsTFdGd2NDNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OXFZV3RsWVhKamFHbGlZV3hrTG1kcGRHaDFZaTVwYnk5emRtZHZiV2N2Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKM1J2YjJ3bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkWFpXSkhjbUZrYVdWdWRITW5MRnh5WEc0Z0lDQWdJQ0FnSUdOdmJuUmxiblE2SUNjeE9EQWc1TGlxNmFLYzZJbXk1N3EvNW9DbjVyaVE1WStZNXFDMzVieVBMQ0RsajYvbWxybmt2ci9scEkzbGlMWWdRMU5USU9TN28rZWdnZU9BZ2ljc1hISmNiaUFnSUNBZ0lDQWdjM0pqT2lBbkxpOXBiV2N2Wm1sc1pTMWhjSEF1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2ZDJWaVozSmhaR2xsYm5SekxtTnZiUzhuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5kRzl2YkNjc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjNWcFozSmhaR2xsYm5Sekp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuNUxpNjZLNis2SzZoNWJpSTVaS001YnlBNVkrUjVMcTY1WkdZNTdLKzViK0Q1b3lSNllDSjU1cUU1NzZPNUxpOTZJbXk1YjJwNXJpUTVZK1k1N083NVlpWEp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5bWFXeGxMV0Z3Y0M1d2JtY25MRnh5WEc0Z0lDQWdJQ0FnSUd4cGJtdEljbVZtT2lBbmFIUjBjSE02THk5MWFXZHlZV1JwWlc1MGN5NWpiMjB2Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKM1J2YjJ3bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNmb3RKM2xvWjdsc0pUbW03TG51cjhuTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZmxqNi9vaDZybHJwcmt1WW5vdEozbG9aN2xzSlRtbTdMbnVyL2xnTHpubW9UbG03N2x2YUxubFl6cG5hTGx1cFRubEtnbkxGeHlYRzRnSUNBZ0lDQWdJSE55WXpvZ0p5NHZhVzFuTDJacGJHVXRZWEJ3TG5CdVp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJOMVltbGpMV0psZW1sbGNpNWpiMjB2Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKM1J2YjJ3bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkRllYTnBibWNnWm5WdVkzUnBiMjV6Snl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW42TFNkNWFHZTViQ1U1cHV5NTdxLzVicVRKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OW1hV3hsTFdGd2NDNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OWxZWE5wYm1kekxtNWxkQzhuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5kRzl2YkNjc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjFkbFlpRGx0NlhsaGJjbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2ZscmFia3VhQWdTRlJOVEMxRFUxTXRJRXBUSU9lYWhPV2NxT2U2ditXM3BlV0Z0K21iaHVXUWlDY3NYSEpjYmlBZ0lDQWdJQ0FnYzNKak9pQW5MaTlwYldjdlptbHNaUzFoY0hBdWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dmFIUnRiQzFqYzNNdGFuTXVZMjl0THljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2QwYjI5c0p5eGNjbHh1SUNBZ0lDQWdmU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lIUnBkR3hsT2lBbjVxMmo1WWlaNktHbzZMNis1YnlQSnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW41WnlvNTdxLzVhMm01TG1nNXEyajVZaVo2S0dvNkw2KzVieVA1YmVsNVlXM0p5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5bWFXeGxMV0Z3Y0M1d2JtY25MRnh5WEc0Z0lDQWdJQ0FnSUd4cGJtdEljbVZtT2lBbmFIUjBjSE02THk5eVpXZGxlREV3TVM1amIyMHZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0ozUnZiMnduTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2ROYjJSMWJHRnlJRk5qWVd4bEp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuNWEyWDVMMlQ1cStVNUw2TDViQzZKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OW1hV3hsTFdGd2NDNXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OTNkM2N1Ylc5a2RXeGhjbk5qWVd4bExtTnZiUzhuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5kRzl2YkNjc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjB4dmNtVnRJRkJwWTNOMWJTY3NYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSitXUWhPZW5qZVd3dXVXdnVPV2J2dWVKaCtpSHF1V0txT2VVbithSWtPV1pxTys4ak9XYnZ1ZUpoK2FkcGVpSHF1UzZqaUJWYm5Od2JHRnphQ2NzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZabWxzWlMxaGNIQXVjRzVuSnl4Y2NseHVJQ0FnSUNBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZjR2xqYzNWdExuQm9iM1J2Y3k4bkxGeHlYRzRnSUNBZ0lDQWdJR05oZEdWbmIzSjVPaUFuZEc5dmJDY3NYSEpjYmlBZ0lDQWdJSDBzWEhKY2JpQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhWFJzWlRvZ0orV2J2dWVKaCtlVW4rYUlrT1dacUNjc1hISmNiaUFnSUNBZ0lDQWdZMjl1ZEdWdWREb2dKK1dQcittQWllV3d1dVd2dU9lYWhPV05vT1M5amVlc3B1V2J2dWVKaCtlVW4rYUlrT1dacUNjc1hISmNiaUFnSUNBZ0lDQWdjM0pqT2lBbkxpOXBiV2N2Wm1sc1pTMWhjSEF1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2WkhWdGJYbHBiV0ZuWlM1amIyMHZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0ozUnZiMnduTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2RYTTFOamFHOXZiSE1nU0c5M0lGUnZKeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBbjVhMm01TG1nNTd5VzVZYVpJRlZKSU9lN2hPUzd0aWNzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZabWxzWlMxaGNIQXVjRzVuSnl4Y2NseHVJQ0FnSUNBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZkM2QzTG5jemMyTm9iMjlzY3k1amIyMHZhRzkzZEc4dlpHVm1ZWFZzZEM1aGMzQW5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBbmRHOXZiQ2NzWEhKY2JpQWdJQ0FnSUgwc1hISmNiaUFnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0IwYVhSc1pUb2dKMUJsZUdWc2N5Y3NYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSitXRmplaTB1U3dnNXBTdjVveUI1YVNhNTZlTjViQzY1YSs0NUxpTDZMMjlKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OXdaWGhsYkhNdWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dlkyOTJaWEp5TG1Odkx5Y3NYSEpjYmlBZ0lDQWdJQ0FnWTJGMFpXZHZjbms2SUNkd2FHOTBieWNzWEhKY2JpQWdJQ0FnSUgwc1hISmNiaUFnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0IwYVhSc1pUb2dKMVZ1YzNCc1lYTm9KeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBbjVZV042TFM1TENEbHBiM25sS2duTEZ4eVhHNGdJQ0FnSUNBZ0lITnlZem9nSnk0dmFXMW5MM1Z1YzNCc1lYTm9MbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMM1Z1YzNCc1lYTm9MbU52YlM4bkxGeHlYRzRnSUNBZ0lDQWdJR05oZEdWbmIzSjVPaUFuY0dodmRHOG5MRnh5WEc0Z0lDQWdJQ0I5TEZ4eVhHNGdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdkR2wwYkdVNklDZE9aWGNnVDJ4a0lGTjBiMk5ySnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW42YnVSNTVtOTVZNkc1WSt5NTRXbjU0bUhKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OXVaWGR2YkdRdWFuQm5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dmJtOXpMblIzYm5OdVpDNWpieThuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5jR2h2ZEc4bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkVGRISmxaWFJYYVd4c0p5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuNktHWDVZeTY1NFduNTRtSEp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5emRISmxaWFIzYVd4c0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3T2k4dmMzUnlaV1YwZDJsc2JDNWpieThuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5jR2h2ZEc4bkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkSlkyOXVUVzl2Ymljc1hISmNiaUFnSUNBZ0lDQWdZMjl1ZEdWdWREb2dKK2V1b2VlUWh1V2J2dWFnaCtXNmxPZVVxQ3dnNXBTdjVveUI1YVNhNTZlTjVxQzg1YnlQNUxpTDZMMjlKeXhjY2x4dUlDQWdJQ0FnSUNCemNtTTZJQ2N1TDJsdFp5OXBZMjl1WVhCd0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3Y3pvdkwybGpiMjF2YjI0dWFXOHZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0oybGpiMjRuTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2RwWTI5dVptOXVkQ2NzWEhKY2JpQWdJQ0FnSUNBZ1kyOXVkR1Z1ZERvZ0p6SXhNREFySU9XRmplaTB1ZVdidnVhZ2h5d2dhV052YmlCbWIyNTBJQ1lnVTFaSEp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5cFkyOW1iMjUwTG5CdVp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJsamIyWnZiblF1WTI5dEx5Y3NYSEpjYmlBZ0lDQWdJQ0FnWTJGMFpXZHZjbms2SUNkcFkyOXVKeXhjY2x4dUlDQWdJQ0FnZlN4Y2NseHVJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJSFJwZEd4bE9pQW5SbTl1ZENCQmQyVnpiMjFsSnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW5NVFUxTXlEbGhZM290TG5sbTc3bW9JY3NJRk5XUnlBbUlGTnZZMmxoYkNCc2IyZHZjeWNzWEhKY2JpQWdJQ0FnSUNBZ2MzSmpPaUFuTGk5cGJXY3ZabTl1ZEdGM1pYTnZiWGN1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2Wm05dWRHRjNaWE52YldVdVkyOXRMeWNzWEhKY2JpQWdJQ0FnSUNBZ1kyRjBaV2R2Y25rNklDZHBZMjl1Snl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuUVhkM2QyRnlaSE1uTEZ4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5RNklDZm5ncXZwaGJmbm1vVG52Wkhwb2JYcG00YmxrSWduTEZ4eVhHNGdJQ0FnSUNBZ0lITnlZem9nSnk0dmFXMW5MMkYzWVhKa2N5NXdibWNuTEZ4eVhHNGdJQ0FnSUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OTNkM2N1WVhkM2QyRnlaSE11WTI5dEx5Y3NYSEpjYmlBZ0lDQWdJQ0FnWTJGMFpXZHZjbms2SUNkcGJuTndhWEpoZEdsdmJpY3NYSEpjYmlBZ0lDQWdJSDBzWEhKY2JpQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhWFJzWlRvZ0oybHVjM0JwY21sdVp5QnZibXhwYm1VbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2ZtbklubGlKdmt2WnpsaXB2bm1vVGxuS2pudXIvbHVwVG5sS2pwbTRibGtJZ25MRnh5WEc0Z0lDQWdJQ0FnSUhOeVl6b2dKeTR2YVcxbkwyWnBiR1V0WVhCd0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3Y3pvdkwybHVjM0JwY21sdVp5NXZibXhwYm1Vdkp5eGNjbHh1SUNBZ0lDQWdJQ0JqWVhSbFoyOXllVG9nSjJsdWMzQnBjbUYwYVc5dUp5eGNjbHh1SUNBZ0lDQWdmU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lIUnBkR3hsT2lBblNGUk5URFVnVlZBbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2ZsazQzbHVwVGx2SS9udlpIbnE1bm1xS0htbmIvcG00YmxrSWduTEZ4eVhHNGdJQ0FnSUNBZ0lITnlZem9nSnk0dmFXMW5MMmcxZEdWc1pXMXdiR1YwWlM1d2JtY25MRnh5WEc0Z0lDQWdJQ0FnSUd4cGJtdEljbVZtT2lBbmFIUjBjSE02THk5b2RHMXNOWFZ3TG01bGRDOG5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBbmFXNXpjR2x5WVhScGIyNG5MRnh5WEc0Z0lDQWdJQ0I5TEZ4eVhHNGdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdkR2wwYkdVNklDZFRiR2xrWlhNbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2REVTFNZzU3dUU1THUySnl4Y2NseHVJQ0FnSUNBZ0lDQnpjbU02SUNjdUwybHRaeTltYVd4bExXRndjQzV3Ym1jbkxGeHlYRzRnSUNBZ0lDQWdJR3hwYm10SWNtVm1PaUFuYUhSMGNITTZMeTl6Ykdsa1pYTXVZMjl0TDNkcGNtVm1jbUZ0WlQ5a1pXSjFaejB5STJadmNtMXpKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0oybHVjM0JwY21GMGFXOXVKeXhjY2x4dUlDQWdJQ0FnZlN4Y2NseHVJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJSFJwZEd4bE9pQW5RU0JUYVc1bmJHVWdSR2wySnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW5RMU5USU9XYnZ1VzlvdW1iaHVXUWlDY3NYSEpjYmlBZ0lDQWdJQ0FnYzNKak9pQW5MaTlwYldjdlptbHNaUzFoY0hBdWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dllTNXphVzVuYkdWa2FYWXVZMjl0THljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RwYm5Od2FYSmhkR2x2Ymljc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSjFSbGVIUkZlSEJoYm1SbGNpQkNiRzluSnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW5WSFYwYjNKcFlXd2dZbXh2Wnljc1hISmNiaUFnSUNBZ0lDQWdjM0pqT2lBbkxpOXBiV2N2Wm1sc1pTMWhjSEF1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2ZEdWNGRHVjRjR0Z1WkdWeUxtTnZiUzlpYkc5bkx5Y3NYSEpjYmlBZ0lDQWdJQ0FnWTJGMFpXZHZjbms2SUNkaWJHOW5KeXhjY2x4dUlDQWdJQ0FnZlN4Y2NseHVJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJSFJwZEd4bE9pQW5jMmh2Y0dsbWVTQmliRzluSnl4Y2NseHVJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW5WSFYwYjNKcFlXd2dZbXh2WisrOGpFNWxkM05zWlhSMFpYSW5MRnh5WEc0Z0lDQWdJQ0FnSUhOeVl6b2dKeTR2YVcxbkwyWnBiR1V0WVhCd0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3Y3pvdkwzZDNkeTV6YUc5d2FXWjVMbU52YlM5aWJHOW5KeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0oySnNiMmNuTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2ROYjIxbGJuUjFiU0JDYkc5bkp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuVkhWMGIzSnBZV3dnWW14dlp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYzNKak9pQW5MaTlwYldjdlptbHNaUzFoY0hBdWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dmJXOXRaVzUwZFcxa1lYTm9MbU52YlM5aWJHOW5MeWNzWEhKY2JpQWdJQ0FnSUNBZ1kyRjBaV2R2Y25rNklDZGliRzluSnl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuVFhWemFXTWdabTl5SUcxaGNtdGxjbk1nUW14dlp5Y3NYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSjFSMWRHOXlhV0ZzSUdKc2IyY25MRnh5WEc0Z0lDQWdJQ0FnSUhOeVl6b2dKeTR2YVcxbkwyWnBiR1V0WVhCd0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3Y3pvdkwyMTFjMmxqWm05eWJXRnJaWEp6TG1OdmJTOWliRzluTHljc1hISmNiaUFnSUNBZ0lDQWdZMkYwWldkdmNuazZJQ2RpYkc5bkp5eGNjbHh1SUNBZ0lDQWdmU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lIUnBkR3hsT2lBblUyRnVaV0p2ZUNCaWJHOW5KeXhjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwT2lBblZIVjBiM0pwWVd3Z1lteHZaKys4akU1bGQzTnNaWFIwWlhJbkxGeHlYRzRnSUNBZ0lDQWdJSE55WXpvZ0p5NHZhVzFuTDJacGJHVXRZWEJ3TG5CdVp5Y3NYSEpjYmlBZ0lDQWdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJKc2IyY3VjMkZ1WldKdmVDNWpiMjB2Snl4Y2NseHVJQ0FnSUNBZ0lDQmpZWFJsWjI5eWVUb2dKMkpzYjJjbkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNkVFkyOTBkQ0JJTGlCWmIzVnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ1kyOXVkR1Z1ZERvZ0oraXZ1K1M1cHUrOGpPV0dtZVM5bkNCOElFNWxkM05zWlhSMFpYSW5MRnh5WEc0Z0lDQWdJQ0FnSUhOeVl6b2dKeTR2YVcxbkwyWnBiR1V0WVhCd0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3Y3pvdkwzZDNkeTV6WTI5MGRHaDViM1Z1Wnk1amIyMHZZbXh2Wnk4bkxGeHlYRzRnSUNBZ0lDQWdJR05oZEdWbmIzSjVPaUFuWW14dlp5Y3NYSEpjYmlBZ0lDQWdJSDBzWEhKY2JpQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhWFJzWlRvZ0oyeHBibTFwTG1Oakp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuVG05MGFXOXVJT2FWbWVlb2l5Y3NYSEpjYmlBZ0lDQWdJQ0FnYzNKak9pQW5MaTlwYldjdlptbHNaUzFoY0hBdWNHNW5KeXhjY2x4dUlDQWdJQ0FnSUNCc2FXNXJTSEpsWmpvZ0oyaDBkSEJ6T2k4dmJHbHViV2t1WTJNdkp5eGNjbHh1SUNBZ0lDQWdJQ0JqWVhSbFoyOXllVG9nSjJKc2IyY25MRnh5WEc0Z0lDQWdJQ0I5TEZ4eVhHNGdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdkR2wwYkdVNklDZEZibWRHYkhWbGJuUW5MRnh5WEc0Z0lDQWdJQ0FnSUdOdmJuUmxiblE2SUNmbHJhYmt1YURvaTdIb3I2M25zN3ZsaUpmbWxabm5xSXNuTEZ4eVhHNGdJQ0FnSUNBZ0lITnlZem9nSnk0dmFXMW5MMlpwYkdVdFlYQndMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMMlZ1WjJac2RXVnVkQzVqYjIwdllteHZaeThuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5ZbXh2Wnljc1hISmNiaUFnSUNBZ0lIMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCMGFYUnNaVG9nSithZ251ZWFoT1cvZytlQnRlaW5rdWlRdlNjc1hISmNiaUFnSUNBZ0lDQWdZMjl1ZEdWdWREb2dKK2l2dStTNXB1V05tdVd1b2ljc1hISmNiaUFnSUNBZ0lDQWdjM0pqT2lBbkxpOXBiV2N2Wm1sc1pTMWhjSEF1Y0c1bkp5eGNjbHh1SUNBZ0lDQWdJQ0JzYVc1clNISmxaam9nSjJoMGRIQnpPaTh2ZEhkcGJuTjVZVzVuTG01bGRDOG5MRnh5WEc0Z0lDQWdJQ0FnSUdOaGRHVm5iM0o1T2lBbllteHZaeWNzWEhKY2JpQWdJQ0FnSUgwc1hISmNiaUFnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0IwYVhSc1pUb2dKMVl5UlZnbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2QyTW1WNEp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5bWFXeGxMV0Z3Y0M1d2JtY25MRnh5WEc0Z0lDQWdJQ0FnSUd4cGJtdEljbVZtT2lBbmFIUjBjSE02THk5M2QzY3VkakpsZUM1amIyMHZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0oySnNiMmNuTEZ4eVhHNGdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnZEdsMGJHVTZJQ2ZubExYcHVLM25wTDdsakxvbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2ZrdXBMb2daVG52WkhsdDZYa3Zaem9nSVhrdTZ6bm1vVG9nWnJwbTRibG5MQW5MRnh5WEc0Z0lDQWdJQ0FnSUhOeVl6b2dKeTR2YVcxbkwyWnBiR1V0WVhCd0xuQnVaeWNzWEhKY2JpQWdJQ0FnSUNBZ2JHbHVhMGh5WldZNklDZG9kSFJ3Y3pvdkwyVnNaV1IxWTJzdVkyOXRMeWNzWEhKY2JpQWdJQ0FnSUNBZ1kyRjBaV2R2Y25rNklDZGliRzluSnl4Y2NseHVJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUFuYzNWeWNHeDFjM1poYkhWbEp5eGNjbHh1SUNBZ0lDQWdJQ0JqYjI1MFpXNTBPaUFuNVltcDVMMlo1THUzNVlDOEp5eGNjbHh1SUNBZ0lDQWdJQ0J6Y21NNklDY3VMMmx0Wnk5bWFXeGxMV0Z3Y0M1d2JtY25MRnh5WEc0Z0lDQWdJQ0FnSUd4cGJtdEljbVZtT2lBbmFIUjBjSE02THk5M2QzY3VjM1Z5Y0d4MWMzWmhiSFZsTG1Oc2RXSXZKeXhjY2x4dUlDQWdJQ0FnSUNCallYUmxaMjl5ZVRvZ0ozQnZaR05oYzNRbkxGeHlYRzRnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ2RHbDBiR1U2SUNma3VLM21sb2ZuaTZ6bnE0dm1rcTNscnFJbkxGeHlYRzRnSUNBZ0lDQWdJR052Ym5SbGJuUTZJQ2ZsajVIbmpyRGt1STdtanFqb2paRHBxNWpvdEtqcGg0L25tb1RrdUszbWxvZm5pNnpucTR2bWtxM2xycUluTEZ4eVhHNGdJQ0FnSUNBZ0lITnlZem9nSnk0dmFXMW5MMlpwYkdVdFlYQndMbkJ1Wnljc1hISmNiaUFnSUNBZ0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMM1I1Y0d4dlp5NWpiMjB2Y0c5a2JHbHpkQzhuTEZ4eVhHNGdJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQW5jRzlrWTJGemRDY3NYSEpjYmlBZ0lDQWdJSDBzWEhKY2JpQWdJQ0JkTEZ4eVhHNGdJQ0FnWTJGc2JHSmhZMnM2SUdaMWJtTjBhVzl1SUNoamIyNTBaVzUwS1NCN1hISmNiaUFnSUNBZ0lISmxkSFZ5YmlCamIyNTBaVzUwTzF4eVhHNGdJQ0FnZlN4Y2NseHVJQ0I5TzF4eVhHNWNjbHh1SUNBdkwxeHlYRzRnSUM4dklFMWxkR2h2WkhOY2NseHVJQ0F2TDF4eVhHNWNjbHh1SUNBdkx5QlNaVzF2ZG1VZ1pIVndiR2xqWVhSbElIWmhiSFZsY3lCbWNtOXRJR0Z1SUdGeWNtRjVYSEpjYmlBZ1kyOXVjM1FnZFc1cGNYVmxRWEp5WVhrZ1BTQm1kVzVqZEdsdmJpQW9ZWEp5S1NCN1hISmNiaUFnSUNCeVpYUjFjbTRnWVhKeUxtWnBiSFJsY2lnb2RtRnNkV1VzSUdsdVpHVjRMQ0J6Wld4bUtTQTlQaUJ6Wld4bUxtbHVaR1Y0VDJZb2RtRnNkV1VwSUQwOVBTQnBibVJsZUNrN1hISmNiaUFnZlR0Y2NseHVYSEpjYmlBZ1kyOXVjM1FnZEc5bloyeGxUbUYySUQwZ1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ0lDQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjalkyOXVkR1Z1ZEY5M2NtRndjR1Z5SnlrdVkyeGhjM05NYVhOMExuUnZaMmRzWlNnbmFHbGtaR1Z1SnlrN1hISmNiaUFnZlZ4eVhHNGdJQzh2SUVsdWMyVnlkQ0JzWldaMElHNWhkbWxuWVhScGIyNGdhWFJsYlhNZ2FXNTBieUJrYjJOMWJXVnVkRnh5WEc0Z0lHTnZibk4wSUhKbGJtUmxjazVoZGtsMFpXMXpJRDBnWm5WdVkzUnBiMjRnS0hObGJHVmpkRzl5TENCallYUmxaMjl5YVdWektTQjdYSEpjYmlBZ0lDQnBaaWdoWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpa2djbVYwZFhKdU8xeHlYRzRnSUNBZ1kyOXVjM1FnYVhSbGJYTWdQU0JqWVhSbFoyOXlhV1Z6WEhKY2JpQWdJQ0FnSUM1dFlYQW9LR05oZEdWbmIzSjVLU0E5UGlCN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHQmNjbHh1SUNBZ0lDQWdJQ0FnSUR4c2FTQmpiR0Z6Y3oxY0lteGxablJmYldWdWRWOXBkR1Z0WENJK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4cGJXY2dZMnhoYzNNOVhDSnRaVzUxWDJsMFpXMWZhV052Ymx3aUlITnlZejFjSWk5emRtY3ZaWGhoYlhCc1pTNXpkbWRjSWo0OEwybHRaejVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQSEFnWTJ4aGMzTTlYQ0p0Wlc1MVgybDBaVzFmWTI5dWRHVnVkRndpUGlSN1kyRjBaV2R2Y25sOVBDOXdQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BDOXNhVDVjY2x4dUlDQWdJQ0FnSUNCZ08xeHlYRzRnSUNBZ0lDQjlLVnh5WEc0Z0lDQWdJQ0F1YW05cGJpZ25KeWxjY2x4dVhISmNiaUFnSUNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLSE5sYkdWamRHOXlLUzVwYm01bGNraFVUVXdnUFNCcGRHVnRjenRjY2x4dUlDQjlPMXh5WEc1Y2NseHVJQ0F2THlCU1pXNWtaWElnYzJWamRHbHZiaUJuY205MWNITWdkRzhnWkc5amRXMWxiblJjY2x4dUlDQmpiMjV6ZENCeVpXNWtaWEpUWldOMGFXOXVSM0p2ZFhCeklEMGdablZ1WTNScGIyNG9jMlZzWldOMGIzSXNJR05oZEdWbmIzSnBaWE1wSUh0Y2NseHVJQ0FnSUdsbUlDZ2haRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loelpXeGxZM1J2Y2lrcElISmxkSFZ5Ymp0Y2NseHVJQ0FnSUM4dklFZGxkQ0J6WldOMGFXOXVJR2wwWlcxelhISmNiaUFnSUNCamIyNXpkQ0JuY205MWNITWdQU0JqWVhSbFoyOXlhV1Z6TG0xaGNDZ29ZMkYwWldkdmNua3BJRDArSUh0Y2NseHVJQ0FnSUNBZ2NtVjBkWEp1SUdCY2NseHVJQ0FnSUNBZ0lDQThjMlZqZEdsdmJpQnBaRDFjSWlSN1kyRjBaV2R2Y25sOVhDSWdZMnhoYzNNOVhDSm5jbTkxY0Z3aUlENWNjbHh1SUNBZ0lDQWdJQ0FnSUR4b015QmpiR0Z6Y3oxY0ltZHliM1Z3WDNScGRHeGxYQ0krSkh0allYUmxaMjl5ZVgwOEwyZ3pQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbWR5YjNWd1gyTnZiblJsYm5SY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BIVnNJR05zWVhOelBWd2ljbTkzSUdkeWIzVndYMmwwWlcxelhDSStQQzkxYkQ1Y2NseHVJQ0FnSUNBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ0lDQWdJRHd2YzJWamRHbHZiajRnSUZ4eVhHNGdJQ0FnSUNCZ08xeHlYRzRnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaHpaV3hsWTNSdmNpa3VhVzV1WlhKSVZFMU1JRDBnWjNKdmRYQnpMbXB2YVc0b0p5Y3BPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdMeThnUjJWMElITmxZM1JwYjI0Z2FYUmxiWE5jY2x4dUlDQmpiMjV6ZENCeVpXNWtaWEpUWldOMGFXOXVTWFJ0WlhNZ1BTQm1kVzVqZEdsdmJpaHBaQ3dnY21WemIzVnlZMlZ6S1NCN1hISmNiaUFnSUNCcFppQW9JV1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1lDTWtlMmxrZlNBdVozSnZkWEJmYVhSbGJYTmdLU2tnY21WMGRYSnVPMXh5WEc0Z0lDQWdZMjl1YzNRZ2JXRnJaWFZ3SUQwZ2NtVnpiM1Z5WTJWelhISmNiaUFnSUNBZ0lDNW1hV3gwWlhJb2NtVnpiM1Z5WTJVZ1BUNGdjbVZ6YjNWeVkyVXVZMkYwWldkdmNua3VkSEpwYlNncElEMDlQU0JwWkNsY2NseHVJQ0FnSUNBZ0xtMWhjQ2h5WlhOdmRYSmpaU0E5UGlCN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHQmNjbHh1SUNBZ0lDQWdJQ0FnSUR4c2FTQmpiR0Z6Y3oxY0ltZHliM1Z3WDJsMFpXMGdZMjlzTTF3aVBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOFlTQmpiR0Z6Y3oxY0ltZHliM1Z3WDJsMFpXMWZiR2x1YTF3aUlHaHlaV1k5WENJa2UzSmxjMjkxY21ObExteHBibXRJY21WbWZWd2lQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKallYSmtYQ0krWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGFXMW5JR05zWVhOelBWd2lZMkZ5WkY5cFkyOXVYQ0lnYzNKalBWd2lKSHR5WlhOdmRYSmpaUzV6Y21OOVhDSStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyRnlaRjlpYjJSNVhDSStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4b05DQmpiR0Z6Y3oxY0ltTmhjbVJmZEdsMGJHVmNJajRrZTNKbGMyOTFjbU5sTG5ScGRHeGxmVHd2YURRK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3SUdOc1lYTnpQVndpWTJGeVpGOTBaWGgwWENJK0pIdHlaWE52ZFhKalpTNWpiMjUwWlc1MGZUd3ZjRDVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyRStYSEpjYmlBZ0lDQWdJQ0FnSUNBOEwyeHBQbHh5WEc0Z0lDQWdJQ0FnSUdBN1hISmNiaUFnSUNBZ0lIMHBYSEpjYmlBZ0lDQWdJQzVxYjJsdUtDY25LVnh5WEc1Y2NseHVJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9ZQ01rZTJsa2ZTQXVaM0p2ZFhCZmFYUmxiWE5nS1M1cGJtNWxja2hVVFV3Z1BTQnRZV3RsZFhBN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNBdkwxeHlYRzRnSUM4dklFbHVhWFJ6SUNZZ1JYWmxiblJ6WEhKY2JpQWdMeTljY2x4dVhISmNiaUFnTHk4Z1VIVmliR2xqSUUxbGRHaHZaSE1nUVZCSmMxeHlYRzRnSUhKbGRIVnliaUI3WEhKY2JpQWdJQ0JwYm1sME9pQm1kVzVqZEdsdmJpQW9iM0IwYVc5dWN5a2dlMXh5WEc0Z0lDQWdJQ0J2Y0hScGIyNXpJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZUdGNjbHh1SUNBZ0lDQWdMeThnVFdWeVoyVWdZbTkwYUNCMWMyVnlJR1JsWm1GMWJIUnpJR0Z1WkNCdmNIUnBiMjV6TGx4eVhHNGdJQ0FnSUNCamIyNXpkQ0J6WlhSMGFXNW5jeUE5SUU5aWFtVmpkQzVoYzNOcFoyNG9lMzBzSUdSbFptRjFiSFJ6TENCdmNIUnBiMjV6S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQzh2SUVkbGRDQmhiR3dnWTJGMFpXZHZjbWxsY3lCdlppQnlaWE52ZFhKalpYTmNjbHh1SUNBZ0lDQWdZMjl1YzNRZ1kyRjBaV2R2Y21sbGN5QTlJSFZ1YVhGMVpVRnljbUY1S0hObGRIUnBibWR6TG5KbGMyOTFjbU5sY3k1dFlYQW9YSEpjYmlBZ0lDQWdJQ0FnS0hKbGMyOTFjbU5sS1NBOVBpQnlaWE52ZFhKalpTNWpZWFJsWjI5eWVWeHlYRzRnSUNBZ0lDQXBLVHRjY2x4dVhISmNiaUFnSUNBZ0lISmxibVJsY2s1aGRrbDBaVzF6S0hObGRIUnBibWR6TG01aGRrbDBaVzFEYjI1MFlXbHVaWElzSUdOaGRHVm5iM0pwWlhNcE8xeHlYRzRnSUNBZ0lDQnlaVzVrWlhKVFpXTjBhVzl1UjNKdmRYQnpLSE5sZEhScGJtZHpMbk5sWTNScGIyNXpRMjl1ZEdGcGJtVnlMQ0JqWVhSbFoyOXlhV1Z6S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQzh2SUZKbGJtUmxjaUJ6WldOMGFXOXVjeUJwZEdWdGN5QnZiaUJrYjJOMWJXVnVkRnh5WEc0Z0lDQWdJQ0JqWVhSbFoyOXlhV1Z6TG1admNrVmhZMmdvWTJGMFpXZHZjbmtnUFQ0Z2V5QWdJQ0FnSUNBZ0lDQmNjbHh1SUNBZ0lDQWdJQ0J5Wlc1a1pYSlRaV04wYVc5dVNYUnRaWE1vWTJGMFpXZHZjbmtzSUhObGRIUnBibWR6TG5KbGMyOTFjbU5sY3lsY2NseHVJQ0FnSUNBZ2ZTbGNjbHh1WEhKY2JpQWdJQ0FnSUM4dklFVjJaVzUwWEhKY2JpQWdJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTUwYjNCZlltRnlYMkowYmljcExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTnNhV05ySnl3Z2RHOW5aMnhsVG1GMkxDQm1ZV3h6WlNrN1hISmNiaUFnSUNCOUxGeHlYRzRnSUgwN1hISmNibHh5WEc0Z0lDOHZJRlJQUkU5Y2NseHVJQ0F2THlCRGNtVmhkR1VnZEdobElHUmxjM1J2Y25rZ2JXVjBhRzlrY3lCdlppQndiSFZuYVc1Y2NseHVmU2tvS1R0Y2NseHVYSEpjYm5KbGJtUmxjaTVwYm1sMEtDazdJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09In0=
