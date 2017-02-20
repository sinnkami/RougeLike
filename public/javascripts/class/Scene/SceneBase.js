class SceneBase {
  constructor(damage, item, menu, move, stairs) {
    this.scene = false;
    this.animations = false;
    this.procesing = false;

    this.damage = damage;
    this.item = item;
    this.menu = menu;
    this.move = move;
    this.stairs = stairs;
  }
}
