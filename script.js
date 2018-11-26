"use strict";

import furnitureData from "./furniture_data.js";

const hamburgerElement = document.querySelector(".hamburger");
const navElement = document.querySelector("nav");
const imageContainerElement = document.getElementById("furniture");
const imageModalContainerElement = document.getElementById("image-modal");
const imageModalElement = document.querySelector("#image-modal img");
const closeModalButtonElement = document.querySelector("#image-modal .close");
const detailImagesContainerElement = document.querySelector(
  "#detail-images-container"
);
const imageNavigationButtons = document.getElementsByClassName(
  "image-navigation"
);

(function createImageElements() {
  for (let furnitureGroup of furnitureData) {
    let imgElement = document.createElement("img");
    imgElement.src = `content/images/${furnitureGroup.id}/${
      furnitureGroup.images[0]
    }`;
    imgElement.dataset.groupId = furnitureGroup.id;
    imageContainerElement.appendChild(imgElement);
  }

  // for (var i = 1; i <= imagesCount; i++) {
  //   let imgElement = document.createElement("img");
  //   // imgElement.dataset.imageNumber = i;
  //   imgElement.src = `content/images/${i}.jpg`;
  //   imageContainerElement.appendChild(imgElement);
  // }
})();

(function addEventListeners() {
  hamburgerElement.addEventListener("click", function() {
    navElement.classList.toggle("active");
  });

  imageContainerElement.addEventListener("click", function(event) {
    openClickedImage(event);
    addDetailImages(event);
  });

  closeModalButtonElement.addEventListener("click", function() {
    imageModalContainerElement.classList.remove("open");
  });

  // imageModalElement.addEventListener("click", () =>
  //   navigateModalImages("next")
  // );

  // for (const button of imageNavigationButtons) {
  //   button.addEventListener("click", function() {
  //     const direction = button.dataset.direction;
  //     navigateModalImages(direction);
  //   });
  // }

  // window.addEventListener("click", function(event) {
  //   if (
  //     event.srcElement.tagName === "IMG" ||
  //     event.srcElement.classList.contains("image-navigation")
  //   ) {
  //     return;
  //   }
  //   imageModalContainerElement.classList.remove("open");
  // });
})();

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
  if (event.target.tagName === "IMG") {
    imageModalElement.src = event.target.src;
    imageModalElement.dataset.imageNumber = event.target.dataset.imageNumber;
    imageModalContainerElement.classList.add("open");
  }
  event.stopPropagation();
}

function addDetailImages(event) {
  detailImagesContainerElement;
  const groupId = event.srcElement.dataset.groupId;

  const chosenGroup = furnitureData.find(furnitureGroup => {
    return furnitureGroup.id === groupId;
  });
  detailImagesContainerElement.innerHTML = "";

  for (let image of chosenGroup.images) {
    let imgElement = document.createElement("img");
    imgElement.src = `content/images/${chosenGroup.id}/${image}`;
    detailImagesContainerElement.appendChild(imgElement);
  }

  // imgElement.src = `content/images/${furnitureGroup.id}/${
  //   furnitureGroup.images[0]
  // }`;
}
