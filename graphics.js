function drawImage(image, x, y, w, h, r, scale, sx, sy){
  context.save();
  context.translate(x + w / 2, y + h / 2);
  context.rotate(r * Math.PI / 180);
  context.drawImage(image, sx, sy, w, h,
                      -w / 2, -h / 2, w*scale, h*scale);
  context.rotate(-r * Math.PI / 180);
  context.translate((-x) - w / 2, (-y) - h / 2);
  context.restore();
} 

function fillRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}


function fillCircle(centerX, centerY, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fill();
}

function drawArc(centerX, centerY, radius, startAngle, endAngle, anticlockwise, lineColor, fillColor) {
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

function drawBitmapCenteredWithRotation(useBitmap,x,y,angle,scaleX,scaleY){
console.log(useBitmap.width);
  context.save();
  context.translate(x,y);
  context.rotate(angle);
  context.scale(scaleX,scaleY);
  context.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
  context.restore();
}