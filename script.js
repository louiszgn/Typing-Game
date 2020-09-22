const words = ["pour", "venir", "aimer", "penser", "nouveau", "sous", "voir", "quatre", "si", "autre", "mourir", "noir", "monde", "coeur", "depuis", "enfin", "appeler", "pendant", "reprendre", "montre"];
let compteur = 3;
let score = 0;
let inputWord = ""; 
let isOver = true; // Check if a game is over
let partyPlayed = false; // Check if at least one party has been played
let leaderboard = [];

const divWord = document.querySelector("#wordbeater #word");
const input = document.querySelector("#wordbeater #input");

function wordSelection(prevIndex = NaN) {
  let wordsSize = words.length;
  let selectedWord = Math.floor(Math.random() * wordsSize);

  if (selectedWord === prevIndex) return wordSelection();

  divWord.innerHTML = words[selectedWord];
}

function checkIsOver() {
  const divGameOver = document.querySelector("#wordbeater .gameover").classList;

  if(compteur === 0) isOver = true;

  if (isOver && partyPlayed) {
    divGameOver.add("show");
    updateLeaderboard(prompt("Please enter your name"), score);
  }
  else divGameOver.remove("show");
}

/***** Score *****/
function updateScore() {
  document.querySelector("#wordbeater .score").innerHTML = score;
}

function resetScore() {
  score = 0;
  updateScore();
}
/***** End Score *****/

/***** Compteur *****/
function updateCompteur() {
  document.querySelector("#wordbeater .timeLeft").innerHTML = compteur;
}

function resetCompteur() {
  compteur = 3;
  updateCompteur();
}
/***** End Compteur *****/

/***** Leaderboard *****/
function updateLeaderboard(name, score) {
  let table = document.querySelector("#popupLeaderboard .content");
  let position = (leaderboard.filter(game => game.score > score).length + 1) || 1;

  leaderboard.splice(position, 0, {"name": name, "score": score});
  
  let newRow = table.insertRow(position);
  newRow.insertCell(0).appendChild(document.createTextNode(name));
  newRow.insertCell(1).appendChild(document.createTextNode(score));
}

document.querySelector("#wordbeater .btnLeaderboard").onclick = () => document.querySelector("#popupLeaderboard").classList.toggle("show");
document.querySelector("#popupLeaderboard .close").onclick = () => document.querySelector("#popupLeaderboard").classList.toggle("show");


/***** End Leaderboard *****/

/***** Onload *****/
document.querySelector("#wordbeater .timeByWord").innerHTML = compteur;
wordSelection();
updateScore();
updateCompteur();
checkIsOver();

setInterval(() => {
  if(isOver) return;

  compteur--;
  updateCompteur();
  checkIsOver();
}, 1000);
/***** End Onload *****/

/***** Input *****/
input.onkeyup = () => {
  let theWord = divWord.innerHTML;
  let inputWord = input.value;

  if (isOver) {
    resetCompteur();
    resetScore();
    isOver = false;
  }

  if (inputWord === theWord) {
    score++;
    updateScore();

    resetCompteur();
    updateCompteur();

    inputWord = "";
    input.value = "";

    partyPlayed = true;

    wordSelection(words.indexOf(theWord));
  }
}
/***** End Input *****/