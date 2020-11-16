function JoyStick(obj) {
  var self = {};
  self.touching = false;
  self.moving = false;
  self.id = null;
  self.x = 0;
  self.y = 0;
  self.originX = 0;
  self.originY = 0;
  self.canvas = obj.canvas;
  self.position = obj.position;
  self.action = obj.action;
  self.shooting = false;
  self.innerSkin = obj.innerSkin != undefined ? obj.innerSkin : null;
  self.outerSkin = obj.outerSkin != undefined ? obj.outerSkin : null;
  
  self.canvasPosition = {
    x: self.canvas.getBoundingClientRect().left,
    y: self.canvas.getBoundingClientRect().top,
    w: self.canvas.getBoundingClientRect().width
  };

  self.reset = function (x, y) {
      self.originX = x;
      self.originY = y;
      self.x = self.originX;
      self.y = self.originY;
  }
  
  self.drawJoystickOrigin = function () {
      self.drawArc(self.originX-20, self.originY-40, 40, 0, 360, false, "rgba(0,0,0,0)", "rgba(255,255,255,0.2)");
  }
  
  self.update = function () {
      self.drawJoystickOrigin();
      self.drawArc(self.x-20, self.y-40, 50, 0, 360, false, "rgba(255,255,255,0.2)", "rgba(0,0,0,0)");
  }
  
  self.canvas.addEventListener('touchmove', function (e) {

    if(e.touches.length > 1){
  
      touchX = e.touches[0].pageX - self.canvasPosition.x;
      touchY = e.touches[0].pageY - self.canvasPosition.y;
      touchX_2 = e.touches[1].pageX - self.canvasPosition.x;
      touchY_2 = e.touches[1].pageY - self.canvasPosition.y;
      
      id = e.touches[0].identifier;
      if(self.id == id){
        self.moving = true;
        self.x = touchX;
        self.y = touchY;
      }else{
        self.moving = false;
        self.x = touchX_2;
        self.y = touchY_2;
      }
      
    }else{

      touchX = e.touches[0].pageX - self.canvasPosition.x;
      touchY = e.touches[0].pageY - self.canvasPosition.y;
      id = e.touches[0].identifier;
      if(self.id == id){
        self.moving = true;
        self.x = touchX;
        self.y = touchY;
      }else{
        self.moving = false;
      }

    }

    e.preventDefault();
  });


  self.canvas.addEventListener('touchstart', function (e) {
    
    if(e.touches.length > 1){
      touchX = e.touches[1].pageX - self.canvasPosition.x;
      touchY = e.touches[1].pageY - self.canvasPosition.y;  
  
      if(touchX < self.canvasPosition.w/2 && self.position === "left"){
        if(self.action === "shoot"){
          self.shooting = true;
        }
        self.touching = true;
        self.moving = false;
        self.originX = touchX;
        self.originY = touchY;
        self.x = touchX;
        self.y = touchY;
        self.id = e.touches[1].identifier;
      }else if(touchX > self.canvasPosition.w/2 && self.position === "right"){
        if(self.action === "shoot"){
          self.shooting = true;
        }
        self.touching = true;
        self.moving = false;
        self.originX = touchX;
        self.originY = touchY;
        self.x = touchX;
        self.y = touchY;
        self.id = e.touches[1].identifier;
      }
  
    }else{
  
      touchX = e.touches[0].pageX - self.canvasPosition.x;
      touchY = e.touches[0].pageY - self.canvasPosition.y;

      if(touchX < self.canvasPosition.w/2 && self.position === "left"){
        
        if(self.action === "shoot"){
        self.shooting = true;
        }
        self.touching = true;
        self.moving = false;
        self.originX = touchX;
        self.originY = touchY;
        self.x = touchX;
        self.y = touchY;
        self.id = e.touches[0].identifier;
        
      }else if(touchX > self.canvasPosition.w/2 && self.position === "right"){
        
        if(self.action === "shoot"){
        self.shooting = true;
        }
        self.touching = true;
        self.moving = false;
        self.originX = touchX;
        self.originY = touchY;
        self.x = touchX;
        self.y = touchY;
        self.id = e.touches[0].identifier;
        
      }
  
    }
    //console.log(stickRight.touchId);
    e.preventDefault();
  });



  self.canvas.addEventListener('touchend', function (e) {
  
    id = e.changedTouches[0].identifier;
    if(self.id == id){
      if(self.action == "shoot"){
        shooting = false;
      } 
      self.touching = false;
      self.moving = false;
      self.shooting = false;
      self.x = self.originX;
      self.y = self.originY;
    }
    e.preventDefault();
  });



  self.canvas.addEventListener('mousedown', function (e) {
    touchX = e.pageX - self.canvasPosition.x;
    touchY = e.pageY - self.canvasPosition.y;
    self.x = touchX;
    self.y = touchY;
    e.preventDefault();
  });



  self.canvas.addEventListener('mouseup', function (e) {
    self.x = self.originX;
    self.y = self.originY;
    e.preventDefault();
  });
  
  self.drawArc = function(centerX, centerY, radius, startAngle, endAngle, anticlockwise, lineColor, fillColor) {
    var startAngle = startAngle * (Math.PI/180);
    var endAngle = endAngle * (Math.PI/180);
    context.strokeStyle = lineColor;
    context.fillStyle = fillColor;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
    context.fill();
    context.stroke();
  }
  
  return self;
}
    