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

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

const resources = [
  {
    title: 'HTML Reference',
    content: 'MDN HTML 属性参考',
    imgSrc: './svg/example.svg',
    linkHref: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element'
  },
  {
    title: 'HTML Attribute Reference',
    content: 'W3Schools HTML 属性参考',
    imgSrc: './svg/example.svg',
    linkHref: 'https://www.w3schools.com/tags/ref_attributes.asp'
  },
  {
    title: 'glyphs(符号)',
    content: 'HTML特殊符号名字和数字代码',
    imgSrc: './svg/example.svg',
    linkHref: 'https://css-tricks.com/snippets/html/glyphs/'
  }
]



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

const mainContent = document.querySelector('#content_wrapper');
const leftControl = document.querySelector('.left_control');

leftControl.addEventListener('click', toggleSideBar);

function toggleSideBar(e) {
  mainContent.classList.toggle('hidden');
}

function Ninja() {
  let skillLevel = null;

  this.getSkillLevel = () => {
    console.log("Get skill level value");
    return skillLevel
  };

  this.setSkillLevel = value => {
    console.log("Modifying skillLevel property from:", skillLevel, "to:", value);
    skillLevel = value;
    return skillLevel;
  }
} 

function Ninja1() {
  let _skillLevel = 0;

  Object.defineProperty(this, 'skillLevel', {
    get: () => {
      console.log('Getting skillLevel');
      return _skillLevel;
    },
    set: (value) => {
      if (!Number(value)) {
        console.log('Value is not a integer Number');
        throw new TypeError("skillLevel should be a number")
      } else if (_skillLevel !== value) {
        console.log('The skillLevel is changed');
        console.log('skill level value is changed from:', _skillLevel, 'to:', value);
      } 
      _skillLevel = value;
    }
  })
}

const ninja = new Ninja1();
console.log(ninja._skillLevel);
console.log(ninja.skillLevel);
ninja.skillLevel = 2.7;
console.log(ninja.skillLevel);

const shogum = {
  name: 'Yoshiaki',
  clan: 'Ashiaga',
  get fullTitle() {
    return this.name + ' ' + this.clan;
  },
  set fullTitle(value) {
    const segments = value.split(' ');
    this.name = segments[0];
    this.clan = segments[1];
  }
}

console.log(shogum.fullTitle)
shogum.fullTitle = 'Btodian jimmy';
console.log(shogum.fullTitle)

const emeror = { name: 'Lomei'};
const representative = new Proxy(emeror, {
  get: (target, key) => {
    console.log('Reading ' + key + " through a proxy");
    return key in target ? target[key] : 'Don\'t bother the emeror';
  },
  set: (target, key, value) => {
    console.log("Writing " + key + " through a proxy");
    target[key] = value;
  }
})

console.log(representative.name)
console.log(representative.age);

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi ./src/js/app.js ./src/js/main.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsZ0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IHJlc291cmNlcyA9IFtcclxuICB7XHJcbiAgICB0aXRsZTogJ0hUTUwgUmVmZXJlbmNlJyxcclxuICAgIGNvbnRlbnQ6ICdNRE4gSFRNTCDlsZ7mgKflj4LogIMnLFxyXG4gICAgaW1nU3JjOiAnLi9zdmcvZXhhbXBsZS5zdmcnLFxyXG4gICAgbGlua0hyZWY6ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQnXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogJ0hUTUwgQXR0cmlidXRlIFJlZmVyZW5jZScsXHJcbiAgICBjb250ZW50OiAnVzNTY2hvb2xzIEhUTUwg5bGe5oCn5Y+C6ICDJyxcclxuICAgIGltZ1NyYzogJy4vc3ZnL2V4YW1wbGUuc3ZnJyxcclxuICAgIGxpbmtIcmVmOiAnaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9hdHRyaWJ1dGVzLmFzcCdcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiAnZ2x5cGhzKOespuWPtyknLFxyXG4gICAgY29udGVudDogJ0hUTUznibnmrornrKblj7flkI3lrZflkozmlbDlrZfku6PnoIEnLFxyXG4gICAgaW1nU3JjOiAnLi9zdmcvZXhhbXBsZS5zdmcnLFxyXG4gICAgbGlua0hyZWY6ICdodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2h0bWwvZ2x5cGhzLydcclxuICB9XHJcbl1cclxuXHJcbiIsImNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnRfd3JhcHBlcicpO1xyXG5jb25zdCBsZWZ0Q29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X2NvbnRyb2wnKTtcclxuXHJcbmxlZnRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2lkZUJhcik7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVTaWRlQmFyKGUpIHtcclxuICBtYWluQ29udGVudC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gTmluamEoKSB7XHJcbiAgbGV0IHNraWxsTGV2ZWwgPSBudWxsO1xyXG5cclxuICB0aGlzLmdldFNraWxsTGV2ZWwgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdldCBza2lsbCBsZXZlbCB2YWx1ZVwiKTtcclxuICAgIHJldHVybiBza2lsbExldmVsXHJcbiAgfTtcclxuXHJcbiAgdGhpcy5zZXRTa2lsbExldmVsID0gdmFsdWUgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJNb2RpZnlpbmcgc2tpbGxMZXZlbCBwcm9wZXJ0eSBmcm9tOlwiLCBza2lsbExldmVsLCBcInRvOlwiLCB2YWx1ZSk7XHJcbiAgICBza2lsbExldmVsID0gdmFsdWU7XHJcbiAgICByZXR1cm4gc2tpbGxMZXZlbDtcclxuICB9XHJcbn0gXHJcblxyXG5mdW5jdGlvbiBOaW5qYTEoKSB7XHJcbiAgbGV0IF9za2lsbExldmVsID0gMDtcclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdza2lsbExldmVsJywge1xyXG4gICAgZ2V0OiAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIHNraWxsTGV2ZWwnKTtcclxuICAgICAgcmV0dXJuIF9za2lsbExldmVsO1xyXG4gICAgfSxcclxuICAgIHNldDogKHZhbHVlKSA9PiB7XHJcbiAgICAgIGlmICghTnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdWYWx1ZSBpcyBub3QgYSBpbnRlZ2VyIE51bWJlcicpO1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJza2lsbExldmVsIHNob3VsZCBiZSBhIG51bWJlclwiKVxyXG4gICAgICB9IGVsc2UgaWYgKF9za2lsbExldmVsICE9PSB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGUgc2tpbGxMZXZlbCBpcyBjaGFuZ2VkJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NraWxsIGxldmVsIHZhbHVlIGlzIGNoYW5nZWQgZnJvbTonLCBfc2tpbGxMZXZlbCwgJ3RvOicsIHZhbHVlKTtcclxuICAgICAgfSBcclxuICAgICAgX3NraWxsTGV2ZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5jb25zdCBuaW5qYSA9IG5ldyBOaW5qYTEoKTtcclxuY29uc29sZS5sb2cobmluamEuX3NraWxsTGV2ZWwpO1xyXG5jb25zb2xlLmxvZyhuaW5qYS5za2lsbExldmVsKTtcclxubmluamEuc2tpbGxMZXZlbCA9IDIuNztcclxuY29uc29sZS5sb2cobmluamEuc2tpbGxMZXZlbCk7XHJcblxyXG5jb25zdCBzaG9ndW0gPSB7XHJcbiAgbmFtZTogJ1lvc2hpYWtpJyxcclxuICBjbGFuOiAnQXNoaWFnYScsXHJcbiAgZ2V0IGZ1bGxUaXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnICcgKyB0aGlzLmNsYW47XHJcbiAgfSxcclxuICBzZXQgZnVsbFRpdGxlKHZhbHVlKSB7XHJcbiAgICBjb25zdCBzZWdtZW50cyA9IHZhbHVlLnNwbGl0KCcgJyk7XHJcbiAgICB0aGlzLm5hbWUgPSBzZWdtZW50c1swXTtcclxuICAgIHRoaXMuY2xhbiA9IHNlZ21lbnRzWzFdO1xyXG4gIH1cclxufVxyXG5cclxuY29uc29sZS5sb2coc2hvZ3VtLmZ1bGxUaXRsZSlcclxuc2hvZ3VtLmZ1bGxUaXRsZSA9ICdCdG9kaWFuIGppbW15JztcclxuY29uc29sZS5sb2coc2hvZ3VtLmZ1bGxUaXRsZSlcclxuXHJcbmNvbnN0IGVtZXJvciA9IHsgbmFtZTogJ0xvbWVpJ307XHJcbmNvbnN0IHJlcHJlc2VudGF0aXZlID0gbmV3IFByb3h5KGVtZXJvciwge1xyXG4gIGdldDogKHRhcmdldCwga2V5KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnUmVhZGluZyAnICsga2V5ICsgXCIgdGhyb3VnaCBhIHByb3h5XCIpO1xyXG4gICAgcmV0dXJuIGtleSBpbiB0YXJnZXQgPyB0YXJnZXRba2V5XSA6ICdEb25cXCd0IGJvdGhlciB0aGUgZW1lcm9yJztcclxuICB9LFxyXG4gIHNldDogKHRhcmdldCwga2V5LCB2YWx1ZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJXcml0aW5nIFwiICsga2V5ICsgXCIgdGhyb3VnaCBhIHByb3h5XCIpO1xyXG4gICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcclxuICB9XHJcbn0pXHJcblxyXG5jb25zb2xlLmxvZyhyZXByZXNlbnRhdGl2ZS5uYW1lKVxyXG5jb25zb2xlLmxvZyhyZXByZXNlbnRhdGl2ZS5hZ2UpOyJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyRndjQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZiV0ZwYmk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8xRkJRVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdPenRSUVVkQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTd3dRMEZCTUVNc1owTkJRV2RETzFGQlF6RkZPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNkMFJCUVhkRUxHdENRVUZyUWp0UlFVTXhSVHRSUVVOQkxHbEVRVUZwUkN4alFVRmpPMUZCUXk5RU96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVN4NVEwRkJlVU1zYVVOQlFXbERPMUZCUXpGRkxHZElRVUZuU0N4dFFrRkJiVUlzUlVGQlJUdFJRVU55U1R0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTERKQ1FVRXlRaXd3UWtGQk1FSXNSVUZCUlR0UlFVTjJSQ3hwUTBGQmFVTXNaVUZCWlR0UlFVTm9SRHRSUVVOQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVN4elJFRkJjMFFzSzBSQlFTdEVPenRSUVVWeVNEdFJRVU5CT3pzN1VVRkhRVHRSUVVOQk96czdPenM3T3pzN096czdRVU5zUmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTnVRa0U3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUXpzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRU3hQTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFTeG5Ra0ZCWjBJN1FVRkRhRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeERRVUZET3p0QlFVVkVPMEZCUTBFc1owTWlMQ0ptYVd4bElqb2laR0kxTURjNU5XUmhPR0psTXpObVpUSXdOek11YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SWdYSFF2THlCVWFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUjJZWElnYVc1emRHRnNiR1ZrVFc5a2RXeGxjeUE5SUh0OU8xeHVYRzRnWEhRdkx5QlVhR1VnY21WeGRXbHlaU0JtZFc1amRHbHZibHh1SUZ4MFpuVnVZM1JwYjI0Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aHRiMlIxYkdWSlpDa2dlMXh1WEc0Z1hIUmNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dUlGeDBYSFJwWmlocGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNrZ2UxeHVJRngwWEhSY2RISmxkSFZ5YmlCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1bGVIQnZjblJ6TzF4dUlGeDBYSFI5WEc0Z1hIUmNkQzh2SUVOeVpXRjBaU0JoSUc1bGR5QnRiMlIxYkdVZ0tHRnVaQ0J3ZFhRZ2FYUWdhVzUwYnlCMGFHVWdZMkZqYUdVcFhHNGdYSFJjZEhaaGNpQnRiMlIxYkdVZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTQTlJSHRjYmlCY2RGeDBYSFJwT2lCdGIyUjFiR1ZKWkN4Y2JpQmNkRngwWEhSc09pQm1ZV3h6WlN4Y2JpQmNkRngwWEhSbGVIQnZjblJ6T2lCN2ZWeHVJRngwWEhSOU8xeHVYRzRnWEhSY2RDOHZJRVY0WldOMWRHVWdkR2hsSUcxdlpIVnNaU0JtZFc1amRHbHZibHh1SUZ4MFhIUnRiMlIxYkdWelcyMXZaSFZzWlVsa1hTNWpZV3hzS0cxdlpIVnNaUzVsZUhCdmNuUnpMQ0J0YjJSMWJHVXNJRzF2WkhWc1pTNWxlSEJ2Y25SekxDQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLVHRjYmx4dUlGeDBYSFF2THlCR2JHRm5JSFJvWlNCdGIyUjFiR1VnWVhNZ2JHOWhaR1ZrWEc0Z1hIUmNkRzF2WkhWc1pTNXNJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJrWldacGJtVWdaMlYwZEdWeUlHWjFibU4wYVc5dUlHWnZjaUJvWVhKdGIyNTVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXNJRzVoYldVc0lHZGxkSFJsY2lrZ2UxeHVJRngwWEhScFppZ2hYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2S0dWNGNHOXlkSE1zSUc1aGJXVXBLU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z1oyVjBPaUJuWlhSMFpYSWdmU2s3WEc0Z1hIUmNkSDFjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR1JsWm1sdVpTQmZYMlZ6VFc5a2RXeGxJRzl1SUdWNGNHOXlkSE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjaUE5SUdaMWJtTjBhVzl1S0dWNGNHOXlkSE1wSUh0Y2JpQmNkRngwYVdZb2RIbHdaVzltSUZONWJXSnZiQ0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuS1NCN1hHNGdYSFJjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeXdnZXlCMllXeDFaVG9nSjAxdlpIVnNaU2NnZlNrN1hHNGdYSFJjZEgxY2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lDZGZYMlZ6VFc5a2RXeGxKeXdnZXlCMllXeDFaVG9nZEhKMVpTQjlLVHRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR055WldGMFpTQmhJR1poYTJVZ2JtRnRaWE53WVdObElHOWlhbVZqZEZ4dUlGeDBMeThnYlc5a1pTQW1JREU2SUhaaGJIVmxJR2x6SUdFZ2JXOWtkV3hsSUdsa0xDQnlaWEYxYVhKbElHbDBYRzRnWEhRdkx5QnRiMlJsSUNZZ01qb2diV1Z5WjJVZ1lXeHNJSEJ5YjNCbGNuUnBaWE1nYjJZZ2RtRnNkV1VnYVc1MGJ5QjBhR1VnYm5OY2JpQmNkQzh2SUcxdlpHVWdKaUEwT2lCeVpYUjFjbTRnZG1Gc2RXVWdkMmhsYmlCaGJISmxZV1I1SUc1eklHOWlhbVZqZEZ4dUlGeDBMeThnYlc5a1pTQW1JRGg4TVRvZ1ltVm9ZWFpsSUd4cGEyVWdjbVZ4ZFdseVpWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1MElEMGdablZ1WTNScGIyNG9kbUZzZFdVc0lHMXZaR1VwSUh0Y2JpQmNkRngwYVdZb2JXOWtaU0FtSURFcElIWmhiSFZsSUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aDJZV3gxWlNrN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBNEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkR2xtS0NodGIyUmxJQ1lnTkNrZ0ppWWdkSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iMkpxWldOMEp5QW1KaUIyWVd4MVpTQW1KaUIyWVd4MVpTNWZYMlZ6VFc5a2RXeGxLU0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdYSFJjZEhaaGNpQnVjeUE5SUU5aWFtVmpkQzVqY21WaGRHVW9iblZzYkNrN1hHNGdYSFJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpaHVjeWs3WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNodWN5d2dKMlJsWm1GMWJIUW5MQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUhaaGJIVmxPaUIyWVd4MVpTQjlLVHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JRElnSmlZZ2RIbHdaVzltSUhaaGJIVmxJQ0U5SUNkemRISnBibWNuS1NCbWIzSW9kbUZ5SUd0bGVTQnBiaUIyWVd4MVpTa2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0c1ekxDQnJaWGtzSUdaMWJtTjBhVzl1S0d0bGVTa2dleUJ5WlhSMWNtNGdkbUZzZFdWYmEyVjVYVHNnZlM1aWFXNWtLRzUxYkd3c0lHdGxlU2twTzF4dUlGeDBYSFJ5WlhSMWNtNGdibk03WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJuWlhSRVpXWmhkV3gwUlhod2IzSjBJR1oxYm1OMGFXOXVJR1p2Y2lCamIyMXdZWFJwWW1sc2FYUjVJSGRwZEdnZ2JtOXVMV2hoY20xdmJua2diVzlrZFd4bGMxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dUlEMGdablZ1WTNScGIyNG9iVzlrZFd4bEtTQjdYRzRnWEhSY2RIWmhjaUJuWlhSMFpYSWdQU0J0YjJSMWJHVWdKaVlnYlc5a2RXeGxMbDlmWlhOTmIyUjFiR1VnUDF4dUlGeDBYSFJjZEdaMWJtTjBhVzl1SUdkbGRFUmxabUYxYkhRb0tTQjdJSEpsZEhWeWJpQnRiMlIxYkdWYkoyUmxabUYxYkhRblhUc2dmU0E2WEc0Z1hIUmNkRngwWm5WdVkzUnBiMjRnWjJWMFRXOWtkV3hsUlhod2IzSjBjeWdwSUhzZ2NtVjBkWEp1SUcxdlpIVnNaVHNnZlR0Y2JpQmNkRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1a0tHZGxkSFJsY2l3Z0oyRW5MQ0JuWlhSMFpYSXBPMXh1SUZ4MFhIUnlaWFIxY200Z1oyVjBkR1Z5TzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbThnUFNCbWRXNWpkR2x2YmlodlltcGxZM1FzSUhCeWIzQmxjblI1S1NCN0lISmxkSFZ5YmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFaV04wTENCd2NtOXdaWEowZVNrN0lIMDdYRzVjYmlCY2RDOHZJRjlmZDJWaWNHRmphMTl3ZFdKc2FXTmZjR0YwYUY5ZlhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5BZ1BTQmNJbHdpTzF4dVhHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1eklEMGdNQ2s3WEc0aUxDSmpiMjV6ZENCeVpYTnZkWEpqWlhNZ1BTQmJYSEpjYmlBZ2UxeHlYRzRnSUNBZ2RHbDBiR1U2SUNkSVZFMU1JRkpsWm1WeVpXNWpaU2NzWEhKY2JpQWdJQ0JqYjI1MFpXNTBPaUFuVFVST0lFaFVUVXdnNWJHZTVvQ241WStDNklDREp5eGNjbHh1SUNBZ0lHbHRaMU55WXpvZ0p5NHZjM1puTDJWNFlXMXdiR1V1YzNabkp5eGNjbHh1SUNBZ0lHeHBibXRJY21WbU9pQW5hSFIwY0hNNkx5OWtaWFpsYkc5d1pYSXViVzk2YVd4c1lTNXZjbWN2Wlc0dFZWTXZaRzlqY3k5WFpXSXZTRlJOVEM5RmJHVnRaVzUwSjF4eVhHNGdJSDBzWEhKY2JpQWdlMXh5WEc0Z0lDQWdkR2wwYkdVNklDZElWRTFNSUVGMGRISnBZblYwWlNCU1pXWmxjbVZ1WTJVbkxGeHlYRzRnSUNBZ1kyOXVkR1Z1ZERvZ0oxY3pVMk5vYjI5c2N5QklWRTFNSU9XeG51YUFwK1dQZ3VpQWd5Y3NYSEpjYmlBZ0lDQnBiV2RUY21NNklDY3VMM04yWnk5bGVHRnRjR3hsTG5OMlp5Y3NYSEpjYmlBZ0lDQnNhVzVyU0hKbFpqb2dKMmgwZEhCek9pOHZkM2QzTG5jemMyTm9iMjlzY3k1amIyMHZkR0ZuY3k5eVpXWmZZWFIwY21saWRYUmxjeTVoYzNBblhISmNiaUFnZlN4Y2NseHVJQ0I3WEhKY2JpQWdJQ0IwYVhSc1pUb2dKMmRzZVhCb2N5am5yS2JsajdjcEp5eGNjbHh1SUNBZ0lHTnZiblJsYm5RNklDZElWRTFNNTRtNTVxNks1NnltNVkrMzVaQ041YTJYNVpLTTVwV3c1YTJYNUx1ajU2Q0JKeXhjY2x4dUlDQWdJR2x0WjFOeVl6b2dKeTR2YzNabkwyVjRZVzF3YkdVdWMzWm5KeXhjY2x4dUlDQWdJR3hwYm10SWNtVm1PaUFuYUhSMGNITTZMeTlqYzNNdGRISnBZMnR6TG1OdmJTOXpibWx3Y0dWMGN5OW9kRzFzTDJkc2VYQm9jeThuWEhKY2JpQWdmVnh5WEc1ZFhISmNibHh5WEc0aUxDSmpiMjV6ZENCdFlXbHVRMjl1ZEdWdWRDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5TmpiMjUwWlc1MFgzZHlZWEJ3WlhJbktUdGNjbHh1WTI5dWMzUWdiR1ZtZEVOdmJuUnliMndnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1YkdWbWRGOWpiMjUwY205c0p5azdYSEpjYmx4eVhHNXNaV1owUTI5dWRISnZiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJSFJ2WjJkc1pWTnBaR1ZDWVhJcE8xeHlYRzVjY2x4dVpuVnVZM1JwYjI0Z2RHOW5aMnhsVTJsa1pVSmhjaWhsS1NCN1hISmNiaUFnYldGcGJrTnZiblJsYm5RdVkyeGhjM05NYVhOMExuUnZaMmRzWlNnbmFHbGtaR1Z1SnlrN1hISmNibjFjY2x4dVhISmNibVoxYm1OMGFXOXVJRTVwYm1waEtDa2dlMXh5WEc0Z0lHeGxkQ0J6YTJsc2JFeGxkbVZzSUQwZ2JuVnNiRHRjY2x4dVhISmNiaUFnZEdocGN5NW5aWFJUYTJsc2JFeGxkbVZzSUQwZ0tDa2dQVDRnZTF4eVhHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb1hDSkhaWFFnYzJ0cGJHd2diR1YyWld3Z2RtRnNkV1ZjSWlrN1hISmNiaUFnSUNCeVpYUjFjbTRnYzJ0cGJHeE1aWFpsYkZ4eVhHNGdJSDA3WEhKY2JseHlYRzRnSUhSb2FYTXVjMlYwVTJ0cGJHeE1aWFpsYkNBOUlIWmhiSFZsSUQwK0lIdGNjbHh1SUNBZ0lHTnZibk52YkdVdWJHOW5LRndpVFc5a2FXWjVhVzVuSUhOcmFXeHNUR1YyWld3Z2NISnZjR1Z5ZEhrZ1puSnZiVHBjSWl3Z2MydHBiR3hNWlhabGJDd2dYQ0owYnpwY0lpd2dkbUZzZFdVcE8xeHlYRzRnSUNBZ2MydHBiR3hNWlhabGJDQTlJSFpoYkhWbE8xeHlYRzRnSUNBZ2NtVjBkWEp1SUhOcmFXeHNUR1YyWld3N1hISmNiaUFnZlZ4eVhHNTlJRnh5WEc1Y2NseHVablZ1WTNScGIyNGdUbWx1YW1FeEtDa2dlMXh5WEc0Z0lHeGxkQ0JmYzJ0cGJHeE1aWFpsYkNBOUlEQTdYSEpjYmx4eVhHNGdJRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNoMGFHbHpMQ0FuYzJ0cGJHeE1aWFpsYkNjc0lIdGNjbHh1SUNBZ0lHZGxkRG9nS0NrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0JqYjI1emIyeGxMbXh2WnlnblIyVjBkR2x1WnlCemEybHNiRXhsZG1Wc0p5azdYSEpjYmlBZ0lDQWdJSEpsZEhWeWJpQmZjMnRwYkd4TVpYWmxiRHRjY2x4dUlDQWdJSDBzWEhKY2JpQWdJQ0J6WlhRNklDaDJZV3gxWlNrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0JwWmlBb0lVNTFiV0psY2loMllXeDFaU2twSUh0Y2NseHVJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWduVm1Gc2RXVWdhWE1nYm05MElHRWdhVzUwWldkbGNpQk9kVzFpWlhJbktUdGNjbHh1SUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aWMydHBiR3hNWlhabGJDQnphRzkxYkdRZ1ltVWdZU0J1ZFcxaVpYSmNJaWxjY2x4dUlDQWdJQ0FnZlNCbGJITmxJR2xtSUNoZmMydHBiR3hNWlhabGJDQWhQVDBnZG1Gc2RXVXBJSHRjY2x4dUlDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5Z25WR2hsSUhOcmFXeHNUR1YyWld3Z2FYTWdZMmhoYm1kbFpDY3BPMXh5WEc0Z0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktDZHphMmxzYkNCc1pYWmxiQ0IyWVd4MVpTQnBjeUJqYUdGdVoyVmtJR1p5YjIwNkp5d2dYM05yYVd4c1RHVjJaV3dzSUNkMGJ6b25MQ0IyWVd4MVpTazdYSEpjYmlBZ0lDQWdJSDBnWEhKY2JpQWdJQ0FnSUY5emEybHNiRXhsZG1Wc0lEMGdkbUZzZFdVN1hISmNiaUFnSUNCOVhISmNiaUFnZlNsY2NseHVmVnh5WEc1Y2NseHVZMjl1YzNRZ2JtbHVhbUVnUFNCdVpYY2dUbWx1YW1FeEtDazdYSEpjYm1OdmJuTnZiR1V1Ykc5bktHNXBibXBoTGw5emEybHNiRXhsZG1Wc0tUdGNjbHh1WTI5dWMyOXNaUzVzYjJjb2JtbHVhbUV1YzJ0cGJHeE1aWFpsYkNrN1hISmNibTVwYm1waExuTnJhV3hzVEdWMlpXd2dQU0F5TGpjN1hISmNibU52Ym5OdmJHVXViRzluS0c1cGJtcGhMbk5yYVd4c1RHVjJaV3dwTzF4eVhHNWNjbHh1WTI5dWMzUWdjMmh2WjNWdElEMGdlMXh5WEc0Z0lHNWhiV1U2SUNkWmIzTm9hV0ZyYVNjc1hISmNiaUFnWTJ4aGJqb2dKMEZ6YUdsaFoyRW5MRnh5WEc0Z0lHZGxkQ0JtZFd4c1ZHbDBiR1VvS1NCN1hISmNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NXVZVzFsSUNzZ0p5QW5JQ3NnZEdocGN5NWpiR0Z1TzF4eVhHNGdJSDBzWEhKY2JpQWdjMlYwSUdaMWJHeFVhWFJzWlNoMllXeDFaU2tnZTF4eVhHNGdJQ0FnWTI5dWMzUWdjMlZuYldWdWRITWdQU0IyWVd4MVpTNXpjR3hwZENnbklDY3BPMXh5WEc0Z0lDQWdkR2hwY3k1dVlXMWxJRDBnYzJWbmJXVnVkSE5iTUYwN1hISmNiaUFnSUNCMGFHbHpMbU5zWVc0Z1BTQnpaV2R0Wlc1MGMxc3hYVHRjY2x4dUlDQjlYSEpjYm4xY2NseHVYSEpjYm1OdmJuTnZiR1V1Ykc5bktITm9iMmQxYlM1bWRXeHNWR2wwYkdVcFhISmNibk5vYjJkMWJTNW1kV3hzVkdsMGJHVWdQU0FuUW5SdlpHbGhiaUJxYVcxdGVTYzdYSEpjYm1OdmJuTnZiR1V1Ykc5bktITm9iMmQxYlM1bWRXeHNWR2wwYkdVcFhISmNibHh5WEc1amIyNXpkQ0JsYldWeWIzSWdQU0I3SUc1aGJXVTZJQ2RNYjIxbGFTZDlPMXh5WEc1amIyNXpkQ0J5WlhCeVpYTmxiblJoZEdsMlpTQTlJRzVsZHlCUWNtOTRlU2hsYldWeWIzSXNJSHRjY2x4dUlDQm5aWFE2SUNoMFlYSm5aWFFzSUd0bGVTa2dQVDRnZTF4eVhHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb0oxSmxZV1JwYm1jZ0p5QXJJR3RsZVNBcklGd2lJSFJvY205MVoyZ2dZU0J3Y205NGVWd2lLVHRjY2x4dUlDQWdJSEpsZEhWeWJpQnJaWGtnYVc0Z2RHRnlaMlYwSUQ4Z2RHRnlaMlYwVzJ0bGVWMGdPaUFuUkc5dVhGd25kQ0JpYjNSb1pYSWdkR2hsSUdWdFpYSnZjaWM3WEhKY2JpQWdmU3hjY2x4dUlDQnpaWFE2SUNoMFlYSm5aWFFzSUd0bGVTd2dkbUZzZFdVcElEMCtJSHRjY2x4dUlDQWdJR052Ym5OdmJHVXViRzluS0Z3aVYzSnBkR2x1WnlCY0lpQXJJR3RsZVNBcklGd2lJSFJvY205MVoyZ2dZU0J3Y205NGVWd2lLVHRjY2x4dUlDQWdJSFJoY21kbGRGdHJaWGxkSUQwZ2RtRnNkV1U3WEhKY2JpQWdmVnh5WEc1OUtWeHlYRzVjY2x4dVkyOXVjMjlzWlM1c2IyY29jbVZ3Y21WelpXNTBZWFJwZG1VdWJtRnRaU2xjY2x4dVkyOXVjMjlzWlM1c2IyY29jbVZ3Y21WelpXNTBZWFJwZG1VdVlXZGxLVHNpWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5In0=
