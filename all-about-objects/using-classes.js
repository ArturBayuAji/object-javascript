class Person {
    constructor(name, age, gender, nationality, _userFuncInput) {
        // INSTANCE PROPERTIES
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.nationality = nationality;
        // these below are technically a method, but stored directly on the instance, so it becomes own properties
        // prove it by console logging the instance
        this.singing = function sing() {
            console.log("im singing");
        };
        this.userFuncInput = _userFuncInput; // input a funciton
    }

    // INSTANCE METHODS or PROTOTYPE METHODS
    walk(destination) {
        console.log(`${this.name} walking to the ${destination}`);
    }
    
    goHome() {
        console.log(`its time, going home...`);
    }
}

//    derived class      parent class
class Programmer extends Person {
    // instance fields/properties
    yearsOfExperience;
    programmingLanguages = [];

    constructor(_name, _age, _gender, _nationality, _userFuncInput, _yearsOfExperience, _programmingLanguages) {
        super(_name, _age, _gender, _nationality, _userFuncInput); // calling the parent class's constructor to initialize its 'this'
        this.yearsOfExperience = _yearsOfExperience;
        this.programmingLanguages = _programmingLanguages;
    }

    // instance method
    develope(system) {
        console.log(`give me one month to code this ${system}`);
    }
}


class BankAccount {
    // INSTANCE FIELDS/PROPERTIES
    // public (accessible anywhere)
    accountNumber;
    createdOn;

    // private (only accessible within the class)
    #balance;
    #transactions = [];

    // STATIC FIELDS/PROPERTIES
    // public (accessible anywhere, owned by the class -> shared accross all instance)
    static bankName = "National Bank";
    static bankLocations = ["Bali", "Jakarta"];

    // private static ('private' -> only accessible within the class, 'static' -> owned by the class -> shared accross all instance)
    static #totalAccountsMade = 0;
    static #assetsUnderManagement = 0;
    
    // constructor : Initializes instance properties
    constructor(_accountNumber, _initialBalance, _createdOn) {
        this.accountNumber = _accountNumber;
        this.#balance = _initialBalance;
        this.createdOn = _createdOn;
        BankAccount.#totalAccountsMade++;
        BankAccount.#assetsUnderManagement += _initialBalance;
    }

    // PROTOTYPE METHODS
    // public (accessible anywhere)
    deposit (amount) {
        if (amount > 0) {
            this.#balance += amount;
            this.#transactions.push(`Deposit: $${amount}`);
            BankAccount.#assetsUnderManagement += amount;
        } else {
            console.log("deposit amount should be positive.");
        }
    }
    withdraw(amount) {
        if (this.#balance >= amount && BankAccount.#assetsUnderManagement >= amount) {
            this.#balance -= amount;
            this.#transactions.push(`Withdraw: $${amount}`);
            BankAccount.#assetsUnderManagement -= amount;
        } else {
            console.log("withdraw rejected");
        }
    }

    // STATIC METHODS
    // public (accessible anywhere, owned by the class -> shared accross all instance)
    static getBankInfo() {
        return `Welcome to ${this.bankName}. Total accounts: ${this.#totalAccountsMade}. AUM: $${this.#assetsUnderManagement}`;
    }

    // Getter for balance (read-only)
    get balance() {
        return this.#balance;
    }

    // Getter for transactions (read-only)
    get transactions() {
        return [...this.#transactions]; // Return a copy to protect internal data
    }

    // Static initialization block
    static {
        console.log("Bank system initialized.");
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
        {"Person.prototype": Person.prototype},
        {"Programmer.prototype": Programmer.prototype},
        {"BankAccount.prototype": BankAccount.prototype},
        {"Object.prototype": Object.prototype},
    ];

    // console.log(`=========================================`);
    // console.log(`diggin the prototype of :`);
    // console.log(obj);
    // console.log(`-----------------------------------`)
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
    // console.log(`=========================================\n`);
}


function myFunc() {
    return 'hello';
}






// ============= Program start here ==============
const artur = new Person("Artur Bayu", 22, "Male", "Indonesia", function hello(){
    console.log("hello")
});
const nanta = new Person("Ananta", 19, "Male", "Indonesia");
const account2 = new BankAccount(2, 200.35, new Date());
const account1 = new BankAccount(1, 100.5, new Date());
const timeNow = new Date();
const programmer1 = new Programmer("John Doe", 21, "Male", "US", 4, ["JavaScript", "Python", "C"]);
const programmer2 = new Programmer("Dhoe John", 24, "Male", "UK", function holiday(){
    console.log("taking days off");
}, 6, ["Java"])
const myObj = {
    a: "foo",
    b: 42,
    "foo:bar": "string literal property",
    10: "number literal property",

    fly(to) {
        console.log(`I can fly`);
    }
}

// programmer1.walk("office");
// programmer1.develope("Serangan Harbot Website");


// UNDERSTANDING THE PROTOTYPE OF CERTAIN OBJECT

// visualizeProtos(myObj);
// visualizeProtos(account1);
// visualizeProtos(artur);
// visualizeProtos(programmer1);
// visualizeProtos([1, 2]);
// visualizeProtos(BankAccount);
// visualizeProtos(visualizeProtos);
// visualizeProtos(timeNow);

// // myObj has a prototype of Object.prototype, ways to calculate it:
// const calcProtoMyObject = [myObj.__proto__, Object.getPrototypeOf(myObj)];
// console.log(calcProtoMyObject.every((el) => el === Object.prototype));

// // account1 has a prototype of BankAccount.prototype, ways to calculate it :
// const calcProtoAccount1 = [account1.__proto__, Object.getPrototypeOf(account1)];
// console.log(calcProtoAccount1.every((el) => el === BankAccount.prototype));

// // artur has a prototype of Person.prototype, ways to calculate it :
// const clacProtoArtur = [artur.__proto__, Object.getPrototypeOf(artur)];
// console.log(clacProtoArtur.every((el) => el === Person.prototype));

// // programmer1 has a prototype of Programmer.prototype, ways to calculate it :
// const clacProtoProgrammer1 = [programmer1.__proto__, Object.getPrototypeOf(programmer1)];
// console.log(clacProtoProgrammer1.every((el) => el === Programmer.prototype));

// // any function (e.g. myFunc, showProto, BankAccount) have a prototype of Function.prototype, ways to calculate it :
// const allMyFunc = [myFunc, showProto, BankAccount];
// console.log(allMyFunc.every((eachFunc) => {
//     return eachFunc.__proto__ === Function.prototype && Object.getPrototypeOf(eachFunc) === Function.prototype;
// }));

// // arrays have a prototype of Array.prototype
// const myArr = [1, "hello", false, null]
// const calcProtoMyArr = [myArr.__proto__, Object.getPrototypeOf(myArr)];
// console.log(calcProtoMyArr.every((el) => el === Array.prototype));

// // timeNow have a prototype of Date.prototype
// const calcProtoTimeNow = [timeNow.__proto__, Object.getPrototypeOf(timeNow)];
// console.log(calcProtoTimeNow.every((el) => el === Date.prototype));

// // BankAccount.prototype prototype has a prototype of Object.prototype
// const calcProtoBankAccountProto = [BankAccount.prototype.__proto__, Object.getPrototypeOf(BankAccount.prototype)];
// console.log(calcProtoBankAccountProto.every((el) => el === Object.prototype));



// // VISUALIZING THE PROTOTYPE AND ITS FEATURE OF CERTAIN OBJECT
// // prototype object contains METHODS and PROPERTIES that can be used by all instances that inherit it

// methods and properties of myObject object
// console.log(myObj);
// console.log(Object.getOwnPropertyNames(myObj));

// // methods and properties of account1 object
// console.log(account1);
// console.log(Object.getOwnPropertyNames(account1));

// // methods and properties of BankAccount.prototype
// console.log(Object.getOwnPropertyNames(account1.__proto__));
// console.log(Object.getOwnPropertyNames(BankAccount.prototype));

// // methods and properties of artur or nanta object
// console.log(artur);
// console.log(nanta);
// console.log(Object.getOwnPropertyNames(artur));

// // methods and properties of Person.prototype
// console.log(Object.getOwnPropertyNames(artur.__proto__));

// // methods and properties of programmer1 and programmer2 objects
console.log(programmer1);
console.log(programmer2);
console.log(Object.getOwnPropertyNames(programmer1));

// // methods and properties of Programmer.prototype
// console.log(Object.getOwnPropertyNames(programmer1.__proto__));

// // // methods and properties of Object.prototype
// console.log(Object.getOwnPropertyNames(Object.prototype));

// // methods and properties of Function.prototype
// console.log(Object.getOwnPropertyNames(BankAccount.__proto__));
// console.log(Object.getOwnPropertyNames(Function.prototype));

// // methods and properties of Array.prototype
// console.log(Object.getOwnPropertyNames([].__proto__));
// console.log(Object.getOwnPropertyNames(Array.prototype));

// // methods and properties of Date.prototype
// console.log(Object.getOwnPropertyNames(timeNow.__proto__));
// console.log(Object.getOwnPropertyNames(Date.prototype));

console.log(BankAccount.prototype);