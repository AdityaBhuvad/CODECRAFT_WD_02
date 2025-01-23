let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;

const timeDisplay = document.getElementById("timeDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

startPauseBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

function toggleTimer() {
  if (running==true) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
  } else {
    startTime = Date.now();
    timerInterval = setInterval(updateTimeDisplay, 10);
    startPauseBtn.textContent = "Pause";
  }
  running = !running;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  timeDisplay.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  laps.innerHTML = "";
}

function recordLap() {
  if (!running) return;

  const lapTime = formatTime(Date.now() - startTime + elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap: ${lapTime}`;
  laps.appendChild(lapItem);
}

function updateTimeDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(currentTime);
}

function formatTime(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}
console.log(Date.now());

