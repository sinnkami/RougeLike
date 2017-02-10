class GameMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.hierarchy = 0;

    this.playerNumber = 9;
    this.shiftNumber = 2;
    this.wallNumber = 1;
    this.roadNumber = 0;
    this.stairsNumber = 3;

    this.map = [];
    for (var y = 0; y < this.height; y++){
      this.map.push([]);
      for (var x = 0; x < this.width; x++){
        this.map[y].push(this.roadNumber);
      }
    }
  }

  create() {
    new ROT.Map.Rogue(this.width, this.height, {
      cellWidth: 1+Math.ceil(Math.random()*2),
      cellHeight: 1+Math.ceil(Math.random()*2),
      roomWidth: [5, 10],
      roomHeight: [5, 10]
    }).create((x, y, type) => {
      this.map[y][x] = type;
    });

    return this.map;
  }

  move(number, key, actor) {
    var x = 0, y = 0;
    if (key.up) { y = -1; }
    else if (key.down) { y = 1; }
    else if (key.right) { x = 1; }
    else if (key.left) { x = -1; }


    if (number == this.playerNumber){
      loop: for (var i = 0; i < this.map.length; i++){
        for (var j = 0; j < this.map[i].length; j++){
          if (this.map[i][j] == this.stairsNumber + this.playerNumber && this.map[i+y][j+x] == this.roadNumber){
            this.map[i][j] = this.stairsNumber;
            this.map[i+y][j+x] = this.playerNumber;

            var count = 32;

            var self = setInterval(() => {
              actor.move(x, y, key);
              count--;
              if (count == 0){ clearInterval(self); }
            }, 2)
            break loop;
          }else if (this.map[i][j] == this.playerNumber && this.map[i+y][j+x] == this.stairsNumber){
            this.map[i][j] = this.roadNumber;
            this.map[i+y][j+x] = this.stairsNumber + this.playerNumber;

            var count = 32;

            var self = setInterval(() => {
              actor.move(x, y, key);
              count--;
              if (count == 0){ clearInterval(self); }
            }, 2)
            break loop;
          }else if (this.map[i][j] == this.playerNumber && this.map[i+y][j+x] != this.wallNumber){
            this.map[i][j] = this.roadNumber;
            this.map[i+y][j+x] = this.playerNumber;

            var count = 32;

            var self = setInterval(() => {
              actor.move(x, y, key);
              count--;
              if (count == 0){ clearInterval(self); }
            }, 2)
            break loop;
          }
        }
      }
    }

    actor.isDirection(key);
    actor.isAnimation(x,y);

    if (count){ return true; }
    return false;
  }

  setPlayer(map) {
    loop: for (var i = 0; i < map.length; i++){
      for (var j = 0; j < map[i].length; j++){
        if (map[i][j] == 0 && map[i+1][j] == 0 && map[i-1][j] == 0 && map[i][j+1] == 0 && map[i][j-1] == 0
          && Math.floor(Math.random() * 100) == 0){
          var x = (map[i].length/2 - j)*32;
          var y = (map.length/2 - i)*32;
          map[i][j] = 9;
          return [x,y];
          break loop;
         }
      }
    }

    return this.setPlayer(map);
  }

  setStairs(map) {
    loop: for (var y = map.length-1; y > 0; y--){
      for (var x = map[y].length-1; x > 0; x--){
        if (map[y][x] == this.roadNumber && map[y+1][x] == this.roadNumber && map[y-1][x] == this.roadNumber && map[y][x+1] == this.roadNumber && map[y][x-1] == this.roadNumber && map[y][x] != this.playerNumber
        && Math.floor(Math.random() * 100) == 0){
          map[y][x] = this.stairsNumber;
          return;
          break loop;
        }
      }
    }

    return this.setStairs(map);
  }
}
