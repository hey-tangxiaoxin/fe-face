const child = require('child_process')
const path = require('path')
/**
 * 子进程被杀死，自动重启
 */
const createWorker = () => {
    const worker = child.fork(path.join(__dirname, './worker.js'))
    worker.on('exit', () => {
        console.log(`worker ${worker.pid} exited, restarting`);
        createWorker()
    })
}

const getWorkerWithLimit = (times, duration) => {
    const queue = [];
    const checkMax = () => {
        const len = queue.length - 1;
        const last = queue[len]
        const pre = queue[len - times]
        if (pre && last - pre > duration) {
            return false
        }
        return true
    }
    const createWorker = (todo) => {
        const now = Date.now()
        queue.push(now)
        const worker = child.fork(path.join(__dirname, todo))
        worker.on('exit', () => {
            if (checkMax()) {
                console.log(`worker ${worker.pid} exited, restarting`);
                createWorker()
            }
        })
    }
    return createWorker
}

