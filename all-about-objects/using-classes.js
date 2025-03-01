class Person {
    constructor(name, age, gender, nationality) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.nationality = nationality;
    }
}


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
class BankAccount {
    /* 
    PRIVATE FIELD
    if you are an implementor of a class, you would want to hide the internal 
    data structure of your instance from your user, both to keep the API clean and 
    to prevent the user's code from breaking when you do some "harmless refactors". 
    In classes, this is done through private fields. 
    you must declare it in the class body (you can't create a private property on the fly).
    user can't acces private field using dot notation.
    Same name private field can't be declared twice in a single class, and can't be deleted.
    */
    // every 'BankAccount' instance have its private field called 'balance'.
    #balance;
    /* 
    CONSTRUCTOR
    You are advised to not return any value from the constructor — 
    because if you return a non-primitive value, it will become the value of the 'new' expression
    */
    constructor(created, accountType, initialDeposit, owner) {
        this.created = created;
        this.accountType = accountType;
        this.initialDeposit = initialDeposit;
        this.owner = owner;
        this.#balance = initialDeposit; 
    }
    // incstance field
    myField = "foo";

    // instance method
    /*
    the class provide method that expose the private field 'balance'.
    other than this, there is no way to retreive the private field outside the class.
    This means you are safe to do any refactors to your class's private fields, 
    as long as the behavior of exposed methods stay the same. 
    */
    get getBalance() { // getter
        return this.#balance;
    }
    set deposit(amount) { // setter
        if (amount <= 0) {
            throw new RangeError("invalid amount.")
        }
        this.#balance += amount;
    }
    /* 
    A class method can read the private fields of other instances, as long as they belong to the same class.
    However, if 'anotherBankAccount' is not a 'BankAccount' instance, #balance won't exist. 
    (Even if another class has an identically named #balance private field, 
    it's not referring to the same thing and cannot be accessed here.) Accessing a nonexistent private property 
    throws an error instead of returning undefined like normal properties do.
    */
    readBalanceDifferences(anotherBankAccount) {
        let currentAccountBalance = this.#balance;
        /* 
        If you don't know if a private field exists on an object and you wish to access it without 
        using try/catch to handle the error, you can use the in operator.
        */
        if (!(#balance in anotherBankAccount)){
            throw new TypeError("BankAccount instance expected");
        }
        let otherAccountBalance = anotherBankAccount.#balance;
        if (currentAccountBalance > otherAccountBalance) {
            return `${this.owner.name} have more of $${currentAccountBalance - otherAccountBalance}`
        } else if (currentAccountBalance < otherAccountBalance) {
            return `${otherAccountBalance.owner.name} have more of $${otherAccountBalance - currentAccountBalance}`
        } else {
            return `The balance is the same`
        }
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






// ============= Program start here ==============
const artur = new Person("Artur Bayu", 22, "Male", "Indonesia");
const nanta = new Person("Ananta", 19, "Male", "Indonesia");
const account1 = new BankAccount("March 10, 2020", "Express", 200.00, artur);
const account2 = new BankAccount("December 1st, 2021", "Platinum", 150.00, nanta);

// console.log(account1.#balance); // -> Error: Private field '#balance' must be declared in an enclosing class
// using the getter
console.log(account1.getBalance); // -> 200
// using the setter
// account1.deposit = 0; // -> RangeError: invalid amount.
account1.deposit = 200.55;
// using the getter
console.log(account1.getBalance); // -> 300.5
console.log(account1.readBalanceDifferences(account2));