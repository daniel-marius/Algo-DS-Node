const Node = require('../Binary Trees/Node');
const BinaryTree = require('../Binary Trees/BinaryTree');
const PriorityQueue = require('../Queues/PriorityQueue');

class HuffmanTree {
  constructor(charFreq) {
    this.charFreq = charFreq;
    this.pq = new PriorityQueue();
    this.treeRoot = null;
    this.binaryTree = null;
  }

  insertPQ() {
    for (let i = 0; i < this.charFreq.length; i++) {
      // Create a leaf node for each symbol and add it to the priority queue
      let node = new Node(charFreq[i]);
      this.pq.enQueue2(node);
    }
  }

  buildHuffmanTree() {
    let sum1 = 0;
    let sum2 = 0;

    this.treeRoot = new Node();
    this.binaryTree = new BinaryTree(this.treeRoot);

    // While there is more than one node in the queue
    while (this.pq.size() > 1) {
      // Remove the two nodes of highest priority (lowest probability) from the queue
      let first = this.pq.deQueue();
      let second = this.pq.deQueue();

      let sum1 = first.getData()[0] + second.getData()[0];
      let sum2 = first.getData()[1] + second.getData()[1];

      // Create a new internal node with these two nodes as children and with probability equal to the sum of the two nodes' probabilities
      let node = new Node([sum1, sum2]);
      node.setLeft(first);
      node.setRight(second);

      this.treeRoot = node;

      // Add the new node to the queue
      this.pq.enQueue2(node);
    }

    // The remaining node is the root node and the tree is complete
    return this.treeRoot;
  }

  printHuffmanCodes() {
    this.binaryTree.huffmanEncoding(this.treeRoot, " ");

  }

  printHuffmanTree() {
    this.binaryTree.nonRecursiveLevelOrder(this.treeRoot);
  }
}

const charFreq = [
  ['a', 5],
  ['b', 9],
  ['c', 12],
  ['d', 13],
  ['e', 16],
  ['f', 45]
];

let ht = new HuffmanTree(charFreq);

ht.insertPQ();
ht.buildHuffmanTree();
ht.printHuffmanCodes();
console.log('\n');
ht.printHuffmanTree();
