class GameKey {
  init() {
    this.input = {
         up: false,
       down: false,
      right: false,
       left: false,
      enter: false
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
      }
    })
  }

  event() {
    this.keydown();
    this.keyup();
  }
}
