'use strict';

// state
let activePlayer = 1;
let currentScore = 0;
let totalScore1 = 0;
let totalScore2 = 0;

// elements
const rollDiceBtn = document.querySelector('.board__btn--roll');
const holdBtn = document.querySelector('.board__btn--hold');
const newGameBtn = document.querySelector('.board__btn--new');
const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');
let currentScoreEl = getScoreEl('current');
let totalScoreEl = getScoreEl('total');

function rollDice() {
  const number = generateNumber();

  // show or update the dice image
  hideDiceEl();
  document.getElementById(`dice-${number}`).classList.remove('hidden');

  // calculate and show the current score
  if (number !== 1) {
    currentScore += number;
    currentScoreEl.textContent = currentScore;
  } else {
    // reset the current score and switch a player
    switchPlayer();
  }
}

function hold() {
  // define the active player element
  const isActivePlayerFirst = activePlayer === 1;
  const activePlayerEl = isActivePlayerFirst ? player1 : player2;

  // increase and show the total score
  if (isActivePlayerFirst) {
    totalScore1 += currentScore;
  } else {
    totalScore2 += currentScore;
  }

  // define the active player total score
  const totalScore = isActivePlayerFirst ? totalScore1 : totalScore2;

  totalScoreEl.textContent = totalScore;

  // check if the total score is less than 100
  if (totalScore < 100) {
    // reset the current score and switch a player
    switchPlayer();
  } else {
    // make the active player to be the winner
    activePlayerEl.classList.remove('player--active');
    activePlayerEl.classList.add('player--winner');
    document.getElementById(`player-title-${activePlayer}`).classList.add('player__title--winner');
    rollDiceBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
  }
}

function startNewGame() {
  currentScoreEl.textContent = '0';
  document.getElementById(`player-total-1`).textContent = '0';
  document.getElementById(`player-total-2`).textContent = '0';
  activePlayer = 1;
  currentScore = 0;
  totalScore1 = 0;
  totalScore2 = 0;
  currentScoreEl = getScoreEl('current');
  totalScoreEl = getScoreEl('total');
  resetWinnerStyles();
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
  hideDiceEl();
  rollDiceBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
}

// helpers
function generateNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function getScoreEl(type) {
  if (type === 'current') {
    return document.getElementById(`current-${activePlayer}`);
  } else {
    return document.getElementById(`player-total-${activePlayer}`);
  }
}

function hideDiceEl() {
  document.querySelector('.board__dice:not(.hidden)')?.classList.add('hidden');
}

function switchPlayer() {
  currentScore = 0;
  currentScoreEl.textContent = currentScore;

  // switch the active player
  activePlayer = activePlayer === 1 ? 2 : 1;
  currentScoreEl = getScoreEl('current');
  totalScoreEl = getScoreEl('total');
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

function resetWinnerStyles() {
  const winner = document.querySelector('.player--winner');

  if (winner) {
    winner.classList.remove('player--winner');
    document.querySelector('.player__title--winner').classList.remove('player__title--winner');
  }
}

// listeners
newGameBtn.addEventListener('click', startNewGame);
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
