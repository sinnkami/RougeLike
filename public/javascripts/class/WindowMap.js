class WindowMap extends WindowMain {
  constructor(canvas, mapChip, game_map) {
    super(canvas);

    this.mapChip = mapChip; // { image: マップチップの画像, width: チップの横幅, height: チップの縦幅 }

    this.playerNumber = game_map.playerNumber;
    this.shiftNumber = game_map.shiftNumber;
    this.roadNumber = game_map.roadNumber;
    this.wallNumber = game_map.wallNumber;

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
        if (mapData[mapY][mapX] != this.wallNumber){
          this.context.drawImage(
            this.mapChip.image, this.mapChip.width*chipX, this.mapChip.height*chipY, this.mapChip.width, this.mapChip.height,
            this.mapChip.width*x, this.mapChip.height*y, this.mapChip.width, this.mapChip.height
          )
          if (mapData[mapY][mapX] == this.shiftNumber) {
            mapData[mapY][mapX] = 0;
            this.context.strokeStyle = "red";
            this.context.strokeRect(this.mapChip.width*x, this.mapChip.height*y, this.mapChip.width, this.mapChip.height);
          }
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

  shift(mapData, position, direction) {
    if (direction == 0){
      for (var i = position[1]+1; i < mapData.length; i++){
        if (mapData[i][position[0]] == this.wallNumber){
          break;
        }
        mapData[i][position[0]] = this.shiftNumber;
      }
    }else if (direction == 3) {
      for (var i = position[1]-1; i > 0; i--){
        if (mapData[i][position[0]] == this.wallNumber){
          break;
        }
        mapData[i][position[0]] = this.shiftNumber;
      }
    }else if (direction == 2) {
      for (var i = position[0]+1; i < mapData[position[1]].length; i++){
        if (mapData[position[1]][i] == this.wallNumber){
          break;
        }
        mapData[position[1]][i] = this.shiftNumber;
      }
    }else if (direction == 1) {
      for (var i = position[0]-1; i > 0; i--){
        if (mapData[position[1]][i] == this.wallNumber){
          break;
        }
        mapData[position[1]][i] = this.shiftNumber;
      }
    }
  }
}


// this.context.drawImage(
//   this.mapChip.image, this.mapChip.width*chipX, this.mapChip.height*chipY, this.mapChip.width, this.mapChip.height,
//   this.mapChip.width*x, this.mapChip.height*y, this.mapChip.width, this.mapChip.height
// )
