export class Queue<T> {
  private items: T[] = [];

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public isAvailable(): boolean {
    return this.items.length > 0;
  }

  public isReady(): boolean {
    return this.items.length === 1;
  }

  public length(): number {
    return this.items.length;
  }

  public getFirst(): T {
    return this.items[0];
  }
}
