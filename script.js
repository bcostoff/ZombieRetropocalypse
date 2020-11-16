var mapset = {
  tsize: 32,
  cols: 24,
  rows: 24,
  tarray: [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],
[0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0],
[0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,1,0,0,1,0,0],
[0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
[0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0],
[0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
[0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
}

var context = document.querySelector("canvas").getContext("2d");
// var width = document.documentElement.clientWidth;
// var height = document.documentElement.clientHeight;

var width = window.innerWidth;
var height = window.innerHeight;

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
var spawnInterval = 300;
var intervalTimer = 0;
var paused = false; 
var SHAKE_AMOUNT = 0;
var facingRight = true;

function loop(){
  if(paused){
    return;
  }
  window.requestAnimationFrame(loop);
  
  width = window.innerWidth;
  height = window.innerHeight;
  
  context.canvas.width = width;
  context.canvas.height = height;
  
  context.fillStyle = "#000000";
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
    postShake();
  }else{
    handleBullets();
    handleItems();
    player.update();
    handleEnemySpawning();
    handleParticles();
  }
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
    intervalTimer++
    if(intervalTimer > 500){
      spawnInterval--;
      intervalTimer = 0;
    }
    // if(spawnTime > spawnInterval){
      if(spawnTime > 200){
        var enemy = new Enemy();
        enemyArray[enemyIndex] = enemy;
        enemyIndex++;
        spawnTime = 0;
    }
    handleEnemies();
}


function handleEnemies(){
  enemyArray.forEach(function(obj) {    
    var isColliding = testCollisionEntity(player,obj);
    if(isColliding){
      obj.render();
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


var itemsList = [
  {
    title: "Shotgun",
    type: "weapon",
    description: "Powerful short range weapon",
    spread: 3,
    ammo: 5,
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
    ammo: 20,
    rateOfFire: 8,
    colour: "red",
    img: machinegunPic,
    power: 5
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
    {varName: bulletPic, fileName: "img/bullet.png"},
    {varName: shotgunPic, fileName: "img/shotgun.png"},
    {varName: machinegunPic, fileName: "img/machinegun.png"},
    {varName: playerPic, fileName: "img/player.png"},
    {varName: soldierPic, fileName: "img/soldier-alt.png"},
    {varName: mapPic, fileName: "img/map.jpg"},
    {varName: bloodPic, fileName: "img/blood.png"},
    {varName: zombiePic, fileName: "img/zombie-walk-alt.png"},
    {varName: enemyPic, fileName: "img/zombie.png"}
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
    if (self.angle != 0) {
      self.x += Math.cos(self.angle) * self.spdX;
      self.y += Math.sin(self.angle) * self.spdY;
    }
    if(self.type === "enemy"){
      if(self.x < 0 || self.x > currentMap.width || self.y < 0 || self.y > currentMap.height){
        checkCollisions = false;
      }else{
        checkCollisions = true;
      }
    }
    if(checkCollisions){
      if(currentMap.isPositionWall(self)){
        self.x = oldX;
        self.y = oldY;
        if(self.type === "bullet"){
          self.destroy();
        }
      }else{
        if(self.x > (currentMap.width - self.width) || self.x < 0){
          self.x = oldX;
          if(self.type === "bullet"){
            self.destroy();
          }
        }
        if(self.y > (currentMap.height - self.height) || self.y < 0){
          self.y = oldY;
          if(self.type === "bullet"){
            self.destroy();
          }
        }
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
    
    drawImage(self.sprite, x,y,self.sprite.width,self.sprite.height, self.angle, self.scale, 0, 0)
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
      player.inventory.weaponList.splice(player.curWeapon.id,1);
        
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
  
  return self;
}




Player = function() {
  var self = Actor("player",1,width/2,height/2,0,2,2,30,30,"red",soldierPic,1,10,2);
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
    self.angle = Math.getAngle(self.x, self.y, player.x, player.y);
  }
  
  
  //ADD TO ENITITY RENDER
  var super_move = self.move;
  self.move = function(){
    super_move();
    bulletArray.forEach(function(obj) {
      var isColliding = testCollisionEntity(self,obj);
      if(isColliding){
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
      var item = new Item(itemIndex, itemsList[i].title, itemsList[i].type, itemsList[i].description, itemsList[i].spread, itemsList[i].ammo, self.x, self.y, itemsList[i].rateOfFire, itemsList[i].img,itemsList[i].power);
      itemArray[itemIndex] = item;
    }
    delete enemyArray[self.id];
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
    height: obj.grid.length*obj.tsize
  }
  self.img.src = obj.imgSrc;
  
  self.isPositionWall = function(pt){
    var gridX = Math.floor(pt.x / self.tsize);
    var gridY = Math.floor(pt.y / self.tsize);
    
    if(gridX < 0 || gridX >= self.grid[0].length){
      return true;
    }
    
    if(gridY < 0 || gridY >= self.grid.length){
      return true;
    }
    
    return self.grid[gridY][gridX];
  }
  
  self.draw = function(){
    var x = width/2 - player.x;
    var y = height/2 - player.y;
    drawImage(self.img,x,y,self.img.width,self.img.height,0,1,0,0)
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
      delete bulletArray[self.id];
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
    Item(self.weaponIndex, "Pistol", "weapon", "Basic weapon", 1, 99999999, 0, 0, 30, "grey", 3));
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
      var filtered = itemArray.filter(Boolean);
      itemArray = filtered;
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
        delete particleArray[self.id];
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


var currentMap = new Maps({
  id: "town",
  tsize: mapset.tsize,
  grid: mapset.tarray,
  imgSrc: "img/map-test-alt.png"
});

var player = Player();
var stickLeft = new JoyStick({
  canvas: context.canvas,
  position: "left",
  action: "move"
});
var stickRight = new JoyStick({
  canvas: context.canvas,
  position: "right",
  action: "shoot"
});


window.onload = function () {
    loadImages();
}


