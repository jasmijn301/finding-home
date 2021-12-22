const myVideo = document.getElementById("myVideo");
const btnPlay = document.getElementById("btnPlay");
const btnPause = document.getElementById("btnPause");
const timeOut = document.getElementById("timeOut");
const vidNumOut = document.getElementById("vidNum");
let timer = null;

//buttons
btnPlay.addEventListener("click", playPause);
btnPause.addEventListener("click", playPause);
btnNext1.addEventListener("click", nextVideo1);
btnNext2.addEventListener("click", nextVideo2);
myVideo.addEventListener("ended", vidEnded);

document.getElementById("btnPause").style.visibility = "hidden";
document.getElementById("nextButtons").style.visibility = "hidden";
document.getElementById("clockitself").style.visibility = "hidden";

var timesUp = document.getElementById("pointer");


// Standard syntax
timesUp.addEventListener("animationend", myEndFunction);

function myEndFunction(event){
    console.log("end");
}

//videos
const vids = ["1.mp4", "1.5.mp4", "2.mp4", "2.5.mp4", "3.mp4", "3.5.mp4", "4.mp4", "5.mp4", "5.5.mp4", "6.mp4", "7.mp4"];
let vidPlaying = 0;

let choice = 1;
// choice 1 means option 1 is chosen, choice 2 means option 2 is chosen.

function playPause(event) {

    switch (event.target.id) {
        case "btnPlay":
            playVideo();
            timer = setInterval(update, 100);
            document.getElementById("btnPlay").style.visibility = "hidden";
            document.getElementById("btnPause").style.visibility = "visible";
            //make sure the stopwatch starts/continues when play is pressed
            // document.getElementById("pointer").style.animationPlayState = "running";
            break;
        case "btnPause":
            myVideo.pause();
            document.getElementById("btnPause").style.visibility = "hidden";
            document.getElementById("btnPlay").style.visibility = "visible";
            //make sure the stopwatch doesn't play when the video is paused
            document.getElementById("pointer").style.animationPlayState = "paused";
            break;
    }
}

function playVideo() {

    myVideo.play();

    // update every 100 ms the time being displayed
    timer = setInterval(update, 100);

    hidden();
}

function update() {

    timeOut.innerHTML = "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
}

function hidden() {

    //the option buttons should be hidden at the first part of each fragment and with the end vids
    if (vidPlaying == 0 || vidPlaying == 2 || vidPlaying == 4 || vidPlaying == 6 || vidPlaying == 7 || vidPlaying == 9 || vidPlaying == 10) {
        document.getElementById("nextButtons").style.visibility = "hidden";
        document.getElementById("timeOut").style.visibility = "hidden";
        document.getElementById("clockitself").style.visibility = "hidden";
    } else {
        document.getElementById("nextButtons").style.visibility = "visible";
        document.getElementById("timeOut").style.visibility = "visible";
        document.getElementById("pointer").style.animationPlayState = "running";
        document.getElementById("clockitself").style.visibility = "visible";
    }
}

//make time readable for humans
function myTime(time) {

    var hr = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0) {
        sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + Math.round(sec);
    return sec_min;
}

function vidEnded() {

    clearInterval(timer);
    timeOut.innerHTML = "Timer: 0";

    //make sure if the player doesn't pick an option, the video still continues
    if (vidPlaying == 0 || vidPlaying == 1 ||vidPlaying == 2 ||vidPlaying == 3 || vidPlaying == 4 || vidPlaying == 7 || vidPlaying == 8) {
        nextVideo1();
    } else {
        document.getElementById("btnNext1").style.visibility = "visible";
        document.getElementById("btnNext2").style.visibility = "hidden";
        btnNext1.innerHTML = "replay";
    }
}

function nextVideo1() {

    //check which video is playing and direct to the video of choice
    //if the last video is playing reset the buttons
    if (vidPlaying == 0 ||vidPlaying == 1 || vidPlaying == 2 || vidPlaying == 3 || vidPlaying == 4 || vidPlaying == 7 || vidPlaying == 8) {
        vidPlaying = vidPlaying + 1;
    } else if (vidPlaying == 5 || vidPlaying == 6 || vidPlaying == 9 || vidPlaying == 10) {
        document.getElementById("btnNext2").style.visibility = "visible";
        btnNext1.innerHTML = "option 1";
        vidPlaying = 0;
        timer = null;
        document.getElementById("nextButtons").style.visibility = "visible";
        document.getElementById("timeOut").style.visibility = "visible";
    } else {
        nextVideo2();
    }
    myVideo.src = vids[vidPlaying];
    vidNumOut.innerHTML = (vidPlaying) + "/9";

    playVideo();
}

function nextVideo2() {

    //check which video is playing and direct to the video of choice
    if (vidPlaying == 1) {
        vidPlaying = 7;
    } else if (vidPlaying == 3) {
        vidPlaying = 6;
        removeButton();
    } else if (vidPlaying == 8) {
        vidPlaying = 10;
        removeButton();
    } else {
        removeButton();
        vidPlaying = 0;
    }
    myVideo.src = vids[vidPlaying];
    vidNumOut.innerHTML = (vidPlaying) + "/9";

    playVideo();
}

function removeButton() {

    //change the option buttons when you reach one of the end vids
    document.getElementById("btnNext2").style.visibility = "hidden";
    btnNext1.innerHTML = "replay";
}

