class SceneMenu {
  init() {
    this.menu = {
      start:true,
      item: {
        main: false,
         sub: false,
      },
      map: false,
      search: false,
      gameEnd: false,
    }

    this.interval = [];

    this.amount = -1;
    for (var i = 0; i < GameManager.game.player.personalEffects.length; i += 2){
      this.amount++;
    }

    this.evenOdd = GameManager.game.player.personalEffects.length % 2;
  }

  clear(stopEvent, stopEventSub) {
    var len = this.interval.length-1;

    clearInterval(this.interval[len]);
    this.interval.pop();
    if (stopEvent == "item"){
      if (stopEventSub){
        this.menu[stopEvent][stopEventSub] = false;
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
        window.menu.itemSubClear();
      }

      window.menu.itemClear();
      window.menu.itemDraw();
    }, 1000/GameManager.FPS-10));
  }

  itemSubInterval(itemNumber) {
    var window = GameManager.window;

    this.interval.push(setInterval(() => {
      if (this.menu.item.sub){
        this.itemSubEvent();
      }

      window.menu.itemSubClear();
      window.menu.itemSubDraw();
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
    var menu = GameManager.window.menu;
    key.event();

    if (key.input.back){
      key.input.back = false;
      this.clear("item");
      this.menu.start = true;
    }

    if (key.input.enter){
      key.input.enter = false;
      this.menu.item.main = false;
      this.menu.item.sub = true;
      this.itemSubInterval(2*(menu.position.y)+menu.position.x);
    }

    if (this.amount < 0){
      return;
    }

    if (key.input.up && menu.position.y != 0){
      key.input.up = false;
      menu.position.y--;
    }

    if (key.input.down && menu.position.y == this.amount-1 && menu.position.x == 1 && this.evenOdd == 1) {
      key.input.down = false;
      menu.position.x = 0;
      menu.position.y++;
    }else if (key.input.down && menu.position.y != this.amount){
      key.input.down = false;
      menu.position.y++;
    }

    if (key.input.right && menu.position.y != this.amount && menu.position.x == 1){
      key.input.right = false;
      menu.position.x = 0;
      menu.position.y++;
    }else if (key.input.right && menu.position.y == 0 && this.evenOdd == 0){
      key.input.right = false;
      menu.position.x = 1;
    }else if (key.input.right && menu.position.y == this.amount && this.evenOdd == 0) {
      key.input.right = false;
      menu.position.x = 1;
    }else if (key.input.right && menu.position.y != this.amount && menu.position.x == 0) {
      key.input.right = false;
      menu.position.x = 1;
    }

    if (key.input.left && menu.position.y != 0 && menu.position.x == 0){
      key.input.left = false;
      menu.position.x = 1;
      menu.position.y--;
    }else if (key.input.left && menu.position.y == 0 && menu.position.x == 1){
      key.input.left = false;
      menu.position.x = 0;
    }else if (key.input.left && menu.position.y != 0 && menu.position.x == 1){
      key.input.left = false;
      menu.position.x = 0;
    }
  }

  itemSubEvent(itemNumber) {
    var key = GameManager.game.key;
    var menu = GameManager.window.menu;
    key.event();

    if (key.input.back){
      key.input.back = false;
      this.clear("item", "sub");
      this.menu.item.main = true;
    }

    if (key.input.enter){
      key.input.enter = false;
      this.clear("item", "sub");
      this.clear("item");
      this.clear("start");
      if (menu.position.sub.y == 0){
        GameManager.scene.item.use();
      }else if (menu.position.sub.y == 1) {
        GameManager.scene.item.abdicate();
      }
    }

    if (key.input.up && menu.position.sub.y != 0){
      key.input.up = false;
      menu.position.sub.y--;
    }
    if (key.input.down && menu.position.sub.y != 1){
      key.input.down = false;
      menu.position.sub.y++;
    }
  }
}
