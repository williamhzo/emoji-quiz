//variable declaration
const home = document.getElementById('home');
const inGame = document.getElementById('in-game');
const about = document.getElementById('about');
const btnStart = document.getElementById('btn-start');
const btnHome = document.getElementById('btn-home');
const btnAbout = document.getElementById('btn-about');

//functions & event handlers
function setGame() {
  home.classList.add('hide');
  about.classList.add('hide');
  inGame.classList.remove('hide');
  console.log(home, inGame);
  displayQuiz();
  setTimer();
}

function setHome() {
  inGame.classList.add('hide');
  about.classList.add('hide');
  home.classList.remove('hide');
  console.log('hola');
}

function setAbout() {
  //
}

function displayQuiz() {
  pickRandomQuiz()
}

function pickRandomQuiz() {
  const quiz = [...answers]
}

function skipQuiz() {
  //
}

function giveResult() {
  //
}

function setTimer() {
  //
}

//event listeners
btnStart.onclick = setGame();
btnHome.onclick = setHome();
btnAbout.onclick = setAbout();

// window.addEventListener('load', setHome());
