class WindowLogs {
  constructor() {
    this.position = 0;
    this.x;
    this.y;
    this.width;
    this.height;
  }

  init() {
    this.x = 0;
    this.y = 380;
    this.width = GameManager.canvas.width;
    this.height = 100;

    this.image = GameManager.game.image.window;
  }

  latestDraw() {
    var canui = GameManager.canui;
    var logs = GameManager.game.logs.latest;

    // フレーム
    canui.drawImage(this.image, this.x, this.y, this.width, this.height);

    // logの表示
    canui.fillStyle = "white";
    canui.font = "24px normal";
    canui.textAlign = "start";
    var y = 30;
    for (var i = 0; i < logs.length; i++){
      canui.fillText(logs[i], this.x+30, this.y+y+y*i, this.width-50);
    }
  }
}
