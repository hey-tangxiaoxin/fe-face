/**
 * 最多进行n次请求重试
 * @param url
 * @param maxRetries
 * @returns
 */
const retryableFetch = async (url: string, maxRetries: number = 5) => {
  let times = 0;
  while (times < maxRetries) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return res.json();
      }
    } catch (error) {
      console.info(
        `request failed, retrying (${times + 1}/${maxRetries})`,
        error
      );
    }
    times++;
  }
  throw Error(`request failed after ${maxRetries} retries`);
};
