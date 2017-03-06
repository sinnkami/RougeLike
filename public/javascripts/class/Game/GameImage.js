class GameImage {
  init() {
    this.chip = new Image();
    this.chip.src = "/images/chip.png";

    this.window = new Image();
    this.window.src = "/images/window.png";

    this.player = new Image();
    this.player.src = "/images/charcter/player.png";

    this.enemes = [new Image()];
    this.enemes[0].src = "/images/charcter/enemy1.png";

    this.item = [];
    for (var i = 0; i < 1; i++){
      this.item.push(new Image());
    }

    this.item[0].src = "/images/items/0.png";
  }

  enemy() {
    var rand = Math.floor(Math.random() * this.enemes.length);
    return this.enemes[rand];
  }
}
