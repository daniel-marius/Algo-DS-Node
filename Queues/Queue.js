class Queue {
  constructor() {
    this.collection = [];
  }

  size() {
    return this.collection.length;
  }

  isEmpty() {
    return this.collection.length === 0;
  }

  printQueue() {
    console.log(this.collection);
  }

  // Adds value at the end of the queue
  enQueue(value) {
    this.collection.push(value);
  }

  // Removes value from the beginning of the queue
  deQueue() {
    return this.collection.shift();
  }

  frontQueue() {
    return this.collection[0];
  }

  rearQueue() {
    return this.collection[this.size() - 1];
  }
}

// let q = new Queue();
// q.enQueue('a');
// q.enQueue('b');
// q.enQueue('c');
// q.printQueue();
// q.deQueue();
// console.log(q.frontQueue());
// q.printQueue();

module.exports = Queue;
