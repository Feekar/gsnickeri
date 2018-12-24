import furnitureData from "./furniture.js";
const imageContainerElement = document.getElementById("furniture");

function generateImageMarkup() {
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
            <span>${furnitureGroup.priceType}</span> 
          </div>
            <button class="open-furniture-group" data-furniture-group-id="${furnitureGroup.id}">
              <span>${furnitureGroup.images.length} bilder</span>
              <img src="content/icons/arrow-right-circle.svg"/>
            </button> 
        </div>
        <p class="furniture-description">
          ${furnitureGroup.description}
        </p>
        `;
    imageContainerElement.appendChild(imgWrapElement);
  }
}

export default generateImageMarkup;
