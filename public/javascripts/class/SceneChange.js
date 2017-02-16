class SceneChange {
  constructor() {
    this.scene = false;
    this.processing = false;
    this.animation = false;
  }

  isStairs(map, number) {
    for (var y = 0; y < map.length; y++){
      for (var x = 0; x < map[y].length; x++){
        if (map[y][x] == number){
          return true;
        }
      }
    }
    return false;
  }

  confirmation(fps, context, key, game_map, window_map, window_stairs, map, player) {
    this.scene = true;
    key.enter = false;
    var number = 0;

    var self = setInterval(() => {
      if (key.up){
        key.up = false;
        number--;
        if (number < 0){
          number = 1;
        }
      }else if (key.down) {
        key.down = false;
        number++;
        if (number > 1){
          number = 0;
        }
      }else if (key.enter) {
        if (number == 1){
          this.scene = false;
          key.enter = false;
          clearInterval(self);
        }else {
          key.enter = false;
          this.processing = true;
          this.animation = true;
          clearInterval(self);
        }
      }
      window_stairs.view(number);
    }, 1000/fps);
  }

  areaChange(context, game_map, window_map) {

    this.scene = false;

    window_map.init();
    context.setTransform(1,0,0,1,0,0);

    var map = game_map.create();
    game_map.hierarchy += 1;
    context.translate(window_map.canvasWidth/2, window_map.canvasHeight/2);

    var position = game_map.setPlayer(map);
    game_map.setStairs(map);
    context.translate(position[0], position[1]);
    var x = -position[0];
    var y = -position[1];

    var player = new Player(x, y, 32, 32, image[1], game_map.playerNumber);

    return [player, map]
  }

  areaChangeAnimation(context, canvas, text, player) {
    this.scene = false;
    canvas.style.backgroundColor = "white";
    context.clearRect(-1000, -1000, 10000, 10000);
    context.beginPath();
    var i = 100;
    var self = setInterval(() => {
      this.changeDisplayColor(canvas, i);
      i--;
      if (i < 0){
        this.textInAnimation(canvas, context, text, 0, player);
        clearInterval(self);
      }
    }, 10);
  }

  changeDisplayColor(canvas, colorCount) {
    canvas.style.backgroundColor = "hsl(0, 0%, " + colorCount + "%)";
  }
  changeDisplayGlobalAlpha(context, count) {
    context.globalAlpha = count;
  }

  textInAnimation(canvas, context, text, count, player) {
    var textOffsetY = count < 60 ? easeOutCubic(count, 30, 30, 60) : 60;
    context.clearRect(-1000, -1000, 10000, 10000);
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "40px normal";
    context.fillText(text, player.x+5, (player.y-50)+textOffsetY);
    if (count <= 100){
      setTimeout(() => {
        return this.textInAnimation(canvas, context, text, count+1, player);
      }, 10);
    }else {
      return this.textOutAnimation(canvas, context, text, count, player)
    }
  }

  textOutAnimation(canvas, context, text, count, player) {
    var textOffsetY = count < 60 ? easeOutCubic(count, 30, 30, 60) : 60;
    context.clearRect(-1000, -1000, 10000, 10000);
    context.textAlign = "center";
    context.fillStyle = "hsl(0, 0%, " + count + "%)";
    context.font = "40px normal";
    context.fillText(text, player.x+5, (player.y-50)+textOffsetY);
    if (count >= 0){
      setTimeout(() => {
        return this.textOutAnimation(canvas, context, text, count-1, player);
      }, 10);
    }else {
      var i = 0;
      context.globalAlpha = 0.0;
      canvas.style.backgroundColor = "black";

      this.animation = false;

      var self = setInterval(() => {
        this.changeDisplayGlobalAlpha(context, i/100);
        i++;
        if (i > 100){
          clearInterval(self);
        }
      }, 5);
    }
  }
}

//==============================
//■イージング関数
//  t: 0→dの範囲で時間
//  b: 0の時の値
//  c: dの時のbとの差
//  from http://gizma.com/easing/
//==============================
function easeOutCubic(t, b, c, d){
  t /= d;
  t--;
  return c*(t*t*t + 1) + b;
}
