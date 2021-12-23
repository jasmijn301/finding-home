const myVideo = document.getElementById("myVideo");
const btnPlay = document.getElementById("btnPlay");
const btnPause = document.getElementById("btnPause");
const vidNumOut = document.getElementById("vidNum");

//buttons
btnPlay.addEventListener("click", playPause);
btnPause.addEventListener("click", playPause);
btnNext1.addEventListener("click", nextVideo1);
btnNext2.addEventListener("click", nextVideo2);
myVideo.addEventListener("ended", vidEnded);

//visibility
document.getElementById("btnPause").style.visibility = "hidden";
document.getElementById("nextButtons").style.visibility = "hidden";
// document.getElementById("clockitself").style.visibility = "hidden";

//style of the chosen button
document.getElementById("btnNext1").style.background = "white";
document.getElementById("btnNext2").style.background = "skyblue";

//animation
var timesUp = document.getElementById("pointer");
var timesUp = document.getElementById("pointer2");
timesUp.addEventListener("animationend", animationEnds);

//videos
const vids = ["1.mp4", "1.5.mp4", "2.mp4", "2.5.mp4", "3.mp4", "3.5.mp4", "4.mp4", "5.mp4", "5.5.mp4", "6.mp4", "7.mp4"];
let vidPlaying = 0;

let choice = 1;
// choice 1 means option 1 is chosen, choice 2 means option 2 is chosen.

//This function is called upon when the stopwatch stops
function animationEnds(event) {

    console.log("end");

    if (choice == 1) {
        //check which video is playing and direct to the video of choice
        //if the last video is playing reset the buttons
        if (vidPlaying == 0 || vidPlaying == 1 || vidPlaying == 2 || vidPlaying == 3 || vidPlaying == 4 || vidPlaying == 7 || vidPlaying == 8) {
            vidPlaying = vidPlaying + 1;
        } else if (vidPlaying == 5 || vidPlaying == 6 || vidPlaying == 9 || vidPlaying == 10) {
            document.getElementById("btnNext2").style.visibility = "visible";
            btnNext1.innerHTML = "option 1";
            vidPlaying = 0;
            document.getElementById("nextButtons").style.visibility = "visible";
        } else {
            nextVideo2();
        }
        myVideo.src = vids[vidPlaying];
        vidNumOut.innerHTML = (vidPlaying) + "/10";

        playVideo();
    } else if (choice == 2) {
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
        vidNumOut.innerHTML = (vidPlaying) + "/10";

        playVideo();
    } else {
        console.log("error: choice element")
    }
}

function playPause(event) {

    switch (event.target.id) {
        case "btnPlay":
            playVideo();
            document.getElementById("btnPlay").style.visibility = "hidden";
            document.getElementById("btnPause").style.visibility = "visible";
            break;
        case "btnPause":
            myVideo.pause();
            document.getElementById("btnPause").style.visibility = "hidden";
            document.getElementById("btnPlay").style.visibility = "visible";
            //make sure the stopwatch doesn't play when the video is paused
            document.getElementById("pointer").style.animationPlayState = "paused";
            document.getElementById("pointer2").style.animationPlayState = "paused";
            break;
    }
}

function playVideo() {

    console.log(choice);

    myVideo.play();

    visibility();
}

function visibility() {

    //the option buttons should be hidden at the first part of each fragment and with the end vids
    if (vidPlaying == 0 || vidPlaying == 2 || vidPlaying == 4 || vidPlaying == 6 || vidPlaying == 7 || vidPlaying == 9 || vidPlaying == 10) {
        document.getElementById("nextButtons").style.visibility = "hidden";
        // document.getElementById("clockitself").style.visibility = "hidden";
    } else if (vidPlaying == 1) {
        document.getElementById("nextButtons").style.visibility = "visible";
        document.getElementById("pointer").style.animationPlayState = "running";
        // document.getElementById("clockitself").style.visibility = "visible";
    } else if (vidPlaying == 3 || vidPlaying == 8) {
        document.getElementById("nextButtons").style.visibility = "visible";
        document.getElementById("pointer2").style.animationPlayState = "running";
    } else {
        console.log("error: visibility()")
    }
}

function vidEnded() {

    //make sure if the player doesn't pick an option, the video still continues
    if (vidPlaying == 0 || vidPlaying == 1 || vidPlaying == 2 || vidPlaying == 3 || vidPlaying == 4 || vidPlaying == 7 || vidPlaying == 8) {
        animationEnds();
    } else {
        document.getElementById("btnNext1").style.visibility = "visible";
        document.getElementById("btnNext2").style.visibility = "hidden";
        btnNext1.innerHTML = "replay";
    }
}

//this video is called upon when the player chooses option 1 or don't choose anything at all
function nextVideo1() {

    choice = 1;
    document.getElementById("btnNext1").style.background = "white";
    document.getElementById("btnNext2").style.background = "skyblue";
}

//this video is called upon when the player chooses option 2
function nextVideo2() {

    choice = choice + 1;
    document.getElementById("btnNext1").style.background = "skyblue";
    document.getElementById("btnNext2").style.background = "white";
}

function removeButton() {

    //change the option buttons when you reach one of the end vids
    document.getElementById("btnNext2").style.visibility = "hidden";
    btnNext1.innerHTML = "replay";
}