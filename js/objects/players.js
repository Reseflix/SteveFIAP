// Unique objects
class steve extends Phaser.Sprite {
    constructor(game,xy,key,frame) {
        super(game,xy[0],xy[1],key,frame);
        this.animat();
        this.smoothed = false;
        this.scale.setTo(5,5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.setSize(17, 15, 7, 15);
        this.body.bounce.set(0.2);
        this.anchor.setTo(0.5,0.5);
        this.body.gravity.set(0, 300);
        this.body.velocity.x = 0;
        this.body.velocity.y = 20;
        this.keyss = game.input.keyboard.createCursorKeys();
        this.healty = 0;
        this.st = true;

    }

    animat() {
        this.animations.add('movendo',[0,1,2,3],10,true);
        this.animations.add('parado',[8,9,8,8,8,8,8,8,9,8],3,true);
        this.animations.add('pulando',[10,11,12],10,false);
        this.animations.add('caindo',[13,14,15,16],10,false);
        this.movimentacao = {
            "parado": () => this.animations.play('parado'),
            "pulando": () => this.animations.play('pulando'),
            "movendo": () => this.animations.play('movendo')
        }
    }

    create() {

    }
    update() {
        if(this.healty < 4 && this.st) {
            if (this.keyss.up.isDown && (this.body.touching.down || this.body.blocked.down)) {
                this.movimentacao["pulando"]();
                this.body.velocity.y = -300;
            } else if (this.keyss.left.isDown) {
                this.movimentacao["movendo"]();
                this.body.velocity.x = -380;
                this.scale.setTo(-5,5);
                this.game.camera.deadzone = new Phaser.Rectangle(700, 0, 120, 800);
            } else if (this.keyss.right.isDown) {
                this.movimentacao["movendo"]();
                this.body.velocity.x = 380;
                this.scale.setTo(5,5);
                this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 120, 800);
            } else {
                this.movimentacao["parado"]();
                this.body.velocity.x = 0;
            }
        } else {
            this.movimentacao["parado"]();
            this.body.velocity.x = 0;
        }
    }
}

class creeper extends Phaser.Sprite {
    constructor() {

    }
    create() {

    }
    update() {
        
    }
}

class itens extends Phaser.Sprite {
    constructor() {

    }
    create() {

    }
    update() {
        
    }
}
// manager of this objects
class managercreeper {
    constructor(){}
}

class manageritens {
    constructor(){}
}
