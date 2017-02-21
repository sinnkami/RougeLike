class SpritePlayer {
  init() {
    this.image = GameManager.game.image.player;
    this.direction = GameManager.game.player.direction;
    this.x = GameManager.game.player.x;
    this.y = GameManager.game.player.y;
  }

  draw() {
    GameManager.context.drawImage(this.image, 32*Math.floor(this.direction.x), 32*this.direction.y, 32, 32, GameManager.window.x + this.x, GameManager.window.y + this.y, 32, 32);
  }
}
