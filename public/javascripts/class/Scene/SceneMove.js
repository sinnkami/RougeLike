class SceneMove {
  init() {
    this.key = GameManager.game.key.input;
  }

  event() {

    console.log(this.key);
    if (this.key.up)    { this.moveAnime( 0,  1); }
    if (this.key.down)  { this.moveAnime( 0, -1); }
    if (this.key.right) { this.moveAnime(-1,  0); }
    if (this.key.left)  { this.moveAnime( 1,  0); }
  }

  moveAnime(x, y){
    var count = 0;
    var self = setInterval(() => {
      GameManager.window.map.move(x, y);
      count++;
      if (count == 32){ clearInterval(self); }
    }, 2);
  }
}
