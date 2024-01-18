interface RequestConfig extends RequestInit {
  needCache?: boolean;
}
interface RequestCallback {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}
/**
 *
 * @returns Function
 */
const getCacheRequest = function () {
  const cacheMap = new Map();
  const statusMap = new Map<string, "pending" | "completed">();
  const callbackMap = new Map<string, RequestCallback[]>();
  return function (url: string, options: RequestConfig) {
    const cacheKey = generateCacheKey(url, options);
    const { needCache } = options;
    if (needCache) {
      if (statusMap.has(cacheKey)) {
        const status = statusMap.get(cacheKey);
        if (status === "completed") {
          return Promise.resolve(cacheMap.get(cacheKey));
        }
        if (status === "pending") {
          return new Promise((resolve, reject) => {
            const cb = {
              onSuccess: resolve,
              onError: reject,
            };
            if (callbackMap.has(cacheKey)) {
              callbackMap.get(cacheKey)?.push(cb);
            } else {
              callbackMap.set(cacheKey, [cb]);
            }
          });
        }
      } else {
        statusMap.set(cacheKey, "pending");
      }
    }
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          //只缓存成功的请求
          statusMap.set(cacheKey, "completed");
          cacheMap.set(cacheKey, res);
        } else {
          statusMap.delete(cacheKey);
        }
        callbackMap.get(cacheKey)?.forEach(({ onSuccess }) => {
          onSuccess(res);
        });
        return res;
      })
      .catch((error) => {
        callbackMap.get(cacheKey)?.forEach(({ onError }) => {
          onError(error);
        });
        statusMap.delete(cacheKey);
        return error;
      })
      .finally(() => {
        callbackMap.delete(cacheKey);
      });
  };
};

const generateCacheKey = (url: string, options: RequestConfig) => {
  return options.method?.toLocaleLowerCase() === "get"
    ? url
    : `${url}+${options.body}`;
};
