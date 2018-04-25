let card = document.getElementsByClassName("card");
let cards = [...card];
let openedCards = [];
let moves = 0;
let counter = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");

let modal = document.getElementById("popup1");
let starsList = document.querySelectorAll(".stars li");
let closeIcon = document.querySelector(".close");

const deck = document.querySelector(".deck");
const stars = document.querySelectorAll(".fa-star")

//Timer code
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
var interval;

function setTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+" mins " + second + " secs";
		second++;
		if(second == 60){
			minute++;
			second = 0;
		}
		if(minute == 60){
			hour++;
			minute = 0;
		}
	}, 1000);
}


var displayCard = function(){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
}


document.body.onload = startGame();


function startGame(){
	openedCards = [];
	cards = _.shuffle(cards);
	for(let i = 0; i < cards.length; i++){
		deck.innerHTML = "";
		[].forEach.call(cards, function(item){
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}

	moves = 0;
	counter.innerHTML= moves;
	for(let i = 0; i < stars.length; i++){
		stars[i].style.color = "#FFD700";
		stars[i].style.visibility = "visible";
	}
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}

function openCard() {
	openedCards.push(this);
	let len = openedCards.length;
	if(len === 2){
		moveCounter();
		if(openedCards[0].type === openedCards[1].type){
			matched();
		}
		else{
			unmatched();
		}
	}
	console.log(matchedCard.length);
}

function matched(){
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
}

function unmatched(){
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function(){
		openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openedCards = [];
	}, 1100);
}

function disable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
	});
}

function enable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.remove('disabled');
		for(let i = 0; i < matchedCard.length; i++){
			matchedCard[1].classList.add("disabled");
		}
	});
}

function moveCounter(){
	moves++;
	counter.innerHTML = moves;

	if(moves == 1){
		second = 0;
		minute = 0;
		hour = 0;
		setTimer();
	}

	if(moves > 8 && moves < 12){
		for(let i = 0; i < 3; i++){
			if(i > 1){
				stars[i].style.visibility = "collapse";
			}
		}
	}
	else if (moves > 13){
		for(let i = 0; i < 3; i++){
			if(i > 0){
				stars[i].style.visibility = "collapse";
			}
		}
	}
}


//congratulations modal information


function congratulations(){
	if(matchedCard.length == 16){
		console.log("We're done here.");
		clearInterval(interval);
		finalTime = timer.innerHTML;
		modal.classList.add("show");

		let starRating = document.querySelector(".stars").innerHTML;
		document.getElementById("finalMove").innerHTML = moves;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;

		closeModal();
	}
}

function closeModal(){
	closeIcon.addEventListener("click", function(e){
		modal.classList.remove("show");
		startGame();
	})
}

function playAgain(){
	modal.classList.remove("show");
	startGame();
}

for(let i = 0; i < cards.length; i++){
	cards[i].addEventListener("click", displayCard);
	cards[i].addEventListener("click", openCard);
	cards[i].addEventListener("click", congratulations);
}