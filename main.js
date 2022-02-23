status = "";
objects = [];
song = "";
function setup() {
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Object is being detected by COCO SSD";
}
function preload(){
song = loadSound('Alarm.mp3');
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for( var i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x ,objects[i].y+ 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby Detected"
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Baby not found";
                console.log("Play")
                song.play();
            }
            if(objects.length == 0 ){
                document.getElementById("status").innerHTML = "Baby not found";
                console.log("Play")
                song.play();
            }
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true ; 
    objectDetector.detect(video,gotResult)
}
function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects = results;
}
}