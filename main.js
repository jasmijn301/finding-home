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

//videos
const vids = ["1.mp4", "2.mp4", "3.mp4", "4.mp4", "5.mp4", "6.mp4", "7.mp4"];
let vidPlaying = 0;

function playPause(event) {

    switch (event.target.id) {
        case "btnPlay":
            playVideo();
            timer = setInterval(update, 100);
            document.getElementById("btnPlay").style.visibility = "hidden";
            document.getElementById("btnPause").style.visibility = "visible";
            break;
        case "btnPause":
            myVideo.pause();
            document.getElementById("btnPause").style.visibility = "hidden";
            document.getElementById("btnPlay").style.visibility = "visible";
            break;
    }
}

function playVideo() {

    myVideo.play();

    // update every 100 ms the time being displayed
    timer = setInterval(update, 100);

    // hidden();
}

function update() {

    timeOut.innerHTML = "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
}

// function hidden() {

//     console.log(vidPlaying);
//     if (vidPlaying == 0) {
//         document.getElementById("nextButtons").style.visibility = "hidden";
//     } else if (vidPlaying == 1) {
//         document.getElementById("nextButtons").style.visibility = "visible";
//     } else if (vidPlaying == 2) {
//         document.getElementById("nextButtons").style.visibility = "hidden";
//     } else {
//         document.getElementById("nextButtons").style.visibility = "visible";
//     }

// }

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
    nextVideo1();

    playVideo();
}

function nextVideo1() {

    //check which video is playing and direct to the video of choice
    if (vidPlaying == 0) {
        vidPlaying = 1;
    } else if (vidPlaying == 1) {
        vidPlaying = 2;
        removeButton();
    } else if (vidPlaying == 4) {
        vidPlaying = 5;
        removeButton();
    } else if (vidPlaying == 2 || vidPlaying == 3 || vidPlaying == 6 || vidPlaying == 7) {
        document.getElementById("btnNext2").style.visibility = "visible";
        btnNext1.innerHTML = "option 1";
        vidPlaying = 0;
    } else {
        nextVideo2();
    }
    myVideo.src = vids[vidPlaying];
    vidNumOut.innerHTML = (vidPlaying + 1) + "/7";
}

function nextVideo2() {

    //check which video is playing and direct to the video of choice
    if (vidPlaying == 0) {
        vidPlaying = 4;
    } else if (vidPlaying == 1) {
        vidPlaying = 3;
        removeButton();
    } else if (vidPlaying == 4) {
        vidPlaying = 6;
        removeButton();
    } else {
        removeButton();
        vidPlaying = 0;
    }
    myVideo.src = vids[vidPlaying];
    vidNumOut.innerHTML = (vidPlaying + 1) + "/7";
}

function removeButton() {

    document.getElementById("btnNext2").style.visibility = "hidden";
    btnNext1.innerHTML = "replay";
}