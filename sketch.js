var ballon,database,height;
var bg,bgImage;
var ballonImage;

function setup(){
    database=firebase.database();
    createCanvas(1500,1500);
    ballon = createSprite(250,250,10,10);
    ballon.shapeColor = "red";
    ballon.addImage(ballonImage);
    var ballonheight=database.ref('ballon/height');
    ballonheight.on("value",readheight,showerror);
   }

function preload(){
bgImage=loadImage("images/Hot Air ballon-01.png");
ballonImage=loadImage("images/Hot Air ballon-02.png");
}

function draw(){
   background(bgImage);
    if(height!==undefined){
    if(keyDown(LEFT_ARROW)){
        updateHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updateHeight(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+1);
    }
}
    drawSprites();
}


function readheight(data){
    height=data.val();
    ballon.x=height.x;
    ballon.y=height.y;
}
function updateHeight(x,y){
    database.ref('ballon/height').set({'x':height.x+x,'y':height.y+y})
}
function showerror(){
    console.log("check error");
}