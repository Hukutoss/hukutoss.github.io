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
    jumping: false,
    score: 0,
    gravity: 1,
}

function init() {
    canvas.width = 640;
    canvas.height = 480;

    console.log("Hello world!");

    window.onmousedown = function(e) {
        if(e.button == 0) {
            player.jumping = true;
        }
    }

    document.addEventListener("keydown", function(e) {
        switch(e.keyCode) {
            case 32: //SPACE
            case 38:  //UP
                player.jumping = true;
                break;
        }
    });

    gameLoop();
}

function gameLoop() {
    update();
    render();

    requestAnimFrame(gameLoop);
}

function update() {
    player.gravity += 0.4;
    player.y+= player.gravity;

    if(player.jumping) {
        console.log("YOU ARE JUMPING!!!");
        player.gravity = -7;
        player.jumping = false;
    }
}

function render() {
    gfx.clearRect(0, 0, canvas.width, canvas.height);
    gfx.beginPath();
    	gfx.arc(player.x, player.y, 32, 0, Math.PI * 2);
    	gfx.fillStyle = "#FF0";
    	gfx.fill();
	gfx.closePath();
}
