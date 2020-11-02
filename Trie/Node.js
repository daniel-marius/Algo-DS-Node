class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = () => {
      this.end = true;
    };
    this.isEnd = () => {
      return this.end;
    };
  }
}

module.exports = Node;
