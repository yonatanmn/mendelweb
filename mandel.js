
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
