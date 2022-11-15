import Phaser from "phaser";
class Escena extends Phaser.Scene{
    platforms = null;
    player = null;
    cursors = null;
    star= null;
    score = 0;
    scoreText;



    preload (){

    this.load.image('sky', 'img/sky.png');
    this.load.image('ground','img/platform.png');
    this.load.image('star', 'img/star.png');
    this.load.image('bomb', 'img/bomb.png');
    this.load.spritesheet('dude', 
        'img/dude.png',
        { frameWidth: 32, frameHeight: 48 });
    
    }

    create (){
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
    
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.star = this.physics.add.group({
            key: 'star',
            repeat: 15,
            setXY:{x:12, y:0,stepX:60}
        });
        
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.star, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.overlap(this.player,this.star,this.collectStar,null,this);
        this.scoreText= this.add.text(16,16, 'score: 0',{fontSize: '32px', fill: '#000'});
    }

    update(){
    if (this.cursors.left.isDown)
{
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
    }

    collectStar (player, star){
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.star.countActive(true) === 0){
        this.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
        
    }
}
export default Escena;