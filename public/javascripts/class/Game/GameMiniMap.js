class GameMiniMap {
  init() {
    this.data = [];
    this.map = GameManager.game.map.data;
    for (var y = 0; y < this.map.length; y++){
      this.data.push([])
      for (var x = 0; x < this.map[y].length; x++){
        this.data[y][x] = GameManager.game.map.number.wall;
      }
    }

    this.x = 0;
    this.y = 0;

    this.invalidation = false;
  }

  isEntrance() {
    var player = GameManager.game.player;
    var position = player.isPosition();
    var wall = 0;

    for (var y = -1; y <= 1; y++){
      for (var x = -1; x <= 1; x++){
        if (this.map[position[1] + y][position[0] + x] == GameManager.game.map.number.wall){
          wall++;
        }
      }
    }

    if (wall == 2){
      var direction = player.inFront();
      for (var y = -1; y <= 1; y++){
        for (var x = -1; x <= 1; x++){
          if (this.map[position[1] + direction[1] + y][position[0] + direction[0] + x] == GameManager.game.map.number.wall){
            console.log("部屋の出口");
            return
          }
        }
      }

      if (direction[0]){
        for (var y = position[1]; y >= 0; y--){
          if (this.map[y][position[0]] == GameManager.game.map.number.wall){
            y += 1;
            this.y = y;
            break;
          }
        }
        if (direction[0] < 0){
          for (var x = position[0]; x >= 0; x--){
            if (this.map[y][x] == GameManager.game.map.number.wall){
              x += 1;
              this.x = x;
              break;
            }
          }
        }else {
          this.x = position[0];
        }
      }else {
        for (var x = position[0]; x >= 0; x--){
          if (this.map[position[1]][x] == GameManager.game.map.number.wall){
            x += 1;
            this.x = x;
            break;
          }
        }
        if (direction[1] < 0){
          for (var y = position[1]; y >= 0; y--){
            if (this.map[y][x] == GameManager.game.map.number.wall){
              y += 1;
              this.y = y;
              break;
            }
          }
        }else {
          this.y = position[1];
        }
      }
      this.mapping();
      console.log("部屋の入り口");
    }
  }

  mapping() {
    for (var y = this.y; y < this.map.length; y++){
      if (this.map[y][this.x] == GameManager.game.map.number.wall){
        break;
      }
      for (var x = this.x; x < this.map[y].length; x++){
        if (this.map[y][x] == GameManager.game.map.number.wall){
          break;
        }
        this.data[y][x] = GameManager.game.map.number.road;
      }
    }
  }

  firstMapping() {
    var player = GameManager.game.player;
    var direction = player.inFront();
    var position = player.isPosition();

    for (var y = position[1]; y >= position[1]-GameManager.game.map.option.roomHeight[1]; y--){
      if (y >= 0){
        if (this.map[y][position[0]] == GameManager.game.map.number.wall){
          y += 1;
          this.y = y;
          break;
        }else {
          this.y = y;
        }
      }else {
        break;
      }
    }

    for (var x = position[0]; x >= position[0]-GameManager.game.map.option.roomWidth[1]; x--){
      if (x >= 0){
        if (this.map[position[1]][x] == GameManager.game.map.number.wall){
          x += 1;
          this.x = x;
          break;
        }else {
          this.x = x;
        }
      }else {
        break;
      }
    }

    for (var y = this.y; y < this.map.length; y++){
      if (this.map[y][this.x] == GameManager.game.map.number.wall){
        break;
      }
      for (var x = this.x; x < this.map[y].length; x++){
        if (this.map[y][x] == GameManager.game.map.number.wall){
          break;
        }
        this.data[y][x] = GameManager.game.map.number.road;
      }
    }

    for (var y = 0; y < this.data.length; y++){
      for (var x = 0; x < this.data[y].length; x++){
        if (this.data[y][x] != GameManager.game.map.number.wall){
          return;
        }
      }
    }

    GameManager.game.logs.push("特殊な磁場でマップが表示されなくなってしまった");
    this.invalidation = true;
    return
  }
}
