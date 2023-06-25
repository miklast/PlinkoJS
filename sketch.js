// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events;
    Bodies = Matter.Bodies;
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse

var engine;
var world;
var particles = [];
var pegs = [];
var bounds = [];
var walls = [];
var cols = 10;
var rows = 8;

var mConstraint;



function setup() {
    canvas = createCanvas(600,800)

    engine = Engine.create();
    world = engine.world;
    world.gravity.y=1.75;

    function collision(event) {
        var pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {
            var labelA = pairs[i].bodyA.label;
            var labelB = pairs[i].bodyB.label;

            // if(labelA =='plinko' && labelB == 'peg' || labelA =='peg' && labelB == 'plinko') {

            // }
            
        }
        //console.log(event)
    }

    Events.on(engine, 'collisionStart', collision); 

    //newParticle();
    var spacing = width/cols;

    for (var i=0; i <  rows; i++) {
        for (var j=0; j < cols; j++) {

            var x = spacing/2 + i*spacing;
            if (j%2 == 0) {
                x+=spacing/2;
            }
            var y = spacing + j*spacing;
            var p = new Peg(x+35, y+50, 2.73);

            if (i==0 && j% 2 != 0) {
                continue;
            }
            else{
                pegs.push(p);
            }
        }
    }
    var b = new Boundary(width/2, height+50, width, 100)
    bounds.push(b);

    var w = new Wall(40, 460, 7, 900)
    walls.push(w)
    var w2 = new Wall(width-26, 460, 7, 900)
    walls.push(w2)

    for (var j=1; j < cols-1; j++) {
        var x = j*spacing;
        var h = 66;
        var w = 7;
        var y = height -h/2;
        var b = new Boundary(x+35,y,w,h);
        bounds.push(b);


    }

    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();

    var options = {
        mouse: canvasMouse,
        collisionFilter: {mask: 0b1}
    }

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
    console.log(mConstraint);

}



function newParticle(x,y,r) {
    var p = new Particle(x,y,r);
    particles.push(p);
}


function draw() {

    
    if (mConstraint.mouse.button == 0) {
        if (particles.length < 1) {
            newParticle(mConstraint.mouse.position.x, mConstraint.mouse.position.y, 19.25);
        }
        if (mConstraint.mouse.button == -1) {
            particle.category = 0b10;
        }
    }

    // if (frameCount % 90 == 0) {
    //     newParticle();
    // }

    background(0);
    Engine.update(engine);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();

        if (particles[i].isOffScreen()) {
            World.remove(world, particles[i].body);
            particles.splice(i,1);
            i--;
        }
    }
    for (var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }
    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }
    for (var i = 0; i < walls.length; i++) {
        walls[i].show();
    }

}