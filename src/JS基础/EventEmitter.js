class EventEmitter {
    constructor() {
        this.event = this.event || new Map()
    }
    subscribe(type, fn) {
        const handles = this.event.get(type) || []
        this.event.set(type, [...handles, fn])
    }
    dispatch(type) {
        const handles = this.event.get(type)
        if (handles) {
            handles.map(handle => {
                handle.call(this)
            })
        }
    }
    removeSubscribe(type) {
        if (this.event.has(type)) {
            this.event.delete(type)
        }
    }
}