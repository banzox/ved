// NextGear Shared Worker Client
// Simplifies communication with the Web Worker for all pages

class WorkerService {
    constructor() {
        this.worker = null;
        this.callbacks = {};

        // Auto-initialize
        this.init();
    }

    init() {
        // Determine path to worker.js relative to this script
        // Assuming this script is in /js/worker-client.js
        // We need to find the root.

        // Quick Hack: Assume standard location via global helper if avail, else try relative
        const path = window.NextGear && window.NextGear.root ? window.NextGear.root + 'worker.js' : '../../worker.js';

        this.worker = new Worker(path);

        this.worker.onmessage = (e) => {
            const { id, result, error } = e.data;
            // In a real robust system, we'd map IDs to promises. 
            // For this simple project, we'll assume one active task per page usually, 
            // or we use the 'type' field if we migrated that logic.

            // For now, let's just resolve the generic listener or specific promise if we implemented ID tracking.
            if (this.currentResolve) {
                if (error) this.currentReject(error);
                else this.currentResolve(result);

                this.currentResolve = null;
                this.currentReject = null;
            }
        };

        this.worker.onerror = (e) => {
            console.error('Worker Error:', e);
            if (this.currentReject) this.currentReject(e.message);
        };
    }

    // Run a task on the worker
    run(taskId, data) {
        return new Promise((resolve, reject) => {
            if (this.currentResolve) {
                return reject('Worker is busy');
            }

            this.currentResolve = resolve;
            this.currentReject = reject;

            this.worker.postMessage({ id: taskId, data: data });
        });
    }
}

// Expose singleton
window.WorkerClient = new WorkerService();
