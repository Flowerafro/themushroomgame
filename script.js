const mushroomPath = document.getElementById("mushroom-path");
const home = document.getElementById("home");
const basket = document.getElementById("basket");
const score = document.getElementById("score");

// Velger kun elementer med klassen .mushroom
const mushrooms = Array.from(mushroomPath.querySelectorAll('.mushroom'));
// tom array for soppkurven
const basketContent = [];
// tom arrays for giftig og ikke-giftig sopp
let poisonCount = 0;
let notPoisonCount = 0;

// Array for mushroom data - må fylles på med flere sopp - skal være grunnlaget for å generere html-elementer via js i stedet for å skrive de ut manuelt i html
const mushroomData = [
    {
        id: "poison",
        src: "IMG/fluesopp.png",
        type: "Fluesopp",
        alt: "poison"
    },
    {
        id: "poison",
        src: "IMG/hvitfluesopp.png",
        type: "Hvit fluesopp",
        alt: "poison"
    },
    {
        id: "poison",
        src: "IMG/spissgiftslorsopp.png",
        type: "Spiss Giftslørsopp",
        alt: "poison"
    },
    {
        id: "poison",
        src: "IMG/flatklokkehatt.png",
        type: "Flatklokkehatt",
        alt: "poison"
    },
    {
        id: "notpoison",
        src: "IMG/steinsopp.png",
        type: "Steinsopp",
        alt: "notpoison"
    },

]


// klikk og legg til sopp i kurven
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

// Whats in the booox?
basket.addEventListener('click', () => {
    if (basketContent.length === 0) {
        alert('Kurven din er tom. Plukk sopp først!');
        return;
    } else {
        basket.innerHTML = '<div class="mushroom"></div>';
        basketContent.map(item => {
            const mushroomDiv = document.createElement('div');
            mushroomDiv.className = 'mushroom';
            mushroomDiv.innerHTML = item.content;
            basket.appendChild(mushroomDiv);
        });
        displayScore();
    }

});

// display score: how many poisonous and non-poisonous mushrooms?
function displayScore() {
    poisonCount = 0;
    notPoisonCount = 0;

    basketContent.map(mushroom => {
        if (mushroom.id === 'poison') {
            poisonCount++;

        } else if (mushroom.id === 'notpoison') {
            notPoisonCount++;
        }
        score.innerHTML = `<div class="score-count">Du har plukket ${poisonCount} giftig sopp og ${notPoisonCount} ikke-giftig sopp</div>`;
    });
    const throwOut = document.getElementById("throw-out");
    if (poisonCount > 0) {
        throwOut.innerHTML = `<p>Å nei, du må kaste alt! Når du har giftig sopp i kurven din, kan du ikke spise noen har de du har plukket..</p>`;
    } else {
        throwOut.innerHTML = `<p>Gratulerer! Du har plukket gift-fri sopp og kan spise den!</p>`;
    }
}
