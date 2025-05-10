let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];
let start = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!start) {
    console.log("Game started");
    start = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = ``;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 100);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 100);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomIdx = Math.floor(Math.random() * 4);
  let randomCol = btns[randomIdx];
  gameSeq.push(randomCol);
  let randomBtn = document.querySelector(`#${randomCol}`);
  btnFlash(randomBtn);
}

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerText = `Oh no, Game Over! Your total score was ${level}.`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userCol = btn.getAttribute("id");
  userSeq.push(userCol);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
