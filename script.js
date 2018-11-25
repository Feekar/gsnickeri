"use strict";
const hamburgerElement = document.querySelector(".hamburger");
const navElement = document.querySelector("nav");
const imageContainerElement = document.getElementById("furniture");
const imageModalContainerElement = document.getElementById("image-modal");
const imageModalElement = document.querySelector("#image-modal img");
const closeModalButtonElement = document.querySelector("#image-modal .close");
const imageNavigationButtons = document.getElementsByClassName(
  "image-navigation"
);

const imagesCount = 10;

(function createImageElements() {
  for (var i = 1; i <= imagesCount; i++) {
    let imgElement = document.createElement("img");
    imgElement.dataset.imageNumber = i;
    imgElement.src = `content/images/${i}.jpg`;
    imageContainerElement.appendChild(imgElement);
    // firstImage.appendChild(node);
  }
})();

(function addEventListeners() {
  hamburgerElement.addEventListener("click", function() {
    navElement.classList.toggle("active");
  });

  imageContainerElement.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") {
      imageModalElement.src = event.target.src;
      imageModalElement.dataset.imageNumber = event.target.dataset.imageNumber;
      imageModalContainerElement.classList.add("open");
    }
    event.stopPropagation();
  });

  closeModalButtonElement.addEventListener("click", function() {
    imageModalContainerElement.classList.remove("open");
  });

  imageModalElement.addEventListener("click", navigateModalImages("next"));

  for (const button of imageNavigationButtons) {
    button.addEventListener("click", function() {
      const direction = button.dataset.direction;
      navigateModalImages(direction);
    });
  }

  window.addEventListener("click", function(event) {
    if (
      event.srcElement.tagName === "IMG" ||
      event.srcElement.classList.contains("image-navigation")
    ) {
      return;
    }
    imageModalContainerElement.classList.remove("open");
  });
})();

function navigateModalImages(direction) {
  let newImageNumber = parseInt(imageModalElement.dataset.imageNumber);
  direction === "next" ? newImageNumber++ : newImageNumber--;
  if (newImageNumber > imagesCount) {
    newImageNumber = 1;
  } else if (newImageNumber < 1) {
    newImageNumber = imagesCount;
  }

  imageModalElement.src = `content/images/${newImageNumber}.jpg`;
  imageModalElement.dataset.imageNumber = newImageNumber;
}
