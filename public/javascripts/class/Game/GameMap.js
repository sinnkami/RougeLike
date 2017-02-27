class GameMap {
  constructor(width, height) {
    if ( width === undefined) this.width  = 32;
    if (height === undefined) this.height = 32;

    this.number = {
        road: 0,
        wall: 1,
      player: 5,
      stairs: 9,
      enemy: -10
    }
  }

  init() {
    this.data = [];
    for (var y = 0; y < this.height; y++){
      this.data.push(new Array(this.width));
      for (var x = 0; x < this.data[y].length; x++){
        this.data[y][x] = null;
      }
    }
  }

  create() {
    this.init();

    new ROT.Map.Rogue(this.width, this.height, {
      cellWidth: 1+Math.ceil(Math.random()*2),
      cellHeight: 1+Math.ceil(Math.random()*2),
      roomWidth: [5, 10],
      roomHeight: [5, 10]
    }).create((x, y, type) => {
      this.data[y][x] = type;
    });

    this.setPlayer();
    this.setStairs();
    for (var i = 0; i < /*Math.ceil(Math.random() * 4)*/1; i++){
      GameManager.game.enemes.push(this.setEnemy());
    }
    return;
  }

  setPlayer() {
    loop: for (var y = 1; y < this.data.length; y++){
      for (var x = 1; x < this.data.length; x++){
        if ( // 周囲のマスが道の時の判定 + 乱数
          this.data[y-1][x-1] == this.number.road && this.data[y-1][x] == this.number.road && this.data[y-1][x+1] == this.number.road &&
          this.data[y][x-1] == this.number.road && this.data[y][x] == this.number.road && this.data[y][x+1] == this.number.road &&
          this.data[y+1][x-1] == this.number.road && this.data[y+1][x] == this.number.road && this.data[y+1][x+1] == this.number.road &&
          Math.floor(Math.random() * 100) == 0
        ) {
          GameManager.window.map.move(-(x*32)+GameManager.game.player.x, -(y*32)+GameManager.game.player.y);
          this.data[y][x] = this.number.player;
          return;
          break loop;
        }
      }
    }

    return this.setPlayer();
  }

  setEnemy() {
    loop: for (var y = 1; y < this.data.length; y++){
      for (var x = 1; x < this.data.length; x++){
        if ( // 周囲のマスが道の時の判定 + 乱数
          this.data[y-1][x-1] == this.number.road && this.data[y-1][x] == this.number.road && this.data[y-1][x+1] == this.number.road &&
          this.data[y][x-1] == this.number.road && this.data[y][x] == this.number.road && this.data[y][x+1] == this.number.road &&
          this.data[y+1][x-1] == this.number.road && this.data[y+1][x] == this.number.road && this.data[y+1][x+1] == this.number.road &&
          Math.floor(Math.random() * 100) == 0
        ) {
          this.data[y][x] = this.number.enemy;
          var enemy = new GameEnemy();
          enemy.init(this.number.enemy);

          this.number.enemy--;
          return enemy;
          break loop;
        }
      }
    }

    return this.setEnemy();
  }

  setStairs() {
    loop: for (var y = this.data.length-1; y > 0; y--){
      for (var x = this.data.length-1; x > 0; x--){
        if ( // 周囲のマスが道の時の判定 + 乱数
          this.data[y-1][x-1] == this.number.road && this.data[y-1][x] == this.number.road && this.data[y-1][x+1] == this.number.road &&
          this.data[y][x-1] == this.number.road && this.data[y][x] == this.number.road && this.data[y][x+1] == this.number.road &&
          this.data[y+1][x-1] == this.number.road && this.data[y+1][x] == this.number.road && this.data[y+1][x+1] == this.number.road &&
          Math.floor(Math.random() * 100) == 0
        ) {
          this.data[y][x] = this.number.stairs;
          return;
          break loop;
        }
      }
    }

    return this.setStairs();
  }

  canMove(x, y, position){
    if (this.data[position[1] + y][position[0] + x] == this.number.stairs){
      return [true, this.number.stairs + this.number.player, this.number.road];
    }
    if (this.data[position[1]][position[0]] == this.number.stairs + this.number.player && (x || y)){
      return [true, this.number.player, this.number.stairs];
    }
    if (this.data[position[1] + y][position[0] + x] == this.number.road){
      return [true, this.number.player, this.number.road];
    }

    return [false];
  }

  canMoveEnemy(x, y, position, number){
    if (this.data[position[1] + y][position[0] + x] == this.number.stairs){
      return [true, this.number.stairs + number, this.number.road];
    }
    if (this.data[position[1]][position[0]] == this.number.stairs + number && (x || y)){
      return [true, number, this.number.stairs];
    }
    if (this.data[position[1] + y][position[0] + x] == this.number.road){
      return [true, number, this.number.road];
    }

    return false;
  }
}
