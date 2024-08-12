let gameActive = true;
let currentPlayer = 'X';
const colors = ['#FFA500', '#87CEEB', '#FF69B4', '#f4f1de', '#20B2AA', '#ADD8E6'];

document.querySelectorAll('.board > span').forEach(tile => {
  tile.addEventListener('click', function() {
    if (gameActive && !this.textContent) {
      this.textContent = currentPlayer;  // Set X or O
      playSound('clickSound');
      checkWin();
      if (gameActive) {
        switchPlayer();
      }
    }
  });
});

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let hasWinner = false;
  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (
      document.getElementById(`col-${a}`).textContent &&
      document.getElementById(`col-${a}`).textContent === document.getElementById(`col-${b}`).textContent &&
      document.getElementById(`col-${a}`).textContent === document.getElementById(`col-${c}`).textContent
    ) {
      document.getElementById(`col-${a}`).classList.add('win');
      document.getElementById(`col-${b}`).classList.add('win');
      document.getElementById(`col-${c}`).classList.add('win');
      hasWinner = true;
    }
  });

  if (hasWinner) {
    gameActive = false;
    document.querySelectorAll('.board > span').forEach(tile => {
      tile.style.cursor = 'not-allowed';
    });
    playSound('winSound');
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) {
    sound.play();
  }
}

document.getElementById('reset').addEventListener('click', function() {
  gameActive = true;
  currentPlayer = 'X';  // Reset to X as the starting player
  document.querySelectorAll('.board > span').forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('win');
    tile.style.cursor = 'pointer';
  });
  document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});
