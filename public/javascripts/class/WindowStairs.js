class WindowStairs extends WindowMain {
  constructor(canvas, x, y, width, height, image) {
    super(canvas);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  view(number) {
    // フレーム
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);

    // 選択中の色
    this.context.fillStyle = "grey";
    if (number == 0){
      this.context.fillRect(this.x + 490, this.y + 21, 60, 20);
    }else if (number == 1) {
      this.context.fillRect(this.x + 490, this.y + 55, 60, 20);
    }

    // 文字
    this.context.font = "24px normal";
    this.context.fillStyle = "white";
    this.context.fillText("降りますか？", this.x + 40, this.y + 40);

    this.context.font = "20px normal";
    this.context.fillText("はい", this.x + 500, this.y + 40);
    this.context.fillText("いいえ", this.x + 500, this.y + 70);
  }
}
