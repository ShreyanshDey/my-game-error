var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var river
var boat1image,boat2image,boat3image,boat4image
var form, player, game;
var iceberg,ice

var boats, boat1, boat2, boat3, boat4;
function preload() {
  boat1image= loadImage("images/Boat.png")
  boat2image= loadImage("images/Boat.png")
  boat3image= loadImage("images/Boat.png")
  boat4image= loadImage("images/Boat.png")
  river = loadImage("images/Sea.jpg")
  ice = loadImage("icebergy.png")
  //track.scale=0.5
}
  function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState===2) {
    game.end();
  }
}
