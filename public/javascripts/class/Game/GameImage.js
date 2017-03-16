class GameImage {
  init() {
    this.chip = new Image();
    this.chip.src = "/images/chip.png";

    this.window = new Image();
    this.window.src = "/images/window.png";

    this.player = new Image();
    this.player.src = "/images/charcter/player.png";

    this.enemes = [new Image(), new Image(), new Image(), new Image()];
    this.enemes[0].src = "/images/charcter/enemy1.png";
    this.enemes[1].src = "/images/charcter/enemy2.png";
    this.enemes[2].src = "/images/charcter/enemy3.png";


    this.item = [];
    for (var i = 0; i < 4; i++){
      this.item.push(new Image());
      this.item[i].src = `/images/items/${i}.png`
    }
  }

  enemy(num) {
    return this.enemes[num];
  }
}
