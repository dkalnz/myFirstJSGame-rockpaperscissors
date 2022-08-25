//PRINT FUNCTIONS

//Print a paragraph element using DOM. This function is called inside further functions
function printP(a) {
	document.querySelector('.gameResults').innerHTML = a;
}
//Print an h4 using DOM
function printh4(a) {
	document.querySelector('.gameAnnounce').innerHTML = a;
}
//Add text when player wins
function pWins(ppick, cpick) {
	printP('Player wins by using ' + ppick + ' against ' + cpick);
}
//Add text when computer wins
function cWins(cpick, ppick) {
	printP('Computer wins wins by using ' + cpick + ' against ' + ppick);
}
//Add text for a tie
function tie(tpick) {
	printP("It's a tie! Both players chose " + tpick + '!');
}

//DEFINING VARIABLES
const player = {
	pick: null,
}; //Player's choice
const comp = {
	pick: null,
};
let winNum = null;

//const altChoices = ["Lapis", "Papyrus", "Scalpellus"];
//const poetChoices = ["Sword", "Pen", "Upgraded Rock"];
const choices = ['Rock', 'Paper', 'Scissors'];

//DEFINING FUNCTIONS
//reRoll will return random number between 0 and 2
function reRoll() {
	let x = Math.floor(Math.random() * choices.length);
	return x;
}
function clearGame() {
	document.querySelector('.gameResults').replaceChildren();
}

//GAME LOGIC
function whoWon(play, comp) {
	//This will return an array with 3 indices, because after all there are only 3 possible real solutions: Player or computer wins, or tie.
	let winner = play - comp + 2; //see line 47 for reason behind +2.
	/*The way its laid out, every choice beats the one before it, this leads to 9 unique outcomes of play. A lot of code reduces this to 6, but this option reduces to 3. As long as you subtract the indices the same way every time (player index choice - computer index choice) you come out with this quasi-array:
-2:Player, -1:Comp, 0:Tie, 1: Player, 2: Computer
We add 2 to every possibility to eliminate negative nums and start at 0 allowing us to use an array
0:P, 1:C, 2:T, 3:P 4:C <---Win table now only 5 elements---- but since outcomes of the new 0 and 1, and 3 and 4 respectively are the same, lets get rid of them below, leaving us with 
0 = player, 1 = computer, 2 = tie
  */
	if (winner > 2) {
		winner -= 3;
	} //This is the final logic piece that drops the final outcome array to just 3, down from the 9 unique possible plays. If win condition is 3 or 4, we can conveniently swap 3 to 0 and 4 to 1, eliminating them.
	return winner;
	//returns the index of our win table (line 49) when function whoWon is called
}

//Call winner from the array via its index and print using the print functions at the very top
function stateWinner() {
	if (winNum == 2) {
		tie(choices[comp.pick]);
	} else if (winNum == 1) {
		cWins(choices[comp.pick], choices[player.pick]);
	} else if (winNum == 0) {
		pWins(choices[player.pick], choices[comp.pick]);
	}
}

//THIS RIGHT HERE - - - - - NEED HELP!
//document.querySelectorAll('.choice').onclick = playerPlays(this.id);
//Uncommenting line 70 should make it so that when any element with class 'choice' is clicked
function playerPlays(clicked) {
	clearGame();
	console.log('played');
	player.pick = clicked; //the player pick is still random and not a choice yet
	comp.pick = reRoll(); //computer pick is random
	printh4(
		'Player pick was ' +
			choices[player.pick] +
			' and Computer pick was ' +
			choices[comp.pick]
	); //display who chose what
	winNum = whoWon(player.pick, comp.pick); //taking the returned winner variable from whoWon function, assign that to the variable winNum
	stateWinner();
}

//This was to run the game randomly 10 times during logic debugging
/*
for (game = 1; game <= 10; game++){
  printh3("Game No. "+game);
  player.pick = reRoll();
  comp.pick = reRoll();
  printP("Player pick was "+choices[player.pick]+" and Computer pick was "+choices[comp.pick]);
  winNum = whoWon(player.pick, comp.pick);
  printP(winNum); //shows winNum index for debugging
  stateWinner();
}
*/
