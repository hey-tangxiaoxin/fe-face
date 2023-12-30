const runMicroTask = (fn) => {
    if (typeof fn !== 'function') {
        throw TypeError('argument must be a function')
    }
    if (process && typeof process.nextTick === 'function') {
        /**
         * node env
         */
        process.nextTick(fn)
    } else if (typeof window !== 'undefined') {
        /**
         * browser env
         */
        if (typeof queueMicrotask === 'function') {
            queueMicrotask(fn)
        } else if (Promise) {
            Promise.resolve(fn)
        } else if (MutationObserver) {
            const observer = new MutationObserver(fn)
            const textNode = document.createTextNode('1')
            observer.observe(textNode, {
                characterData: true
            })
            textNode.data = '2'
        }
    } else {
        setTimeout(fn, 0)
    }
}