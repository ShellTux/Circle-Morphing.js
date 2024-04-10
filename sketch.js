let cirPath = [];
let shapePath = [];
const radius = 200;
let shapePoints = 3;
let delta = Math.round(360 / shapePoints);
const spc = 1;
let theta = 0;
let cv, ctx;

window.onload = function() {
  setup();
  setInterval(draw, 5);
}

function setup() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  cv.width = "600";
  cv.height = "600";
  let endA = delta;
  let startA = 0;
  let endV = Vector.polarToCartesian(radius, Math.convertAngle(endA, RADIANS));
  let startV = Vector.polarToCartesian(radius, Math.convertAngle(startA, RADIANS));
  for (let a = startA; a < 360; a += spc) {
    cirPath.push(Vector.polarToCartesian(radius, Math.convertAngle(a, RADIANS)));
    let amt = (a % delta) / (endA - startA);
    let tv = new Vector();
    let tv2 = Vector.lerp(startV, endV, amt);
    shapePath.push(tv2);
    //console.log('a+spc = ' + (a + spc), 'delta = ' + delta);
    if ((a + spc) % delta === 0) {
      startA += delta;
      endA += delta;
      endV = Vector.polarToCartesian(radius, Math.convertAngle(endA, RADIANS));
      startV = Vector.polarToCartesian(radius, Math.convertAngle(startA, RADIANS));
    }
  }
}

function draw() {
  background(cv, "white");
  ctx.save();
  ctx.translate(cv.width / 2, cv.height / 2);
  if (shapePoints % 2 !== 0) {
    ctx.rotate(-Math.PI / 2);
  } else if (shapePoints === 4) {
    ctx.rotate(-Math.PI / 4);
  }
  drawMorph(5);
  ctx.restore();
}

const drawMorph = function(spc) {
  let ler = map(Math.sin(Math.convertAngle(theta, RADIANS)), -1, 1, 0, 1);
  // ler = random();
  // ler = Math.sin(Math.convertAngle(theta, RADIANS));
  // fill(color(19, 191, 78));
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "green";
  ctx.fillStyle = "green";
  let index = 0;
  for (let i = 0; i < cirPath.length - 1; i++) {
    let start1 = cirPath[i];
    let end1 = shapePath[i];
    let start2 = cirPath[i + 1];
    let end2 = shapePath[i + 1];
    let pV = Vector.lerp(start1, end1, ler);
    let p2V = Vector.lerp(start2, end2, ler);
    ctx.moveTo(pV.x, pV.y);
    ctx.lineTo(p2V.x, p2V.y);
    ctx.stroke();
    index = i;
  }
  let startV = Vector.lerp(cirPath[index + 1], shapePath[index + 1], ler);
  let endV = Vector.lerp(cirPath[0], shapePath[0], ler);
  ctx.moveTo(startV.x, startV.y);
  ctx.lineTo(endV.x, endV.y);
  ctx.stroke();
  theta += spc;
}

const drawCircle = function() {
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "green";
  let index = 0;
  for (let i = 0; i < cirPath.length - 1; i++) {
    let p = cirPath[i];
    let p2 = cirPath[i + 1];
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    index = i;
  }
  ctx.moveTo(cirPath[index + 1].x, cirPath[index + 1].y);
  ctx.lineTo(cirPath[0].x, cirPath[0].y)
  ctx.stroke();
}

const drawShape = function() {
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "green";
  let index = 0;
  for (let i = 0; i < shapePath.length - 1; i++) {
    let p = shapePath[i];
    let p2 = shapePath[i + 1];
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    index = i;
  }
  ctx.moveTo(shapePath[index + 1].x, shapePath[index + 1].y);
  ctx.lineTo(shapePath[0].x, shapePath[0].y)
  ctx.stroke();
}