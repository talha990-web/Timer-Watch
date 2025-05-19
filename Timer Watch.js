let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let themeToggle = document.getElementById("themeToggle");
let minutesInput = document.getElementById("minutesInput");
let secondsInput = document.getElementById("secondsInput");
let lapTimesList = document.getElementById("lapTimes");
let progressBar = document.querySelector(".progress-bar");

let interval = null;
let seconds = 0;
let isCountdown = false;
let totalTime = 0;
let laps = [];
let timeUpMessage = document.getElementById("timeUpMessage");

function updateTimer() {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
  let progress = (seconds / totalTime) * 100;
  progressBar.style.background = `conic-gradient(#4caf50 ${progress}%, transparent ${progress}%)`;
}

startBtn.onclick = () => {
  if (interval) return;

  let minsVal = parseInt(minutesInput.value);
  let secsVal = parseInt(secondsInput.value);

  if (!isNaN(minsVal) || !isNaN(secsVal)) {
    isCountdown = true;
    seconds = (isNaN(minsVal) ? 0 : minsVal * 60) + (isNaN(secsVal) ? 0 : secsVal);
    totalTime = seconds;
  } else {
    isCountdown = false;
    seconds = 0;
    totalTime = 60 * 60; 
  }

  updateTimer();

  interval = setInterval(() => {
    if (isCountdown) {
      seconds--;
      updateTimer();
      updateProgressBar();

      if (seconds <= 0) {
        clearInterval(interval);
        interval = null;
        timerDisplay.textContent = "00:00";
        timeUpMessage.textContent = "⏰ Time's up !";
        setTimeout(() => {
          timeUpMessage.textContent = ""; 
        }, 5000);
      }
    } else {
      seconds++;
      updateTimer();
      updateProgressBar();
    }
  }, 1000);
};

stopBtn.onclick = () => {
  clearInterval(interval);
  interval = null;
};

resetBtn.onclick = () => {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  updateTimer();
  updateProgressBar();
  minutesInput.value = "";
  secondsInput.value = "";
  laps = [];
  lapTimesList.innerHTML = "";
  timeUpMessage.textContent = ""; 
};

lapBtn.onclick = () => {
  if (interval || seconds > 0) {
    laps.push(seconds);
    let lapTime = document.createElement("li");
    let lapMins = Math.floor(seconds / 60);
    let lapSecs = seconds % 60;
    lapTime.textContent = `Lap: ${lapMins.toString().padStart(2, '0')}:${lapSecs.toString().padStart(2, '0')}`;
    lapTimesList.appendChild(lapTime);
  }
};

themeToggle.onclick = () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggle.textContent =
    document.body.classList.contains("dark-theme")
      ? "🌞 Light Theme"
      : "🌙 Dark Theme";
};

updateTimer();
