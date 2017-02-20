class Manager {
  constructor(canvas, context, game, scene, sprite, window, $window) {
    this.game = game;
    this.canvas = canvas;
    this.context = context;
    this.scene = scene;
    this.sprite = sprite;
    this.window = window;

    this.$window = $window;

    this.interval;
    this.FPS = 30;
  }


  start() {
    this.game.play = true;

    this.game.key.init();
    this.scene.move.init();
    this.game.player.init();

    this.init();
  }

  init() {
    this.mapCreate();
    this.interval = setInterval(() => {
      this.window.map.draw();

      this.game.key.event();
      this.scene.move.event();

      this.sprite.player.draw();

      // デバッグ用 =begin


      // =end
    }, 1000/this.FPS);
  }

  mapCreate() {
    this.game.map.create();
    this.window.map.draw();
  }
}
