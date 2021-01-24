const SimpleNode = require('./SimpleNode');

class SimpleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  listSize() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  getHead() {
    return this.head;
  }

  addItem(item) {
    let node = new SimpleNode(item);
    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    this.length += 1;
  }

  removeItem(item) {
    let currentNode = this.head;
    let previousNode;

    if (currentNode.data === item) {
      this.head = currentNode.next;
    } else {
      while (currentNode.data !== item) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }

    this.length -= 1;
  }

  indexOf(item) {
    let currentNode = this.head;
    let index = -1;

    while (currentNode) {
      index += 1;
      if (currentNode.data === item) {
        return index;
      }

      currentNode = currentNode.next;
    }

    return -1;
  }

  getItemAt(index) {
    let currentNode = this.head;
    let count = 0;
    while (count < index) {
      count += 1;
      currentNode = currentNode.next;
    }
    return currentNode ? currentNode.getData() : null;
  }

  addItemAt(index, item) {
    let node = new SimpleNode(item);

    let currentNode = this.head;
    let previousNode;
    let currentIndex = 0;

    if (index > length) {
      return false;
    }

    if (index === 0) {
      node.next = currentNode;
      this.head = node;
    } else {
      while (currentIndex < index) {
        currentIndex += 1;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      node.next = currentNode;
      previousNode.next = node;
    }
    this.length += 1;
  }

  removeItemAt(index) {
    let currentNode = this.head;
    let previousNode;
    let currentIndex = 0;

    if (index < 0 || index >= this.length) {
      return null;
    }

    if (index === 0) {
      this.head = currentNode.next;
    } else {
      while (currentIndex < index) {
        currentIndex += 1;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.length -= 1;
    return currentNode.data;
  }
}

// let list = new SimpleLinkedList();
// list.addItem('list1');
// list.addItem('list2');
// list.addItem('list3');
// list.addItem('list4');
// console.log(list.listSize());
// console.log(list.removeItemAt(3));
// console.log(list.getItemAt(3));
// console.log(list.indexOf('list3'));
// console.log(list.listSize());

module.exports = SimpleLinkedList;
