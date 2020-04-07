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

// buttons
const btnStart = document.getElementById('btn-start');
const btnHome = document.getElementById('btn-home');
const btnAbout = document.getElementById('btn-about');
const btnSkip = document.getElementById('btn-skip');
const btnKeyboard = document.querySelector('.fa-keyboard');

// user input
const input = document.getElementById('user-input');
let currentEmojis,
  currentTitle,
  randomIndex,
  currentScore,
  currentFailed,
  quizLength;
let quizArray = [];
let intervalId = 0;

// functions

const startGame = () => {
  // initializes the game
  initializeScore();
  setGameSection();
  quizArray = JSON.parse(JSON.stringify(movies));
  displayQuiz();
};

const displayQuiz = () => {
  // Takes a random movie from database and displays the emojis it in DOM
  initializeQuiz();
  pickRandQuiz();
  currentEmojis.forEach(
    (e) => (emojiList.innerHTML += `<li class="emoji">${e}</li>`)
  );
  setTimer();
  quizArray.splice(randomIndex, 1);
  if (!quizArray.length) {
    // make a message 'pop' ==> 'That's all folks!'
  }
};

const initializeQuiz = () => {
  input.value = '';
  emojiList.innerHTML = '';
};

const pickRandQuiz = () => {
  randomIndex = Math.floor(Math.random() * quizArray.length);
  currentEmojis = quizArray[randomIndex].emoji;
  currentTitle = quizArray[randomIndex].title;
};

const initializeScore = () => {
  currentScore = 0;
  currentFailed = 0;
  quizLength = movies.length;
  updateScore();
};

const updateScore = () => {
  totalScore.innerHTML = `<li class='success'> Right: ${currentScore}</li>
  <li class='fail'>Wrong: ${currentFailed}</li>
  <li class='total'>Out of: ${quizLength}</li>`;
};

const skipQuiz = () => {
  currentFailed++;
  updateScore();
  displayQuiz();
};

const checkInput = () => {
  if (input.value.toUpperCase() === currentTitle.toUpperCase()) {
    // remove 'The' and 'A' from input to avoid silly mistakes
    clearInterval(intervalId);
    displayQuiz();
    currentScore++;
    updateScore();
    // make a message 'pop' ==> 'Great!' and turn focus green
  } else {
    // make a message 'pop' ==> 'Nope' and turn focus red
  }
};

const setTimer = () => {
  clearInterval(intervalId);
  const countFrom = 333;
  let timeCount = countFrom;
  let timerWidth = 100;
  intervalId = setInterval(() => {
    if (timeCount <= 0) {
      stopTimer();
      displayQuiz();
      currentFailed++;
      updateScore();
      return;
    }
    timeCount--;
    timer.style.width = 'timerWidth' - '5px';
    console.log(timeCount);
  }, 60);
};

const stopTimer = () => {
  clearInterval(intervalId);
};

// event handlers
const setGameSection = () => {
  homeSection.classList.add('hide');
  aboutSection.classList.add('hide');
  gameSection.classList.remove('hide');
};

const setHomeSection = () => {
  gameSection.classList.add('hide');
  aboutSection.classList.add('hide');
  homeSection.classList.remove('hide');
};

const setAboutSection = () => {
  gameSection.classList.add('hide');
  homeSection.classList.add('hide');
  aboutSection.classList.remove('hide');
};

const enterInput = (e) => {
  if (e.key === 'Enter') {
    checkInput();
  }
};

// event listeners
btnStart.onclick = startGame;
btnHome.onclick = setHomeSection;
btnAbout.onclick = setAboutSection;
btnSkip.onclick = skipQuiz;
btnKeyboard.onclick = checkInput;
input.addEventListener('keypress', enterInput);
