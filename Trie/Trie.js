const Node = require('./Node');

class Trie {
  constructor() {
    this.root = new Node();
  }

  addItem(input, node = this.root) {
    if (input.length === 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node());
      return this.addItem(input.substr(1), node.keys.get(input[0]));
    } else {
      return this.addItem(input.substr(1), node.keys.get(input[0]));
    }
  }

  isWord(word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false;
  }

  printTrie() {
    let words = new Array();
    let search = (node, string) => {
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String());
    return words.length > 0 ? words : null;
  }
}

let myTrie = new Trie();

myTrie.addItem('ball');
myTrie.addItem('bat');
myTrie.addItem('doll');
myTrie.addItem('dork');
myTrie.addItem('do');
myTrie.addItem('dorm');
myTrie.addItem('send');
myTrie.addItem('sense');

console.log(myTrie.isWord('doll'));
console.log(myTrie.isWord('dor'));
console.log(myTrie.isWord('dorf'));

console.log(myTrie.printTrie());
