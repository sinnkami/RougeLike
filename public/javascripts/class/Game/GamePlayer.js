class GamePlayer {
  init() {
    this.x = 320;
    this.y = 256;

    this.image = GameManager.game.image.player;

    this.direction = {
      x: 1,
      y: 0
    };

    this.status = {
      name: "プレイヤー",
      level: 1,
      nextLevel: 10,
      exp: 0,
      untilNowExp: 0,
      hp: 100,
      maxhp: 100,
      attack: 2,
      defense: 0,
      stomach: 100,
      accuracy: 80,
      critical: 5
    }

    this.personalEffects = [];
    this.personalEffectsSize = 20;

    this.turnNumber = 0;

    this.street = false;

    this.money = 100;
  }

  dead() {
    if (this.status.hp <= 0){
      return true;
    }else {
      return false;
    }
  }

  turn() {
    this.turnNumber++;

    if (this.status.stomach == 0){
      this.status.hp--;
      return;
    }
    if (this.turnNumber % 10 == 0){
      this.status.stomach--;
    }

    if (this.turnNumber % 50 == 0){
      GameManager.game.enemes.push(GameManager.game.map.setEnemy());
    }

    if (this.status.stomach == 50 && this.turnNumber % 10 == 0){
      GameManager.game.logs.push("少しお腹がすいてきたようだ");
    }else if (this.status.stomach == 30 && this.turnNumber % 10 == 0){
      GameManager.game.logs.push("お腹がすいてきたようだ");
    }else if (this.status.stomach == 5 && this.turnNumber % 10 == 0){
      GameManager.game.logs.push("お腹が空きすぎて死にそうだ");
    }
  }

  move(x, y, number){
    var map = GameManager.game.map.data;
    var position = this.isPosition();
    this.isStreet(position[0], position[1], map);
    map[position[1] + y][position[0] + x] = number[0];
    map[position[1]][position[0]] = number[1];
    GameManager.game.miniMap.data[position[1] + y][position[0] + x] = GameManager.game.map.number.road;

  }

  exp(exp) {
    this.status.untilNowExp += exp;
    this.status.exp += exp;
    if (this.status.exp >= this.status.nextLevel){
      this.LvUP();
    }
  }

  LvUP() {
    this.status.exp = 0;
    this.status.nextLevel = this.status.nextLevel+this.status.nextLevel/2;
    var increase = {
      hp: Math.ceil(Math.random() * 4),
      attack: Math.floor(Math.random() * 4),
      defense: Math.floor(Math.random() * 4),
    }

    this.status.hp += increase.hp;
    this.status.maxhp += increase.hp;
    this.status.attack += increase.attack;
    this.status.defense += increase.defense;

    GameManager.game.logs.nonePush(`------------------------------------------------------`);
    GameManager.game.logs.nonePush(`DEF: ${increase.defense}`);
    GameManager.game.logs.nonePush(`ATK: ${increase.attack}`);
    GameManager.game.logs.nonePush(`HP: ${increase.hp}`);

    GameManager.game.logs.push(`${this.status.name}のレベルが上がった`);
    GameManager.game.logs.nonePush(`------------------------------------------------------`);
    this.status.level++;
  }

  isStreet(px, py, map) {
    var number = GameManager.game.map.number;
    var front = this.inFront();

    if ((front[0] && map[py-1][px+front[0]] == number.wall && map[py][px+front[0]] == number.road && map[py+1][px+front[0]] == number.wall)
     || (front[1] && map[py+front[1]][px-1] == number.wall && map[py+front[1]][px] == number.road && map[py+front[1]][px+1] == number.wall)
    ){
      this.street = true;
      GameManager.window.street.draw();
    }
    if ((front[0] && map[py-1][px+front[0]] == number.road && map[py][px+front[0]] == number.road && map[py+1][px+front[0]] == number.road)
     || (front[1] && map[py+front[1]][px-1] == number.road && map[py+front[1]][px] == number.road && map[py+front[1]][px+1] == number.road)
    ){
      this.street = false;
      GameManager.window.street.clear();
    }
  }

  moveAnime(x, y) {
    this.direction.x += 0.5;

    if (this.direction.x > 2){
      this.direction.x = 0;
    }
    if (!x && !y){
      this.direction.x = 1;
    }
  }

  turnDirection() {
    var key = GameManager.game.key.input;

    if (key.up)   { this.direction.y = 3; }
    if (key.down) { this.direction.y = 0; }
    if (key.right){ this.direction.y = 2; }
    if (key.left) { this.direction.y = 1; }
  }

  isPosition() {
    var map = GameManager.game.map.data;
    var player = GameManager.game.map.number.player;
    var stairs = GameManager.game.map.number.stairs;

    loop: for (var y = 0; y < map.length; y++){
      for (var x = 0; x < map[y].length; x++){
        if (map[y][x] == player || map[y][x] == player + stairs) {
          return [x, y];
          break loop;
        }
      }
    }

    throw new Error("playerがいません！？")
  }

  inFront() {
    var x = 0, y = 0;
    if (this.direction.y == 0){
      y = 1;
    }else if (this.direction.y == 1){
      x = -1;
    }else if (this.direction.y == 2){
      x = 1;
    }else if (this.direction.y == 3){
      y = -1;
    }

    return [x, y]
  }

  canAttack() {
    var map = GameManager.game.map.data;
    var position = this.isPosition();

    var result = this.inFront();
    var x = result[0];
    var y = result[1];

    if (map[position[1] + y][position[0] + x] < 0){
      return map[position[1] + y][position[0] + x];
    }

    return false;
  }
}
