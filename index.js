
let boxes = document.querySelectorAll(".tile");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".announcer");
let msg = document.querySelector(".announcer #msg");
let displayPlayer = document.querySelector(".display-player");

let turnO = true; // playerX, playerO
let count = 0; // To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = "";
      displayPlayer.innerText = "X";
      displayPlayer.classList.remove("playerO");
      displayPlayer.classList.add("playerX");
};

const handleClick = (event) => {
  let box = event.target;
  if (box.innerText === "") {
    if (turnO) {
     // If it's player O's turn, place "O" in the box and update display for next turn
      box.innerText = "O";
      box.classList.add("playerO");
      displayPlayer.innerText = "X";
      displayPlayer.classList.remove("playerO");
      displayPlayer.classList.add("playerX");
      turnO = false;
    } else {
           // If it's player X's turn, place "X" in the box and update display for next turn
      box.innerText = "X";
      box.classList.add("playerX");
      displayPlayer.innerText = "O";
      displayPlayer.classList.remove("playerO");
      displayPlayer.classList.add("playerX");
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Attach click event listener to Reset button
resetBtn.addEventListener("click", resetGame);

// Attach click event listener to New Game button
newGameBtn.addEventListener("click", resetGame);

// Attach click event listener to each box
boxes.forEach((box) => {
  box.addEventListener("click", handleClick);
});
