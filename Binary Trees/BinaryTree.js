const Node = require('./Node');
const Stack = require('../Stacks/Stack');
const Queue = require('../Queues/Queue');

class BinaryTree {
  constructor() {
    this.stack = new Stack();
    this.queue = new Queue();

    this.currLevel = new Stack();
    this.nextLevel = new Stack();
  }

  recursivePreOrder(root) {
    if (root != null) {
      console.log(root.data);
      this.recursivePreOrder(root.left);
      this.recursivePreOrder(root.right);
    }
  }

  recursiveInOrder(root) {
    if (root != null) {
      this.recursiveInOrder(root.left);
      console.log(root.data + " ");
      this.recursiveInOrder(root.right);
    }
  }

  recurisvePostOrder(root) {
    if (root != null) {
      this.recurisvePostOrder(root.left);
      this.recurisvePostOrder(root.right);
      console.log(root.data + " ");
    }
  }

  huffmanEncoding(root, string) {
    if (root === null) {
      return;
    }

    if (root.left === null && root.right === null) {
      console.log(String(root.getData())[0] + " | " + string)
    }

    this.huffmanEncoding(root.left, string + "0");
    this.huffmanEncoding(root.right, string + "1");
  }

  nonRecursivePreOrder(root) {
    // First the current node is visited
    // Then the left children are pushed until a leaf is reached
    // Then if the stack is empty, we leave the loop
    // Otherwise the top of the stack is popped out and the visit continues towards the right children

    if (!root) {
      return;
    }

    while (true) {
      while (root.data) {
        console.log(root.data);
        this.stack.push(root);
        root = root.left;
      }

      if (this.stack.isEmpty()) {
        break;
      }

      root = this.stack.pop();
      root = root.right;
    }
  }

  nonRecursiveInOrder(root) {
    // First the left children are pushed until a leaf is reached
    // Then if the stack is empty, we leave the loop
    // Otherwise the top of the stack pops out and the current node is visited
    // Finally the visit continues towards the right children

    while (true) {
      while(root) {
        this.stack.push(root);
        root = root.left;
      }

      if (this.stack.isEmpty()) {
        break;
      }

      root = this.stack.pop();

      console.log(root.data);

      root = root.right;
    }
  }

  nonRecursivePostOrder(root) {
    // During post-ordering every single node is visited twice: the first time when moving
    // towards the left children and then again, when moving towards the right children. In
    // order to differentiate the two cases, we can compare if the current element and the
    // right child of the element at the top of the stack are the same.

    while (true) {
      if (root) {
        this.stack.push(root);
        root = root.left;
      } else {
        if (this.stack.isEmpty()) {
          break;
        } else if (!this.stack.peekFirst().right) {
          root = this.stack.pop();
          console.log(root.data);

          if (root === this.stack.peekFirst().right) {
            console.log(this.stack.peekFirst().right);
            this.stack.pop();
          }
        }
        if (!this.stack.isEmpty()) {
          root = this.stack.peekFirst().right;
        } else {
          root = null;
        }
      }
    }
  }

  nonRecursiveLevelOrder(root) {
    if (root === null) {
      return;
    }

    this.queue.enQueue(root);

    let tree = [];

    let level = 1;
    let width = -1;

    while (true) {
      let nodeCount = this.queue.size();

      if (nodeCount === 0) {
        break;
      }

      while (nodeCount > 0) {
        let tmp = this.queue.frontQueue();
        console.log("Level:", level, "NodeCount:", nodeCount, "Data:", tmp.data);
        this.queue.deQueue();

        let line = { level: level, data: tmp.data };
        tree.push(line);

        if (nodeCount > width) {
          width = Math.max(nodeCount, width);
        }

        if (tmp.left) {
          this.queue.enQueue(tmp.left);
        }

        if (tmp.right) {
          this.queue.enQueue(tmp.right);
        }

        nodeCount -= 1;
      }
      console.log('\n');
      level += 1;
    }

    console.log('Tree Height:', level - 1);
    console.log('Tree Width:', width);

    const res = tree.filter(node => (node.data ? node.level === width : {}));
    console.log("Level with most nodes:", res);
  }

  printZigZag(root) {
    let tmp;
    let left2right = true;

    if (!root) {
      return;
    }

    this.currLevel.push(root);

    while (!this.currLevel) {
      tmp = this.currLevel.top();
      this.currLevel.pop();

      if (tmp) {
        console.log(tmp.data);
      }

      if (left2right) {
        this.nextLevel.push(tmp.left);
        this.nextLevel.push(tmp.right);
      } else {
        this.nextLevel.push(tmp.right);
        this.nextLevel.push(tmp.left);
      }

      if (this.currLevel.isEmpty()) {
        left2right = !left2right;
        let tempStack = this.currLevel;
        this.currLevel = this.nextLevel;
        this.nextLevel = tempStack;
      }
    }
  }

  numLeavesNonRecursiveLevelOrder(root) {
    let count = 0;
    let tmp = null;

    if (!root) {
      return count;
    }

    this.queue.enQueue(root);

    while (!this.queue.isEmpty()) {
      tmp = this.queue.frontQueue();
      this.queue.deQueue();
      if (!tmp.left && !tmp.right) {
        count += 1;
      } else {
        if (tmp.left) {
          this.queue.enQueue(tmp.left);
        }
        if (tmp.right) {
          this.queue.enQueue(tmp.right);
        }
      }
    }
    return count;
  }

  printAllPaths(root, pathArr) {
    if (!root) {
      return;
    }

    pathArr.push(root.data);

    // Every time we reach a leaf, the vector is printed
    if (!root.left && !root.right) {
      print(pathArr);
    } else {
      printAllPaths(root.left, path);
      printAllPaths(root.right, path);
    }

    // remove current node after left and right subtree are done
    pathArr.pop();
  }

  lca(root, node1, node2) {
    if (!root) {
      return NULL;
    }

    if (root === node1 || root || node2) {
      return root.data;
    }

    let left = this.lca(root.left, node1, node2);
    let right = this.lca(root.right, node1, node2);

    if (left && right) {
      return root.data;
    } else {
      return (left ? left : right);
    }
  }

  treeHeight(root) {
    if (!root) {
      return 0;
    }

    return 1 + Math.max(this.height(root.left), this.height(root.right));
  }

  treeDiameter(root) {
    if (!root) {
      return 0;
    }

    let leftHeight = this.treeHeight(root.left);
    let rightHeight = this.treeHeight(root.right);

    let leftDiameter = this.treeDiameter(root.left);
    let rightDiameter = this.treeDiameter(root.right);

    return Math.max(leftHeight + rightHeight + 1, Math.max(leftDiameter, rightDiameter));
  }

  treeHeight2(root, answer) {
    if (!root) {
      return 0;
    }

    let leftHeight = this.treeHeight2(root.left, answer);
    let rightHeight = this.treeHeight2(root.right, answer);

    answer = Math.max(answer, 1 + leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  treeDiameter2(root) {
    if (!root) {
      return 0;
    }

    let answer = -100000;
    let heightTree = this.treeHeight2(root, answer);

    return answer;
  }

  // Create binary tree from array
  insertLevelOrder(array, root, index) {
    if (index < array.length) {
      let node = new Node(array[index]);
      root = node;
      root.left = this.insertLevelOrder(array, root.left, 2 * index + 2);
      root.right = this.insertLevelOrder(array, root.right, 2 * index + 1);
    }
    return root;
  }
}

module.exports = BinaryTree;
