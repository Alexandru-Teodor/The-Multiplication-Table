const max = 11;
let nr1, nr2, result;
let started = false;

document.getElementById("resultBox").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.getElementById("input-btn").click();
    }
});

document.getElementById("input-btn").disabled = true;

function playGame() {
    document.getElementById("endGame").style.visibility = "visible";
    document.getElementById("input-btn").disabled = false;
    document.getElementById("resultBox").value = "";
    document.getElementById("message").innerHTML = "";
    nr1 = Math.floor(Math.random() * max);
    nr2 = Math.floor(Math.random() * max);
    result = nr1 * nr2;
    document.getElementById("no1").value = nr1;
    document.getElementById("no2").value = nr2;
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInHours = (diffInHrs - hh);
    let hours = Math.floor(diffInHours)

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hours.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

let startTime;
let elapsedTime = 0;
let timerInterval;

let startTimeCrt;
let elapsedTimeCrt = 0;
let timerIntervalCrt;
  
function print(txt) {
    document.getElementById("timerTotal").innerHTML = txt;
}

function printCrt(txtCrt) {
    document.getElementById("timerCrt").innerHTML = txtCrt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
}

function startCrt() {
    startTimeCrt = Date.now() - elapsedTimeCrt;
    timerIntervalCrt = setInterval(function printTimeCrt() {
        elapsedTimeCrt = Date.now() - startTimeCrt;
        printCrt(timeToString(elapsedTimeCrt));
    }, 10);
}

function reset() {
    clearInterval(timerIntervalCrt);
    printCrt("00:00:00");
    elapsedTimeCrt = 0;
    startCrt();
}

document.getElementById("endGame").addEventListener("click", endGame);

function endGame() {
    clearInterval(timerInterval);
    clearInterval(timerIntervalCrt);
    document.getElementById("resultBox").value = "";
    document.getElementById("no1").value = "";
    document.getElementById("no2").value = "";
    document.getElementById("message").innerHTML = "Thank you for playing!"
    document.getElementById("input-btn").disabled = true;
    document.getElementById("gameArea").style.visibility = "hidden";
    document.getElementById("restart").style.visibility = "hidden";
    document.getElementById("endGame").style.visibility = "hidden";
}

function checkResult() {
    let check = parseInt(document.getElementById("resultBox").value);
    if (isNaN(check)) {
        document.getElementById("resultBox").value = "";
        document.getElementById("message").innerHTML = "Input error! Please enter a natural number!"
    }
    else if (check === result) {
        clearInterval(timerIntervalCrt);
        document.getElementById("message").innerHTML = "Correct!"
        document.getElementById("message").style.color = "green";
        document.getElementById("input-btn").disabled = true;
    }
    else {
        document.getElementById("message").innerHTML = "Incorrect result! Please enter another number!"
        document.getElementById("resultBox").value = "";
    }
}

function restartGame() {
    document.getElementById("gameArea").style.visibility = "visible";
    document.getElementById("restart").innerText = "Restart";
    document.getElementById("message").style.color = "black";
    playGame();
    if (started == false) {
        start();
        reset();
        started = true;
    }
    else {
        reset();
    }
}