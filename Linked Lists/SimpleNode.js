class SimpleNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }

  getData(data) {
    return this.data;
  }

  getNext() {
    return this.next;
  }

  setData(data) {
    this.data = data;
  }

  setNext(next) {
    this.next = next;
  }
}

module.exports = SimpleNode;
