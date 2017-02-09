class WindowMain {
  constructor(canvas) {
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = canvas.getContext("2d");
  }

  init() {
    this.context.clearRect(-Math.pow(this.canvasWidth, 3), -Math.pow(this.canvasHeight, 3), Math.pow(this.canvasWidth, 3), Math.pow(this.canvasHeight, 3));
  }

  translate(key) {
    var count = 32;

    if (key.up){
      var self = setInterval(() => {
        this.context.translate(0, 1);
        count--;
        if (count == 0){ clearInterval(self); }
      },2);
    }else if (key.down) {
      var self = setInterval(() => {
        this.context.translate(0, -1);
        count--;
        if (count == 0){ clearInterval(self); }
      },2);
    }else if (key.right) {
      var self = setInterval(() => {
        this.context.translate(-1, 0);
        count--;
        if (count == 0){ clearInterval(self); }
      },2);
    }else if (key.left) {
      var self = setInterval(() => {
        this.context.translate(1, 0);
        count--;
        if (count == 0){ clearInterval(self); }
      },2);
    }
  }
}
