let speed = 1;
let mapWidth = 600;
let collision = 0;
let win = 0;
let winSound = new Audio('sound/win.wav');
let loseSound = new Audio('sound/lose.wav');
let heartOne = document.getElementById('heart1');
let heartTwo = document.getElementById('heart2');
let heartThree = document.getElementById('heart3');

//Randomise the speed of the bugs
function randomSpeed() {
  return Math.floor(Math.random() * 200);
}

// Enemies our player must avoid
var Enemy = function(enemySpeed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.baseSpeed = 250;
    this.speed = enemySpeed + this.baseSpeed;
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x >= mapWidth) {
    this.x = -100;
    this.y = this.y;
    this.speed = randomSpeed() + this.baseSpeed;
  }

// Collision code
  if (player.x < this.x + 50 &&
      player.x + 25 > this.x &&
      player.y < this.y + 50 &&
      25 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
        loseSound.play();
        collision++;
        lives();
  }

//Hearts depleat as bugs are hit
  function lives () {
    if (collision === 1) {
      heartOne.style.visibility="hidden";
    }
    if (collision === 2) {
      heartTwo.style.visibility="hidden";
    }
    if (collision === 3) {
      heartThree.style.visibility="hidden";
      youLose();
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemey bug variables
const bug1 = new Enemy(randomSpeed(), -100, 230);
const bug2 = new Enemy(randomSpeed(), -100, 140);
const bug3 = new Enemy(randomSpeed(), -100, 50);
const bug4 = new Enemy(randomSpeed(), -100, 140);

//Player Class
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  update() {
    this.render;
    //For reaching the water
    if (this.y < 1) {
      this.x = 200;
      this.y = 400;
      win++;
      winSound.play();
      youWin();
    }
  };
  //Render player
  render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

}

//Win the game after reaching water 3 times
function youWin() {
    if (win === 3) {
      let winModal = document.getElementById('winModal');
      winModal.style.display = "block";
    }
};

//Lose the game when being hit by bugs 3 times
function youLose() {
  let loseModal = document.getElementById('loseModal');
  loseModal.style.display = "block";
}

//Restart the game for modal button
function restartGame() {
  heartOne.style.visibility="visible";
  heartTwo.style.visibility="visible";
  heartThree.style.visibility="visible";
  player.x = 200;
  player.y = 400;
  collision = 0;
  win = 0;
  document.getElementById('loseModal').style.display = "none";
  document.getElementById('winModal').style.display = "none";
}

//Moves the character on keyboard input
Player.prototype.handleInput = function (keyInput) {
  switch (keyInput) {
    case 'left':
      if (player.x >= 50) {
        player.x -= 100;
      }
      break;
    case 'right':
    if (player.x <= 300) {
      player.x += 100;
    }
      break;
    case 'up':
      if (player.y > 60) {
        player.y -= 80;
      }
      break;
    case 'down':
      if (this.y <= 300) {
        this.y += 80;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [bug1, bug2, bug3, bug4];
const player = new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
