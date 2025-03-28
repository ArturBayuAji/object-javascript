let timerStart = performance.now();
console.log("\nMain Script - Start evaluating"); // executed immediately

/* 
below is an asynchoronou operation. Asynchronous operations doesn't run immediately.
Instead the main script registers them as callbacks to be executed later.
Once the main script is done, the program pauses and waits for events to happen (e.g., 
timeout completion, user input, or network response).

Promises run as a new event
"Promises always resolve or reject as a new event. Even if a promise is already resolved, 
waiting for it will cause your callback to run after the current script finishes, rather 
than right away."

📌 What this means:
When a Promise resolves, its .then() callback runs in the microtask queue (which runs 
before `setTimeout` but after synchronous code).
*/
Promise.resolve().then(() => console.log("Promise resolved")); // registered as callback by main script (executed later when its ready)


function scheduledTask() {
    console.log("funciton starts");
    setTimeout(() => console.log("Timeout Executed"), 1000); // registered as callbacks by main scritp
    console.log("function ends");
}

// this function finished execution before the `setTimeout` callback runs.
// The setTimeout callback executes later, outside of scheduleTask() control.
scheduledTask();
// -> function starts
// -> function ends
// -> Timeout executed    Runs later, not inside `scheduleTask`


/* 
Asynchronous behavior happens on its own empty function call stack. This is one of 
the reasons that, without promises, managing exceptions across asynchronous code is so hard. 
Since each callback starts with a mostly empty stack, your catch handlers won’t be on the 
stack when they throw an exception.
*/
// try { // executed immediately
//     setTimeout(() => { // registered as callback by main script (executed later when its ready)
//         throw new Error("Woosh");
//     }, 2000);
// } catch(e) {
//     /* 
//     By the time the callback throws an error, the original try...catch is gone.
//     The error is unhandled, and the program crashes.
//     */
//     console.log(`Cought ${e}`);
// }
// correct way :
setTimeout(() => {
    try {
        throw new Error("Woosh");
    } catch(e) {
        console.log(`Cought ${e}`);
    }
}, 2000);



/* 
JavaScript runs only one program at a time (Single-threaded)
"No matter how closely together events—such as timeouts or incoming requests—happen, 
a JavaScript environment will run only one program at a time. You can think of this as 
it running a big loop around your program, called the event loop."

📌 What this means:
- JavaScript can’t execute multiple things at the same time (no parallel execution).
- Even if multiple events are scheduled at the same time, they must wait their turn.
- The Event Loop controls this execution order.

order of Event Loop execution:
                      start
                        |
                        |
synchronous codes (top to bottom of the script)
                        |
                        |
Microtask queue (stores resolved promise callback e.g. .then(), .catch(), .finally(),
including custome async/await function because it uses promise internally)
                        |
                        |
Macrotask queue (stores callback from built-in asynchronous operations e.g. setTimeout(),
setInterval, I/O)
                        |
                        |
                       end


Slow code delays event execution
"Because no two things run at the same time, slow-running code can delay the handling of
other events."

📌 What this means:
- If you have blocking code (e.g., a long while loop), it prevents other callbacks from running.
- Even if a timeout expires, it will not run immediately if another task is still executing.
*/
let start = Date.now(); // returns milli seconds since the "epoch" (januari 1, 1970 UTC)
setTimeout(() => {
    console.log("Timeout ran at ", Date.now() - start)
}, 20);

// Blocking synchronous (executed immediatly) code (busy-waiting for 50ms)
while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start);
/*
Even though the timeout was set for 20ms, it ran late (at 55ms).
The while loop blocked the thread, so the setTimeout callback had to wait.
*/


let timerEnd = performance.now()
console.log(`Main Script - reach end of script. execution time : ${timerEnd - timerStart} ms\n`); // executed immediately
