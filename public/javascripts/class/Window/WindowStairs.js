class WindowStairs {
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

  draw() {
    var canui = GameManager.canui;

    // フレーム
    canui.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (this.position == 0){
      canui.fillStyle = "grey"
      canui.fillRect(this.x + 505, this.y+25, 50, 20);
    }else if (this.position == 1) {
      canui.fillStyle = "grey"
      canui.fillRect(this.x + 500, this.y+55, 60, 20);
    }

    // 階段のテキスト
    canui.fillStyle = "white"
    canui.font = "40px normal";
    canui.fillText("階段を登りますか？", this.x+20, this.y+60);

    canui.font = "20px normal";
    canui.textAlign = "center";
    canui.fillText("はい", this.x + 530, this.y+40);
    canui.fillText("いいえ", this.x + 530, this.y+70);
    canui.textAlign = "start";
  }
}
