class SceneStairs {
  init() {
    console.log(GameManager);
  }

  clear() {
    clearInterval(GameManager.menuInterval);
    GameManager.startInterval();
  }

  down() {
    GameManager.stopInterval();
    GameManager.window.stairs.init();
    GameManager.menuInterval = setInterval(() => {
      GameManager.window.stairs.draw();
      this.event();
    }, 1000/GameManager.FPS-10);
  }

  hereStairs() {
    var map = GameManager.game.map;
    var position = GameManager.game.player.isPosition();
    if (map.data[position[1]][position[0]] == map.number.stairs + map.number.player){
      return true;
    }
    return false;
  }

  event() {
    var key = GameManager.game.key;

    if (key.input.up){
      key.input.up = false;
      GameManager.window.stairs.position--;
      if (GameManager.window.stairs.position < 0){
        GameManager.window.stairs.position = 1;
      }
    }else if (key.input.down) {
      key.input.down = false;
      GameManager.window.stairs.position++;
      if (GameManager.window.stairs.position > 1){
        GameManager.window.stairs.position = 0;
      }
    }

    if (key.input.enter) {
      key.input.enter = false;
      if (GameManager.window.stairs.position == 0){
        this.clear();
        return GameManager.mapCreate();
      }else {
        return this.clear();
      }
    }else if (key.input.back) {
      key.input.back = false;
      this.clear();
    }
  }
}
