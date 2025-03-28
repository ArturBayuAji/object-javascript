// when an expression return a promise, it immediately returned regardless of the state.

// const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("from promise");
//     }, 4000);
// });

// function testingPromise() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("from promise");
//         }, 3000);
//     });
// }

// // myPromise
// //     .then(data => console.log(data))
// //     .catch(e => console.log(e));

// // console.log(testingPromise());

// /* 
// Promise.all return a promise that resolved with an array containing the resolved
// values of all promises that executed in parallel
// */
// const parallelPromises = Promise.all([myPromise, testingPromise()]);
// parallelPromises
//     .then(result => console.log(result));

// console.log("Im first!")




// =============== THE TASK ===============
function Promise_all(promises) { // `promises` is an array
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return Promise.resolve([]); // Resolve immediately with an empty array
        }

        let results = []; // Stores resolved values in correct order
        let remaining = promises.length; // Number of unresolved promises

        promises.forEach((promise, index) => {
            promise
                // when this promise is resolved :
                .then(value => {
                    results[index] = value; // Store result at the correct index
                    remaining--; // One less promise to wait for

                    if (remaining === 0) {
                        resolve(results); // If all promises are done, resolve final result
                    }
                })
                .catch(error => {
                    reject(error); // If any promise fails, reject immediately
                });
        });
    });
}


function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500);
    });
}

Promise_all([soon(1), soon(2), soon(3)])
    .then(array => {
        console.log("This should be [1, 2, 3]:", array);
    });


// ❌ Should reject immediately with "X"
Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(() => console.log("We should not get here"))
    .catch(error => console.log("This should be 'X':", error));
