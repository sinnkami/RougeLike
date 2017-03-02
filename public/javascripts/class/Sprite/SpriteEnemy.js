class SpriteEnemy {
  init() {
    console.log(GameManager);
  }

  draw(enemy) {
    GameManager.canmain.drawImage(enemy.image, 32*Math.floor(enemy.direction.x), 32*enemy.direction.y, 32, 32, enemy.x, enemy.y, 32, 32);
  }
}
