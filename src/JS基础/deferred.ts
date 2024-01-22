class Deferred<T> {
    promise: Promise<T>
    resolve: (value: PromiseLike<T> | T) => void
    reject: (reason: any) => void
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}

const deferred = new Deferred<void>()

const task1 = async () => {
    await deferred.promise
    console.log('------task1 开始执行');
}

const task2 = () => {
    setTimeout(() => {
        deferred.resolve()
    }, 100)
}