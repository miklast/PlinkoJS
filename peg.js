function Peg(x,y,r) {

    var options = {
        isStatic: true,
    }

    this.body = Bodies.circle(x,y,r, options);
    this.body.label = "peg";
    this.r = r;
    World.add(world, this.body);

}

Peg.prototype.show = function() {
    fill(96);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0,this.r*2);
    pop();
}