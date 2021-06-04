'use strict';

const diceBtn = document.getElementById('diceButton');
const holdBtn = document.getElementById('holdButton');
const newBtn = document.getElementById('newGame');
const dice = document.querySelector('.dice');

const playerScoreElement = document.querySelector('.score-a');
const computerScoreElement = document.querySelector('.score-computer');

const playerCurrentElement = document.querySelector('.current-a');
const computerCurrentElement = document.querySelector('.current-computer');

const turnElement = document.querySelector('.turn');

let turnPlayer = false;
let currentScore = 0;

let playerScore = 0;
let computerScore = 0;

let gameCompleted = false;

initialize();

function initialize() {
  dice.classList.add('hidden');
  turnPlayer = false;
  currentScore = 0;
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = 0;
  computerScoreElement.textContent = 0;
  playerCurrentElement.textContent = 0;
  computerCurrentElement.textContent = 0;
  holdBtn.removeAttribute('disabled');
  diceBtn.removeAttribute('disabled');
  changePlayer();
}

newBtn.addEventListener('click', initialize);

holdBtn.addEventListener('click', holdClick);

diceBtn.addEventListener('click', diceClick);

function holdClick() {
  if (!gameCompleted) {
    populateScore();
    if (!checkWin()) {
      changePlayer();
    } else {
      gameCompleted = true;
      holdBtn.setAttribute('disabled', true);
      diceBtn.setAttribute('disabled', true);
    }
  }
}

function diceClick() {
  if (!gameCompleted) {
    dice.classList.remove('hidden');
    const rolledNum = getRandomNumber(1, 6);
    console.log(rolledNum);
    rollDice(rolledNum);
    if (rolledNum === 1) {
      currentScore = 0;
      populateCurrentScore();
      playerScore = 0;
      computerScore = 0;
      populateScore();
      changePlayer();
    } else {
      currentScore = currentScore + rolledNum;
      populateCurrentScore();
    }
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkWin() {
  if (turnPlayer) {
    if (playerScore >= 50) {
      turnElement.textContent = 'You Won.';
      return true;
    }
    return false;
  } else {
    if (computerScore >= 50) {
      turnElement.textContent = 'You lose.';
      return true;
    }
    return false;
  }
}

function populateScore() {
  if (turnPlayer) {
    playerScore = currentScore + playerScore;
    playerScoreElement.textContent = playerScore;
  } else {
    computerScore = currentScore + computerScore;
    computerScoreElement.textContent = computerScore;
  }
}

function changePlayer() {
  currentScore = 0;
  populateCurrentScore();
  turnPlayer = !turnPlayer;
  if (turnPlayer) {
    document.querySelector('.computer').classList.remove('player-active');
    document.querySelector('.player-a').classList.add('player-active');
    turnElement.textContent = 'Player Turn';
  } else {
    document.querySelector('.player-a').classList.remove('player-active');
    document.querySelector('.computer').classList.add('player-active');
    turnElement.textContent = 'Computer Is Playing';
    setTimeout(() => {
      playComputer();
    }, 1000);
  }
}

function playComputer() {
  const times = getRandomNumber(1, 4);
  for (let index = 0; index < times; index++) {
    if (!turnPlayer) {
      diceClick();
      sleep(1000);
    }
  }
  holdClick();
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function populateCurrentScore() {
  if (turnPlayer) {
    playerCurrentElement.textContent = currentScore;
  } else {
    computerCurrentElement.textContent = currentScore;
  }
}

function rollDice(num) {
  while (dice.firstChild) {
    dice.firstChild.remove();
  }
  for (let i = 0; i < num; i++) {
    const dotDiv = document.createElement('div');
    dotDiv.className = 'dots';
    dice.appendChild(dotDiv);
  }
}
