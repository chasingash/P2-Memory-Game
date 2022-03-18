// Card Images Array
const deckCards = ["card1.jpg", "card1.jpg", "card2.jpg", "card2.jpg", "card3.jpg", "card3.jpg", "card4.jpg", "card4.jpg", "card5.jpg", "card5.jpg", "card6.jpg", "card6.jpg", "card7.jpg", "card7.jpg", "card8.jpg", "card8.jpg"];

// Variables
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

// Function to start the game
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
    movesCount.innerHTML++;
    moves++;
}


// Compare two cards to see if they match
function compareTwo() {
    if (opened.length === 2) {
        document.body.style.pointerEvents = "none";
    }
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        match();
    } else if (opened.length === 2 && opened[0].src != opened[1].src) {
        // If No match call noMatch()
        noMatch();
        // console.log("NO Match!");
    }
}

/*
If the two cards match, keep the cards open and
apply class of match
*/ 
function match() {
	/* Access the two cards in opened array and add
	the class of match to the imgages parent: the <li> tag
	*/
	setTimeout(function() {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		// Push the matched cards to the matched array
		matched.push(...opened);
		// Allow for further mouse clicks on cards
		document.body.style.pointerEvents = "auto";
		// Check to see if the game has been won with all 8 pairs
		winGame();
		// Clear the opened array
		opened = [];
	}, 600);
	// Call movesCounter to increment by one
	movesCounter();
	starRating();
}

/*
If the two cards do not match, remove the cards
from the opened array and flip the cards back over by
removing the flip class.
*/
function noMatch() {
	/* After 700 miliseconds the two cards open will have
	the class of flip removed from the images parent element <li>*/
	setTimeout(function() {
		// Remove class flip on images parent element
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		// Allow further mouse clicks on cards
		document.body.style.pointerEvents = "auto";
		// Remove the cards from opened array
		opened = [];
	}, 700);
	// Call movesCounter to increment by one
	movesCounter();
	starRating();
}

// Get stats on the time, how many moves and update the modal with these stats
function AddStats() {
	// Access the modal content div
	const stats = document.querySelector(".modal-content");
	// Create three different paragraphs
	for (let i = 1; i <= 3; i++) {
		// Create a new Paragraph
		const statsElement = document.createElement("p");
		// Add a class to the new Paragraph
		statsElement.classList.add("stats");
		// Add the new created <p> tag to the modal content
		stats.appendChild(statsElement);
	}
	// Select all p tags with the class of stats and update the content
	let p = stats.querySelectorAll("p.stats");
			// Set the new <p> to have the content of stats (time, moves and star rating)
		p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
		p[1].innerHTML = "Moves Taken: " + moves;
		p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 3";
}

