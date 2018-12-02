"use strict";
import furnitureData from "./furniture_data.js";
const hamburgerElement = document.querySelector(".hamburger");
const navElement = document.querySelector("nav");
const imageContainerElement = document.getElementById("furniture");
const imageModalContainerElement = document.getElementById("image-modal");
const closeModalButtonElement = document.querySelector("#image-modal .close");
const imageModalElement = document.querySelector("#image-modal img");

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
    let imgElement = document.createElement("img");
    imgElement.src = `content/images/${furnitureGroup.id}/${
      furnitureGroup.images[0]
    }`;
    imgElement.dataset.furnitureGroupId = furnitureGroup.id;
    imageContainerElement.appendChild(imgElement);
  }
}

function addEventListeners() {
  hamburgerElement.addEventListener("click", () =>
    navElement.classList.toggle("active")
  );

  imageContainerElement.addEventListener("click", event => {
    openClickedImage(event);
  });

  imageModalElement.addEventListener("click", () => {
    chosenFurnitureGroup.navigateImages("next");
  });

  closeModalButtonElement.addEventListener("click", function() {
    imageModalContainerElement.classList.remove("open");
  });

  window.addEventListener("click", function(event) {
    if (
      event.srcElement.tagName === "IMG" ||
      event.srcElement.classList.contains("image-navigation")
    ) {
      return;
    }
    imageModalContainerElement.classList.remove("open");
  });

  for (const button of imageNavigationButtons) {
    button.addEventListener("click", function() {
      const direction = button.dataset.direction;
      chosenFurnitureGroup.navigateImages(direction);
    });
  }
}

function openClickedImage(event) {
  if (event.target.tagName !== "IMG") {
    return;
  }
  const furnitureGroupId = event.target.dataset.furnitureGroupId;
  chosenFurnitureGroup = getFurnitureGroupById(furnitureGroupId);

  chosenFurnitureGroup.open();

  event.stopPropagation();
}

function getFurnitureGroupById(furnitureGroupId) {
  return furnitureData.find(furnitureGroup => {
    return furnitureGroup.id === event.target.dataset.furnitureGroupId;
  });
}
