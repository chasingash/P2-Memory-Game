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

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }



