import { Worker } from "worker_threads";
import { performance } from "perf_hooks";

function runWorkerThread(n) {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js");

        worker.postMessage(n);

        worker.on("message", (result) => {
            resolve(result);
        });

        worker.on("error", (err) => {
            reject(err);
        });

        worker.on("exit", (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

// measure execution time
(async () => {
    const start = performance.now();

    const worker1 = runWorkerThread(40);
    const worker2 = runWorkerThread(40); // running two task in parallel

    const [result1, result2] = await Promise.all([worker1, worker2]);

    const end = performance.now();

    console.log(`Fibonacci(40) in Worker 1 = ${result1}`);
    console.log(`Fibonacci(40) in Worker 2 = ${result2}`);
    console.log(`Execution Time (Multi-Threaded): ${(end - start).toFixed(2)} ms`);
})();

/* 
result :
Fibonacci(40) in Worker 1 = 102334155
Fibonacci(40) in Worker 2 = 102334155
Execution Time (Multi-Threaded): 1043.51 ms

doing parallel execution (executing 2 fibonacci function), the result is
so little with single thread executing 1 fibonacci function
*/
