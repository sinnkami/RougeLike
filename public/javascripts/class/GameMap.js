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
}
