function Circle(r) {
  this.r = r;
  this.spc = 0.1;
  this.path = [];
}

Circle.prototype.buildPath = function() {
  for (let angle = 0; angle < 2 * Math.PI; angle += this.spc) {
    let pos = PolarToCartesian(this.r, angle);
    // console.log(pos);
    this.path.push(pos);
  }
};

Circle.prototype.show = function() {
  for (let i = 0; i < this.path.length; i++) {

  }
};
