'use strict';

const diceBtn = document.getElementById('diceButton');
const holdBtn = document.getElementById('holdButton');
const dice = document.querySelector('.dice');

let turnPlayerA = false;
let currentScore = 0;



initialize();

function initialize() {
  turnPlayerA = true;
  setCurrentPlayer();
}

function setCurrentPlayer() {
  if (turnPlayerA) {
    document.querySelector('.player-a').classList.add('player-active');
  }
}

diceBtn.addEventListener('click', function() {
  const rolledNum = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  rollDice(rolledNum);
  if (rolledNum === 1) {
    
  }
});

function rollDice(num) {
  while (dice.firstChild) {
    dice.firstChild.remove()
  }
  for(let i = 0; i < num; i++) {
    const dotDiv = document.createElement('div');
    dotDiv.className = 'dots';
    dice.appendChild(dotDiv);
  }
}