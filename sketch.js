// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var pegs = [];
var cols = 11; 
var rows = 13;

function setup() {
    createCanvas(600,800)

    engine = Engine.create();
    world = engine.world;
    newParticle();
    var spacing = width/cols;

    for (var i=0; i <  rows; i++) {
        for (var j=0; j < cols; j++) {

            var x = spacing/2 + i*spacing;
            if (j%2 == 0) {
                x+= spacing/2;
            }
            var y = spacing + j*spacing;
            var p = new Peg(x, y, 4);
            pegs.push(p);
        }
    }
    console.log(pegs);

}

function newParticle() {
    var p = new Particle(300,50, 15);
    particles.push(p);
}


function draw() {


    if (frameCount % 30 == 0) {
        newParticle();
    }

    background(51);
    Engine.update(engine);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
    }
    for (var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }

}