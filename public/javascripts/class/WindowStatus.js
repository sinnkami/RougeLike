class WindowStatus extends WindowMain {
  constructor(canvas) {
    super(canvas);
  }

  view(player, hierarchy) {
    this.context.font = "30px normal";
    this.context.textAlign = "end";
    this.context.fillStyle = "#00baff";
    this.context.fillText(`${hierarchy}F`, player.x-245, player.y-190);

    this.context.textAlign = "start";
    this.context.fillText(`HP`, player.x-150, player.y-190);
    this.context.fillStyle = "#ffffff";
    this.context.fillText(`${player.status.HP}/${player.status.maxHP}`, player.x-100, player.y-190);

    this.context.textAlign = "end";
    this.context.fillText(`${player.money}`, player.x+260, player.y-190);
    this.context.fillStyle = "#00baff";
    this.context.fillText(`G`, player.x+280, player.y-190);

    this.context.textAlign = "start";
  }
}
