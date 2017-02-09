class GameKey {
  constructor() {
    this.push = {
      up: false,
      down: false,
      right: false,
      left: false,
      shift: false
    }
  }

  keyEvent($window) {
    $window.keydown((event) => {
      switch (event.keyCode) {
        case 37:
          this.push.left = true;
          break;
        case 38:
          this.push.up = true;
          break;
        case 39:
          this.push.right = true;
          break;
        case 40:
          this.push.down = true;
          break;
        case 16:
          this.push.shift = true;
          break;
      }
    })
    $window.keyup((event) => {
      switch (event.keyCode) {
        case 37:
          this.push.left = false;
          break;
        case 38:
          this.push.up = false;
          break;
        case 39:
          this.push.right = false;
          break;
        case 40:
          this.push.down = false;
          break;
        case 16:
          this.push.shift = false;
          break;
      }
    })

    return this.push;
  }
}
