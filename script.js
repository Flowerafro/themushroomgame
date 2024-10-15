const intro = document.getElementById("wrap-intro");
const counter = document.querySelectorAll(".counter");
const mushroomPath = document.getElementById("mushroom-path");

const basket = document.getElementById("basket");
const basketimg = document.getElementById("basket-img");
const basketfill = document.getElementById("basket-fill");
const baskettext = document.getElementById("basket-text");

const basketButton = document.getElementById("les-mer");

const infoSection = document.getElementById("info-section");
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
        type: "Giftig",
        src: "IMG/rodfluesopp.png",
        name: "Rød fluesopp",
        info: "Amanita muscaria, er en stilksporesopp av slekten Amanita. Navnet kommer fra dens bruk som insektmiddel. Rød fluesopp er giftig og gir sterke magesmerter og brekninger, og kan dessuten gi hallusinasjoner. Den inneholder ibotensyre, muskimol og muskazon, som aktive prinsipp. ",
        alt: "fluesopp"
    },
    {
        id: 2,
        type: "Giftig",
        src: "IMG/hvitfluesopp.png",
        name: "Hvit fluesopp",
        info: "Amanita virosa, er en av de farligste av våre giftige sopper. Hvit fluesopp inneholder gift som angriper lever og nyrer. Hvit fluesopp kan forveksles med hvite sjampinjonger; men sjampinjonger har mørke sporer som gjør at skivene blir grårosa til svartbrune. ",
        alt: "hvitfluesopp"
    },
    {
        id: 3,
        type: "Giftig",
        src: "IMG/spissgiftslorsopp.png",
        name: "Spiss Giftslørsopp",
        info: "Cortinarius rubellus,er en sopp som hører til slekten slørsopper. Den er dødelig giftig og angriper nyrene. Forgiftningssymptomene kommer ofte etter 2–3 dager eller mer. ",
        alt: "spissgiftslorsopp"
    },
    {
        id: 4,
        type: "Giftig",
        src: "IMG/flatklokkehatt.png",
        name: "Flatklokkehatt",
        info: "Galerina marginata, er en brun giftsopp som er vanlig i hele landet. Den gir hovedsakelig leverskade og kan være dødelig. ",
        alt: "flatklokkehatt"
    },
    {
        id: 5,
        type: "Ikke-giftig",
        src: "IMG/steinsopp.png",
        name: "Steinsopp",
        info: "Boletus edulis, tilhører rørsoppfamilien og regnes som som en av de beste matsoppene. Steinsopp vokser i løv- og barskog, og har sesong i Norge fra juni til september.  ",
        alt: "steinsopp"
    },
    {
        id: 6,
        type: "Ikke-giftig",
        src: "IMG/kantarell.png",
        name: "Kantarell",
        info: "Cantharellus cibarius, er en av Norges beste og mest gjenkjennelige matsopper. Den vokser i hele landet og har lang sesong.",
        alt: "kantarell"
    },
    {
        id: 7,
        type: "Ikke-giftig",
        src: "IMG/ametystsopp.png",
        name: "Ametystsopp",
        info: "Lakssopp eller Laccaria amethystina, Lakssopp er oftest lakserøde til rødfiolette små sopper med tynn stilk og tykke, voksaktige skiver. ",
        alt: "ametystsopp"
    },
    {
        id: 8,
        type: "Ikke-giftig",
        src: "IMG/matpiggsopp.png",
        name: "Matpiggsopp",
        info: "Hydnum repandum, er hattsopper som danner sporer på et piggete hymenofor. Matpiggsoppene er, som navnet forteller, gode matsopper. ",
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
            counter.forEach(count => count.innerHTML = basketContent.length); /* teller antall sopp du har plukket */
            mushroom.style.display = 'none';
            console.log(basketContent);

            // Check if all mushrooms are picked
            if (basketContent.length === mushroomData.length) {
                alert('Alle soppen er plukket, gå videre til kurven');
                window.location.href = "#basket-section";
            }
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
        /* intro.style.display = 'none';
        mushroomPath.style.display = 'none'; */
        /* 
                basketimg.classList.add('basket-tilt');
                basketfill.innerHTML = '';
        
                basketContent.map(item => {
                    const mushroomDiv = document.createElement('div');
                    mushroomDiv.className = 'mushroom';
                    mushroomDiv.innerHTML = item.content;
                    basketfill.appendChild(mushroomDiv);
                }); */

        infoSection.classList.add('info-section');
        mushroomInfo.innerHTML = getMushroomData(basketContent).map(mushroom => {
            return `
            <div class="mushroom">
                <img src="${mushroom.src}" alt="${mushroom.alt}">
                <h3>${mushroom.name}</h3>
                <h4>${mushroom.type}</h4>
                <p>${mushroom.info}</p>
            </div>`;
        }).join('');

        baskettext.classList.remove('flex-row-center-center')
        baskettext.classList.add('flex-col-center-center');

        /* Fjerner gammel klasse og legger til ny */
        const mushroomElements = mushroomInfo.querySelectorAll('.mushroom');
        mushroomElements.forEach(mushroom => {
            mushroom.classList.remove('mushroom');
            mushroom.classList.add('mushroom-card');
        });

        displayScore();

    }
});

/* display score: hvor mange sopp er giftig og ikke-giftig? */
function displayScore() {
    poisonCount = 0;
    notPoisonCount = 0;

    basketContent.map(mushroom => {
        if (mushroom.type === 'Giftig') {
            poisonCount++;
        } else if (mushroom.type === 'Ikke-giftig') {
            notPoisonCount++;
        }
    });
    // if else som bestemmer om basket-text skal vise om du kan spise soppen eller ikke
    if (poisonCount > 0) {
        baskettext.innerHTML = `<p>Du har plukket ${poisonCount} giftige sopp og selv om du plukket ${notPoisonCount} gift-fri sopp, må alt kastet fordi de har vært i samme kurv :(</p>
        <button><a href="#info-section">Les mer om soppen du plukket her</a></button>`;
    } else {
        baskettext.innerHTML = `<p>Gratulerer! Du har plukket ${notPoisonCount} gift-fri sopp og kan spise med god samvittighet! Les mer om soppen du har plukket under under</p> 
        <button><a href="#info-section">Les mer om soppen du plukket her</a></button>`;
    }
}

/* KILDER til SOPP-array: 

https://soppognyttevekster.no/sopp/normlisten/ 
https://no.wikipedia.org/wiki/R%C3%B8d_fluesopp
https://snl.no/hvit_fluesopp
https://snl.no/flatklokkehatt
https://no.wikipedia.org/wiki/Steinsopp
https://snl.no/steinsopp
https://soppognyttevekster.no/normlisten/kantarell/
https://snl.no/kantarell
https://snl.no/matpiggsopper

 */