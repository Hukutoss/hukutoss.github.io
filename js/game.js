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

var canvas = document.getElementById("gameCanvas");
var gfx = canvas.getContext("2d");

window.onload = new cGame().init();

function cGame() {
    var _this = this;

    this.init = function() {
        console.log("Hello world!");

        this.player = new cPlayer();
        this.player.init();

        this.gameLoop();
    }

    this.gameLoop = function() {
        _this.update();
        _this.render();

        requestAnimFrame(_this.gameLoop);
    }

    this.update = function() {
        this.player.update();
    }

    this.render = function() {
        gfx.clearRect(0, 0, canvas.width, canvas.height);
        gfx.beginPath();
            this.player.render(gfx);
    	gfx.closePath();
    }
} //cGame

function cPlayer() {
    var _this = this;

    this.init = function() {
        this.x = 100;
        this.y = 100;
        this.jump = false;
        this.gravity = 1;

        this.sprite = new Image();
        this.sprite.src = "res/player.png";

        this.imageAngle = 0;

        window.onmousedown = function(e) {
            if(e.button == 0) {
                _this.jump = true;
            }
        }

        document.addEventListener("keydown", function(e) {
            switch(e.keyCode) {
                case 32: //SPACE
                case 38:  //UP
                    _this.jump = true;
                    break
            }
        });
    }

    this.update = function() {
        this.gravity += 0.3;
        this.y+= this.gravity;

        if(this.jump) {
            this.gravity = -6;
            this.jump = false;
        }
    }

    this.render = function(gfx) {
        gfx.save();
        gfx.translate(this.x, this.y);
        gfx.rotate(this.imageAngle * Math.PI / 180);
        gfx.drawImage(this.sprite, -this.sprite.width /2 , -this.sprite.height / 2);
        gfx.restore();
    }
} //cPlayer
