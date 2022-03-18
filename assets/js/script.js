// Card Images Array
const deckCards = ["card1.jpg", "card1.jpg", "card2.jpg", "card2.jpg", "card3.jpg", "card3.jpg", "card4.jpg", "card4.jpg", "card5.jpg", "card5.jpg", "card6.jpg", "card6.jpg", "card7.jpg", "card7.jpg", "card8.jpg", "card8.jpg"];
// Global Arrays

const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

// Shuffle function found on http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Start The Game
function startGame() {
    const shuffledDeck = shuffle(deckCards);
    for (let i = 0; i < shuffledDeck.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement("IMG");
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "assets/images/" + shuffledDeck[i] + "?raw=true");
        addImage.setAttribute("alt", "image of vault boy from fallout");
        deck.appendChild(liTag);
    }
}

startGame();

function removeCard() {

    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

// Used to update the timer -  https://www.w3schools.com/js/js_timing.asp

function timer() {
    time = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }

        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs";
    }, 1000);
}
/* Used to stop timer once all 8 pairs are matched - https://www.w3schools.com/js/js_timing.asp */

function stopTime() {
    clearInterval(time);
}

// Reset HTML elements and all global variables
function resetEverything() {
	stopTime();
	timeStart = false;
	seconds = 0;
	minutes = 0;
	timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
	moves = 0;
	movesCount.innerHTML = 0;
	matched = [];
	opened = [];
	removeCard();
	startGame();
}

// Moves counter for each matching pair of cards

function movesCounter() {
	// Update the html for the moves counter
	movesCount.innerHTML ++;
	// Keep track of the number of moves for every pair checked
	moves ++;
}

