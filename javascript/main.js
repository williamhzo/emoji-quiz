// importing data
import { movies } from './data.js';

// sections
const homeSection = document.getElementById('home');
const gameSection = document.getElementById('in-game');
const aboutSection = document.getElementById('about');

// in-game
const emojiList = document.querySelector('.emoji-list');
const totalScore = document.getElementById('score');
// buttons
const btnStart = document.getElementById('btn-start');
const btnHome = document.getElementById('btn-home');
const btnAbout = document.getElementById('btn-about');
const btnSkip = document.getElementById('btn-skip');

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
  currentScore = 0;
  currentFailed = 0;
  quizLength = movies.length;
  updateScore();
  quizArray = JSON.parse(JSON.stringify(movies));
  setGameSection();
  displayQuiz();
};

const displayQuiz = () => {
  // Takes a random movie from database and displays it in DOM
  input.value = '';
  randomIndex = Math.floor(Math.random() * quizArray.length);
  currentEmojis = quizArray[randomIndex].emoji;
  currentTitle = quizArray[randomIndex].title;
  emojiList.innerHTML = '';
  currentEmojis.forEach((e) => {
    emojiList.innerHTML += `<li class="emoji">${e}</li>`;
  });
  // quizArray = quizArray.splice(quizArray[randomIndex], 1);
  console.log(currentTitle);
  setTimer();
  quizArray.splice(randomIndex, 1);
  if (quizArray.length === 0) {
    // make a message 'pop' ==> 'That's all folks!'
  }
};

const updateScore = () => {
  totalScore.innerHTML = `<li class='success'> Right: ${currentScore}</li>
  <li class='fail'>Wrong: ${currentFailed}</li>
  <li class='total'>Out of: ${quizLength}</li>`;
};

const skipQuiz = () => {
  displayQuiz();
  currentFailed++;
  updateScore();
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
  const countFrom = 30;
  let seconds = countFrom;
  const timer = document.querySelector('.time-counter');
  intervalId = setInterval(() => {
    if (seconds < 0) {
      clearInterval(intervalId);
      displayQuiz();
      currentFailed++;
      updateScore();
      return;
    }
    seconds--;
    timer.style.width -= timer.style.width / countFrom;
    console.log(seconds);
  }, 1000);
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
input.addEventListener('keypress', enterInput);
