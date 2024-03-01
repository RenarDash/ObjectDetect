
img = "";
Modelstatus = "";
o = [];
pic = "";
function load_pic(a) {
    console.log("load Pic");
    pic = a;
    preload();
}

function preload() {
    console.log(pic);
    if (pic == "Hp") {
        img = loadImage("book.jpg")
    }
    else if (pic == "d") {
        img = loadImage("dog_cat.jpg");
    }
    else if(pic=="b"){
        img=loadImage("bot.jpg");
    }
    else if (pic=="s") {
        img=loadImage("stufed.avif");
    }
}


function setup() {
    canvas = createCanvas(1280, 620);
    canvas.center();
    oD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object deleting";
}

function modelLoaded() {
    console.log("Model Loaded");
    Modelstatus = true;
    oD.detect(img, gotResults);
}

function gotResults(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        o = r;
    }
}

function draw() {
    image(img, 0, 0, 1280,620);
    if (Modelstatus != "") {
        for (i = 0; i < o.length; i++) {
            document.getElementById("status").innerHTML = "Object Deleted";
            objName = o[i].label;
            objConfindence = floor(o[i].confidence * 100);
            objX = o[i].x;
            objY = o[i].y;
            objWidth = o[i].width;
            objHeight = o[i].height;
            fill("#965a3e");
            strokeWeight(2);
            textSize(20);
            text(objName + " " + objConfindence + "% ", objX + 20, objY + 20);
            noFill();
            stroke("#964A3E");
            strokeWeight(5);
            rect(objX, objY, objWidth, objHeight);
        }
    }
}