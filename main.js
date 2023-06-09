var song = "";

var leftWristX = 0;
var leftWristY = 0;
var scoreLeftWrist = 0;

var rightWristX = 0;
var rightWristY = 0;
var scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');

    // Code for Left Wrist
    if (scoreLeftWrist > 0.2) { 
        circle(leftWristX, leftWristY, 20);
        NumberforleftWristY = Number(leftWristY);
        remove_decimal = floor(NumberforleftWristY);
        volume = remove_decimal / 500;
        document.getElementById("volume").innerHTML = 'Volume: ' + volume;
        song.setVolume(volume);
    }

    // Code for Right Wrist
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function modelLoaded() {
    console.log("Model has been Loaded! You are free to use the app!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("X-position of Left Wrist- " + leftWristX + "Y-position of Left Wrist- " + leftWristY);
        console.log("X-position of Right Wrist- " + rightWristX + "Y-position of Right Wrist- " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
    }
}

function play() {
    song.play();
    song.setVolume(1.0);
    song.rate(1.0);
}