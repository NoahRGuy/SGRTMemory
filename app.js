

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
let second = 0;
let timer = document.querySelector(".timer");
let scoreboard = document.querySelector("#leader-table");
var interval;


class Score{
	constructor(name, time){
		this.name = name;
		this.time = time;
	}
}

let s1 = new Score('John Doe', 40);
let s2 = new Score('John Doe', 45);
let s3 = new Score('John Doe', 50);
let s4 = new Score('John Doe', 55);
let s5 = new Score('John Doe', 60);
let s6 = new Score('John Doe', 65);
let s7 = new Score('John Doe', 70);
let s8 = new Score('John Doe', 75);
let s9 = new Score('John Doe', 80);
let s0 = new Score('John Doe', 85);

let scoresArray = [];
scoresArray.push(s1, s2, s3, s4, s5, s6, s7, s8, s9, s0);
console.log(scoresArray[0].time);

function sortScores(){
	for(let i = 0; i < scoresArray.length; i++){
		for(let j = 0; j < scoresArray.length - i - 1; j++){
			if(scoresArray[j].time > scoresArray[j + 1].time){
				const lesser = scoresArray[j + 1];
				scoresArray[j + 1] = scoresArray[j];
				scoresArray[j] = lesser;
			}
		}
	}
}

function setTimer(){
	interval = setInterval(function(){
		timer.innerHTML = second + " secs";
		second++;
	}, 1000);
}

function setLeaderboard(){
	scoreboardHTML = "";
	for(let i = 0; i < 8; i++){
		scoreboardHTML += "<tr><td>" + scoresArray[i].name + "</td><td>" + scoresArray[i].time + "</td></tr>";
	}
	scoreboard.innerHTML += scoreboardHTML
}

function updateLeaderboard(){
	let name = document.getElementById("scorename").value;
	let newScore = new Score(name, second);
	scoresArray.push(newScore);
	sortScores();

	let resetInner = "<tr><th>Name</th><th>Time (Seconds)</th>";
	var scoreboardHTML = "";
	for(let i = 0; i <8; i++){
		scoreboardHTML += "<tr><td>" + scoresArray[i].name + "</td><td>" + scoresArray[i].time + "</td></tr>";
	}
	scoreboard.innerHTML = resetInner + scoreboardHTML;
}


var displayCard = function(){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
}


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
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 secs";
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
	if(matchedCard.length == 18){
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

function run(){
	setLeaderboard();
	startGame();
}

document.body.onload = run();