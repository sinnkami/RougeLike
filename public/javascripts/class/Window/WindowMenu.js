class WindowMenu {
  init() {
    this.x = 40;
    this.y = 70;

    this.width = 150;
    this.height = 80;

    this.image = GameManager.game.image.window;

    this.position = {
      x: 0,
      y: 0,
    };

    this.lastPosition = {
      x: false,
      y: 0,
    }
  }

  mapClear() {
    GameManager.canui.clearRect(this.x + 130, this.y, GameManager.game.map.width*10 + 20, GameManager.game.map.height*10 + 20);
  }

  itemClear() {
    GameManager.canui.clearRect(this.x + 150, this.y + 20, 300, 400);
  }

  draw() {
    var context = GameManager.canui;

    // フレーム
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    context.fillStyle = "grey";
    if (this.position.x == 0 && this.position.y == 0){
      context.fillRect(this.x+2, this.y+5, 67, 25);
    }else if (this.position.x == 1 && this.position.y == 0) {
      context.fillRect(this.x+77, this.y+5, 67, 25);
    }else if (this.position.x == 0 && this.position.y == 1) {
      context.fillRect(this.x+2, this.y+40, 67, 25);
    }else if (this.position.x == 1 && this.position.y == 1) {
      context.fillRect(this.x+77, this.y+40, 67, 25);
    }

    // メニューコマンド
    context.fillStyle = "white";
    context.textAlign = "start";
    context.font = "20px normal";

    context.fillText("持ち物", this.x+5, this.y+25);
    context.fillText("マップ", this.x+80, this.y+25);
    context.fillText("調べる", this.x+5, this.y+60);
    context.fillText("終わる", this.x+80, this.y+60);
  }

  mapDraw() {
    var wx = this.x + 130;
    var wy = this.y;

    var context = GameManager.canui;

    context.fillStyle = "orange";
    context.fillRect(wx, wy, GameManager.game.map.width*10 + 20, GameManager.game.map.height*10 + 20);

    if (!GameManager.game.miniMap.invalidation){
      var map = GameManager.game.miniMap.data;
      var number = GameManager.game.map.number;

      for (var y = 0; y < map.length; y++){
        for (var x = 0; x < map[y].length; x++){
          if (map[y][x] == number.road) {
            context.fillStyle = "green";
            context.fillRect(10+wx+(x*10), 10+wy+(y*10), 10, 10);
          }
        }
      }
    }
  }

  itemDraw() {
    var context = GameManager.canui;
    var items = GameManager.game.player.personalEffects;

    var x = this.x + 150;
    var y = this.y + 20;

    // フレーム
    context.fillStyle = "orange";
    context.fillRect(x, y, 300, 235);
    context.fillStyle = "yellow";
    context.fillRect(x, y+235, 300, 70);

    // アイテムの画像と名前
    context.font = "17px normal";
    context.textAlign = "start";
    if (items.length != 0){

      context.fillStyle = "grey";
      context.fillRect(x+(150*this.position.x) + 20, y+(22*this.position.y)+8, 120, 17);

      for (var i = 0; i < items.length; i += 2){
        context.fillStyle = "red";
        context.fillRect(x + 3, y+(22*(i/2))+8, 17, 17);
        context.fillStyle = "white";
        context.fillText(items[i].name, x + 20, y+(i/2+1)*22, 120);
        if (items[i+1]){
          context.fillStyle = "red";
          context.fillRect(x + 153, y+(22*(i/2))+8, 17, 17);
          context.fillStyle = "white";
          context.fillText(items[i+1].name, x + 170, y+(i/2+1)*22, 120);
        }
      }
    }else {
      context.font = "20px normal";
      context.fillStyle = "white";
      context.fillText("何も持っていない", x + 20, y + 22);
    }

  }
}
