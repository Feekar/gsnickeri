"use strict";
import furnitureData from "./furniture_data.js";
const hamburgerElement = document.querySelector(".hamburger");
const navElement = document.querySelector("nav");
const imageContainerElement = document.getElementById("furniture");
const imageModalContainerElement = document.getElementById("image-modal");
const closeModalButtonElement = document.querySelector("#image-modal .close");
const detailImagesContainerElement = document.querySelector(
  "#detail-images-container"
);
const imageNavigationButtons = document.getElementsByClassName(
  "image-navigation"
);

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
      navigateModalImages(direction);
    });
  }
}
// imageModalElement.addEventListener("click", () =>
//   navigateModalImages("next")
// );

// function navigateModalImages(direction) {
//   let newImageNumber = parseInt(imageModalElement.dataset.imageNumber);
//   direction === "next" ? newImageNumber++ : newImageNumber--;
//   if (newImageNumber > imagesCount) {
//     newImageNumber = 1;
//   } else if (newImageNumber < 1) {
//     newImageNumber = imagesCount;
//   }

//   imageModalElement.src = `content/images/${newImageNumber}.jpg`;
//   imageModalElement.dataset.imageNumber = newImageNumber;
// }

function openClickedImage(event) {
  if (event.target.tagName !== "IMG") {
    return;
  }
  const furnitureGroupId = event.target.dataset.furnitureGroupId;
  const clickedFurnitureGroup = getFurnitureGroupById(furnitureGroupId);

  clickedFurnitureGroup.open();

  event.stopPropagation();
}

function getFurnitureGroupById(furnitureGroupId) {
  return furnitureData.find(furnitureGroup => {
    return furnitureGroup.id === event.target.dataset.furnitureGroupId;
  });
}
