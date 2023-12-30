/**
 * 发布/订阅模式：事件调度由统一的调度中心进行调度，如dispatchEvent
 */
class EventPush {
    private listen = new Map<string, Array<Function>>()
    addEventListen(type: string, handler: Function) {
        if (!this.listen.has(type)) {
            this.listen.set(type, [])
        }
        this.listen.get(type)?.push(handler)
    }
    removeEventListen(type: string) {
        if(!this.listen.has(type)){
            throw new Error('无效事件')
        }
        this.listen.delete(type)
    }
    dispatchEvent(type: string, ...params) {
        if(!this.listen.has(type)){
            throw new Error('未绑定事件')
        }
        const handlers = this.listen.get(type)
        handlers?.forEach(handler => {
            handler.call(null, ...params)
        })
    }
}