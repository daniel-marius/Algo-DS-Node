class Set {
  constructor() {
    this.collection = [];
  }

  checkValue(value) {
    return (this.collection.indexOf(value) !== -1);
  }

  size() {
    return this.collection.length;
  }

  getCollection() {
    return this.collection;
  }

  addValue(value) {
    if (!this.checkValue(value)) {
      this.collection.push(value);
      return true;
    }
    return false;
  }

  removeValue(value) {
    if (this.checkValue(value)) {
      const index = this.collection.indexOf(value);
      // Remove one element at position index
      this.collection.splice(index, 1);
      return true;
    }
    return false;
  }

  union(newSet) {
    let unionSet = new Set();
    const firstSet = this.getCollection();
    const secondSet = this.getCollection();

    firstSet.forEach((e) => {
      unionSet.add(e);
    });

    secondSet.forEach((e) => {
      unionSet.add(e);
    });
    return unionSet;
  }

  intersection(newSet) {
    let intersectionSet = new Set();
    const firstSet = this.getCollection();
    firstSet.forEach((e) => {
      if (newSet.checkValue(e)) {
        intersectionSet.addValue(e);
      }
    });
    return intersectionSet;
  }

  difference(newSet) {
    let differenceSet = new Set();
    const firstSet = this.getCollection();
    firstSet.forEach((e) => {
      if (!newSet.checkValue(e)) {
        differenceSet.addValue(e);
      }
    });
    return differenceSet;
  }

  subset(newSet) {
    const firstSet = this.getCollection();
    return firstSet.every((value) => {
      return newSet.checkValue(value);
    });
  }
}

let setA = new Set();
let setB = new Set();
setA.addValue("a");
setB.addValue("b");
setB.addValue("c");
setB.addValue("a");
setB.addValue("d");
console.log(setA.subset(setB));
console.log(setA.intersection(setB).getCollection());
console.log(setB.difference(setA).getCollection());

let setC = new Set();
let setD = new Set();
setC.addValue("a");
setD.addValue("b");
setD.addValue("c");
setD.addValue("a");
setD.addValue("d");
console.log(setD.getCollection())
setD.removeValue("a");
console.log(setD.checkValue("a"));
console.log(setD.checkValue("d"));
