var context = document.querySelector("canvas").getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

var bulletTime = 0;
var bulletArray = new Array();
var bulletIndex = 0;
var spawnArray = new Array();
var enemyArray = new Array();
var itemArray = new Array();
var spawnTime = 0;
var enemyIndex = 0;
var itemIndex = 0;
var particleIndex = 0;
var particleArray = Array();
var particleSpray = 20;
var spawnInterval = 50;
var intervalTimer = 0;
var SHAKE_AMOUNT = 0;
var facingRight = true;
var zombiesKilled = 0;
var enemyCount = 0;
var gen = new SimplexNoise();
var paused = true;
var gameTime = 0;
var timeEllapsed = false;
var scale = 1;
var mapset;
var currentMap;
var player;
var stickLeft;
var stickRight;
var helicopter;
var timerInterval;

context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;


function noise(nx, ny) {
  // Rescale from -1.0:+1.0 to 0.0:1.0
  return gen.noise2D(nx, ny) / 2 + 0.5;
}


function loop(){
  if(paused){
    width = window.innerWidth/scale;
    height = window.innerHeight/scale;
    
    context.canvas.width = width;
    context.canvas.height = height;
    
    context.fillStyle = "#081820";
    context.fillRect(0,0,width,height);
    return;
  }
  window.requestAnimationFrame(loop);
  
  width = window.innerWidth/scale;
  height = window.innerHeight/scale;
  
  context.canvas.width = width;
  context.canvas.height = height;
  
  context.fillStyle = "#081820";
  context.fillRect(0,0,width,height);
  
  if(stickLeft.shooting || stickRight.shooting){  
    preShake();
    currentMap.draw();
    postShake();
  }else{
    currentMap.draw();
  }
  
  if(stickLeft.touching){
    stickLeft.update();
  } 
  if(stickRight.touching){
    stickRight.update();  
  }
  
  updateUI();
  
  if(stickLeft.shooting || stickRight.shooting){  
    preShake();
    handleBullets();
    handleItems();
    player.update();
    handleEnemySpawning();
    handleParticles();
    currentMap.drawTrees();
    if (timeEllapsed) {
      helicopter.update();
    }
    postShake();
  }else{
    handleBullets();
    handleItems();
    player.update();
    handleEnemySpawning();
    handleParticles();
    currentMap.drawTrees();
    if (timeEllapsed) {
      helicopter.update();
    }
  }
  gameTime++;
}


function handleBullets(){
  bulletTime++;
  bulletArray.forEach(function(obj) {
    obj.update();
  });
  if(stickLeft.shooting || stickRight.shooting){  
    player.shoot();
  }
}


function handleEnemySpawning(){
    spawnTime++;
    intervalTimer++;
    if(intervalTimer > 50){
      spawnInterval > 1 ? spawnInterval-- : spawnInterval = 1;
      intervalTimer = 0;
    }
    if(spawnTime >= spawnInterval){
    //if(spawnTime > 200){
      //if (enemyArray.length < 1) {
      if (enemyCount <= 200) {
        var enemy = new Enemy();
        enemyArray[enemyIndex] = enemy;
        enemyIndex++;
        spawnTime = 0;
        enemyCount++;
      }
      // if(spawnInterval == 1){
      //   for (var i = 0; i < 2; i++) {
      //     var enemy = new Enemy();
      //     enemyArray[enemyIndex] = enemy;
      //     enemyIndex++;
      //   }
      // }
    }
    handleEnemies();
}


function handleEnemies(){
  enemyArray.forEach(function(obj) {    
    var isColliding = testCollisionEntity(player,obj);
    if(isColliding){
      obj.render();
      clearInterval(timerInterval)
      document.getElementById("ui-death").style.display = 'flex';
    }else{
      obj.update();
    }
  });
}


function handleParticles(){
  particleArray.forEach(function(obj) {
    obj.update();
  });
}


function handleItems(){
  itemArray.forEach(function(obj) {
    obj.update();
  });
}


function debugPath(arr){
  offsetX = width/2 - player.x;
  offsetY = height/2 - player.y;
  context.fillText(arr[1], 40, 50);
  //context.fillText(enemyGrid, 40, 70);
  arr.forEach(function(v) {
    fillRect(
      v[1]*currentMap.tsize+offsetX+16,
      v[0]*currentMap.tsize+offsetY+16,
      5,
      5,
      'red')
  })
}


function debugText(txt){
  context.fillText(txt, 40, 100);
}


var woodPlankTile = new Image();
var wallTile = new Image();
var cornerWallTile = new Image();
var doorTile = new Image();
var bulletPic = new Image();
var enemyPic = new Image();
var shotgunPic = new Image();
var machinegunPic = new Image();
var playerPic = new Image();
var soldierPic = new Image();
var zombiePic = new Image();
var bloodPic = new Image();
var mapPic = new Image();
var grassTilePic = new Image();
var treePic = new Image();
var stumpPic = new Image();
var rpgPic = new Image();
var helicopterPic = new Image();


var itemsList = [
  {
    title: "Shotgun",
    type: "weapon",
    description: "Powerful short range weapon",
    spread: 3,
    ammo: 3,
    rateOfFire: 60,
    colour: "yellow",
    img: shotgunPic,
    power: 8
  },
  {
    title: "Machine Gun",
    type: "weapon",
    description: "High speed, innaccurate weapon",
    spread: 1,
    ammo: 10,
    rateOfFire: 8,
    colour: "red",
    img: machinegunPic,
    power: 5
  },
  {
    title: "RPG",
    type: "weapon",
    description: "High impact explosive weapon",
    spread: 1,
    ammo: 1,
    rateOfFire: 60,
    colour: "red",
    img: rpgPic,
    power: 10
  }
];



//-------IMAGE LOADING PROCESS START------//
 
function checkPicsToLoad(){
  picsToLoad--;
  if(picsToLoad == 0){
    setTimeout(loop,100);
    //showSplashScreen();
  }
}
 
function sourceImage(varName, fileName){
  varName.onload = checkPicsToLoad();
  varName.src = fileName;
}
 
function loadImages(){
  var imageList = [
    {varName: woodPlankTile, fileName: "img/wood-plank-tile.png"},
    {varName: doorTile, fileName: "img/door-tile.png"},
    {varName: wallTile, fileName: "img/wall-tile.png"},
    {varName: cornerWallTile, fileName: "img/corner-wall-tile.png"},
    {varName: bulletPic, fileName: "img/bullet-gb.png"},
    {varName: shotgunPic, fileName: "img/shotgun.png"},
    {varName: machinegunPic, fileName: "img/machinegun.png"},
    {varName: playerPic, fileName: "img/player.png"},
    {varName: soldierPic, fileName: "img/soldier-alt.png"},
    {varName: mapPic, fileName: "img/map.jpg"},
    {varName: bloodPic, fileName: "img/blood-gb.png"},
    {varName: zombiePic, fileName: "img/zombie-walk-alt.png"},
    {varName: enemyPic, fileName: "img/zombie.png"},
    {varName: grassTilePic, fileName: "img/grassTile2.png"},
    {varName: treePic, fileName: "img/tree.png"},
    {varName: stumpPic, fileName: "img/stump.png"},
    {varName: rpgPic, fileName: "img/rpg.png"},
    {varName: helicopterPic, fileName: "img/helicopter.png"}
  ];
 
  picsToLoad = imageList.length;
 
  for(var i=0;i<imageList.length;i++){
    sourceImage(imageList[i].varName, imageList[i].fileName);
  }
}
 
//-------IMAGE LOADING PROCESS END------//


Entity = function(type,id,x,y,angle,spdX,spdY,width,height,color,sprite,scale) {
  var self = {
    type: type,
    id: id,
    x: x,
    y: y,
    angle: angle,
    spdX: spdX,
    spdY: spdY,
    width: width,
    height: height,
    color: color,
    sprite: sprite,
    scale: scale
  }
  
  self.update = function(){
    self.move();
    self.render();
  }
  
  self.move = function(){
    var checkCollisions = true;
    var oldX = self.x;
    var oldY = self.y;
    
    //How to normalize 
    // var x=5,y=3;
    // var length = Math.sqrt(x**2+y**2);
    // //Then divide the x and y by the length
    // x = x/length;
    // y = y/length;
    
    //Check X Collision  
    if (self.angle != 0) {
      // self.x += Math.round(Math.cos(self.angle) * self.spdX);
      self.x += Math.cos(self.angle) * self.spdX;
    }
    
    if (currentMap.isPositionWall(self)) {
      self.x = oldX;
      if(self.type === "bullet"){
          self.destroy();
      }
    }
    
    //Check Y Collision
    if (self.angle != 0) {
      // self.y += Math.round(Math.sin(self.angle) * self.spdY);
      self.y += Math.sin(self.angle) * self.spdY;
    }
    if (currentMap.isPositionWall(self)) {
      self.y = oldY;
      if(self.type === "bullet"){
          self.destroy();
      }
    }
  }
  
  self.render = function(){
  
    var x = self.x - player.x;
    var y = self.y - player.y;
    
    x += context.canvas.width/2;
    y += context.canvas.height/2;
    
    x -= self.width/2;
    y -= self.height/2;
    
    if (x + self.width > 0 && y +self.height > 0 && x < innerWidth && y < innerHeight) {
    
      drawImage(self.sprite, x,y,self.sprite.width,self.sprite.height, self.angle, self.scale, 0, 0)
    
    }
    
  }
  
  self.destroy = function(){
    
  }
  
  return self;
}


//ACTIONS GO IN HERE
Actor = function(type,id,x,y,angle,spdX,spdY,width,height,color,sprite,scale,hp,atkSpd) {
  var self = Entity(type,id,x,y,angle,spdX,spdY,width,height,color,sprite,scale);
  
  self.hp = hp;
  self.atkSpd = atkSpd;
  self.spriteAnimCounter = 0;
  
  self.shoot = function(){
    SHAKE_AMOUNT = 0;
    if(bulletTime > player.curWeapon.rateOfFire){
      if (player.curWeapon.ammo <= 0) {
      //player.inventory.weaponList.splice(player.curWeapon.id,1);
        
        player.curWeapon = player.inventory.weaponList[0];
      }
      a = Math.getAngle(stickRight.originX, stickRight.originY, stickRight.x, stickRight.y);
      if(a != 0){
        SHAKE_AMOUNT = player.curWeapon.power;
        if (player.curWeapon.title === "Shotgun") {
          count = 8;
          for (var i = 0; i < count; i++) {
            var bullet = new Bullet();
            bullet.angle = a;
            var delta = Math.random()-0.15;
            bullet.angle = bullet.angle + delta;
            bullet.lifeSpan = 15;
            bullet.spdX = bullet.spdX+(Math.random()*5);
            bulletArray[bulletIndex] = bullet;
            bulletIndex++;
          }
          bulletTime = 0;
        }else if (player.curWeapon.title === "Machine Gun") {
          var bullet = new Bullet();
          bullet.angle = a;
          var delta = Math.random()-0.15;
          bullet.angle = bullet.angle + delta;
          bulletTime = 0;
          bulletArray[bulletIndex] = bullet;
          bulletIndex++;
        }else if (player.curWeapon.title === "Pistol") {
          var bullet = new Bullet();
          bullet.angle = a;
          bulletTime = 0;
          bulletArray[bulletIndex] = bullet;
          bulletIndex++;
        }else if (player.curWeapon.title === "RPG") {
          var bullet = new Bullet();
          bullet.angle = a;
          bulletTime = 0;
          bulletArray[bulletIndex] = bullet;
          bulletIndex++;
        }
        player.curWeapon.ammo--;
      }
    }
  }
  
  
  
  self.render = function(){
  
    var x = self.x - player.x;
    var y = self.y - player.y;
    
    x += context.canvas.width/2;
    y += context.canvas.height/2;
    
    x -= self.width/2;
    y -= self.height/2;
    
    if (x + self.width > 0 && y +self.height > 0 && x < innerWidth && y < innerHeight) {
    
    if(self.type === "player"){
    
      var frameWidth = self.sprite.width/10;
      var frameHeight = self.sprite.height/4;
      
      var walkingMod =  Math.floor(self.spriteAnimCounter) % 10;
      
      var directionMod;
      var dir = Math.abs(Math.floor(Math.degrees(-Math.getAngle(stickLeft.originX, stickLeft.originY, stickLeft.x, stickLeft.y))))
      
      if(dir > 0 && dir <= 90){
        directionMod = 0;
        facingRight = true;
      }else if(dir > 90){
        directionMod = 2;
        facingRight = false;
      }
      if(dir == 0){
        if(facingRight){
          directionMod = 1;
        }else{
          directionMod = 3;
        }
      } 
      
      
      // document.getElementById("angleText").innerHTML = facingRight;
      
      if(dir == 0){
        walkingMod = Math.floor(self.spriteAnimCounter) % 6;
      }else{
        walkingMod = Math.floor(self.spriteAnimCounter) % 10;
      }
     
     
     //let displayX = player.x + window.pageXOffset + canvasRect.left;
// let displayY = self.y + window.pageYOffset + canvasRect.top;

  
      
      drawImage(self.sprite, x,y,frameWidth,frameHeight, self.angle, self.scale, walkingMod*frameWidth, directionMod*frameHeight)
      
    }else if(self.type === "enemy"){
    
      var frameWidth = self.sprite.width/6;
      var frameHeight = self.sprite.height/2;
      
      var walkingMod =  Math.floor(self.spriteAnimCounter) % 6;
      
      var directionMod;
      var dir = Math.abs(Math.floor(Math.degrees(-Math.getAngle(self.x, self.y, player.x, player.y))))
      
      if(dir > 0 && dir <= 90){
        directionMod = 0;
        facingRight = true;
      }else if(dir > 90){
        directionMod = 1;
        facingRight = false;
      }
      if(dir == 0){
        if(facingRight){
          directionMod = 0;
        }else{
          directionMod = 1;
        }
      } 
      
      
      if(dir == 0){
        walkingMod = Math.floor(self.spriteAnimCounter) % 6;
      }else{
        walkingMod = Math.floor(self.spriteAnimCounter) % 6;
      }
     
      
      drawImage(self.sprite, x,y,frameWidth,frameHeight, self.angle, self.scale, walkingMod*frameWidth, directionMod*frameHeight)
  
      
    }else{
      drawImage(self.sprite, x,y,self.sprite.width,self.sprite.height, self.angle, self.scale, 0, 0)
    }
    
    //drawImage(self.sprite, walkingMod*frameWidth,y,frameWidth,frameHeight, self.angle, self.scale)
    
    }
  }
  
  return self;
}




Player = function() {
  var self = Actor("player",1,currentMap.width/2,currentMap.height/2,0,2,2,30,30,"red",soldierPic,1,10,2);
  self.inventory = new Inventory(); 
  self.inventory.reset();
  self.curWeapon = self.inventory.weaponList[0];
  
  //ADD TO ENITITY RENDER
  var super_render = self.render;
  self.render = function(){
    self.spriteAnimCounter += 0.15;
    super_render();
    self.angle = Math.getAngle(stickLeft.originX, stickLeft.originY, stickLeft.x, stickLeft.y);
  }
  
  var super_move = self.move;
  self.move = function(){
    super_move();
    itemArray.forEach(function(obj) {
      var isColliding = testCollisionEntity(self,obj);
      if(isColliding){
        //add to inventory
        self.inventory.addItem(obj,self);
      }
    })
  }
  
  return self; 
}




Enemy = function() {
  var coords = getRandomSpawn();
  var self = Actor("enemy",enemyIndex,coords.x,coords.y,0,0.3,0.3,30,30,"red",zombiePic,1,10,2);
  
  
  //ADD TO ENITITY RENDER
  var super_render = self.render;
  self.render = function(){
    self.spriteAnimCounter += 0.10;
    super_render();
  }
  
  
  //ADD TO ENITITY RENDER
  //var super_move = self.move;
  self.move = function(){
    //super_move();
    
    
    
    // var offsetX = width/2 - player.x;
    // var offsetY = height/2 - player.y;
    // var oldX = self.x;
    // var oldY = self.y;
    if (self.angle != 0) {
      self.x += Math.cos(self.angle) * self.spdX;
      self.y += Math.sin(self.angle) * self.spdY;
    }
    if(self.x < 10 || self.x > currentMap.width-10 || self.y < 10 || self.y > currentMap.height-10){
      checkCollisions = false;
    }else{
      checkCollisions = true;
    }
    
    if (checkCollisions) {
      var enemyGrid = getGridPos(self.y,self.x,currentMap);
      var playerGrid = getGridPos(player.y,player.x,currentMap);
        
      var result = findPath(currentMap.grid, enemyGrid, playerGrid);
      
      if (result.length > 1) {
  
        //debug
        //debugPath(result);
        
        self.angle = Math.getAngle(
        self.x+15, 
        self.y+15,
        result[1][1]*currentMap.tsize+16,
        result[1][0]*currentMap.tsize+16
        );
      }else {
        self.angle = Math.getAngle(self.x, self.y, player.x, player.y);
      }
    }else {
      self.angle = Math.getAngle(self.x, self.y, player.x, player.y);
    }
    
    
    
    
    bulletArray.forEach(function(obj) {
      var isColliding = testCollisionEntity(self,obj);
      if(isColliding){
        testX = obj.x
        testY = obj.y
        if(player.curWeapon.title === "RPG"){
            // check other enemy positions nearby and kill if in radius
          enemyArray.forEach(function(e) {
              if (ptInCircle([e.x,e.y], [testX,testY], 100) === -1) {
                e.destroy()
              }
            })
        }
        self.destroy();
        obj.destroy();
      }
    });
  }
  
  


  self.destroy = function(){
    for(var i=0;i<particleSpray;i++){ 
      var p = new Particle(self.x, self.y, (self.angle-3.14)); 
      particleArray[particleIndex] = p;
      particleIndex++; 
    }
    var rand = Math.round(Math.random() * 10);
    if(rand <= 1){
      var i = parseInt(rand);
      itemIndex++; 
      var weaponRand = Math.round(Math.random() * 10);
      if (weaponRand <= 1) {
        i=2;
      }
      //for testing rpg
      //i=2;
      var item = new Item(itemIndex, itemsList[i].title, itemsList[i].type, itemsList[i].description, itemsList[i].spread, itemsList[i].ammo, self.x, self.y, itemsList[i].rateOfFire, itemsList[i].img,itemsList[i].power);
      itemArray[itemIndex] = item;
    }
    zombiesKilled++;
    enemyCount--;
    var index = enemyArray.map(function(e) { return e.id; }).indexOf(self.id);
    //delete enemyArray[index];
    enemyArray.splice(index,1);
    // var filtered = enemyArray.filter(Boolean);
    // enemyArray = Array;
    // enemyArray = filtered;
    enemyArray = enemyArray.filter(Boolean);
    
    //console.log(enemyArray);
  }
  
  
  return self; 
}



Maps = function(obj){
  var self = {
    id: obj.id,
    tsize: obj.tsize,
    grid: obj.grid,
    img: new Image(),
    width: obj.grid[0].length*obj.tsize,
    height: obj.grid.length*obj.tsize,
    cols: obj.grid[0].length,
    rows: obj.grid.length
  }
  self.img.src = obj.imgSrc;
  
  self.isPositionWall = function(pt){
    
    if(pt.x + 0.125 >= (self.width - pt.width) || pt.x < 0){
      return true;
    }
    
    if(pt.y + 0.125 >= (self.height - pt.height) || pt.y < 0){
      return true;
    }
  
    // var gridX = Math.floor(pt.x / self.tsize);
    // var gridY = Math.floor(pt.y / self.tsize); 
    
    // if((gridX < 0 || gridX >= self.grid[0].length) && (gridY < 0 || gridY >= self.grid.length)){
    //   // return true;
    //   return "xy";
    // }
    
    // if(gridX < 0 || gridX > self.grid[0].length){
    //   return true;
    //   //return "x";
    // }
    
    // if(gridY < 0 || gridY > self.grid.length){
    //   return true;
    //   //return "y";
    // }
    
    // if(self.grid[gridY][gridX] > 0){
    //   return true;
    // }
    
    var gridXTopLeft = Math.floor(pt.x / self.tsize);
    var gridYTopLeft = Math.floor(pt.y / self.tsize); 
    var gridXTopRight = Math.floor((pt.x + pt.width) / self.tsize);
    var gridYTopRight = Math.floor(pt.y / self.tsize); 
    var gridXBottomeLeft = Math.floor(pt.x / self.tsize);
    var gridYBottomLeft = Math.floor((pt.y + pt.height) / self.tsize); 
    var gridXBottomRight = Math.floor((pt.x + pt.width) / self.tsize);
    var gridYBottomRight = Math.floor((pt.y + pt.height) / self.tsize); 
    
    if(self.grid[gridYTopLeft][gridXTopLeft] > 1 || self.grid[gridYTopRight][gridXTopRight] > 1 || self.grid[gridYBottomLeft][gridXBottomeLeft] > 1 || self.grid[gridYBottomRight][gridXBottomRight] > 1){
      return true;
    }
  
    //debugText(self.grid[gridYBottomRight][gridXBottomRight])
    
    // return self.grid[gridY][gridX];
    return false;
  }
  
  
  self.draw = function(){
    var x = context.canvas.width/2 - player.x-(player.width/2);
    var y = context.canvas.height/2 - player.y-(player.height/2);
    
    for(var j=0;j<self.rows;j++){
      for(var i=0;i<self.cols;i++){
        //var index = colRowBrickIndex(i,j);
        //if(brickGrid[index] == 1){
          context.drawImage(grassTilePic,(self.tsize*i)+x,(self.tsize*j)+y);
        //}
      }
    }
    //drawImage(self.img,x,y,self.img.width,self.img.height,0,1,0,0)
  }
  
  
  self.drawTrees = function() {
      var x = context.canvas.width/2 - player.x-(player.width/2);
      var y = context.canvas.height/2 - player.y-(player.height/2);
      
    
      for(var j=0;j<self.rows;j++){
        for(var i=0;i<self.cols;i++){
          if(self.grid[j][i] == 1){
            //fillRect((self.tsize*i)+x,(self.tsize*j)+y,32,32,'red')
            //Reserved for helicopter
            //Reserved for start pos
          }
          if(self.grid[j][i] == 2){
            context.drawImage(treePic,(self.tsize*i)+x,(self.tsize*j)+y-32);
          }
          if(self.grid[j][i] == 3){
            context.drawImage(stumpPic,(self.tsize*i)+x,(self.tsize*j)+y);
          
          }
        }
      }
  }
  
  return self;
}




Bullet = function(){
  var self = Entity("bullet",bulletIndex,player.x,player.y,0,5,5,10,6,"yellow",bulletPic,1);
  
    self.lifeSpan = 200;
    self.lifeTime = 0;
    
    var super_render = self.render;
    self.render = function(){
      var angle = self.angle;
      self.angle = Math.degrees(self.angle);
      super_render();
      self.angle = angle;
    }

    var super_move = self.move;
    self.move = function(){
      super_move();
      if(self.lifeTime > self.lifeSpan){
        self.destroy();
      }
      self.lifeTime++;
    }

    self.destroy = function(){
      var index = bulletArray.map(function(e) { return e.id; }).indexOf(self.id);
      //delete enemyArray[index];
      bulletArray.splice(index,1);
      bulletArray = bulletArray.filter(Boolean);
      // var filtered = bulletArray.filter(Boolean);
      // bulletArray = Array;
      // bulletArray = filtered;
      // delete bulletArray[self.id];
    }
    
    return self;
}



Inventory = function() {
  var self = {};
  self.weaponIndex = 0;
  self.itemList = 0;
  self.magicList = 0;
  self.weaponList = new Array();
  self.itemList = new Array();
  self.magicList = new Array();
  self.money = 0;
  
  self.reset = function () {
    self.weaponList.push(new 
    Item(self.weaponIndex, "Pistol", "weapon", "Basic weapon", 1, 99999999, 0, 0, 50, "grey", 1.5));
  } 
  
  self.addItem = function(obj1, obj2){
    if (obj1.type === 'weapon') {
      // Remove all null objects
      var filtered = obj2.inventory.weaponList.filter(Boolean);
      obj2.inventory.weaponList = filtered;
      //console.log(obj1);
      //console.log(obj2);
      //console.log(x);
      //inventory weapon list has a null object = need to remove
      var objExists = obj2.inventory.weaponList.find(x => x.title === obj1.title)
      if(objExists != undefined){
        objExists.ammo += obj1.ammo;
      }else{
        obj2.inventory.weaponIndex++;
      var obj = JSON.parse(JSON.stringify(obj1));
      obj.id = obj2.inventory.weaponIndex;
      obj2.inventory.weaponList[obj2.inventory.weaponIndex] = obj; 
      }
      //console.log(obj1.id)
      var index = itemArray.indexOf(obj1);

      if (index > -1) {
        itemArray.splice(index, 1);
      }
      itemArray = itemArray.filter(Boolean);
      // var filtered = itemArray.filter(Boolean);
      // itemArray = Array;
      // itemArray = filtered;
      //console.log(itemArray);
    }
  }
  
  return self;
}



Item = function(id, title, type, description, spread, ammo, x, y, rateOfFire, img, power){
  var self = Entity(type,id,x,y,0,5,5,30,10,"grey",img,1.5);
  self.title = title;
  self.description = description;
  self.spread = spread;
  self.ammo = ammo;
  self.inPlay = false;
  self.inInventory = false;
  self.rateOfFire = rateOfFire;
  self.power = power;
  
  return self;
}



Particle = function(x,y,angle){
  var self = Entity("particle",particleIndex,x,y,angle,4,4,5,5,"red",bloodPic,0.5);
  self.life = 0;
  self.opacity = 1;
  var delta = Math.random()-0.3;
  self.angle = self.angle + delta;

  
  var super_render = self.render;
  self.render = function(){
      self.life++;
      if(self.opacity > 0){
        context.globalAlpha = self.opacity;
        self.opacity = self.opacity - 0.007;
        super_render();
        context.globalAlpha = 1;
      }else{
        var index = particleArray.map(function(e) { return e.id; }).indexOf(self.id);
        particleArray.splice(index,1);
        particleArray = particleArray.filter(Boolean);
        // delete particleArray[self.id];
      }
  }

  var super_move = self.move;
  self.move = function(){
    if(self.life < Math.random()*10){
      super_move();
    }
  }
  
  return self;
}




Helicopter = function(){
  var self = Entity("helicopter",bulletIndex,currentMap.width,(currentMap.height/2)-32,0,0,0,112,64,"yellow",helicopterPic,1);
  
    
  self.spriteAnimCounter = 0;
  self.shadowOffset = 70;
  self.shadowRadiusX = self.width/3;
  self.shadowRadiusY = self.height/3;
  self.landed = false;
  
    var super_render = self.render;
    self.render = function(){
      
      var x = self.x - player.x;
      var y = self.y - player.y;
      
      x += context.canvas.width/2;
      y += context.canvas.height/2;
      
      x -= self.width/2;
      y -= self.height/2;
      
      self.spriteAnimCounter += 0.4;
    
      var frameWidth = self.sprite.width/2;
      var frameHeight = self.sprite.height;
      
      var walkingMod =  Math.floor(self.spriteAnimCounter) % 2;
      
      //context.save();
      //context.filter = "blur(100px)";
      //context.scale(1,0.4);
      
      // fillCircle(x+frameWidth/3,y+90,frameWidth/3,"rgba(0, 0, 0, .2)");
      
      //context.restore();
      fillEllipse(x+frameWidth/3, y+self.shadowOffset+frameHeight/3, self.shadowRadiusX, self.shadowRadiusY, 0, 0, 2 * Math.PI,false,"rgba(0, 0, 0, 0.2)")
      
      drawImage(self.sprite, x,y,frameWidth,frameHeight, self.angle, self.scale, walkingMod*frameWidth, 0*frameHeight)

    }

    var super_move = self.move;
    self.move = function(){
      //super_move();
      if(!self.landed){
        var heliGrid = getGridPos(self.y+self.sprite.height/3,self.x+self.sprite.width/3,currentMap);
        if(currentMap.grid[heliGrid[0]][heliGrid[1]] == 1){
          //time to land the chopper
          self.land();
        }else {
          self.x -= 1;
        }
      }else {
        var isColliding = testCollisionEntity(player,self);
        if(isColliding){
          document.getElementById("ui-success").style.display = 'flex';
        }
      }
    }
    
    self.land = function() {
      if (self.shadowOffset > 25) {
        self.y += 1;
        self.shadowOffset -= 1;
        self.shadowRadiusX -= 0.2;
        self.shadowRadiusY -= 0.2;
      }else {
        self.landed = true;
      }
    }

    self.destroy = function(){
      
    }
    
    return self;
  }


function changeWeapon(index){
  player.curWeapon = player.inventory.weaponList[index];
}


function updateUI(){
  var ammo;
  if (player.curWeapon.title === "Pistol") {
    ammo = "&infin;";
  }else{
    ammo = player.curWeapon.ammo;
  }
 document.getElementById("ui").innerHTML = player.curWeapon.title + ": " + ammo;
}


function startQuickPlay(debug=false) {
  
  var element = document.getElementById('menuContainer');
  document.getElementById("ui").style.display = 'block';
  
  document.getElementById("time").style.display = 'block';
  
  
 if(!debug){
   document.getElementById("uiContainer").style.display = 'block';
  element.classList.add('fadeOut');
  setTimeout(function() {
    document.getElementById('menuContainer').style.display = 'none';
    
  }, 500) 
  
  setTimeout(function () {
    var twoMinutes = 60 * 2,
          display = document.querySelector('#time');
      startTimer(twoMinutes, display);
  document.querySelector('#time').classList.add('cornerAnimation');
    paused = false;
    setTimeout(loop,100);
  }, 2000)
  }else {
    document.getElementById("uiContainer").style.display = 'block'; document.getElementById('menuContainer').style.display = 'none';
    document.getElementById('time').style.display = 'none';
      paused = false; 
      setTimeout(loop,100);
  }
  
}


function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timeEllapsed = true;
            clearInterval(timerInterval)
            document.getElementById('ui-choppa').style.display = 'block'
            //timer = duration;
        }
    }, 1000);
}



function generateMap(){
  var m = {
    tsize: 32,
    cols: 35,
    rows: 35,
    tarray: []
  }
  for (let y = 0; y < m.rows; y++) {
    m.tarray[y] = [];
    for (let x = 0; x < m.cols; x++) {  
      var tile = 0;
      if (y == 17 && x == 17 || y == 17 && x == 18 || y == 17 && x == 19 || y == 18 && x == 17 || y == 18 && x == 18 || y == 18 && x == 19 || y == 19 && x == 17 || y == 19 && x == 18 || y == 19 && x == 19) {
        tile = 1;
      }else{
        let nx = x/m.cols - 0.5, ny = y/m.rows - 0.5;
        if(noise(6*nx, 6*ny) < 0.18) tile = 2;
        if(noise(6*nx, 6*ny) > 0.18 && noise(6*nx, 6*ny) < 0.19) tile = 3;
      }
      m.tarray[y][x] = tile;
    }
  }
  return m;
}

// document.getElementById("inventoryBtn").addEventListener("touchend", function (e) {
//   console.log("test")
//   paused = !paused;
//   if(!paused){
//     document.getElementById("inventory").style.display = "none";
//     //window.requestAnimationFrame(loop);
//     loop();
//   }else{
//     document.getElementById("inventory").innerHTML = "";
//     player.inventory.weaponList.forEach(function(obj) {
//      document.getElementById("inventory").style.display = "block"; document.getElementById("inventory").innerHTML += "<div class='inventory-item' onclick='changeWeapon(" + obj.id + ")'>" + obj.title + "</div>";
//     });
//   }
// });


document.getElementById("cycleBtn").addEventListener("touchend", function (e) {
  var nextIndex;
  if (player.inventory.weaponList[player.curWeapon.id + 1] != undefined){
     nextIndex = player.curWeapon.id + 1;
  }else{
    nextIndex = 0;
  }
  player.curWeapon = player.inventory.weaponList[nextIndex];
});

function reset() {
  document.querySelector('#time').classList.remove('cornerAnimation');
  document.getElementById('ui-choppa').style.display = 'none';
  document.getElementById("ui-success").style.display = 'none';
  document.getElementById("ui-death").style.display = 'none';
  document.getElementById("uiContainer").style.display = 'block'; document.getElementById('menuContainer').style.display = 'none';
  document.querySelector('#time').innerHTML = '02:00';
  init();
  startQuickPlay();
}

function init() {
  bulletTime = 0;
  bulletArray = new Array();
  bulletIndex = 0;
  spawnArray = new Array();
  enemyArray = new Array();
  itemArray = new Array();
  spawnTime = 0;
  enemyIndex = 0;
  itemIndex = 0;
  particleIndex = 0;
  particleArray = Array();
  particleSpray = 20;
  spawnInterval = 50;
  intervalTimer = 0;
  zombiesKilled = 0;
  enemyCount = 0;
  gen = new SimplexNoise();
  paused = true;
  gameTime = 0;
  timeEllapsed = false;
  mapset = generateMap();
  currentMap = new Maps({
    id: "town",
    tsize: mapset.tsize,
    grid: mapset.tarray,
    rows: mapset.rows,
    cols: mapset.cols,
    imgSrc: "img/map-test-alt.png"
  });
  
  player = new Player();
  
  stickLeft = new JoyStick({
    canvas: context.canvas,
    position: "left",
    action: "move"
  });
  stickRight = new JoyStick({
    canvas: context.canvas,
    position: "right",
    action: "shoot"
  });
  
  helicopter = new Helicopter();
}

init();

window.onload = function () {
    loadImages();
}