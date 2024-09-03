const SelectorKeys = ["#", ".", "[", ":", ">", " ", "+", "~", "*", "^", "|"];
const walker = function* (selectorText) {
  let text = "";
  for (let i = 0; i < selectorText.length; i++) {
    const char = selectorText[i];
    if (SelectorKeys.includes(char)) {
      if (!!text.trim()) {
        yield text;
        break;
      } else {
        text += char;
      }
    } else {
      text += char;
    }
  }
  if (!!text) {
    yield text;
  }
};
const cssSelectorReplace = (selectorText, replaceResolver) => {
  return selectorText
    .split(",")
    .filter((it) => !!it.trim())
    .map((sub) => {
      let text = sub;
      const iter = walker(sub);
      let next = iter.next();
      while (!next.done) {
        const value = next.value;
        text = text.replace(value, replaceResolver);
        next = iter.next();
      }
      return text;
    })
    .join(",\n");
};

console.log(
  cssSelectorReplace(
    `#main *, #main > .name:visited::after, div.name:visited::after,`,
    `[data-kael-component-id="comp_sqbLnEoQokOwqPiOXGErM"]`
  )
);
