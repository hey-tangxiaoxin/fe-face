import { depCopy } from "./deepCopy";
function isObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]";
}
/**
 * 对象深度合并
 * @param {Object} target
 * @param {Object} source
 * @returns
 */
function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  const targetObject = depCopy(target);
  const sourceObject = depCopy(source);
  Object.keys(sourceObject).forEach((key) => {
    const targetValue = targetObject[key];
    const sourceValue = sourceObject[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      targetObject[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      targetObject[key] = deepMerge(targetValue, sourceValue);
    } else {
      targetObject[key] = sourceValue;
    }
  });
  return targetObject;
}

const countries = {
  USA: {
    capital: "Washington D.C.",
    emoji: "🇺🇸",
    population: 331000000,
  },
};

const countriesDetails = {
  USA: {
    language: "English",
    currency: "USD",
  },
  Germany: {
    capital: "Berlin",
    emoji: "🇩🇪",
    language: "German",
    currency: "EUR",
    population: 83000000,
  },
};

console.log(deepMerge(countries, countriesDetails));
