window.onload = function() {
    var game = new Phaser.Game(800,600,Phaser.Canvas,'stevegame');
    game.state.add('gm', gm);
    game.state.start('gm');
}