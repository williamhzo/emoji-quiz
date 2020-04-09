// importing data
import { movies } from './data.js';

// sections
const homeSection = document.getElementById('home');
const gameSection = document.getElementById('in-game');
const aboutSection = document.getElementById('about');

// in-game
const emojiList = document.querySelector('.emoji-list');
const totalScore = document.getElementById('score');
const timer = document.querySelector('.time-counter');
const result = document.querySelector('.result');

// buttons
const btnStart = document.getElementById('btn-start');
const btnHome = document.getElementById('btn-home');
const btnAbout = document.getElementById('btn-about');
const btnSkip = document.getElementById('btn-skip');
const btnValidate = document.querySelector('.validate');

// user input
const input = document.getElementById('user-input');
let currentEmojis, // set of emojis for ongoing question
  currentTitle, // expected answer for ongoing question
  randomIndex, // random number to select question
  currentScore, // user score during game
  currentFailed, // failed and/or skipped questions
  quizLength, // total number of questions
  answer; // boolean from user input: if it's correct or not
let quizArray = []; // questions array
let intervalId = 0; // id to clear the timer countdown
let stopId = 0;

// functions

// initialize the game: initializeScore, setGameSection,
// create quiz array, displayQuiz
const startGame = () => {
  initializeScore();
  setGameSection();
  quizArray = JSON.parse(JSON.stringify(movies));
  displayQuiz();
};

// render new quiz question to the game board:
// initializeQuiz, pickRandomQuiz, display set of emojis,
// remove current question from current quiz array to prevent
// redundant questions, check if remaining questions
const displayQuiz = () => {
  // Takes a random movie from database and displays the emojis it in DOM
  initializeQuiz();
  pickRandQuiz();
  changeColor();
  currentEmojis.forEach(
    (e) => (emojiList.innerHTML += `<li class="emoji">${e}</li>`)
  );
  setTimer();
  // startTimer();
  console.log(currentTitle);
  quizArray.splice(randomIndex, 1);
  // if (!quizArray.length)  make a message 'pop' ==> 'That's all folks!'
};

// clear the game board: user input & emojis
const initializeQuiz = () => {
  input.value = '';
  emojiList.innerHTML = '';
};

// generate random index & select corresponding question from array
const pickRandQuiz = () => {
  randomIndex = Math.floor(Math.random() * quizArray.length);
  currentEmojis = quizArray[randomIndex].emoji;
  currentTitle = quizArray[randomIndex].title;
};

// clear the score board & define number of questions
const initializeScore = () => {
  currentScore = 0;
  currentFailed = 0;
  quizLength = movies.length;
  updateScore();
};

// input new score board into the DOM
const updateScore = () => {
  totalScore.innerHTML = `<li class='success'> Right: ${currentScore}</li>
  <li class='fail'>Wrong: ${currentFailed}</li>
  <li class='total'>Out of: ${quizLength}</li>`;
};

// when user skips: updateScore and displayQuiz
const skipQuiz = () => {
  currentFailed++;
  updateScore();
  displayQuiz();
};

// when user inputs: compare input with the expected answer
// if true: stopTimer, displayQuiz, updateScore
// if false: show the user
const checkInput = () => {
  if (input.value.toUpperCase() === currentTitle.toUpperCase()) {
    stopTimer();
    displayQuiz();
    currentScore++;
    updateScore();
  } else {
    input.style = 'animation: swing 0.8s ease;';
    setTimeout(() => input.style.removeProperty('animation'), 1000);
  }
};

// stop previous timer if ongoing & set new one
// if time is out: stopTimer, displayQuiz, updateScore
const setTimer = () => {
  clearInterval(intervalId);
  const countFrom = 2000;
  let timeCount = countFrom;
  intervalId = setInterval(() => {
    if (timeCount <= 0) {
      stopTimer();
      displayQuiz();
      currentFailed++;
      updateScore();
      return;
    }
    timer.style.width = Math.floor((100 * timeCount--) / countFrom) + '%';
  }, 10);
};

// stop timer
const stopTimer = () => {
  clearInterval(intervalId);
};

// change bg color
const changeColor = () => {
  const colorArray = [
    '#f2eaec',
    '#F9DC5C',
    '#FAF4D0',
    '#7ED3B2',
    '#eaceb4',
    '#B0F4E6',
    '#FFE1C6',
    '#CEE27D',
    '#f7f5e6',
  ];
  let randomColor = Math.floor(Math.random() * colorArray.length);
  document.getElementById('body').style.backgroundColor =
    colorArray[randomColor];
};

// event handlers
const setGameSection = () => {
  gameSection.classList.remove('hide');
  homeSection.classList.add('hide');
  aboutSection.classList.add('hide');
  changeColor();
};

const setHomeSection = () => {
  homeSection.classList.remove('hide');
  gameSection.classList.add('hide');
  aboutSection.classList.add('hide');
  changeColor();
  stopTimer();
};

const setAboutSection = () => {
  aboutSection.classList.remove('hide');
  gameSection.classList.add('hide');
  homeSection.classList.add('hide');
  changeColor();
  stopTimer();
};

const enterInput = (e) => {
  if (e.key === 'Enter') {
    checkInput();
  }
};

// event listeners
window.onload = changeColor;
btnHome.onclick = setHomeSection;
btnAbout.onclick = setAboutSection;
btnStart.onclick = startGame;
btnSkip.onclick = skipQuiz;
btnValidate.onclick = checkInput;
input.addEventListener('keypress', enterInput);
