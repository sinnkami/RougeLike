class Manager {
  constructor(canvas, context, game, scene, sprite, window) {
    this.game = game;
    this.canvas = canvas;
    this.context = context;
    this.scene = scene;
    this.sprite = sprite;
    this.window = window;

    this.FPS = 30;
  }


  start() {
    this.game.play = true;
    setInterval(function () {
      
    }, 1000/this.FPS);
  }
}
