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
      sub: {
        y: 0
      },
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
    GameManager.canui.clearRect(this.x + 150, this.y + 20, 300, 300);
  }

  itemSubClear() {
    GameManager.canui.clearRect(this.x + 450, this.y + 20, 70, 50);
  }

  logsClear() {
    GameManager.canui.clearRect(this.x + 130, this.y, 340, 340);
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
      context.fillRect(this.x+77, this.y+40, 47, 25);
    }

    // メニューコマンド
    context.fillStyle = "white";
    context.textAlign = "start";
    context.font = "20px normal";

    context.fillText("持ち物", this.x+5, this.y+25);
    context.fillText("マップ", this.x+80, this.y+25);
    context.fillText("調べる", this.x+5, this.y+60);
    context.fillText("ログ", this.x+80, this.y+60);
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
    context.drawImage(this.image, x, y, 300, 235);
    context.drawImage(this.image, x, y+235, 300, 70);

    // アイテムの画像と名前
    context.font = "17px normal";
    context.textAlign = "start";
    if (items.length != 0){

      context.fillStyle = "grey";
      context.fillRect(x+(150*this.position.x) + 20, y+(22*this.position.y)+8, 120, 17);

      for (var i = 0; i < items.length; i += 2){
        context.drawImage(items[i].image, x + 3, y+(22*(i/2))+8, 17, 17);
        context.fillStyle = "white";
        context.fillText(items[i].name, x + 20, y+(i/2+1)*22, 120);
        if (items[i].data[1]){
          context.font = "14px normal";
          context.fillText("E", x + 13, y+(22*(i/2))+25);
          context.font = "17px normal";
        }
        if (items[i+1]){
          context.drawImage(items[i+1].image, x + 153, y+(22*(i/2))+8, 17, 17);
          context.fillStyle = "white";
          context.fillText(items[i+1].name, x + 170, y+(i/2+1)*22, 120);
          if (items[i+1].data[1]){
            context.font = "14px normal";
            context.fillText("E", x + 165, y+(22*(i/2))+25);
            context.font = "17px normal";
          }
        }
      }

      context.fillStyle = "white";
      context.font = "20px normal";
      context.fillText(items[2*(this.position.y)+this.position.x].description, x + 3, y + 270, 294);
    }else {
      context.font = "20px normal";
      context.fillStyle = "white";
      context.fillText("何も持っていない", x + 20, y + 22);
    }
  }

  itemSubDraw() {
    var context = GameManager.canui;
    var items = GameManager.game.player.personalEffects;

    var x = this.x + 450;
    var y = this.y + 20;

    // フレーム
    context.fillStyle = "skyblue";
    context.drawImage(this.image, x, y, 70, 50);

    if (this.position.sub.y == 0){
      context.fillStyle = "grey";
      context.fillRect(x+3, y+3, 40, 20);
    }else if (this.position.sub.y == 1){
      context.fillStyle = "grey";
      context.fillRect(x+3, y+24, 60, 20);
    }

    context.font = "18px normal";
    context.fillStyle = "white";
    context.fillText("使う", x+5, y+20);
    context.fillText("捨てる", x+5, y+40);
  }

  logsDraw() {
    var context = GameManager.canui;
    var logs = GameManager.game.logs.all;

    var x = this.x + 130;
    var y = this.y;

    context.drawImage(this.image, x, y, 340, 340);
    context.textAlign = "start";
    context.font = "16px normal";
    for (var i = 0; i < 20; i++){
      if (logs[i+this.position.sub.y]) {
        context.fillText(logs[i+this.position.sub.y], x+5, y+(16*i)+21, 330);
      }else {
        break;
      }
    }
  }

  statusDraw() {
    var context = GameManager.canui;
    var player = GameManager.game.player;

    var x = 10;
    var y = 340;

    context.drawImage(this.image, x, y, GameManager.canvas.width-20, 130);

    context.fillStyle = "white";
    context.textAlign = "start";

    context.font = "30px normal";
    context.fillText(`[ダンジョン]  ${GameManager.game.hierarchy}${GameManager.window.statusBar.expression}`, x+20, y+30);

    context.fillText(`現在のポイント : ${player.point}P`, x+20, y+70, 425);

    context.font = "20px normal";
    if (player.weapon){
      var weapon = player.weapon.data[0];
      context.fillText(`武器 : ${player.weapon.name}`, x+20, y+100);
    }else {
      var weapon = 0;
      context.fillText(`武器 : なし`, x+20, y+100);
    }

    if (player.protector){
      var protector = player.protector.data[0];
      context.fillText(`防具 : ${player.protector.name}`, x+20, y+125, 425);
    }else {
      var protector = 0;
      context.fillText(`防具 : なし`, x+20, y+125, 425);
    }

    // ステータス
    context.font = "20px normal";
    context.fillText(`体力 : ${player.status.hp}/${player.status.maxhp}`, x+470, y+40);
    context.fillText(`攻撃力 : ${player.status.attack + weapon}`, x+450, y+60);
    context.fillText(`防御力 : ${player.status.defense + protector}`, x+450, y+80);
    context.fillText(`満腹度 : ${player.status.stomach}%`, x+450, y+100);
  }
}
