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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _furniture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./furniture.js */ \"./src/furniture.js\");\n\r\n\r\n\r\nconst hamburgerElement = document.querySelector(\".hamburger\");\r\nconst navElement = document.querySelector(\"nav\");\r\nconst imageContainerElement = document.getElementById(\"furniture\");\r\nconst imageModalContainerElement = document.getElementById(\"image-modal\");\r\nconst closeModalButtonElement = document.querySelector(\"#image-modal .close\");\r\nconst imageModalElement = document.querySelector(\"#image-modal img\");\r\nconst bodyElement = document.querySelector(\"body\");\r\n\r\nconst imageNavigationButtons = document.getElementsByClassName(\r\n  \"image-navigation\"\r\n);\r\n\r\nlet chosenFurnitureGroup;\r\n\r\n(function initialize() {\r\n  initImages();\r\n  addEventListeners();\r\n})();\r\n\r\nfunction initImages() {\r\n  for (let furnitureGroup of _furniture_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\r\n    let imgWrapElement = document.createElement(\"div\");\r\n    imgWrapElement.classList.add(\"furniture-img-wrap\");\r\n    // prettier-ignore\r\n    imgWrapElement.innerHTML = `\r\n    <div class=\"name\">${furnitureGroup.name}</div>\r\n    <img src=\"content/images/${furnitureGroup.id}/${furnitureGroup.images[0]}\" \r\n          data-furniture-group-id=\"${furnitureGroup.id}\"/>\r\n    <div class=\"furniture-details\">\r\n      <div>\r\n        ${furnitureGroup.price} \r\n        <span>SEK</span> \r\n      </div>\r\n        <button class=\"open-furniture-group\" data-furniture-group-id=\"${furnitureGroup.id}\">\r\n          <span>${furnitureGroup.images.length} bilder</span>\r\n          <img src=\"content/icons/arrow-right-circle.svg\"/>\r\n        </button> \r\n    </div>\r\n    `;\r\n\r\n    imageContainerElement.appendChild(imgWrapElement);\r\n  }\r\n  addOpenImageButtonsEventListeners();\r\n}\r\n\r\nfunction addEventListeners() {\r\n  hamburgerElement.addEventListener(\"click\", () =>\r\n    navElement.classList.toggle(\"active\")\r\n  );\r\n\r\n  imageContainerElement.addEventListener(\"click\", event => {\r\n    if (event.target.tagName !== \"IMG\") {\r\n      return;\r\n    }\r\n    const furnitureGroupId = event.target.dataset.furnitureGroupId;\r\n    openImage(furnitureGroupId);\r\n  });\r\n\r\n  imageModalElement.addEventListener(\"click\", () => {\r\n    chosenFurnitureGroup.navigateImages(\"next\");\r\n  });\r\n\r\n  closeModalButtonElement.addEventListener(\"click\", function() {\r\n    imageModalContainerElement.classList.remove(\"open\");\r\n    bodyElement.classList.remove(\"modal-open\");\r\n  });\r\n\r\n  window.addEventListener(\"click\", outsideImageClick);\r\n\r\n  addImageNavigationEventListeners();\r\n}\r\n\r\nfunction addOpenImageButtonsEventListeners() {\r\n  const openImageButtonElements = document.querySelectorAll(\r\n    \".furniture-details button\"\r\n  );\r\n\r\n  for (const button of openImageButtonElements) {\r\n    button.addEventListener(\"click\", function(event) {\r\n      openImage(button.dataset.furnitureGroupId);\r\n    });\r\n  }\r\n}\r\n\r\nfunction addImageNavigationEventListeners() {\r\n  for (const button of Array.from(imageNavigationButtons)) {\r\n    button.addEventListener(\"click\", function(event) {\r\n      const direction = button.dataset.direction;\r\n      chosenFurnitureGroup.navigateImages(direction);\r\n      event.stopPropagation();\r\n    });\r\n  }\r\n}\r\n\r\nfunction outsideImageClick(event) {\r\n  if (\r\n    event.srcElement.tagName === \"IMG\" ||\r\n    event.srcElement.classList.contains(\"image-navigation\")\r\n  ) {\r\n    return;\r\n  }\r\n  imageModalContainerElement.classList.remove(\"open\");\r\n  bodyElement.classList.remove(\"modal-open\");\r\n}\r\n\r\nfunction openImage(furnitureGroupId) {\r\n  chosenFurnitureGroup = getFurnitureGroupById(furnitureGroupId);\r\n\r\n  chosenFurnitureGroup.open();\r\n  bodyElement.classList.add(\"modal-open\");\r\n\r\n  event.stopPropagation();\r\n}\r\n\r\nfunction getFurnitureGroupById(furnitureGroupId) {\r\n  return _furniture_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(furnitureGroup => {\r\n    return furnitureGroup.id === furnitureGroupId;\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/furniture.js":
/*!**************************!*\
  !*** ./src/furniture.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst imageModalElement = document.querySelector(\"#image-modal img\");\r\nconst imageModalContainerElement = document.getElementById(\"image-modal\");\r\nconst progressContainerElement = document.getElementById(\"progress\");\r\nlet currentImageShownNum;\r\n\r\nclass FurnitureGroup {\r\n  constructor(id, name, price, images) {\r\n    this.id = id;\r\n    this.name = name;\r\n    this.price = price;\r\n    this.images = images;\r\n  }\r\n\r\n  open() {\r\n    imageModalElement.src = `content/images/${this.id}/${this.images[0]}`;\r\n    // imageModalElement.dataset.imageNumber = event.target.dataset.imageNumber;\r\n    imageModalContainerElement.classList.add(\"open\");\r\n    this.addProgressDots();\r\n    currentImageShownNum = 1;\r\n  }\r\n\r\n  addProgressDots() {\r\n    progressContainerElement.innerHTML = \"\";\r\n\r\n    for (let i = 0; i < this.images.length; i++) {\r\n      let progressDot = document.createElement(\"div\");\r\n      progressDot.className = \"progress-dot\";\r\n      progressContainerElement.append(progressDot);\r\n    }\r\n\r\n    progressContainerElement.children[0].classList.add(\"selected\");\r\n  }\r\n\r\n  navigateImages(direction) {\r\n    direction === \"next\" ? currentImageShownNum++ : currentImageShownNum--;\r\n\r\n    if (currentImageShownNum > this.images.length) {\r\n      currentImageShownNum = 1;\r\n    } else if (currentImageShownNum < 1) {\r\n      currentImageShownNum = this.images.length;\r\n    }\r\n\r\n    console.log(currentImageShownNum);\r\n\r\n    imageModalElement.src = `content/images/${\r\n      this.id\r\n    }/${currentImageShownNum}.jpg`;\r\n\r\n    Array.from(progressContainerElement.children).map(progressDot => {\r\n      progressDot.classList.remove(\"selected\");\r\n    });\r\n\r\n    progressContainerElement.children[currentImageShownNum - 1].classList.add(\r\n      \"selected\"\r\n    );\r\n  }\r\n}\r\n\r\n// prettier-ignore\r\nconst furnitureData = [\r\n  new FurnitureGroup(\r\n    \"group1\",\r\n    \"Bord & pallar\",\r\n    5400,\r\n    [\"1.jpg\", \"2.jpg\", \"3.jpg\", \"4.jpg\"]\r\n  ),\r\n  new FurnitureGroup(\r\n    \"group2\",\r\n    \"Månhylla\",\r\n    3800,\r\n    [\"1.jpg\", \"2.jpg\"]\r\n  ),\r\n  new FurnitureGroup(\r\n    \"group3\",\r\n    \"Charkbräda\",\r\n    2000,\r\n    [\"1.jpg\", \"2.jpg\"]\r\n  ),\r\n  new FurnitureGroup(\r\n    \"group4\",\r\n    \"Pallar\",\r\n    4500,\r\n    [\"1.jpg\"]\r\n  ) ,\r\n  new FurnitureGroup(\r\n    \"group5\",\r\n    \"Sidbord m. betongskiva\",\r\n    7000,\r\n    [\"1.jpg\", \"2.jpg\"]\r\n  ) ,\r\n  new FurnitureGroup(\r\n    \"group6\",\r\n    \"Vägghylla i fyra delar\",\r\n    4000,\r\n    [\"1.jpg\"]\r\n  ) ,\r\n  new FurnitureGroup(\r\n    \"group7\",\r\n    \"Sidobord svart\",\r\n    4500,\r\n    [\"1.jpg\", \"2.jpg\"]\r\n  ),\r\n  new FurnitureGroup(\r\n    \"group8\",\r\n    \"Utebänk\",\r\n    3300,\r\n    [\"1.jpg\", \"2.jpg\"]\r\n  )      \r\n];\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (furnitureData);\r\n\n\n//# sourceURL=webpack:///./src/furniture.js?");

/***/ })

/******/ });