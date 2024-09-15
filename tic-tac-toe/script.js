// const prompt = require('prompt-sync')();

let boxes = document.querySelectorAll(".box");
let playAgainBtn = document.querySelector("#play");
let resetBtn = document.querySelector("#reset");
let result = document.querySelector(".result");
let container = document.querySelector(".container");
let turnAudio = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let music=new Audio("music.mp3");
let turnForO= document.querySelector(".O");
let turnForX= document.querySelector(".X");
let msg = document.querySelector("#msg");
let info = document.querySelector(".info");

let turnO = true;
let count = 0;
turnForO.classList.add("o")
turnForX.classList.remove("x")

const winPatterns = [
  [0, 1, 2, 16, 50, 0],
  [3, 4, 5, 16 ,178, 0],
  [6, 7, 8, 16, 306, 0],
  [0, 3, 6, -110 ,178, 90],
  [1, 4, 7, 16 ,178, 90],
  [2, 5, 8, 148 ,178, 90],
  [2, 4, 6, 16 ,178, 135],
  [0, 4, 8, 16 ,178, 45],
];

const resetGame = () => {
  turnO= true;
  count = 0;
  turnForO.classList.add("o")
  turnForX.classList.remove("x")
  for (box of boxes) {
    box.innerText = "";
    box.disabled=false;  }
  };
  const playAgain = () => {
    music.play();
    turnO = true;
    count = 0;
    document.querySelector(".line").style.width= "0%";
    result.classList.add("hide");
    info.classList.remove("hide");
    turnForO.classList.add("o")
    turnForX.classList.remove("x")
    
    for (box of boxes) {
      box.innerText = "";
      box.disabled=false;
    }
  };
  
  music.play();
  
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
        box.classList.add("red");
        box.classList.remove("blue");

      turnForX.classList.add("x")
      turnForO.classList.remove("o")
      turnAudio.play();
    } else {
      box.innerText = "X";
      turnO = true;
      box.classList.add("blue");
      box.classList.remove("red");

      turnAudio.play();
      turnForO.classList.add("o")
      turnForX.classList.remove("x")
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      draw();
    }
  });
});

const draw = (count) => {
  msg.innerText = "It's a draw";
  result.classList.remove("hide");
  info.classList.add("hide");
  turnForO.classList.add("o")
  turnForX.classList.remove("x")
  music.pause(); 
  gameOver.play();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  result.classList.remove("hide");
  info.classList.add("hide");
  music.pause(); 
  gameOver.play();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    let pos4 = pattern[3];
    let pos5 = pattern[4];
    let pos6 = pattern[5];
    console.log(pos4,pos5,pos6);

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        document.querySelector(".line").style.width= "90%";
        document.querySelector(".line").style.transform = `translate(${pos4}px, ${pos5}px) rotate(${pos6}deg)`;
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

playAgainBtn.addEventListener("click", playAgain);
resetBtn.addEventListener("click", resetGame);
