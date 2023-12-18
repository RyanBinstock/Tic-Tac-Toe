import { getRandomInt } from "./rng.js"

export let compIsPlaying = false;

export function getComputerMove(board) {
  let x;
  let y;
  do {
    x = getRandomInt(board.cols);
    y = getRandomInt(board.rows);
  } while (board.pieces[x][y] !== 0);
  const buttonEl = document.getElementById(x + '' + y);

  return buttonEl;
}

export function toggleComputer() {
  compIsPlaying = compIsPlaying? false: true;
}

export function toggleCompButton() {
  const buttonEl = document.querySelector('.play-comp-button');
  const message = buttonEl.innerText;

  buttonEl.innerText = (message === 'Play Computer') ? 'Stop Computer' : 'Play Computer';
}