class GamePlayer {
  init() {
    this.x = 320;
    this.y = 256;

    this.image = GameManager.game.image.player;

    this.direction = {
      x: 1,
      y: 0
    };

    this.status = {
      name: "プレイヤー",
      level: 1,
      nextLevel: 10,
      exp: 0,
      untilNowExp: 0,
      hp: 100,
      maxhp: 100,
      attack: 1,
      defense: 0
    }

    this.street = false;

    this.money = 100;
  }

  dead() {
    if (this.status.hp <= 0){
      return true;
    }else {
      return false;
    }
  }

  move(x, y, number){
    var map = GameManager.game.map.data;
    var position = this.isPosition();
    this.isStreet(position[0], position[1], map);
    map[position[1] + y][position[0] + x] = number[0];
    map[position[1]][position[0]] = number[1];
    GameManager.game.miniMap.data[position[1] + y][position[0] + x] = GameManager.game.map.number.road;

  }

  isStreet(px, py, map) {
    var number = GameManager.game.map.number;
    var front = this.inFront();
    if ((front[0] && map[py-1][px+front[0]] == number.wall && map[py][px+front[0]] == number.road && map[py+1][px+front[0]] == number.wall)
     || (front[1] && map[py+front[1]][px-1] == number.wall && map[py+front[1]][px] == number.road && map[py+front[1]][px+1] == number.wall)
    ){
      this.street = true;
    }
    if ((front[0] && map[py-1][px+front[0]] == number.road && map[py][px+front[0]] == number.road && map[py+1][px+front[0]] == number.road)
     || (front[1] && map[py+front[1]][px-1] == number.road && map[py+front[1]][px] == number.road && map[py+front[1]][px+1] == number.road)
    ){
      this.street = false;
    }
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

    throw new Error("playerがいません！？")
  }

  inFront() {
    var x = 0, y = 0;
    if (this.direction.y == 0){
      y = 1;
    }else if (this.direction.y == 1){
      x = -1;
    }else if (this.direction.y == 2){
      x = 1;
    }else if (this.direction.y == 3){
      y = -1;
    }

    return [x, y]
  }

  canAttack() {
    var map = GameManager.game.map.data;
    var position = this.isPosition();

    var result = this.inFront();
    var x = result[0];
    var y = result[1];

    if (map[position[1] + y][position[0] + x] < 0){
      return map[position[1] + y][position[0] + x];
    }

    return false;
  }
}
