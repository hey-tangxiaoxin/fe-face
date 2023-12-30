enum PromiseState {
    pending = 'pending',
    fulfilled = 'fulfilled',
    reject = 'reject'
}

class Mpromise<T> {
    state: keyof typeof PromiseState
    result: T | Error | null
    constructor(fn) {
        this.state = PromiseState.pending;
        this.result = null
        try {
            fn(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result: T) {
        if (this.state !== PromiseState.pending) return
        this.state = PromiseState.fulfilled
        this.result = result
    }
    reject(error: Error) {
        if (this.state !== PromiseState.pending) return
        this.state = PromiseState.reject
        this.result = error
    }
    then(onFulfilled, onReject) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onReject = typeof onReject === 'function' ? onReject : err => { throw err }
        if (this.state === PromiseState.fulfilled) {
            onFulfilled(this.result)
        }
        if (this.state === PromiseState.reject) {
            onReject(this.result)
        }
        return this
    }
    cache(onReject: Function) {
        onReject = typeof onReject === 'function' ? onReject : err => { throw err }
        onReject(this.result)
    }
    finally(fn: Function) {
        fn()
    }
    static all(promises: Array<Promise<any>>) {
        const queue = []
        const ret = []
        const promiseLen = promises.length
        for (let index = 0; index < promiseLen; index++) {
            const task = promises[index]
            task.then(res => {
                ret.push(res)
                queue.splice(queue.indexOf(task), 1)
                if (!queue.length && ret.length === promiseLen) {
                    return Promise.resolve(ret)
                }
            }).catch((err: Error) => {
                return Promise.reject(err)
            })
            queue.push(task)
        }
    }
    static race() { }
    static resolve() { }
    static reject() { }
    static any() { }
    static allSettled() { }
    static try() { }
}

const p = new Mpromise(() => {

})

const isPromise = (target) => {
    return target && typeof target.then === 'function'
}

