const format = (str) => {
    return str.replace(/\B(?=(\d{3})+$)/g, ',')
}
//?= 前瞻运算符
//\B 非单词边界
console.log(format('123400034'));