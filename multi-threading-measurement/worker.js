// use Worker Threads to run this CPU-intensive task in parallel.
import { parentPort } from "worker_threads";

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Listen for messages from the main thread
parentPort.on("message", (num) => {
    const result = fibonacci(num);
    parentPort.postMessage(result); // Send result back
});