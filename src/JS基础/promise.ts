enum PromiseState {
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

/**
 * Promise A+规范
 * @param target
 * @returns
 */
const isPromise = (target) => {
  return target && typeof target.then === "function";
};

const isIterable = (promises) => {
  return (
    typeof promises[Symbol.iterator] === "function" &&
    typeof promises !== "string"
  );
};

class IPromise<T> {
  state: PromiseState;
  value: T;
  reason: any;
  resolveCallbacks: Array<() => any>;
  rejectedCallbacks: Array<() => void>;
  constructor(
    executor: (
      resolve: (value: T) => any,
      reject: (error: string | Error) => void
    ) => void
  ) {
    const resolve = (value: T) => {
      if (this.state === PromiseState.pending) return;
      this.state = PromiseState.fulfilled;
      this.value = value;
      this.resolveCallbacks.forEach((fn) => fn());
    };
    const reject = (error: any) => {
      if (this.state === PromiseState.pending) return;
      this.state = PromiseState.rejected;
      this.reason = error;
      this.rejectedCallbacks.forEach((fn) => fn());
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onResolve, onReject?) {
    const nextPromise = new IPromise((resolve, reject) => {
      onResolve =
        typeof onResolve === "function" ? onResolve : (value) => value;
      onReject =
        typeof onReject === "function"
          ? onReject
          : (error) => {
            throw error;
          };
      if (this.state === PromiseState.fulfilled) {
        this.resolveCallbacks.push(() => {
          const result = onResolve(this.value);
          this.resolvePromise(result, nextPromise, resolve, reject);
        });
      }
      if (this.state === PromiseState.rejected) {
        this.rejectedCallbacks.push(() => {
          const result = onReject(this.reason);
          this.resolvePromise(result, nextPromise, resolve, reject);
        });
      }
    });
    return nextPromise;
  }
  catch(onReject: (error: Error) => void) {
    onReject =
      typeof onReject === "function"
        ? onReject
        : (error) => {
          throw error;
        };
    return this.then(null, onReject);
  }
  finally(fn: Function) {
    return this.then(
      (value) => {
        return IPromise.resolve(fn()).then(() => value);
      },
      (reason) => {
        return IPromise.resolve(fn()).then(() => {
          throw reason;
        });
      }
    );
  }
  /**
   * 处理then回调函数执行结果
   * @param result
   * @param nextPromise
   * @param resolve
   * @param reject
   */
  private resolvePromise(result, nextPromise, resolve, reject) {
    if (result === nextPromise) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }
    if (isPromise(result)) {
      try {
        result.then.call(
          result,
          (ret) => {
            this.resolvePromise(ret, nextPromise, resolve, reject);
          },
          (err) => {
            reject(err);
          }
        );
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(result);
    }
  }
  static resolve(p) {
    if (p instanceof IPromise) return p;
    if (isPromise(p)) {
      return new IPromise((resolve, reject) => {
        p.then(resolve, reject)
      })
    }
    return new IPromise((resolve) => resolve(p))
  }
  static reject(reason) {
    return new IPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    /**
     * 所有promise fulfilled时才会变成fulfilled状态返回数组值，否则变成rejected
     */
    return new IPromise((resolve, reject) => {
      if (isIterable(promises)) {
        const list: any = [],
          ret: any = [];
        for (const p of promises) {
          list.push(p);
        }
        if (list.length === 0) resolve(list);
        list.forEach((p, index) => {
          IPromise.resolve(p)
            .then((res) => {
              ret[index] = res;
              if (ret.length === list.length) resolve(ret);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        reject("Argument is not iterable");
      }
    });
  }
  static race(promises) {
    /**
     * race 状态与第一个改变状态保持一致
     */
    return new IPromise((resolve, reject) => {
      if (isIterable(promises)) {
        promises.forEach((p) => {
          IPromise.resolve(p)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } else {
        reject("Argument is not iterable");
      }
    });
  }
  static any(promises) {
    /**
     * 任一promise fulfilled时保持fulfilled，且then回调获取第一个fulfilled promise返回值
     * 所有promise rejected时，状态变成rejected
     */
    return new IPromise((resolve, reject) => {
      if (isIterable(promises)) {
        const errors: any = [];
        promises.forEach((p, index) => {
          IPromise.resolve(p)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              errors[index] = error;
              if (errors.length === promises.length) {
                reject(new AggregateError(errors));
              }
            });
        });
      } else {
        reject("Argument is not iterable");
      }
    });
  }
  static allSettled(promises) {
    /**
     * 不管fulfilled或是rejected，只有所有promise状态改变时，状态才会变成fulfilled，且始终是fulfilled
     */
    return new IPromise((resolve, reject) => {
      if (isIterable(promises)) {
        const ret: any = [];
        promises.forEach((p, index) => {
          IPromise.resolve(p)
            .then((res) => {
              ret[index] = res;
            })
            .catch((error) => {
              ret[index] = error;
            })
            .finally(() => {
              if (ret.length === promises.length) resolve(ret);
            });
        });
      } else {
        reject("Argument is not iterable");
      }
    });
  }
  static try(task) {
    /**
     * 同步函数同步执行，异步函数异步执行
     */
    return new IPromise((resolve, reject) => {
      try {
        const ret = typeof task === "function" ? task() : task;
        if (isPromise(ret)) {
          ret.then.call(ret, resolve, reject);
        } else {
          resolve(ret);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
