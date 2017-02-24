class WindowStatusBar {
  constructor() {
    this.x;
    this.y;
    this.width;
    this.height;

    this.expression = "階";
  }

  init() {
    this.x = GameManager.window.x + 30;
    this.y = GameManager.window.y + 40;
    this.width = GameManager.canvas.width;
    this.height = 50;
  }

  draw() {
    this.init();

    var player = GameManager.game.player;
    var hierarchy = GameManager.game.hierarchy;

    var context = GameManager.context;

    context.textAlign = "start";
    context.font = "34px normal";
    context.fillStyle = "white";
    context.fillText(hierarchy, this.x + 20, this.y);
    context.fillStyle = "dodgerblue";
    context.fillText(this.expression, this.x + 40, this.y);

    context.font = "25px normal";
    context.fillText("HP", this.x + 260, this.y-10);
    context.fillText("/", this.x + 350, this.y-10);
    context.fillStyle = "white";
    context.textAlign = "right";
    context.fillText(player.status.hp, this.x + 345, this.y-10);
    context.textAlign = "left";
    context.fillText(player.status.maxhp, this.x + 365, this.y-10);
    context.textAlign = "start";

    context.fillStyle = "red";
    context.fillRect(this.x + 260, this.y, 150, 10);
    var percentageHP = player.status.maxhp / 150;
    var hp = player.status.hp / percentageHP;
    context.fillStyle = "chartreuse";
    context.fillRect(this.x + 410, this.y, -hp, 10);
    context.strokeStyle = "gainsboro";
    context.strokeRect(this.x + 260, this.y, 150, 10);

    context.fillStyle = "dodgerblue";
    context.fillText("Lv", this.x + 120, this.y-5);
    context.fillStyle = "white";
    context.fillText(player.status.level, this.x + 150, this.y-5);

    context.fillStyle = "gainsboro";
    context.fillRect(this.x + 120, this.y, 70, 5);
    var percentageLevel = 70 / player.status.nextLevel;
    var nextLevel = player.status.exp * percentageLevel;
    context.fillStyle = "gold";
    context.fillRect(this.x + 120, this.y, nextLevel, 5);

    context.font = "34px normal";
    context.fillStyle = "dodgerblue";
    context.fillText(GameManager.game.unitOfCurrency, this.x + 580, this.y);
    context.textAlign = "right";
    context.fillStyle = "white";
    context.fillText(player.money, this.x + 575, this.y);

  }
}
