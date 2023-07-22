
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');


let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId;


function formatTime(milliseconds) {
  const totalMilliseconds = milliseconds;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const millisecondsPart = (totalMilliseconds % 1000).toString().padStart(3, '0');
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${millisecondsPart}`;
}


function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(currentTime);
}


function startStop() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    startStopButton.textContent = 'Start';
    elapsedTime = Date.now() - startTime + elapsedTime;
  } else {
    startTime = Date.now() - (isRunning ? Date.now() - startTime : elapsedTime);
    intervalId = setInterval(updateDisplay, 10);
    isRunning = true;
    startStopButton.textContent = 'Stop';
  }
}


function reset() {
  clearInterval(intervalId);
  display.textContent = '00:00:00:000';
  isRunning = false;
  startStopButton.textContent = 'Start';
  elapsedTime = 0;
}


startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
