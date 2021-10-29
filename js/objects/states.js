class gmload extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.load.image('hs','imgs/menu/hs.png');
        this.load.image('ground','imgs/objects/newground.png');
        this.load.image('background','imgs/parallax/parallax.png');
        this.load.image('backgroundc','imgs/parallax/parallaxc.png');
        this.load.image('backgroundf','imgs/parallax/parallaxf.png');
        this.load.image('backgroundm','imgs/parallax/parallaxm.png');

        this.load.video('videomenu','imgs/menu/menu.mp4');

        this.load.spritesheet('iconsmine','imgs/objects/iconsminecraft.jpg',32,32);
        this.load.spritesheet('trees','imgs/objects/trees.png',48,48);
        this.load.spritesheet('heart','imgs/objects/heart.png',16,16);
        this.load.spritesheet('creeper','imgs/objects/creeper.png',32,32);
        this.load.spritesheet('steve','imgs/objects/steve.png',32,32);
        this.load.spritesheet('guast','imgs/objects/guast.png',32,32);
        this.load.spritesheet('buttons','imgs/menu/buttons.png',30,10);
        this.load.spritesheet('help','imgs/menu/help.png',512,512);

        this.load.audio('hurt','songs/hurt.mp3');
        this.load.audio('hit','songs/hit.mp3');
        this.load.audio('footsteps','songs/footsteps.mp3');
        this.load.audio('theme','songs/theme.mp3');
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
        this.buttons["Menu"] = this.add.button(this.game.width/2+100,this.world.centerY+50,'buttons',function(){this.video();},this,0,0,0);
        this.buttons["difficulty"] = this.add.button(this.game.width/2+100,this.world.centerY+100,'buttons',function(){if (difficulty == 'n'){difficulty = 'e'; this.buttons["difficulty"].setFrames(1,1,1)} else {difficulty = 'n'; this.buttons["difficulty"].setFrames(2,2,2)}},this,2,2,2);
        this.buttons["Help"] = this.add.button(this.game.width - 50,100,'help',function(){this.video();},this,0,0,0);

        for (var button in this.buttons) {
            this.buttons[button].scale.setTo(5, 5);
            this.buttons[button].smoothed = false;
            this.buttons[button].anchor.setTo(0.5,0.5);
            this.buttonsGroup.add(this.buttons[button]);
        }

        this.buttons["Help"].scale.setTo(0.2, 0.2);
    }

    video(){
        this.theme.pause();
        this.theme.volume = 0; 
        this.intro.play(false);
        this.intro.addToWorld(0,0,0,0,1,1.4);
        this.textpoint = this.game.add.text(10, 30, "Clique para cima ou para Baixo para pular o video.", style);
    }

    preload(){
    }

    create(){
        new parallax(this);
        this.hs = this.add.image(0,0,'hs');
        this.hs.smoothed = false;
        this.hs.height = this.camera.height;
        this.hs.width = this.camera.width;
        this.buttonConfig();
        points = 0;

        this.intro = this.game.add.video('videomenu'); 
        this.theme = this.game.add.audio('theme');
        this.theme.play();
    }

    update(){
        if(this.intro.currentTime != 0  && (this.game.input.keyboard.createCursorKeys().up.isDown || this.game.input.keyboard.createCursorKeys().down.isDown)){
            try {
                this.intro.destroy();
            } catch (e) {
            
            }
            this.game.state.start("gg");
        }
    }
}

class gg extends Phaser.State {
    constructor(){
        super();
    }
    heart(){
        this.cora =  this.game.add.sprite(600,50,'heart',3)
        this.cora.animations.add('ccidle',[0,1,2,3],1,true);
        this.cora.fixedToCamera = true;
        this.cora.scale.setTo(5,5); 
        this.cora.smoothed = false;
    }

    gameover() {
        this.textgameover.text = "Fim de jogo...";
        this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){this.game.state.start('gm');}, this);
        this.theme.pause();
    }

    preload() {}

    create() {
        stateconfig(this,20000);
        this.steve = new steve(this.game,[500,this.game.world.centerY],'steve',0);
        this.game.camera.follow(this.steve,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.game.camera.deadzone = new Phaser.Rectangle(70, 0, 120, 800);
        this.world.add(this.steve);
        this.cl = new collidelogic(this);
        this.plaen.add(this.steve);
        this.mancre = new managercreeper(this,30);
        this.itens = new manageritens(this,20);
        this.heart();

        this.textpoint = this.game.add.text(10, 30, "Pontos: 20", style);
        this.textpoint.fixedToCamera = true;
        //this.game.time.events.loop(200,function(){console.log('2')}, this);

        this.textgameover = this.game.add.text(this.game.camera.centerX, this.game.camera.centerY, "", style);
        this.textgameover.fixedToCamera = true;
        
    }
    update() {
        this.textpoint.text = "Pontos: " + points;
        this.cora.frame = this.steve.healty;
        this.parallax.reflesh(); 
        this.cl.reflesh();
        if (this.steve.healty >= 4) {
            this.mancre.delet();
            this.gameover();
        }   
        if (this.world.bounds.width-500 < this.steve.x) {
            this.game.state.start('gf');
        }
    }
    render() {
        //this.game.debug.body(this.itens.itenlist[0]);
    }
}

class gf extends Phaser.State {
    constructor(){
        super();
    }
    preload() {}

    create() {
        stateconfig(this,800,2);
        this.steve = new steve(this.game,[100,this.game.world.centerY],'steve',0);
        this.world.add(this.steve);
        this.cl = new collidelogic(this);
        this.plaen.add(this.steve);    
        this.steve.st = false;
        this.steve.end = false;
        this.rpend = true;

        this.ghast = new ghast(this.game,[1000,500],'guast',0);
        this.world.add(this.ghast);

        this.dia = new itens(this.state.game,[100,350],'iconsmine',8);
        this.dia.name = 'diaheart';
        this.dia.diagi = true;

        this.key = new itens(this.state.game,[550,350],'iconsmine',95);
        this.key.name = 'key';
        this.world.add(this.key);
        this.endgroup.add(this.key);

        
    }
    update() {
        if (this.steve.x > this.ghast.x) {
            this.ghast.scale.setTo(4,4);
        } else {
            this.ghast.scale.setTo(-4,4);
        }
        
        if (this.ghast.x < 200 && this.dia.diagi) {
            this.world.add(this.dia);
            this.endgroup.add(this.dia);
            this.dia.diagi = false;
        }
        if (this.steve.end && this.rpend) {
            // fim do jogo
            this.rpend = false;
            this.textpoint = this.game.add.text(this.game.camera.centerX, this.game.camera.centerY, "parabens!", style);
            this.textpoint.fixedToCamera = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){this.game.state.start('gm');}, this);
        }
        this.cl.reflesh();
    }
    render() {
        //this.game.debug.spriteBounds(this.trees[0]);
        //this.game.debug.spriteCorners(this.trees[0], true, true);
        //this.game.debug.body(this.trees[0]);
    }
}