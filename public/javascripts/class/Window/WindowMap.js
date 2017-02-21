class WindowMap {
  init() {
    console.log(GameManager);
  }

  draw() {
    var map = GameManager.game.map;
    var number = GameManager.game.map.number;
    GameManager.context.clearRect(GameManager.window.x, GameManager.window.y, GameManager.canvas.width, GameManager.canvas.height);
    for (var y = 0; y < map.data.length; y++){
      for (var x = 0; x < map.data[y].length; x++){
        if (map.data[y][x] == number.stairs || map.data[y][x] == number.stairs + number.player) {
          GameManager.context.fillStyle = "green";
          GameManager.context.fillRect(x*32, y*32, 32, 32);
          GameManager.context.fillStyle = "black";
        }else if (map.data[y][x] != number.wall){
          GameManager.context.fillRect(x*32, y*32, 32, 32);
        }
      }
    }
  }

  move(x, y) {
    GameManager.window.translate(x, y);
    GameManager.context.translate(x, y);
  }
}
