const myVideo = document.getElementById("myVideo");
const btnPlay = document.getElementById("btnPlay");
const btnPause = document.getElementById("btnPause");
const timeOut = document.getElementById("timeOut");
const vidNumOut = document.getElementById("vidNum");
let timer = null;

document.getElementById("nextButtons").style.visibility = "hidden";

btnPlay.addEventListener("click",vidAction);
btnPause.addEventListener("click", vidAction);
btnNext.addEventListener("click",nextVideo);
myVideo.addEventListener("ended",vidEnded);

//Vids
const vids = ["1.mp4", "2.mp4", "3.mp4", "4.mp4"];
let vidPlaying = 0;

function vidAction(event){
    switch(event.target.id){
        case "btnPlay":
            playVideo();
            timer = setInterval(update, 100);
            break;
        case "btnPause":
            myVideo.pause();
            break;
       
    }
}

function playVideo(){
    myVideo.play();
    timer = setInterval(update, 100);

    // update every 100 ms the time being displayed
}

function update(){
    timeOut.innerHTML = "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
    console.log("Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration));
    if (myTime(myVideo.currentTime) >= (myTime(myVideo.duration) / 2)){
        document.getElementById("nextButtons").style.visibility = "visible";
        console.log("visible");
    } else {
        console.log("not visible");
    }
}

function myTime(time) {

    // make the time readable for humans

    var hr = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0) {
        sec_min += "" + hrs + ":" + (min <10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + Math.round(sec);
    return sec_min;
}

function vidEnded(){
    clearInterval(timer);
    timeOut.innerHTML = "Timer: 0";
    nextVideo();
    playVideo();
}

function nextVideo(){
    // start with checking which video is playing
    if(vidPlaying < 3){
        // 3 in this case because there are 4 videos
        vidPlaying++;
    } else {
        vidPlaying = 0;
    }
    myVideo.src = vids[vidPlaying];
    vidNumOut.innerHTML = (vidPlaying+1) +"/4";

}