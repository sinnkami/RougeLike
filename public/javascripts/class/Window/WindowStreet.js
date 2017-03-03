class WindowStreet {
  init() {
    this.width = GameManager.canvas.width;
    this.height = GameManager.canvas.height;

    this.x = GameManager.game.player.x;
    this.y = GameManager.game.player.y;
  }

  clear() {
    GameManager.cananimation.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    var context = GameManager.cananimation;
    this.clear();
    context.globalAlpha = 0.7;
    context.globalCompositeOperation = "source-over";
    context.fillRect(0, 0, this.width, this.height);
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(this.x+15, this.y+15, 50, 0, 180, false);
    context.fill();
  }
}
