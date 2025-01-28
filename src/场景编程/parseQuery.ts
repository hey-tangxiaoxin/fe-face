/**
 * 解析url参数
 * @param src : string
 * @returns
 */
const parseQuery = (src: string) => {
  const url = new URL(src);
  return Array.from(url.searchParams.entries()).reduce(
    (query, [key, value]) => {
      query[key] = value;
      return query;
    },
    {}
  );
};
