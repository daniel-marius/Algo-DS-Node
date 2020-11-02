const Node = require('./Node');
const Stack = require('./Stack');
const Queue = require('./Queue');

class BinTree {
  constructor() {
    this.root = null;
    this.stack = new Stack();
    this.queue = new Queue();

    this.currLevel = new Stack();
    this.nextLevel = new Stack();
  }

  recursivePreOrder(root) {
    this.root = root;
    if (this.root != null) {
      console.log(this.root.data + " ");
      this.recursivePreOrder(this.root.left);
      this.recursivePreOrder(this.root.right);
    }
  }

  recursiveInOrder(root) {
    this.root = root;
    if (this.root != null) {
      this.recursiveInOrder(this.root.left);
      console.log(this.root.data + " ");
      this.recursiveInOrder(this.root.right);
    }
  }

  recurisvePostOrder(root) {
    this.root = root;
    if (this.root != null) {
      this.recurisvePostOrder(this.root.left);
      this.recurisvePostOrder(this.root.right);
      console.log(this.root.data + " ");
    }
  }

  nonRecursivePreOrder(root) {
    // First the current node is visited
    // Then the left children are pushed until a leaf is reached
    // Then if the stack is empty, we leave the loop
    // Otherwise the top of the stack is popped out and the visit continues towards the right children

    this.root = root;
    while (true) {
      while (this.root.data) {
        console.log(this.root);
        this.stack.push(this.root);
        this.root = this.root.left;
      }

      if (this.stack.isEmpty()) {
        break;
      }

      this.root = this.stack.peekFirst();
      this.stack.pop();
      this.root = this.root.right;
    }
  }

  nonRecursiveInOrder(root) {
    // First the left children are pushed until a leaf is reached
    // Then if the stack is empty, we leave the loop
    // Otherwise the top of the stack pops out and the current node is visited
    // Finally the visit continues towards the right children

    this.root = root;
    while (true) {
      while(this.root) {
        this.stack.push(this.root);
        this.root = this.root.left;
      }

      if (this.stack.isEmpty()) {
        break;
      }

      this.root = this.stack.top();
      this.stack.pop();

      console.log(this.root.data);

      this.root = this.root.right;
    }
  }

  nonRecursivePostOrder(root) {
    // During post-ordering every single node is visited twice: the first time when moving
    // towards the left children and then again, when moving towards the right children. In
    // order to differentiate the two cases, we can compare if the current element and the
    // right child of the element at the top of the stack are the same.

    this.root = root;
    while (true) {
      if (this.root) {
        this.stack.push(this.root);
        this.root = this.root.left;
      } else {
        if (this.stack.isEmpty()) {
          break;
        } else if (!this.stack.top().right) {
          this.root = this.stack.top();
          this.stack.pop();
          console.log(this.root.data);

          if (this.root === this.stack.top().right) {
            console.log(this.stack.top().right);
            this.stack.pop();
          }
        }
        if (!this.stack.isEmpty()) {
          this.root = this.stack.top().right;
        } else {
          this.root = null;
        }
      }
    }
  }

  nonRecursiveLevelOrder(root) {
    let tmp = null;
    this.root = root;
    this.queue.enQueue(this.root);

    while (!this.queue.isEmpty()) {
      tmp = this.queue.frontQueue();
      this.queue.deQueue();
      console.log(tmp.data);
      if (tmp.left) {
        this.queue.enQueue(tmp.left);
      }
      if (tmp.right) {
        this.queue.enQueue(tmp.right);
      }
    }
  }

  printZigZag(root) {
    let tmp;
    let left2right = true;

    if (!root) {
      return;
    }

    this.root = root;

    this.currLevel.push(this.root);

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

    this.root = root;
    this.queue.enQueue(this.root);

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

    this.root = root;
    pathArr.push(this.root.data);

    // Every time we reach a leaf, the vector is printed
    if (!this.root.left && !this.root.right) {
      print(pathArr);
    } else {
      printAllPaths(this.root.left, path);
      printAllPaths(this.root.right, path);
    }

    // remove current node after left and right subtree are done
    pathArr.pop();
  }

  lca(root, node1, node2) {
    if (!root) {
      return NULL;
    }

    this.root = root;

    if (this.root === node1 || this.root || node2) {
      return this.root.data;
    }

    let left = this.lca(this.root.left, node1, node2);
    let right = this.lca(this.root.right, node1, node2);

    if (left && right) {
      return this.root.data;
    } else {
      return (left ? left : right);
    }
  }

  treeHeight(root) {
    if (!root) {
      return 0;
    }

    this.root = root;

    return 1 + Math.max(this.height(this.root.left), this.height(this.root.right));
  }

  treeDiameter(root) {
    if (!root) {
      return 0;
    }

    this.root = root;

    let leftHeight = this.treeHeight(this.root.left);
    let rightHeight = this.treeHeight(this.root.right);

    let leftDiameter = this.treeDiameter(this.root.left);
    let rightDiameter = this.treeDiameter(this.root.right);

    return Math.max(leftHeight + rightHeight + 1, Math.max(leftDiameter, rightDiameter));
  }

  treeHeight2(root, answer) {
    if (!root) {
      return 0;
    }

    this.root = root;
    let leftHeight = this.treeHeight2(this.root.left, answer);
    let rightHeight = this.treeHeight2(this.root.right, answer);

    answer = Math.max(answer, 1 + leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  treeDiameter2(root) {
    if (!root) {
      return 0;
    }

    this.root = root;

    let answer = -100000;
    let heightTree = this.treeHeight2(this.root, answer);

    return answer;
  }

  // Create binary tree from array
  insertLevelOrder(array, root, index) {
    if (index < array.length) {
      let node = new Node(array[index]);
      root = node;
      this.root = root;
      this.root.left = this.insertLevelOrder(array, this.root.left, 2 * index + 1);
      this.root.right = this.insertLevelOrder(array, this.root.right, 2 * index + 2);
    }
    return this.root;
  }
}
