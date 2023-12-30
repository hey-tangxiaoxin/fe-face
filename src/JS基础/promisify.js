const promisify = function (fn) {
    return (...args) => new Promise((resolve, reject) => {
        args.push((data, error) => {
            if (error) reject(error)
            resolve(data)
        })
        fn.apply(null, args)
    })
}