
var monkey , monkey_running;
var banana ,bananaImage,jungleImg, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,resetB;
var survivalTime, ground,rand,backg;
var gameState = 1;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 
}



function setup() {
 canvas= createCanvas(displayWidth, displayHeight);



  //creating monkey
  monkey = createSprite(100,290,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  edges = createEdgeSprites();
  
  //make ground
  ground = createSprite(10,displayHeight/2,displayWidth,10);
  
  ground.scale = 1;

  ground.velocityX =-4;
 ground.x=ground.width /2;

  FoodGroup = createGroup();
  obstacleGroup =createGroup();
  
  
  survivalTime = 0;


}


function draw() {
  if(gameState=== 1){
     background("lightgreen");
  stroke("black");
  textSize(25);
  survivalTime = Math.ceil(frameCount/ frameRate())
 
  text("Survival time:"+  survivalTime,camera.x-300,50)
  fill("hotpink");
  text("Press 'M' to make the monkey jump",700,200);
  
  if(ground.x<0){
 ground.x=ground.width /2;
  
  }
  
  
  if(keyDown("M")){
  monkey.velocityY = -10;
    
  }
   monkey.velocityY =monkey.velocityY+ 0.5 ;
 
    monkey.collide(ground);
    monkey.collide(edges);
  
    
  if(FoodGroup.isTouching(monkey))
  {
   survivalTime = survivalTime +10;
    FoodGroup.destroyEach();
    
  } 
  
 
  }

  
 
  
  if( monkey.isTouching(obstacleGroup) ){
    gameState = 2;
    fill("red");
  text("GAME OVER",camera.x-600,150);
  
  
  
    destroyEach();
  
  
    
  }
  



   // setting the camera 
  // camera.x = resetB.x;
  monkey.x = camera.x;
  monkey.x =100;

  spawnObstacles();
  food();
  drawSprites();
 
 
}

 function food(){
   if(frameCount % 80 === 0){
   banana = createSprite(500,rand,20,20)
   banana.addImage("banana",bananaImage);
   banana.scale = 0.12;
   rand = Math.round(random(200,400)); 
   banana.velocityX = -4    
  
    banana.lifetime = 100;

  FoodGroup.add(banana); 
   }
 
   
 }

 function spawnObstacles(){
   if(frameCount % 200 === 0){
  obstacle = createSprite(600,displayHeight/2-26,20,20)
   obstacle.addImage("obstacles",obstacleImage);
   obstacle.scale = 0.12;

   
   obstacle.velocityX = -4    
   
    obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);

 
   }
   
 }




