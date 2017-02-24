class GamePlayer {
  init() {
    this.x = 320;
    this.y = 256;

    this.direction = {
      x: 1,
      y: 0
    };

    this.status = {
      level: 1,
      nextLevel: 10,
      exp: 0,
      untilNowExp: 0,
      hp: 100,
      maxhp: 100,
    }

    this.money = 100;
  }

  move(x, y, number){
    var map = GameManager.game.map.data;
    var position = this.isPosition();
    this.turnDirection();
    map[position[1] + y][position[0] + x] = number[0];
    map[position[1]][position[0]] = number[1];
  }

  moveAnime(x, y) {
    this.direction.x += 0.5;

    if (this.direction.x > 2){
      this.direction.x = 0;
    }
    if (!x && !y){
      this.direction.x = 1;
    }
  }

  turnDirection() {
    var key = GameManager.game.key.input;

    if (key.up)   { this.direction.y = 3; }
    if (key.down) { this.direction.y = 0; }
    if (key.right){ this.direction.y = 2; }
    if (key.left) { this.direction.y = 1; }
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
