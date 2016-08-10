
"use strict";

var iterations = 500;
const bigNum = 2;


function square(a) {
  return a * a;
}

function countIterBySqAddRecursive(num, prev, i) {
  const calc = square(prev) + num;

  return calc > bigNum || i >= iterations ? i : countIterBySqAddRecursive(num, calc, i + 1);
}

function isInMandel(num) {
  return countIterBySqAddRecursive(num, 0, 0) === iterations;
}

function isInMandelForLoop(num) {
  let n = 0;
  let Zr = 0;
  let Tr = 0;
  for ( ; n<iterations && (Tr)<=bigNum; ++n ) {
    Zr = Tr + num;
    Tr = Zr * Zr;
  }
  return n === iterations
}


