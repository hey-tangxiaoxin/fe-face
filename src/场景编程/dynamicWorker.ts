type DynamicWorkerOptions = {
  worker: Function | { [k: string]: Function };
};

class DynamicWorker {
  private worker: Worker;
  private flagMapping: {
    [k: string]: (value: any | PromiseLike<any>) => void;
  } = {};
  constructor(options: DynamicWorkerOptions) {
    const worker = options.worker;
    let workText = "";
    if (typeof worker === "object") {
      for (const key in worker) {
        workText += `self.${key} = ${worker[key].toString()}\n`;
      }
    }
    if (typeof worker === "function") {
      workText = `self.task = ${worker.toString()};\n`;
    }
    const messageHandler = `self.onmessage = async function (e) {
      const { name, flag, data } = e.data;
      if(typeof self[name] === "function") {
        const result = await self[name](data);
        self.postMessage({ name, data: result, flag });
      }
    };\n`;
    const blob = new Blob([`(()=>{${workText}${messageHandler}})()`], {
      type: "text/javascript",
    });
    this.worker = new Worker(URL.createObjectURL(blob));
    this.worker.addEventListener("message", (e) => {
      const { data, flag } = e.data;
      this.flagMapping[flag]?.(data);
      Reflect.deleteProperty(this.flagMapping, flag);
    });
  }
  public async send(data: { name?: string; data: any }) {
    const flag = new Date().toString();
    this.worker.postMessage(Object.assign({ name: "task", flag }, data));
    return new Promise((resolve) => {
      this.flagMapping[flag] = resolve;
    });
  }
  public async close() {
    this.worker.terminate();
  }
}

const dynamicWorker = new DynamicWorker({
  worker: {
    task: (data) => {
      return new Promise((resolve) => {
        console.log("开始执行task任务");
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
    },
    other: (data) => {
      console.log("开始执行other任务");
      return data;
    },
  },
});

dynamicWorker.send({ name: "other", data: { a: 1, b: 2 } }).then((res) => {
  console.log(res);
});
