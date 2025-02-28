// method is a properties that hold function values
function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}

function run(speed) {
    console.log(`i can run in ${speed}`)
}

// let greenRabbit = speak("hello");
// let whiteRabbit = {fur: "very furry", type: "white", speak};
// whiteRabbit.speak("jellow");
// console.log(globalThis);

/* 
create a helper function that has rabbit type as its parameter and returns
an object holding that as its type property and our speak function in its speak property
*/
function createRabbit(rabbitType) {
    return {type: rabbitType, speak, run};
    /*
    All rabbits share those same methods (speak, run). Especially for types with many methods, 
    it would be nice if there were a way to keep a type’s methods in a single place, 
    rather than adding them to each object individually like above. It will be 
    tidious if we have 100 method to add.  
    */
}
// const brownRabbit = crateRabbit("brown");
// brownRabbit.speak("what are you looking at?");
// brownRabbit.run("30km/h");

// /* 
// Prototypes are the mechanism by which JavaScript objects inherit features (properties & methods) from one another.
// Every object in JavaScript has a built-in property, which is called its prototype.
// The prototype is itself an object, so the prototype will have its own prototype, 
// making what's called a prototype chain. The chain ends when we reach a prototype that 
// has null for its own prototype.

// When you try to access a property of an object: 
// if the property can't be found in the object itself, the prototype is searched for the property. 
// If the property still can't be found, then the prototype's prototype is searched, and so on until
// either the property is found, or the end of the chain is reached, in which case undefined is returned.

// So when we call myObject.toString(), the browser:
// 1. looks for toString in myObject
// 2. can't find it there, so looks in the prototype object of myObject for toString
// 3. finds it there, and calls it.

// */
// const myObject = {
//     city: "Madrid",
//     greet() {
//         console.log(`Greetings from ${this.city}`);
//     },
// };
  
// myObject.greet(); // Greetings from Madrid
// console.log(myObject.toString()); // 'myObject' inherits a method 'toString' from Object.prototype
// // what is the prototype of 'myObject'?
// console.log(Object.getPrototypeOf(myObject)); 
// // -> [Object: null prototype] {}   this is console output that represent Object.prototype
// console.log(myObject.__proto__);
// // -> [Object: null prototype] {}
// /* 
// - [Object: ...]: This part indicates that the console is displaying an object.
// - null prototype: This is the key part. It tells you that the prototype of this object is null. 
//     But wait, you might think, "I thought Object.prototype was the prototype?" You are correct.
//     The console is being a bit specific here. It's telling you that the ultimate prototype in the chain is null.
//     The console is trying to be precise. It's showing you the end of the prototype chain.
// - {}: This represents the actual object's properties. Because Object.prototype is a built-in object, 
//     it has its own set of properties and methods.
// */

// // the protorype of an object is Object.prototype, this is an object (almost all object have), how to see it:
// let blackRabbit = createRabbit("black");
// console.log(Object.getPrototypeOf(blackRabbit)) // [Object: null prototype] {}
// console.log(typeof Object.getPrototypeOf(blackRabbit)) // Object
// console.log(Object.getPrototypeOf(blackRabbit) == Object.prototype); // true
// // the protptype of Object.prototype is null (so it is the end of the chain)
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(blackRabbit))); // null
// // printing the list of properties that the protptype have :
// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(blackRabbit)));

// // but, the prototype of an object is not always Object.prototype there is also Date.prototype
// const dateObject = new Date();
// console.log(Object.getPrototypeOf(dateObject));
// // -> {}
// // this means the protptype of dateObject's prototype is not null, therefore we can perform prototype chain untill we get null 
// performing prototype chain untill we get null:
// let obj6 = dateObject
// do {
//     obj6 = Object.getPrototypeOf(obj6);
//     console.log(obj6)
//     if (obj6 !== null) {
//         console.log(Object.getOwnPropertyNames(obj6));
//     }
// } while (obj6);

// /* 
// Many objects don’t directly have Object.prototype as their prototype but instead have 
// another object that provides a different set of default properties. Functions derive 
// from Function.prototype and arrays derive from Array.prototype.
// e.g. 
// Math.max() is a function.
//     the prototype of a function is Function.prototype
// [] is an array
//     the prototype of an array is Array.prototype
// */
// console.log(Object.getPrototypeOf(Math.max)); // {}
// console.log(Object.getPrototypeOf(Math.max) == Function.prototype); // true
// console.log(Object.getPrototypeOf([])); // Object(0) []
// console.log(Object.getPrototypeOf([]) == Array.prototype); // true

// // using prototype to assign simmilar properties (including method) to rabbit object
// // 'protoRabbit' acts as container for the properties shared by all rabbits.
// // using Object.create to create an object with specific prototype.
// let protoRabbit = {
//     leg: 4,
//     speak(line) {
//         console.log(`The ${this.type} rabbit syas '${line}'`);
//     },
//     run(speedInKmH) {
//         console.log(`I'm running ${speedInKmH}km/h now`);
//     }
// };
// // creatintg object 'blackRabbit' with 'protoRabbit' as its prototype
// let blackRabbit = Object.create(protoRabbit);
// blackRabbit.type = "black"; // adding property 'type'
// blackRabbit.speak("I am fear and darkness");
// blackRabbit.run(20);
// console.log(Object.getPrototypeOf(blackRabbit)); // showing the prototype (inherited features)
// console.log(Object.entries(blackRabbit)); // showing the object's properties
// // creating object 'greyRabbit' with 'protoRabbit' as its prototype
// let greyRabbit = Object.create(protoRabbit);
// greyRabbit.type = "grey"; // adding property 'type'
// console.log(Object.getPrototypeOf(greyRabbit)); // showing the prototype (inherited features)
// console.log(Object.entries(greyRabbit)); // showing the object's properties

// /* 
// It's common to see this pattern, in which methods are defined on the prototype,
// but data properties are defined in the constructor. That's because methods are 
// usually the same for every object we create, while we often want each object to
// have its own value for its data properties (just as here where every person has a different name).
// */
// // using constructor to set object's prototype
// const personPrototype = {
//     greet() {
//         console.log(`Hello, my name is ${this.name}!`);
//     },
//     goodBye() {
//         console.log(`sorry, gotta leave, see u`);
//     }
// };
// // properties that defined directly in the object (constructor) e.g. 'name', 'age', 'natianality' are called Own Properties
// function Person(name, age, nationality) {
//     this.name = name;
//     this.age = age;
//     this.nationality = nationality;
// }
// // inherit 'personPrototype' onto 'Person' constructor, Person.prototype = personPrototype.
// Object.assign(Person.prototype, personPrototype);
// // 'reuben' created from 'Person' constructor will get Person.prototype which is personPrototype.
// const reuben = new Person("Reuben", 25, "Indonesia");
// console.log(reuben);
// let reubenOwnProperties = Object.entries(reuben);
// console.log(reubenOwnProperties);
// console.log(Object.getPrototypeOf(reuben));
// // check whether a property is the object's own property or not (may be inherited)
// console.log(Object.hasOwn(reuben, "name")); // -> true, because 'name' is reuben's own property.
// console.log(Object.hasOwn(reuben, "goodBye")); // -> false, because 'goobBye' is 'reuben's prototype property.

// // using object.create to set object's prototype
// let protoRabbit = {
//     speak(line) {
//         console.log(`The ${this.type} rabbit syas '${line}'`);
//     },
//     run(speedInKmH) {
//         console.log(`I'm running ${speedInKmH}km/h now`);
//     }
// };
// // helper function that crate rabbit object
// function makeRabbit(type, leg, ear) {
//     let rabbit = Object.create(protoRabbit);
//     // setting own properties
//     rabbit.type = type;
//     rabbit.leg = leg;
//     rabbit.ear = ear
//     return rabbit;
// }
// const redDisabledRabbit = makeRabbit("red", 3, "long");
// console.log(redDisabledRabbit);
// console.log(Object.getPrototypeOf(redDisabledRabbit));
// console.log(Object.hasOwn(redDisabledRabbit, "type"));
// console.log(Object.hasOwn(redDisabledRabbit, "speak"));

class Rabbit {
    constructor(type, leg, ear) {
        // own properties
        this.type = type;
        this.leg = leg;
        this.ear = ear;
    }
    // method exist on the prototype (Rabbit.prototype)
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
    run(speed) {
        console.log(`${this.type} rabbit is running ${speed}km/h`);
    }
}
const greenRabbit = new Rabbit("green", 4, 2);
console.log(greenRabbit); // -> Rabbit { type: 'green', leg: 4, ear: 2 }
console.log(Object.getOwnPropertyNames(greenRabbit)); // -> [ 'type', 'leg', 'ear' ]
const greenRabbitProto = Object.getPrototypeOf(greenRabbit);
console.log(greenRabbitProto) // -> {}
console.log(Object.getOwnPropertyNames(greenRabbitProto)); // -> [ 'constructor', 'speak', 'run' ]
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype); // -> true
console.log(Object.getPrototypeOf(greenRabbit) == Rabbit.prototype); // -> true




// let empty = {};
// console.log(Object.getPrototypeOf(empty));
// // -> [Object: null prototype] {}
  



// const test = {
//     prop: 42,
//     // below is a method
//     func: function () {
//         return this.prop;
//     },
// };
  
// console.log(test.func());
  // Expected output: 42



function getThis() {
    return this;
}

// const obj1 = {name: "obj1"};
// const obj2 = {name: "obj2"};
// // adding 'getThis' parameter that hold function value 'getThis)
// obj1.getThisObj = getThis;
// obj2.getThisObj = getThis;
// console.log(obj1.getThisObj());
// console.log(obj2.getThisObj().name);


// /*
// The value of this is not the object that has the function as an own property, 
// but the object that is used to call the function.
// */
// const obj4 = {
//     name: "obj4",
//     getThis() {
//         return this;
//     },
// };
  
// const obj5 = { name: "obj5" };
  
// obj5.getThisObj = obj4.getThis;
// console.log(obj5.getThisObj()); // { name: 'obj5', getThis: [Function: getThis] }



// /*
// arrow function doesn't bind their own 'this' but can see the 'this' binding of the
// scope around them.
// */
// let finder = {
//     /*
//     this below is a method, if a function as property (method) doesn't have a binding, 
//     the method's or function's name becomes the property's name, prove it with Object.entries().
//     in other word this below creates a property called 'find' and gives it a function as its value.
//     */
//     find(array) {
//         return array.some(v => v == this.value);
//     },
//     value: 5,
// };
// console.log(finder.find([4, 5, 6]));
// console.log(Object.entries(finder));

