"use strict";
import furnitureData from "./furniture.js";
import ScrollReveal from "scrollreveal";
import generateImageMarkup from "./htmlHandler";

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
  addScrollRevealAnimation();
})();

function initImages() {
  generateImageMarkup();
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

function addScrollRevealAnimation() {
  let sr = ScrollReveal();
  sr.reveal(".furniture-img-wrap", {
    duration: 2200,
    distance: "2rem",
    interval: 200
  });
  sr.reveal("#introduction", { duration: 1500 });
}
