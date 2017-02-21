class WindowStairs {
  constructor() {
    this.position = 0;
    this.x;
    this.y;
    this.width;
    this.height;
  }

  init() {
    this.x = GameManager.window.x;
    this.y = GameManager.window.y + 330;
    this.width = GameManager.canvas.width;
    this.height = 100;

    this.image = GameManager.game.image.window;
  }

  draw() {
    var context = GameManager.context;

    // フレーム
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (this.position == 0){
      context.fillStyle = "grey"
      context.fillRect(this.x + 505, this.y+25, 50, 20);
    }else if (this.position == 1) {
      context.fillStyle = "grey"
      context.fillRect(this.x + 500, this.y+55, 60, 20);
    }

    // 階段のテキスト
    context.fillStyle = "white"
    context.font = "40px normal";
    context.fillText("階段を登りますか？", this.x+20, this.y+60);

    context.font = "20px normal";
    context.textAlign = "center";
    context.fillText("はい", this.x + 530, this.y+40);
    context.fillText("いいえ", this.x + 530, this.y+70);
    context.textAlign = "start";
  }
}
