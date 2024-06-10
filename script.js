let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;

const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps-list');

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    difference = 0;
    timeDisplay.innerHTML = "00:00:00:00";
    lapsList.innerHTML = "";
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = timeDisplay.innerHTML;
        lapsList.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
