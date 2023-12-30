//before calculateBonus灵活度不够
// const calculateBonus = (performanceLevel, salary) => {
//     if (performanceLevel === 'S') {
//         return salary * 4
//     }
//     if (performanceLevel === 'A') {
//         return salary * 3
//     }
//     if (performanceLevel === 'B') {
//         return salary * 2
//     }
//     return salary
// }


/**
 * 策略模式
 */
const Strategy = {
    S: (salary) => salary * 4,
    A: (salary) => salary * 3,
    B: (salary) => salary * 2,
}

const calculateBonus = (performanceLevel, salary) => {
    return Strategy[performanceLevel](salary)
}

calculateBonus('S', 10000)
calculateBonus('A', 5000)

class StrategyS {
    constructor(salary) {
        this.salary = salary
    }
    calculate() {
        return this.salary * 4
    }
}

class StrategyA {
    constructor(salary) {
        this.salary = salary
    }
    calculate() {
        return this.salary * 3
    }
}

class StrategyB {
    constructor(salary) {
        this.salary = salary
    }
    calculate() {
        return this.salary * 2
    }
}

class Bonus {
    setStrategy(strategy) {
        this.strategy = strategy
    }
    getBonus() {
        return this.strategy.calculate()
    }
}

const bonus = new Bonus()
bonus.setStrategy(new StrategyS(10000))
bonus.getBonus()