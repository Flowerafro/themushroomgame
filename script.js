const intro = document.getElementById("wrap-intro");
const counter = document.getElementById("counter");
const mushroomPath = document.getElementById("mushroom-path-section");

const basket = document.getElementById("basket");
const basketimg = document.getElementById("basket-img");
const basketfill = document.getElementById("basket-fill");
const baskettext = document.getElementById("basket-text");
const mushroomInfo = document.getElementById("mushroom-info");
const article = document.getElementById("article");

// tom array for soppkurven
const basketContent = [];
// tom arrays for giftig og ikke-giftig sopp
let count = 0;
let poisonCount = 0;
let notPoisonCount = 0;

// Array for mushroom data - skal være grunnlaget for å generere html-elementer via js i stedet for å skrive de ut manuelt i html
const mushroomData = [
    {
        id: 1,
        type: "poison",
        src: "IMG/fluesopp.png",
        name: "Fluesopp",
        info: "info om fluesopp",
        alt: "fluesopp"
    },
    {
        id: 2,
        type: "poison",
        src: "IMG/hvitfluesopp.png",
        name: "Hvit fluesopp",
        info: "info om hvit fluesopp",
        alt: "hvitfluesopp"
    },
    {
        id: 3,
        type: "poison",
        src: "IMG/spissgiftslorsopp.png",
        name: "Spiss Giftslørsopp",
        info: "info om hvit spillslørsopp",
        alt: "spissgiftslorsopp"
    },
    {
        id: 4,
        type: "poison",
        src: "IMG/flatklokkehatt.png",
        name: "Flatklokkehatt",
        info: "info om hvit flatklokkehatt",
        alt: "flatklokkehatt"
    },
    {
        id: 5,
        type: "notpoison",
        src: "IMG/steinsopp.png",
        name: "Steinsopp",
        info: "info om hvit steinsopp",
        alt: "steinsopp"
    },
    {
        id: 6,
        type: "notpoison",
        src: "IMG/kantarell.png",
        name: "kantarell",
        info: "info om kantarell",
        alt: "kantarell"
    },
    {
        id: 7,
        type: "notpoison",
        src: "IMG/ametystsopp.png",
        name: "Ametystsopp",
        info: "info om ametystsopp",
        alt: "ametystsopp"
    },
    {
        id: 8,
        type: "notpoison",
        src: "IMG/fungi.png",
        name: "Matsopp",
        info: "info om matsopp",
        alt: "mat-sopp"
    },
];


/* Funksjon som randomiserer soppen */
function randomizeMushrooms() {
    return mushroomData.sort(() => Math.random() - 0.5);
}

/* Funksjon som genererer HTML-elementer fra Array MushroomData */
function generateMushroomElements() {
    const mushroomParent = document.getElementById('mushroom-path');
    const randomMushroom = randomizeMushrooms([...mushroomData]);

    randomMushroom.map(mushroom => {
        const mushroomImg = document.createElement('div');
        mushroomImg.className = 'mushroom';
        mushroomImg.id = mushroom.id;
        mushroomImg.type = mushroom.type;


        mushroomImg.innerHTML = `<img src="${mushroom.src}" alt="${mushroom.alt}">`;
        mushroomParent.appendChild(mushroomImg);
    });

    // Velger kun elementer med klassen .mushroom etter at de er generert
    const mushrooms = Array.from(mushroomParent.querySelectorAll('.mushroom'));

    // AddEventListner på mushroom-elementene, som legges inn i basketContent-array når de klikkes på
    mushrooms.map(mushroom => {
        mushroom.addEventListener('click', () => {
            basketContent.push({
                id: mushroom.id,
                type: mushroom.type,
                content: mushroom.innerHTML
            });
            counter.innerHTML = basketContent.length; /* teller antall sopp du har plukket */
            mushroom.style.display = 'none';
            console.log(basketContent);
        });
    });
}
generateMushroomElements();

/* Funksjon som henter info til mushroom-info */

function getMushroomData(basketContent) {
    return mushroomData.filter(mushroom => {
        return basketContent.some(item => item.content.includes(mushroom.src));
    });
}

/* Klikk på soppkurven skal vise: innholdet i kurven og artikkel, feilmeld om kurven er tom, og fjerne spillet (da er spillet over)*/
basket.addEventListener('click', () => {
    if (basketContent.length === 0) {
        alert('ops! Ser ut som at du må tilbake til skogs og plukke sopp før vi kan sjekke kurven din!');
        return;
    } else {
        intro.style.display = 'none';
        mushroomPath.style.display = 'none';

        basketimg.classList.add('basket-tilt');
        basketfill.innerHTML = '';

        basketContent.map(item => {
            const mushroomDiv = document.createElement('div');
            mushroomDiv.className = 'mushroom';
            mushroomDiv.innerHTML = item.content;
            basketfill.appendChild(mushroomDiv);
        });

        mushroomInfo.innerHTML = getMushroomData(basketContent).map(mushroom => {
            return `<div class="mushroom">
                <img src="${mushroom.src}" alt="${mushroom.alt}">
                <h3>${mushroom.name}</h3>
                <p>${mushroom.info}</p>
                <p>${mushroom.type}</p>
            </div>`;
        }).join('');

        /* Fjerner gammel klasse og legger til ny */
        const mushroomElements = mushroomInfo.querySelectorAll('.mushroom');
        mushroomElements.forEach(mushroom => {
            mushroom.classList.remove('mushroom');
            mushroom.classList.add('mushroom-card');
        });

        /* article.innerHTML = `<h2>Artikkel tittel</h2>
        <h3>undertittel</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam asperiores inventore laudantium molestias
            cupiditate ullam labore accusamus, eum enim assumenda, reiciendis mollitia tempora ratione incidunt
            suscipit ofte distinctio dolorum quia esse facilis? Dolore necessitatibus nobis soluta inventore facere
            consequuntur nam adipisci sunt quisquam iure modi, assumenda earum sit eius minus!</p>`;
        article.classList.add('article'); */

        /* displayMushroomData(); */

        displayScore();

    }
});

/* display score: hvor mange sopp er giftig og ikke-giftig? */
function displayScore() {
    poisonCount = 0;
    notPoisonCount = 0;

    basketContent.map(mushroom => {
        if (mushroom.type === 'poison') {
            poisonCount++;
        } else if (mushroom.type === 'notpoison') {
            notPoisonCount++;
        }
    });
    // if else som bestemmer om basket-text skal vise om du kan spise soppen eller ikke
    if (poisonCount > 0) {
        baskettext.innerHTML = `<p>Å nei, du må kaste alt! <br> Når du har giftig sopp i kurven din, kan du ikke spise noen har de du har plukket..</p>
        <p>Du har plukket ${poisonCount} giftige sopp og ${notPoisonCount} ikke-giftig sopp</p>`;
    } else {
        baskettext.innerHTML = `<p>Gratulerer! Du har plukket gift-fri sopp og kan spise den!</p
        <p>Du har plukket ${poisonCount} giftige sopp og ${notPoisonCount} ikke-giftig sopp</p>`;
    }
}

