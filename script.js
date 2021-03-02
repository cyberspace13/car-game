(function() {
  document.body.style.overflow = "hidden";
  document.body.style.margin = "0";

  var cvs = document.createElement("canvas");
  document.body.appendChild(cvs);

  var ctx = cvs.getContext("2d");

  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;

  var car = {
    w: 50,
    h: 100,
    trn: 10,
    spd: 10
  }

  var road = {
    x: w / 4,
    y: 0,
    w: w / 2,
    h: h
  }

  car.x = w / 2 - car.w / 2;
  car.y = h / 2 + 200;

  var keyState = {};
              
  window.addEventListener("keydown",function(e){
      keyState[e.keyCode || e.which] = true;
  },true);

  window.addEventListener("keyup",function(e){
      keyState[e.keyCode || e.which] = false;
  },true);

  var rndCars = [];

  class rndCar {
    
    constructor(x, y) {

      this.x = x;
      this.y = y;
      this.w = 50;
      this.h = 100;

      rndCars.push(this);

    }

  }

  var gameOver = false;
  var score = 0;

  function loop() {
    requestAnimationFrame(loop);

    if (!gameOver) {

      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;

      ctx.canvas.width = w;
      ctx.canvas.height = h;

      ctx.fillStyle = "#0f8000";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#000000";
      ctx.font = "30px impact";
      ctx.fillText("Score: " + score, 0, 30);

      ctx.fillStyle = "#000000";
      ctx.fillRect(road.x, road.y, road.w, road.h);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(car.x, car.y, car.w, car.h);

      for (var i = 0; i < rndCars.length; i++) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(rndCars[i].x, rndCars[i].y, rndCars[i].w, rndCars[i].h);
        rndCars[i].y += car.spd;
        
        if (car.x + car.w >= rndCars[i].x && car.x <= rndCars[i].x + rndCars[i].w && car.y + car.h >= rndCars[i].y && car.y <= rndCars[i].y + rndCars[i].h) {
          gameOver = true;
          setTimeout(function() {
            if (confirm(`
yuo ded.
score: `+(score - 1)+`
            `)) {
              window.location.href = window.location.href;
            }
          }, 1000);
        }
      }

      if (keyState[68]) {
        car.x += car.trn;
      }

      if (keyState[65]) {
        car.x -= car.trn;
      }

      if (car.x <= road.x) {
        car.x += car.trn;
      }

      if (car.x + car.w >= road.x + road.w) {
        car.x -= car.trn;
      }
    }
  }

  loop();

  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  setInterval(function() {
    if (!gameOver) {
      var c = new rndCar(rnd(road.x, road.x + road.w - 50), -100);
    }
  }, 500);

  setInterval(function() {
    score += 1;
  }, 1000);
})()