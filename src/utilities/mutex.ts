import { Queue } from './queue';

type Task = () => Promise<void>;

export class Mutex {
  private queue: Queue<Task> = new Queue<Task>();

  lock<T>(func: () => T | Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.enqueue(async () => {
        try {
          resolve(await Promise.resolve(func()));
        } catch (e: unknown) {
          reject(e);
        }
      });
      if (this.queue.isReady()) {
        this.process();
      }
    });
  }

  private async process(): Promise<void> {
    if (!this.queue.length()) {
      return;
    }
    while (this.queue.isAvailable()) {
      const task = this.queue.getFirst();
      await task();
      this.queue.dequeue();
    }
  }
}
