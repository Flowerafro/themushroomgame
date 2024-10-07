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

// Intro sopp viser tekst
document.addEventListener('DOMContentLoaded', () => {
    const fluesopp = document.getElementById("fluesopp");
    const intro = document.getElementById("intro-container");

    fluesopp.addEventListener('click', () => {
        setTimeout(() => {
            intro.innerHTML = `<h1 class="text-intro">Du kjenner nok denne soppen..?</h1>
            <button id="intro-btn"><a href="#intro-text">V</a></button>`;
            intro.classList.add('fade-in');

            // Add event listener for the dynamically created button
            const introbtn = document.getElementById("intro-btn");
            introbtn.addEventListener('click', () => {
                const introtext = document.getElementById("intro-text");
                introtext.innerHTML = `

                <div class="intro-text-div">
                    <p id="intro-text-1" class="intro-text">.. har du tenkt over at en sopptur ligner ekstremsport?</p>
                    <button id="intro-btn-1" class="intro-btn"><a href="#intro-btn-2">V</a></button>
                </div>

                <div class="intro-text-div">
                    <p id="intro-btn-2" class="intro-text">Bli med på sopptur!</p>
                    <button class="intro-btn"><a href="#intro-btn-3" class="intro-btn">V</a></button>
                </div>

                
                <div class="intro-text-div">
                <p id="intro-btn-3" class="intro-text">Plukk kun spiselig sopp i kurven og prøv å ikke bli forgiftet!</p>
                <button class="intro-btn"><a href="/mushroompath.html" class="intro-btn">GO!</a></button>
                </div>
                `;
            });
        }, 300);
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
