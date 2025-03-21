/* 
import all bindings from a module at the same time. 'dayUtils' is an object 
holding all the module’s exports.
*/
// ECMAScript style import module
import * as dayUtils from "./dayname.js";
import seasonName from "./seasonname.js";
// importing INI file parser package frome NPM
import ini from "ini"
// // Common JS style import module (delete "type": "module" on 'package.json')
// const circle = require('./circle.js');
// const dayUtils1 = require("./dayname.js");
// const seasonName1 = require("./seasonname.js");
// const ini = require("ini");
// const prompt = require("prompt-sync") ();

/* 
this is module system conflict because our project is using ES Modules : 
"type": "module" on 'package.json'
(ECMAScript Modules, ESM) but we're trying to use CommonJS (require()) 
in the same file.
so, pick one of them.

Key Difference Between 'require' (CommonJS) and 'import' (ES Modules)
1️⃣ Timing of Execution
- CommonJS (require): Modules are loaded dynamically at runtime when require() is called.
- ES Modules (import): Modules are statically loaded before execution (during parsing).
📌 What This Means:
- With CommonJS, you can call require() anywhere in your code, even inside a function.
- With ES Modules, import statements must be at the top level and cannot be inside functions.

note: desctructuring when loading a modules is common.

RECOMMENDED : ES modules or ECMAScript modules (including the file structure);
*/

// ECMAScript style import in use
let now = new Date();
// console.log(`Today is ${dayName(now.getDay())}`);
console.log(`Today is ${dayUtils.dayName(now.getDay())}`);

console.log(seasonName);

console.log(ini.parse("x = 10\ny = 20"));

// // Common JS style import in use
// console.log(`The area of a circle of radius 4 is ${circle.area(4)}`); 