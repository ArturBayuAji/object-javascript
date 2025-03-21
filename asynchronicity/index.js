// the way we import package is not important at this point
const fs = require("node:fs");


/* 
ASYNCHRONOUS OPERATIONS DEEP DIVE

asynchronous operations is a an operaion that doesn't freez or stop or block the program
so that the preceding statements can runs independently without caring about the 
completeion of the asynchronous operations (usually a function).
*/

// // Simulating a blocking task
// // this loop takes time
// for (let i = 1; i <= 3e9; i++) {}


// this is asynchronous function
// // Example 1 : delay execution  
// setTimeout(() => {
//     console.log("this runs after 2 seconds")
// }, 2000);

// // Example 2 : reading file
// fs.readFile("./file.txt", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log("data is ready!");
// });




/* 
CREATING ASYNCHRONOUS OPERATIONS

javascript has creatd some asynchronous functions that we need the most, for task that
should be tackled in asynchronous way (non blocking).

Javascript and nodeJS built-in asynchronous functions :
Function	            Description
setTimeout()	        Executes a function after a delay
setInterval()	        Executes a function repeatedly at intervals
fs.readFile()	        Reads a file asynchronously (Node.js)
fs.writeFile()	        Writes to a file asynchronously (Node.js)
fetch()	                Makes an HTTP request (browser & Node.js with node-fetch)
process.nextTick()	    Executes a function as soon as possible after the current task
setImmediate()	        Executes a function immediately after I/O events

we can't make our own custome asynchronous operations (e.g. asynchronous function) 
from scratch UNLESS we wrap javascript's built in asynchronous functions
(e.g. setTimeOut(), etc) with our custome function. 

use case : fetch multiple posts or comments in PARALLEL or even display them in parallel way,
so we dont need to wait each fetch or displaying sequentially. This implementation will 
boost the program's execution time.
*/




/* 
PROMISE

A Promise is an object in JavaScript that represents a value that might be 
available now, in the future, or never. 

A Promise takes a function (executor function) with two arguments:
resolve → Call this function when the operation succeeds.
reject → Call this function when the operation fails.

That said, Promise contains uncertainty aspect :
- is it going to provide expected value (resolved) ?
- is it going to provide unexpected value (rejected) ?
- does the value will be available soon?

Promise in relation with asynchronous operations :
- Promise is an object that provide a structured WAY to handle asynchronous results or 
  operations. 
- Returning a Promise DOES NOT make a function asynchronous.
- A Promise is just an object that represents a future value.
- The code inside a Promise constructor runs synchronously.
- Only when resolve() or reject() is called does the async behavior kick in—but only
  if it wraps an actual async operation.
- Promises are just a structured way to handle async operations. They don't "create" 
  async behavior. They just make handling async results easier (e.g., .then(), .catch(),
  Promise.all(), etc..).
*/


/* 
this function perform asynchronous operations (non blocking execution), 
making it asynchronous function
*/
function testYourLuck() {
    /* the value of n1 promise is available in the future, 
    regardless will it resolved or rejected */
    const n1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            let userNum = Math.floor(Math.random() * 10) + 1;
            if (userNum <= 5) {
                resolve(`Success! n1 = ${userNum}`);
            } else {
                reject(`Failed! n1 = ${userNum}`);
            }
        }, 2000);
    });

    // the value of n2 promise is available immediately, regardless resolved or rejected
    const n2 = new Promise((resolve, reject) => {
        let userNum = Math.floor(Math.random() * 10) + 1;
        if (userNum <= 5) {
            resolve(`Success! n2 = ${userNum}`);
        } else {
            reject(`Failed! n2 = ${userNum}`);
        }
    });

    // if one of the promise is rejected, this promise below is rejected
    return Promise.all([n1, n2]) 
    /* 
    other than this we can find Promise that sattles faster,
    and other usefull static method. 
    */
}


// console.log("Start!");

// testYourLuck()
//     .then(data => console.log(data))
//     .catch(reason => console.log(reason));

// console.log("End!");





/* 
ASYNC/AWAIT

is a modern syntax in JavaScript that allows you to work with asynchronous
operations in a way that looks synchronous. It is built on top of Promises
but makes writing and reading asynchronous code much easier.
*/

function getNum(_which, _delay) {
    return new Promise((resolve, reject) => {
        let delay = _delay * 1000;
        setTimeout(() => {
            let num = Math.floor(Math.random() * 100) + 1;
            if (num <= 90) {
                resolve(`n${_which} = Success`);
            } else {
                reject(`n${_which} = Failed`);
            }
        }, delay);
    });
}

async function testYourLuckSequentialExe() {
    try {
        const startTime = performance.now();
        console.log("\nSequential execution starts");

        let n1 = await getNum(1, 3); // this promise sattles in 3 seconds
        console.log(n1);
        let n2 = await getNum(2, 2); // this promise sattles in 2 seconds
        console.log(n2);
        let n3 = await getNum(3, 1); // this promise sattles in 1 seconds
        console.log(n3);
        let n4 = await getNum(4, 2); // this promise sattles in 2 seconds
        console.log(n4);

        const sequentialEnd = performance.now();
        console.log(`call to 'testYourLuckSequentialExe()' took ${Math.floor((sequentialEnd - startTime) / 1000)} seconds\n`);
        // -> call to 'testYourLuckSequentialExe()' took 8 seconds
        return [n1, n2, n3, n4];

    } catch(e) {
        console.log(e);
    }
}

async function testYourLuckParallelExe() {
    try {
        const startTime = performance.now();
        console.log("Parallel execution starts");

        let n1 = getNum(1, 4); // this promise sattles in 4 seconds
        let n2 = getNum(2, 2); // this promise sattles in 2 seconds
        let n3 = getNum(3, 1); // this promise sattles in 1 seconds
        let n4 = getNum(4, 2); // this promise sattles in 2 seconds

        // const result = await Promise.all([n1, n2, n3, n4]); // only take 4 seconds 
        // // if we don't want one failure/rejection ruin everything :
        const result = await Promise.allSettled([n1, n2, n3, n4]);
        console.log("Parallel result: ", result);
        const parallelEnd = performance.now();
        console.log(`call to 'testYourLuckParallelExe()' took ${Math.floor((parallelEnd - startTime) / 1000)} seconds\n`);
        // -> call to 'testYourLuckParallelExe()' took 4 seconds
        return result; 

    } catch(e) {
        console.log("Parallel failed: ", e);
    }
}

async function runTest() {
    const attempt1 = testYourLuckParallelExe();
    const attempt2 = testYourLuckParallelExe();
    const attempt3 = testYourLuckParallelExe();

    // executing function that perform parallel operations in parallel way
    await Promise.all([attempt1, attempt2, attempt3]);
    await testYourLuckSequentialExe();
}


// testYourLuckParallelExe();
// testYourLuckSequentialExe();
runTest();

console.log("This line is after the async function calls (main thread).");