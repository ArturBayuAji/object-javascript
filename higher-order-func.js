function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

const labels = [];

// // calling 'repeat' with 'action' argument as a annonymus function
// repeat(5, (i) => {
//     labels.push(`Unit ${i + 1}`);
// });

// above function is the same as this below (but has a name)
function myFunc(i) {
    labels.push(`Unit ${i + 1}`);
}
// repeat(5, myFunc);

// console.log(labels)


// funciton that creates new function
// function greaterThan(n) {
//     return m => m > n;
// }
// above function are the same like below
function greaterThan(n) {
    function localFunc(m) { // closure function
        return m > n
    }
    return localFunc;
}
// //  greaterThan10 = localFunc,  n = 10
// let greaterThan10 = greaterThan(10);
// //          localFunc(11),      m = 11, n = 10
// console.log(greaterThan10(11));



// function that change other function
function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
// function above same with below
function noisy(f) {
    function localFunc(...args) { // closure function
        console.log("calling with", args);
        //           Math.min([3, 2, 1]) = 1
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    }
    return localFunc;
}

// // f = Math.min
// // localFunc()
// noisy(Math.min)(3, 2, 1);



// function that provide new types of control flow
function unless(test, then) {
    if (!test) {
        return then();
    }
}

// // calling 'repeat' function
// repeat(3, n => {
//     unless(n % 2 == 1, () => {
//         console.log(n, "is even")
//     });
// });


// built in forEach method for array
const array1 = ["a", "b", "c"];
array1.forEach((el) => {
    console.log(el);
});