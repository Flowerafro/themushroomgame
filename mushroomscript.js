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
    basket.innerHTML = '<div class="mushroom"></div>';
    basketContent.map(item => {
        const mushroomDiv = document.createElement('div');
        mushroomDiv.className = 'mushroom';
        mushroomDiv.innerHTML = item.content;
        basket.appendChild(mushroomDiv);

    });
    displayScore();
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
    });

    score.innerHTML = `
        <div class="score-count">Du har plukket ${poisonCount} giftig sopp og ${notPoisonCount} ikke-giftig sopp</div>
    `;
}