class SceneChange {
  constructor() {
    this.scene = false;
    this.processing = false;
  }

  isStairs(map, number) {
    for (var y = 0; y < map.length; y++){
      for (var x = 0; x < map[y].length; x++){
        if (map[y][x] == number){
          return true;
        }
      }
    }
    return false;
  }

  confirmation(fps, context, key, game_map, window_map, window_stairs, map, player) {
    this.scene = true;
    key.enter = false;
    var number = 0;

    var self = setInterval(() => {
      if (key.up){
        key.up = false;
        number--;
        if (number < 0){
          number = 1;
        }
      }else if (key.down) {
        key.down = false;
        number++;
        if (number > 1){
          number = 0;
        }
      }else if (key.enter) {
        if (number == 1){
          this.scene = false;
          key.enter = false;
          clearInterval(self);
        }else {
          key.enter = false;
          this.processing = true;
          clearInterval(self);
        }
      }
      window_stairs.view(number);
    }, 1000/fps);
  }

  areaChange(context, game_map, window_map) {

    this.scene = false;

    window_map.init();
    context.setTransform(1,0,0,1,0,0);

    var map = game_map.create();
    game_map.hierarchy += 1;
    context.translate(window_map.canvasWidth/2, window_map.canvasHeight/2);

    var position = game_map.setPlayer(map);
    game_map.setStairs(map);
    context.translate(position[0], position[1]);
    var x = -position[0];
    var y = -position[1];

    var player = new Player(x, y, 32, 32, image[1], game_map.playerNumber);

    return [player, map]
  }
}
