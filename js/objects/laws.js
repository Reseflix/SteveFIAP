// Steve and Creeper laws
function personslogic() {
    
}
// states
function stateconfig(state,widthstate = 8000){
    // Logic
    state.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    state.game.scale.pageAlignHorizontally = true;	
    state.game.scale.pageAlignVertically = true;
    state.physics.startSystem(Phaser.Physics.ARCADE);
    state.world.setBounds(0,0,widthstate,state.camera.height);
    state.height = state.camera.height;
    state.width = state.camera.width;
    // Background and Ground
    state.parallax = new parallax(state);
    state.trees = [];
    let treex = 100;
    for (i=0;i <=20;i++) {
        state.trees[i] = state.add.sprite(treex,175,'trees',Math.floor(Math.random() * 4));
        if (1 <= Math.floor(Math.random() * 4)) {
            state.trees[i].scale.setTo(-8,8);
            emitter = state.game.add.emitter(treex,-10,Math.floor(Math.random() * 4)+1);
            emitter.makeParticles('iconsmine',[53,54,55,56,155][Math.floor(Math.random() * 5)]);
            emitter.start(false,Math.floor(Math.random() * 1000)+6000,80);
        } else {
            state.trees[i].scale.setTo(8,8);
        }

        state.trees[i].smoothed = false;
        treex += Math.floor(Math.random() * 800);
    }
    state.ground = state.add.tileSprite(0,475,widthstate*2,0, 'ground');
    state.ground.scale.setTo(0.5,0.5);
    state.game.physics.arcade.enable(state.ground);    
    state.ground.body.allowGravity = false;
    state.ground.body.immovable = true;
    state.ground.smoothed = false;
    state.ground.body.setSize(state.ground.width, state.ground.height*0.4, 0, 160);
}

class parallax {
    constructor(state){
        this.state = state;
        let xw = state.world.bounds.width,xh = state.world.bounds.height;
        this.background = {'background':state.add.tileSprite(0,0,xw,xh,'background'),'backgroundf':state.add.tileSprite(0,0,xw,xh,'backgroundf'),'backgroundm':state.add.tileSprite(0,0,xw,xh,'backgroundm'),'backgroundc':state.add.tileSprite(0,0,xw,xh,'backgroundc')}
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
//coalisions
function placre(creeperobject,playerobject){
    if((playerobject.body.touching.down && creeperobject.body.touching.up) && playerobject.y < creeperobject.y){
        creeperobject.destroy();
        points += 10;
    } else if ((creeperobject.y - 60 < playerobject.y) && !creeperobject.body.touching.up) {
        playerobject.healty++;
        creeperobject.destroy();
        points -= 5;
    }
}

function plafru(fruitobject,playerobject){
    fruitobject.destroy();
    points += 1;
    if (playerobject.healty > 1 && dificuldade == "e"){
        playerobject.healty--;
    }
}

function pladia(diaobject,playerobject){
    diaobject.destroy();
    statusGame = 100;
}

function ghadia(diaobject,ghastobject) {
    diaobject.destroy();
}

function placha(chaveobject,playerobject){
    statusGame = 210;
    chaveobject.destroy();
}

