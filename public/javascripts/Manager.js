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
    this.game.item.init();

    this.game.key.init();

    this.scene.move.init();
    this.game.player.init();

    this.window.street.init();

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
      // =end

      this.game.key.event();
      this.scene.move.event();

      for (var i = 0; i < this.game.map.items.length; i++){
        this.sprite.item.draw(this.game.map.items[i]);
      }
      this.sprite.player.draw();
      for (var i = 0; i < this.game.enemes.length; i++){
        this.sprite.enemy.draw(this.game.enemes[i]);
      }

      if (this.scene.stairs.hereStairs() && this.game.key.input.enter){
        this.game.key.input.enter = false;
        this.scene.stairs.down();
      }else if (!this.scene.damage.execution.player && !this.scene.damage.execution.enemy && this.game.key.input.enter){
        this.game.key.input.enter = false;

        var get = false;
        var position = this.game.player.isPosition();
        for (var i = 0; i < this.game.map.items.length; i++){
          if (this.game.map.items[i].position[0] == position[0] && this.game.map.items[i].position[1] == position[1]){
            this.scene.item.get(i);
            get = true;
          }
        }
        if (!get){
          this.scene.damage.attack();
        }
      }else if (this.game.key.input.back){
        this.game.key.input.back = false;
        this.scene.menu.start();
      }

      if (this.game.player.status.hp <= 0 && this.game.play){
        this.game.logs.push(`${this.game.player.status.name}は死んでしまった`);
        this.game.play = false;
        this.gameover();
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

  gameover() {
    setTimeout(() => {
      this.stopInterval();
    }, 500);
  }
}
