/**
* Given integers from a1 to an, and a fixed intger L.
* The task is to build a rod with length <= L, with elements from a1 to an.
*/

class Rod {
  constructor(n) {
    this.n = n;
    this.lengths = [2, 2, 3, 5, 6];
    this.rod = new Array(n + 1);
  }

  cutRod() {
    for (let i = 0; i < this.rod.length; i++) {
      this.rod[i] = 0;
    }


    const m = this.lengths.length;
    this.rod[0] = -1;
    let max = 0;

    for (let i = 0; i < m; i++) {
      for (let j = max; j >= 0; j--) {
        // Checks if a piece of length j + legnths[i] can be used to build the rod with length <= L
        if ((this.rod[j] !== 0) && (j + this.lengths[i] <= this.n)) {
          this.rod[j + this.lengths[i]] = this.lengths[i];
        }
      }
      max = this.updateMax(max);
    }

    this.displayRodPieces();
  }

  updateMax(max) {
    return (max + this.lengths[i] <= this.n) ? max + this.lengths[i] : this.n;
  }

  displayRodPieces() {
    if (this.rod[this.n] === 0) {
      console.log('Error');
    } else {
      for (let i = this.n; i != 0; ) {
        // console.log('Piece of: ' + this.rod[i] + ' meters');
        console.log(i + ' ' +  this.rod[i]);
        i -= this.rod[i];

      }
    }
  }
}

const n = 10;
const obj = new Rod(n);
obj.cutRod();
