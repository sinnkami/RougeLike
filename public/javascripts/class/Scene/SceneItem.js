class SceneItem {
  init() {
    console.log(GameManager);
  }

  get(i) {
    var player = GameManager.game.player;
    if (player.personalEffects.length == player.personalEffectsSize){
      GameManager.game.logs.push(`持ち物がいっぱいで拾えない`);
      return;
    }
    var item = GameManager.game.map.items.splice(i, 1)[0];
    player.personalEffects.push(item);
    GameManager.game.logs.push(`${item.name}を手に入れた`);
  }

  use(i) {
    var player = GameManager.game.player;
    var item = player.personalEffects[i];
    var result;
    if (item.effect == "recovering"){ result = this.recovering(player, item); }
    else if (item.effect == "food"){ result = this.food(player, item); }
    else if (item.effect == "weapon"){ result = this.weapon(player, item); }
    else if (item.effect == "protector"){ result = this.protector(player, item); }
    else { throw new Error("設定されていません！！"); }

    if (result){
      item.canUse--;
      if (item.canUse == 0){
        player.personalEffects.splice(i, 1);
      }
    }
  }

  recovering(player, item) {
    if (player.status.hp == player.status.maxhp){
      GameManager.game.logs.push("HPは満タンです");
      return false;
    }

    var recoveryAmount = player.status.maxhp - player.status.hp;

    if (recoveryAmount < item.data[0]){
      player.status.hp += recoveryAmount;
    }else {
      recoveryAmount = item.data[0];
      player.status.hp += recoveryAmount;
    }

    GameManager.game.logs.push(`HPが${recoveryAmount}ポイント回復した`);
    return true;
  }

  food(player, item){
    if (player.status.stomach == 100){
      GameManager.game.logs.push("お腹いっぱいです");
      return false;
    }

    var recoveryAmount = 100 - player.status.stomach;

    if (recoveryAmount < item.data[0]){
      player.status.stomach += recoveryAmount;
    }else {
      recoveryAmount = item.data[0];
      player.status.stomach += recoveryAmount;
    }

    GameManager.game.logs.push(`${item.name}を食べた`);
    return true;
  }

  weapon(player, item) {
    if (player.weapon == item){
      player.weapon.data[1] = false;
      player.weapon = null;
      GameManager.game.logs.push(`${item.name}を外した`);
      return true;
    }
    if (player.weapon){
      player.weapon.data[1] = false;
      item.data[1] = true;
      player.weapon = item;
    }else {
      item.data[1] = true;
      player.weapon = item;
    }

    GameManager.game.logs.push(`${item.name}を装備した`);

    return true;
  }

  protector(player, item) {
    if (player.protector == item){
      player.protector.data[1] = false;
      player.protector = null;
      GameManager.game.logs.push(`${item.name}を外した`);
      return true;
    }
    if (player.protector){
      player.protector.data[1] = false;
      item.data[1] = true;
      player.protector = item;
    }else {
      item.data[1] = true;
      player.protector = item;
    }

    GameManager.game.logs.push(`${item.name}を装備した`);

    return true;
  }

  abdicate(i) {
    var player = GameManager.game.player;
    var position = player.isPosition();
    var itemMap = GameManager.game.map.items;
    for (var j = 0; j < itemMap.length; j++){
      if (itemMap[j].position[0] == position[0] && itemMap[j].position[1] == position[1]){
        GameManager.game.logs.push("すでにアイテムが置いてあります");
        return false;
      }
    }

    GameManager.game.logs.push(`${player.personalEffects[i].name}を捨てた`);
    if (player.personalEffects[i].effect == "weapon"){
      player.weapon.data[1] = false;
      player.weapon = null;
    }else if (player.personalEffects[i].effect == "protector") {
      player.protector.data[1] = false;
      player.protector = null;
    }
    var abdicate = player.personalEffects.splice(i, 1);
    abdicate[0].position = position;
    itemMap.push(abdicate[0]);
    return false;
  }
}
