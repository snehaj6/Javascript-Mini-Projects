let userScore = 0;
let compScore = 0;

const main = document.querySelector(".main");
const container = document.querySelector(".container");

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resultImages = document.querySelector(".resultImages");
const userResult = document.querySelector(".userResult img");
const compResult = document.querySelector(".compResult img");
const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");
const draw = new Audio("sounds/draw.mp3");
const lose = new Audio("sounds/lose.mp3");
const win = new Audio("sounds/win.mp3");
const wait = new Audio("sounds/wait.mp3");

const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  let compImages = [
    "images/Rock1.png",
    "images/Paper1.png",
    "images/Scissors1.png",
  ];
  compResult.src = compImages[randIdx];
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.color = "#081b31";
  wait.pause();
  draw.play();

};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
    msg.style.color = "green";
    wait.pause();
    win.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}.`;
    msg.style.color = "red";
    wait.pause();
    lose.play();
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      //scissors, paper
      userWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      //rock, scissors
      userWin = compChoice === "Scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "Rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice, index) => {
  choice.addEventListener("click", (e) => {
    choice.classList.add("active");

    userResult.src = compResult.src = "images/Rock1.png";
    msg.innerText = "Wait...";
    msg.style.color="#081b31";
    wait.play();

    choices.forEach((choice2, index2) => {
      index !== index2 && choice2.classList.remove("active");
    });

    
    resultImages.classList.add("start");

    let time = setTimeout(() => {
      resultImages.classList.remove("start");

      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    },1900);
  });
});
