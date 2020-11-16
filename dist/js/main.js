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

/* harmony default export */ __webpack_exports__["default"] = (renderCard);



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
  fragmentElements.menuItemsFragment.append(Object(_components_MenuItems__WEBPACK_IMPORTED_MODULE_1__["default"])(resource));
  fragmentElements.cardsFragment.append(Object(_components_Card__WEBPACK_IMPORTED_MODULE_0__["default"])(resource));
});

elements.leftControl.addEventListener('click', toggleSideBar);
elements.leftMenuItems.appendChild(fragmentElements.menuItemsFragment);
elements.groupItems.appendChild(fragmentElements.cardsFragment);

function toggleSideBar(e) {
  elements.mainContent.classList.toggle('hidden');
}

/***/ }),

/***/ 0:
/*!*******************************************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/components/Card.js ./src/js/components/MenuItems.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\components\Card.js */"./src/js/components/Card.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\components\MenuItems.js */"./src/js/components/MenuItems.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9NZW51SXRlbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBLDhCQUE4QiwrQkFBK0I7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFZSx5RUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7OztBQ3RDMUI7QUFBQTtBQUFlLHVCQUF1QixlQUFlO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQTJDO0FBQ087O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxxRUFBWTtBQUN4RCx3Q0FBd0MsZ0VBQVU7QUFDbEQsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IHJlbmRlckNhcmQgPSBmdW5jdGlvbiAoeyBzcmMsIHRpdGxlLCBjb250ZW50LCBsaW5rSHJlZn0pIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgbGkuY2xhc3NOYW1lID0gJ2dyb3VwX2l0ZW0gY29sMyc7XHJcbiAgXHJcbiAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICBsaW5rLmNsYXNzTmFtZSA9ICdncm91cF9pdGVtX2xpbmsnO1xyXG4gIGxpbmsuaHJlZiA9IGxpbmtIcmVmO1xyXG4gIGxpbmsuYWx0ID0gY29udGVudDtcclxuXHJcbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNhcmQuY2xhc3NOYW1lID0gJ2NhcmQnO1xyXG4gIFxyXG4gIGNvbnN0IGNhcmRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgY2FyZEljb24uY2xhc3NOYW1lID0gXCJjYXJkX2ljb25cIlxyXG4gIGNhcmRJY29uLmFsdCA9IHRpdGxlO1xyXG4gIGNhcmRJY29uLnNyYyA9IHNyYztcclxuXHJcbiAgY29uc3QgY2FyZEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjYXJkQm9keS5jbGFzc05hbWUgPSAnY2FyZF9ib2R5JztcclxuXHJcbiAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICBjYXJkVGl0bGUuY2xhc3NOYW1lID0gJ2NhcmRfdGl0bGUnO1xyXG4gIGNhcmRUaXRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aXRsZSkpO1xyXG5cclxuICBjb25zdCBjYXJkVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICBjYXJkVGV4dC5jbGFzc05hbWUgPSAnY2FyZF90ZXh0JztcclxuICBjYXJkVGV4dC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XHJcblxyXG4gIGNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRUaXRsZSk7XHJcbiAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZFRleHQpO1xyXG4gIGNhcmQuYXBwZW5kQ2hpbGQoY2FyZEljb24pO1xyXG4gIGNhcmQuYXBwZW5kQ2hpbGQoY2FyZEJvZHkpO1xyXG4gIGxpbmsuYXBwZW5kQ2hpbGQoY2FyZCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG4gIHJldHVybiBsaTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyQ2FyZDtcclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlSXRlbSh7IHNyYywgY29udGVudCB9KSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIGxpLmNsYXNzTmFtZSA9ICdsZWZ0X21lbnVfaXRlbSc7XHJcbiAgXHJcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICBpY29uLmNsYXNzTmFtZSA9ICdtZW51X2l0ZW1faWNvbic7XHJcbiAgXHJcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgaW1nLnNyYyA9IHNyYztcclxuXHJcbiAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICBwLmNsYXNzTmFtZSA9ICdtZW51X2l0ZW1fY29udGVudCc7XHJcbiAgcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XHJcblxyXG4gIGljb24uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICBsaS5hcHBlbmRDaGlsZChpY29uKTtcclxuICBsaS5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgcmV0dXJuIGxpO1xyXG59IiwiaW1wb3J0IHJlbmRlckNhcmQgZnJvbSBcIi4vY29tcG9uZW50cy9DYXJkXCI7XHJcbmltcG9ydCBnZW5lcmF0ZUl0ZW0gZnJvbSBcIi4vY29tcG9uZW50cy9NZW51SXRlbXNcIjtcclxuXHJcbmNvbnN0IHJlc291cmNlcyA9IFtcclxuICB7XHJcbiAgICB0aXRsZTogJ0hUTUwgUmVmZXJlbmNlJyxcclxuICAgIGNvbnRlbnQ6ICfpppbpobUnLFxyXG4gICAgc3JjOiAnLi9zdmcvZXhhbXBsZS5zdmcnLFxyXG4gICAgbGlua0hyZWY6ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQnXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogJ0hUTUwgQXR0cmlidXRlIFJlZmVyZW5jZScsXHJcbiAgICBjb250ZW50OiAnSFRNTCcsXHJcbiAgICBzcmM6ICcuL3N2Zy9leGFtcGxlLnN2ZycsXHJcbiAgICBsaW5rSHJlZjogJ2h0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfYXR0cmlidXRlcy5hc3AnXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogJ2dseXBocyjnrKblj7cpJyxcclxuICAgIGNvbnRlbnQ6ICdKYXZhc2NyaXB0JyxcclxuICAgIHNyYzogJy4vc3ZnL2V4YW1wbGUuc3ZnJyxcclxuICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9odG1sL2dseXBocy8nXHJcbiAgfVxyXG5dXHJcblxyXG5jb25zdCBlbGVtZW50cyA9IHtcclxuICBtYWluQ29udGVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnRfd3JhcHBlcicpLFxyXG4gIGxlZnRDb250cm9sOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdF9jb250cm9sJyksXHJcbiAgbGVmdE1lbnVJdGVtczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfbWVudV9pdGVtcycpLFxyXG4gIGdyb3VwSXRlbXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncm91cF9pdGVtcycpXHJcbn1cclxuXHJcbmNvbnN0IGZyYWdtZW50RWxlbWVudHMgPSB7XHJcbiAgbWVudUl0ZW1zRnJhZ21lbnQ6IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICBjYXJkc0ZyYWdtZW50OiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxufVxyXG5cclxucmVzb3VyY2VzLmZvckVhY2gocmVzb3VyY2UgPT4ge1xyXG4gIGZyYWdtZW50RWxlbWVudHMubWVudUl0ZW1zRnJhZ21lbnQuYXBwZW5kKGdlbmVyYXRlSXRlbShyZXNvdXJjZSkpO1xyXG4gIGZyYWdtZW50RWxlbWVudHMuY2FyZHNGcmFnbWVudC5hcHBlbmQocmVuZGVyQ2FyZChyZXNvdXJjZSkpO1xyXG59KTtcclxuXHJcbmVsZW1lbnRzLmxlZnRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2lkZUJhcik7XHJcbmVsZW1lbnRzLmxlZnRNZW51SXRlbXMuYXBwZW5kQ2hpbGQoZnJhZ21lbnRFbGVtZW50cy5tZW51SXRlbXNGcmFnbWVudCk7XHJcbmVsZW1lbnRzLmdyb3VwSXRlbXMuYXBwZW5kQ2hpbGQoZnJhZ21lbnRFbGVtZW50cy5jYXJkc0ZyYWdtZW50KTtcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVNpZGVCYXIoZSkge1xyXG4gIGVsZW1lbnRzLm1haW5Db250ZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xyXG59Il0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMMnB6TDJOdmJYQnZibVZ1ZEhNdlEyRnlaQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZZMjl0Y0c5dVpXNTBjeTlOWlc1MVNYUmxiWE11YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMjFoYVc0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPenRCUTJ4R1FUdEJRVUZCTERoQ1FVRTRRaXdyUWtGQkswSTdRVUZETjBRN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZaU3g1UlVGQlZTeEZRVUZET3pzN096czdPenM3T3pzN096dEJRM1JETVVJN1FVRkJRVHRCUVVGbExIVkNRVUYxUWl4bFFVRmxPMEZCUTNKRU8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RE96czdPenM3T3pzN096czdRVU51UWtFN1FVRkJRVHRCUVVGQk8wRkJRVEpETzBGQlEwODdPMEZCUld4RU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTERSRFFVRTBReXh4UlVGQldUdEJRVU40UkN4M1EwRkJkME1zWjBWQlFWVTdRVUZEYkVRc1EwRkJRenM3UVVGRlJEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFTWlMQ0ptYVd4bElqb2lNVFV3TnpBMVptSmhOalZtT1dSa01qWmlPR1V1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SWdYSFF2THlCVWFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUjJZWElnYVc1emRHRnNiR1ZrVFc5a2RXeGxjeUE5SUh0OU8xeHVYRzRnWEhRdkx5QlVhR1VnY21WeGRXbHlaU0JtZFc1amRHbHZibHh1SUZ4MFpuVnVZM1JwYjI0Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aHRiMlIxYkdWSlpDa2dlMXh1WEc0Z1hIUmNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dUlGeDBYSFJwWmlocGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNrZ2UxeHVJRngwWEhSY2RISmxkSFZ5YmlCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1bGVIQnZjblJ6TzF4dUlGeDBYSFI5WEc0Z1hIUmNkQzh2SUVOeVpXRjBaU0JoSUc1bGR5QnRiMlIxYkdVZ0tHRnVaQ0J3ZFhRZ2FYUWdhVzUwYnlCMGFHVWdZMkZqYUdVcFhHNGdYSFJjZEhaaGNpQnRiMlIxYkdVZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTQTlJSHRjYmlCY2RGeDBYSFJwT2lCdGIyUjFiR1ZKWkN4Y2JpQmNkRngwWEhSc09pQm1ZV3h6WlN4Y2JpQmNkRngwWEhSbGVIQnZjblJ6T2lCN2ZWeHVJRngwWEhSOU8xeHVYRzRnWEhSY2RDOHZJRVY0WldOMWRHVWdkR2hsSUcxdlpIVnNaU0JtZFc1amRHbHZibHh1SUZ4MFhIUnRiMlIxYkdWelcyMXZaSFZzWlVsa1hTNWpZV3hzS0cxdlpIVnNaUzVsZUhCdmNuUnpMQ0J0YjJSMWJHVXNJRzF2WkhWc1pTNWxlSEJ2Y25SekxDQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLVHRjYmx4dUlGeDBYSFF2THlCR2JHRm5JSFJvWlNCdGIyUjFiR1VnWVhNZ2JHOWhaR1ZrWEc0Z1hIUmNkRzF2WkhWc1pTNXNJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJrWldacGJtVWdaMlYwZEdWeUlHWjFibU4wYVc5dUlHWnZjaUJvWVhKdGIyNTVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXNJRzVoYldVc0lHZGxkSFJsY2lrZ2UxeHVJRngwWEhScFppZ2hYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2S0dWNGNHOXlkSE1zSUc1aGJXVXBLU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z1oyVjBPaUJuWlhSMFpYSWdmU2s3WEc0Z1hIUmNkSDFjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR1JsWm1sdVpTQmZYMlZ6VFc5a2RXeGxJRzl1SUdWNGNHOXlkSE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjaUE5SUdaMWJtTjBhVzl1S0dWNGNHOXlkSE1wSUh0Y2JpQmNkRngwYVdZb2RIbHdaVzltSUZONWJXSnZiQ0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuS1NCN1hHNGdYSFJjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeXdnZXlCMllXeDFaVG9nSjAxdlpIVnNaU2NnZlNrN1hHNGdYSFJjZEgxY2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lDZGZYMlZ6VFc5a2RXeGxKeXdnZXlCMllXeDFaVG9nZEhKMVpTQjlLVHRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR055WldGMFpTQmhJR1poYTJVZ2JtRnRaWE53WVdObElHOWlhbVZqZEZ4dUlGeDBMeThnYlc5a1pTQW1JREU2SUhaaGJIVmxJR2x6SUdFZ2JXOWtkV3hsSUdsa0xDQnlaWEYxYVhKbElHbDBYRzRnWEhRdkx5QnRiMlJsSUNZZ01qb2diV1Z5WjJVZ1lXeHNJSEJ5YjNCbGNuUnBaWE1nYjJZZ2RtRnNkV1VnYVc1MGJ5QjBhR1VnYm5OY2JpQmNkQzh2SUcxdlpHVWdKaUEwT2lCeVpYUjFjbTRnZG1Gc2RXVWdkMmhsYmlCaGJISmxZV1I1SUc1eklHOWlhbVZqZEZ4dUlGeDBMeThnYlc5a1pTQW1JRGg4TVRvZ1ltVm9ZWFpsSUd4cGEyVWdjbVZ4ZFdseVpWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1MElEMGdablZ1WTNScGIyNG9kbUZzZFdVc0lHMXZaR1VwSUh0Y2JpQmNkRngwYVdZb2JXOWtaU0FtSURFcElIWmhiSFZsSUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aDJZV3gxWlNrN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBNEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkR2xtS0NodGIyUmxJQ1lnTkNrZ0ppWWdkSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iMkpxWldOMEp5QW1KaUIyWVd4MVpTQW1KaUIyWVd4MVpTNWZYMlZ6VFc5a2RXeGxLU0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdYSFJjZEhaaGNpQnVjeUE5SUU5aWFtVmpkQzVqY21WaGRHVW9iblZzYkNrN1hHNGdYSFJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpaHVjeWs3WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNodWN5d2dKMlJsWm1GMWJIUW5MQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUhaaGJIVmxPaUIyWVd4MVpTQjlLVHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JRElnSmlZZ2RIbHdaVzltSUhaaGJIVmxJQ0U5SUNkemRISnBibWNuS1NCbWIzSW9kbUZ5SUd0bGVTQnBiaUIyWVd4MVpTa2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0c1ekxDQnJaWGtzSUdaMWJtTjBhVzl1S0d0bGVTa2dleUJ5WlhSMWNtNGdkbUZzZFdWYmEyVjVYVHNnZlM1aWFXNWtLRzUxYkd3c0lHdGxlU2twTzF4dUlGeDBYSFJ5WlhSMWNtNGdibk03WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJuWlhSRVpXWmhkV3gwUlhod2IzSjBJR1oxYm1OMGFXOXVJR1p2Y2lCamIyMXdZWFJwWW1sc2FYUjVJSGRwZEdnZ2JtOXVMV2hoY20xdmJua2diVzlrZFd4bGMxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dUlEMGdablZ1WTNScGIyNG9iVzlrZFd4bEtTQjdYRzRnWEhSY2RIWmhjaUJuWlhSMFpYSWdQU0J0YjJSMWJHVWdKaVlnYlc5a2RXeGxMbDlmWlhOTmIyUjFiR1VnUDF4dUlGeDBYSFJjZEdaMWJtTjBhVzl1SUdkbGRFUmxabUYxYkhRb0tTQjdJSEpsZEhWeWJpQnRiMlIxYkdWYkoyUmxabUYxYkhRblhUc2dmU0E2WEc0Z1hIUmNkRngwWm5WdVkzUnBiMjRnWjJWMFRXOWtkV3hsUlhod2IzSjBjeWdwSUhzZ2NtVjBkWEp1SUcxdlpIVnNaVHNnZlR0Y2JpQmNkRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1a0tHZGxkSFJsY2l3Z0oyRW5MQ0JuWlhSMFpYSXBPMXh1SUZ4MFhIUnlaWFIxY200Z1oyVjBkR1Z5TzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbThnUFNCbWRXNWpkR2x2YmlodlltcGxZM1FzSUhCeWIzQmxjblI1S1NCN0lISmxkSFZ5YmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFaV04wTENCd2NtOXdaWEowZVNrN0lIMDdYRzVjYmlCY2RDOHZJRjlmZDJWaWNHRmphMTl3ZFdKc2FXTmZjR0YwYUY5ZlhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5BZ1BTQmNJbHdpTzF4dVhHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1eklEMGdNQ2s3WEc0aUxDSmpiMjV6ZENCeVpXNWtaWEpEWVhKa0lEMGdablZ1WTNScGIyNGdLSHNnYzNKakxDQjBhWFJzWlN3Z1kyOXVkR1Z1ZEN3Z2JHbHVhMGh5WldaOUtTQjdYSEpjYmlBZ1kyOXVjM1FnYkdrZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nkc2FTY3BPMXh5WEc0Z0lHeHBMbU5zWVhOelRtRnRaU0E5SUNkbmNtOTFjRjlwZEdWdElHTnZiRE1uTzF4eVhHNGdJRnh5WEc0Z0lHTnZibk4wSUd4cGJtc2dQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZGhKeWs3WEhKY2JpQWdiR2x1YXk1amJHRnpjMDVoYldVZ1BTQW5aM0p2ZFhCZmFYUmxiVjlzYVc1ckp6dGNjbHh1SUNCc2FXNXJMbWh5WldZZ1BTQnNhVzVyU0hKbFpqdGNjbHh1SUNCc2FXNXJMbUZzZENBOUlHTnZiblJsYm5RN1hISmNibHh5WEc0Z0lHTnZibk4wSUdOaGNtUWdQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZGthWFluS1R0Y2NseHVJQ0JqWVhKa0xtTnNZWE56VG1GdFpTQTlJQ2RqWVhKa0p6dGNjbHh1SUNCY2NseHVJQ0JqYjI1emRDQmpZWEprU1dOdmJpQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oybHRaeWNwTzF4eVhHNGdJR05oY21SSlkyOXVMbU5zWVhOelRtRnRaU0E5SUZ3aVkyRnlaRjlwWTI5dVhDSmNjbHh1SUNCallYSmtTV052Ymk1aGJIUWdQU0IwYVhSc1pUdGNjbHh1SUNCallYSmtTV052Ymk1emNtTWdQU0J6Y21NN1hISmNibHh5WEc0Z0lHTnZibk4wSUdOaGNtUkNiMlI1SUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWkdsMkp5azdYSEpjYmlBZ1kyRnlaRUp2WkhrdVkyeGhjM05PWVcxbElEMGdKMk5oY21SZlltOWtlU2M3WEhKY2JseHlYRzRnSUdOdmJuTjBJR05oY21SVWFYUnNaU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMmcwSnlrN1hISmNiaUFnWTJGeVpGUnBkR3hsTG1Oc1lYTnpUbUZ0WlNBOUlDZGpZWEprWDNScGRHeGxKenRjY2x4dUlDQmpZWEprVkdsMGJHVXVZWEJ3Wlc1a1EyaHBiR1FvWkc5amRXMWxiblF1WTNKbFlYUmxWR1Y0ZEU1dlpHVW9kR2wwYkdVcEtUdGNjbHh1WEhKY2JpQWdZMjl1YzNRZ1kyRnlaRlJsZUhRZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nkd0p5azdYSEpjYmlBZ1kyRnlaRlJsZUhRdVkyeGhjM05PWVcxbElEMGdKMk5oY21SZmRHVjRkQ2M3WEhKY2JpQWdZMkZ5WkZSbGVIUXVZWEJ3Wlc1a1EyaHBiR1FvWkc5amRXMWxiblF1WTNKbFlYUmxWR1Y0ZEU1dlpHVW9ZMjl1ZEdWdWRDa3BPMXh5WEc1Y2NseHVJQ0JqWVhKa1FtOWtlUzVoY0hCbGJtUkRhR2xzWkNoallYSmtWR2wwYkdVcE8xeHlYRzRnSUdOaGNtUkNiMlI1TG1Gd2NHVnVaRU5vYVd4a0tHTmhjbVJVWlhoMEtUdGNjbHh1SUNCallYSmtMbUZ3Y0dWdVpFTm9hV3hrS0dOaGNtUkpZMjl1S1R0Y2NseHVJQ0JqWVhKa0xtRndjR1Z1WkVOb2FXeGtLR05oY21SQ2IyUjVLVHRjY2x4dUlDQnNhVzVyTG1Gd2NHVnVaRU5vYVd4a0tHTmhjbVFwTzF4eVhHNGdJR3hwTG1Gd2NHVnVaRU5vYVd4a0tHeHBibXNwTzF4eVhHNWNjbHh1SUNCeVpYUjFjbTRnYkdrN1hISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElISmxibVJsY2tOaGNtUTdYSEpjYmx4eVhHNGlMQ0psZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQm5aVzVsY21GMFpVbDBaVzBvZXlCemNtTXNJR052Ym5SbGJuUWdmU2tnZTF4eVhHNGdJR052Ym5OMElHeHBJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25iR2tuS1R0Y2NseHVJQ0JzYVM1amJHRnpjMDVoYldVZ1BTQW5iR1ZtZEY5dFpXNTFYMmwwWlcwbk8xeHlYRzRnSUZ4eVhHNGdJR052Ym5OMElHbGpiMjRnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2R6Y0dGdUp5azdYSEpjYmlBZ2FXTnZiaTVqYkdGemMwNWhiV1VnUFNBbmJXVnVkVjlwZEdWdFgybGpiMjRuTzF4eVhHNGdJRnh5WEc0Z0lHTnZibk4wSUdsdFp5QTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oybHRaeWNwTzF4eVhHNGdJR2x0Wnk1emNtTWdQU0J6Y21NN1hISmNibHh5WEc0Z0lHTnZibk4wSUhBZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nkd0p5azdYSEpjYmlBZ2NDNWpiR0Z6YzA1aGJXVWdQU0FuYldWdWRWOXBkR1Z0WDJOdmJuUmxiblFuTzF4eVhHNGdJSEF1WVhCd1pXNWtRMmhwYkdRb1pHOWpkVzFsYm5RdVkzSmxZWFJsVkdWNGRFNXZaR1VvWTI5dWRHVnVkQ2twTzF4eVhHNWNjbHh1SUNCcFkyOXVMbUZ3Y0dWdVpFTm9hV3hrS0dsdFp5azdYSEpjYmlBZ2JHa3VZWEJ3Wlc1a1EyaHBiR1FvYVdOdmJpazdYSEpjYmlBZ2JHa3VZWEJ3Wlc1a1EyaHBiR1FvY0NrN1hISmNibHh5WEc0Z0lISmxkSFZ5YmlCc2FUdGNjbHh1ZlNJc0ltbHRjRzl5ZENCeVpXNWtaWEpEWVhKa0lHWnliMjBnWENJdUwyTnZiWEJ2Ym1WdWRITXZRMkZ5WkZ3aU8xeHlYRzVwYlhCdmNuUWdaMlZ1WlhKaGRHVkpkR1Z0SUdaeWIyMGdYQ0l1TDJOdmJYQnZibVZ1ZEhNdlRXVnVkVWwwWlcxelhDSTdYSEpjYmx4eVhHNWpiMjV6ZENCeVpYTnZkWEpqWlhNZ1BTQmJYSEpjYmlBZ2UxeHlYRzRnSUNBZ2RHbDBiR1U2SUNkSVZFMU1JRkpsWm1WeVpXNWpaU2NzWEhKY2JpQWdJQ0JqYjI1MFpXNTBPaUFuNmFhVzZhRzFKeXhjY2x4dUlDQWdJSE55WXpvZ0p5NHZjM1puTDJWNFlXMXdiR1V1YzNabkp5eGNjbHh1SUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZTRlJOVEM5RmJHVnRaVzUwSjF4eVhHNGdJSDBzWEhKY2JpQWdlMXh5WEc0Z0lDQWdkR2wwYkdVNklDZElWRTFNSUVGMGRISnBZblYwWlNCU1pXWmxjbVZ1WTJVbkxGeHlYRzRnSUNBZ1kyOXVkR1Z1ZERvZ0owaFVUVXduTEZ4eVhHNGdJQ0FnYzNKak9pQW5MaTl6ZG1jdlpYaGhiWEJzWlM1emRtY25MRnh5WEc0Z0lDQWdiR2x1YTBoeVpXWTZJQ2RvZEhSd2N6b3ZMM2QzZHk1M00zTmphRzl2YkhNdVkyOXRMM1JoWjNNdmNtVm1YMkYwZEhKcFluVjBaWE11WVhOd0oxeHlYRzRnSUgwc1hISmNiaUFnZTF4eVhHNGdJQ0FnZEdsMGJHVTZJQ2RuYkhsd2FITW81NnltNVkrM0tTY3NYSEpjYmlBZ0lDQmpiMjUwWlc1ME9pQW5TbUYyWVhOamNtbHdkQ2NzWEhKY2JpQWdJQ0J6Y21NNklDY3VMM04yWnk5bGVHRnRjR3hsTG5OMlp5Y3NYSEpjYmlBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZZM056TFhSeWFXTnJjeTVqYjIwdmMyNXBjSEJsZEhNdmFIUnRiQzluYkhsd2FITXZKMXh5WEc0Z0lIMWNjbHh1WFZ4eVhHNWNjbHh1WTI5dWMzUWdaV3hsYldWdWRITWdQU0I3WEhKY2JpQWdiV0ZwYmtOdmJuUmxiblE2SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeU5qYjI1MFpXNTBYM2R5WVhCd1pYSW5LU3hjY2x4dUlDQnNaV1owUTI5dWRISnZiRG9nWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbXhsWm5SZlkyOXVkSEp2YkNjcExGeHlYRzRnSUd4bFpuUk5aVzUxU1hSbGJYTTZJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXNaV1owWDIxbGJuVmZhWFJsYlhNbktTeGNjbHh1SUNCbmNtOTFjRWwwWlcxek9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdVozSnZkWEJmYVhSbGJYTW5LVnh5WEc1OVhISmNibHh5WEc1amIyNXpkQ0JtY21GbmJXVnVkRVZzWlcxbGJuUnpJRDBnZTF4eVhHNGdJRzFsYm5WSmRHVnRjMFp5WVdkdFpXNTBPaUJrYjJOMWJXVnVkQzVqY21WaGRHVkViMk4xYldWdWRFWnlZV2R0Wlc1MEtDa3NYSEpjYmlBZ1kyRnlaSE5HY21GbmJXVnVkRG9nWkc5amRXMWxiblF1WTNKbFlYUmxSRzlqZFcxbGJuUkdjbUZuYldWdWRDZ3BYSEpjYm4xY2NseHVYSEpjYm5KbGMyOTFjbU5sY3k1bWIzSkZZV05vS0hKbGMyOTFjbU5sSUQwK0lIdGNjbHh1SUNCbWNtRm5iV1Z1ZEVWc1pXMWxiblJ6TG0xbGJuVkpkR1Z0YzBaeVlXZHRaVzUwTG1Gd2NHVnVaQ2huWlc1bGNtRjBaVWwwWlcwb2NtVnpiM1Z5WTJVcEtUdGNjbHh1SUNCbWNtRm5iV1Z1ZEVWc1pXMWxiblJ6TG1OaGNtUnpSbkpoWjIxbGJuUXVZWEJ3Wlc1a0tISmxibVJsY2tOaGNtUW9jbVZ6YjNWeVkyVXBLVHRjY2x4dWZTazdYSEpjYmx4eVhHNWxiR1Z0Wlc1MGN5NXNaV1owUTI5dWRISnZiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJSFJ2WjJkc1pWTnBaR1ZDWVhJcE8xeHlYRzVsYkdWdFpXNTBjeTVzWldaMFRXVnVkVWwwWlcxekxtRndjR1Z1WkVOb2FXeGtLR1p5WVdkdFpXNTBSV3hsYldWdWRITXViV1Z1ZFVsMFpXMXpSbkpoWjIxbGJuUXBPMXh5WEc1bGJHVnRaVzUwY3k1bmNtOTFjRWwwWlcxekxtRndjR1Z1WkVOb2FXeGtLR1p5WVdkdFpXNTBSV3hsYldWdWRITXVZMkZ5WkhOR2NtRm5iV1Z1ZENrN1hISmNibHh5WEc1bWRXNWpkR2x2YmlCMGIyZG5iR1ZUYVdSbFFtRnlLR1VwSUh0Y2NseHVJQ0JsYkdWdFpXNTBjeTV0WVdsdVEyOXVkR1Z1ZEM1amJHRnpjMHhwYzNRdWRHOW5aMnhsS0Nkb2FXUmtaVzRuS1R0Y2NseHVmU0pkTENKemIzVnlZMlZTYjI5MElqb2lJbjA9In0=
