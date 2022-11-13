const colorPalette = document.querySelector('#color-palette');
const pixelBoard = document.querySelector('#pixel-board');
const cleanBoardButton = document.querySelector('#clear-board');

const boardSizeInput = document.querySelector('#board-size');
const boardButton = document.querySelector('#generate-board');

const makePixel = () => {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  return pixel;
};

function makeBoardPixel(line, board) {
  for (let i = 1; i <= board; i += 1) {
    const pixel = makePixel();
    line.appendChild(pixel);
  }
}

const boardLine = () => {
  const line = document.createElement('div');
  line.classList.add('line', 'd-flex');

  return line;
};

function makeBoard(board = 5) {
  for (let i = 1; i <= board; i += 1) {
    const line = boardLine();
    pixelBoard.appendChild(line);
    makeBoardPixel(line, board);
  }
}

function cleanBoard() {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((element) => {
    const pixel = element;
    pixel.style.backgroundColor = 'white';
  });
  // for (const pixel of pixels) {
  //   pixel.style.backgroundColor = 'white';
  // }
}

function removeBoard() {
  const lines = document.querySelectorAll('.line');

  lines.forEach((element) => {
    const line = element;
    line.remove();
  });
  // for (const line of lines) {
  //   line.remove();
  // }
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function generateColors() {
  const colors = document.querySelectorAll('.random-col');

  colors.forEach((element) => {
    const color = element;
    color.style.backgroundColor = randomColor();
  });
  // for (const col of colors) {
  //   col.style.backgroundColor = randomColor();
  // }
}

boardButton.addEventListener('click', () => {
  if (!boardSizeInput.value) window.alert('Board inválido!');
  if (boardSizeInput.value >= 5 && boardSizeInput.value <= 50) {
    removeBoard();
    const boardSize = boardSizeInput.value;
    makeBoard(boardSize);
  }
  if (boardSizeInput.value > 50) {
    removeBoard();
    makeBoard(50);
  }
});

cleanBoardButton.addEventListener('click', () => {
  cleanBoard();
});

colorPalette.addEventListener('click', (e) => {
  const el = e.target;
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
  el.classList.add('selected');
});

pixelBoard.addEventListener('click', (e) => {
  const selectedBrush = document.querySelector('.selected');
  const computedStyle = getComputedStyle(selectedBrush);
  const color = computedStyle.getPropertyValue('background-color');
  const el = e.target;

  if (el.classList.contains('pixel')) {
    el.style.backgroundColor = color;
  }
});

window.onload = () => {
  makeBoard();
  generateColors();
};
