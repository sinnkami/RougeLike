class GameEnemy {
  init(number) {
    this.number = number;
    this.direction = {
      x: 1,
      y: 0
    };

    this.image = GameManager.game.image.enemy();
  }

  move(){
    var map = GameManager.game.map.data;
    var position = this.isPosition();
    var x = 0, y = 0;
    var number;

    if (this.direction.y == 0) { // した
           if (number = this.downMove())  { y =  1; }
      else if (number = this.rightMove()) { x =  1; }
      else if (number = this.leftMove())  { x = -1; }
      else if (number = this.upMove())    { y = -1; }
    }else if (this.direction.y == 1) { // 左
           if (number = this.leftMove())  { x = -1; }
      else if (number = this.downMove())  { y =  1; }
      else if (number = this.upMove())    { y = -1; }
      else if (number = this.rightMove()) { x =  1; }
    }else if (this.direction.y == 2) { // 右
           if (number = this.rightMove()) { x =  1; }
      else if (number = this.upMove())    { y = -1; }
      else if (number = this.downMove())  { y =  1; }
      else if (number = this.leftMove())  { x = -1; }
    }else if (this.direction.y == 3) { // 上
           if (number = this.upMove())    { y = -1; }
      else if (number = this.leftMove())  { x = -1; }
      else if (number = this.rightMove()) { x =  1; }
      else if (number = this.downMove())  { y =  1; }
    }

    map[position[1] + y][position[0] + x] = number[1];
    map[position[1]][position[0]] = number[2];
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
  }
}
