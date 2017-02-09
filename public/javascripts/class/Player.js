class Player {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;

    this.direction = {
      x: 1,
      y: 0
    }

    this.status = {
      hp: 100
    }
  }

  views(context) {
    context.drawImage(
      this.image, 32*this.direction.x, 32*this.direction.y, this.width, this.height,
      this.x, this.y, this.width, this.height
    )
  }

  isDirection(key){
    if (key.down) {
      this.direction.y = 0;
    }else if (key.up) {
      this.direction.y = 3;
    }else if (key.right){
      this.direction.y = 2;
    }else if (key.left) {
      this.direction.y = 1;
    }
  }

  isAnimation(x, y) {
    if (!x && !y){ this.direction.x = 1; return; }

    if (this.direction.x == 0){
      this.direction.x += 1;
    }else if (this.direction.x == 1) {
      this.direction.x += 1;
    }else if (this.direction.x == 2) {
      this.direction.x = 0;
    }
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}
