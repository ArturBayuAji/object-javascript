// let match = /\d+/.exec("one two 100");
// console.log(match);
// console.log(match.index);

// // \d must be {1, many}  (at least one, and can be many)
// console.log("one two 100".match(/\d+/));

// // [] must be {0, many}
// let quotedText = /'([^']*)'/;
// console.log(quotedText.exec("she said 'hello'"));

// // (ly) must be {0, 1}
// console.log(/bad(ly)?/.exec("bad"));

// // (\d) must be {1, more}
// console.log(/(\d)+/.exec("1234"));

// // na must be {1, more}
// console.log(/(na)+/.exec("banana"));
// console.log(/(?:na)+/.exec("banana"));

// // d must be {1, more}
// console.log(/\d+/.exec("one two 100"));

// // a must be {1, more}
// console.log(/a+/.exec("caaaaaandy"));

// /* 
// JavaScript uses a convention where month numbers start at zero (so December is 11), 
// yet day numbers start at one. This is confusing and silly. Be careful.
// */
// console.log(new Date());

// console.log(new Date(2025, 2, 10));
// console.log(new Date(2025, 2, 10).getTime());
// console.log(new Date(1741536000000));

// // evaluate the entire RegEx first, then each parentheses
// console.log(/(\d{1,2})-(\d{1,2})-(\d{4})/.exec("1-30-2003"));

// console.log(/(\d{1,2})-(\d{1,2})-(\d{4})/.exec("123-30-300000"));

// function getDate(string) {
//     // what if string = 122-1-30000
//     let [entireEval, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
//     return new Date(year, month, day);
// }

// // console.log(getDate("122-1-30000"));




// ferret, ferry, and ferrari
// -> fer
let matchingRegex = /fer*(et|y|ari)/;
console.log(matchingRegex.exec("ferret"));
console.log(matchingRegex.exec("ferry"));
console.log(matchingRegex.exec("ferrari"));

// any word ending in ious
// "how delicious", "spacious room", "ruinous", "consciousness"
let matchingRegex2 = /ious($|\P{L})/u;
console.log(matchingRegex2.exec("how delicious"));
console.log(matchingRegex2.exec("spacious room"));
console.log(matchingRegex2.exec("ruinous")); // not included
console.log(matchingRegex2.exec("consciousness"));