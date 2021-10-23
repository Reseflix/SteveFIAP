class gmload extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.load.image('hs','imgs/menu/hs.png');
        this.load.image('iconsmine','imgs/objects/iconsminecraft.jpg');
        this.load.image('ground','imgs/objects/ground.png');
        this.load.image('background','imgs/objects/background.png');
        this.load.spritesheet('heart','imgs/objects/heart.png',16,16);
        this.load.spritesheet('creeper','imgs/objects/creeper.png',32,32);
        this.load.spritesheet('steve','imgs/objects/steve.png',32,32);
        this.load.spritesheet('buttons','imgs/menu/buttons.png',30,10);
        this.load.spritesheet('help','imgs/menu/help.png',512,512);
    }
    update() {
        this.game.state.start('gm');
    }
}

class gm extends Phaser.State {
    constructor() {
        super();
        this.buttons = {};
    }

    buttonConfig() {
        this.buttonsGroup = this.game.add.group();
        this.buttons["Menu"] = this.add.button(this.game.width/2+100,this.world.centerY+50,'buttons',function(){this.game.state.start('gg');},this,0,0,0);
        this.buttons["difficulty"] = this.add.button(this.game.width/2+100,this.world.centerY+100,'buttons',function(){if (difficulty == 'n'){difficulty = 'e'; this.buttons["difficulty"].setFrames(1,1,1)} else {difficulty = 'n'; this.buttons["difficulty"].setFrames(2,2,2)}},this,2,2,2);
        this.buttons["Help"] = this.add.button(this.game.width - 50,100,'help',function(){console.log("nothing")},this,0,0,0);

        for (var button in this.buttons) {
            this.buttons[button].scale.setTo(5, 5);
            this.buttons[button].smoothed = false;
            this.buttons[button].anchor.setTo(0.5,0.5);
            this.buttonsGroup.add(this.buttons[button]);
        }

        this.buttons["Help"].scale.setTo(0.2, 0.2);
    }

    preload(){
    }

    create(){
        this.background = this.add.tileSprite(0,0,this.world.bounds.width,this.world.bounds.height,'background');
        this.hs = this.add.image(0,0,'hs');
        this.hs.smoothed = false;
        this.hs.height = this.camera.height;
        this.hs.width = this.camera.width;
        this.buttonConfig();
    }

    update(){}
}

class gg extends Phaser.State {
    constructor(){
        super();
    }
    preload() {}
    create() {
        stateconfig(this,8000);
    }
    update() {}
}

class gf extends Phaser.State {
    constructor(){
        super();
    }
    preload() {}
    create() {
        stateconfig(this,8000);
    }
    update() {}
}