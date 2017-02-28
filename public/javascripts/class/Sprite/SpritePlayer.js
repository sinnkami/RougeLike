class SpritePlayer {
  draw() {
    var player = GameManager.game.player;
    GameManager.context.drawImage(player.image, 32*Math.floor(player.direction.x), 32*player.direction.y, 32, 32, GameManager.window.x + player.x, GameManager.window.y + player.y, 32, 32);
  }
}
