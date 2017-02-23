class GameBase {
  constructor(image, player, enemy, key, item, map, sound) {
    this.play = false;

    this.image = image;

    this.player = player;
    this.enemes = [];

    this.enemy = enemy;
    this.key = key;
    this.item = item;
    this.map = map;
    this.sound = sound;
  }
}
