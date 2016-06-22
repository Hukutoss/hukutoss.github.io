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

        this.pipe = new cPipe(300, 128);

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
            this.pipe.render(gfx);
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
                //console.log("x: " + e.layerX + ", y: " + e.layerY);
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

        this.imageAngle += 2.5;
        if (this.imageAngle > 60) {
            this.imageAngle = 60;
        }
        if (this.imageAngle < -60) {
            this.imageAngle = -60;
        }

        if(this.jump) {
            this.gravity = -5.5; //TODO: rebalancе
            this.jump = false;

            this.angle = 70 + (this.imageAngle - 10)
            this.imageAngle -= this.angle;
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

function cPipe(_xPipe, _yPipe) {
    this.x = _xPipe;
    this.y = _yPipe;

    this.sprite = new Image();
    this.sprite.src = "res/pipe.png";

    this.tileSize = 32;

    this.update = function() {

    }
    //sprite
    //sx sy swidth sheight
    //x  y width height
    this.render = function(gfx) {
        var ts = this.tileSize;
        var yOff = this.y + 100;
        var yu = this.y;
        var yd = canvas.height - yOff;

        var ut = (yu >> 5) + 2;
        var dt = (yd >> 5) + 1;

        //console.log("yu: " + yu + ", yd: " + yd + ", ut: " + ut + ", dt: " + dt);

        for(var i = 0; i < ut; i++) {
            var cc = i > 0 ? 1 : 0;
            gfx.drawImage(this.sprite, ts * cc, 0, ts, ts, this.x, yu - ts * i, ts, ts);
        }

        for(var i = 0; i < dt; i++) {
            var cc = i > 0 ? 1 : 0;
            gfx.drawImage(this.sprite, ts * cc, 0, ts, ts, this.x, yOff + ts * i, ts, ts);
        }
    }
}
