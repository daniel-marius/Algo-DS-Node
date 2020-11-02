class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  getData() { return this.data; }

  getLeft() { return this.left; }

  getRight() { return this.right; }

  setData(data) { this.data = data; }

  setLeft(left) { this.left = left; }

  setRight(right) { this.right = right; }
}

module.exports = Node;
