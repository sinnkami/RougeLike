class GameEnemy {
  init(number) {
    this.number = number;
    this.direction = {
      x: 1,
      y: 0
    };

    this.status = {
      exp: 0,
      hp: 100,
      maxhp: 100,
      attack: 1,
      defense: 0
    }

    this.image = GameManager.game.image.enemy();

    var position = this.isPosition();
    this.x = position[0]*32;
    this.y = position[1]*32;

    this.moveX = 0;
    this.moveY = 0;

    this.search = 3;
  }

  move(){
    var map = GameManager.game.map.data;
    var position = this.isPosition();
    var x = 0, y = 0;
    var number;

    var result = this.playerNearby(map, position);
    if (result) {
      x = result[0];
      y = result[1];

      if (Math.abs(x) <= Math.abs(y)) {
        x = 0;
        y = Math.sign(y);
      }else {
        x = Math.sign(x);
        y = 0;
      }

      number = GameManager.game.map.canMoveEnemy(x, y, position, this.number);
      if (x < 0){
        this.direction.y = 1;
      }else if (x > 0){
        this.direction.y = 2;
      }else if (y < 0) {
        this.direction.y = 3;
      }else if (y > 0) {
        this.direction.y = 0;
      }

      if (!number[0]){
        x = 0;
        y = 0;
      }
    }else if (this.direction.y == 0) { // した
      if (map[position[1]+1][position[0]] == 0 && map[position[1]][position[0]+1] == 0 && map[position[1]][position[0]-1] == 0 && map[position[1]-1][position[0]] == 0 && Math.floor(Math.random() * 3) == 0){
        if (map[position[1]+1][position[0+1]] == 1){
          if (number = this.leftMove()) { x = -1; }
        }else if (map[position[1]+1][position[0-1]] == 1){
          if (number = this.rightMove()) { x = 1; }
        }else {
          return this.move();
        }
      }
      else if (number = this.downMove())  { y =  1; }
      else if (number = this.rightMove()) { x =  1; }
      else if (number = this.leftMove())  { x = -1; }
      else if (number = this.upMove())    { y = -1; }
    }else if (this.direction.y == 1) { // 左
      if (map[position[1]+1][position[0]] == 0 && map[position[1]][position[0]+1] == 0 && map[position[1]][position[0]-1] == 0 && map[position[1]-1][position[0]] == 0 && Math.floor(Math.random() * 3) == 0){
        if (map[position[1]-1][position[0]-1] == 1){
          if (number = this.upMove()) { y = -1; }
        }else if (map[position[1]+1][position[0]-1] == 1){
          if (number = this.downMove()) { y = 1; }
        }else {
          return this.move();
        }
      }
      else if (number = this.leftMove())  { x = -1; }
      else if (number = this.downMove())  { y =  1; }
      else if (number = this.upMove())    { y = -1; }
      else if (number = this.rightMove()) { x =  1; }
    }else if (this.direction.y == 2) { // 右
      if (map[position[1]+1][position[0]] == 0 && map[position[1]][position[0]+1] == 0 && map[position[1]][position[0]-1] == 0 && map[position[1]-1][position[0]] == 0 && Math.floor(Math.random() * 3) == 0){
        if (map[position[1]+1][position[0]+1] == 1){
          if (number = this.downMove()) { y = 1; }
        }else if (map[position[1]-1][position[0]+1] == 1){
          if (number = this.upMove()) { y = -1; }
        }else {
          return this.move();
        }
      }
      else if (number = this.rightMove()) { x =  1; }
      else if (number = this.upMove())    { y = -1; }
      else if (number = this.downMove())  { y =  1; }
      else if (number = this.leftMove())  { x = -1; }
    }else if (this.direction.y == 3) { // 上
      if (map[position[1]+1][position[0]] == 0 && map[position[1]][position[0]+1] == 0 && map[position[1]][position[0]-1] == 0 && map[position[1]-1][position[0]] == 0 && Math.floor(Math.random() * 3) == 0){
        if (map[position[1]-1][position[0]+1] == 1){
          if (number = this.rightMove()) { x = 1; }
        }else if (map[position[1]-1][position[0]-1] == 1){
          if (number = this.leftMove()) { x = -1; }
        }else {
          return this.move();
        }
      }
      else if (number = this.upMove())    { y = -1; }
      else if (number = this.leftMove())  { x = -1; }
      else if (number = this.rightMove()) { x =  1; }
      else if (number = this.downMove())  { y =  1; }
    }

    this.x = position[0]*32;
    this.y = position[1]*32;

    this.moveX = x;
    this.moveY = y;

    if (number[1] == undefined || number[2] == undefined){
      return;
    }
    map[position[1] + y][position[0] + x] = number[1];
    map[position[1]][position[0]] = number[2];
  }

  playerNearby(map, position) {
    var number = GameManager.game.map.number.player;
    loop: for (var y = -3; y <= this.search; y++){
      for (var x = -3; x <= this.search; x++){
        try {
          if (map[position[1] + y][position[0] + x] == number){
            return [x, y];
            break loop;
          }
        } catch (e) {
        }
      }
    }

    return false;
  }

  downMove() {
    var result;
    if (result = GameManager.game.map.canMoveEnemy(0, 1, this.isPosition(), this.number)) { this.direction.y = 0; return result; }
    return false;
  }

  upMove() {
    var result;
    if (result = GameManager.game.map.canMoveEnemy(0, -1, this.isPosition(), this.number)) { this.direction.y = 3; return result; }
    return false;
  }

  rightMove() {
    var result;
    if (result = GameManager.game.map.canMoveEnemy(1, 0, this.isPosition(), this.number)) { this.direction.y = 2; return result; }
    return false;
  }

  leftMove() {
    var result;
    if (result = GameManager.game.map.canMoveEnemy(-1, 0, this.isPosition(), this.number)) { this.direction.y = 1; return result; }
    return false;
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

  isPosition() {
    var map = GameManager.game.map.data;
    var enemy = this.number;
    var stairs = GameManager.game.map.number.stairs;

    loop: for (var y = 0; y < map.length; y++){
      for (var x = 0; x < map[y].length; x++){
        if (map[y][x] == enemy || map[y][x] == enemy + stairs) {
          return [x, y];
          break loop;
        }
      }
    }

    throw new Error("対象のエネミーがいない！？")
  }

  towardsPlayer() {
    var Pposition = GameManager.game.player.isPosition();
    var Eposition = this.isPosition();

    var x = Pposition[0] - Eposition[0];
    var y = Pposition[1] - Eposition[1];

    if (x < 0){
      this.direction.y = 1;
    }else if (x > 0) {
      this.direction.y = 2;
    }else if (y < 0 ) {
      this.direction.y = 3;
    }else if (y > 0) {
      this.direction.y = 0;
    }

    return [Math.sign(x), Math.sign(y)];
  }

  canAttack() {
    var map = GameManager.game.map.data;
    var position = this.isPosition();

    loop: for (var y = -1; y <= 1; y++){
      for (var x = -1; x <= 1; x++){
        if (map[position[1] + y][position[0] + x] == GameManager.game.map.number.player || map[position[1] + y][position[0] + x] == GameManager.game.map.number.player + GameManager.game.map.number.stairs) {
          return true;
          break loop;
        }
      }
    }

    return false;
  }
}
