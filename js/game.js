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

}

function render() {

}
