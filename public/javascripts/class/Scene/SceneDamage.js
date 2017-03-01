class SceneDamage {
  constructor() {
    this.execution = {
      player: false,
      enemy: false,
    }

    this.speed = 5;
  }
  init() {
    console.log(GameManager);
  }

  attack() {
    this.playerTurn();

    this.execution.enemy = true;
    GameManager.wait(this.execution, "player", false, this.enemyTurn);
  }

  playerTurn() {
    var player = GameManager.game.player;
    this.execution.player = true;
    var enemy = GameManager.game.enemy(player.canAttack());

    if (enemy) {
      var damage = this.damage(player, enemy);
      enemy.status.hp -= damage;
      if (enemy.dead()){
        GameManager.game.logs.push(`${enemy.status.name}を倒した`);
      }
    }

    var result = player.inFront();
    var x = result[0];
    var y = result[1];

    this.playerAnime(x, y, player);
  }

  playerAnime(x, y, player) {
    var count = 0;
    var self = setInterval(() => {
      if (count < 16){
        player.x += x;
        player.y += y;
      }else if (count < 32){
        player.x -= x;
        player.y -= y;
      }

      count++;
      if (count == 64){ clearInterval(self); this.execution.player = false; }
    }, this.speed);
  }

  enemyTurn() {
    var enemes = GameManager.game.enemes;
    var player = GameManager.game.player;

    var attacker = [];

    for (var i = 0; i < enemes.length; i++){
      if (enemes[i].canAttack()){
        attacker.push(enemes[i]);
      }else {
        enemes[i].move();
        GameManager.scene.move.moveAnime(x, y);
      }
    }

    for (var i = 0; i < attacker.length; i++){
      var damage = GameManager.scene.damage.damage(attacker[i], player);
      player.status.hp -= damage;

      var result = attacker[i].towardsPlayer();
      var x = result[0];
      var y = result[1];

      attacker[i].moveX = 0;
      attacker[i].moveY = 0;

      GameManager.scene.damage.enemyAnime(x, y, attacker[i]);
    }

    if (attacker.length == 0){
      GameManager.scene.damage.execution.enemy = false;
    }
  }

  enemyAnime(x, y, enemy) {
    GameManager.scene.damage.execution.enemy = true;

    var count = 0;
    var self = setInterval(() => {
      if (count < 16){
        enemy.x += x;
        enemy.y += y;
      }else if (count < 32){
        enemy.x -= x;
        enemy.y -= y;
      }
      count++;
      if (count == 32){ GameManager.scene.damage.execution.enemy = false; clearInterval(self); }
    }, GameManager.scene.damage.speed);
  }

  damage(attacker, defender) {
    var damage = attacker.status.attack - defender.status.defense;
    if (damage > GameManager.game.largestDamage) {
      damage = GameManager.game.largestDamage;
    }

    if (damage < 0){
      damage = 0;
    }

    if (damage == 0){
      GameManager.game.logs.push(`${attacker.status.name}は攻撃を外した`);
    }else {
      GameManager.game.logs.push(`${attacker.status.name}は${defender.status.name}に${damage}ダメージを与えた`)
    }

    return damage;
  }
}
