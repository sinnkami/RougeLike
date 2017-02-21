class SceneMove {
  init() {
    this.key = GameManager.game.key.input;

    this.age = 0;
  }

  event() {
    var x = 0, y = 0;
    var player = GameManager.game.player;

    if (this.key.up) { x += 0; y += -1; }
    if (this.key.down) { x += 0; y += 1; }
    if (this.key.right) { x += 1; y += 0; }
    if (this.key.left) { x += -1; y += 0; }

    this.age++;

    var canMove = GameManager.game.map.canMove(x, y, player.isPosition());
    player.moveAnime(x, y);
    if (canMove[0] && this.age % 2 == 0){
      this.moveAnime(x, y);
      player.move(x, y, [canMove[1], canMove[2]]);
    }
  }

  moveAnime(x, y){
    var count = 0;
    var self = setInterval(() => {
      GameManager.window.map.move(-x, -y);
      count++;
      if (count == 32){ clearInterval(self); }
    }, 2);
  }
}
