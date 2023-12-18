import { getComputerMove, compIsPlaying, toggleCompButton, toggleComputer } from './computer.js';

let player = '1';
let turns = 0;
let gameIsOver = false;



const board = {
  rows: 3,
  cols: 3,
  pieces: [], 
  display() {
    let boardHTML = '';
    let letter;
    let butClass = "";

    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        if (i == 0) {
          butClass = "button-top ";
        } else if (i == this.rows - 1) {
          butClass = "button-bottom "
        }

        if (j == 0) {
          if (butClass !== "") {
            butClass += " ";
          }
          butClass +="button-left";
        } else if (j == this.cols - 1) {
          if (butClass !== "") {
            butClass += " ";
          }
          butClass +="button-right";
        }
        
        
        if (piece !== 0) {
          letter = piece === 1 ? 'X' : 'O';
          boardHTML += `<button id="${i}${j}" class="${butClass} piece-button piece-button-active js-piece-button" ><img class="piece-icon" src="images/${letter}.png"></button>`;
        } else {
          boardHTML += `<button id="${i}${j}" class="${butClass} piece-button piece-button-empty js-piece-button" ><img class="piece-icon" src="images/empty.png"></button>`;
        }

        butClass = "";
      })
    })
    document.querySelector('.js-board').innerHTML = boardHTML;

    addPieceListeners();
  },
  initialize() {
    this.pieces = [];
    for (let i = 0; i < this.rows; i++) {
      const newRow = [];
      for (let j = 0; j < this.cols; j++) {
        newRow.push(0);
      }

      this.pieces.push(newRow);
    }
  }
};
board.initialize();
board.display();

document.querySelector('.reset-board-button').addEventListener('click', () => {
  resetGame();
})

document.querySelector('.play-comp-button').addEventListener('click', () => {
  toggleComputer();
  toggleCompButton();
})

function addPieceListeners() {
  document.querySelectorAll('.piece-button')
    .forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => {
        turnPlayed(buttonElement);
      })
  })


}

function turnPlayed(buttonElement) {
  if (buttonElement.innerHTML === '<img class="piece-icon" src="images/empty.png">' && !gameIsOver) {  //FIX!!!!
    const x = buttonElement.id[0];
    const y = buttonElement.id[1];
    if (player === "1") {
        board.pieces[x][y] = 1;
      } else {
        board.pieces[x][y] = 2;
      }

    board.display();
    buttonElement.classList.remove('piece-button-empty');
    
    if (checkWin()) {
      gameOver(`Player ${player} Wins!`);
    } else {
      swapTurn();

      if (turns === board.rows * board.cols) {
        gameOver('Cat\'s game!');
      } else {
        if (compIsPlaying && player === '2') {
          setTimeout(turnPlayed, 1000, getComputerMove(board));
        }
      }
    }
  }
}

function swapTurn() {
  if (player === '1') {
    player = '2';
  } else {
    player = '1';
  }

  document.querySelector('.js-player-turn-text')
    .innerText = `Player ${player}`;

  turns++;
}

function checkWin() {
  let hasWon = false;

  
  for (let i = 0; i < board.rows; i++) {
    //Check hoizontally
    if (board.pieces[i][0] == player && board.pieces[i][1] == player && board.pieces[i][2] == player) {
        document.querySelectorAll('.piece-button-active').forEach(button => {
          if (button.id === `${i}0` || button.id === `${i}1` || button.id === `${i}2`) {
            
            button.classList.add('winning-piece');
          }
        })
        
        hasWon = true;
    }

    //Check vertically
    if (board.pieces[0][i] == player && board.pieces[1][i] == player && board.pieces[2][i] == player) {
      document.querySelectorAll('.piece-button-active').forEach(button => {
        if (button.id === `0${i}` || button.id === `1${i}` || button.id === `2${i}`) {
          
          button.classList.add('winning-piece');
        }
      })
      hasWon = true;
    }


  }

  if (board.pieces[0][0] == player && board.pieces[1][1] == player && board.pieces[2][2] == player) {
    document.getElementById('00').classList.add('winning-piece');
    document.getElementById('11').classList.add('winning-piece');
    document.getElementById('22').classList.add('winning-piece');
    hasWon = true;  
  }  
  
  if (board.pieces[0][2] == player && board.pieces[1][1] == player && board.pieces[2][0] == player) {
    document.getElementById('02').classList.add('winning-piece');
    document.getElementById('11').classList.add('winning-piece');
    document.getElementById('20').classList.add('winning-piece');
    hasWon = true;
  }

  return hasWon;
}

function gameOver(message) {
  gameIsOver = true;

  document.querySelectorAll('.piece-button-empty').forEach(buttonElement => buttonElement.classList.remove('piece-button-empty'));

  //document.querySelector('.js-result-output').innerHTML = 
  document.querySelector('.js-player-turn-text').innerHTML = `${message}`;
}

function resetGame() {
  board.initialize();
  board.display();


  document.querySelector('.js-result-output').innerText = ``;
  document.querySelector('.js-player-turn-text').innerText = 'Player 1';
  player = '1';
  turns = 0;
  gameIsOver = false;
}