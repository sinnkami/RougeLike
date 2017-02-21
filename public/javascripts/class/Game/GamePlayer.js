class GamePlayer {
  init() {
    this.x = 320;
    this.y = 256;
  }

  move(x, y, number){
    var map = GameManager.game.map.data;
    var position = this.isPosition();
    map[position[1] + y][position[0] + x] = number[0];
    map[position[1]][position[0]] = number[1];
  }

  isPosition() {
    var map = GameManager.game.map.data;
    var player = GameManager.game.map.number.player;
    var stairs = GameManager.game.map.number.stairs;

    loop: for (var y = 0; y < map.length; y++){
      for (var x = 0; x < map[y].length; x++){
        if (map[y][x] == player || map[y][x] == player + stairs) {
          return [x, y];
          break loop;
        }
      }
    }
  }
}
