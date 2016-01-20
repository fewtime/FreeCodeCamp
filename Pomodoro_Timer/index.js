var breakLength = 0;
var sessionLength = 0;
var currentTime = 0;
var isSession = true;
var timer;

var minutePerSecond = 60;
var hourPerSecond = 3600;
var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';

function increase(time, step) {
    return time + step;
}

function decrease(time, step) {
    return time - step;
}

function boundaryCheck(time) {
    return time<= minutePerSecond ? minutePerSecond : time;
}

function updateTime(time, step, updateFunction) {
    time = updateFunction(time, step);
    return boundaryCheck(time);
}

function secondToMinute(time) {
    return time / minutePerSecond;
}

function secondToHHMMSS(time) {
    var h = Math.floor(time / hourPerSecond);
    var m = Math.floor((time % hourPerSecond) / minutePerSecond);
    var s = Math.floor(time % minutePerSecond);
    return (
        (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    );
}

function init() {
    breakLength = 5 * minutePerSecond;
    sessionLength = 25 * minutePerSecond;
    currentTime = 25 * minutePerSecond;
    isSession = true;
    clearTimeout(timer);

    print();
}

function print() {
    var state = isSession ? "Session" : "Break!";
    $("#breakLength").text(secondToMinute(breakLength));
    $("#sessionLength").text(secondToMinute(sessionLength));
    $("#currentTime").text(secondToHHMMSS(currentTime));
    $("#currentState").text(state);
}

function disableIncreaseAndDecreaseButtons() {
    $("#start").prop("disabled", true);
    $("#breakDecrease").prop("disabled", true);
    $("#breakIncrease").prop("disabled", true);
    $("#sessionDecrease").prop("disabled", true);
    $("#sessionIncrease").prop("disabled", true);
}

function enableIncreaseAndDecreaseButtons() {
    $("#start").prop("disabled", false);
    $("#breakDecrease").prop("disabled", false);
    $("#breakIncrease").prop("disabled", false);
    $("#sessionDecrease").prop("disabled", false);
    $("#sessionIncrease").prop("disabled", false);
}

function playSound() {
    var audio = new Audio(wav);
    audio.play();
}

function start() {
    currentTime = decrease(currentTime, 1);
    if (currentTime < 0) {
        isSession = !isSession;
        currentTime = isSession ? sessionLength : breakLength;
        playSound();
    }
    print();
    timer = setTimeout(start, 1000);
}

function stop() {
    clearTimeout(timer);
}

$(document).ready(function() {

    init();

    $("button").click(function() {
        var buttonID = $(this).attr("id");

        switch (buttonID) {

        case "breakDecrease":
            breakLength = updateTime(breakLength, minutePerSecond, decrease);
            currentTime = isSession ? currentTime : breakLength;
            print();
            break;

        case "breakIncrease":
            breakLength = updateTime(breakLength, minutePerSecond, increase);
            currentTime = isSession ? currentTime : breakLength;
            print();
            break;

        case "sessionDecrease":
            sessionLength = updateTime(sessionLength, minutePerSecond, decrease);
            currentTime = isSession ? sessionLength : currentTime;
            print();
            break;

        case "sessionIncrease":
            sessionLength = updateTime(sessionLength, minutePerSecond, increase);
            currentTime = isSession ? sessionLength : currentTime;
            print();
            break;

        case "start":
            disableIncreaseAndDecreaseButtons();
            start();
            break;

        case "stop":
            enableIncreaseAndDecreaseButtons();
            stop();
            break;

        case "reset":
            init();
            break;

        default: break;
        }
    });
});
