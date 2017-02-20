class WindowMap {
  init() {
    console.log(GameManager);
  }

  draw() {
    var map = GameManager.game.map;
    GameManager.context.clearRect(GameManager.window.x, GameManager.window.y, GameManager.canvas.width, GameManager.canvas.height);
    for (var y = 0; y < map.data.length; y++){
      for (var x = 0; x < map.data[y].length; x++){
        if (map.data[y][x] == 0){
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
