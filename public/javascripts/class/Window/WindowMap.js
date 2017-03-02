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
    GameManager.canmain.clearRect(GameManager.window.x, GameManager.window.y, GameManager.canvas.width, GameManager.canvas.height);
    for (var y = 0; y < map.data.length; y++){
      for (var x = 0; x < map.data[y].length; x++){
        if (map.data[y][x] != number.wall){
          GameManager.canmain.drawImage(this.image, this.road.x*32, this.road.y*32, 32, 32, x*32, y*32, 32, 32);
        }
        if (map.data[y][x] == number.stairs || map.data[y][x] == number.stairs + number.player || (map.data[y][x] < 0 && map.data[y][x] > -10)) {
          GameManager.canmain.drawImage(this.image, this.stairs.x*32, this.stairs.y*32, 32, 32, x*32, y*32, 32, 32);
        }
      }
    }
  }

  move(x, y) {
    GameManager.window.translate(x, y);
    GameManager.canmain.translate(x, y);
  }

  shift() {
    var map = GameManager.game.map;
    for (var y = 0; y < map.data.length; y++){
      for (var x = 0; x < map.data[y].length; x++){
        if (map.data[y][x] != map.number.wall){
          GameManager.canmain.strokeStyle = "white";
          GameManager.canmain.strokeRect(x*32, y*32, 32, 32);
        }
      }
    }

    var player = GameManager.game.player;
    var position = player.isPosition();
    var direction = player.inFront();

    var x = direction[0];
    var y = direction[1];
    while (true) {
      position[0] += x;
      position[1] += y;

      if (map.data[position[1]][position[0]] == map.number.wall){ break; }

      GameManager.canmain.strokeStyle = "red";
      GameManager.canmain.strokeRect(position[0]*32, position[1]*32, 32, 32);
    }

  }
}
