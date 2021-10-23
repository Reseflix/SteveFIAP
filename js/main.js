window.onload = function() {
    var game = new Phaser.Game(800,600,Phaser.Canvas,'stevegame');
    game.state.add('gm', gm);
    game.state.add('gg', gg);
    game.state.add('gf', gf);
    game.state.add('gmload', gmload);
    game.state.start('gmload');
}
var difficulty = 'n'; // e = easy and n = normal
var points = 0;