window.onload = function() {
    var game = new Phaser.Game(800,600,Phaser.Canvas,'stevegame');
    game.state.add('gm', gm);
    game.state.add('gg', gg);
    game.state.add('ggtwo', ggtwo);
    game.state.add('gf', gf);
    game.state.add('go', go);
    game.state.add('gmload', gmload);
    game.state.start('gmload');
}
var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var difficulty = 'n'; // e = easy and n = normal
var points = 0;
var timeend = 0;
var gato = false;