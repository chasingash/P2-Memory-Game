// Card Images Array
const deckCards = ["card1.jpg", "card1.jpg", "card2.jpg", "card2.jpg", "card3.jpg", "card3.jpg", "card4.jpg", "card4.jpg", "card5.jpg", "card5.jpg", "card6.jpg", "card6.jpg", "card7.jpg", "card7.jpg", "card8.jpg", "card8.jpg"];

// Variables
const deck = document.querySelector(".deck");
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
const timeCounter = document.querySelector(".timer");
let opened = [];
let matched = [];
let moves = 0;
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

// code used to understand the game and implemented into my own project https://www.youtube.com/watch?v=ZniVgo8U7ek&t=1815s

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
		addImage.setAttribute("alt", "cards");
		deck.appendChild(liTag);
	}
}

startGame();
function removeCard() {
	while (deck.hasChildNodes()) {
		deck.removeChild(deck.firstChild);
	}
}

// Update the timer -  https://www.w3schools.com/js/js_timing.asp

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
// Used to stop timer once all 8 pairs are matched - https://www.w3schools.com/js/js_timing.asp
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
		noMatch();
	}
}

/*
If two cards match, keep the cards open and
apply class of match
*/
function match() {
	setTimeout(function () {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);
		document.body.style.pointerEvents = "auto";
		winGame();
		opened = [];
	}, 600);
	movesCounter();
}

/*
If the two cards do not match, remove the cards
from the opened array and flip the cards back over by
removing the flip class.
*/
function noMatch() {
	setTimeout(function () {
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		document.body.style.pointerEvents = "auto";
		opened = [];
	}, 700);
	movesCounter();
}

// Get stats on the time, how many moves and update the modal with these stats
function AddStats() {
	const stats = document.querySelector(".modal-content");
	for (let i = 1; i <= 3; i++) {
		const statsElement = document.createElement("p");
		statsElement.classList.add("stats");
		stats.appendChild(statsElement);
	}
	let p = stats.querySelectorAll("p.stats");
	p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
	p[1].innerHTML = "Moves Taken: " + moves;
}

/*
Display the modal on winning the game
Help with the modal from:
https://www.w3schools.com/howto/howto_css_modals.asp
*/
function displayModal() {
	const modalClose = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	modalClose.onclick = function () {
		modal.style.display = "none";
	};
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}

/*
Check the length of the matched array and if there
are 8 pairs 16 cards all together then the game is won.
Stop the timer update the modal with stats and show the modal
*/
function winGame() {
	if (matched.length === 16) {
		stopTime();
		AddStats();
		displayModal();
	}
}

// Main Event Listener

/* Event Listener if a card <li> is clicked
call flipCard() */
deck.addEventListener("click", function (evt) {
	if (evt.target.nodeName === "LI") {
		if (timeStart === false) {
			timeStart = true;
			timer();
		}
		flipCard();
	}

	function flipCard() {
		evt.target.classList.add("flip");
		addToOpened();
	}
	function addToOpened() {
		/* If the opened array has zero or one other img push another 
		img into the array so we can compare these two to be matched
		*/
		if (opened.length === 0 || opened.length === 1) {
			opened.push(evt.target.firstElementChild);
		}
		compareTwo();
	}
}); //Event Listener

/*----------------------------------  
Restart Buttons
------------------------------------*/
reset.addEventListener('click', resetEverything);

playAgain.addEventListener('click', function () {
	modal.style.display = "none";
	resetEverything();
});