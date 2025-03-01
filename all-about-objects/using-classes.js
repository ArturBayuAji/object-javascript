/* 
CLASSES
some basic ideas of what classes do:
    - Classes create objects through the 'new' operator.
    - Each object has some properties (data or method) added by the class.
    - The class stores some properties (data or method) itself, which are usually used to interact with instances.

These correspond to the three key features of classes:
    - Constructor;
    - Instance methods and instance fields;
    - Static methods and static fields.
*/
// declaring a class 'Car'
class Car {
    /* 
    CONSTRUCTOR
    You are advised to not return any value from the constructor — 
    because if you return a non-primitive value, it will become the value of the 'new' expression
    */
    constructor(year, make, model) {
        this.year = year;
        this.make = make;
        this.model = model;
    }
    // incstance field
    myField = "foo";
    // instance method
    myMethod() {

    }
    // static field
    static myStaticField = "bar";
    // static method
    static myStaticMethod() {

    }
    // static block
    static {

    }
    // Fields, methods, static fields, and static methods all have
    // "private" forms
    #myPrivateField = "bar";
}

const chironSport = new Car(2019, "Buggati", "Chiron Sport");
console.log(chironSport);

// continue on instance method