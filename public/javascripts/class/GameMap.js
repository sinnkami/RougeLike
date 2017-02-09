class GameMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.map = [];
    for (var y = 0; y < this.height; y++){
      this.map.push([]);
      for (var x = 0; x < this.width; x++){
        this.map[y].push(0);
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


    if (number == 9){
      loop: for (var i = 0; i < this.map.length; i++){
        for (var j = 0; j < this.map[i].length; j++){
          if (this.map[i][j] == 9 && this.map[i+y][j+x] == 0){
            this.map[i][j] = 0;
            this.map[i+y][j+x] = 9;

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
}
