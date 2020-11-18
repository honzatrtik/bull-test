import Queue from 'bull'

const redisHost = process.env["REDIS_HOST"] || process.exit(1)
const workerName = process.env["WORKER_NAME"] || process.exit(1)
const queueName = process.env["QUEUE_NAME"] || process.exit(1)

const queue = new Queue(queueName, {
    redis: {
        host: redisHost,
    }
})

console.log(`Starting worker #${workerName}, consuming queue "${queueName}"`)

queue.process("default", (job: Queue.Job<string>) => {

    const artificialJobDuration = Math.floor(Math.random() * 5000) + 1000 // 1-5s

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Worker #${workerName} consumed message "${job.data}" of job "${job.id}", duration ${artificialJobDuration}ms`)
            resolve()
        }, artificialJobDuration)
    })

}).catch((reason) => {

    console.log(`Error "${reason}"`)
    process.exit(1)

})