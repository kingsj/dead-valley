// The DUDE

define(["game", "sprite"], function (game, Sprite) {

  var keyStatus = game.controls.keyStatus;
  var LEFT  = true;  // true, meaning do flip the sprite
  var RIGHT = false;

  var SPEED = 3.5;
  var WALKING_ANIMATION_FRAME_RATE = 0.02; // in seconds

  var Dude = function (name, width, height, image) {
    this.init(name, width, height, image);

    this.driving = null;

    this.direction = RIGHT;
    this.walking = false;
    this.walkingFrame = 0;
    this.walkingFrameCounter = 0.0;

    this.draw = function (delta) {
      if (!this.visible) return;

      if (this.walking) {
        this.walkingFrameCounter += delta;
        if (this.walkingFrameCounter > WALKING_ANIMATION_FRAME_RATE) {
          this.walkingFrameCounter = 0.0;
          this.walkingFrame = (this.walkingFrame + 1) % 4; // four frames
        }
        this.drawTile(this.walkingFrame+1, this.direction);
        this.drawTile(6, this.direction); // walking arms
      } else {
        this.drawTile(0, this.direction); // standing
        this.drawTile(5, this.direction); // standing arms
      }
    };

    this.move = function (delta) {
      if (!this.visible) return;

      if (keyStatus.x) {
      }

      this.walking = (keyStatus.left  ||
                      keyStatus.right ||
                      keyStatus.up    ||
                      keyStatus.down);

      if (keyStatus.left) {
        this.pos.x -= SPEED;
        this.direction = LEFT;
      } else if (keyStatus.right) {
        this.pos.x += SPEED;
        this.direction = RIGHT;
      } 
      if (keyStatus.up) {
        this.pos.y -= SPEED;
      } else if (keyStatus.down) {
        this.pos.y += SPEED;
      }

      game.map.keepInView(this);
    };

    var self = this;
    game.controls.registerKeyDownHandler('x', function () {
      if (self.driving) {
        // leave the car
        // TODO move this calculation into Car
        // TODO make the dude come out the driver's side
        self.pos.set(self.driving.pos);
        self.driving.driver = null;
        self.driving = null;
        self.visible = true;
        return;
      }

      if (!self.visible) return;

      var cars = _(self.nearby()).select(function (sprite) {
        return sprite.name === "car";
      });
      if (cars.length > 0) {
        // find the closest
        var car = _(cars).reduce(function (closest, car) {
          return (self.distance(car) < self.distance(closest)) ? car : closest;
        }, cars[0]);

        // get in the car
        car.driver = self;
        self.driving = car;
        self.visible = false;
      }
    });
  };
  Dude.prototype = new Sprite();

  return Dude;

});