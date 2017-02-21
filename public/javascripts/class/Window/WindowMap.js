class WindowMap {
  init() {
    this.image = GameManager.game.image.chip;

    this.road = {
      x: 0,
      y: 1
    }
    this.stairs = {
      x: 0,
      y: 2
    }
  }

  draw() {
    var map = GameManager.game.map;
    var number = GameManager.game.map.number;
    GameManager.context.clearRect(GameManager.window.x, GameManager.window.y, GameManager.canvas.width, GameManager.canvas.height);
    for (var y = 0; y < map.data.length; y++){
      for (var x = 0; x < map.data[y].length; x++){
        if (map.data[y][x] != number.wall){
          GameManager.context.drawImage(this.image, this.road.x*32, this.road.y*32, 32, 32, x*32, y*32, 32, 32);
        }
        if (map.data[y][x] == number.stairs || map.data[y][x] == number.stairs + number.player) {
          GameManager.context.drawImage(this.image, this.stairs.x*32, this.stairs.y*32, 32, 32, x*32, y*32, 32, 32);
        }
      }
    }
  }

  move(x, y) {
    GameManager.window.translate(x, y);
    GameManager.context.translate(x, y);
  }
}
