/**
 * 解析url参数
 * @param src : string
 * @returns
 */
const parseQuery = (src: string) => {
  const url = new URL(src);
  const query = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};
