class GameLogs {
  constructor() {
    this.all = [];
    this.latest = [];
    this.latestNumber = 3;
    this.allNumber = 100;
  }

  push(text) {
    if (this.latest.length == this.latestNumber){
      this.latest.shift();
    }
    this.latest.push(String(text));

    if (this.all.length == this.allNumber){
      this.all.pop();
    }
    this.all.unshift(String(text));
  }

  nonePush(text) {
    if (this.all.length == this.allNumber){
      this.all.pop();
    }
    this.all.unshift(String(text));
  }
}
