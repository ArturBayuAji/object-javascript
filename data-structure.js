/*
array and objects are stored in computer's memory as sequence of bits 
this bits referance or holding the address (the place in memory) 
*/

let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"],
    medicalExam: undefined,
};

// console.log(day1);

day1.wolf = false;

// console.log(day1);

// check whether day1 has property named squirrel
// console.log("squirrel" in day1);

// console.log("medicalExam" in day1);

// // list the properties that an object have
// console.log(Object.keys(day1));

// copy all properties of an object to another
let objectA = {
    a: 1,
    b: 2
};
let objectB = {
    c: 3,
    d: 5
}
// console.log(objectA);
Object.assign(objectA, objectB);
// console.log(objectA);

// // array is an object too
// console.log(typeof day1.events);
// console.log(typeof []);

// array of objects
let journal = [
    // object at index 0
    {
        events: ["work", "touched tree", "pizza", "running", "television"],
        squirrel: false
    },
    // object at index 1
    {
        events: ["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"],
        squirrel: false
    },
    // object at index 2
    {
        events: ["weekend", "cycling", "break", "peanuts", "beer"],
        squirrel: true,
    }
];


// 2 references to the same object.
let object1 = {value: 10};  // The object1 and object2 bindings grasp the same object (they have the same identity)
let object2 = object1;
// having 2 different objects that contain the same properties.
let object3 = {value: 10};  // object 3 lives a seperate life with object2 and object1
// proof
// console.log(object1 === object2);
// console.log(object1 === object3);


const score = {visitors: 0, home: 0};
// This is okay
score.visitors = 1;
// This isn't allowed
// score = {visitors: 1, home: 1}

function addEntry(events, squirrel) {
    /* 
    shorthand of events: events 
    if a property name in brace notation isn’t followed by a value, 
    its value is taken from the binding with the same name.
    */
    journal.push({events, squirrel});
}

addEntry(["work", "touched tree", "pizza", "running","television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna","touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts","beer"], true);
// console.log(journal);


function sum(mainNum, ...theArgs) {
    let total = 0;
    console.log(`Main number is ${mainNum}`);
    total += mainNum;
    for (const arg of theArgs) {
        total += arg;
    }
    return total;
}

// console.log(sum(mainNum=20, 2, 1, 3, 5, 5));
// console.log(Math.PI);

// if you not sure if the given value is an object that has property 'address' also have property 'city' inside it
// but still want to access it anyway, this is called "optional property/method access"
function city(object) {
    /*
    object.address?.city   equals to    object.address.city
    it checking whether the expression chain before the '?' is undifined or null
    */
    return object.address?.city;
}

let randomCity = {
    address: {
        city: "Jakarta",
        totalPopulation: 1000000
    },
    isClose: false,
    explainTheBeauty() {
        console.log("it full of tall buildings");
    },
}

let favCity = {
    landmark: ["GWK", "Bajra candi"],
    address: "Denpasar-Bali",
}

// console.log(city(randomCity));
// randomCity.explainTheBeauty?.();
// console.log(city(favCity));

// function range(start, target, ...step) {
//     const result = [];

//     let fixedStep = (start > target) ? -1 : 1;

//     if (step != undefined) {

//         function correctSign() {
//             //           should ascend     step is -
//             fixedStep = (start < target && step < 0) ? step*(-1) : step;  
//         }
//         fixedStep = fixedStep * step;
//     }

    

//     return result;
// }


/*
Write a range function that takes two arguments, start, end and 
optional third argument that indicates the “step” value used when building the array.
If no step is given, the elements should go up by increments of one, 
corresponding to the old behavior. The function call range(1, 10, 2) should return 
[1, 3, 5, 7, 9]. Make sure this also works with negative step values so that 
range(5, 2, -1) produces [5, 4, 3, 2].
*/
function range(start, target, ...step) {

    // function to check the direction (ascending or descending)
    function checkDirection() {
        let direction = "";
        if (start < target) {
            direction = "ascending";
        } else if (start > target) {
            direction = "descending";
        } else {
            direction = "invalid";
        }
        return direction;
    }

    const finalResult = [];

    // "ascending" or "descending" or "invalid"
    let calculationDirection = checkDirection();

    // if calculation direction is invalid, stop everything
    if (calculationDirection == "invalid") {
        console.log("invalid direction of calculation, or your 'start' and 'target' is the same.");
        return;
    }

    // if the step is given
    if (step.length != 0) {
        let givenStep = step[0];

        // fucntion to check whether the given step is correct based on the calculation direction
        function isStepCorrect() {
            let result = false;
            if (calculationDirection == "ascending" && givenStep > 0) {
                result =  true;
            } else if (calculationDirection == "descending" && givenStep < 0) {
                result =  true;
            }
            return result;
        }

        // function to calculate number of times 'givenStep' fits in 'target' or 'start' based on 'calculationDirection'
        function numOfMultiplication() {
            let result = 0;
            if (calculationDirection == "ascending") {
                result = Math.floor(Math.abs((target - start)/givenStep));
            } else if (calculationDirection == "descending") {
                result = Math.floor(Math.abs((start - target)/givenStep));
            }
            return Math.abs(result);
        }
        
        if (isStepCorrect()) {
            let numOfLooping = numOfMultiplication()
            finalResult.push(start);
            for (let i = 0; i < numOfLooping; i++) {
                start += givenStep;
                finalResult.push(start);
            }
        } else {
            console.log("The step is not match the calculation direction");
        }
        
    } else {  // step was not given
        if (calculationDirection == "ascending") {
            step = 1;
        } else {
            step = -1;
        }
        finalResult.push(start);
        while (start != target) {
            start += step
            finalResult.push(start);
        }
    }
    console.log(finalResult);
    return finalResult;
}
// range(10, 3);


/*
function that reverse an array (resulting a new array)
shoun't use built in 'reverse' method.
more difficutly : shoudn't use 'push' and 'pop'
*/
function reverseArray(anyArr) {
    const result = [];
    let length = anyArr.length;

    let targetIndex = 0;
    for (let i = (length - 1); i >= 0; i--) {
        let currentElm = anyArr[i];
        result[targetIndex] = currentElm;
        targetIndex++;
    }
    return result;
}
// const myArray = ["A", "B", "C", "D", "E"];
// console.log(reverseArray(myArray));
// console.log(myArray);

/* fucntion that reverse an array in place 
(modifying the original array without making the extre one)
*/
function reverseArrayInPlace(anyArr) {
    let length = anyArr.length;

    // calculating number of iteration needed based on the length of the array
    let numIteration = (length % 2 == 0) ? (length/2) : Math.floor((length/2));

    let startingIndex = 0;
    let lastIndex = length - 1;
    for (let i = 0; i < numIteration; i++) {
        // store the temporary, considered last element.
        let tempCont = anyArr[lastIndex]
        anyArr[lastIndex] = anyArr[startingIndex];
        anyArr[startingIndex] = tempCont;
        startingIndex++;
        lastIndex--;
    }
}
// const arrayValue = [1, 2, 3, 4, 5, "z"];
// reverseArrayInPlace(arrayValue);
// console.log(arrayValue);



// ============ LIST =================
// list result visualization
// anyArr = [10, 20, 30]
/*
list = {
    value: 10,
    rest: {
        value: 20,
        rest {
            value: 30,
            rest: null
        }
    }
}
*/
function arrayToList(anyArr) {

    let length = anyArr.length;
    let processedIndex = 0;

    function isElementLeft(indexStart, indexEnd) {
        if (indexStart == indexEnd - 1) {
            return false;
        } else {
            return true;
        }
    }

    function createObjRest() {
        let obj = {
            value: anyArr[processedIndex],
            rest: (isElementLeft(processedIndex++, length)) ? createObjRest() : null
        };
        return obj;
    }

    let result = createObjRest();
    return result;
}   


// function that do the reverse of 'arrayToList'
function listToArray(listObj) {
    // makesure the argument is correct
    function isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
    if (!isPlainObject(listObj)) {
        console.log("invalid input!");
        return;
    }

    let resultArray = [];
    let objContent = Object.entries(listObj);
    
    function myFunc() {
        // grab the 'value' and push it to the array
        let objValue = objContent[0][1];
        resultArray.push(objValue);

        // check whether the 'rest' corresponding to this 'value' is 'object' or 'null'
        let objRest = objContent[1][1];
        if (objRest === null) {
            return;
        } else { // if its an object
            // grab the entries and place it on 'objContent' for recursion
            objContent = Object.entries(objRest);
            myFunc();
        }
    }

    myFunc();
    return resultArray;

}

// console.log(listToArray(myCustomeList));


// ====================== Helper function for working with list ==========================

// funciton add array element to the front of the given list
function prepend(arrElement, listObj) {
    const result = {
        value: arrElement,
        rest: listObj
    }
    return result;
}


// fucntion to return an element at given 'position' from a list
function nth(objList, target) {
    const arr = listToArray(objList);
    if (target > (arr.length - 1)) {
        return undefined;
    } else {
        return arr[target];
    }
}



// const myArray = [20, 30, 40, 50];
// const myList = arrayToList(myArray);
// const myCustomeList = {value: 0, rest: myList};

// // format the list to json for better visualization.
// const jsonString = JSON.stringify(myList, null, 4);
// const jsonString1 = JSON.stringify(myCustomeList, null, 4);
// console.log(`first list :\n${jsonString}`);
// console.log(`second list:\n${jsonString1}`)

// const arrayFromList = listToArray(myCustomeList);
// console.log("Array from the list : \n" ,arrayFromList);

// // add new 'value' at the front of the list
// const myNewList = prepend(25, myCustomeList);
// const jsonString2 = JSON.stringify(myNewList, null, 4);
// console.log(`third list:\n${jsonString2}`);

// const listExtracted = nth(myList, 2)
// console.log(listExtracted);


// function that do deep comparison between two values
function deepEqual(val1, val2) {

    // typeof resulting "string"
    let val1Type = typeof val1;
    let val2Type = typeof val2;

    // local function to compare array element
    function isArrElementTheSame(arr1, arr2) {
        // check whether the length is the same
        if (arr1.length == arr2.length) {
            // get hold of every element which is [key(property)-value] of booth array, through looping
            for (let i = 0; i < arr1.length; i++) {
                let arr1CurrentEl = arr1[i];
                let arr2CurrentEl = arr2[i];
                // check whether their key/property name are the same, if different, it is different value (object)
                if (arr1CurrentEl[0] != arr2CurrentEl[0]) {
                    // console.log("same length but different key/property name is different values");
                    return false;
                } else {
                // if their key/property name are the same, check both corresponding value.
                    if (!(deepEqual(arr1CurrentEl[1], arr2CurrentEl[1]))) { // if the value is different
                        // console.log("same length, same key/property, but key/propert's value are different");
                        return false;
                    }
                }
            }
            // console.log("same lengths, same key/property names, same value of key/property ----> same value.")
            return true;
        } else {
            // console.log("different length is different values");
            return false;
        }
    }

    // if both val1 and val2 are array or object
    if (val1Type == "object" && val2Type == "object"){
        let obj1PropertiesKey = Object.entries(val1);
        let obj2PropertiesKey = Object.entries(val2);

        // // makesure their key/property and its corresponding value are the same
        // if (isArrElementTheSame(obj1PropertiesKey, obj2PropertiesKey)) {
        //     return true;
        // } else {
        //     return false;
        // }
        // shorter version :
        return isArrElementTheSame(obj1PropertiesKey, obj2PropertiesKey);
    // if not, compare it immediately
    } else {
        return val1 === val2;
    }

}


let myObj1 = {
    here: {
        is: "an"
    }, 
    favNum: 1
};

let myObj1SlightDiff = {
    here: {
        is: "an"
    }, 
    favNum: 2
};

let myObj2 = {
    jellow: {
        color: "red",
        amount: 1
    },
    favNum: 2,
    name: "artur"
}

let arr1 = [1, "hello", 3];
let arr2 = [2, false, "world"];

// test it through this below
console.log(deepEqual(myObj2, myObj2));

