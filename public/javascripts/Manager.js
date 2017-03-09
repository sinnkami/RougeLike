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

    this.send;

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

    this.cananimation.restore();
    setTimeout(() => {
      this.stopInterval();
      $.ajax({
       type: "POST",
       url: "/score",
       data: {
         name: this.game.player.status.name,
         score: this.game.player.point,
         level: this.game.player.status.level,
         hp: this.game.player.status.maxhp,
         attack: this.game.player.status.attack,
         defense: this.game.player.status.defense
       },
       success: (result) => {
         this.send = true;
         console.log(result);
       },
       error: (err) => {
         this.send = false;
         console.log(err);
       }
     });
        setInterval(() => {
          this.gameoverDraw();
        }, 1000/this.FPS);
    }, 500);
  }

  gameoverDraw() {
    var context = this.canui;
    var image = this.game.image.window;
    context.drawImage(image, 180, 60, 300, 300);

    context.font = "20px normal";
    context.fillStyle = "white";
    context.textAlign = "start";
    context.fillText(`${this.game.player.status.name}のスコア`, 210, 100, 250);
    context.fillText(`${this.game.player.point} Point`, 210, 130, 250);
    context.fillText(`体力 : ${this.game.player.status.maxhp}`, 210, 200);
    context.fillText(`攻撃力 : ${this.game.player.status.attack}`, 190, 220);
    context.fillText(`防御力 : ${this.game.player.status.defense}`, 190, 240);
    if (this.send == true){
      context.fillText("スコアが送信されました", 190, 280);
    }else if (this.send == false) {
      context.fillText("スコアが送信されませんでした", 190, 280);
    }else {
      context.fillText("少々お待ちください", 190, 280);
    }
  }
}
