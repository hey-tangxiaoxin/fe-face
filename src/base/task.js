// /**
//  * Task（宏任务）：同步代码，setTimeout，setInterval，IO，UI交互
//  * MicroTask（微任务）：Promise.then回调函数，queueMicrotask回调，Mutation observer回调，postMessage，MessageChannel
//  */

//主程序
console.log("script start");

async function func1() {
  console.log("func1");
  await func2();
}

async function func2() {
  console.log("func2");
}

//遇到宏任务，加入到宏任务队列（消息队列尾部）
setTimeout(function () {
  console.log("script timeout running");
}, 0);

//ps：promise执行代码也属于主程序代码
const promise = new Promise((resolve, reject) => {
  //微任务执行过程中产生的宏任务，加入到宏任务队列
  console.log("promise running");
  setTimeout(() => {
    console.log("promise timeout running");
  }, 0);
  resolve();
});

//遇到微任务，加入到微任务队列
promise.then(() => {
  console.log("promise then1 running");
  //微任务执行过程中产生的微任务，加入到微任务队列
  Promise.resolve().then(() => {
    console.log("promise then resolve running");
  });
});
//遇到微任务，加入到微任务队列
Promise.resolve().then(function () {
  //微任务执行过程中产生的微任务，加入到微任务队列
  queueMicrotask(() => console.log("queueMicrotask running"));
  console.log("promise then2 running");
});
func1();
queueMicrotask(() => {
  console.log("------micro task------");
});
console.log("script end");
//主程序执行结束

/**
 * 1，执行主程序，遇到UI渲染，I/O，setTimeout，setInterval等宏任务，加入到宏任务队列；遇到promise.then，queueMicrotask等微任务加入到微任务队列
 * 2，主程序执行完成后遍历执行微任务，执行微任务过程中遇到微任务，继续加入到微任务队列，遇到宏任务也继续加入到宏任务队列；
 * 3，直到微任务队列清空，然后遍历宏任务队列执行宏任务
 * ps：任务队列遵循队列规则，先进先出（先加入先执行）
 */
