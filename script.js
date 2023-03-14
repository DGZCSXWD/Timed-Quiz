"use strict";

const landingPage = document.getElementById("landing-page");
const scorePage = document.getElementById("high-score");

const container = document.getElementsByClassName("container");

const question1 = document.getElementById("question1");
const q1Options = document.getElementById("q1-options");

const question2 = document.getElementById("question2");
const q2Options = document.getElementById("q2-options");

const question3 = document.getElementById("question3");
const q3Options = document.getElementById("q3-options");

const question4 = document.getElementById("question4");
const q4Options = document.getElementById("q4-options");

const timer = document.getElementById("timer");

// Get the start button
const startBtn = document.getElementById("start-btn");

const scoreBtn = document.getElementById("score-btn");

const inputName = document.getElementById("my-form");

const inputField = document.getElementById("input-field");

const submitNameBtn = document.getElementById("submit");

let score = 0;
let scoreRecord = JSON.parse(localStorage.getItem("scoreRecord")) ?? {};

//set the timer
let timeLeft = 30;

const setTime = function () {
  const timeSet = setInterval(function () {
    timeLeft--;
    timer.innerHTML = `Remaining Time: ${timeLeft} second`;
    if (timeLeft <= 0) {
      clearInterval(timeSet);
      timer.innerHTML = `Remaining Time: 0 second`;
      displayInput();
    }
  }, 1000);
  question4.addEventListener("click", function () {
    clearInterval(timeSet);
  });
};

// Add a click event listener to the start button
startBtn.addEventListener("click", function () {
  // Hide the landing page and show the question
  landingPage.style.display = "none";
  question1.style.display = "block";
  document.getElementById("score-btn").style.display = "none";
  //star time count
  setTime();
});

scoreBtn.addEventListener("click", function () {
  container.style.display = "none";
  if (localStorage.length === 0) {
    scorePage.style.display = "flex";
    document.getElementById("inital-mes").style.display = "block";
    setTimeout(function () {
      scorePage.style.display = "none";
      document.getElementById("inital-mes").style.display = "none";
      container.style.display = "flex";
    }, 1500);
  } else {
    showScore();
  }
});

q1Options.addEventListener("click", function (event) {
  question1.style.display = "none";
  question2.style.display = "block";
  const selectedOptionId = event.target.id;
  if (selectedOptionId === "1-3") {
    displayMessage("Correct!");
    score++;
  } else {
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
});

q2Options.addEventListener("click", function (event) {
  question2.style.display = "none";
  question3.style.display = "block";
  const selectedOptionId = event.target.id;
  if (selectedOptionId === "2-3") {
    displayMessage("Correct!");
    score++;
  } else {
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
});

q3Options.addEventListener("click", function (event) {
  question3.style.display = "none";
  question4.style.display = "block";
  const selectedOptionId = event.target.id;
  if (selectedOptionId === "3-1") {
    displayMessage("Correct!");
    score++;
  } else {
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
});

q4Options.addEventListener("click", function (event) {
  question3.style.display = "none";
  const selectedOptionId = event.target.id;
  if (selectedOptionId === "4-4") {
    displayMessage("Correct!");
    score++;
  } else {
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
  displayInput();
});

const displayMessage = function (mes) {
  const message = document.getElementById("message");
  message.innerHTML = mes;
  setTimeout(function () {
    message.innerHTML = "";
  }, 1500);
};

const displayInput = function () {
  setTimeout(function () {
    container[0].style.display = "none";
    question4.style.display = "none";
    inputName.style.display = "block";
  }, 1500);
};

let playerName;

submitNameBtn.addEventListener("click", function (event) {
  event.preventDefault();
  playerName = inputField.value;
  storeScore();
  inputName.style.display = "none";
  showScore();
});

const storeScore = function () {
  if (scoreRecord.hasOwnProperty(playerName)) {
    if (scoreRecord[playerName] < score) {
      scoreRecord[playerName] = score;
    }
  } else {
    scoreRecord[playerName] = score;
  }

  localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
};

const showScore = function () {
  scorePage.style.display = "flex";

  for (const player in scoreRecord) {
    const scoreEl = document.createElement("h2");
    scoreEl.textContent = `${player}: ${scoreRecord[player]}`;
    scorePage.appendChild(scoreEl);
  }

  const resetButton = document.createElement("button");
  resetButton.textContent = "Close";
  scorePage.appendChild(resetButton);
  resetButton.addEventListener("click", function () {
    while (scorePage.firstChild) {
      scorePage.removeChild(scorePage.firstChild);
    }
    location.reload();
  });
};
