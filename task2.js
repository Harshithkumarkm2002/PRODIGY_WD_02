let startTime;
let updatedTime;
let difference = 0; // Initialize difference to 0
let tInterval;
let running = false;
let lapCounter = 0;
const lapsList = document.getElementById("laps");

// Function to format time in HH:MM:SS:ms
function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const milliseconds = Math.floor((ms % 1000) / 10); // Calculate milliseconds (2 digits)
    return (hours < 10 ? "0" + hours : hours) + ":" +
           (minutes < 10 ? "0" + minutes : minutes) + ":" +
           (seconds < 10 ? "0" + seconds : seconds) + ":" +
           (milliseconds < 10 ? "0" + milliseconds : milliseconds); // Include milliseconds in format
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference; // Use current difference
        tInterval = setInterval(updateTime, 10); // Update time every 10 milliseconds
        running = true;
        document.getElementById("startBtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("lapBtn").disabled = false;
        document.getElementById("resetBtn").disabled = true; // Disable reset button when timer is running
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("resetBtn").disabled = false; // Enable reset button when timer is stopped
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCounter = 0;
    document.getElementById("display").textContent = "00:00:00:00"; // Reset display
    lapsList.innerHTML = ""; // Clear lap times
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true; // Disable reset button after resetting
    document.getElementById("lapBtn").disabled = true; // Disable lap button after resetting
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    document.getElementById("display").textContent = formatTime(difference); // Update display
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = difference;
        const lapElement = document.createElement("li");
        lapElement.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapElement);
        document.getElementById("lapSound").play(); // Play sound alert
    }
}

// Event listeners
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", recordLap);
