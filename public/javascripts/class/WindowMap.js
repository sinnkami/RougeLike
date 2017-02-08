class WindowMap extends WindowMain {
  constructor(canvas, mapChip) {
    super(canvas);

    this.mapChip = mapChip; // { image: マップチップの画像, width: チップの横幅, height: チップの縦幅 }

    this.width = Math.floor(this.canvasWidth / this.mapChip.width)
    this.height = Math.floor(this.canvasHeight / this.mapChip.height)
  }

  views(mapData, chipX, chipY) {
    var x = -mapData.length/2;
    var y = -mapData[0].length/2;
    var mapX = 0;
    var mapY = 0;

    while (y < mapData.length/2) {
      while (x < mapData[0].length/2) {
        if (mapData[mapY][mapX] == 0){
          this.context.drawImage(
            this.mapChip.image, this.mapChip.width*chipX, this.mapChip.height*chipY, this.mapChip.width, this.mapChip.height,
            this.mapChip.width*x, this.mapChip.height*y, this.mapChip.width, this.mapChip.height
          )
        }else {
          this.context.drawImage(
            this.mapChip.image, this.mapChip.width*0, this.mapChip.height*0, this.mapChip.width, this.mapChip.height,
            this.mapChip.width*x, this.mapChip.height*y, this.mapChip.width, this.mapChip.height
          )
        }
        x++;
        mapX++;
      }
      x = -mapData.length/2
      mapX = 0;
      y++;
      mapY++;
    }
  }
}


// this.context.drawImage(
//   this.mapChip.image, this.mapChip.width*chipX, this.mapChip.height*chipY, this.mapChip.width, this.mapChip.height,
//   this.mapChip.width*x, this.mapChip.height*y, this.mapChip.width, this.mapChip.height
// )
