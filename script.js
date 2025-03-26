const emojis = ["1", "3", "🍒", "🍇", "5", "🍓", "🥝", "🍍"];
const cardsArray = [...emojis, ...emojis]; // Duplicate emojis for pairs
cardsArray.sort(() => Math.random() - 0.5); // Shuffle cards

const gameBoard = document.getElementById("game-board");
let flippedCards = [];
let matchedCards = [];

function createBoard() {
    gameBoard.innerHTML = "";
    cardsArray.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
    }

    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => alert("Congratulations! You won!"), 500);
    }
}

createBoard();
