const longTask = () => {
    for (let i = 0; i < 100; i++) {
       console.log(i)
    }
}

const task =  (longtask) => {
    console.log('task')
    requestIdleCallback((deadline) => {
        console.log('requestIdleCallback', deadline.timeRemaining())
        if (deadline.timeRemaining() > 0) {
            longtask()
        } else {
            setTimeout(() => {
                task(longtask)
            }, 0)
        }
    })
}
const timeStart = performance.now();

// task(longTask)
longTask()
const timeEnd = performance.now();

console.log(`time: ${timeEnd - timeStart}ms`)

