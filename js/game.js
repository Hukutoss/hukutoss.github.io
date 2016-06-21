// A cross-browser requestAnimationFrame
var requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = init;

var canvas = document.getElementById("gameCanvas");
var gfx = canvas.getContext("2d");

var player = {
    x: 100,
    y: 100,
    score: 0
}

function init() {
    canvas.width = 640;
    canvas.height = 480;

    console.log("Hello world!");

    gameLoop();
}

function gameLoop() {
    update();
    render();

    requestAnimFrame(gameLoop);
}

function update() {
    player.y+= 1;
}

function render() {
    gfx.clearRect(0, 0, canvas.width, canvas.height);
    gfx.beginPath();
	gfx.arc(player.x, player.y, 32, 0, Math.PI * 2);
	gfx.fillStyle = "#FF0";
	gfx.fill();
	gfx.closePath();
}
