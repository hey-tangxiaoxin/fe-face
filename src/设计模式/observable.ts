/**
 * 观察者模式：所有观察者实现统一的API，观察内容发生改变时，调度所有观察者的API执行更新
 * 调度对象：观察者模式的调度发生在具体目标内，如Subject
 */
class Subject {
    private observers = new Set<Observer>()
    addObserver(observer: Observer) {
        this.observers.add(observer)
    }
    removeObserver(observer: Observer) {
        this.observers.delete(observer)
    }
    notify() {
        Array.from(this.observers).forEach(observer => {
            observer.update()
        })
    }
}

class Observer {
    update() {

    }
    log() {

    }
}