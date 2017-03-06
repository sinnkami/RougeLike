class SpriteItems {
  init() {
    console.log(GameManager);
  }

  draw(item) {
    GameManager.canmain.drawImage(item.image, 32*item.position[0], 32*item.position[1], 32, 32);
  }
}
