class SceneMove {
  init() {
    this.key = GameManager.game.key.input;

    this.move = false;
  }

  event() {

    var x = 0, y = 0;
    var enemes = GameManager.game.enemes;
    var player = GameManager.game.player;

    if (this.key.shift){
      player.turnDirection();
      GameManager.window.map.shift();
      return;
    }

    if (this.key.up) { x += 0; y += -1; }
    if (this.key.down) { x += 0; y += 1; }
    if (this.key.right) { x += 1; y += 0; }
    if (this.key.left) { x += -1; y += 0; }

    var canMove = GameManager.game.map.canMove(x, y, player.isPosition());
    player.moveAnime(x, y);
    player.turnDirection();

    for (var i = 0; i < enemes.length; i++){
      enemes[i].moveAnime(x, y);
    }
    if (canMove[0] && !this.move){
      player.move(x, y, [canMove[1], canMove[2]]);
      for (var i = 0; i < enemes.length; i++){
        enemes[i].move();
      }
      this.moveAnime(x, y);
    }
  }

  moveAnime(x, y){
    if (this.move){
      return;
    }
    this.move = true;
    var count = 0;
    var self = setInterval(() => {
      if (x || y){
        GameManager.window.map.move(-x, -y);
      }
      for (var i = 0; i < GameManager.game.enemes.length; i++){
        GameManager.game.enemes[i].x += GameManager.game.enemes[i].moveX;
        GameManager.game.enemes[i].y += GameManager.game.enemes[i].moveY;
      }
      count++;
      if (count == 32){
        this.move = false;
        clearInterval(self);
      }
    }, 2);
  }
}
