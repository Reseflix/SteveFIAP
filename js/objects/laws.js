// Steve and Creeper laws
function personslogic(person) {
    person.smoothed = false;
    person.scale.setTo(5,5);
    person.game.physics.enable(person, Phaser.Physics.ARCADE);
    person.body.collideWorldBounds = true;
    person.body.bounce.set(0.2);
    person.anchor.setTo(0.5,0.5);
    person.body.gravity.set(0, 600);
    person.body.velocity.x = 0;
    person.body.velocity.y = 20;
}

class collidelogic {
    constructor(state) {
        this.state = state;
        this.game = this.state.game;
        this.state.plaen = this.game.add.group();
        this.state.creepergroup = this.state.game.add.group();
        this.state.itensgroup = this.state.game.add.group(); 
        this.state.endgroup = this.state.game.add.group(); 
        
    }
    reflesh() {
        this.game.physics.arcade.overlap(this.state.creepergroup, this.state.plaen, placre, null, this.state);
        this.game.physics.arcade.overlap(this.state.itensgroup, this.state.plaen, plafru, null, this.state);
        this.game.physics.arcade.overlap(this.state.endgroup, this.state.plaen, endinggroup, null, this.state);
        this.game.physics.arcade.collide(this.state.ground, this.state.plaen);
        this.game.physics.arcade.collide(this.state.ground, this.state.creepergroup);
        this.game.physics.arcade.collide(this.state.ground, this.state.itensgroup);
        this.game.physics.arcade.collide(this.state.ground, this.state.endgroup);
        this.game.physics.arcade.collide(this.state.creepergroup, this.state.creepergroup);
        this.game.physics.arcade.collide(this.state.plaen, this.state.creepergroup);
        
    }
}
// states
function stateconfig(state,widthstate = 8000,treesamount=50,color){
    // Logic
    state.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    state.game.scale.pageAlignHorizontally = true;	
    state.game.scale.pageAlignVertically = true;
    state.physics.startSystem(Phaser.Physics.ARCADE);
    state.world.setBounds(0,0,widthstate,state.camera.height);
    state.height = state.camera.height;
    state.width = state.camera.width;
    // Background, Ground, building and trees. 
    state.parallax = new parallax(state,color);
    trees(state,treesamount);

    state.ground = state.add.tileSprite(0,475,widthstate*2,0, 'ground');
    state.ground.scale.setTo(0.5,0.5);
    state.game.physics.arcade.enable(state.ground);    
    state.ground.body.allowGravity = false;
    state.ground.body.immovable = true;
    state.ground.smoothed = false;
    state.ground.body.setSize(state.ground.width, state.ground.height*0.4, 0, 160);
}

class parallax {
    constructor(state,color = 0){
        this.state = state;
        let xw = state.world.bounds.width,xh = state.world.bounds.height;
        this.color = [{
            background:'background',
            backgroundf:'backgroundf',
            backgroundc:'backgroundc',
            backgroundm:'backgroundm'
        },{
            background:'backgroundred',
            backgroundf:'backgroundredf',
            backgroundc:'backgroundredc',
            backgroundm:'backgroundredm'
        }][color];

        this.background = {'background':state.add.tileSprite(0,0,xw,xh,this.color['background']),'backgroundf':state.add.tileSprite(0,0,xw,xh,this.color['backgroundf']),'backgroundm':state.add.tileSprite(0,0,xw,xh,this.color['backgroundm']),'backgroundc':state.add.tileSprite(0,0,xw,xh,this.color['backgroundc'])}
        for (let backgr in this.background) {
            this.background[backgr].scale.setTo(2,2);
        }
    }
    reflesh() {
        this.background['backgroundf'].x = this.state.camera.x * .9;
        this.background['backgroundm'].x = this.state.camera.x * .7;
        this.background['backgroundc'].x = this.state.camera.x * .5;
    }
}

function trees(state,amount){
    let treex = 200;
    state.trees = [];
    for (var i=0;i <= amount;i++){
        let rand = Math.floor(Math.random() * 4);
        if(1 <= rand){
            emitter = state.game.add.emitter(treex,-10,Math.floor(Math.random() * 4)+1);
            emitter.makeParticles('iconsmine',[53,54,55,56,155][Math.floor(Math.random() * 5)]);
            emitter.start(false,Math.floor(Math.random() * 1000)+6000,80); 

            state.trees[i] = state.add.sprite(treex,-20,'trees',Math.floor(Math.random() * 4));
            if (1 == Math.floor(Math.random() * 4)) {
                state.trees[i].scale.setTo(-12,12);
            } else {
                state.trees[i].scale.setTo(12,12);
            }
            
        } else {
            state.trees[i] = state.add.sprite(treex,175,'trees',Math.floor(Math.random() * 4));
            if (1 == Math.floor(Math.random() * 4)) {
                state.trees[i].scale.setTo(-8,8);
            } else {
                state.trees[i].scale.setTo(8,8);
            }
        }
        state.trees[i].smoothed = false;

        treex += Math.floor(Math.random() * 800);
    }
}
//coalisions

function placre(creeperobject,playerobject){
    if((playerobject.body.touching.down && creeperobject.body.touching.up) && playerobject.y < creeperobject.y){
        creeperobject.destroy();
        points += 10;
    } else if ((creeperobject.y - 60 < playerobject.y) && !creeperobject.body.touching.up) {
        playerobject.healty++;
        creeperobject.destroy();
        points -= 5;
        playerobject.damage();
    }
}

function plafru(fruitobject,playerobject){
    fruitobject.destroy();
    points += 1;
    if (playerobject.healty > 2 && difficulty == 'e'){
        playerobject.healty--;
    }
}

function endinggroup(endobject,playerobject){
    if(endobject.name == 'diaheart') {
        playerobject.st = true;
        endobject.destroy();
    } else if(endobject.name == 'key'){
        playerobject.end = true;
        endobject.destroy();
        playerobject.st = false;
    }
}

