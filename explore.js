
/* =====================================
   NOVA — EXPLORE PAGE INTERACTIONS
   ===================================== */

// 1. COSMIC QUOTE GENERATOR

const quotes = [
    "The universe is vast, but the mind can travel further.",
    "Discipline is the quiet architecture of achievement.",
    "Knowledge begins where certainty ends.",
    "A different perspective can reveal an entirely new world.",
    "The stars do not hurry, yet the universe unfolds.",
    "Think deeply. Observe carefully. Act deliberately.",
    "Not every question needs an immediate answer.",
    "The greatest discoveries begin with curiosity.",
    "Silence gives the mind room to think.",
    "Understanding is more powerful than assumption."
];

const quoteElement = document.getElementById("cosmicQuote");
const quoteButton = document.getElementById("newQuoteBtn");

let previousQuoteIndex = -1;

quoteButton.addEventListener("click", function () {
    let randomIndex;

    // Avoid repeating the same quote twice in a row.
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (
        quotes.length > 1 &&
        randomIndex === previousQuoteIndex
    );

    previousQuoteIndex = randomIndex;
    quoteElement.textContent = quotes[randomIndex];

    quoteElement.classList.remove("message-revealed");

    // Restart the subtle fade-in animation.
    void quoteElement.offsetWidth;
    quoteElement.classList.add("message-revealed");
});


// 2. THOUGHT OF THE DAY

const dailyThoughtElement = document.getElementById("dailyThought");
const thoughtDateElement = document.getElementById("thoughtDate");

const dailyThoughts = [
    "Perspective determines what the mind perceives.",
    "Your choices shape the person you become.",
    "Patience is the strength to think before reacting.",
    "Understanding begins when assumptions are questioned.",
    "Growth often begins outside your comfort zone.",
    "A calm mind can see what an angry mind overlooks.",
    "Wisdom is knowing when to speak and when to observe.",
    "Small actions, repeated consistently, shape a life.",
    "The ability to question yourself is a form of strength.",
    "Not knowing is the beginning of learning."
];

// Use the current date so the thought stays the same all day.
function getDateKey(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return year * 10000 + (month + 1) * 100 + day;
}

const today = new Date();
const dateKey = getDateKey(today);

const thoughtIndex = dateKey % dailyThoughts.length;

dailyThoughtElement.textContent = dailyThoughts[thoughtIndex];

thoughtDateElement.textContent = today.toLocaleDateString(
    undefined,
    {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
);


// 3. HIDDEN MESSAGE

const hiddenMessages = [
    "The person you are becoming is shaped by what you repeatedly do.",
    "Look beyond what is visible; question what is assumed.",
    "Your attention is valuable. Choose carefully what receives it.",
    "Even a small step forward changes your position in the universe.",
    "Knowing yourself is a lifelong discovery.",
    "The quietest moments can reveal the loudest truths."
];

const hiddenMessageElement = document.getElementById("hiddenMessage");
const revealButton = document.getElementById("revealBtn");

let messageRevealed = false;

revealButton.addEventListener("click", function () {
    if (!messageRevealed) {
        const randomIndex = Math.floor(
            Math.random() * hiddenMessages.length
        );

        hiddenMessageElement.textContent = hiddenMessages[randomIndex];
        hiddenMessageElement.classList.add("message-revealed");

        revealButton.innerHTML = 'Reveal another <span>↗</span>';
        messageRevealed = true;
    } else {
        const randomIndex = Math.floor(
            Math.random() * hiddenMessages.length
        );

        hiddenMessageElement.classList.remove("message-revealed");

        // Replace the message and replay the animation.
        void hiddenMessageElement.offsetWidth;

        hiddenMessageElement.textContent = hiddenMessages[randomIndex];
        hiddenMessageElement.classList.add("message-revealed");
    }
});
/* ==========================================
   COSMIC EXPLORATION MAP
   ========================================== */

const mapDestinations = {
    memory: {
        title: "Memory",
        description:
            "A place for moments, memories, nostalgia, and the things we choose to carry with us."
    },

    ideas: {
        title: "Ideas",
        description:
            "Where thoughts become possibilities. Explore concepts, inventions, questions, and strange ideas."
    },

    nova: {
        title: "NOVA",
        description:
            "The center of the map. The beginning of the journey, and the point where every path connects."
    },

    philosophy: {
        title: "Philosophy",
        description:
            "Questions without simple answers. Explore existence, choices, perspective, meaning, and life."
    },

    unknown: {
        title: "The Unknown",
        description:
            "Not everything needs an answer. Sometimes the most interesting destination is the one we cannot explain."
    }
};

const mapNodes = document.querySelectorAll(".map-node");

const mapTitle = document.getElementById("mapTitle");
const mapDescription = document.getElementById("mapDescription");

mapNodes.forEach((node) => {
    node.addEventListener("click", () => {

        const destination = node.dataset.destination;
        const data = mapDestinations[destination];

        if (!data) return;

        mapTitle.textContent = data.title;
        mapDescription.textContent = data.description;

        document.getElementById("mapInfo").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("mapInfo").style.opacity = "1";
        }, 100);

    });
});