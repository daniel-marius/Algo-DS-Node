class HashTable {
  constructor() {
    this.storage = [];
    this.storageLimit = 4;
  }

  hashFunction(item, maxCapacity) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash += item.charCodeAt(i);
    }
    return hash % maxCapacity;
  }

  printHT() {
    console.log(this.storage);
  }

  addItem(key, value) {
    let index = this.hashFunction(key, this.storageLimit);
    if (this.storage[index] === undefined) {
      this.storage[index] = [[key, value]];
    } else {
      let inserted = false;
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          this.storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        this.storage[index].push([key, value]);
      }
    }
  }

  removeItem(key) {
    let index = this.hashFunction(key, this.storageLimit);
    if (this.storage[index].length === 1 && this.storage[index][0][0] === key) {
      delete this.storage[index];
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          delete this.storage[index][i];
        }
      }
    }
  }

  lookupItem(key) {
    let index = this.hashFunction(key, this.storageLimit);
    if (this.storage[index] === undefined) {
      return undefined;
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          return this.storage[index][i][1];
        }
      }
    }
  }
}

let ht = new HashTable();
ht.addItem('beau', 'person');
ht.addItem('fido', 'dog');
ht.addItem('rex', 'dinosour');
ht.addItem('tux', 'penguin')
console.log(ht.lookupItem('tux'))
ht.printHT();
