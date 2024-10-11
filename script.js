const intro = document.getElementById("wrap-intro");
const mushroomPath = document.getElementById("mushroom-path");

const basket = document.getElementById("basket");
const basketimg = document.getElementById("basket-img");
const basketfill = document.getElementById("basket-fill");
const baskettext = document.getElementById("basket-text");
const mushroomInfo = document.getElementById("mushroom-info");
const article = document.getElementById("article");

// tom array for soppkurven
const basketContent = [];
// tom arrays for giftig og ikke-giftig sopp
let poisonCount = 0;
let notPoisonCount = 0;

// Array for mushroom data - skal være grunnlaget for å generere html-elementer via js i stedet for å skrive de ut manuelt i html
const mushroomData = [
    {
        id: "poison",
        src: "IMG/fluesopp.png",
        type: "Fluesopp",
        info: "info om fluesopp",
        alt: "fluesopp"
    },
    {
        id: "poison",
        src: "IMG/hvitfluesopp.png",
        type: "Hvit fluesopp",
        info: "info om hvit fluesopp",
        alt: "hvitfluesopp"
    },
    {
        id: "poison",
        src: "IMG/spissgiftslorsopp.png",
        type: "Spiss Giftslørsopp",
        alt: "spissgiftslorsopp"
    },
    {
        id: "poison",
        src: "IMG/flatklokkehatt.png",
        type: "Flatklokkehatt",
        alt: "flatklokkehatt"
    },
    {
        id: "notpoison",
        src: "IMG/steinsopp.png",
        type: "Steinsopp",
        alt: "steinsopp"
    },
    {
        id: "notpoison",
        src: "IMG/kantarell.png",
        type: "kantarell",
        alt: "kantarell"
    },
    {
        id: "notpoison",
        src: "IMG/ametystsopp.png",
        type: "Ametystsopp",
        alt: "ametystsopp"
    },
    {
        id: "notpoison",
        src: "IMG/fungi.png",
        type: "Matsopp",
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
        mushroomImg.id = mushroom.type;


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
                content: mushroom.innerHTML
            });
            mushroom.style.display = 'none';
            console.log(basketContent);
        });
    });
}
generateMushroomElements();


/* Klikk på soppkurven skal vise: innholdet i kurven og artikkel, feilmeld om kurven er tom, og fjerne spillet (da er spillet over)*/
basket.addEventListener('click', () => {
    if (basketContent.length === 0) {
        alert('Kurven din er tom. Plukk sopp først!');
        return;
    } else {
        intro.style.display = 'none';
        mushroomPath.style.display = 'none';
        basketimg.classList.add('basket-tilt');
        basketfill.innerHTML = ''; // Clear the basket fill content
        basketContent.map(item => {
            const mushroomDiv = document.createElement('div');
            mushroomDiv.className = 'mushroom';
            mushroomDiv.innerHTML = item.content;
            basketfill.appendChild(mushroomDiv);
        });

        mushroomInfo.innerHTML = '<h2>Info om soppen du har plukket:</h2>';

        article.innerHTML = `<h2>Artikkel tittel</h2>
        <h3>undertittel</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam asperiores inventore laudantium molestias
            cupiditate ullam labore accusamus, eum enim assumenda, reiciendis mollitia tempora ratione incidunt
            suscipit ofte distinctio dolorum quia esse facilis? Dolore necessitatibus nobis soluta inventore facere
            consequuntur nam adipisci sunt quisquam iure modi, assumenda earum sit eius minus!</p>`;
        article.classList.add('article');

        displayScore();
        displayMushroomData();
    }
});

/* display score: hvor mange sopp er giftig og ikke-giftig? */
function displayScore() {
    poisonCount = 0;
    notPoisonCount = 0;

    basketContent.map(mushroom => {
        if (mushroom.id === 'poison') {
            poisonCount++;
        } else if (mushroom.id === 'notpoison') {
            notPoisonCount++;
        }
    });
    // if else som bestemmer om basket-text skal vise om du kan spise soppen eller ikke
    if (poisonCount > 0) {
        baskettext.innerHTML = `<p>Å nei, du må kaste alt! <br> Når du har giftig sopp i kurven din, kan du ikke spise noen har de du har plukket..</p>`;
    } else {
        baskettext.innerHTML = `<p>Gratulerer! Du har plukket gift-fri sopp og kan spise den!</p>`;
    }
}

/* funksjon som legger inn soppen du kan plukken og info om den inn i "info om sopp" / read more section
// .map for å løpe gj basketContent, .find finner riktig sopp, if-statement legger til bilde og info il mathcende sopp */

function displayMushroomData() {
    const mushroomDataDiv = document.createElement('div');
    mushroomDataDiv.className = 'mushroom-data';

    basketContent.map(mushroom => {
        const mushroomInfo = mushroomData.find(data => data.type === mushroom.id);
        console.log(mushroom.id, mushroomInfo);
        if (mushroomInfo) {
            const mushroomDiv = document.createElement('div');
            mushroomDiv.innerHTML = `
            <img src="${mushroomInfo.src}" alt="${mushroomInfo.alt}">
            <h3>${mushroomInfo.type}</h3>
            `;
            mushroomDataDiv.appendChild(mushroomDiv);
        }
    });

    mushroomInfo.appendChild(mushroomDataDiv);
}