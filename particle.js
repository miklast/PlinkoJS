function Particle(x,y,r) {

    var options = {
        restitution: .77,
        density:.25
    }

    this.body = Bodies.circle(x,y,r, options);
    this.body.label = "plinko";
    this.r = r;
    World.add(world, this.body);

}

Particle.prototype.isOffScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
   return (x< 50 || x > width-40 || y > height-21);
}

Particle.prototype.show = function() {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0,this.r*2);
    pop();
}