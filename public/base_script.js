//Some code adapted from http://billmill.org/static/canvastutorial/index.html

//initialize all variables
var x = 140;
var y = 150; //location of ball
var dx = 2;
var dy = 4; //x and y movements
var context;
var WIDTH;
var HEIGHT;
var intervalId = 0;
var paddleHorizontal;
var paddleVert;
var paddleWidth;
var count = 0; //times the ball has been hit
rightDown = false;
leftDown = false;



window.onload = function() {

//set rightDown or leftDown on touch
function onTouchDown(evt) {
  rightDown = true; // move right
  leftDown = false;
}

//and unset them when released
function onTouchEnd(evt) {
  rightDown = false;
  leftDown = true; // move left
}



function init_paddle() {
  paddleHorizontal = WIDTH / 2;
  paddleVert = 10;
  paddleWidth = 75;
}
 
function draw() {
  clear();
  circle(x, y, 10);

  //move the paddle if left or right is currently pressed
  if (rightDown) paddleHorizontal += 5; 
  else if (leftDown) paddleHorizontal -= 5;
  rect(paddleHorizontal, HEIGHT-paddleVert, paddleWidth, paddleVert);
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx; // ball hits wall (not bottom)

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddleHorizontal && x < paddleHorizontal + paddleWidth){ //ball hits the paddle, increase count
      count++;
      $("#count").text("Count: " + count); 
      dy = -dy;
    }
    else
      clearInterval(intervalId); //ball hits bottom, game over
  }
 
  x += dx;
  y += dy;
}

 
function circle(x,y,r) { //draw the circle
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
}
 
function rect(x,y,w,h) { //draw the rectangele
  context.beginPath();
  context.rect(x,y,w,h);
  context.closePath();
  context.fill();
}
 
function clear() { //clear canvas context
  context.clearRect(0, 0, WIDTH, HEIGHT);
}
 
function init() { //set up canvas and touch events
  var canvas  = document.getElementById('main');
  var canvastop = canvas.offsetTop;
  var canvasleft = canvas.offsetLeft; 

  // HTML5 has a context 2d that allows for drawing lines, dots, etc.
  context = canvas.getContext("2d");
  intervalId = setInterval(draw, 10);
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  canvas.ontouchstart = function(event){
    onTouchDown(event)
  }

canvas.ontouchend = function(event){
    onTouchEnd(event)
  }
}


var clearButton = document.getElementById('clear');

clearButton.onclick = function(){
  location.reload();
}

init();
init_paddle();
}