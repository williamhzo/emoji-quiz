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
const inputLabel = document.querySelector('.content-answer');

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
  quizLength; // total number of questions
let quizArray = []; // questions array
let intervalId = 0; // id to clear the timer countdown

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
// redundant questions
const displayQuiz = () => {
  // Takes a random movie from database and displays the emojis it in DOM
  initializeQuiz();
  pickRandQuiz();
  changeColor();
  currentEmojis.forEach(
    (e) => (emojiList.innerHTML += `<li class="emoji">${e}</li>`)
  );
  setTimer();
  quizArray.splice(randomIndex, 1);
};

// clear the game board: user input & emojis,
// check if remaining questions
const initializeQuiz = () => {
  input.value = '';
  emojiList.innerHTML = '';
  if (quizArray.length === 0) {
    emojiList.innerHTML = `<li class="emoji">🙏</li>
    <li class="emoji">🤓</li>
    <li class="emoji">🤙</li>`;
    inputLabel.innerHTML = "That's all Folks! Thanks for playing";
    btnSkip.remove();
    stopTimer();
  }
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
  totalScore.innerHTML = `<li class='success'> Correct: <span>${currentScore}</span></li>
  <li class='fail'>Failed: <span>${currentFailed}</span></li>
  <li class='total'>Remaining: <span>${
    quizLength - currentScore - currentFailed
  }</span></li>`;
};

// when user skips: updateScore and displayQuiz
const skipQuiz = () => {
  currentFailed++;
  updateScore();
  displayQuiz();
};

// when user inputs: compare input with the expected answer
// remove 'the' and 'a' pronouns to avoid mistakes on input
// if true: stopTimer, displayQuiz, updateScore
// if false: show the user
const checkInput = () => {
  let trimmedInput = input.value.toUpperCase();
  let str;
  switch (trimmedInput.includes(str)) {
    case str == 'THE ':
      trimmedInput = trimmedInput.replace('THE ', '');
    case str == 'THE ':
      trimmedInput = trimmedInput.replace('THE ', '');
    case str == '.':
      trimmedInput = trimmedInput.replace('.', '');
    case str == '.':
      trimmedInput = trimmedInput.replace('.', '');
    case str == 'A ':
      trimmedInput = trimmedInput.replace('A ', '');
  }
  if (trimmedInput === currentTitle.toUpperCase()) {
    stopTimer();
    displayQuiz();
    currentScore++;
    updateScore();
    setResult(true);
  } else {
    setResult(false);
  }
};

// feedback on player's input: right or wrong
const setResult = (answer) => {
  if (answer) {
    inputLabel.innerHTML += '<span class="ok">💯</span>';
    setTimeout(() => document.querySelector('.ok').remove(), 1500);
  } else {
    input.style = 'animation: swing 0.8s ease;';
    setTimeout(() => input.style.removeProperty('animation'), 1000);
  }
};

// stop previous timer if ongoing & set new one
// if time is out: stopTimer, displayQuiz, updateScore
const setTimer = () => {
  clearInterval(intervalId);
  const countFrom = 4000;
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
  const colorArray = ['#f2eaec', '#FAF4D0', '#eaceb4', '#FFE1C6', '#f7f5e6'];
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
