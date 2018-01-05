// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed){
        // Variables applied to each of our instances go here,
        this.x = x;
        this.y = y;
        this.speed = speed;
         // The image/sprite for our enemies, this uses
         // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';       
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        this.x += this.speed *dt;
    }

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }

    update(){
        for(let enemy of allEnemies){
        console.log(enemy.x);
        //reset Player and Enemy Count on a loss
            if((enemy.x>(player.x-40)&&enemy.x<(player.x+40))&&(enemy.y>(player.y-40)&&enemy.y<(player.y+40))){
                player.x=200;
                player.y=450;
                allEnemies.length = 1;
            }
            //set horizontal border for enemy
            if(enemy.x>475){
                enemy.x=0;
            }
            //set horizontal border for player
            if(player.x>425 || player.x<-30){
                if(player.x>425){
                    player.x=0;
                }else{
                    player.x=425;
                }
            }
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress){
        if(keyPress == 'left'){
            this.x -= player.speed;
        }
        if(keyPress =='up'){
            this.y -= player.speed;
        }
        if(keyPress == 'right'){
            this.x += player.speed;
        }
        if(keyPress == 'down'){
            this.y += player.speed;
        }
    }

    //handle 2 collisions; edge of screen for Enemies/Player + Player/Enemy collision
    handleCollision(){
        for(let enemy of allEnemies){
        console.log(enemy.x);
        //reset Player and Enemy Count on a loss
            if((enemy.x>(player.x-40)&&enemy.x<(player.x+40))&&(enemy.y>(player.y-40)&&enemy.y<(player.y+40))){
                player.x=200;
                player.y=450;
                allEnemies.length = 1;
            }
            //set horizontal border for enemy
            if(enemy.x>475){
                enemy.x=0;
            }
            //set horizontal border for player
            if(player.x>425 || player.x<-30){
                if(player.x>425){
                    player.x=0;
                }else{
                    player.x=425;
                }
            }
        }
    }

    //reset game when player wins + add a new Enemy
    playerWins(){
    //when player hits water
    if(player.y === 0){
    //reset their position
    player.x=200;
    player.y=450;
    const randomPointer = Math.random();
    const enemySpeed = Math.random()*200;
    let newEnemyY = 0;
    //find position for new Enemy
    if(randomPointer<.33){
        newEnemyY = 75;
    }else if(randomPointer>.33&&randomPointer<.69){
        newEnemyY = 150;
    }else{newEnemyY=225;}
    //initialize new Enemy instance
    const newEnemy = new Enemy(0, newEnemyY, enemySpeed);
    allEnemies.push(newEnemy);
    }
}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player(200, 450, 15);
const diablo = new Enemy(15, 150, 90);
allEnemies.push(diablo);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    //check if player has Won on every keydown
    player.playerWins();
    });