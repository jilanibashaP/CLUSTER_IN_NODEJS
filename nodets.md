# Node.js Cluster Module for Multi-threading and Vertical Scaling

This project demonstrates how to use the `cluster` module in Node.js to simulate multi-threading and scale an application vertically. By using multiple worker processes, we can utilize all available CPU cores, allowing the app to handle more traffic and tasks concurrently.


The cluster module allows you to create multiple child processes that share the same server port. This helps you utilize multiple CPU cores, making your Node.js application more scalable and efficient for heavy tasks.

in general we cant allow to use multiple servers using the same port by using the cluster modulee we can use the multiple procces are using the same port.

## "It's like running the same application in different terminals."
he cluster module is essentially like running multiple instances of the same app in different terminals, with the added benefit of sharing the same port and distributing the workload among multiple CPU cores. This makes your Node.js app more scalable and efficient.

# Master Process:
  - The main process that manages worker processes.

  - It doesn't perform any real work; it creates workers and listens to them.

# Worker Processes:
  - Each proces will the whole code from the top meaning runnig the same application in the different terminal bust sharing the same port.
  - The Only difference is cluster.isMaster == false, remaing is completly same runnig the whole file.
  - Child processes that handle the actual work.

  - Workers share the same server port (in case of HTTP server) and can handle requests in parallel.
  - Each worker is a separate Node.js process with its own event loop.




# Important Node.js Methods:
    - cluster.fork(): Forks a new worker process.

    - cluster.isMaster: Checks if the current process is the master process.

    - worker.send(data): Sends a message to a worker.

    - process.on('message', handler): Listens for messages in worker processes.

    - cluster.on('exit', callback): Handles worker exit events.


----------------------------------------------------------------------------
## Example Usage

### index.js

```javascript

const cluster = require('cluster');
const os = require('os');

// Get the number of CPU cores available
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // Fork workers based on the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Create a worker
    }

    // Listen for worker exit events
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Worker processes can share server port
    console.log(`Worker ${process.pid} is running`);
    // Your worker task here (e.g., handling requests or processing data)
}




## NOTE
    In all worker processes, the entire file code will run from the beginning. That’s why we handle the if-else condition; the only difference between the workers and the master process is the isMaster property. All business logic is handled by the worker processes. If it's not the master, then we run the business logic.

    By using this approach, we can utilize Node.js's multi-threaded functionalities and scale the Node.js app vertically.






# Simulating Multi-threading:

    - Since Node.js is single-threaded, it processes one thing at a time. However, using the cluster module, you can simulate multi-threading by forking multiple processes (workers), allowing your app to handle multiple tasks at the same time.

    - This enables you to scale your app vertically by utilizing all available CPU cores, improving performance for CPU-bound tasks.

# Vertical Scaling:

    - Vertical scaling refers to using more CPU cores within a single machine (as  opposed to horizontal scaling where you scale by adding more machines).

    - The cluster module helps scale your app on one machine, improving its ability to handle more traffic, requests, or tasks by utilizing all CPU cores effectively.