/* 
.then() takes two arguments:
1. First argument: A callback for when the promise resolves (fulfills successfully).
2. Second argument: A callback for when the promise rejects (fails).
*/


// variations to write myFunc
function myFunc1(anyPromise) {
    return new Promise((resolve, reject) => {
        /* 
        if `anyPromise` is success, pass the resolved value to resolve()
        if `anyPromise` fails, pass the error to reject()
        */
       anyPromise.then(resolve, reject); 
       /* not recommended because if an error happens inside .then() itself, 
       it won’t be caught. */
    });
}

function myFunc2(anyPromise) {
    return new Promise((resolve, reject) => {
        /* 
        if `anyPromise` is success, pass the resolved value to resolve()
        if `anyPromise` fails, pass the error to reject()
        */
        anyPromise.then(
            value => resolve(value),
            error => reject(error)
        ); // not recommended
    });
}

function myFunc3(anyPromise) {
    return new Promise((resolve, reject) => {
        /* 
        if `anyPromise` is success, pass the resolved value to resolve()
        if `anyPromise` fails, pass the error to reject()
        */
        anyPromise
            .then(value => resolve(value))
            .catch(error => reject(error)); // recommended
    });
}


// const unPredictablePromise = new Promise((resolve, reject) => {
//     let randNum = Math.floor(Math.random() * 100) + 1;
//     if (randNum <= 50) {
//         resolve("Resolved");
//     } else {
//         reject("Rejected")
//     }
// });


// // variations to use `myFunc1`
// myFunc1(unPredictablePromise)
//     .then(
//         value => console.log(value),
//         error => console.log(error)
//     ); // not recommended

// myFunc1(unPredictablePromise)
//     .then(value => console.log(value))
//     .catch(error => console.log(error)); // recommended



// CARLA BRUTE-FORCING WIFI

async function joinWifi(networkID, passcode) {
    if (!(networkID == "HANGAR 2")) {
        throw new Error("Network not found");
    }

    const correctPasscode = "702485";
    return new Promise((resolve, reject) => {
        // correct pass start with `passcode`
        if (correctPasscode.startsWith(passcode)) {
            // `passcode` have the same length with correct pass
            if (correctPasscode.length == passcode.length) {
                resolve("Connected!");
            // `passcode` have different length (less) with correct pass
            } else {
                setTimeout(() => {
                    resolve("Partially Correct");
                }, 60); // Be cautious about timing mismatch!
            }
        } else {
            reject("Wrong!");
        }
    });
}

/* 
- when our partial pass code is correct, the access point (network) wait for another input
    - the access point wating only 60 milli second, if no more input provided, the process terminated
- if the passcode is fully correct, we are connected immediately.
- if the passcode is wrong, immediately terminate.

given the access point is waiting for 60 milli second when correct, lets brute fore the access point
with with different digit each time we correct.
*/

function withTimeout(tryToJoin, time) {
    return new Promise((resolve, reject) => {
        tryToJoin
            .then(value => resolve(value))
            .catch(reason => reject(reason));
        setTimeout(() => {
            reject("Partial match, continue testing next digit");
        }, time)
    });
}

async function crackPasscode(networkID) {
    let passCode = ""
    while (true) {
        for (let code = 0; code <= 9; code++) {
            let newCode = passCode + code;
            console.log(`trying ${newCode}`);
            try {
                await withTimeout(joinWifi(networkID, newCode), 55);
                return newCode;
            } catch(e) {
                if (e == "Partial match, continue testing next digit") {
                    console.log("correct");
                    passCode = newCode;
                    break;
                // reach 9 (end digit), but no mathching digit found (already tried 0 - 9)
                } else if (code == 9) {
                    throw new Error("Failed to find the correct passcode. It might contain non-numeric characters.")
                }
            }
        }
    }
}


// crackPasscode("HANGAR 2")
//     .then(val => {console.log(`correct pass code : ${val}`)})
//     .catch(reason => console.log(reason));
