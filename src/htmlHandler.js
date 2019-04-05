import furnitureData from './furniture';

const imageContainerElement = document.getElementById('furniture');
const inspirationImageContainerElement = document.getElementById('inspiration-images');
const INSPIRATION_IMAGE_COUNT = 7;

function generateImageMarkup() {
  furnitureData.forEach((furnitureGroup) => {
    const imgWrapElement = document.createElement('div');
    imgWrapElement.classList.add('furniture-img-wrap');
    imgWrapElement.classList.add(furnitureGroup.id);
    imgWrapElement.innerHTML = `
        <img src="content/images/${furnitureGroup.id}/${furnitureGroup.images[0]}" 
              data-furniture-group-id="${furnitureGroup.id}" alt="furniture ${furnitureGroup.id}"/>
        <section id="furniture-bottom">
        <div class="name">${furnitureGroup.name}</div>
        <div class="furniture-details">
          <div>
            ${furnitureGroup.price} 
            <span>${furnitureGroup.priceType}</span> 
          </div>
            <button class="open-furniture-group" data-furniture-group-id="${furnitureGroup.id}">
              <span>${furnitureGroup.images.length} bilder</span>
            </button> 
        </div>
        <p class="furniture-description">
          ${furnitureGroup.description}
        </p>
        </section>
        
        `;
    imageContainerElement.appendChild(imgWrapElement);
  });
}

function generateInspirationImageMarkup() {
  for (let i = 1; i < INSPIRATION_IMAGE_COUNT; i += 1) {
    const imgWrapElement = document.createElement('div');

    imgWrapElement.classList.add('inspiration-img-wrap');
    imgWrapElement.innerHTML = `<img src="content/images/inspiration/${i}.jpg" alt="furniture${i}"></img>`;
    inspirationImageContainerElement.appendChild(imgWrapElement);
  }
}

export { generateImageMarkup, generateInspirationImageMarkup };
