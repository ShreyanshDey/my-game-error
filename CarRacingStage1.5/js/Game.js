class Game {
  constructor(){

  }
 
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    boat1 = createSprite(100,200);
    boat1.addImage(boat1image)
    boat2 = createSprite(300,200);
    boat2.addImage(boat2image)
    boat3 = createSprite(500,200);
    boat3.addImage(boat3image)
    boat4 = createSprite(700,200);
    boat4.addImage(boat4image)
    iceberg.createSprite(100,3000)
    iceberg.addImage(ice)
    iceberg,x = Math.round(random(100,700))
    boat1.scale = 0.3
    boat2.scale = 0.3
    boat3.scale = 0.3
    boat4.scale = 0.3

    boats = [boat1, boat2, boat3, boat4];
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd()
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(river)
      image(river,0,-displayHeight,displayWidth,displayHeight)
      //index of the array
      var index = 0;

      //x and y position of the boats
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the boats a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the boats in y direction
        y = displayHeight - allPlayers[plr].distance;
        boats[index-1].x = x;
        boats[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill("blue")
          ellipse(x,y,60,60)
          boats[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = boats[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if (player.distance>3200) {
  gameState=2
  player.rank+=1
  Player.updateCarsAtEnd(player.rank)
}
    drawSprites();
  }
  end(){
    console.log("Game Ended")
    console.log(player.rank)
  }
}
