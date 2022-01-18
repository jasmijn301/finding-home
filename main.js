const myVideo = document.getElementById("myVideo");
const btnPlay = document.getElementById("btnPlay");

//buttons
btnPlay.addEventListener("click", playPause);
btnNext1.addEventListener("click", nextVideo1);
btnNext2.addEventListener("click", nextVideo2);
myVideo.addEventListener("ended", vidEnded);

//visibility
document.getElementById("nextButtons").style.visibility = "hidden";
document.getElementById("clockitself").style.visibility = "hidden";
document.getElementById("clockitself2").style.visibility = "hidden";

//animation
var timesUp = document.getElementById("pointer");
var timesUp = document.getElementById("pointer2");
timesUp.addEventListener("animationend", animationEnds);

//videos
const vids = ["1.mp4", "1.5.mp4", "2.mp4", "2.5.mp4", "3.mp4", "4.mp4", "5.mp4", "5.5.mp4", "6.mp4", "7.mp4", "8.mp4"];
let vidPlaying = 0;

let choice = 1;
// choice 1 means option 1 is chosen, choice 2 means option 2 is chosen.
let play = 0;
//0 means the video is paused, 1 means the video is playing.

//This function is called upon when the stopwatch stops or when a video stops (except for the end vids)
function animationEnds(event) {

    if (choice == 1) {
        //check which video is playing and direct to the video of choice
        //if the last video is playing reset the buttons
        if (vidPlaying == 0 || vidPlaying == 1 || vidPlaying == 2 || vidPlaying == 3 || vidPlaying == 6 || vidPlaying == 7) {
            vidPlaying = vidPlaying + 1;
        } else {
            console.log("error: animationEnds, choice1")
        }
        myVideo.src = vids[vidPlaying];

        playVideo();

    } else if (choice == 2) {
        //check which video is playing and direct to the video of choice
        if (vidPlaying == 1) {
            vidPlaying = 6;
            choice = 1;
        } else if (vidPlaying == 3) {
            vidPlaying = 5;
            document.getElementById("nextButtons").style.visibility = "hidden";
        } else if (vidPlaying == 7) {
            vidPlaying = 9;
            document.getElementById("nextButtons").style.visibility = "hidden";
        } else {
            console.log("error: animationEnds, choice2")
        }
        myVideo.src = vids[vidPlaying];

        playVideo();

    } else {
        console.log("error: animationEnds")
    }
}

function playPause(event) {
    if (play == 0) {
        play = 1;
        btnPlay.innerHTML = "pause";
        playVideo();
    } else if (play == 1) {
        play = 0;
        btnPlay.innerHTML = "play";
        myVideo.pause();
        //make sure the stopwatch doesn't play when the video is paused
        document.getElementById("pointer").style.animationPlayState = "paused";
        document.getElementById("pointer2").style.animationPlayState = "paused";
    } else {
        console.log("error: playpause");
    }
}

function playVideo() {

    myVideo.play();
    visibility();
}

function visibility() {

    //the option buttons should be hidden at the first part of each fragment and with the end vids
    if (vidPlaying == 0 || vidPlaying == 2 || vidPlaying == 4 || vidPlaying == 5 || vidPlaying == 6 || vidPlaying == 8 || vidPlaying == 9 || vidPlaying == 10 ) {
        document.getElementById("nextButtons").style.visibility = "hidden";
        document.getElementById("clockitself").style.visibility = "hidden";
        document.getElementById("clockitself2").style.visibility = "hidden";
    } else if (vidPlaying == 1) {
        document.getElementById("nextButtons").style.visibility = "visible";
        document.getElementById("pointer").style.animationPlayState = "running";
        document.getElementById("clockitself").style.visibility = "visible";
    } else if (vidPlaying == 3 || vidPlaying == 7) {
        document.getElementById("nextButtons").style.visibility = "visible";
        document.getElementById("pointer2").style.animationPlayState = "running";
        document.getElementById("clockitself2").style.visibility = "visible";
    } else {
        console.log("error: visibility()")
    }
}

function vidEnded() {

    //make sure if the player doesn't pick an option, the video still continues
    if (vidPlaying == 0 || vidPlaying == 1 || vidPlaying == 2 || vidPlaying == 3 || vidPlaying == 6 || vidPlaying == 7) {
        animationEnds();
    } else if (vidPlaying == 4 || vidPlaying == 5 || vidPlaying == 8 || vidPlaying == 9) {
        document.getElementById("nextButtons").style.visibility = "visible";
        btnNext1.innerHTML = "Replay";
        btnNext2.innerHTML = "Watch bloopers";
    } else if (vidPlaying == 10) {
        btnNext1.innerHTML = "Replay music video";
        btnNext2.innerHTML = "Replay bloopers";
        document.getElementById("nextButtons").style.visibility = "visible";
    } else {
        console.log("error: vidEnded()")
    }
}

//this function is called upon when the player chooses option 1 or doesn't choose anything at all
function nextVideo1() {

    if (vidPlaying == 4 || vidPlaying == 5 || vidPlaying == 8 || vidPlaying == 9 || vidPlaying == 10) {
        vidPlaying = 0;
        document.getElementById("nextButtons").style.visibility = "hidden";
        btnNext1.innerHTML = "Option 1";
        btnNext2.innerHTML = "Option 2";
        btnPlay.innerHTML = "play";
        play = 0;
        choice = 1;
        myVideo.src = vids[vidPlaying];
    } else if (vidPlaying == 1 || vidPlaying == 3 || vidPlaying == 7) {
        choice = 1;
        document.getElementById("btnNext2").style.width = "90%";
        document.getElementById("btnNext2").style.marginLeft = "5%";
        document.getElementById("btnNext1").style.width = "100%";
        document.getElementById("btnNext1").style.marginLeft = "0%";
    } else {
        console.log("error: nextVideo1");
    }
}

//this function is called upon when the player chooses option 2
function nextVideo2() {

    if (vidPlaying == 4 || vidPlaying == 5 || vidPlaying == 8 || vidPlaying == 9) {
        vidPlaying = 10;
        document.getElementById("nextButtons").style.visibility = "hidden";
        play = 1;
        choice = 1;
        myVideo.src = vids[vidPlaying];
        playVideo();
    } else if (vidPlaying == 1 || vidPlaying == 3 || vidPlaying == 7) {
        choice = choice + 1;
        document.getElementById("btnNext1").style.width = "90%";
        document.getElementById("btnNext1").style.marginLeft = "5%";
        document.getElementById("btnNext2").style.width = "100%";
        document.getElementById("btnNext2").style.marginLeft = "0%";
    } else if(vidPlaying == 10) {
        playVideo();
        document.getElementById("nextButtons").style.visibility = "hidden";
    } else {
        console.log("error: nextVideo2");
    }
}