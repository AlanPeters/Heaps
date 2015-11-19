//heap tester

//heap = require('./ArrayHeap.js');

heap = require('./DynamicHeap.js');

var myHeap = new heap();

myHeap.insert(1);
myHeap.insert(20);


console.log(myHeap);

myHeap.insert(10);
myHeap.insert(5);

console.log(myHeap);
myHeap.insert(.5);

console.log(myHeap);

/*
 * console.log(myHeap.delete());
console.log(myHeap);
console.log(myHeap.delete());
console.log(myHeap);
console.log(myHeap.delete());
console.log(myHeap);

myHeap.insert(4);
console.log(myHeap);
myHeap.insert(12);
console.log(myHeap);
myHeap.insert(3);
console.log(myHeap);
myHeap.insert(7);
console.log(myHeap);
myHeap.insert(50505);
conisole.log(myHeap);
*/
