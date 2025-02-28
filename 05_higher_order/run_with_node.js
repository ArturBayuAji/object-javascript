const SCRIPTS = require("./code/scripts");

// load dependencies
require("./code/load")("code/scripts.js", "code/chapter/05_higher_order.js", "code/intro.js");

// function textScripts(text) {
//   let scripts = countBy(text, char => {
//     let script = characterScript(char.codePointAt(0));
//     return script ? script.name : "none";
//   }).filter(({name}) => name != "none");

//   let total = scripts.reduce((n, {count}) => n + count, 0);
//   if (total == 0) return "No scripts found";

//   return scripts.map(({name, count}) => {
//     return `${Math.round(count * 100 / total)}% ${name}`;
//   }).join(", ");
// }

// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));



/* 
the object contained in SCRIPTS binding. The binding contains an array of objects, 
each of which describes a script. tells us the name of the script, 
the Unicode ranges assigned to it, the direction in which it is written, 
the (approximate) origin time, whether it is still in use, and a link to 
more information. The direction may be "ltr" for left to right, "rtl" for 
right to left (the way Arabic and Hebrew text are written), or "ttb" 
for top to bottom (as with Mongolian writing). The ranges property contains
an array of Unicode character ranges, each of which is a two-element array
containing a lower bound and an upper bound. Any character codes within these
ranges are assigned to the script. The lower bound is inclusive (code 994 is
a Coptic character) and the upper bound is noninclusive (code 1008 isn’t).
*/


// // recreating this built in method below
// const livingScripts = SCRIPTS.filter((el) => el.living);
// // function myFilter(array, test) {
// //     let passed = [];
// //     for (let el of array) {
// //         if (test(el)) {
// //             passed.push(el);
// //         }
// //     }
// //     return passed;
// // }
// // const livingScripts = myFilter(SCRIPTS, (aScript) => aScript.living);
// console.log(livingScripts);



// // recreating this built in method below 
// const rtlNames = (SCRIPTS.filter((el) => el.direction == "rtl")).map((el) => el.name);
// // function myMap(array, transform) {
// //     let mapped = [];
// //     for (let el of array) {
// //         mapped.push(transform(el))
// //     }
// //     return mapped
// // }
// // // extract only "rtl" scripts
// // let rtlScripts = SCRIPTS.filter((el) => el.direction == "rtl");
// // // map every element of 'rtlScript' into its names only
// // let rtlNames = myMap(rtlScripts, (el) => el.name);
// console.log(rtlNames);




// const myArr = [1, "hypotenuse", false, {name: "artur"}];
// const newArr = myArr.map((el, index, arr) => [el, {index: index, array: arr}]);
// console.log(newArr);



// FIRST APROACH : find the script with most character (using built in 'reduce' 2 times)
function characterCount(script) {
    // [[125184, 125259], [125264, 125274], [125278, 125280]]
    return script.ranges.reduce((total, [start, end]) => {
        return total + (end - start);
    }, 0);
}

// const longestScript = SCRIPTS.reduce((tempLongestScript, currentScript) => {
//     /* 
//     because we didn't provide 'initialVal' to 'reduce' method, the element iterations
//     starts from the array element at index 1. so :
//     'currentScript' = SCRIPTS[1];
//     'tempLongestScript' = SCRIPTS[0];
//     */
//     let crScriptRangeLength = characterCount(currentScript);
//     let prevScriptRangeLength = characterCount(tempLongestScript);

//     return crScriptRangeLength > prevScriptRangeLength ? currentScript : tempLongestScript;

// });
// console.log(longestScript);
// let firstScriptLength = characterCount(SCRIPTS[0]);
// let lastScriptLength = characterCount(SCRIPTS[SCRIPTS.length - 1]);
// console.log(firstScriptLength);
// console.log(lastScriptLength);


// // SECOND APPROACH : 
// function characterCount(script) {
//     return script.ranges.reduce((count, [from, to]) => count + (to - from), 0);
// }
// let longestScript = SCRIPTS.reduce((tempResult, elmnt) => {
//     return characterCount(tempResult) < characterCount(elmnt) ? elmnt : tempResult; 
// });

// console.log(longestScript);
// ===========================================================================================




// portion that finds the average year of origin for living and dead scripts in the dataset
// function that calculate average value of an array
function average(array) {
    return array.reduce((accum, currentValue) => accum + currentValue, 0) / array.length;
}

// // filter the SCRIPTS that still living, map them to only their year, average the year, round the result
// console.log(
//     Math.round(average(SCRIPTS.filter((eachElement) => eachElement.living).map((eachElement) => eachElement.year)))
// );
// // filter the SCRIPTS that are dead, map them to only their year, average the year, round the result
// console.log(
//     Math.round(average(SCRIPTS.filter((eachElement) => !eachElement.living).map((eachElement) => eachElement.year)))
// );
// ==========================================================================================





// function to find the corresponding script given the character code.
function characterScript(codePoint) {
    // // first approach
    // for (let script of SCRIPTS) {
    //     // check whether the given codePoint is between (included) in currect script's ranges
    //     if (script.ranges.some(([from, to]) => codePoint >= from && codePoint < to)) {
    //         return script;
    //     }
    // }
    // return null;

    // // second approach
    // check whether the given codePoint is match any script on the dataset, if does return that script. 
    let script = SCRIPTS.find((el) => {
        return el.ranges.find(([from, to]) => codePoint >= from && codePoint < to); // return the element of the el.ranges, or false
    });
    return script ? script : null;
}

// console.log(characterScript(44));



// // working with strings
// /*
// important :
// 1. "Unicode" is a standard that assign a unique numbers to almost every character used in every
//     language in the world. its like giant dictionary of characters and their corresponding number.
// 2. "code point" is unique number assigned to a character in the Unicode standard.
// 3. "code unit" is the actual numerical representation of a character within a specific encoding 
//     (like UTF-16 in javascript).

// codePointAt() return the code point
// charCodeAt() return the decimal representation of the 16-bit code unit (UTF-16).
// String.fromCodePoint(codePoint) get the character from a given Unicode code point in JavaScript

// grinning face (😀) emoji:
// Code Point (at Unicode) = 128512 
// Code Unit (Code Point that encoded into 16-bit numbers, UTF-16 uses by javascript) = 55357 and 56832

// always ask whether a character takes up one or two or more code units, because it will determine the index.
// */
// let myString = "A$😀"
// console.log(`the string is ${myString}\nThe length is ${myString.length}\n`);
// console.log(`'A' : Unicode Code Point is ${myString.codePointAt(0)}, Code Unit is ${myString.charCodeAt(0)}\n`);
// console.log(`'$' : Unicode Code Point is ${myString.codePointAt(1)}, Code Unit is ${myString.charCodeAt(1)}\n`);
// console.log(`'😀' : Unicode Code Point is ${myString.codePointAt(2)}, Code Unit is ${myString.charCodeAt(2)} and ${myString.charCodeAt(3)}`);

// let myEmojisCodePoint = "😀".codePointAt(0);
// // we don't have emojis documented on our dataset
// console.log(characterScript(myEmojisCodePoint)); // null
// console.log(characterScript(1093));
// console.log("a".codePointAt(0));
// console.log(String.fromCodePoint(97));


// Recognizing Text functionality
// funciton that count characters of a given text that belong to certain script
// e.g. '英国的狗说"woof", 俄罗斯的狗说"тяв"' → 61% Han, 22% Latin, 17% Cyrillic
function countBy(items, groupName) {  // 'items' is iterable, 'groupName' is callback function that returns a string of a group name.
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.find((el) => el.name == name);
        // if the element returned (objec) not known or not documented on 'counts' array :
        if (!known) {
            counts.push({name, count:1});
        // if the element returned (object) is known or already documented on 'counts' array :
        } else {
            known.count++;
        }
    }
    return counts; // an array of object(s)
}

// let evenOdd = countBy([0, 1, 2, 3, 4, 5], (n) => {
//     if (n % 2 == 0) {
//         return "even"
//     } else {
//         return "odd"
//     }
// });
// console.log(evenOdd);

// // counts the occurance of fizz, buzz, and fizzbuzz
// // create an array with element int from 1 to 100
// let numOneToHoundred = [];
// for (let i = 1; i <= 100; i++) {
//     numOneToHoundred.push(i);
// }
// let fizzBuzzCounted = countBy(numOneToHoundred, (n) => {
//     if (n % 3 == 0 && n % 5 == 0) {
//         return "FizzBuzz";
//     } else if (n % 3) {
//         return "Fizz";
//     } else if (n % 5) {
//         return "Buzz";
//     }
// });
// console.log(fizzBuzzCounted);

function textScripts(text) {
    //  scripts = [ { name: 'Han', count: 11 }, { name: 'Latin', count: 2 } ]
    let scripts = countBy(text, (char) => {
        let currCharCodePoint = char.codePointAt(0);
        let script = characterScript(currCharCodePoint);
        return script ? script.name : "none";
    }).filter(({name}) => name != "none");

    // summarize the 'scirpts' into single value
    let total = scripts.reduce((accum, {count}) => accum + count, 0);
    if (total == 0) {
        return "No scripts found";
    }

    // if the total is not 0 (the 'scripts' is not empty, there is element on it), reformat the final result
    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
}

// console.log(textScripts('英国的狗说俄罗斯的狗说bc '));
// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));



// /*
// FLATTENING
// Use the reduce method in combination with the concat method to “flatten” an array
// of arrays into a single array that has all the elements of the original arrays.
// */
// let arrays = [[1, 2, 3], [4, 5], [6]];
// let flatArray = arrays.reduce((accum, currentVal) => accum.concat(currentVal));
// console.log(flatArray);
// // → [1, 2, 3, 4, 5, 6]




/*
YOUR OWN LOOP
Write a higher-order function loop that provides something like a for loop statement.
It should take a value, a test function, an update function, and a body function. 
Each iteration, it should first run the test function on the current loop value and 
stop if that returns false. It should then call the body function, giving it the current
value, and finally call the update function to create a new value and start over from the beginning.
When defining the function, you can use a regular loop to do the actual looping.
*/
// 'itterable': anything that itterable
// 'testFunc': test function that return boolean value
function loop(value, testFunc, updateFunc, callbackFunc) {
    for (let i = value; testFunc(i); i = updateFunc(i)) {
        callbackFunc(i);
    }
}
// loop(3, (n) => n > 0, (n) => n - 1, console.log);


/*
Dominant writing direction
Write a function that computes the dominant writing direction in a string of text. 
Remember that each script object has a direction property that can be "ltr" (left to right),
"rtl" (right to left), or "ttb" (top to bottom).

The dominant direction is the direction of a majority of the characters that have a script
associated with them. The characterScript and countBy functions defined earlier in the chapter
are probably useful here.
*/
function dominantDirection(text) {
    let occurance = countBy(text, (char) => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.name : null;
    }).filter(({name}) => name != null);

    let mostFrequent = occurance.reduce((accum, currentVale) => {
        return (accum.count < currentVale.count) ? currentVale : accum;
    });

    return SCRIPTS.find((el) => el.name == mostFrequent.name).direction;
}

console.log(dominantDirection("Hey yooo"));
console.log(dominantDirection("Hey, مساء الخير"));