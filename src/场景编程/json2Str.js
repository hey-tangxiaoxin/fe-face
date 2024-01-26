const getType = (target) => Object.prototype.toString.call(target);
/**
 * json转字符串，解决JSON.stringify()部分属性丢失问题
 * @param {Object} obj
 * @returns
 */
function json2str(obj) {
  const ret = [];
  var fmt = function (value) {
    if (/(Object|Map)\]$/.test(getType(value)) && value != null)
      return json2str(value);
    if (/(String)\]$/.test(getType(value))) return `'${value}'`;
    if (/(Array|Set)\]$/.test(getType(value))) return JSON.stringify(value);
    return value;
  };
  for (const [key, value] of Object.entries(obj)) {
    ret.push(`'${key}': ${fmt(value)}`);
  }
  return `{${ret.join(",")}}`;
}

const obj = {
  a: undefined,
  b: function name(params) {},
  c: "Asf",
  d: 1,
  f: true,
  n: null,
  s: [1, 23, 4],
  m: new Map([
    [1, 2],
    [3, 4],
  ]),
  date: new Date(),
  set: new Set([1, 2, 3]),
};

json2str(obj);
