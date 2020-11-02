class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  size() {
    return this.collection.length;
  }

  isEmpty() {
    return this.collection.length === 0;
  }

  printCollection() {
    console.log(this.collection);
  }

  enQueue(value) {
    if (this.isEmpty()) {
      this.collection.push(value);
    } else {
      let added = false;
      for (let i = 0; i < this.collection.length; i++) {
        // index 1 defines the priority
        if (value[1] < this.collection[i][1]) {
          // adds value at index i
          this.collection.splice(i, 0, value);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(value);
      }
    }
  }

  deQueue() {
    const value = this.collection.shift();
    return value[0];
  }

  frontQueue() {
    return this.collection[0];
  }

  rearQueue() {
    return this.collection[this.size() - 1];
  }
}

let pq = new PriorityQueue();
pq.enQueue(['Beau Carnes', 2]);
pq.enQueue(['Quincy Larson', 3]);
pq.enQueue(['Ewa Mitulska-Wójcik', 1])
pq.enQueue(['Briana Swift', 2])
pq.printCollection();
pq.deQueue();
console.log(pq.frontQueue());
pq.printCollection();
