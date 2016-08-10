var counter = 10000;

iterations = 500000

// var STARTisInMandel = Date.now();
// for (let i = 0; i < counter; i++) {
//     isInMandel(0.2 + i/counter/10)
// }
//
// console.log('isInMandel', Date.now() - STARTisInMandel);

var STARTisInMandelForLoop = Date.now();
for (let i = 0; i < counter; i++) {
  isInMandelForLoop(0.2 + i/counter/10)
}

console.log('isInMandelForLoop', Date.now() - STARTisInMandelForLoop);
