class SpritePlayer {
  init() {
    console.log(GameManager);
  }

  draw() {
    var player = GameManager.game.player;
    GameManager.context.fillStyle = "red";
    GameManager.context.fillRect(GameManager.window.x + player.x, GameManager.window.y + player.y, 32, 32);
    GameManager.context.fillStyle = "black";
  }
}
