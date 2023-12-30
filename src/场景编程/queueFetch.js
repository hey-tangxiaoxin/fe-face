const doFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, 1000)
    })
}

const serialFetch = (arr) => {
    return new Promise((resolve, reject) => {
        const ret = []
        arr.map(url => doFetch(url))
            .reduce((pre, cur) => cur.then(res => ret.push(res)), Promise.resolve())
            .then(() => resolve(ret))
    })

}
serialFetch(['/api1', '/api2']).then(list => console.log(list))
