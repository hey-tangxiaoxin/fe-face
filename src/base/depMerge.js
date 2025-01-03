import { deepCopy } from "./deepCopy.js";
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
  const targetObject = deepCopy(target);
  const sourceObject = deepCopy(source);
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
    area: {
      width: 100,
      height: 200,
      getArea() {
        return this.width * this.height;
      },
    }
  },
};

const countriesDetails = {
  USA: {
    language: "English",
    currency: "USD",
    emoji: "🇩🇪",
    area: {
      width: undefined,
      height: 100,
      getArea() {
        return this.width * this.height;
      },
    }
  },
  China: {
    capital: "Beijing",
    emoji: "🇨🇳",
    language: "Chinese",
    currency: "CNY",
    population: 1400000000,
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
