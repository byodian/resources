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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/Card.js":
/*!***********************************!*\
  !*** ./src/js/components/Card.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./src/js/components/Helper.js");


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
  cardTitle.textContent = title;

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

/* harmony default export */ __webpack_exports__["default"] = (renderCard);



/***/ }),

/***/ "./src/js/components/Helper.js":
/*!*************************************!*\
  !*** ./src/js/components/Helper.js ***!
  \*************************************/
/*! exports provided: truncateString, uniqueArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "truncateString", function() { return truncateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniqueArray", function() { return uniqueArray; });
const truncateString = function truncateString(str, num=20) {
  return str.length < num ? str : str.slice(0, num) + '...';
}

const uniqueArray = function(array) {
  return [...new Set(array)];
}


/***/ }),

/***/ "./src/js/components/MenuItems.js":
/*!****************************************!*\
  !*** ./src/js/components/MenuItems.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return generateItem; });
function generateItem({ src, content }) {
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

/***/ }),

/***/ "./src/js/components/Section.js":
/*!**************************************!*\
  !*** ./src/js/components/Section.js ***!
  \**************************************/
/*! exports provided: createSectionWithInnerHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSectionWithInnerHTML", function() { return createSectionWithInnerHTML; });
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



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Card */ "./src/js/components/Card.js");
/* harmony import */ var _components_MenuItems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/MenuItems */ "./src/js/components/MenuItems.js");
/* harmony import */ var _components_Section__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Section */ "./src/js/components/Section.js");
/* harmony import */ var _components_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Helper */ "./src/js/components/Helper.js");





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
  fragmentElements.menuItemsFragment.append(Object(_components_MenuItems__WEBPACK_IMPORTED_MODULE_1__["default"])(resource));
  fragmentElements.cardsFragment.append(Object(_components_Card__WEBPACK_IMPORTED_MODULE_0__["default"])(resource));
});

els.leftControl.addEventListener('click', toggleSideBar);
els.leftMenuItems.appendChild(fragmentElements.menuItemsFragment);
els.sectionsContainer.innerHTML = renderSection();
els.groupItems.appendChild(fragmentElements.cardsFragment);


function renderSection() {
  const tags = resources.map(resource => resource.reference);
  const sectionTitle = _components_Helper__WEBPACK_IMPORTED_MODULE_3__["uniqueArray"](tags);
  const sectionMakrup = Object(_components_Section__WEBPACK_IMPORTED_MODULE_2__["createSectionWithInnerHTML"])(sectionTitle);
  return sectionMakrup;
}

function toggleSideBar(e) {
  els.mainContent.classList.toggle('hidden');
}

/***/ }),

/***/ 0:
/*!********************************************************************************************************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/components/Card.js ./src/js/components/Helper.js ./src/js/components/MenuItems.js ./src/js/components/Section.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\components\Card.js */"./src/js/components/Card.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\components\Helper.js */"./src/js/components/Helper.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\components\MenuItems.js */"./src/js/components/MenuItems.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\components\Section.js */"./src/js/components/Section.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9IZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvTWVudUl0ZW1zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW1DOztBQUVuQyw4QkFBOEIsK0JBQStCO0FBQzdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRWUseUVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUN4QzFCO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQWUsdUJBQXVCLGVBQWU7QUFDckQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLElBQUk7QUFDdkIsZ0NBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJDO0FBQ087QUFDa0M7QUFDdEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMscUVBQVk7QUFDeEQsd0NBQXdDLGdFQUFVO0FBQ2xELENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx1QkFBdUIsOERBQWtCO0FBQ3pDLHdCQUF3QixzRkFBYTtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgKiBhcyBoZWxwZXIgZnJvbSBcIi4vSGVscGVyXCI7XHJcblxyXG5jb25zdCByZW5kZXJDYXJkID0gZnVuY3Rpb24gKHsgc3JjLCB0aXRsZSwgY29udGVudCwgbGlua0hyZWZ9KSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIGxpLmNsYXNzTmFtZSA9ICdncm91cF9pdGVtIGNvbDMnO1xyXG4gIFxyXG4gIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgbGluay5jbGFzc05hbWUgPSAnZ3JvdXBfaXRlbV9saW5rJztcclxuICBsaW5rLmhyZWYgPSBsaW5rSHJlZjtcclxuICBsaW5rLmFsdCA9IGNvbnRlbnQ7XHJcblxyXG4gIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjYXJkLmNsYXNzTmFtZSA9ICdjYXJkJztcclxuICBcclxuICBjb25zdCBjYXJkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gIGNhcmRJY29uLmNsYXNzTmFtZSA9IFwiY2FyZF9pY29uXCJcclxuICBjYXJkSWNvbi5hbHQgPSB0aXRsZTtcclxuICBjYXJkSWNvbi5zcmMgPSBzcmM7XHJcblxyXG4gIGNvbnN0IGNhcmRCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY2FyZEJvZHkuY2xhc3NOYW1lID0gJ2NhcmRfYm9keSc7XHJcblxyXG4gIGNvbnN0IGNhcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgY2FyZFRpdGxlLmNsYXNzTmFtZSA9ICdjYXJkX3RpdGxlJztcclxuICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuXHJcbiAgY29uc3QgY2FyZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgY2FyZFRleHQuY2xhc3NOYW1lID0gJ2NhcmRfdGV4dCc7XHJcbiAgY2FyZFRleHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xyXG5cclxuICBjYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkVGl0bGUpO1xyXG4gIGNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRUZXh0KTtcclxuICBjYXJkLmFwcGVuZENoaWxkKGNhcmRJY29uKTtcclxuICBjYXJkLmFwcGVuZENoaWxkKGNhcmRCb2R5KTtcclxuICBsaW5rLmFwcGVuZENoaWxkKGNhcmQpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuICByZXR1cm4gbGk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlbmRlckNhcmQ7XHJcblxyXG4iLCJjb25zdCB0cnVuY2F0ZVN0cmluZyA9IGZ1bmN0aW9uIHRydW5jYXRlU3RyaW5nKHN0ciwgbnVtPTIwKSB7XHJcbiAgcmV0dXJuIHN0ci5sZW5ndGggPCBudW0gPyBzdHIgOiBzdHIuc2xpY2UoMCwgbnVtKSArICcuLi4nO1xyXG59XHJcblxyXG5jb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KGFycmF5KV07XHJcbn1cclxuZXhwb3J0IHt0cnVuY2F0ZVN0cmluZywgdW5pcXVlQXJyYXl9OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlSXRlbSh7IHNyYywgY29udGVudCB9KSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIGxpLmNsYXNzTmFtZSA9ICdsZWZ0X21lbnVfaXRlbSc7XHJcbiAgXHJcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICBpY29uLmNsYXNzTmFtZSA9ICdtZW51X2l0ZW1faWNvbic7XHJcbiAgXHJcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgaW1nLnNyYyA9IHNyYztcclxuXHJcbiAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICBwLmNsYXNzTmFtZSA9ICdtZW51X2l0ZW1fY29udGVudCc7XHJcbiAgcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XHJcblxyXG4gIGljb24uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICBsaS5hcHBlbmRDaGlsZChpY29uKTtcclxuICBsaS5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgcmV0dXJuIGxpO1xyXG59IiwiZnVuY3Rpb24gY3JlYXRlU2VjdGlvbldpdGhJbm5lckhUTUwodGFncykge1xyXG4gIGNvbnN0IHJvd3MgPSB0YWdzLm1hcCh0YWc9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgPHNlY3Rpb24gaWQ9XCIke3RhZ31cIiBjbGFzcz1cImdyb3VwXCIgPlxyXG4gICAgICA8aDMgY2xhc3M9XCJncm91cF90aXRsZVwiPiR7dGFnfTwvaDM+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cF9jb250ZW50XCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJncm91cF9pdGVtIGNvbDNcIj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJncm91cF9pdGVtX2xpbmtcIiBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhcmRfaWNvblwiIHNyYz1cIi4vaW1nL21kbi5wbmdcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX2JvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF90aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFdlYiBUZWNobm9sb2d5PC9oND5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHRcIj7kuIDkuKrliY3nq6/lrabkuaDot6/lvoQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICAgIGA7XHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIHJvd3Muam9pbignICcpO1xyXG59XHJcblxyXG5leHBvcnQge2NyZWF0ZVNlY3Rpb25XaXRoSW5uZXJIVE1MfTsiLCJpbXBvcnQgcmVuZGVyQ2FyZCBmcm9tIFwiLi9jb21wb25lbnRzL0NhcmRcIjtcclxuaW1wb3J0IGdlbmVyYXRlSXRlbSBmcm9tIFwiLi9jb21wb25lbnRzL01lbnVJdGVtc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVTZWN0aW9uV2l0aElubmVySFRNTCBhcyBjcmVhdGVTZWN0aW9uIH0gIGZyb20gXCIuL2NvbXBvbmVudHMvU2VjdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBoZWxwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9IZWxwZXJcIjtcclxuXHJcbmNvbnN0IHJlc291cmNlcyA9IFtcclxuICB7XHJcbiAgICB0aXRsZTogJ0hUTUwgUmVmZXJlbmNlJyxcclxuICAgIGNvbnRlbnQ6ICfpppbpobUnLFxyXG4gICAgc3JjOiAnLi9zdmcvZXhhbXBsZS5zdmcnLFxyXG4gICAgbGlua0hyZWY6ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQnLFxyXG4gICAgcmVmZXJlbmNlOiAnamF2YXNjcmlwdCdcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiAnSFRNTCBBdHRyaWJ1dGUgUmVmZXJlbmNlJyxcclxuICAgIGNvbnRlbnQ6ICdIVE1MJyxcclxuICAgIHNyYzogJy4vc3ZnL2V4YW1wbGUuc3ZnJyxcclxuICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9hdHRyaWJ1dGVzLmFzcCcsXHJcbiAgICByZWZlcmVuY2U6ICdqYXZhc2NyaXB0J1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGl0bGU6ICdnbHlwaHMo56ym5Y+3KScsXHJcbiAgICBjb250ZW50OiAnSmF2YXNjcmlwdCcsXHJcbiAgICBzcmM6ICcuL3N2Zy9leGFtcGxlLnN2ZycsXHJcbiAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvaHRtbC9nbHlwaHMvJyxcclxuICAgICAgcmVmZXJlbmNlOiAnY3NzJ1xyXG4gIH0sXHJcbiAgICB7XHJcbiAgICB0aXRsZTogJ2dseXBocyjnrKblj7cpJyxcclxuICAgIGNvbnRlbnQ6ICdKYXZhc2NyaXB0JyxcclxuICAgIHNyYzogJy4vc3ZnL2V4YW1wbGUuc3ZnJyxcclxuICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9odG1sL2dseXBocy8nLFxyXG4gICAgcmVmZXJlbmNlOiAnaHRtbCdcclxuICB9LFxyXG4gICAge1xyXG4gICAgdGl0bGU6ICdnbHlwaHMo56ym5Y+3KScsXHJcbiAgICBjb250ZW50OiAnSmF2YXNjcmlwdCcsXHJcbiAgICBzcmM6ICcuL3N2Zy9leGFtcGxlLnN2ZycsXHJcbiAgICBsaW5rSHJlZjogJ2h0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvaHRtbC9nbHlwaHMvJyxcclxuICAgIHJlZmVyZW5jZTogJ2ljb24nXHJcbiAgfVxyXG5dXHJcblxyXG5jb25zdCBlbHMgPSB7XHJcbiAgbWFpbkNvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50X3dyYXBwZXInKSxcclxuICBsZWZ0Q29udHJvbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfY29udHJvbCcpLFxyXG4gIGxlZnRNZW51SXRlbXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X21lbnVfaXRlbXMnKSxcclxuICBncm91cEl0ZW1zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JvdXBfaXRlbXMnKSxcclxuICBzZWN0aW9uc0NvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY3Rpb25fZ3JvdXBzJylcclxufVxyXG5cclxuY29uc3QgZnJhZ21lbnRFbGVtZW50cyA9IHtcclxuICBtZW51SXRlbXNGcmFnbWVudDogZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gIGNhcmRzRnJhZ21lbnQ6IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG59XHJcblxyXG5yZXNvdXJjZXMuZm9yRWFjaChyZXNvdXJjZSA9PiB7XHJcbiAgZnJhZ21lbnRFbGVtZW50cy5tZW51SXRlbXNGcmFnbWVudC5hcHBlbmQoZ2VuZXJhdGVJdGVtKHJlc291cmNlKSk7XHJcbiAgZnJhZ21lbnRFbGVtZW50cy5jYXJkc0ZyYWdtZW50LmFwcGVuZChyZW5kZXJDYXJkKHJlc291cmNlKSk7XHJcbn0pO1xyXG5cclxuZWxzLmxlZnRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2lkZUJhcik7XHJcbmVscy5sZWZ0TWVudUl0ZW1zLmFwcGVuZENoaWxkKGZyYWdtZW50RWxlbWVudHMubWVudUl0ZW1zRnJhZ21lbnQpO1xyXG5lbHMuc2VjdGlvbnNDb250YWluZXIuaW5uZXJIVE1MID0gcmVuZGVyU2VjdGlvbigpO1xyXG5lbHMuZ3JvdXBJdGVtcy5hcHBlbmRDaGlsZChmcmFnbWVudEVsZW1lbnRzLmNhcmRzRnJhZ21lbnQpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclNlY3Rpb24oKSB7XHJcbiAgY29uc3QgdGFncyA9IHJlc291cmNlcy5tYXAocmVzb3VyY2UgPT4gcmVzb3VyY2UucmVmZXJlbmNlKTtcclxuICBjb25zdCBzZWN0aW9uVGl0bGUgPSBoZWxwZXIudW5pcXVlQXJyYXkodGFncyk7XHJcbiAgY29uc3Qgc2VjdGlvbk1ha3J1cCA9IGNyZWF0ZVNlY3Rpb24oc2VjdGlvblRpdGxlKTtcclxuICByZXR1cm4gc2VjdGlvbk1ha3J1cDtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU2lkZUJhcihlKSB7XHJcbiAgZWxzLm1haW5Db250ZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xyXG59Il0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMMnB6TDJOdmJYQnZibVZ1ZEhNdlEyRnlaQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZZMjl0Y0c5dVpXNTBjeTlJWld4d1pYSXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyTnZiWEJ2Ym1WdWRITXZUV1Z1ZFVsMFpXMXpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OWpiMjF3YjI1bGJuUnpMMU5sWTNScGIyNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyMWhhVzR1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0UlFVRkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk96czdVVUZIUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc01FTkJRVEJETEdkRFFVRm5RenRSUVVNeFJUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxIZEVRVUYzUkN4clFrRkJhMEk3VVVGRE1VVTdVVUZEUVN4cFJFRkJhVVFzWTBGQll6dFJRVU12UkRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEVzZVVOQlFYbERMR2xEUVVGcFF6dFJRVU14UlN4blNFRkJaMGdzYlVKQlFXMUNMRVZCUVVVN1VVRkRja2s3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3d5UWtGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3VVVGRGRrUXNhVU5CUVdsRExHVkJRV1U3VVVGRGFFUTdVVUZEUVR0UlFVTkJPenRSUVVWQk8xRkJRMEVzYzBSQlFYTkVMQ3RFUVVFclJEczdVVUZGY2tnN1VVRkRRVHM3TzFGQlIwRTdVVUZEUVRzN096czdPenM3T3pzN096dEJRMnhHUVR0QlFVRkJPMEZCUVcxRE96dEJRVVZ1UXl3NFFrRkJPRUlzSzBKQlFTdENPMEZCUXpkRU8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSV1VzZVVWQlFWVXNSVUZCUXpzN096czdPenM3T3pzN096czdRVU40UXpGQ08wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTk9RVHRCUVVGQk8wRkJRV1VzZFVKQlFYVkNMR1ZCUVdVN1FVRkRja1E3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRU03T3pzN096czdPenM3T3p0QlEyNUNRVHRCUVVGQk8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNiVUpCUVcxQ0xFbEJRVWs3UVVGRGRrSXNaME5CUVdkRExFbEJRVWs3UVVGRGNFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnpzN1FVRkZTRHRCUVVOQk96czdPenM3T3pzN096czdPenRCUXpGQ1FUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVRKRE8wRkJRMDg3UVVGRGEwTTdRVUZEZEVNN08wRkJSVGxETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3cwUTBGQk5FTXNjVVZCUVZrN1FVRkRlRVFzZDBOQlFYZERMR2RGUVVGVk8wRkJRMnhFTEVOQlFVTTdPMEZCUlVRN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN1FVRkRRU3gxUWtGQmRVSXNPRVJCUVd0Q08wRkJRM3BETEhkQ1FVRjNRaXh6UmtGQllUdEJRVU55UXp0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeERJaXdpWm1sc1pTSTZJbVJrWm1WaU4yVmhNbU5qTm1RNU5USmtPRGN5TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBkbUZ5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE1nUFNCN2ZUdGNibHh1SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmx4dUlGeDBYSFF2THlCRGFHVmpheUJwWmlCdGIyUjFiR1VnYVhNZ2FXNGdZMkZqYUdWY2JpQmNkRngwYVdZb2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwcElIdGNiaUJjZEZ4MFhIUnlaWFIxY200Z2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVpYaHdiM0owY3p0Y2JpQmNkRngwZlZ4dUlGeDBYSFF2THlCRGNtVmhkR1VnWVNCdVpYY2diVzlrZFd4bElDaGhibVFnY0hWMElHbDBJR2x1ZEc4Z2RHaGxJR05oWTJobEtWeHVJRngwWEhSMllYSWdiVzlrZFd4bElEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMGdQU0I3WEc0Z1hIUmNkRngwYVRvZ2JXOWtkV3hsU1dRc1hHNGdYSFJjZEZ4MGJEb2dabUZzYzJVc1hHNGdYSFJjZEZ4MFpYaHdiM0owY3pvZ2UzMWNiaUJjZEZ4MGZUdGNibHh1SUZ4MFhIUXZMeUJGZUdWamRYUmxJSFJvWlNCdGIyUjFiR1VnWm5WdVkzUnBiMjVjYmlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JpQmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUlGeDBYSFJ0YjJSMWJHVXViQ0E5SUhSeWRXVTdYRzVjYmlCY2RGeDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNiaUJjZEZ4MGNtVjBkWEp1SUcxdlpIVnNaUzVsZUhCdmNuUnpPMXh1SUZ4MGZWeHVYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxjeUJ2WW1wbFkzUWdLRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMThwWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTBnUFNCdGIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWpJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjenRjYmx4dUlGeDBMeThnWkdWbWFXNWxJR2RsZEhSbGNpQm1kVzVqZEdsdmJpQm1iM0lnYUdGeWJXOXVlU0JsZUhCdmNuUnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpMQ0J1WVcxbExDQm5aWFIwWlhJcElIdGNiaUJjZEZ4MGFXWW9JVjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlobGVIQnZjblJ6TENCdVlXMWxLU2tnZTF4dUlGeDBYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQnVZVzFsTENCN0lHVnVkVzFsY21GaWJHVTZJSFJ5ZFdVc0lHZGxkRG9nWjJWMGRHVnlJSDBwTzF4dUlGeDBYSFI5WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJrWldacGJtVWdYMTlsYzAxdlpIVnNaU0J2YmlCbGVIQnZjblJ6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbklnUFNCbWRXNWpkR2x2YmlobGVIQnZjblJ6S1NCN1hHNGdYSFJjZEdsbUtIUjVjR1Z2WmlCVGVXMWliMndnSVQwOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUZONWJXSnZiQzUwYjFOMGNtbHVaMVJoWnlrZ2UxeHVJRngwWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JUZVcxaWIyd3VkRzlUZEhKcGJtZFVZV2NzSUhzZ2RtRnNkV1U2SUNkTmIyUjFiR1VuSUgwcE8xeHVJRngwWEhSOVhHNGdYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQW5YMTlsYzAxdlpIVnNaU2NzSUhzZ2RtRnNkV1U2SUhSeWRXVWdmU2s3WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJqY21WaGRHVWdZU0JtWVd0bElHNWhiV1Z6Y0dGalpTQnZZbXBsWTNSY2JpQmNkQzh2SUcxdlpHVWdKaUF4T2lCMllXeDFaU0JwY3lCaElHMXZaSFZzWlNCcFpDd2djbVZ4ZFdseVpTQnBkRnh1SUZ4MEx5OGdiVzlrWlNBbUlESTZJRzFsY21kbElHRnNiQ0J3Y205d1pYSjBhV1Z6SUc5bUlIWmhiSFZsSUdsdWRHOGdkR2hsSUc1elhHNGdYSFF2THlCdGIyUmxJQ1lnTkRvZ2NtVjBkWEp1SUhaaGJIVmxJSGRvWlc0Z1lXeHlaV0ZrZVNCdWN5QnZZbXBsWTNSY2JpQmNkQzh2SUcxdlpHVWdKaUE0ZkRFNklHSmxhR0YyWlNCc2FXdGxJSEpsY1hWcGNtVmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWRDQTlJR1oxYm1OMGFXOXVLSFpoYkhWbExDQnRiMlJsS1NCN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBeEtTQjJZV3gxWlNBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9kbUZzZFdVcE8xeHVJRngwWEhScFppaHRiMlJsSUNZZ09Da2djbVYwZFhKdUlIWmhiSFZsTzF4dUlGeDBYSFJwWmlnb2JXOWtaU0FtSURRcElDWW1JSFI1Y0dWdlppQjJZV3gxWlNBOVBUMGdKMjlpYW1WamRDY2dKaVlnZG1Gc2RXVWdKaVlnZG1Gc2RXVXVYMTlsYzAxdlpIVnNaU2tnY21WMGRYSnVJSFpoYkhWbE8xeHVJRngwWEhSMllYSWdibk1nUFNCUFltcGxZM1F1WTNKbFlYUmxLRzUxYkd3cE8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuSW9ibk1wTzF4dUlGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2JuTXNJQ2RrWldaaGRXeDBKeXdnZXlCbGJuVnRaWEpoWW14bE9pQjBjblZsTENCMllXeDFaVG9nZG1Gc2RXVWdmU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUF5SUNZbUlIUjVjR1Z2WmlCMllXeDFaU0FoUFNBbmMzUnlhVzVuSnlrZ1ptOXlLSFpoY2lCclpYa2dhVzRnZG1Gc2RXVXBJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNodWN5d2dhMlY1TENCbWRXNWpkR2x2YmloclpYa3BJSHNnY21WMGRYSnVJSFpoYkhWbFcydGxlVjA3SUgwdVltbHVaQ2h1ZFd4c0xDQnJaWGtwS1R0Y2JpQmNkRngwY21WMGRYSnVJRzV6TzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWjJWMFJHVm1ZWFZzZEVWNGNHOXlkQ0JtZFc1amRHbHZiaUJtYjNJZ1kyOXRjR0YwYVdKcGJHbDBlU0IzYVhSb0lHNXZiaTFvWVhKdGIyNTVJRzF2WkhWc1pYTmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJpQTlJR1oxYm1OMGFXOXVLRzF2WkhWc1pTa2dlMXh1SUZ4MFhIUjJZWElnWjJWMGRHVnlJRDBnYlc5a2RXeGxJQ1ltSUcxdlpIVnNaUzVmWDJWelRXOWtkV3hsSUQ5Y2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUkVaV1poZFd4MEtDa2dleUJ5WlhSMWNtNGdiVzlrZFd4bFd5ZGtaV1poZFd4MEoxMDdJSDBnT2x4dUlGeDBYSFJjZEdaMWJtTjBhVzl1SUdkbGRFMXZaSFZzWlVWNGNHOXlkSE1vS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1U3SUgwN1hHNGdYSFJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDaG5aWFIwWlhJc0lDZGhKeXdnWjJWMGRHVnlLVHRjYmlCY2RGeDBjbVYwZFhKdUlHZGxkSFJsY2p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2SUQwZ1puVnVZM1JwYjI0b2IySnFaV04wTENCd2NtOXdaWEowZVNrZ2V5QnlaWFIxY200Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcE95QjlPMXh1WEc0Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pjSWp0Y2JseHVYRzRnWEhRdkx5Qk1iMkZrSUdWdWRISjVJRzF2WkhWc1pTQmhibVFnY21WMGRYSnVJR1Y0Y0c5eWRITmNiaUJjZEhKbGRIVnliaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0Y5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWN5QTlJREFwTzF4dUlpd2lhVzF3YjNKMElDb2dZWE1nYUdWc2NHVnlJR1p5YjIwZ1hDSXVMMGhsYkhCbGNsd2lPMXh5WEc1Y2NseHVZMjl1YzNRZ2NtVnVaR1Z5UTJGeVpDQTlJR1oxYm1OMGFXOXVJQ2g3SUhOeVl5d2dkR2wwYkdVc0lHTnZiblJsYm5Rc0lHeHBibXRJY21WbWZTa2dlMXh5WEc0Z0lHTnZibk4wSUd4cElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENnbmJHa25LVHRjY2x4dUlDQnNhUzVqYkdGemMwNWhiV1VnUFNBblozSnZkWEJmYVhSbGJTQmpiMnd6Snp0Y2NseHVJQ0JjY2x4dUlDQmpiMjV6ZENCc2FXNXJJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25ZU2NwTzF4eVhHNGdJR3hwYm1zdVkyeGhjM05PWVcxbElEMGdKMmR5YjNWd1gybDBaVzFmYkdsdWF5YzdYSEpjYmlBZ2JHbHVheTVvY21WbUlEMGdiR2x1YTBoeVpXWTdYSEpjYmlBZ2JHbHVheTVoYkhRZ1BTQmpiMjUwWlc1ME8xeHlYRzVjY2x4dUlDQmpiMjV6ZENCallYSmtJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25aR2wySnlrN1hISmNiaUFnWTJGeVpDNWpiR0Z6YzA1aGJXVWdQU0FuWTJGeVpDYzdYSEpjYmlBZ1hISmNiaUFnWTI5dWMzUWdZMkZ5WkVsamIyNGdQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZHBiV2NuS1R0Y2NseHVJQ0JqWVhKa1NXTnZiaTVqYkdGemMwNWhiV1VnUFNCY0ltTmhjbVJmYVdOdmJsd2lYSEpjYmlBZ1kyRnlaRWxqYjI0dVlXeDBJRDBnZEdsMGJHVTdYSEpjYmlBZ1kyRnlaRWxqYjI0dWMzSmpJRDBnYzNKak8xeHlYRzVjY2x4dUlDQmpiMjV6ZENCallYSmtRbTlrZVNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BPMXh5WEc0Z0lHTmhjbVJDYjJSNUxtTnNZWE56VG1GdFpTQTlJQ2RqWVhKa1gySnZaSGtuTzF4eVhHNWNjbHh1SUNCamIyNXpkQ0JqWVhKa1ZHbDBiR1VnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RvTkNjcE8xeHlYRzRnSUdOaGNtUlVhWFJzWlM1amJHRnpjMDVoYldVZ1BTQW5ZMkZ5WkY5MGFYUnNaU2M3WEhKY2JpQWdZMkZ5WkZScGRHeGxMblJsZUhSRGIyNTBaVzUwSUQwZ2RHbDBiR1U3WEhKY2JseHlYRzRnSUdOdmJuTjBJR05oY21SVVpYaDBJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25jQ2NwTzF4eVhHNGdJR05oY21SVVpYaDBMbU5zWVhOelRtRnRaU0E5SUNkallYSmtYM1JsZUhRbk8xeHlYRzRnSUdOaGNtUlVaWGgwTG1Gd2NHVnVaRU5vYVd4a0tHUnZZM1Z0Wlc1MExtTnlaV0YwWlZSbGVIUk9iMlJsS0dOdmJuUmxiblFwS1R0Y2NseHVYSEpjYmlBZ1kyRnlaRUp2WkhrdVlYQndaVzVrUTJocGJHUW9ZMkZ5WkZScGRHeGxLVHRjY2x4dUlDQmpZWEprUW05a2VTNWhjSEJsYm1SRGFHbHNaQ2hqWVhKa1ZHVjRkQ2s3WEhKY2JpQWdZMkZ5WkM1aGNIQmxibVJEYUdsc1pDaGpZWEprU1dOdmJpazdYSEpjYmlBZ1kyRnlaQzVoY0hCbGJtUkRhR2xzWkNoallYSmtRbTlrZVNrN1hISmNiaUFnYkdsdWF5NWhjSEJsYm1SRGFHbHNaQ2hqWVhKa0tUdGNjbHh1SUNCc2FTNWhjSEJsYm1SRGFHbHNaQ2hzYVc1cktUdGNjbHh1WEhKY2JpQWdjbVYwZFhKdUlHeHBPMXh5WEc1OVhISmNibHh5WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0J5Wlc1a1pYSkRZWEprTzF4eVhHNWNjbHh1SWl3aVkyOXVjM1FnZEhKMWJtTmhkR1ZUZEhKcGJtY2dQU0JtZFc1amRHbHZiaUIwY25WdVkyRjBaVk4wY21sdVp5aHpkSElzSUc1MWJUMHlNQ2tnZTF4eVhHNGdJSEpsZEhWeWJpQnpkSEl1YkdWdVozUm9JRHdnYm5WdElEOGdjM1J5SURvZ2MzUnlMbk5zYVdObEtEQXNJRzUxYlNrZ0t5QW5MaTR1Snp0Y2NseHVmVnh5WEc1Y2NseHVZMjl1YzNRZ2RXNXBjWFZsUVhKeVlYa2dQU0JtZFc1amRHbHZiaWhoY25KaGVTa2dlMXh5WEc0Z0lISmxkSFZ5YmlCYkxpNHVibVYzSUZObGRDaGhjbkpoZVNsZE8xeHlYRzU5WEhKY2JtVjRjRzl5ZENCN2RISjFibU5oZEdWVGRISnBibWNzSUhWdWFYRjFaVUZ5Y21GNWZUc2lMQ0psZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQm5aVzVsY21GMFpVbDBaVzBvZXlCemNtTXNJR052Ym5SbGJuUWdmU2tnZTF4eVhHNGdJR052Ym5OMElHeHBJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25iR2tuS1R0Y2NseHVJQ0JzYVM1amJHRnpjMDVoYldVZ1BTQW5iR1ZtZEY5dFpXNTFYMmwwWlcwbk8xeHlYRzRnSUZ4eVhHNGdJR052Ym5OMElHbGpiMjRnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2R6Y0dGdUp5azdYSEpjYmlBZ2FXTnZiaTVqYkdGemMwNWhiV1VnUFNBbmJXVnVkVjlwZEdWdFgybGpiMjRuTzF4eVhHNGdJRnh5WEc0Z0lHTnZibk4wSUdsdFp5QTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oybHRaeWNwTzF4eVhHNGdJR2x0Wnk1emNtTWdQU0J6Y21NN1hISmNibHh5WEc0Z0lHTnZibk4wSUhBZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nkd0p5azdYSEpjYmlBZ2NDNWpiR0Z6YzA1aGJXVWdQU0FuYldWdWRWOXBkR1Z0WDJOdmJuUmxiblFuTzF4eVhHNGdJSEF1WVhCd1pXNWtRMmhwYkdRb1pHOWpkVzFsYm5RdVkzSmxZWFJsVkdWNGRFNXZaR1VvWTI5dWRHVnVkQ2twTzF4eVhHNWNjbHh1SUNCcFkyOXVMbUZ3Y0dWdVpFTm9hV3hrS0dsdFp5azdYSEpjYmlBZ2JHa3VZWEJ3Wlc1a1EyaHBiR1FvYVdOdmJpazdYSEpjYmlBZ2JHa3VZWEJ3Wlc1a1EyaHBiR1FvY0NrN1hISmNibHh5WEc0Z0lISmxkSFZ5YmlCc2FUdGNjbHh1ZlNJc0ltWjFibU4wYVc5dUlHTnlaV0YwWlZObFkzUnBiMjVYYVhSb1NXNXVaWEpJVkUxTUtIUmhaM01wSUh0Y2NseHVJQ0JqYjI1emRDQnliM2R6SUQwZ2RHRm5jeTV0WVhBb2RHRm5QVDRnZTF4eVhHNGdJQ0FnY21WMGRYSnVJR0JjY2x4dUlDQWdJRHh6WldOMGFXOXVJR2xrUFZ3aUpIdDBZV2Q5WENJZ1kyeGhjM005WENKbmNtOTFjRndpSUQ1Y2NseHVJQ0FnSUNBZ1BHZ3pJR05zWVhOelBWd2laM0p2ZFhCZmRHbDBiR1ZjSWo0a2UzUmhaMzA4TDJnelBseHlYRzRnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpWjNKdmRYQmZZMjl1ZEdWdWRGd2lQbHh5WEc0Z0lDQWdJQ0FnSUR4MWJDQmpiR0Z6Y3oxY0luSnZkeUJuY205MWNGOXBkR1Z0YzF3aVBseHlYRzRnSUNBZ0lDQWdJQ0FnUEd4cElHTnNZWE56UFZ3aVozSnZkWEJmYVhSbGJTQmpiMnd6WENJK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4aElHTnNZWE56UFZ3aVozSnZkWEJmYVhSbGJWOXNhVzVyWENJZ2FISmxaajFjSW1oMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpWENJZ2RHRnlaMlYwUFZ3aVgySnNZVzVyWENJK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbU5oY21SY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhwYldjZ1kyeGhjM005WENKallYSmtYMmxqYjI1Y0lpQnpjbU05WENJdUwybHRaeTl0Wkc0dWNHNW5YQ0krWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2lZMkZ5WkY5aWIyUjVYQ0krWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeG9OQ0JqYkdGemN6MWNJbU5oY21SZmRHbDBiR1ZjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JYWldJZ1ZHVmphRzV2Ykc5bmVUd3ZhRFErWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdJR05zWVhOelBWd2lZMkZ5WkY5MFpYaDBYQ0krNUxpQTVMaXE1WW1ONTZ1djVhMm01TG1nNkxldjViNkVQQzl3UGx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEd3ZZVDVjY2x4dUlDQWdJQ0FnSUNBZ0lEd3ZiR2srWEhKY2JpQWdJQ0FnSUNBZ1BDOTFiRDVjY2x4dUlDQWdJQ0FnUEM5a2FYWStYSEpjYmlBZ0lDQThMM05sWTNScGIyNCtYSEpjYmlBZ0lDQmdPMXh5WEc0Z0lIMHBYSEpjYmx4eVhHNGdJSEpsZEhWeWJpQnliM2R6TG1wdmFXNG9KeUFuS1R0Y2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElIdGpjbVZoZEdWVFpXTjBhVzl1VjJsMGFFbHVibVZ5U0ZSTlRIMDdJaXdpYVcxd2IzSjBJSEpsYm1SbGNrTmhjbVFnWm5KdmJTQmNJaTR2WTI5dGNHOXVaVzUwY3k5RFlYSmtYQ0k3WEhKY2JtbHRjRzl5ZENCblpXNWxjbUYwWlVsMFpXMGdabkp2YlNCY0lpNHZZMjl0Y0c5dVpXNTBjeTlOWlc1MVNYUmxiWE5jSWp0Y2NseHVhVzF3YjNKMElIc2dZM0psWVhSbFUyVmpkR2x2YmxkcGRHaEpibTVsY2toVVRVd2dZWE1nWTNKbFlYUmxVMlZqZEdsdmJpQjlJQ0JtY205dElGd2lMaTlqYjIxd2IyNWxiblJ6TDFObFkzUnBiMjVjSWp0Y2NseHVhVzF3YjNKMElDb2dZWE1nYUdWc2NHVnlJR1p5YjIwZ1hDSXVMMk52YlhCdmJtVnVkSE12U0dWc2NHVnlYQ0k3WEhKY2JseHlYRzVqYjI1emRDQnlaWE52ZFhKalpYTWdQU0JiWEhKY2JpQWdlMXh5WEc0Z0lDQWdkR2wwYkdVNklDZElWRTFNSUZKbFptVnlaVzVqWlNjc1hISmNiaUFnSUNCamIyNTBaVzUwT2lBbjZhYVc2YUcxSnl4Y2NseHVJQ0FnSUhOeVl6b2dKeTR2YzNabkwyVjRZVzF3YkdVdWMzWm5KeXhjY2x4dUlDQWdJR3hwYm10SWNtVm1PaUFuYUhSMGNITTZMeTlrWlhabGJHOXdaWEl1Ylc5NmFXeHNZUzV2Y21jdlpXNHRWVk12Wkc5amN5OVhaV0l2U0ZSTlRDOUZiR1Z0Wlc1MEp5eGNjbHh1SUNBZ0lISmxabVZ5Wlc1alpUb2dKMnBoZG1GelkzSnBjSFFuWEhKY2JpQWdmU3hjY2x4dUlDQjdYSEpjYmlBZ0lDQjBhWFJzWlRvZ0owaFVUVXdnUVhSMGNtbGlkWFJsSUZKbFptVnlaVzVqWlNjc1hISmNiaUFnSUNCamIyNTBaVzUwT2lBblNGUk5UQ2NzWEhKY2JpQWdJQ0J6Y21NNklDY3VMM04yWnk5bGVHRnRjR3hsTG5OMlp5Y3NYSEpjYmlBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZkM2QzTG5jemMyTm9iMjlzY3k1amIyMHZkR0ZuY3k5eVpXWmZZWFIwY21saWRYUmxjeTVoYzNBbkxGeHlYRzRnSUNBZ2NtVm1aWEpsYm1ObE9pQW5hbUYyWVhOamNtbHdkQ2RjY2x4dUlDQjlMRnh5WEc0Z0lIdGNjbHh1SUNBZ0lIUnBkR3hsT2lBbloyeDVjR2h6S09lc3B1V1B0eWtuTEZ4eVhHNGdJQ0FnWTI5dWRHVnVkRG9nSjBwaGRtRnpZM0pwY0hRbkxGeHlYRzRnSUNBZ2MzSmpPaUFuTGk5emRtY3ZaWGhoYlhCc1pTNXpkbWNuTEZ4eVhHNGdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJOemN5MTBjbWxqYTNNdVkyOXRMM051YVhCd1pYUnpMMmgwYld3dloyeDVjR2h6THljc1hISmNiaUFnSUNBZ0lISmxabVZ5Wlc1alpUb2dKMk56Y3lkY2NseHVJQ0I5TEZ4eVhHNGdJQ0FnZTF4eVhHNGdJQ0FnZEdsMGJHVTZJQ2RuYkhsd2FITW81NnltNVkrM0tTY3NYSEpjYmlBZ0lDQmpiMjUwWlc1ME9pQW5TbUYyWVhOamNtbHdkQ2NzWEhKY2JpQWdJQ0J6Y21NNklDY3VMM04yWnk5bGVHRnRjR3hsTG5OMlp5Y3NYSEpjYmlBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZZM056TFhSeWFXTnJjeTVqYjIwdmMyNXBjSEJsZEhNdmFIUnRiQzluYkhsd2FITXZKeXhjY2x4dUlDQWdJSEpsWm1WeVpXNWpaVG9nSjJoMGJXd25YSEpjYmlBZ2ZTeGNjbHh1SUNBZ0lIdGNjbHh1SUNBZ0lIUnBkR3hsT2lBbloyeDVjR2h6S09lc3B1V1B0eWtuTEZ4eVhHNGdJQ0FnWTI5dWRHVnVkRG9nSjBwaGRtRnpZM0pwY0hRbkxGeHlYRzRnSUNBZ2MzSmpPaUFuTGk5emRtY3ZaWGhoYlhCc1pTNXpkbWNuTEZ4eVhHNGdJQ0FnYkdsdWEwaHlaV1k2SUNkb2RIUndjem92TDJOemN5MTBjbWxqYTNNdVkyOXRMM051YVhCd1pYUnpMMmgwYld3dloyeDVjR2h6THljc1hISmNiaUFnSUNCeVpXWmxjbVZ1WTJVNklDZHBZMjl1SjF4eVhHNGdJSDFjY2x4dVhWeHlYRzVjY2x4dVkyOXVjM1FnWld4eklEMGdlMXh5WEc0Z0lHMWhhVzVEYjI1MFpXNTBPaUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY2pZMjl1ZEdWdWRGOTNjbUZ3Y0dWeUp5a3NYSEpjYmlBZ2JHVm1kRU52Ym5SeWIydzZJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXNaV1owWDJOdmJuUnliMnduS1N4Y2NseHVJQ0JzWldaMFRXVnVkVWwwWlcxek9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJHVm1kRjl0Wlc1MVgybDBaVzF6Snlrc1hISmNiaUFnWjNKdmRYQkpkR1Z0Y3pvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1keWIzVndYMmwwWlcxekp5a3NYSEpjYmlBZ2MyVmpkR2x2Ym5ORGIyNTBZV2x1WlhJNklHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnlOelpXTjBhVzl1WDJkeWIzVndjeWNwWEhKY2JuMWNjbHh1WEhKY2JtTnZibk4wSUdaeVlXZHRaVzUwUld4bGJXVnVkSE1nUFNCN1hISmNiaUFnYldWdWRVbDBaVzF6Um5KaFoyMWxiblE2SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVJ2WTNWdFpXNTBSbkpoWjIxbGJuUW9LU3hjY2x4dUlDQmpZWEprYzBaeVlXZHRaVzUwT2lCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZFYjJOMWJXVnVkRVp5WVdkdFpXNTBLQ2xjY2x4dWZWeHlYRzVjY2x4dWNtVnpiM1Z5WTJWekxtWnZja1ZoWTJnb2NtVnpiM1Z5WTJVZ1BUNGdlMXh5WEc0Z0lHWnlZV2R0Wlc1MFJXeGxiV1Z1ZEhNdWJXVnVkVWwwWlcxelJuSmhaMjFsYm5RdVlYQndaVzVrS0dkbGJtVnlZWFJsU1hSbGJTaHlaWE52ZFhKalpTa3BPMXh5WEc0Z0lHWnlZV2R0Wlc1MFJXeGxiV1Z1ZEhNdVkyRnlaSE5HY21GbmJXVnVkQzVoY0hCbGJtUW9jbVZ1WkdWeVEyRnlaQ2h5WlhOdmRYSmpaU2twTzF4eVhHNTlLVHRjY2x4dVhISmNibVZzY3k1c1pXWjBRMjl1ZEhKdmJDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lIUnZaMmRzWlZOcFpHVkNZWElwTzF4eVhHNWxiSE11YkdWbWRFMWxiblZKZEdWdGN5NWhjSEJsYm1SRGFHbHNaQ2htY21GbmJXVnVkRVZzWlcxbGJuUnpMbTFsYm5WSmRHVnRjMFp5WVdkdFpXNTBLVHRjY2x4dVpXeHpMbk5sWTNScGIyNXpRMjl1ZEdGcGJtVnlMbWx1Ym1WeVNGUk5UQ0E5SUhKbGJtUmxjbE5sWTNScGIyNG9LVHRjY2x4dVpXeHpMbWR5YjNWd1NYUmxiWE11WVhCd1pXNWtRMmhwYkdRb1puSmhaMjFsYm5SRmJHVnRaVzUwY3k1allYSmtjMFp5WVdkdFpXNTBLVHRjY2x4dVhISmNibHh5WEc1bWRXNWpkR2x2YmlCeVpXNWtaWEpUWldOMGFXOXVLQ2tnZTF4eVhHNGdJR052Ym5OMElIUmhaM01nUFNCeVpYTnZkWEpqWlhNdWJXRndLSEpsYzI5MWNtTmxJRDArSUhKbGMyOTFjbU5sTG5KbFptVnlaVzVqWlNrN1hISmNiaUFnWTI5dWMzUWdjMlZqZEdsdmJsUnBkR3hsSUQwZ2FHVnNjR1Z5TG5WdWFYRjFaVUZ5Y21GNUtIUmhaM01wTzF4eVhHNGdJR052Ym5OMElITmxZM1JwYjI1TllXdHlkWEFnUFNCamNtVmhkR1ZUWldOMGFXOXVLSE5sWTNScGIyNVVhWFJzWlNrN1hISmNiaUFnY21WMGRYSnVJSE5sWTNScGIyNU5ZV3R5ZFhBN1hISmNibjFjY2x4dVhISmNibVoxYm1OMGFXOXVJSFJ2WjJkc1pWTnBaR1ZDWVhJb1pTa2dlMXh5WEc0Z0lHVnNjeTV0WVdsdVEyOXVkR1Z1ZEM1amJHRnpjMHhwYzNRdWRHOW5aMnhsS0Nkb2FXUmtaVzRuS1R0Y2NseHVmU0pkTENKemIzVnlZMlZTYjI5MElqb2lJbjA9In0=
