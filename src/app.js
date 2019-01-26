import ScrollReveal from 'scrollreveal';
import furnitureData from './furniture';
import generateImageMarkup from './htmlHandler';

const hamburgerElement = document.querySelector('.hamburger');
const navElement = document.querySelector('nav');
const imageContainerElement = document.getElementById('furniture');
const imageModalContainerElement = document.getElementById('image-modal');
const closeModalButtonElement = document.querySelector('#image-modal .close');
const imageModalElement = document.querySelector('#image-modal img');
const bodyElement = document.querySelector('body');
const progressContainerElement = document.getElementById('progress');

const imageNavigationButtons = document.getElementsByClassName(
  'image-navigation',
);

let chosenFurnitureGroup;

(function initialize() {
  initImages();
  addEventListeners();
  addScrollRevealAnimation();
}());

function initImages() {
  generateImageMarkup();
  addOpenImageButtonsEventListeners();
}

function addEventListeners() {
  hamburgerElement.addEventListener('click', () => navElement.classList.toggle('active'));

  imageContainerElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'IMG') {
      return;
    }
    const { furnitureGroupId } = event.target.dataset;
    openImage(furnitureGroupId);
  });

  imageModalElement.addEventListener('click', () => {
    chosenFurnitureGroup.navigateImages('next');
  });

  closeModalButtonElement.addEventListener('click', () => {
    imageModalContainerElement.classList.remove('open');
    bodyElement.classList.remove('modal-open');
  });

  window.addEventListener('click', outsideImageClick);

  addImageNavigationEventListeners();
}

function addOpenImageButtonsEventListeners() {
  const openImageButtonElements = document.querySelectorAll(
    '.furniture-details button',
  );

  openImageButtonElements.forEach((button) => {
    button.addEventListener('click', () => {
      openImage(button.dataset.furnitureGroupId);
    });
  });
}

function addImageNavigationEventListeners() {
  Array.from(imageNavigationButtons).forEach((button) => {
    button.addEventListener('click', (event) => {
      const { direction } = button.dataset;
      chosenFurnitureGroup.navigateImages(direction);
      event.stopPropagation();
    });
  });
}

function outsideImageClick(event) {
  if (
    event.srcElement.tagName === 'IMG'
    || event.srcElement.classList.contains('image-navigation')
  ) {
    return;
  }
  imageModalContainerElement.classList.remove('open');
  bodyElement.classList.remove('modal-open');
}

function openImage(furnitureGroupId) {
  chosenFurnitureGroup = getFurnitureGroupById(furnitureGroupId);

  chosenFurnitureGroup.open();
  bodyElement.classList.add('modal-open');
  addProgressDots(chosenFurnitureGroup.images.length);

  window.event.stopPropagation();
}

function getFurnitureGroupById(furnitureGroupId) {
  return furnitureData.find(furnitureGroup => furnitureGroup.id === furnitureGroupId);
}

function addProgressDots(numberOfImages) {
  progressContainerElement.innerHTML = '';

  for (let i = 0; i < numberOfImages; i += 1) {
    const progressDot = document.createElement('div');
    progressDot.className = 'progress-dot';
    progressContainerElement.append(progressDot);
  }

  progressContainerElement.children[0].classList.add('selected');
}

function addScrollRevealAnimation() {
  const sr = ScrollReveal();
  sr.reveal('.furniture-img-wrap', {
    duration: 2200,
    distance: '2rem',
    interval: 200,
  });
  sr.reveal('#introduction', { duration: 1500 });
  sr.reveal('nav', { duration: 1000 });
}
