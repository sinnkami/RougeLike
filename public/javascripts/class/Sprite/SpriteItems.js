class SpriteItems {
  init() {
    console.log(GameManager);
  }

  draw(item) {
    GameManager.canmain.fillStyle = "blue";
    GameManager.canmain.fillRect(32*item.position[0], 32*item.position[1], 32, 32);
    // GameManager.canmain.drawImage(item.image, 32*item.position.x, 32*item.position.y, 32, 32);
  }
}
