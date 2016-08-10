
"use strict";

var iterations = 500;
const bigNum = 2;

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


