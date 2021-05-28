object=[];
video="";
status="";

function preload()
{
    video =createVideo("video.mp4");
    video.hide();
}

function setup()
{
canvas=createCanvas(300,300);
canvas.center();
}

function draw()
{
image(video,0,0,300,300);
if(status !=""){
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML="status:objects detected";
        document.getElementById("numbers_of_objects").innerHTML="number of objects detected are : "+objects.length;

        fill("#00fff7");
        percent = floor(objects[i].confidence *100);
        text(objects[i].label + " "+percent+ "%",objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#00fff7");
        rect(objects[i].x, objects[i].width,objects[i].height);
    }
}
}

function gotResult(error , results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;

}


function start()
{
    objectDetector=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded()
{
    console.log("modelLoaded")
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}