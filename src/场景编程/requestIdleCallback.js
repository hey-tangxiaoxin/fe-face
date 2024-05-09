/**
 * task:(deadline: IdleDeadline) => void
 * @returns Function
 */
const getRequestIdleCallback = () => {
  if (window.requestIdleCallback) return window.requestIdleCallback;
  if (window.MessageChannel) {
    const channel = new MessageChannel();
    const { port1, port2 } = channel;
    port1.onmessage = ({ data }) => {
      const { task, start } = data;
      idleCall(task, start);
    };
    return (task) => {
      port2.postMessage({ task, start: Date.now() });
    };
  }
  return (task) => setTimeout(idleCall, 0, task, Date.now());
};

const idleCall = (task, start) => {
  task({
    didTimeout: false,
    timeRemaining() {
      return Math.max(0, 50 - (Date.now() - start));
    },
  });
};

const sleep = (delay) => {
  const start = Date.now();
  while (Date.now() - start < delay) {}
};
const tasks = [
  () => {
    console.log("第一个任务开始");
    sleep(15);
    console.log("第一个任务结束");
  },
  () => {
    console.log("第二个任务开始");
    sleep(5);
    console.log("第二个任务结束");
  },
  () => {
    console.log("第三个任务开始");
    sleep(20);
    console.log("第三个任务结束");
  },
  () => {
    console.log("第四个任务开始");
    sleep(10);
    console.log("第四个任务结束");
  },
];

const start = Date.now();
const worker = (deadline) => {
  console.log(deadline);
  const task = tasks.shift();
  if (task) {
    task();
    if (tasks.length) {
      requestIdleCallback(worker);
    }
  }
};

requestIdleCallback(worker);
