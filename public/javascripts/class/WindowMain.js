class WindowMain {
  constructor(canvas) {
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = canvas.getContext("2d");
  }

  init() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
