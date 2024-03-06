/**
 * 解析url参数
 * @param src : string
 * @returns
 */
const parseQuery = (src: string) => {
  const url = new URL(src);
  const query = {};
  if (url.searchParams.size > 0) {
    for (const [key, value] of url.searchParams.entries()) {
      query[key] = value;
    }
  }
  return query;
};