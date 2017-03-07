class WindowStatusBar {
  constructor() {
    this.x;
    this.y;
    this.width;
    this.height;

    this.expression = "階";
  }

  init() {
    this.x = 30;
    this.y = 40;
    this.width = GameManager.canvas.width;
    this.height = 50;
  }

  draw() {
    this.init();

    var player = GameManager.game.player;
    var hierarchy = GameManager.game.hierarchy;

    var canui = GameManager.canui;

    canui.textAlign = "right";
    canui.font = "34px normal";
    canui.fillStyle = "white";
    canui.fillText(hierarchy, this.x + 35, this.y);
    canui.fillStyle = "dodgerblue";
    canui.textAlign = "start";
    canui.fillText(this.expression, this.x + 40, this.y);

    canui.font = "25px normal";
    canui.fillText("HP", this.x + 260, this.y-10);
    canui.fillText("/", this.x + 350, this.y-10);
    canui.fillStyle = "white";
    canui.textAlign = "right";
    canui.fillText(player.status.hp, this.x + 345, this.y-10);
    canui.textAlign = "left";
    canui.fillText(player.status.maxhp, this.x + 365, this.y-10);
    canui.textAlign = "start";

    canui.fillStyle = "red";
    canui.fillRect(this.x + 260, this.y, 150, 10);
    var percentageHP = player.status.maxhp / 150;
    var hp = player.status.hp / percentageHP;
    canui.fillStyle = "chartreuse";
    canui.fillRect(this.x + 410, this.y, -hp, 10);
    canui.strokeStyle = "gainsboro";
    canui.strokeRect(this.x + 260, this.y, 150, 10);

    canui.fillStyle = "dodgerblue";
    canui.fillText("Lv", this.x + 120, this.y-5);
    canui.fillStyle = "white";
    canui.fillText(player.status.level, this.x + 150, this.y-5);

    canui.fillStyle = "gainsboro";
    canui.fillRect(this.x + 120, this.y, 70, 5);
    var percentageLevel = 70 / player.status.nextLevel;
    var nextLevel = player.status.exp * percentageLevel;
    canui.fillStyle = "gold";
    canui.fillRect(this.x + 120, this.y, nextLevel, 5);

    canui.font = "34px normal";
    canui.fillStyle = "dodgerblue";
    canui.fillText(GameManager.game.unitOfCurrency, this.x + 580, this.y);
    canui.textAlign = "right";
    canui.fillStyle = "white";
    canui.fillText(player.point, this.x + 575, this.y, 150);

  }
}
