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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/swipe-listener/index.js":
/*!**********************************************!*\
  !*** ./node_modules/swipe-listener/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Starts monitoring swipes on the given element and\n * emits `swipe` event when a swipe gesture is performed.\n * @param {DOMElement} element Element on which to listen for swipe gestures.\n * @param {Object} options Optional: Options.\n * @return {Object}\n */\nconst SwipeListener = function (element, options) {\n  if (!element) return;\n\n  // CustomEvent polyfill\n  if (typeof window !== 'undefined') {\n    (function() {\n      if (typeof window.CustomEvent === 'function') return false;\n      function CustomEvent(event, params) {\n        params = params || { bubbles: false, cancelable: false, detail: undefined };\n        var evt = document.createEvent('CustomEvent');\n        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);\n        return evt;\n      }\n      CustomEvent.prototype = window.Event.prototype;\n      window.CustomEvent = CustomEvent;\n    })();\n  }\n\n  let defaultOpts = {\n    minHorizontal: 10, // Minimum number of pixels traveled to count as a horizontal swipe.\n    minVertical: 10, // Minimum number of pixels traveled to count as a vertical swipe.\n    deltaHorizontal: 3, // Delta for horizontal swipe\n    deltaVertical: 5, // Delta for vertical swipe\n    preventScroll: false, // Prevents scrolling when swiping.\n    lockAxis: true, // Select only one axis to be true instead of multiple.\n  };\n\n  // Set options\n  if (!options) {\n    options = {};\n  }\n  options = {\n    ...defaultOpts,\n    ...options\n  };\n\n  // Store the touches\n  let touches = [];\n\n  // Not dragging by default.\n  let dragging = false;\n\n  // When mouse-click is started, make dragging true.\n  const _mousedown = function (e) {\n    dragging = true;\n  }\n  element.addEventListener('mousedown', _mousedown);\n\n  // When mouse-click is released, make dragging false and signify end by imitating `touchend`.\n  const _mouseup = function (e) {\n    dragging = false;\n    _touchend(e);\n  }\n  element.addEventListener('mouseup', _mouseup);\n\n  // When mouse is moved while being clicked, imitate a `touchmove`.\n  const _mousemove = function (e) {\n    if (dragging) {\n      e.changedTouches = [{\n        clientX: e.clientX,\n        clientY: e.clientY\n      }];\n      _touchmove(e);\n    }\n  }\n  element.addEventListener('mousemove', _mousemove);\n\n  // When the swipe is completed, calculate the direction.\n  const _touchend = function(e) {\n    if (!touches.length) return;\n\n    const touch = e instanceof TouchEvent;\n\n    let x = [],\n    y = [];\n\n    let directions = {\n      top: false,\n      right: false,\n      bottom: false,\n      left: false\n    };\n\n    for (let i = 0; i < touches.length; i++) {\n      x.push(touches[i].x);\n      y.push(touches[i].y);\n    }\n\n    const xs = x[0], xe = x[x.length - 1], // Start and end x-coords\n    ys = y[0], ye = y[y.length - 1];  // Start and end y-coords\n\n    const eventCoords = {\n      x: [xs, xe],\n      y: [ys, ye]\n    };\n\n    if (touches.length > 1) {\n      const swipeReleaseEventData = {\n        detail: {\n          touch,\n          ...eventCoords\n        },\n      };\n\n      let swipeReleaseEvent = new CustomEvent('swiperelease', swipeReleaseEventData);\n      element.dispatchEvent(swipeReleaseEvent);\n    }\n\n    // Determine left or right\n    let diff = x[0] - x[x.length - 1];\n    let swipe = 'none';\n    if (diff > 0) {\n      swipe = 'left';\n    } else {\n      swipe = 'right';\n    }\n\n    let min = Math.min(...x),\n      max = Math.max(...x),\n      _diff;\n\n    // If minimum horizontal distance was travelled\n    if (Math.abs(diff) >= options.minHorizontal) {\n      switch (swipe) {\n        case 'left':\n          _diff = Math.abs(min - x[x.length - 1]);\n          if (_diff <= options.deltaHorizontal) {\n            directions.left = true;\n          }\n          break;\n        case 'right':\n          _diff = Math.abs(max - x[x.length - 1]);\n          if (_diff <= options.deltaHorizontal) {\n            directions.right = true;\n          }\n          break;\n      }\n    }\n\n    // Determine top or bottom\n    diff = y[0] - y[y.length - 1];\n    swipe = 'none';\n    if (diff > 0) {\n      swipe = 'top';\n    } else {\n      swipe = 'bottom';\n    }\n\n    min = Math.min(...y);\n    max = Math.max(...y);\n\n    // If minimum vertical distance was travelled\n    if (Math.abs(diff) >= options.minVertical) {\n      switch (swipe) {\n        case 'top':\n          _diff = Math.abs(min - y[y.length - 1]);\n          if (_diff <= options.deltaVertical) {\n            directions.top = true;\n          }\n          break;\n        case 'bottom':\n          _diff = Math.abs(max - y[y.length - 1]);\n          if (_diff <= options.deltaVertical) {\n            directions.bottom = true;\n          }\n          break;\n      }\n    }\n\n    // Clear touches array.\n    touches = [];\n\n    // If there is a swipe direction, emit an event.\n    if (directions.top ||\n      directions.right ||\n      directions.bottom ||\n      directions.left) {\n      /**\n      * If lockAxis is true, determine which axis to select.\n      * The axis with the most travel is selected.\n      * TODO: Factor in for the orientation of the device\n      * and use it as a weight to determine the travel along an axis.\n      */\n      if (options.lockAxis) {\n        if ((directions.left || directions.right) && Math.abs(xs - xe) > Math.abs(ys - ye)) {\n          directions.top = directions.bottom = false;\n        } else if ((directions.top || directions.bottom) && Math.abs(xs - xe) < Math.abs(ys - ye)) {\n          directions.left = directions.right =  false;\n        }\n      }\n\n      const eventData = {\n        detail: {\n          directions,\n          touch,\n          ...eventCoords\n        },\n      };\n\n      let event = new CustomEvent('swipe', eventData);\n      element.dispatchEvent(event);\n    } else {\n      let cancelEvent = new CustomEvent('swipecancel', {\n        detail: {\n          touch,\n          ...eventCoords,\n        }\n      });\n      element.dispatchEvent(cancelEvent);\n    }\n  };\n\n  // When a swipe is performed, store the coords.\n  const _touchmove = function (e) {\n    if(options.preventScroll) {\n      e.preventDefault();\n    }\n    let touch = e.changedTouches[0];\n    touches.push({\n      x: touch.clientX,\n      y: touch.clientY\n    });\n\n    // Emit a `swiping` event if there are more than one touch-points.\n    if (touches.length > 1) {\n      const xs = touches[0].x, // Start and end x-coords\n        xe = touches[touches.length - 1].x,\n        ys = touches[0].y, // Start and end y-coords\n        ye = touches[touches.length - 1].y,\n        eventData = {\n          detail: {\n            x: [xs, xe],\n            y: [ys, ye],\n            touch: e instanceof TouchEvent\n          },\n        };\n      let event = new CustomEvent('swiping', eventData);\n      element.dispatchEvent(event);\n    }\n  }\n\n  // Test via a getter in the options object to see if the passive property is accessed\n  let passiveOptions = false;\n  try {\n    const testOptions = Object.defineProperty({}, 'passive', {\n      get: function () {\n        passiveOptions = {passive: !options.preventScroll};\n      }\n    });\n    window.addEventListener('testPassive', null, testOptions);\n    window.removeEventListener('testPassive', null, testOptions);\n  } catch (e) {}\n\n  element.addEventListener('touchmove', _touchmove, passiveOptions);\n  element.addEventListener('touchend', _touchend);\n\n  return {\n    off: function () {\n      element.removeEventListener('touchmove', _touchmove, passiveOptions);\n      element.removeEventListener('touchend', _touchend);\n      element.removeEventListener('mousedown', _mousedown);\n      element.removeEventListener('mouseup', _mouseup);\n      element.removeEventListener('mousemove', _mousemove);\n    }\n  }\n};\n\nif ( true && typeof module.exports !== 'undefined') {\n  module.exports = SwipeListener;\n} else {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n      return SwipeListener;\n    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n}\n\n\n//# sourceURL=webpack:///./node_modules/swipe-listener/index.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _furniture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./furniture.js */ \"./src/furniture.js\");\n/* harmony import */ var swipe_listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swipe-listener */ \"./node_modules/swipe-listener/index.js\");\n/* harmony import */ var swipe_listener__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swipe_listener__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n\r\nconst hamburgerElement = document.querySelector(\".hamburger\");\r\nconst navElement = document.querySelector(\"nav\");\r\nconst imageContainerElement = document.getElementById(\"furniture\");\r\nconst imageModalContainerElement = document.getElementById(\"image-modal\");\r\nconst closeModalButtonElement = document.querySelector(\"#image-modal .close\");\r\nconst imageModalElement = document.querySelector(\"#image-modal img\");\r\nconst bodyElement = document.querySelector(\"body\");\r\n\r\nconst imageNavigationButtons = document.getElementsByClassName(\r\n  \"image-navigation\"\r\n);\r\n\r\nlet listener = swipe_listener__WEBPACK_IMPORTED_MODULE_1___default()(imageModalElement);\r\n\r\nlet chosenFurnitureGroup;\r\n\r\n(function initialize() {\r\n  initImages();\r\n  addEventListeners();\r\n})();\r\n\r\nfunction initImages() {\r\n  for (let furnitureGroup of _furniture_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\r\n    let imgWrapElement = document.createElement(\"div\");\r\n    imgWrapElement.classList.add(\"furniture-img-wrap\");\r\n    // prettier-ignore\r\n    imgWrapElement.innerHTML = `\r\n    <div class=\"name\">${furnitureGroup.name}</div>\r\n    <img src=\"content/images/${furnitureGroup.id}/${furnitureGroup.images[0]}\" \r\n          data-furniture-group-id=\"${furnitureGroup.id}\"/>\r\n    <div class=\"furniture-details\">\r\n      <div>\r\n        ${furnitureGroup.price} \r\n        <span>SEK</span> \r\n      </div>\r\n        <button class=\"open-furniture-group\" data-furniture-group-id=\"${furnitureGroup.id}\">\r\n          <span>${furnitureGroup.images.length} bilder</span>\r\n          <img src=\"content/icons/arrow-right-circle.svg\"/>\r\n        </button> \r\n    </div>\r\n    `;\r\n\r\n    imageContainerElement.appendChild(imgWrapElement);\r\n  }\r\n  addOpenImageButtonsEventListeners();\r\n}\r\n\r\nfunction addEventListeners() {\r\n  hamburgerElement.addEventListener(\"click\", () =>\r\n    navElement.classList.toggle(\"active\")\r\n  );\r\n\r\n  imageModalElement.addEventListener(\"swipe\", imageSwipe);\r\n\r\n  imageContainerElement.addEventListener(\"click\", event => {\r\n    if (event.target.tagName !== \"IMG\") {\r\n      return;\r\n    }\r\n    const furnitureGroupId = event.target.dataset.furnitureGroupId;\r\n\r\n    openImage(furnitureGroupId);\r\n  });\r\n\r\n  closeModalButtonElement.addEventListener(\"click\", function() {\r\n    imageModalContainerElement.classList.remove(\"open\");\r\n    bodyElement.classList.remove(\"modal-open\");\r\n  });\r\n\r\n  window.addEventListener(\"click\", outsideImageClick);\r\n\r\n  addImageNavigationEventListeners();\r\n}\r\n\r\nfunction addOpenImageButtonsEventListeners() {\r\n  const openImageButtonElements = document.querySelectorAll(\r\n    \".furniture-details button\"\r\n  );\r\n\r\n  for (const button of openImageButtonElements) {\r\n    button.addEventListener(\"click\", function(event) {\r\n      openImage(button.dataset.furnitureGroupId);\r\n    });\r\n  }\r\n}\r\n\r\nfunction addImageNavigationEventListeners() {\r\n  for (const button of imageNavigationButtons) {\r\n    button.addEventListener(\"click\", function(event) {\r\n      const direction = button.dataset.direction;\r\n      chosenFurnitureGroup.navigateImages(direction);\r\n      event.stopPropagation();\r\n    });\r\n  }\r\n}\r\n\r\nfunction outsideImageClick(event) {\r\n  if (\r\n    event.srcElement.tagName === \"IMG\" ||\r\n    event.srcElement.classList.contains(\"image-navigation\")\r\n  ) {\r\n    return;\r\n  }\r\n  imageModalContainerElement.classList.remove(\"open\");\r\n  bodyElement.classList.remove(\"modal-open\");\r\n}\r\n\r\nfunction imageSwipe(event) {\r\n  const directions = event.detail.directions;\r\n\r\n  if (directions.left) {\r\n    chosenFurnitureGroup.navigateImages(\"next\");\r\n  } else if (directions.right) {\r\n    chosenFurnitureGroup.navigateImages(\"previous\");\r\n  }\r\n}\r\n\r\nfunction openImage(furnitureGroupId) {\r\n  chosenFurnitureGroup = getFurnitureGroupById(furnitureGroupId);\r\n\r\n  chosenFurnitureGroup.open();\r\n  bodyElement.classList.add(\"modal-open\");\r\n\r\n  event.stopPropagation();\r\n}\r\n\r\nfunction getFurnitureGroupById(furnitureGroupId) {\r\n  return _furniture_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(furnitureGroup => {\r\n    return furnitureGroup.id === furnitureGroupId;\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/furniture.js":
/*!**************************!*\
  !*** ./src/furniture.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst imageModalElement = document.querySelector(\"#image-modal img\");\r\nconst imageModalContainerElement = document.getElementById(\"image-modal\");\r\nconst progressContainerElement = document.getElementById(\"progress\");\r\nlet currentImageShownNum = 1;\r\n\r\nclass FurnitureGroup {\r\n  constructor(id, name, price, images) {\r\n    this.id = id;\r\n    this.name = name;\r\n    this.price = price;\r\n    this.images = images;\r\n  }\r\n\r\n  open() {\r\n    imageModalElement.src = `content/images/${this.id}/${this.images[0]}`;\r\n    // imageModalElement.dataset.imageNumber = event.target.dataset.imageNumber;\r\n    imageModalContainerElement.classList.add(\"open\");\r\n    this.addProgressDots();\r\n  }\r\n\r\n  addProgressDots() {\r\n    progressContainerElement.innerHTML = \"\";\r\n\r\n    for (let i = 0; i < this.images.length; i++) {\r\n      let progressDot = document.createElement(\"div\");\r\n      progressDot.className = \"progress-dot\";\r\n      progressContainerElement.append(progressDot);\r\n    }\r\n\r\n    progressContainerElement.children[0].classList.add(\"selected\");\r\n  }\r\n\r\n  navigateImages(direction) {\r\n    direction === \"next\" ? currentImageShownNum++ : currentImageShownNum--;\r\n\r\n    if (currentImageShownNum > this.images.length) {\r\n      currentImageShownNum = 1;\r\n    } else if (currentImageShownNum < 1) {\r\n      currentImageShownNum = this.images.length;\r\n    }\r\n    imageModalElement.src = `content/images/${\r\n      this.id\r\n    }/${currentImageShownNum}.jpg`;\r\n\r\n    Array.from(progressContainerElement.children).map(progressDot => {\r\n      progressDot.classList.remove(\"selected\");\r\n    });\r\n\r\n    progressContainerElement.children[currentImageShownNum - 1].classList.add(\r\n      \"selected\"\r\n    );\r\n  }\r\n}\r\n\r\n// prettier-ignore\r\nconst furnitureData = [\r\n  new FurnitureGroup(\r\n    \"group1\",\r\n    \"Bord & pallar\",\r\n    5400,\r\n    [\"1.jpg\", \"2.jpg\", \"3.jpg\", \"4.jpg\"]\r\n  ),\r\n  new FurnitureGroup(\r\n    \"group2\",\r\n    \"Månhylla\",\r\n    3800,\r\n    [\"1.jpg\", \"2.jpg\"]\r\n    )  \r\n];\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (furnitureData);\r\n\n\n//# sourceURL=webpack:///./src/furniture.js?");

/***/ })

/******/ });