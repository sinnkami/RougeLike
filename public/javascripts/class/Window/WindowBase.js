class WindowBase {
  constructor(item, map, logs, header, menu, quit, status, stairs, miniMap) {
    this.item = item;
    this.map = map;
    this.logs = logs;
    this.statusBar = header;
    this.menu = menu;
    this.quit = quit;
    this.status = status;
    this.stairs = stairs;
    this.miniMap = miniMap;

    this.x = 0;
    this.y = 0;
  }

  translate(x, y) {
    this.x -= x;
    this.y -= y;
  }
}
