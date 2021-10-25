// Unique objects
class steve extends Phaser.Sprite {
    constructor(game,xy,key,frame) {
        super(game,xy[0],xy[1],key,frame);
        this.animat();
        personslogic(this);
        this.body.setSize(17, 15, 7, 15);
        this.keyss = game.input.keyboard.createCursorKeys();
        this.healty = 0;
        this.st = true;
        this.hurt = this.game.add.audio('hurt');
        this.foot = this.game.add.audio('footsteps');
        //this.tint = 0xFF0000;

    }
    
    damage(){
        var orig = this.tint;
        this.hurt.play();
        //this.tint = 0xFF0000;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){this.tint = 0xFF0000}, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function(){this.tint = orig}, this);
        
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
    constructor(game,xy,key,frame) {
        super(game,xy[0],xy[1],key,frame);
        this.animat();
        personslogic(this);
        this.xy = xy;
        this.body.setSize(11, 20, 11, 11);
        this.speed = Math.floor(Math.random() * {'e':250,'n':400}[difficulty]);
        if (this.speed < 200) {
            this.speed = 200;
        }
        this.body.velocity.x = this.speed;
    }

    animat(){
        this.animations.add('idle',[0,1,2,3],10,true);
        this.animations.play('idle');
        this.animations.delay = 500;
    }

    update() {
        if ((this.xy[0] > this.x + 500 && this.xy[0] > this.x) || this.body.touching.left){
            this.body.velocity.x = this.speed;
            this.scale.setTo(5,5);

        } else if ((this.xy[0] < this.x - 500 && this.xy[0] < this.x) || this.body.touching.right) { 
            this.body.velocity.x = -this.speed;
            this.scale.setTo(-5,5);
        }     
        if (this.body.velocity.x > -190 && this.body.velocity.x < 190) {
            this.body.velocity.x = -this.speed;
            this.scale.setTo(-5,5);
        }  
    }
}

class itens extends Phaser.Sprite {
    constructor(game,xy,key,frame) {
        super(game,xy[0],xy[1],key,frame);
        this.xy = xy;

        this.smoothed = false;
        this.scale.setTo(1.5,1.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(0.2);
        this.anchor.setTo(0.5,0.5);
        this.body.gravity.set(0, 300);
        this.body.velocity.x = 0;
        this.body.velocity.y = 20;
    }
    create() {

    }
    update() {
        
    }
}
// manager of this objects
class managercreeper {
    constructor(state,amount){
        this.amount = amount;
        this.state = state;
        this.creeperlist = [];
        this.posirand();
    }
    posirand(){
        let x = 100;
        for (let i=0;i <= this.amount;i++){
            x +=  Math.floor(Math.random() * 800)+600;
            this.creeperlist.push(new creeper(this.state.game,[x,200],'creeper',0));
            this.state.world.add(this.creeperlist[i]);
            this.state.creepergroup.add(this.creeperlist[i]);
            if (x > this.state.world.bounds.width-1000){
                x = 800;
            }
        }
    }
    delet(){
        for(let cr in this.creeperlist) {
            this.creeperlist[cr].destroy();
        }
    }
}

class manageritens {
    constructor(state,amount){
        this.amount = amount;
        this.state = state;
        this.itenlist = [];
        this.posirand();
    }
    posirand(){
        let x = 100;
        for (let i=0;i <= this.amount;i++){
            x +=  Math.floor(Math.random() * 800)+600;
            this.itenlist.push(new itens(this.state.game,[x,200],'iconsmine',[21,22,23,24,25,26,27,29,30,31,38,39,41,43,45,47][Math.floor(Math.random() * 16)]));
            this.state.world.add(this.itenlist[i]);
            this.state.itensgroup.add(this.itenlist[i]);
            if (x > 7000){
                x = 800;
            }
        }
    }
}
