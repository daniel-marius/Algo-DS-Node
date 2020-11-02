/**
 * Stack implementation in Node.js
 */

class Stack {
  constructor() {
    this.count = 0;
    this.storage = [];
  }

  // Adds value to the stack
  push(value) {
    this.storage[this.count] = value;
    this.count += 1;
  }

  // Removes value from the top of the stack
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    this.count -= 1;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  // Returns the size of the stack
  size() {
    return this.count;
  }

  // Checks if the stack is empty
  isEmpty() {
    return this.count === 0;
  }

  // Returns the first element in the stack
  peekFirst() {
    if (this.count >= 0) {
      return this.storage[0];
    }
    return undefined;
  }

  // Returns the last element in the stack
  peekLast() {
    if (this.count >= 0) {
      return this.storage[this.count - 1];
    }
    return undefined;
  }

  // Returns an element at a specified index
  peekAtIndex(index) {
    if (index >= 0 && index < this.size()) {
      return this.storage[index];
    }
    return undefined;
  }

  // Prints the elements of the stack
  printStack() {
    // top points to index where new element to be inserted
    let top = this.count - 1;
    while (top >= 0) {
      if (this.storage[top] !== undefined) {
        console.log(this.storage[top]);
      }
      top -= 1;
    }
  }

  // Stack reverse based on recursion
  _reverseStack(index) {
    if (index != 0) {
      this._reverseStack(index - 1);
    }
    console.log(this.storage[index]);
  }

  // Helper function for reversing the stack
  reverseStack() {
    this._reverseStack(this.count - 1);
  }
}

const myStack = new Stack();

myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.push(6);
myStack.push(7);
myStack.push(8);
myStack.push(9);

console.log(myStack.pop());

myStack.printStack();
console.log("\n");
myStack.reverseStack();

// This is our stack
let letters = [];

const word = "racecar"

let rword = "";

// Put letters of word into stack
for (let i = 0; i < word.length; i++) {
   letters.push(word[i]);
}

// Pop off the stack in reverse order
for (let i = 0; i < word.length; i++) {
   rword += letters.pop();
}

if (rword === word) {
   console.log(word + " is a palindrome.");
}
else {
   console.log(word + " is not a palindrome.");
}
