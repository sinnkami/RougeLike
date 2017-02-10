var image = [];
for (var i = 0; i < 3; i++){
  image.push(new Image());
}

image[0].src = "/images/map_chip.png";
image[1].src = "/images/player.png";
image[2].src = "/images/window.png";

$(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const $window = $(window);

  const fps = 30;

  const game_map = new GameMap(32, 32);
  const game_key = new GameKey();

  const window_map = new WindowMap(canvas, { image: image[0], width: 32, height: 32 }, game_map);
  const window_status = new WindowStatus(canvas);
  var window_stairs;

  const scene_change = new SceneChange();

  var result = scene_change.areaChange(context, game_map, window_map);
  var map = result[1];
  player = result[0];

  var age = 0;
  var key;

  setInterval(function () {
    age++;
    key = game_key.keyEvent($window);
    if (scene_change.scene && !scene_change.processing){
      return;
    }else if (scene_change.processing) {
      result = scene_change.areaChange(context, game_map, window_map);
      map = result[1];
      player = result[0];
      scene_change.processing = false;
      scene_change.scene = false;
    }

    window_map.init();
    window_map.views(map, 0, 1);
    window_status.view(player, game_map.hierarchy);

    player.views(context);

    if (scene_change.isStairs(map, game_map.playerNumber + game_map.stairsNumber) && key.enter) {
      window_stairs = new WindowStairs(canvas, player.x-canvas.width/2, player.y+120, canvas.width, 100, image[2])
      scene_change.confirmation(fps, context, key, game_map, window_map, window_stairs, map, player);
      return
    }

    if (key.shift) {
      window_map.shift(map, player.isMapPosition(map), player.direction.y);
      player.isDirection(key);
    }else if (age % 3 == 0){
      if (game_map.move(9, key, player)){
        window_map.translate(key);
      }
    }
  }, 1000/fps);
})
