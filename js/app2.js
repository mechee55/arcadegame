class Enemy {
  constructor (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/enemy-bug.png'
  }

  // Enemy's prototype
  update (dt) {
    this.x += this.speed * dt

    // giving it 530 so that the enemies don't disappear at 400(canvas width)
    if (this.x > 530) {
      // show the enemies head first when they reappear
      this.x = -50
      // randomize the speeds of the enemies by 350(this can be any number)
      this.speed = 200 + Math.floor(Math.random() * 350)
    }

    // the widths(x) of a tile and the charactor are set to 80px 
    // the heights(y) are set to 50px

    // if a player collides with a bug, it gets sent back to the original
    // position (202, 405) if all these 4 conditions are met
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
      player.x = 202
      player.y = 405
    }
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}

// speed is not needed for the player 
class Player {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.player = 'images/char-horn-girl.png'
  }

  // Player's prototype
  update (dt) {}

  render () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y)
  }

  handleInput (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
      // moves the charactor 102px to the left
      this.x -= 102
    }
    if (keyPress == 'right' && this.x < 405) {
      // moves the charactor 102px to the right
      this.x += 102
    }
    if (keyPress == 'up' && this.y > 0) {
      // moves the charactor 83px up 
      this.y -= 83
    }
    if (keyPress == 'down' && this.y < 405) {
      // moves the charactor 83px down
      this.y += 83
    }

    // when the player hits the river, bring the charactor back to the 
    // original position(202, 405) with a delay of 300 milliseconds
    if (this.y < 0) {
      setTimeout(function () {
        player.x = 202
        player.y = 405
      }, 300)
    }
  }
}

const allEnemies = []

// enemy's starting positions on the x axis 
const enemyLocation = [63, 147, 230]

// for each function of the y axis, 
// a new enemy is created at 0(x axis), at the location of Y(163, 147, 230)
// at the speed of 300.
enemyLocation.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 300)
  allEnemies.push(enemy)
})

const player = new Player(202, 405)

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  player.handleInput(allowedKeys[e.keyCode])
})
