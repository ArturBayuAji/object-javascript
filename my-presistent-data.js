/* 
Data structures that don’t change are called immutable or persistent. 
They behave a lot like strings and numbers in that they are who they are 
and stay that way, rather than containing different things at different times.

In JavaScript, just about everything can be changed, so working with values
that are supposed to be persistent requires some restraint. 

primitive data types e.g. number, string, boolean, null, symboll, undefined, bigint -> immutable

reference daya types e.g. Functions, Arrays, Objects -> mutable.
*/



class PGroup {
    constructor(_group){
        this.group = _group;
    }

    static get startEmpty() {
        return new this([]);
    }

    add(value) {
        // add the value to the group, if the value is not already a member.
        if (!(this.group.includes(value))) {
            return new PGroup([...this.group, value]);
        }
    }

    delete(value) {
        // does the value in in the group? if so delete it
        let member = this.group.find((member) => value === member);
        if (member) {
            let elToRemoveIndx = this.group.indexOf(member);
            let newCopyOfPrevGroup = [...this.group];
            newCopyOfPrevGroup.splice(elToRemoveIndx, 1);
            return new PGroup(newCopyOfPrevGroup);
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



let a = PGroup.startEmpty.add("a");
console.log(a);
// -> PGroup { group: ["a"] }

let ab = a.add("b");
console.log(ab);
// -> PGroup { group: ["a", "b"] }

console.log(a);
// -> PGroup { group: ["a"] }

let b = ab.delete("a");
console.log(b)
// -> PGroup { group: ["b"] }

console.log(ab)
// -> PGroup { group: ["a", "b"] }


console.log(a.has("b"));
// -> false
console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false



let x = 3;
let y = x; // y stores the value of x
console.log(x === y); // true
x = 4;
/* 
Now x is reassigned to 4, but this does not change y, 
because primitives are immutable (they do not share memory).
*/
console.log(x === y); // false

let myObj = {prop1: "hey"};
let myObj2 = myObj; // myObj2 stores the memory reference of myObj1
console.log(myObj === myObj2); // true
myObj.prop1 = "yoo";
console.log(myObj === myObj2); // true

let myObj3 = {prop1: "hello"}; // myObj3 stored in memory reference : j
let myObj4 = {prop1: "hello"}; // myObj3 stored in memory reference : i
console.log(myObj3 === myObj4) // false
console.log(myObj3 == myObj4) // false

let func1 = function() {
    console.log("do something");
}
let func2 = function() {
    console.log("do something");
}
console.log(func1 === func2); // false
console.log(func1 == func2); // false

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(arr1 === arr2); //false
console.log(arr1 == arr2); //false

/* 
Objects (including array and other built-in objects) and functions 
are unique in JavaScript, even if they have the same properties and
values.

everytime a MUTABLE value is created, its new reference is created in
memory.
*/
