"use strict";
const hamburgerElement = document.querySelector(".hamburger");
const navElement = document.querySelector("nav");
const imageContainerElement = document.getElementById("furniture");
const imageModalContainerElement = document.getElementById("image-modal");
const imageModalElement = document.querySelector("#image-modal img");
const closeModalButtonElement = document.querySelector("#image-modal .close");

const imagesCount = 10;

hamburgerElement.addEventListener("click", function() {
  navElement.classList.toggle("active");
});

for (var i = 1; i < imagesCount; i++) {
  let imgElement = document.createElement("img");
  imgElement.src = `content/images/${i}.jpg`;
  imageContainerElement.appendChild(imgElement);
  // firstImage.appendChild(node);
}

imageContainerElement.addEventListener("click", function(event) {
  if (event.target.tagName === "IMG") {
    imageModalElement.src = event.target.src;
    imageModalContainerElement.classList.add("open");
  }
});

closeModalButtonElement.addEventListener("click", function() {
  imageModalContainerElement.classList.remove("open");
});
