class GameMap {
  constructor(width, height) {
    if ( width === undefined) this.width  = 32;
    if (height === undefined) this.height = 32;
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
  }
}
