const imageModalElement = document.querySelector("#image-modal img");
const imageModalContainerElement = document.getElementById("image-modal");
const progressContainerElement = document.getElementById("progress");
let currentImageShownNum;

class FurnitureGroup {
  constructor(id, name, price, images) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.images = images;
  }

  open() {
    imageModalElement.src = `content/images/${this.id}/${this.images[0]}`;
    // imageModalElement.dataset.imageNumber = event.target.dataset.imageNumber;
    imageModalContainerElement.classList.add("open");
    this.addProgressDots();
    currentImageShownNum = 1;
  }

  addProgressDots() {
    progressContainerElement.innerHTML = "";

    for (let i = 0; i < this.images.length; i++) {
      let progressDot = document.createElement("div");
      progressDot.className = "progress-dot";
      progressContainerElement.append(progressDot);
    }

    progressContainerElement.children[0].classList.add("selected");
  }

  navigateImages(direction) {
    direction === "next" ? currentImageShownNum++ : currentImageShownNum--;

    if (currentImageShownNum > this.images.length) {
      currentImageShownNum = 1;
    } else if (currentImageShownNum < 1) {
      currentImageShownNum = this.images.length;
    }

    console.log(currentImageShownNum);

    imageModalElement.src = `content/images/${
      this.id
    }/${currentImageShownNum}.jpg`;

    Array.from(progressContainerElement.children).map(progressDot => {
      progressDot.classList.remove("selected");
    });

    progressContainerElement.children[currentImageShownNum - 1].classList.add(
      "selected"
    );
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
    )  
];

export default furnitureData;
