class GameKey {
  init() {
    this.input = {
         up: false,
       down: false,
      right: false,
       left: false,
      enter: false,
       back: false
    }
  }

  keydown() {
    var $window = GameManager.$window;

    $window.keydown((event) => {
      switch (event.keyCode) {
        case 38: // up
          this.input.up = true;
          break;
        case 40: // down
          this.input.down = true;
          break;
        case 37: // left
          this.input.left = true;
          break;
        case 39: // right
          this.input.right = true;
          break;

        // enter
        case 13: // enter
          this.input.enter = true;
          break;
        case 32: // space
          this.input.enter = true;
          break;
        case 90: // Z
          this.input.enter = true;
          break;

        // back
        case 27: // etc
          this.input.back = true;
          break;
        case 8: //delete
          this.input.back = true;
          break;
        case 88: // X
          this.input.back = true;
          break;
      }
    })
  }

  keyup() {
    var $window = GameManager.$window;

    $window.keyup((event) => {
      switch (event.keyCode) {
        case 38: // up
          this.input.up = false;
          break;
        case 40: // down
          this.input.down = false;
          break;
        case 37: // left
          this.input.left = false;
          break;
        case 39: // right
          this.input.right = false;
          break;

        // enter
        case 13: // enter
          this.input.enter = false;
          break;
        case 32: // space
          this.input.enter = false;
          break;
        case 90: // Z
          this.input.enter = false;
          break;

        // back
        case 27: // etc
          this.input.back = false;
          break;
        case 8: //delete
          this.input.back = false;
          break;
        case 88: // X
          this.input.back = false;
          break;
      }
    })
  }

  event() {
    this.keydown();
    this.keyup();
  }
}
