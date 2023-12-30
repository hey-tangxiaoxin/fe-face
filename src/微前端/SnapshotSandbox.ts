//快照沙箱（SnapshotSandbox）
const iter = (obj: typeof window, callbackFn: (prop: any) => void) => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop) || prop === 'clearInterval') {
            callbackFn(prop)
        }
    }
}
class SnapshotSandBox {
    windowSnapshot: Window
    modifyPropMap: Record<any, any> = {}
    active() {
        iter(window, (prop) => {
            this.windowSnapshot[prop] = window[prop]
        })
        Object.keys(this.modifyPropMap).forEach(prop => {
            window[prop] = this.modifyPropMap[prop]
        })
    }
    inactive() {
        iter(window, (prop) => {
            if (this.modifyPropMap[prop] !== window[prop]) {
                this.modifyPropMap[prop] = window[prop]
                window[prop] = this.windowSnapshot[prop]
            }
        })
    }
}