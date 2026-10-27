
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const exploreBtn = document.getElementById("exploreBtn");
const message = document.getElementById("message");

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("en-MY", {
        hour12: false
    });

    date.textContent = now.toLocaleDateString("en-MY", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

const discoveries = [
    "Every great idea begins as a possibility.",
    "Somewhere, someone is creating something extraordinary.",
    "Curiosity opens doors that certainty never will.",
    "You have entered an unexpected corner of the internet.",
    "The next experiment is yours to create.",
    "Reality is only the beginning of imagination.",
    "Not every mystery needs an immediate answer.",
    "There is always another perspective to explore."
];

let previousIndex = -1;

exploreBtn.addEventListener("click", () => {
    let index;

    do {
        index = Math.floor(Math.random() * discoveries.length);
    } while (index === previousIndex);

    previousIndex = index;

    message.textContent = discoveries[index];

    // Restart the message animation.
    message.style.animation = "none";
    void message.offsetWidth;
    message.style.animation = "appear 0.35s ease";
});

updateClock();
setInterval(updateClock, 1000);


const result = document.getElementById("result");
const featureButtons = document.querySelectorAll(".feature-btn");

const facts = [
    "A day on Venus is longer than its year.",
    "Octopuses have three hearts.",
    "Bananas are botanically classified as berries.",
    "The Moon is slowly moving away from Earth.",
    "Sharks existed before trees."
];

const mysteries = [
    "What if your dreams are showing you possibilities?",
    "What is something everyone assumes but nobody questions?",
    "If time stopped for one second, would you notice?",
    "How much of reality depends on your perspective?",
    "What would you do if nobody could judge you?"
];

const decisions = [
    "Try something you've never done before.",
    "Take a break and clear your mind.",
    "Learn one new thing today.",
    "Finish something you've been postponing.",
    "Follow your curiosity."
];

function chooseRandom(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

featureButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const mode = button.dataset.mode;

        if (mode === "fact") {
            result.textContent = chooseRandom(facts);
        } else if (mode === "mystery") {
            result.textContent = chooseRandom(mysteries);
        } else if (mode === "decision") {
            result.textContent = chooseRandom(decisions);
        }
    });
});
