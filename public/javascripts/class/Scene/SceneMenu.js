class SceneMenu {
  init() {
    this.menu = {
      start:true,
      item: {
        main: false,
      },
      map: false,
      search: false,
      gameEnd: false,
    }

    this.interval = [];
  }

  clear(stopEvent, stopEventSub) {
    var len = this.interval.length-1;

    clearInterval(this.interval[len]);
    this.interval.pop();
    if (stopEvent == "item"){
      if (stopEventSub){

      }else {
        this.menu[stopEvent]["main"] = false;
      }
    }else if (stopEvent == "start"){
      GameManager.startInterval();
    }else {
      this.menu[stopEvent] = false;
    }

  }

  start() {
    GameManager.stopInterval();
    this.init();
    var window = GameManager.window;

    window.menu.init();
    this.interval.push(setInterval(() => {
      if (this.menu.start){
        this.event();
        window.uiClear();
        window.menu.draw();
        window.statusBar.draw();
      }
    }, 1000/GameManager.FPS-10));
  }

  event() {
    var key = GameManager.game.key;
    var menu = GameManager.window.menu;
    key.event();

    if (key.input.back){
      key.input.back = false;
      this.clear("start");
    }

    if (key.input.up && menu.position.y != 0){
      menu.position.y -= 1;
    }else if (key.input.down && menu.position.y != 1) {
      menu.position.y += 1;
    }else if (key.input.right && menu.position.x != 1) {
      menu.position.x += 1;
    }else if (key.input.left && menu.position.x != 0) {
      menu.position.x -= 1;
    }

    if (key.input.enter){
      key.input.enter = false;
      if (menu.position.x == 0 && menu.position.y == 0) {
        this.menu.start = false;
        this.menu.item.main = true;
        this.itemInterval();
      }else if (menu.position.x == 1 && menu.position.y == 0){
        this.menu.start = false;
        this.menu.map = true;
        this.mapInterval();
      }
    }
  }

  mapInterval() {
    var window = GameManager.window;

    this.interval.push(setInterval(() => {
      if (this.menu.map){
        this.mapEvent();
      }

      window.menu.mapClear();
      window.menu.mapDraw();
    }, 1000/GameManager.FPS-10));
  }

  itemInterval() {
    var window = GameManager.window;

    this.interval.push(setInterval(() => {
      if (this.menu.item.main){
        this.itemEvent();
      }

      window.menu.itemClear();
      window.menu.itemDraw();
    }, 1000/GameManager.FPS-10));
  }

  mapEvent() {
    var key = GameManager.game.key;
    key.event();

    if (key.input.back){
      key.input.back = false;
      this.clear("map");
      this.menu.start = true;
    }
  }

  itemEvent() {
    var key = GameManager.game.key;
    key.event();

    if (key.input.back){
      key.input.back = false;
      this.clear("item");
      this.menu.start = true;
    }
  }
}
