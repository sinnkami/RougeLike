var image = new Image();

image.src = "/images/map_chip.png";

$(function () {
  const canvas = document.getElementById("canvas");
  const $window = $(window);

  var window_map = new WindowMap(canvas, { image: image, width: 32, height: 32 });
  var game_map = new GameMap(32, 32);
  var map = game_map.create();
  window_map.context.translate(window_map.canvasWidth/2, window_map.canvasHeight/2);

  var age = 0;
  var x = 0, y = 0;
  var key = {
    up:false,
    down:false,
    right:false,
    left:false
  }

  function keyEvent() {
    $window.keydown(function (event) {
      switch (event.keyCode) {
        case 37:
          key.left = true;
          break;
        case 38:
          key.up = true;
          break;
        case 39:
          key.right = true;
          break;
        case 40:
          key.down = true;
          break;
      }
    })
    $window.keyup(function (event) {
      switch (event.keyCode) {
        case 37:
          key.left = false;
          break;
        case 38:
          key.up = false;
          break;
        case 39:
          key.right = false;
          break;
        case 40:
          key.down = false;
          break;
      }
    })
  }

  setInterval(function () {
    age++;
    window_map.context.clearRect(-1000, -1000, 1000, 1000);

    window_map.views(map, 0, 1);
    keyEvent();
    if (key.up){
      y -= 32;
      window_map.context.translate(0, 32);
    }else if (key.down) {
      y += 32;
      window_map.context.translate(0, -32);
    }else if (key.right) {
      x += 32;
      window_map.context.translate(-32, 0);
    }else if (key.left) {
      x -= 32;
      window_map.context.translate(32, 0);
    }
    window_map.context.fillStyle = "red";
    window_map.context.fillRect(x, y, 32, 32);
    window_map.context.fillStyle = "black";
  }, 1000/30);
})
