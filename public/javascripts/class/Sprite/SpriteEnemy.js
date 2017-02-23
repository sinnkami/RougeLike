class SpriteEnemy {
  init() {
    console.log(GameManager);
  }

  draw(enemy) {
    var position = enemy.isPosition();
    GameManager.context.drawImage(enemy.image, 32*Math.floor(enemy.direction.x), 32*enemy.direction.y, 32, 32, position[0]*32, position[1]*32, 32, 32);
  }
}
