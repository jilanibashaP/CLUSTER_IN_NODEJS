// Method : 1

const cluster = require('cluster');
const os = require('os');

const N = 1_000_000_00;  // Sum from 1 to N
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.time('TotalTime'); // Start timer

    const chunkSize = Math.floor(N / numCPUs);
    let totalSum = 0;
    let finished = 0;

    for (let i = 0; i < numCPUs; i++) {
        const start = i * chunkSize + 1;
        const end = (i === numCPUs - 1) ? N : (i + 1) * chunkSize;
        const worker = cluster.fork({ START: start, END: end });

        worker.on('message', msg => {
            totalSum += msg.partialSum;
            finished++;
            if (finished === numCPUs) {
                console.log('Total Sum:', totalSum);
                console.timeEnd('TotalTime'); // End timer
            }
        });
    }
} else {
    const start = Number(process.env.START);
    const end = Number(process.env.END);
    let partialSum = 0;
    for (let i = start; i <= end; i++) {
        partialSum += i;
    }
    process.send({ partialSum });
}



// Method : 2
/*

const cluster = require('cluster');
const os = require('os');

const N = 1_000_000_000;  // Sum from 1 to N
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.time('TotalTime'); // Start timer

    const chunkSize = Math.floor(N / numCPUs);
    let totalSum = 0;
    let finished = 0;

    // Fork worker processes
    for (let i = 0; i < numCPUs; i++) {
        const start = i * chunkSize + 1;
        const end = (i === numCPUs - 1) ? N : (i + 1) * chunkSize;
        const worker = cluster.fork();

        // Send the start and end of the chunk to each worker
        worker.send({ start, end });

        // Receive the partial sum from the worker
        worker.on('message', (msg) => {
            totalSum += msg.partialSum;
            finished++;

            // When all workers are finished, log the result
            if (finished === numCPUs) {
                console.log('Total Sum:', totalSum);
                console.timeEnd('TotalTime'); // End timer
            }
        });
    }
} else {
    // Worker processes
    process.on('message', (msg) => {
        const { start, end } = msg;
        let partialSum = 0;

        // Compute the sum of numbers from start to end
        for (let i = start; i <= end; i++) {
            partialSum += i;
        }

        // Send back the partial sum to the master process
        process.send({ partialSum });
    });
}

*/