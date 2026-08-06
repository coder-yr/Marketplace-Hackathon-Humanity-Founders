export class QueueService {
  private concurrency: number
  private activeCount = 0
  private queue: Array<() => void> = []

  constructor(concurrency = 3) {
    this.concurrency = concurrency
  }

  getQueueLength() {
    return this.queue.length
  }

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const run = async () => {
        this.activeCount++
        try {
          const result = await task()
          resolve(result)
        } catch (error) {
          reject(error)
        } finally {
          this.activeCount--
          this.next()
        }
      }

      if (this.activeCount < this.concurrency) {
        run()
      } else {
        this.queue.push(run)
      }
    })
  }

  private next() {
    if (this.queue.length > 0 && this.activeCount < this.concurrency) {
      const task = this.queue.shift()
      if (task) task()
    }
  }
}

export const aiQueue = new QueueService(3)
