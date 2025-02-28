/* 
WAYS TO CREATE OBJECTS :

1. using Object Initializers or Object Literal
Objects created with initializers are called plain objects, 
because they are instances of Object, but not any other object type.
*/

/* 
let myfavColor = "red"
o = {
    a: "foo",
    b: 42,
    c: {},
    1: "number literal property",
    "foo:bar": "string literal property",
  
    myfavColor,
  
    method(parameters) {
      // …
    },
  
    get property() {},
    set property(value) {},
  
    [expression]: "computed property",
  
    __proto__: prototype,
  
    ...spreadProperty,
}; 
*/

/* 
2. Using a constructor function, with step by step as follows :
    1.  Define the object type by writing a constructor function. 
        There is a strong convention, with good reason, to use a capital initial letter.
    2.  Create an instance of the object with new.
*/
function Car(make, model, year, owner) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
}
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
const artur = new Person("artur", 21, "male");
const ananta = new Person("ananta", 18, "male");
const teslaPlaidS = new Car("Tesla", "S Plaid", 2015, artur);
const buggatiChiron = new Car("Buggati", "Chiron Sport", 2019, ananta);
// console.log(teslaPlaidS); // -> Car { make: 'Tesla', model: 'S Plaid', year: 2015, owner: Person { name: 'artur', age: 21, sex: 'male' }}
// console.log(buggatiChiron); // -> Car { make: 'Buggati', model: 'Chiron Sport', year: 2019,  { name: 'ananta', age: 18, sex: 'male' }}

/* 
3. Using the Object.create() method
This method can be very useful, because it allows you to choose the prototype 
object for the object you want to create, without having to define a constructor function.
*/
// Animal properties and method encapsulation
const Animal = {
    type: "Invertebrates", // Default value of properties
    displayType() {
        // Method which will display type of Animal
        console.log(this.type);
    },
};

// Create new animal type called animal1
const animal1 = Object.create(Animal);
// animal1.displayType(); // Logs: Invertebrates

// Create new animal type called fish
const fish = Object.create(Animal);
fish.type = "Fishes";
// fish.displayType(); // Logs: Fishes




/* 
WAYS ENUMERATING PROPERTIES

1. using for...in loops
traverses all of the enumerable string properties of an object as well as its prototype chain.
*/
function showProps(obj, objName) {
    for (const prop in obj) { // prop is string
        console.log(`${objName}.${prop} = ${obj[prop]}`); // using [] property accessor because 'prop' is an expression.
    }
}
// showProps(buggatiChiron, "buggatiChiron");

/* 
2. using Object.keys()
returns an array with only the enumerable own string property names ("keys") 
in the object myObj, but not those in the prototype chain.
*/
// console.log(Object.keys(buggatiChiron));

/* 
3. using Object.getOwnPropertyNames() 
returns an array containing all the own string property names 
in the object myObj, regardless of if they are enumerable or not.
*/
// console.log(Object.getOwnPropertyNames(buggatiChiron));




/* 
ADDING/DELETING PROPERTIES
*/
// adding property 'haveWing' to buggatiChiron object
buggatiChiron.haveWing = false;
// console.log("haveWing" in buggatiChiron);
// delete property 'haveWing'
delete buggatiChiron.haveWing;
// console.log("haveWing" in buggatiChiron);



/* 
INHERITANCE
- 'prototype' is a property that is shared (inherited) by all objects.
- a method is a property of an object that is a function.
    Methods are typically defined on the prototype object of the constructor, 
    so that all objects of the same type share the same method.
*/
// showProps(buggatiChiron, "buggatiChiron");
// adding a property 'color' to all object of type 'Car'
Car.prototype.color = "red";
// console.log("color" in buggatiChiron && "color" in teslaPlaidS);
// define a function that formats and displays the properties of the previously-defined Car objects.
Car.prototype.displayCar = function () {
    const result = `A beautiful ${this.year} ${this.make} ${this.model} owned by ${this.owner.name}`
    console.log(result);
}
// buggatiChiron.displayCar(); // -> A beautiful 2019 Buggati Chiron Sport owned by ananta
// teslaPlaidS.displayCar(); // -> A beautiful 2015 Tesla S Plaid owned by artur




/* 
GETTERS AND SETTERS
- getter is a function associated with a property that gets the value of a specific property.
- setter is a function associated with a property that sets the value of a specific property.
*/
// using object initializer 
const myObj = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    },
};

console.log(myObj.a); // 7
console.log(myObj.b); // 8, returned from the get b() method
myObj.c = 50; // Calls the set c(x) method
console.log(myObj.a); // 25
  