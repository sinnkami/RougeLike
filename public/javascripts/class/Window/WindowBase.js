class WindowBase {
  constructor(item, map, log, header, menu, quit, status, stairs) {
    this.item = item;
    this.map = map;
    this.log = log;
    this.header = header;
    this.menu = menu;
    this.quit = quit;
    this.status = status;
    this.stairs = stairs;

    this.x = 0;
    this.y = 0;
  }

  translate(x, y) {
    this.x -= x;
    this.y -= y;
  }
}
