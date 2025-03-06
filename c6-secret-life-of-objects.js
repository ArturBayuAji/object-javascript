function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}

// object as prototype
const protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    },
    run(destination) {
        console.log(`${this.type} rabbit running to the ${destination}`)
    }
};

// constructor function
function makeRabbit(_type) {
    const rabbit = Object.create(protoRabbit);
    rabbit.type = _type;
    return rabbit
}

// using class notation to define constructor function and prototype in one place
class Rabbit { 
    /*
    automatically make Rabbit.prototype that inherited to the instance
    by accessing '__proto__' property.
    */
    speed = 3;
    constructor(_type) {
        this.type = _type;
        // .__proto__
    }
    // instance method (included on the prototype or '.__proto__' propoerty)
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
    run(destination) {
        console.log(`${this.type} rabbit running to the ${destination}`)
    }
    // polymorphism
    toString() {
        return `a ${this.type} rabbit`;
    }
}

class RandomSource {
    #max;
    constructor(_max) {
        this.#max = _max;
        // __proto__
    }
    getNumber() {
        return Math.floor(Math.random() * this.#max);
    }
}


// function to show the prototype objects, name and the chain of an object / function
function visualizeProtos(obj) {
    let proto = obj;
    let protoChain = [];
    const protoList = [
        {"Function.prototype": Function.prototype},
        {"Array.prototype": Array.prototype},
        {"Date.prototype": Date.prototype},
        {"Map.prototype": Map.prototype},
        {"Object.prototype": Object.prototype},
    ];

    do {
        proto = Object.getPrototypeOf(proto);
        if (!(proto == null)) {
            const correspondingProto = protoList.find((obj) => {
                let key = Object.keys(obj)[0];
                let val = obj[key];
                if (proto === val) {
                    return true;
                }
            });
            console.log(proto);
            console.log(`is ${Object.keys(correspondingProto)[0]}\n`);
            protoChain.push(Object.keys(correspondingProto)[0]);
        }
    } while (proto);
    protoChain.push("null");
    console.log(`Prototype chain : ${protoChain.join(" --> ")}\n`);
}


const whiteRabbit = {type: "white", speak};
const hungryRabbit = {type: "hungry", speak};
const brownRabbit = makeRabbit("brown");
const greyRabbit = Object.create(protoRabbit);
const killerRabbit = new Rabbit("killer");
const cuteRabbit = new Rabbit("cute");
const randNum = new RandomSource(30);


// Map (noun) data structure
// using plain object to create map (not recommended), that maps names to ages
const ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
    // __proto__ = Object.prototype
};

// console.log(`Julia is ${ages["Julia"]}`);
// console.log(`Is Jack's age known? ${"Jack" in ages}`);
// // we didn't specify a name 'toString'
// console.log(`Is toString's age known? ${"toString" in ages}`); // -> true

// recommended way is to use class called Map
let agesData = new Map();
agesData.set("Boris", 39);
agesData.set("Liang", 22);
agesData.set("Julia", 62);

// console.log(`Julia is ${agesData.get("Julia")}`);
// console.log(`Is Jack's age known? ${agesData.has("Jack")}`);
// console.log(`Is toString's age known? ${agesData.has("toString")}`); // -> false

// /* 
// lets see the prototype chain of 'agesData' to find why we don't have 'toString'
// which is a method that in part of 'Object.prototype' that inherited to
// every object.z
// */
// visualizeProtos(agesData);
// // we know it has the 'Object.prototype' on the chain, does 'toString' in there?
// console.log(Object.getOwnPropertyNames(agesData.__proto__.__proto__));
// /* 
// 'toString' is in there, that being said, it might be specific on how the
// instance method 'has()' works, it might not look up into certain prototype.
// */

// // testing the polymorphysm
// console.log(cuteRabbit.toString());
// console.log(String(cuteRabbit));

/*
array like object that have 'length' property holding a number
and numbered properties for each of their elements.
*/
const arrLikeObj = {
    length: 2,
    0: "A",
    1: "B"
};


// Array.prototype.forEach.call(arrLikeObj, (elt) => console.log(elt));
// xArr = ["sd", true, 2];
// xArr.forEach((elt) => console.log(elt));


class Temperature {
    constructor(_celsius) {
        this.celsius = _celsius;
    }

    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}

// console.log(Temperature[Symbol.hasInstance]);

// let temp = new Temperature(22);
// console.log(temp.fahrenheit);
// temp.fahrenheit = 86;
// console.log(temp.fahrenheit);
// console.log(temp.celsius);
// let boil = Temperature.fromFahrenheit(212);
// console.log(boil.celsius);

// let sym = Symbol("name");
// console.log(sym);
// console.log(sym == Symbol("name"));

// Rabbit.prototype[sym] = 55;
// console.log(killerRabbit[sym]);
// console.log(cuteRabbit[sym]);

// const length = Symbol("length");
// Array.prototype[length] = 0;
// // console.log(Object.getOwnPropertyNames(Array.prototype));
// console.log([1,2].length);
// console.log([1,2][length]);

// let myTrip = {
//     length: 2,
//     0: "Lankwitz",
//     2: "Babelsberg",
//     [length]: 21500
// };
// console.log(myTrip[length], myTrip.length);
// console.log(Object.getOwnPropertyNames(myTrip));


// let okIterator = "OK"[Symbol.iterator]();
// console.log(okIterator.next());
// console.log(okIterator.next());
// console.log(okIterator.next());






// /*
// UNDERSTANDING SYMBOL TYPE
// symbol is one of javascript primitive data types (not an object, 
// has no methods and properties).
// */
// const sym1 = Symbol();
// const sym2 = Symbol("foo"); // the string (key) just an identifier
// const sym3 = Symbol("foo");

// /* 
// Symbol() creates a new unique symbol and never equal to the other symbol,
// this is called local symbol.
// */
// console.log(sym1 === sym1); // true
// console.log(sym2 === sym3); // false
// console.log(Symbol() === Symbol()) // false

// /*
// Symbol.for(key) search the specific symbol in global symbol registry list, 
// if found return it, make it otherwise (and store in global symbol registry).
// this is shared symbols or global symbols.  
// */
// const sym4 = Symbol.for("yoo");
// /*
// this below dosn't make a new symbol, because symbol with key "yoo"
// already exist in the registry.
// */
// const sym5 = Symbol.for("yoo");

// console.log(Symbol.for("yoo") === sym4); // true
// console.log(Symbol.for("hello") === Symbol.for("hello")); // true
// console.log(sym4 === sym5);

// // retrieves the key of a global symbol
// console.log(Symbol.keyFor(sym5)); // yoo

// // ============== end of UNDERSTANDING SYMBOL TYPE ================





// /* 
// UNDERSTANDING Symbol.iterator STATIC DATA PROPERTIY

// implementation approximation :
// class Symbol {
//     static iterator = Symbol.for('Symbol.iterator');
//     constructor {}
// }
// Symbol.iterator is a constant data (same and shared accross symbol type).

// JavaScript has a built-in iteration mechanism that allows objects 
// to be iterated using for...of loops. This mechanism is based on two key 
// concepts:
//     1.  The Iterable Protocol
//         Defines objects that can be iterated (for...of, spread, etc.)
//     2.  The Iterator Protocol
//         Defines how an iterator works (with .next() method)
// At the core of these protocols is the Symbol.iterator static property.

// An iterable is any object that follows the iterable protocol, which means:
//     1. It has a method with the key Symbol.iterator
//     2. That method returns an iterator
// If an object follows the iterable protocol, it can be used with 
// for...of loops, spread syntax (...), and Array.from()
// */
// const arr = [10, 20, 30]; // arrray is an object
// // lets see if it has method with Symbol.iterator as a key
// console.log(typeof arr[Symbol.iterator]); // -> function
// /* 
// that function (method) should returns an iterator. so arrays have 
// have the method built-in. That makes arrays are iterable
// */

// /* 
// function that implements iterable protocol or checks whether an object is 
// iterable or not (having a method with key Symbol.iterator)
// */
// function isIterable(obj) {
//     if (obj[Symbol.iterator]) {
//         return true;
//     }
//     return false;
// }

// const myObj = {a: 1, b: "hello"};
// console.log(isIterable(arr), "\n");

// // string is an iterable, lets prove that :
// const myStr = "hello world";
// console.log(`the string is ${myStr}`);
// if (isIterable(myStr)) {
//     //                  |      function      |();  call the func immediately
//     let myStrIterator = myStr[Symbol.iterator]();
//     console.log(myStrIterator); // -> Object [String Iterator] {}
//     console.log(Object.getOwnPropertyNames(myStrIterator.__proto__));
//     // -> ['next']
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(myStrIterator.next());
//     console.log(`\n`);
// }

// /* 
// PERFORMING ITERATOR PROTOCOL
// An iterator is an object that:

// 1. Has a .next() method
// 2. .next() returns an object { value, done }
//         value: the current value
//         done: true when iteration is finished, false otherwise
// */

// const arr1 = [10, 20, 30];
// // manually using an iterator
// //                          |      function     |();  immediately call
// const arr1BuiltInIterator = arr1[Symbol.iterator]();
// console.log(arr1BuiltInIterator); // -> Object [Array Iterator] {}
// console.log(Object.getOwnPropertyNames(arr1BuiltInIterator.__proto__));
// // -> ['nexe']
// console.log(arr1BuiltInIterator.next()); // -> { value: 10, done: false }
// console.log(arr1BuiltInIterator.next()); // -> { value: 20, done: false }
// console.log(arr1BuiltInIterator.next()); // -> { value: 30, done: false }
// console.log(arr1BuiltInIterator.next()); // -> { value: undefined, done: true }
// console.log("\n");

// // creating custome iterable object (using object initializer)
// const myCustomeIterableObj = {
//     data: [1, 3, 5],

//     // iterator method
//     [Symbol.iterator]() {
//         let index = 0;
//         // return the iterator object
//         return {
//             next: () => {
//                 if (index < this.data.length) {
//                     return {value: this.data[index++], done: false};
//                 } else {
//                     return {done: true};
//                 }
//             },
//         }
//     }
// }
// console.log("the object is", myCustomeIterableObj);
// console.log(isIterable(myCustomeIterableObj)); // -> true
// // prove using for...of
// for (const val of myCustomeIterableObj) {
//     console.log(val);
// }
// //                           |             function              |(); // call 
// const myCustomeObjIterator = myCustomeIterableObj[Symbol.iterator]();
// console.log(typeof myCustomeObjIterator); // -> object
// console.log(Object.getOwnPropertyNames(myCustomeObjIterator)); // -> ['next']

// // ======= end of UNDERSTANDING Symbol.iterator STATIC DATA PROPERTIY =========






// /* 
// UNDERSTANDING THE SPREAD (...) SYNTAX
// spread syntax is used to spread or EXPAND any iterable into
// INDIVIDUAL ELEMENTS.

// Only iterable values, like Array and String, can be spread in 
// array literals ([]) and argument lists. Many objects are not iterable, 
// including all plain objects that lack a Symbol.iterator method.

// spread syntax only creates a shallow copy (not deep copy)
// */

// // expanding an array into individual elements
// const numbers = [1, 2, 3];
// console.log(...numbers);
// // copy of an array to prevents modifying the original array
// const original = [2, 4, 5, 9];
// const copyReference = original;
// const copy = [...original];
// console.log(original);
// console.log(copy);
// console.log(copy === original); // -> false
// console.log(original === copyReference); // -> true
// copyReference[2] = "foo";
// console.log(original);
// // combining arrays (analogus to .concat())
// const first = [1, 2, 3];
// const second = [4, 5, 6, 7];
// const combined = [...first, ...second];
// console.log(combined);
// // adding elements to an array
// const numbers1 = [2, 3, 4];
// const newNumbers1 = [1, ...numbers1, 5];
// console.log(newNumbers1);

// // copying an object (prevents modifying the original)
// const person = { name: "Alice", age: 25 };
// const personReference = person;
// const copiedPerson = { ...person };
// console.log(person);
// console.log(person === personReference); // -> true
// console.log(person === copiedPerson); // -> false (new object, not reference)
// personReference.age = 30; // this will modify person
// console.log(person);
// // combining or merging objects
// const job = {title: "Engineer", salary: 5000 };
// const fullProfile = { ...person, ...job };
// console.log(fullProfile);

// // spreading a string and contain the individual element on an array
// const spreadedStringArr = [ ..."jellow" ];
// const spreadedStringObj = { ..."yoo" };
// console.log(spreadedStringArr);
// console.log(spreadedStringObj);

// // expanding an array as function arguments
// function sum(a, b, c) {
//     return a + b + c;
// }
// const numbers2 = [2, 4, 6]
// console.log(sum(...numbers2));
// // with other built in function
// console.log(Math.max(...numbers2));
// console.log(Math.min(...numbers2));
// console.log(Math.min(2, 4, 5, 20));

// const nestedObj = { nested: {a: {b: 1} }, prop1: "hello", prop2: "world" };
// const shallowCopy = { ...nestedObj };
// console.log(shallowCopy);






// /* 
// for/of loop requires :
// iterable object --> has method [Symbol.iterator] --> iterator object.
//                                                        |__ next()
//                                                        |__ value
//                                                        |__ done
// */


// /*
// x = [3, 4, 7]
// List.fromArray(x);
// y = {
//     value: 3,
//     rest: {
//         value 4,
//         rest: {
//             value : 7,
//             rest: null
//         }
//     }
// }
// */

// class List {
//     constructor(_value, _rest) {
//         this.value = _value;
//         this.rest = _rest;
//     }

//     // TODO: write toString method

//     get length() {
//         // this method is recursive if there is 'rest' left
//         return 1 + (this.rest ? this.rest.length : 0);
//     }

//     static fromArray(array) {
//         // result = List {value: 7, rest: null}
//         // result = List {value: 4, rest: {value: 7, rest: null}}
//         // result = List {value: 3, rest: {value: 4, rest: {value: 7, rest: null}}}
//         let result = null; 
//         for (let i = array.length - 1; i >= 0; i--) {
//             // 'this' at static method points to the class 'List'
//             // new this --> new List --> calling the constructor
//             result = new this(array[i], result);
//         }
//         return result;
//     }

//     // iterator method (returns itrator object)
//     [Symbol.iterator]() {
//         // local variable to hold the current node
//         let current = this;
//         // return the iterator object (object initializer-based object)
//         return {
//             next() {
//                 if (current === null) {
//                     return {done: true};
//                 }
//                 let value = current.value;
//                 current = current.rest; // move to the next node
//                 return {value, done: false};
//             }
//         };
//     }
// }

// const myArr = [3, 4, 7];
// const myList = List.fromArray(myArr);
// console.log(myList);

// //                     |    func or method   |();   call it immediately
// const iteratorMyList = myList[Symbol.iterator]();
// console.log(iteratorMyList);
// console.log(Object.getOwnPropertyNames(iteratorMyList));
// console.log(iteratorMyList.next());
// console.log(iteratorMyList.next());
// console.log(iteratorMyList.next());
// console.log(iteratorMyList.next());
// console.log(iteratorMyList.next());

// // proving myList is iterable
// for (let el of myList) {
//     console.log(el);
// }

// // spread syntax only creates a shallow copy (not deep copy)
// console.log(...myList);
// console.log({prop1: "test", ...myList, lastProp: true});
// console.log([0, ...myList, 8]);








// /* 
// UNDERSTANDING POLYMORPHISM

// Polymorphism allows different objects to be used interchangeably because 
// they share a common interface (i.e., they implement the same methods).

// Poly -> "many", Morph -> "forms"
// allowing different objects or classes (that have expected interface(s)) works
// with the same code (polymorphic code).
// */

// /* 
// interface or polymorphic code : toString()
// any kind of object that supports this interface can plugged into the code
// and will be able to work with that.
// Reason : 
// because almost all object have their own toString() method and even
// if they don't, they inherit it from Object.prototype.
// */
// const now = new Date();
// console.log(now.toString());

// const guestsAge = new Map();
// guestsAge.set("Artur", 22);
// guestsAge.set("Ananta", 2025-2007);
// console.log(guestsAge.toString());

// const arr = [1, 3, "jellow", false, {name: "john", age: 22}];
// console.log(arr.toString());

// /*
// interface or polymorphic code : length
// works with array and string
// reason :
// because string and array have the length property holding a number,
// and numbered properties for each of their elements.
// */
// console.log("Javascript".length);
// console.log("Javascript"[2]);
// console.log(arr.length);
// console.log(arr[3]);

// // custome onject that will work with 'length' interface.
// const arrayAndStringLikeObj = {
//     length: 4,
//     0: "J",
//     1: "a",
//     2: "v",
//     3: "a",
// }
// console.log(arrayAndStringLikeObj.length);
// console.log(arrayAndStringLikeObj[2])

// // ================= end of UNDERSTANDING POLYMORPHISM ==================







// /*
// UNDERSTANDING SET
// Set is a standard built-in object. Set is also iterable.
// it is a collection that stores unique values (not allowing dupicates element)
// that can store any iterable data type (primitives, objects, 
// references to functions).
// */
// const mySet = new Set();
// console.log(mySet); // -> Set(0) {}
// const numbers = new Set([1, 2, 2, 3, 4, 4, 5]);
// console.log(numbers); // -> Set(5) { 1, 2, 3, 4, 5 }
// const rawNum = [1, 2, 2, 3, 4, 4, 5];
// const uniqueNumbers = [...new Set(rawNum)];
// console.log(uniqueNumbers);





class Group {
    constructor(){
        this.group = [];
    }

    add(value) {
        // add the value to the group, if the value is not already a member.
        if (!(this.group.includes(value))) {
            this.group.push(value);
        }
    }

    delete(value) {
        // does the value in in the group? if so delete it
        let member = this.group.find((member) => value === member);
        if (member) {
            // this.group[this.group.indexOf(member)] = "deleted item";
            let elToRemove = this.group.indexOf(member);
            this.group.splice(elToRemove, 1);
        } else {
            console.log(`${value} is not on the group at the first place`);
        }
    }

    has(value) {
        // is 'value' in 'data' ?
        return this.group.includes(value);
    }

    static #isIterable(value) {
        // does this value implements iterator protocol?
        return value[Symbol.iterator];
    }

    static from(iterable) {
        // 'this' on static method refers to the class which is 'Group'
        if (this.#isIterable(iterable)) {
            const result =  new this();
            for (let member of iterable) {
                result.add(member);
            }
            return result;
        } else {
            throw new TypeError("input should be iterable");
        }
    }

    /* 
    make iterator interface for the 'Group' instance (implement iterator protocol)
    NOT for the array, but for the 'Group' instance!
    the array (GroupInstance.group) surely have its built in terator interface.
    but the instance of Group is your own custome.
    */ 
    [Symbol.iterator]() {
        // copy the data
        let data = this.group;
        // tracker
        let i = 0;
        // return iterator object
        return {
            next() {
                // capture the current value
                let _value = data[i];
                if (_value === undefined) {
                    return {done: true};
                }
                // update the tracker (to move to next value)
                i++;
                return {value: _value, done: false};
            }
        };
    }
    
}


const group1 = Group.from([1, 2, 3, 3, 5, 7, 7])
console.log(group1);
console.log(group1.has(1)); 

const group1Iterator = group1[Symbol.iterator](); // returns the iterator obj
console.log(group1Iterator.next());
console.log(group1Iterator.next());
console.log(group1Iterator.next());
console.log(group1Iterator.next());
console.log(group1Iterator.next());
console.log(group1Iterator.next());

// proving with for/of
for (let member of group1) {
    console.log(member);
}

