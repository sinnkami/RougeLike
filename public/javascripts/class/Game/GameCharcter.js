class GameCharcter {
  init() {
    var power = Math.floor((GameManager.game.player.status.level)+Math.floor(Math.random() * GameManager.game.hierarchy));
    if (power < 1){
      power = 1;
    }

    this.data = [
      {
        number: 0,
        name: "ゴブリン",
        exp: 5*power,
        hp: 7+(5*power),
        maxhp: 10+(5*power),
        attack: 1*power,
        defense: power*1,
        accuracy: 80,
        critical: power
      },
      {
        number: 1,
        name: "蜂",
        exp: 7*power,
        hp: 4+(3*power),
        maxhp: 4+(3*power),
        attack: 3*power,
        defense: power*0,
        accuracy: 80,
        critical: power
      },
      {
        number: 2,
        name: "ウルフ",
        exp: 15*power,
        hp: 10+(5*power),
        maxhp: 10+(5*power),
        attack: 2*power,
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
