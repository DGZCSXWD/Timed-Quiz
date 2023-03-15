"use strict";

// Get the elements from the HTML document
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

// Get the start and score buttons, and the input field for the player's name
const startBtn = document.getElementById("start-btn");
const scoreBtn = document.getElementById("score-btn");
const inputName = document.getElementById("my-form");
const inputField = document.getElementById("input-field");
const submitNameBtn = document.getElementById("submit");

// Initialize the score and score record variables
let score = 0;
let scoreRecord = JSON.parse(localStorage.getItem("scoreRecord")) ?? {};

// Initialize the timer
let timeLeft = 30;

// Define a function to set the timer
const setTime = function () {
  const timeSet = setInterval(function () {
    // Update the remaining time
    timeLeft--;
    // Update the timer display
    timer.innerHTML = `Remaining Time: ${timeLeft} second`;
    // Check if the time is up
    if (timeLeft <= 0) {
      clearInterval(timeSet);
      timer.innerHTML = `Remaining Time: 0 second`;
      // Display the input form with a message if the time is up
      displayInput("Time is up!");
    }
  }, 1000);
  // Stop the timer when the last question is answered
  question4.addEventListener("click", function () {
    clearInterval(timeSet);
  });
};

// Add a click event listener to the start button
startBtn.addEventListener("click", function () {
  // Hide the landing page and show the first question
  landingPage.style.display = "none";
  question1.style.display = "block";
  // Hide the score button
  document.getElementById("score-btn").style.display = "none";
  // Start the timer
  setTime();
});

// Add a click event listener to the score button
scoreBtn.addEventListener("click", function () {
  // Hide the game container
  container[0].style.display = "none";
  // Check if there are any scores in the local storage
  if (localStorage.length === 0) {
    // Display a message if there are no scores
    scorePage.style.display = "flex";
    document.getElementById("inital-mes").style.display = "block";
    setTimeout(function () {
      scorePage.style.display = "none";
      document.getElementById("inital-mes").style.display = "none";
      container[0].style.display = "flex";
    }, 1500);
  } else {
    // Show the scores if there are any
    showScore();
  }
});

// Add a click event listener to the options of the first question
q1Options.addEventListener("click", function (event) {
  // Hide the current question and show the next question
  question1.style.display = "none";
  question2.style.display = "block";
  // Get the id of the selected option
  const selectedOptionId = event.target.id;
  // Check if the answer is correct
  if (selectedOptionId === "1-4") {
    // Update the score and display a message
    displayMessage("Correct!");
    score++;
  } else {
    // Deduct 5 seconds from the remaining time and display a message
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
});

// Add a click event listener to the options of the second question
q2Options.addEventListener("click", function (event) {
  // Hide the current question and show the next question
  question2.style.display = "none";
  question3.style.display = "block";
  // Get the id of the selected option
  const selectedOptionId = event.target.id;
  // Check if the answer is correct
  if (selectedOptionId === "2-3") {
    // Update the score and display a message
    displayMessage("Correct!");
    score++;
  } else {
    // Deduct 5 seconds from the remaining time and display a message
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
});

// Add a click event listener to the options of the third question
q3Options.addEventListener("click", function (event) {
  // Hide the current question and show the next question
  question3.style.display = "none";
  question4.style.display = "block";
  // Get the id of the selected option
  const selectedOptionId = event.target.id;
  // Check if the answer is correct
  if (selectedOptionId === "3-1") {
    // Update the score and display a message
    displayMessage("Correct!");
    score++;
  } else {
    // Deduct 5 seconds from the remaining time and display a message
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
});

// Add a click event listener to the options of the fourth question
q4Options.addEventListener("click", function (event) {
  // Hide the current question
  question4.style.display = "none";
  // Get the id of the selected option
  const selectedOptionId = event.target.id;
  // Check if the answer is correct
  if (selectedOptionId === "4-3") {
    // Update the score and display a message
    displayMessage("Correct!");
    score++;
  } else {
    // Deduct 5 seconds from the remaining time and display a message
    displayMessage("Incorrect!");
    timeLeft = timeLeft - 5;
  }
  // Display the input form with a message when all questions are answered
  displayInput("Well done, you have finished all questions!");
});

// Define a function to display a message for 1.5 seconds
const displayMessage = function (mes) {
  const message = document.getElementById("message");
  message.innerHTML = mes;
  setTimeout(function () {
    message.innerHTML = "";
  }, 1500);
};

// Define a function to display the input form with a message
const displayInput = function (message) {
  setTimeout(function () {
    // Hide the game container and the last question
    container[0].style.display = "none";
    question4.style.display = "none";
    // Show the input form
    inputName.style.display = "block";
    // Add a message before the input form
    const inputMessage = document.createElement("h3");
    inputMessage.textContent = message;
    inputName.insertBefore(inputMessage, inputName.firstChild);
  }, 1500);
};

let playerName;

// Add a click event listener to the submit button in the input form
submitNameBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // Get the player's name from the input field
  playerName = inputField.value;
  // Store the score in the score record
  storeScore();
  // Hide the input form
  inputName.style.display = "none";
  // Show the score page
  showScore();
});

// Define a function to store the score in the score record
const storeScore = function () {
  // Check if the player's name already exists in the score record
  if (scoreRecord.hasOwnProperty(playerName)) {
    // Update the score if it's higher than the existing score
    if (scoreRecord[playerName] < score) {
      scoreRecord[playerName] = score;
    }
  } else {
    // Add the player's name and score to the score record
    scoreRecord[playerName] = score;
  }
  // Store the score record in the local storage
  localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
};

// Define a function to show the score page
const showScore = function () {
  // Show the score page
  scorePage.style.display = "flex";
  // Show the score sheet
  document.getElementById("scoresheet").style.display = "flex";
  // Display the scores for each player
  for (const player in scoreRecord) {
    const scoreEl = document.createElement("h3");
    scoreEl.textContent = `${player}: ${scoreRecord[player]}`;
    scorePage.appendChild(scoreEl);
  }
  // Add a button to close the score page
  const resetButton = document.createElement("button");
  resetButton.textContent = "Close";
  scorePage.appendChild(resetButton);
  resetButton.addEventListener("click", function () {
    // Remove all the score elements and reload the page
    while (scorePage.firstChild) {
      scorePage.removeChild(scorePage.firstChild);
    }
    location.reload();
  });
};
