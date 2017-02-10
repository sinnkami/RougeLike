class Player {
  constructor(x, y, width, height, image, number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;

    this.number = number; // playerのマップ上での数字

    this.direction = {
      x: 1,
      y: 0
    }

    this.money = 100000;

    this.status = {
      maxHP: 100,
      HP: 100,
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

  isMapPosition(mapData) {
    for (var y = 0; y < mapData.length; y++){
      for (var x = 0; x < mapData[y].length; x++){
        if (mapData[y][x] == this.number){
          return [x,y];
        }
      }
    }

    throw new Error("playerがいません！？")
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}
