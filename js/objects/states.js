class gm extends Phaser.State {
    constructor() {
        super();
    }
    preload(){
        this.load.image('hs','imgs/menu/hs.png')
    }
    create(){
        this.add.image(0,0,'hs');
    }
    update(){}
}