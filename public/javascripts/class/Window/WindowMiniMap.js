class WindowMiniMap {
  init() {
    console.log(GameManager);
  }

  draw() {
    if (!GameManager.game.miniMap.invalidation) {
      for (var y = 0; y < GameManager.game.miniMap.data.length; y++){
        for (var x = 0; x < GameManager.game.miniMap.data.length; x++){
          if (GameManager.game.miniMap.data[y][x] != GameManager.game.map.number.wall){
            GameManager.canui.fillStyle = "green";
            GameManager.canui.fillRect(20 + x*5, 70 + y*5, 5, 5);
          }
        }
      }
    }
  }
}
