class GameBase {
  constructor(image, player, enemy, key, item, map, sound, miniMap) {
    this.play = false;

    this.image = image;

    this.hierarchy = 0;

    this.unitOfCurrency = "G";

    this.largestDamage = 255;

    this.player = player;
    this.enemes = [];

    this.key = key;
    this.item = item;
    this.map = map;
    this.miniMap = miniMap;
    this.sound = sound;
  }

  enemy(number) {
    if (!number){
      return false;
    }
    for (var i = 0; i < this.enemes.length; i++){
      if (this.enemes[i].number == number) {
        return this.enemes[i];
      }
    }

    return false;
  }
}
