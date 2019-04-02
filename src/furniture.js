const imageModalElement = document.querySelector('#image-modal img');
const imageModalContainerElement = document.getElementById('image-modal');
const progressContainerElement = document.getElementById('progress');
let currentImageShownNum;
const imageBasePath = 'content/images/';

class FurnitureGroup {
  constructor(id, name, price, priceType, description, images) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.priceType = priceType;
    this.description = description;
    this.images = images;
    this.hasBeenLoaded = false;
    this.descriptionOpened = false;
  }

  open() {
    imageModalElement.src = `${imageBasePath}${this.id}/${this.images[0]}`;
    imageModalContainerElement.classList.add('open');
    this.preloadImages();
    currentImageShownNum = 1;
  }

  navigateImages(direction) {
    direction === 'next' ? currentImageShownNum += 1 : currentImageShownNum -= 1;

    if (currentImageShownNum > this.images.length) {
      currentImageShownNum = 1;
    } else if (currentImageShownNum < 1) {
      currentImageShownNum = this.images.length;
    }

    imageModalElement.src = `${imageBasePath}${this.id}/${currentImageShownNum}.jpg`;

    Array.from(progressContainerElement.children).forEach((progressDot) => {
      progressDot.classList.remove('selected');
    });

    progressContainerElement.children[currentImageShownNum - 1].classList.add(
      'selected',
    );
  }

  preloadImages() {
    if (this.hasBeenLoaded) {
      return;
    }

    this.images.forEach((image) => {
      const imageObject = new Image();
      imageObject.src = `${imageBasePath}${this.id}/${image}`;
    });

    this.hasBeenLoaded = true;
  }
}

const furnitureData = [
  new FurnitureGroup(
    'group1',
    'Bord & pallar för barn',
    3200,
    'kr',
    'Ben av ek, skiva av valchromat. Pall 28 cm hög, 29 cm i diam. Bord 45 cm hög, 60 cm i diam.<br/> Pall 1000 kr/st. Bord 1500 kr/st. Hela gruppen 3200 kr',
    ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  ),
  new FurnitureGroup(
    'group2',
    'Månhylla',
    1400,
    'kr',
    'Furu, mörkbetsad. 40 cm hög.',
    ['1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group3',
    'Charkbräda',
    500,
    'kr/st',
    'Ek eller valnöt. Total läng 78 cm. ”Uppläggningsyta” 20 cm x 60 cm.',
    ['1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group4',
    'Barnpallar',
    1500,
    'kr/st',
    'Ben av vitmålad furu. Tvåfärgad sits av valchromat. 28 cm hög, 29 cm i diam',
    ['1.jpg'],
  ),
  new FurnitureGroup(
    'group5',
    'Sidebord med betongskiva',
    3000,
    'kr/st utan ljuskoppar',
    'Benställning och nedre hylla av ek. Skiva av betong. Bredd 120 cm, djup 25 cm, höjd 75 cm.',
    ['1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group6',
    'Vägghylla',
    800,
    'kr/st',
    'Priset kan variera beroende på storlek',
    ['1.jpg'],
  ),
  new FurnitureGroup(
    'group7',
    'Sidobord/nattygsbord',
    1100,
    'kr',
    'Svartmålad plywood. Bredd 50 cm, djup 43 cm, höjd 55 cm.<br/>Även bra att ställa skrivaren på och förvara papper på hyllan undertill.',
    ['1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group8',
    'Sittbänk',
    3500,
    'kr',
    'Oljad furu. Sitsen är ribbad. Bredd 100 cm, djup 35 cm, höjd 45 cm',
    ['1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group9',
    'Förvaringsmöbel',
    2000,
    'kr',
    'Ställning av ek, lådorna är av valchromat och är sinkade i hörnen. 40 cm hög. 30 cm djup. 66 cm bred. <br/>Kan köpas med 3 lådor för 2800kr',
    ['1.jpg'],
  ),
  new FurnitureGroup(
    'group10',
    'Bricka',
    900,
    'kr',
    'Oljad ek med epoxigjutning. 31x45 cm',
    ['3.jpg', '1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group11',
    'Matbord',
    6000,
    'kr',
    'Svart genomfärgad mdf med epoxigjutning. 105 cm i diam. Epoxi finns i fler färger.',
    ['1.jpg', '2.jpg'],
  ),
  new FurnitureGroup(
    'group12',
    'Soffbord',
    'x',
    'kr',
    'Soffbord. Skiva i vitoljad ek med epoxigjutning. Underrede i målad furu. Kontakta mig för eget förslag på storlek och utförande.',
    ['1.jpg', '2.jpg', '3.png'],
  ),
];

export default furnitureData;
