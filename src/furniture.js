const imageModalElement = document.querySelector("#image-modal img");
const imageModalContainerElement = document.getElementById("image-modal");
const progressContainerElement = document.getElementById("progress");
let currentImageShownNum;
const imageBasePath = "content/images/";

class FurnitureGroup {
  constructor(id, name, price, images) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.images = images;
    this.hasBeenLoaded = false;
  }

  open() {
    imageModalElement.src = `${imageBasePath}${this.id}/${this.images[0]}`;
    imageModalContainerElement.classList.add("open");
    this.preloadImages();
    currentImageShownNum = 1;
  }

  navigateImages(direction) {
    direction === "next" ? currentImageShownNum++ : currentImageShownNum--;

    if (currentImageShownNum > this.images.length) {
      currentImageShownNum = 1;
    } else if (currentImageShownNum < 1) {
      currentImageShownNum = this.images.length;
    }

    imageModalElement.src = `${imageBasePath}${
      this.id
    }/${currentImageShownNum}.jpg`;

    Array.from(progressContainerElement.children).map(progressDot => {
      progressDot.classList.remove("selected");
    });

    progressContainerElement.children[currentImageShownNum - 1].classList.add(
      "selected"
    );
  }

  preloadImages() {
    if (this.hasBeenLoaded) {
      return;
    }

    for (let image of this.images) {
      var imageObject = new Image();
      imageObject.src = `${imageBasePath}/${this.id}/${image}`;
    }
    this.hasBeenLoaded = true;
  }
}

// prettier-ignore
const furnitureData = [
  new FurnitureGroup(
    "group1",
    "Bord & pallar",
    5400,
    ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  ),
  new FurnitureGroup(
    "group2",
    "Månhylla",
    3800,
    ["1.jpg", "2.jpg"]
  ),
  new FurnitureGroup(
    "group3",
    "Charkbräda",
    2000,
    ["1.jpg", "2.jpg"]
  ),
  new FurnitureGroup(
    "group4",
    "Pallar",
    4500,
    ["1.jpg"]
  ) ,
  new FurnitureGroup(
    "group5",
    "Sidbord m. betongskiva",
    7000,
    ["1.jpg", "2.jpg"]
  ) ,
  new FurnitureGroup(
    "group6",
    "Vägghylla i fyra delar",
    4000,
    ["1.jpg"]
  ) ,
  new FurnitureGroup(
    "group7",
    "Sidobord svart",
    4500,
    ["1.jpg", "2.jpg"]
  ),
  new FurnitureGroup(
    "group8",
    "Utebänk",
    3300,
    ["1.jpg", "2.jpg"]
  )      
];

export default furnitureData;
