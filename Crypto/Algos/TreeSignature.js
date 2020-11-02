const crypto = require('crypto');

class MerkleTree {
  constructor(treeLeaves) {
    // treeLeaves must be power of 2
    if ((Math.floor(Math.log2(treeLeaves)) !== Math.log2(treeLeaves))) {
      throw new Error("Wrong number of leaves");
    }

    this.treeLeaves = treeLeaves;
    this.treeLevels = null;
    this.merkleTree = {};
  }

  checkHex(data) {
    const re = /[0-9A-Fa-f]{6}/g;

    if(re.test(data)) {
        console.log('valid hex');
    } else {
        console.log('invalid hex');
    }

    // Be sure to reset the index after using .text()
    re.lastIndex = 0;
  }

  addNode(data, position, hashed=false) {
    if (data === undefined) {
      this.merkleTree[position] = undefined;
    } else if ((hashed) && (typeof data === 'string')) {
      this.merkleTree[position] = data;
    } else {
      this.merkleTree[position] = this.hash(data);
    }
  }

  generateTree() {
    this.treeLevels = Math.floor(Math.log2(this.treeLeaves)) + 1;
    for (let i = 0; i < this.treeLevels; i++) {
      for (let j = 0; j < Math.floor(this.treeLeaves / Math.pow(2, i)); j++) {
        if (this.merkleTree[[i, j]] === undefined) {
          this.merkleTree[[i, j]] = undefined;
        }
      }
    }

    for (let i = 1; i < this.treeLevels; i++) {
      for (let j = 0; j < Math.floor(this.treeLeaves / Math.pow(2, i)); j++) {
        let leftChild = this.merkleTree[[i - 1, 2 * j]];
        let rightChild = this.merkleTree[[i - 1, (2 * j) + 1]];
        if (leftChild && rightChild) {
          this.merkleTree[[i, j]] = this.hash(leftChild + rightChild);
        }
      }
    }
  }

  getRoot() {
    return this.merkleTree[[this.treeLevels - 1, 0]];
  }

  getBrotherNodePosition(position) {
    let index = (position[1] % 2 === 0) ? (position[1] + 1) : (position[1] - 1);
    return [position[0], index];
  }

  getBrotherNodeHash(position) {
    return this.merkleTree[this.getBrotherNodePosition(position)] ? this.merkleTree[this.getBrotherNodePosition(position)] : undefined;
  }

  getAuthenticationPath(index) {
    let authPath = [];
    this.treeLevels = Math.floor(Math.log2(this.treeLeaves)) + 1;
    for (let level = 0; level < this.treeLevels - 1; level += 1) {
      authPath.push(this.getBrotherNodePosition([level, index]));
      index = Math.floor(index / 2); // Parent's node index
    }

    authPath.push([this.treeLevels - 1, 0]);

    return authPath;
  }

  getAuthenticationPathHashes(index) {
    let authPathHashes = [];
    this.treeLevels = Math.floor(Math.log2(this.treeLeaves)) + 1;
    for (let level = 0; level < this.treeLevels - 1; level += 1) {
      authPathHashes.push(this.getBrotherNodeHash([level, index]));
      index = Math.floor(index / 2); // Parent's node index
    }

    authPathHashes.push(this.merkleTree[[this.treeLevels - 1, 0]]);

    return authPathHashes;
  }

  hash(data) {
    return crypto.createHash('sha256').update(data.toString()).digest('hex');
  }

  treeTraversal() {
    this.treeLevels = Math.floor(Math.log2(this.treeLeaves)) + 1;
    for (let i = 0; i < this.treeLevels; i++) {
      for (let j = 0; j < Math.floor(this.treeLeaves / Math.pow(2, i)); j++) {
        console.log('Level ' + i + ': ' + this.merkleTree[[i, j]]);
      }
    }
  }
}

try {

  let arr = ["test", "retest", "test", "world", "test", "retest", "test", "world"];

  // if (arr.length % 2 !== 0) {
  //   arr.push(arr[arr.length - 1]);
  // }

  const newTree = new MerkleTree(arr.length);

  for (let i = 0; i < arr.length; i++) {
    newTree.addNode(arr[i], [0, i]);
  }

  newTree.generateTree();
  newTree.treeTraversal();

  // console.log(newTree.getAuthenticationPath(2));
  // console.log(newTree.getAuthenticationPathHashes(2));

} catch (err) {
  console.log(err);
}
