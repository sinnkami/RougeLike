var image = [new Image(), new Image()];

image[0].src = "/images/map_chip.png";
image[1].src = "/images/player.png";

$(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const $window = $(window);

  const fps = 30;

  const game_map = new GameMap(32, 32);
  const window_map = new WindowMap(canvas, { image: image[0], width: 32, height: 32 }, game_map);
  const game_key = new GameKey();

  var map = game_map.create();
  context.translate(window_map.canvasWidth/2, window_map.canvasHeight/2);

  var position = game_map.setPlayer(map);
  context.translate(position[0], position[1]);
  var x = -position[0];
  var y = -position[1];

  var player = new Player(x, y, 32, 32, image[1], game_map.playerNumber);

  var age = 0;
  var key;

  setInterval(function () {
    age++;

    window_map.init();
    window_map.views(map, 0, 1);

    key = game_key.keyEvent($window);
    if (key.shift) {
      window_map.shift(map, player.isMapPosition(map), player.direction.y);
      player.isDirection(key);
    }else if (game_map.move(9, key, player)){
      window_map.translate(key);
    }

    player.views(context);
  }, 1000/fps);
})
