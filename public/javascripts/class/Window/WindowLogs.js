class WindowLogs {
  constructor() {
    this.position = 0;
    this.x;
    this.y;
    this.width;
    this.height;
  }

  init() {
    this.x = GameManager.window.x;
    this.y = GameManager.window.y + 380;
    this.width = GameManager.canvas.width;
    this.height = 100;

    this.image = GameManager.game.image.window;
  }

  latestDraw() {
    var context = GameManager.context;
    var logs = GameManager.game.logs.latest;

    // フレーム
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    // logの表示
    context.fillStyle = "white";
    context.font = "24px normal";
    context.textAlign = "start";
    var y = 30;
    for (var i = 0; i < logs.length; i++){
      context.fillText(logs[i], this.x+30, this.y+y+y*i, this.width-50);
    }
  }
}
