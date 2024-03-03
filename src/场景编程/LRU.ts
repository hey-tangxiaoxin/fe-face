class LRU<T extends any> {
    maxSize: number
    dataMap: Map<string, T>
    constructor(maxSize: number) {
        this.maxSize = maxSize
        this.dataMap = new Map()
    }
    get(k: string) {
        if (!this.dataMap.has(k)) {
            throw Error('not found')
        }
        const val = this.dataMap.get(k)
        this.dataMap.delete(k)
        this.dataMap.set(k, val)
    }
    set(k: string, val: T) {
        if (this.dataMap.has(k)) {
            this.dataMap.delete(k)
        }
        this.dataMap.set(k, val)
        if (this.maxSize < this.dataMap.size) {
            const deleteKey = this.dataMap.keys().next().value
            this.dataMap.delete(deleteKey)
        }
    }
}