"use strict";
import furnitureData from "./furniture.js";

const hamburgerElement = document.querySelector(".hamburger");
const navElement = document.querySelector("nav");
const imageContainerElement = document.getElementById("furniture");
const imageModalContainerElement = document.getElementById("image-modal");
const closeModalButtonElement = document.querySelector("#image-modal .close");
const imageModalElement = document.querySelector("#image-modal img");
const bodyElement = document.querySelector("body");
const progressContainerElement = document.getElementById("progress");

const imageNavigationButtons = document.getElementsByClassName(
  "image-navigation"
);

let chosenFurnitureGroup;

(function initialize() {
  initImages();
  addEventListeners();
})();

function initImages() {
  for (let furnitureGroup of furnitureData) {
    let imgWrapElement = document.createElement("div");
    imgWrapElement.classList.add("furniture-img-wrap");
    // prettier-ignore
    imgWrapElement.innerHTML = `
    <div class="name">${furnitureGroup.name}</div>
    <img src="content/images/${furnitureGroup.id}/${furnitureGroup.images[0]}" 
          data-furniture-group-id="${furnitureGroup.id}"/>
    <div class="furniture-details">
      <div>
        ${furnitureGroup.price} 
        <span>SEK</span> 
      </div>
        <button class="open-furniture-group" data-furniture-group-id="${furnitureGroup.id}">
          <span>${furnitureGroup.images.length} bilder</span>
          <img src="content/icons/arrow-right-circle.svg"/>
        </button> 
    </div>
    `;

    imageContainerElement.appendChild(imgWrapElement);
  }
  addOpenImageButtonsEventListeners();
}

function addEventListeners() {
  hamburgerElement.addEventListener("click", () =>
    navElement.classList.toggle("active")
  );

  imageContainerElement.addEventListener("click", event => {
    if (event.target.tagName !== "IMG") {
      return;
    }
    const furnitureGroupId = event.target.dataset.furnitureGroupId;
    openImage(furnitureGroupId);
  });

  imageModalElement.addEventListener("click", () => {
    chosenFurnitureGroup.navigateImages("next");
  });

  closeModalButtonElement.addEventListener("click", function() {
    imageModalContainerElement.classList.remove("open");
    bodyElement.classList.remove("modal-open");
  });

  window.addEventListener("click", outsideImageClick);

  addImageNavigationEventListeners();
}

function addOpenImageButtonsEventListeners() {
  const openImageButtonElements = document.querySelectorAll(
    ".furniture-details button"
  );

  for (const button of openImageButtonElements) {
    button.addEventListener("click", function(event) {
      openImage(button.dataset.furnitureGroupId);
    });
  }
}

function addImageNavigationEventListeners() {
  for (const button of Array.from(imageNavigationButtons)) {
    button.addEventListener("click", function(event) {
      const direction = button.dataset.direction;
      chosenFurnitureGroup.navigateImages(direction);
      event.stopPropagation();
    });
  }
}

function outsideImageClick(event) {
  if (
    event.srcElement.tagName === "IMG" ||
    event.srcElement.classList.contains("image-navigation")
  ) {
    return;
  }
  imageModalContainerElement.classList.remove("open");
  bodyElement.classList.remove("modal-open");
}

function openImage(furnitureGroupId) {
  chosenFurnitureGroup = getFurnitureGroupById(furnitureGroupId);

  chosenFurnitureGroup.open();
  bodyElement.classList.add("modal-open");
  addProgressDots(chosenFurnitureGroup.images.length);

  event.stopPropagation();
}

function getFurnitureGroupById(furnitureGroupId) {
  return furnitureData.find(furnitureGroup => {
    return furnitureGroup.id === furnitureGroupId;
  });
}

function addProgressDots(numberOfImages) {
  progressContainerElement.innerHTML = "";

  for (let i = 0; i < numberOfImages; i++) {
    let progressDot = document.createElement("div");
    progressDot.className = "progress-dot";
    progressContainerElement.append(progressDot);
  }

  progressContainerElement.children[0].classList.add("selected");
}
