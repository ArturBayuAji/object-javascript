/* 
function that returns the size of a file (based on the file name not actual size) 
in form of a promise (returned immediately) that resolved in 1~99 ms.  
*/
// async function fakeFileRead(fileName) {
//     let executionTime = Math.random() * 100;
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(fileName.length * 10); // Simulate file size (10 bytes per letter)
//             console.log(`resolved in ${executionTime}`)
//         }, executionTime); // Simulate random read delay
//     });
// }

async function fakeFileRead(fileName) {
    let executionTime = { 
        "math_assignment.txt": 100, 
        "english_assignment.txt": 50, 
        "biology_assignment.txt": 75
    }[fileName] || Math.random() * 100;

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fileName.length * 10);
            console.log(`Resolved: ${fileName} in ${executionTime}ms`);
        }, executionTime);
    });
}


async function fileSizesV1(files) { 
    let list = ""; 
    // files.map creates 3 asynchronous functions for each `files` element
    // the expression below equals to :
    // await Promise.all([async funtion call, async funtion call, async funtion call])
    await Promise.all(files.map(async fileName => {
        let fileSize = await fakeFileRead(fileName); /* wait for the promise of this
        line to be resolved, and only then executes the preceeding statements  
        */
        console.log(`'list' before: "${list}"`);
        list = list + `${fileName}: ${fileSize}\n`;
        console.log(`list after: "${list}"\n`);
    }));    
    return list;
}



async function fileSizesV2(files) {
    let list = "";
    /* 
    files.map creates 3 asynchronous functions for each `files` element.
    so for each files, `files.map()` calls the function inside it.
    since the funciton being called is asynchronous funciton, it immediately returns
    a promise for each file.
    
    so, the expression below equals to :
    await Promise.all([asyncOperation1(), asyncOperation2(), asyncOperation3()]).
    remember, asynchronous function returns a Promise.

    all the async operation reads and write the same list (same reference, referencing
    to `list`)

    `Promise.all` wait for all promises inside the array to be resolved, it returns
    a new Promise that resolves when all of them (promise inside the array) are 
    resolved.
    */
    await Promise.all(files.map(async fileName => {
        return list = list + `${fileName}: ${await fakeFileRead(fileName)}\n`;
    }));

    return list;
}

const myFiles = ["math_assignment.txt", "english_assignment.txt", "biology_assignment.txt"];
// try version 1 and 2
fileSizesV1(myFiles)
    .then(fileSizes => console.log(fileSizes));


/* 
CONCLUTION (from evaluating version 2) :
let list = "";
await Promise.all(files.map(async fileName => {
	return list = list + `${fileName}: ${await fakeFileRead(fileName)}\n`;
}));


file.map call an asynchronous callback funciton, so the statements above equals to :


let list = "";
await Promise.all([asyncOperation1(), asyncOperation2(), asyncOperation3()])


Remember, asynchronous function returns a promise. if a return value is a Promise, 
then it simply returned immediately even it is still pending. So assuming 
the Promise that returned by asyncOperationX() is not resolved yet, the statements 
above will look like this :

let list = "";
await Promise.all(Promise { <pending> }, Promise { <pending> }, Promise { <pending> }])


given the fact :
- each of `asyncOperationX()` reads the `list` variable that initially empty. 
  This means each of them (`asyncOperation1`, `asyncOperation2`, `asyncOperation3`) 
  captures or have a local state of `list`, that is empty, and all of them re-write the 
  value of their "known" `list`. but their lists is a variable that referencing to
  the same variable that is `list`. 
- each of `asyncOperationX()` takes time to resolves (different for all of them), 
  `asyncOperation1()` took 100ms, `asyncOperation2()` took 50ms, `asyncOperation3()` 
  took 75ms.

so, `asyncOperation2()` is the first one that resolves, and returns the modified 
`list` : 
list = "" + `${fileName}: ${await fakeFileRead(fileName)}\n`  -->  "certain_file2 : 220"
the empty string ("") is the state of `list` that `asyncOperation2()` know captures.
 
after that `asyncOperation3()` is resolved, and return the modified `list` : 
list = "" + `${fileName}: ${await fakeFileRead(fileName)}\n`  -->  "certain_file3 : 110"
the empty string ("") is the state of `list` that `asyncOperation3()` know or captures.

at last, `asyncOperation1()` is resolved, and return the modified `list` : 
list = "" + `${fileName}: ${await fakeFileRead(fileName)}\n`  -->  "certain_file1 : 150"
the empty string ("") is the state of `list` that `asyncOperation1()` know captures.


So, all of them (`asyncOperation1`, `asyncOperation2`,  `asyncOperation3`) referencing 
to the same `list` variable, and all of them modified it or re-writing or overwriting 
the `list`. so the last one that overwrite it is "wins".
*/





