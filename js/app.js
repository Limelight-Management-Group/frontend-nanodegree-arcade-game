// Enemies our player must avoid
var Enemy = function() {
    this.enemyPath = [60, 140, 220]; 
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset()
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if(this.x > 600){
        this.reset();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){

    this.sprite = 'images/char-boy.png';
    this.reset();
};
Player.prototype.update = function(dt){
    this.handleCollision();
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleCollision = function(){
    if (this.y === -20) {
        alert("you won!!")
        this.reset();
    } else if( this.y >= 60 && this.y <= 220) {
        var self = this;
        allEnemies.forEach(function(enemy){
            if(enemy.y === self.y){
                if(enemy.x >= player.x - 30 && enemy.x <= player.x +30){
                    self.reset();
                }
            }
        })
    } 
};
Enemy.prototype.reset = function(){
    this.x = -2;
    this.y = this.pathPicker();
    this.speed = this.getRandomSpeed();
};

Enemy.prototype.getRandomSpeed = function(){
    var minSpeed = 150;
    var maxSpeed = 600;
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed
}

Enemy.prototype.pathPicker = function(){
    return this.enemyPath[Math.floor(Math.random() * this.enemyPath.length)];
};
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
};

Player.prototype.handleInput = function handleCollision(keyPress){
    if(keyPress === "left"){
        console.log("left");
        this.x -= (this.x - 101 < -150) ? 0 : 101
    } else if (keyPress === "right"){
        console.log("right");
        this.x += (this.x +101 > 600) ? 0 : 101
    } else if (keyPress === "up"){
        console.log("up");
        this.y -= (this.y -80 < -20) ? 0 : 80
    } else if(keyPress === "down"){
        console.log("down");
        this.y += (this.y +80 > 400) ? 0 :80
    }
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
 
   var allEnemies = [];
   for(var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
   };
    var player = new Player();


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
