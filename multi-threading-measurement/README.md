Step by step to understand multi-threading performance in Node.js using the Worker Threads API. The module system used is Common JS in order to not involving package.json and other unneccesary configs.

Step 1: Understanding Worker Threads
By default, Node.js runs in a single thread, meaning it can handle only one task at a time. However, we can use Worker Threads to run CPU-intensive tasks in parallel.

Main Process: Runs JavaScript code normally.
Worker Thread: Runs separate code in parallel to offload heavy computations.

Step 2: Creating a Heavy Computation Task
We'll simulate a CPU-intensive task (like calculating Fibonacci numbers) in two ways:
1️⃣ Without Worker Threads (Single-threaded)
2️⃣ With Worker Threads (Multi-threaded)

The Single-Threaded Execution is implemented on script named `single-thread.js`. This script runs everything in one thread.

script that runs on seperate thread is `worker.js`. This script implement Multi-Threading with Worker Threads API.

The Multi-Threaded Execution is implemented on script named `multi-threads.js`. This is the main file that creates worker threads.
