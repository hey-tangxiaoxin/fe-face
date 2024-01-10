var threeSum = function (nums) {
    if (nums.length < 3) return []
    const ret = []
    const dfs = (index, path = [], sum) => {
        if (path.length === 3 && sum === 0) return ret.push(path.slice())
        if (path.length > 3) return
        for (let i = index; i < nums.length; i++) {
            if (i - 1 >= index && nums[i - 1] === nums[i]) continue
            if (sum === undefined) sum = 0
            sum += nums[i]
            path.push(nums[i])
            dfs(i + 1, path, sum)
            sum -= nums[i]
            path.pop()
        }
    }
    nums.sort((a, b) => a - b)
    dfs(0, [], undefined)
    return ret
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]))