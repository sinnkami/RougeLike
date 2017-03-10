class GameItem {
  init() {
    this.category = 2;
    this.recovering = [
      {
        name: "テスト回復アイテム",
        effect: "recovering",
        data: [9999],
        canUse: 1,
        description: "テスト用の最強回復アイテムくん1号",
        image: GameManager.game.image.item[0],
        position: [0, 0],
      },
    ]

    this.food = [
      {
        name: "テスト食べ物",
        effect: "food",
        data: [9999],
        canUse: 1,
        description: "テスト用の最強食べ物くん1号",
        image: GameManager.game.image.item[1],
        position: [0, 0],
      },
    ]
  }

  set(x, y) {
    var rand = Math.floor(Math.random() * this.category);
    if (rand == 0){
      rand = Math.floor(Math.random() * this.recovering.length);
      // ここでアイテムのコピーを作成
      var item = $.extend(true, {}, this.recovering[rand]);
      item.position[0] = x;
      item.position[1] = y;
      item.description += x+y
      return item;
    }else if (rand == 1) {
      rand = Math.floor(Math.random() * this.food.length);

      var item = $.extend(true, {}, this.food[rand]);
      item.position[0] = x;
      item.position[1] = y;
      item.description += x+y
      return item
    }
  }
}
