class GameCharcter {
  init() {
    var power = Math.floor((GameManager.game.player.status.level)+Math.floor(Math.random() * GameManager.game.hierarchy));
    if (power < 1){
      power = 1;
    }

    this.data = [
      {
        name: "ゴブリン",
        exp: 5*power,
        hp: 10+(5*power),
        maxhp: 10+(5*power),
        attack: 1*power,
        defense: power*1,
        accuracy: 80,
        critical: power
      },
      {
        name: "ゴブリン",
        exp: 5*power,
        hp: 10+(5*power),
        maxhp: 10+(5*power),
        attack: 1*power,
        defense: power*1,
        accuracy: 80,
        critical: power
      },
    ]
  }

  enemy() {
    var rand = Math.floor(Math.random() * this.data.length);
    return this.data[rand];
  }
}
