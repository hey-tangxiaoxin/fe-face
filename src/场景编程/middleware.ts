class MiddleWare {
  private current = 0;
  private middleWares = [];
  private isRunning = false;
  constructor() {
    this.isRunning = false;
    this.middleWares = [];
    this.current = 0;
  }
  public add(middleWare) {
    this.middleWares.push(middleWare);
    return this;
  }
  public async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    await this.runMiddleWare();
  }
  private async runMiddleWare() {
    const middleWare = this.middleWares.shift();
    if (!middleWare) return;
    const pre = this.current;
    await middleWare(this.next.bind(this));
    const current = this.current;
    // 如果middleware没有执行 next，自动执行下一个
    if (pre === current) {
      this.next();
    }
  }
  private async next() {
    this.current++;
    await this.runMiddleWare();
  }
}

const mw = new MiddleWare();

mw.add(async (next) => {
  console.log("1开始执行");
  next();
  console.log("1开始结束");
});

mw.add(async (next) => {
  console.log("2开始执行");
  next();
  console.log("2开始结束");
});

mw.add(async (next) => {
  console.log("3开始执行");
  next();
  console.log("3开始结束");
});

mw.start();
