"use strict";

var iterations = 200;
const escapeRadius = 2 ;
const memo = {};

function isInMandelForLoop(Cr, Ci) {
  // if(memo['a'+Cr+'b'+Ci]) {return memo['a'+Cr+'b'+Ci]}
  var Zr = 0;
  var Zi = 0;
  var Tr = 0;
  var Ti = 0;
  var n = 0;

  for (; (Tr + Ti) <= escapeRadius && n < iterations; ++n) {
    Zi = 2 * Zr * Zi + Ci;
    Zr = Tr - Ti + Cr;
    Tr = Zr * Zr;
    Ti = Zi * Zi;
  }
  for (var e = 0; e < 4; ++e) {
    Zi = 2 * Zr * Zi + Ci;
    Zr = Tr - Ti + Cr;
    Tr = Zr * Zr;
    Ti = Zi * Zi;
  }
  // return [n, Tr, Ti];
  // memo['a'+Cr+'b'+Ci] = {n, Tr, Ti};

  return {n, Tr, Ti};
}

var ctx, img;

var minNum = -2;
var maxNum = 2;
// var minNum = 0.37099943;
// var maxNum = 0.3709994325;
var topIndent = 0;
var leftIndent = 0;

function mapRange(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function mapToZoom(num, in_min, in_max){
  return mapRange(num, in_min, in_max, minNum, maxNum)
}
function mapToRGB(num, in_min, in_max){
  return mapRange(num, in_min, in_max, 0, 255)
}

function handleOnWheelScroll(e) {
  // console.log(e);
  // console.log(e.wheelDelta);
  // console.log(e.which);
  if(!e.wheelDelta) {return}
  minNum = minNum * (1 - 10/e.wheelDelta);
  maxNum = maxNum * (1 - 10/e.wheelDelta);
  console.log(minNum, maxNum);

  render();
}


function checkKey(e) {

  e = e || window.event;
  const change = (maxNum - minNum)/10;
  if (e.keyCode == '38') {
    // up arrow
    topIndent -= change;
  }
  else if (e.keyCode == '40') {
    // down arrow
    topIndent += change;

  }
  else if (e.keyCode == '37') {
    // left arrow
    leftIndent -= change;

  }
  else if (e.keyCode == '39') {
    // right arrow
    leftIndent += change;

  }

  render();

}

var canvas;
document.addEventListener("DOMContentLoaded", function (event) {
  canvas = document.getElementById('canvas');
  const maxHeightWidth = Math.min(window.innerHeight, window.innerWidth) - 10;
  canvas.width = maxHeightWidth;
  canvas.height = maxHeightWidth;

  canvas.addEventListener("wheel", handleOnWheelScroll);
  document.addEventListener("keydown", checkKey);

  ctx = canvas.getContext('2d');
  // ctx.fillStyle = "#FFFF00";
  img = ctx.createImageData(canvas.width, canvas.height);


  render();


});

function render() {

  var STARTisInMandelForLoop = Date.now();
  let pixels = 0;

  for (let i = canvas.height; i > 0; i--) {
    for (let j = canvas.width; j > 0; j--, pixels ++) {
      const res = isInMandelForLoop(
        leftIndent + mapToZoom(canvas.width - j, 0, canvas.width),
        topIndent + mapToZoom(canvas.height - i, 0, canvas.height)
      );
      // const color = /*255 -*/ mapToRGB(res.n, 0, iterations);
      const color = /*255 -*/ mapToRGB(res.n - Math.log(Math.sqrt(res.Tr+res.Ti)), 0, iterations);

      var v = 1 + res.n - Math.log(Math.log(Math.sqrt(res.Tr+res.Ti)))/Math.log(2.0);
      var v1 = res.n - Math.log(Math.log(Math.sqrt(res.Tr+res.Ti)))/Math.log(2.0);
      // console.log(v);
      img.data[pixels*4 ] = mapToRGB(v1 + res.Ti*2500, 0, iterations);
      img.data[pixels*4 + 1] = mapToRGB(v1 * res.n, 0, iterations);
      img.data[pixels*4 + 2] = mapToRGB(v1, 0, iterations);
      img.data[pixels*4 + 3] = 255;
      // pixels ++;
    }
  }
  ctx.putImageData(img, 0, 0);
  console.log('isInMandelForLoop', Date.now() - STARTisInMandelForLoop);
  // console.log(pixels);
}