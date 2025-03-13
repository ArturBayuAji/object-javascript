import os from "os";

function showSystemConfigSummary() {
    // get CPU core details
    const cpuInfo = os.cpus();
    console.log("CPU core information :");
    console.log(cpuInfo);

    // get the number of CPU cores
    console.log(`Number of CPU cores: ${os.cpus().length}`);

    // get system memory information
    console.log(`total memory (GB): ${os.totalmem() / (1024 ** 3)}`);
    console.log(`free memory (GB): ${os.freemem() / (1024 ** 3)}`);

    // check the system's architecture and platform
    console.log(`CPU Arcitechture: ${os.arch()}`);
    console.log(`Operating System: ${os.platform()}`);
    console.log(`OS Version: ${os.version}`);

    // get Uptime (how long the system has been running)
    console.log(`System Uptime (seconds): ${os.uptime()}`);
    console.log(`System Uptime (hours): ${os.uptime() / 3600}`);
}

// showSystemConfigSummary();
// run `single-thread.js` to see single thread program
// run `multi-threads.js` to see multi threads program


