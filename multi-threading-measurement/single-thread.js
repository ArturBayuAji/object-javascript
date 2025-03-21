import { performance } from "perf_hooks";

// a CPU-intensive Fibonacci function
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Measure execution time
const start = performance.now(); // from top of the script to this point
const result = fibonacci(40);
const end = performance.now(); // from top of the script to this point

console.log(`Fibonacci(40) = ${result}`);
console.log(`Execution Time (Single Thread): ${(end - start).toFixed(2)} ms`);

/* 
result :
Fibonacci(40) = 102334155
Execution Time (Single Thread): 947.38 ms

doing parallel execution (executing 2 fibonacci function), the result is
so little with single thread execution (executing 1 fibonacci function)
*/