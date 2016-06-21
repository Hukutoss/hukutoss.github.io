window.onload = init;

var canvas = document.getElementById("gameCanvas");
var gfx = canvas.getContext("2d");

function init() {
    canvas.width = 640;
    canvas.height = 480;

    console.log("Hello world!");
}
