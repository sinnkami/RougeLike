var image = [new Image(), new Image()];

image[0].src = "/images/map_chip.png";
image[1].src = "/images/player.png";

$(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const $window = $(window);

  var window_map = new WindowMap(canvas, { image: image[0], width: 32, height: 32 });
  var game_map = new GameMap(32, 32);
  var map = game_map.create();
  var game_key = new GameKey();
  window_map.context.translate(window_map.canvasWidth/2, window_map.canvasHeight/2);
  loop: for (var i = 0; i < map.length; i++){
    for (var j = 0; j < map[i].length; j++){
      if (map[i][j] == 0){
        var x = (map[i].length/2 - j)*32;
        var y = (map.length/2 - i)*32;

        window_map.context.translate(x, y)
        map[i][j] = 9;

        break loop
       }
    }
  }
  x = -x;
  y = -y;
  var player = new Player(x, y, 32, 32, image[1]);

  var age = 0;
  var key;

  setInterval(function () {
    age++;

    window_map.init()
    window_map.views(map, 0, 1);
    key = game_key.keyEvent($window);

    if (game_map.move(9, key, player)){
      window_map.translate(key);
    }
    player.views(context);
  }, 1000/30);
})
