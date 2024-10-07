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

//<p>.. har du tenkt over at en sopptur ligner ekstremsport?</p><p>Bli med på sopptur!</p><p>Plukk kun spiselig sopp i kurven og prøv å ikke bli forgiftet!</p>