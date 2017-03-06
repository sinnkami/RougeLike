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
    console.log(player.personalEffects, i);
    if (item.effect == "recovering"){ result = this.recovering(player, item); }
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
    var abdicate = player.personalEffects.splice(i, 1);
    abdicate[0].position = position;
    itemMap.push(abdicate[0]);
    return false;
  }
}
