/* 
An asynchronous generator is a generator function that can handle asynchronous 
operations using `await` inside the function.

Syntax :
- Use `async function*` instead of `function*`
- Use `await` inside the generator function to wait for asynchronous operations
- The returned object has an async iterator, meaning you must use 
`for await...of` or `.next().then()`

Why Use Asynchronous Generators?
Imagine you want to fetch data from an API in chunks (e.g., fetching multiple 
pages of data).

🔹 Before asynchronous generators, you would:
- Use async/await inside a normal function.
- Store all results in an array.
- Return the whole array at once.

🔹 With asynchronous generators, you can:
- Fetch and yield data one piece at a time (like streaming).
- Process large datasets efficiently without storing everything in memory.
*/


// retrieve posts data, async function retruns a promise, handle it correctly
async function getAllPosts() {
    try {
        // request the data
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        // return the data (100 entries)
        return await response.json();
    } catch(e) {
        console.log(e);
    }
}

async function getAllComments() {
    try {
        // request the data
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        // return the data (500 entries)
        return await response.json();
    } catch(e) {
        console.log(e);
    }
}



// /* 
// Objective : retrieve todo's title that are completed
// */

// /* REGULAR ASYNCHRONOUS FUNCITON */
// async function getAllTodos() {
//     try {
//         // request the data
//         const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//         // return data (200 entries);
//         return await response.json();
//     } catch(e) {
//         console.log(e);
//     }
// }

// function extractCompletedTodosTitle(todoArr) {
//     return todoArr.filter((todo) => {
//         return todo.completed == true;
//     }).map((todo) => todo.title);
// }


// (async () => {
//     let start = performance.now();
//     // store the whole data in a single array (200 entries)
//     const todos = await getAllTodos();
//     // perform the processing to achive the objective
//     const todosCompletedTitle = extractCompletedTodosTitle(todos);
//     console.log(`Number of entries : ${todosCompletedTitle.length}`);
//     // -> Number of entries : 90
//     let end = performance.now();
//     console.log(`regular async function took : ${end - start} ms.\n`)
//     // -> regular async function took : 1475.5459999999998 ms.
// })();
// /*
// examination :

// to achive the objective, we need to create an array that loaded with the whole data 
// (200 entries), perfrom processing on it, just to extract 90 out of them. The total
// execution time is 1475.5459999999998 ms.

// what if we can skip the process of creating an array that loaded with the whole data set?
// */



// /* ASYNCHRONOUS GENERATOR */
// async function* getTodosOneByOne(from, to) {
//     // fetch single data at a time
//     for (let i = from; i <= to; i++) {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
//         yield await response.json();
//     }
// }

// // using `for await...of` loop to handle the asynchronous iteration
// (async () => {
//     let start = performance.now();
//     // array that stores the interested only data.
//     const result = [];
//     for await (const todo of getTodosOneByOne(1, 200)) {
//         if (todo.completed == true) {
//             result.push(todo.title);
//         }
//     }
//     console.log(`Number of entries : ${result.length}`);
//     // -> Number of entries : 90
//     let end = performance.now()
//     console.log(`async generator function took : ${end - start} ms.`)
//     // -> async generator function took : 123561.53420000001 ms.
// })();
// /* 
// examination :

// using asynchronous generator we able to perform our asynchronous operation which is
// fetching data one at a time and yield that single data. combined with loop, we managed to
// cover all the data (200 entries). The good part is, we didn't make an array to store
// these 200 entries of raw data, but we creates an empty array that will store only the
// interested entries, which makes the array only store 90 entries of data.

// on memory eficientcy prespective, this is a good thing.
// but look at the execution time, it is 123561.53420000001 ms.
// the difference is day and night. This is the trade-off :
// ✅ Memory efficiency of async generators.
// ❌ Slower execution time when making individual API requests.

// Why is Async Generator Slower?
// The main reason the async generator took significantly longer is because it fetches 
// each TODO entry individually (200 separate network requests) instead of fetching 
// them all at once in a single request.

// 🔹 Regular Async Function (Fast Execution)
// Makes only 1 API request (fetch("https://jsonplaceholder.typicode.com/todos")).
// All 200 TODOs arrive in a single response (~1.4s).
// Processing the data locally in memory is very fast.

// 🔹 Async Generator (Slow Execution)
// Makes 200 separate API requests (fetch("https://jsonplaceholder.typicode.com/todos/X")).
// Each fetch waits for the previous one to complete before moving to the next.
// This introduces a huge network latency (waiting 200 times).

// Solution : Fetch multiple entries at a time (Batching), run request in parallel
// */


/* OPTIMIZED ASYNCHRONOUS GENERATOR */
async function* getTodosBatch(from, to, batchSize = 10) {
    for (let i = from; i <= to; i += batchSize) {
        // create batch of requests
        const requests = [];
        for (let j = i; j < (i + batchSize) && j <= to; j++) {
            requests.push(
                fetch(`https://jsonplaceholder.typicode.com/todos/${j}`)
                    .then(res => res.json())
            );
        }

        // fetch batch in parallel
        const results = await Promise.all(requests);

        // yield each result one by one
        for (const todo of results) {
            yield todo;
        }
    }
} 

// (async () => {
//     let start = performance.now();
//     const result = [];

//     for await (const todo of getTodosBatch(1, 200, 20)) {
//         if (todo.completed) {
//             result.push(todo.title);
//         }
//     }
//     console.log(`Number of entries: ${result.length}`);
//     let end = performance.now();
//     console.log(`Optimized async generator took: ${end - start} ms.`);
// })();
// /* 
// 🚀 Increasing the Batch Size (e.g., 20, 50, 100) :

// ✅ Faster execution time because fewer total batches are made.
// ✅ Better network efficiency since more requests are handled in parallel.
// ❌ Higher memory usage because more responses are stored at once.
// ❌ Server limitations—if the API has rate limits, too many parallel requests might 
//    cause failures.

// 🔹 Example:
// If batchSize = 50, we only make 4 requests instead of 200 separate ones:
// Fetch 1-50
// Fetch 51-100
// Fetch 101-150
// Fetch 151-200
// This is much faster than fetching one by one.

// 🐢 Decreasing the Batch Size (e.g., 5, 2, 1) :

// ✅ Lower memory usage since fewer items are stored at once.
// ✅ Less chance of hitting API rate limits.
// ❌ Slower execution time due to more network requests.

// 🔹 Example:
// If batchSize = 5, we need 40 requests instead of 4 requests (when batchSize = 50).
// This increases network latency and reduces performance.
// */



/*
TRYING DIFFERENT BATCH SIZE 
🔬 Experiment Idea
Try running this code with different batch sizes and compare execution times:
*/
(async () => {
    for (let batchSize of [1, 5, 10, 20, 50, 100]) {
        let start = performance.now();
        const result = [];

        for await (const todo of getTodosBatch(1, 200, batchSize)) {
            if (todo.completed) {
                result.push(todo.title);
            }
        }

        let end = performance.now();
        console.log(`Batch size ${batchSize}: took ${end - start} ms.`);
    }
})();
/* 
->
Batch size 1: took 27316.566 ms.
Batch size 5: took 15071.3633 ms.
Batch size 10: took 10135.372199999998 ms.
Batch size 20: took 13725.168600000005 ms.
Batch size 50: took 16916.238000000012 ms.
Batch size 100: took 11604.669699999999 ms.
*/


/* 
Summary :
Regular Asynchronous Funciton is better IN THIS CASE, not in every case clearly.
Processing happens IN-MEMORY, making it extremely fast, but the trade-off is it booked
the memory with data that even we dont want. Everything has a trade-off, that's why :
ALWAYS MEASURE YOUR EXECUTION TIME and MEMORY USAGE AND TRY DIFFERENT APPROACHES.
If you can fetch everything at once without memory issues, do it!
*/
