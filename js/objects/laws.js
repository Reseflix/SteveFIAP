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
    state.background = state.add.tileSprite(0,0,state.world.bounds.width,state.world.bounds.height,'background');
    state.ground = state.add.tileSprite(0,state.world.bounds.height-50,state.world.bounds.width, 32, 'ground');
    state.ground.scale.setTo(2,2);
    state.game.physics.arcade.enable(state.ground);    
    state.ground.body.allowGravity = false;
    state.ground.body.immovable = true;
    state.ground.body.setSize(state.ground.width, state.ground.height, 0, 0);
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

