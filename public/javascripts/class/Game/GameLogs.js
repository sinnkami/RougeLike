class GameLogs {
  constructor() {
    this.all = [];
    this.latest = [];
    this.latestNumber = 3;
  }

  push(text) {
    if (this.latest.length == this.latestNumber){
      this.latest.shift();
      this.latest.push(String(text));
    }else {
      this.latest.push(String(text));
    }

    this.all.unshift(String(text));
  }
}
