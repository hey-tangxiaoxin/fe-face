const processTask = (tasks) => {
    let isRunning = false;
    let index = 0;
    const result = [];
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                if(isRunning) return;
                isRunning = true;
                while(index<tasks.length){
                    const ret = await tasks[index]();
                    result.push(ret)
                    index++;
                    if(!isRunning) return;
                }
                isRunning = false;
                resolve(result)
            })
        },
        pause() {
            isRunning = false;
        }
    }
}