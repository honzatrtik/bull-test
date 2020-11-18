import Queue from 'bull'

const redisHost = process.env["REDIS_HOST"] || process.exit(1)
const queueName = process.env["QUEUE_NAME"] || process.exit(1)

const queue = new Queue(queueName, {
    redis: {
        host: redisHost,
    }
})

let counter = 0

console.log(`Starting producing to queue "${queueName}"`)

setInterval(async () => {
    const message = `Message ${counter++}`

    const job = await queue.add("default", message)

    console.log(`Message enqueued: "${message}", job: ${job.id}`)
}, 1000)