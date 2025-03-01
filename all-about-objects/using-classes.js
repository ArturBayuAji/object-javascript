class Person {
    constructor(name, age, gender, nationality) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.nationality = nationality;
    }
}

// class Account {
//     #password;

//     constructor(username, email) {

//     }
    
//     set changeUsername(newUserName) {
//         this.
//     }
// }

// // Account {username: "ArturBayu", email: "example@gmail.com", password : "*****"}



class BankAccount {
    // public incstance fields/properies (accessible anywhere)
    accountNumber;

    // private instance fields/properties (only accessible within the class)
    #balance;
    #transactions = [];

    // static fields/properties (accessible anywhere, owned by the class -> shared accross all instance)
    static bankName = "National Bank";
    static bankLocations = ["Bali", "Jakarta"];

    // private static fields/properties ('private' -> only accessible within the class, 'static' -> owned by the class -> shared accross all instance)
    static #totalAccountsMade = 0;
    static #assetsUnderManagement = 0;
    
    // constructor : Initializes instance properties
    constructor(accNum, initialBalance) {
        this.accountNumber = accNum;
        this.#balance = initialBalance;
        BankAccount.#totalAccountsMade++;
        BankAccount.#assetsUnderManagement += initialBalance;
    }

    // public instance method
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

    // Getter for balance (read-only)
    get balance() {
        return this.#balance;
    }

    // Getter for transactions (read-only)
    get transactions() {
        return [...this.#transactions]; // Return a copy to protect internal data
    }

    // Static method: Retrieve bank details
    static getBankInfo() {
        return `Welcome to ${this.bankName}. Total accounts: ${this.#totalAccountsMade}. AUM: $${this.#assetsUnderManagement}`;
    }

    // Static initialization block
    static {
        console.log("Bank system initialized.");
    }
}






// ============= Program start here ==============
const artur = new Person("Artur Bayu", 22, "Male", "Indonesia");
const nanta = new Person("Ananta", 19, "Male", "Indonesia");
