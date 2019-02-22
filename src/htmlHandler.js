import furnitureData from './furniture';

const imageContainerElement = document.getElementById('furniture');

function generateImageMarkup() {
  furnitureData.forEach((furnitureGroup) => {
    const imgWrapElement = document.createElement('div');
    imgWrapElement.classList.add('furniture-img-wrap');
    imgWrapElement.classList.add(furnitureGroup.id);
    imgWrapElement.innerHTML = `
        <img src="content/images/${furnitureGroup.id}/${furnitureGroup.images[0]}" 
              data-furniture-group-id="${furnitureGroup.id}"/>
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

export default generateImageMarkup;
