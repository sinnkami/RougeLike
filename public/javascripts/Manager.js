class Manager {
  constructor(canvas, canmain, cananimation, canui, game, scene, sprite, window, $window) {
    this.game = game;
    this.canvas = canvas;
    this.canmain = canmain;
    this.cananimation = cananimation;
    this.canui = canui;
    this.scene = scene;
    this.sprite = sprite;
    this.window = window;

    this.$window = $window;

    this.mainInterval;
    this.menuInterval;

    this.FPS = 30;
  }


  GameStart() {
    this.game.play = true;

    this.game.image.init();

    this.game.key.init();

    this.scene.move.init();
    this.game.player.init();

    this.init();
  }

  init() {
    this.mapCreate();
    this.startInterval();
  }

  startInterval() {
    this.mainInterval = setInterval(() => {
      this.window.uiClear();
      this.window.map.draw();
      this.window.logs.init();
      this.window.logs.latestDraw();
      this.window.statusBar.draw();
      this.window.miniMap.draw();

      // デバッグ用 =begin
      if (GameManager.game.player.street){
        this.cananimation.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cananimation.globalAlpha = 0.7;
        this.cananimation.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.cananimation.globalCompositeOperation = "destination-out";
        this.cananimation.arc(this.game.player.x+15, this.game.player.y+15, 50, 0, 180, false);
        this.cananimation.fill();
        this.cananimation.globalCompositeOperation = "source-over";
      }else {
        this.cananimation.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      // =end

      this.game.key.event();
      this.scene.move.event();

      this.sprite.player.draw();
      for (var i = 0; i < this.game.enemes.length; i++){
        this.sprite.enemy.draw(this.game.enemes[i]);
      }

      if (this.scene.stairs.hereStairs() && this.game.key.input.enter){
        this.game.key.input.enter = false;
        this.scene.stairs.down();
      }else if (!this.scene.damage.execution.player && !this.scene.damage.execution.enemy && this.game.key.input.enter){
        this.game.key.input.enter = false;
        this.scene.damage.attack();
      }

    }, 1000/this.FPS);
  }

  stopInterval() {
    clearInterval(this.mainInterval);
  }

  mapCreate() {
    this.canmain.setTransform(1,0,0,1,0,0);
    this.window.x = 0;
    this.window.y = 0;

    this.game.hierarchy++;

    this.game.enemes = [];
    this.game.map.create();

    this.game.miniMap.init();
    this.game.logs.latest = [];

    this.game.logs.nonePush(`------------------------------------------------------`)
    this.game.logs.nonePush(`${this.game.hierarchy}階に到達した`)

    this.window.map.init();
    this.window.map.draw();

    this.game.miniMap.firstMapping()
  }

  wait(flag, property, true_or_false, callback){
    var self = setInterval(() => {
      if (flag[property] == true_or_false) {
        clearInterval(self);
        callback();
        return;
      }
    }, 1000/this.FPS);
  }
}
