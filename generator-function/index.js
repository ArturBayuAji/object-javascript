import { visualizeProtos } from "../all-about-objects/my-obj-utils.mjs";

/* 
GENERATOR FUNCTION DEEP DIVE

Generator functions are a powerful tool in JavaScript that let you POUSE and RESUME function 
execution. This allows CONTROLLED ITERATION over data, rather than executing everything 
at once.

A generator function is a special kind of function that:
- Can be paused during execution.
- Can be resumed from where it left off.
- Returns a Generator object, which you can manually step through.

Syntax
Generator functions use:
- The `function*` keyword (instead of function).
- The `yield` keyword to pause execution and return values.

Generators function allowing "lazy" execution, yielding one value at a time.
- Efficient memory usage (no need to store all values at once).
- Fine control over execution (you decide when to continue).

in javascript, Generator is not a global constructor, so there is no Generator.prototype,
because Generator doesn't exist in the first place. you will get referenceError.
*/

function* simpleGen() {
    console.log("first `next` includes this.");
    yield "Hello";
    console.log("second `next` includes this.")
    yield "Wrold";
}

/* 
How it works ?
1. A generator function returns a generator object
2. The generator object has `.next()` method that runs the function untill it hits `yield`
3. The function executeion is poused at `yield`, and return { value, done }
4. When `.next()` called again, the function resumes from the last `yield`
5. When there are no more `yield` statement, { value : undefined, done: true } is returned.
*/
const gen = simpleGen(); // returns a generator object

console.log(gen.next());
console.log(gen.next());


// /* 
// x++ means incrementing x by 1, and returns the value before incrementing 
// */
// let x = 1;
// console.log(x++); // 1
// console.log(x); // 2

// /* 
// ++y means incrementing y by 1, and returns the value after incrementing
// */
// let y = 1;
// console.log(++y); // 2
// console.log(y); //2



// custome iterable object
const range = {
    from: 1,
    to: 5,

    // // using the regular way to implement iterator protocol
    // [Symbol.iterator]() {
    //     // `this` at this scope reference to object returned by range, {from : 1, to: 5}
    //     let current = this.from;
    //     let end = this.to;
    //     return {
    //         next() {
    //             /* `this` at this point reference to the object returned by
    //             [Symbol.iterator] which is { next: [Function: next] } or object containing
    //             method `next` */
    //             if (current <= end) {
    //                 return {value: current++, done: false};
    //             }
    //             return {done: true};
    //         }
    //     };
    // }

    // using generator function
    *[Symbol.iterator]() {
        for (let i = this.from; i <= this.to; i++) {
            yield i;
        }
    }
    
};


const rangeIterator = range[Symbol.iterator](); // returns a generator object
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());

// for/of should be working because we implemented the iterator protocol on `range`
for (let num of range) {
    console.log(num);
}

