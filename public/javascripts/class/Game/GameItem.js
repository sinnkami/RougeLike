class GameItem {
  init() {
    this.category = 3;
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

    this.weapon = [
      {
        name: "テスト用武器",
        effect: "weapon",
        data: [10, false],
        canUse: Infinity,
        description: "テスト用の武器1号",
        image: GameManager.game.image.item[2],
        position: [0, 0],
      }
    ]

    this.protector = [
      {
        name: "テスト用防具",
        effect: "protector",
        data: [10, false],
        canUse: Infinity,
        description: "テスト用の防具1号",
        image: GameManager.game.image.item[3],
        position: [0, 0],
      }
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
    }else if (rand == 2) {
      rand = Math.floor(Math.random() * this.weapon.length);

      var item = $.extend(true, {}, this.weapon[rand]);
      item.position[0] = x;
      item.position[1] = y;
      item.name += x+y
      item.description += x+y
      return item
    }else if (rand == 3) {
      rand = Math.floor(Math.random() * this.protector.length);

      var item = $.extend(true, {}, this.protector[rand]);
      item.position[0] = x;
      item.position[1] = y;
      item.name += x+y
      item.description += x+y
      return item
    }
  }
}
