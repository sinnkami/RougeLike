class SceneItem {
  init() {
    console.log(GameManager);
  }

  get(i) {
    var player = GameManager.game.player;
    var item = GameManager.game.map.items.splice(i, 1)[0];
    player.personalEffects.push(item);
    GameManager.game.logs.push(`${item.name}を手に入れた`);
  }
}
