class Bits {
  constructor() {}

  isPowerOfTwo(x) {
    // if (x === 0) {
    //   return false;
    // } else {
    //   while (x % 2 === 0) {
    //     x /= 2;
    //   }
    //   return (x === 1);
    // }
    return (x && !(x & (x - 1)));
  }

  // Count the number of ones in the binary representation of the given number
  countOne(x) {
    let count = 0;
    while (x > 0) {
      x = x & (x - 1);
      count += 1;
    }
    return count;
  }

  // Count number of bits needed to be flipped to convert x to y
  flippedCount(x, y) {
    return countOne(x^y);
  }

  //  Check if the ith bit is set in the binary form of the given number
  check(x, i) {
    // 2^i as 1 << i
    return (x & (1 << i)) ? true : false;
  }

  possibleSubsets(arr) {
    for (let i = 0; i < (1 << arr.length); ++i) {
      for (let j = 0; j < arr.length; ++j) {
        // if jth bit is set in i:
        if (i & (1 << j)) {
          console.log(arr[j]);
        }
      }
      console.log('\n');
    }
  }

  // Find the largest power of 2 (most significant bit in binary form), which is less than or equal to the given number.
  largestPower(x) {

    // Change all the bits which are at the right side of the most significant digit, to 1.
    x = x | (x >> 1);
    x = x | (x >> 2);
    x = x | (x >> 4);
    x = x | (x >> 8);

    // As now the number is 2*x-1, where x is required answer, so adding 1 and dividing it by 2.
    return (x + 1) >> 1;
  }

  // Returns bit length of the integer x
  nbits(x) {
    let r = 1, t;
    if ((t = x >> 16) != 0) { x = t; r += 16; }
    if ((t = x >> 8) != 0) { x = t; r += 8; }
    if ((t = x >> 4) != 0) { x = t; r += 4; }
    if (( t= x >> 2) != 0) { x = t; r += 2; }
    if (( t= x >> 1) != 0) { x = t; r += 1; }
    return r;

    // let count = 0;
    // while (x > 0) {
    //   x >>= 1;
    //   count += 1;
    // }
    //
    // return count;

    // 2 - The number will show as a binary value
    // return x.toString(2).length;
  }

  convertNumberToBits(x) {
    let bits = '';
    while (x) {
      if (x & 1) {
        bits += '1';
      } else {
        bits += '0';
      }
      x >>= 1;
    }
    return bits;
  }

  checkOddEven(x) {
    return (x & 1) ? 'Odd' : 'Even';
  }

  // Returns the rightmost 1 in binary representation of x.
  trick1(x) {
    return x ^ ( x & (x-1));
  }

  // Returns the rightmost 1 in binary representation of x.
  trick2(x) {
    return x & (-x);
  }

  // Returns the number x with the nth bit set.
  trick3(x, n) {
    return x | (1 << n);
  }

  // Divide by 2
  trick4(x) {
    return x >>= 1;
  }

  // Multiplying by 2
  trick5(x) {
    return x <<= 1;
  }

  // Clear all bits from LSB to ith bit
  trick6(x) {
    const mask = ~((1 << i+1 ) - 1);
    x &= mask;
    return x;
  }

  // Clearing all bits from MSB to i-th bit
  trick7(x) {
    const mask = (1 << i) - 1;
    x &= mask;
    return x;
  }

  // Find log base 2 of 32 bit integer
  log2(x) {
    let res = 0;
    while (x >>= 1) {
      res += 1;
    }
    return res;
  }

  // Converting a 32-bit JavaScript integer into 256-bit BE
  // Returns a string whose characters are the bytes of the integer
  intTo256BigEndianString(n) {
    let result = '';

    for (let i = 0; i < 28; i++) {
      result += String.fromCharCode(0x00);
    }

    result += String.fromCharCode((n >> 24) & 0xFF);
    result += String.fromCharCode((n >> 16) & 0xFF);
    result += String.fromCharCode((n >> 8) & 0xFF);
    result += String.fromCharCode((n >> 0) & 0xFF);

    return result;
  }

  // JavaScript integers can be represented as 32bits.
  // We just need to read them as 8bit sequences and convert them to a string.
  intToBE1(x) {
    return [
      x >> 24,
      (x >> 16) & 0b11111111,
      (x >> 8) & 0b11111111,
      x & 0b11111111
    ].reduce((s, n) => s + ('0' + n).substr(-2), '');
  }

  intToBE2(x) {
    let res = '';
    for(let i = 3; i >= 0; i--){
      res += ('0'+ ((x >> i*8) & 0b11111111)).substr(-2);
    }
    return res;
  }

  intToBE3(x) {
    return
      new Uint8Array(
        new Uint32Array([x]).buffer
      ).reduceRight((r, c)=> r + ('0' + c).substr(-2), '');
  }
}

const bits = new Bits();

// console.log(bits.isPowerOfTwo(16));
// console.log(bits.countOne(23));
// console.log(bits.check(20, 2));
// bits.possibleSubsets(['a', 'b', 'c']);
// console.log(bits.largestPower(16));
// console.log(bits.convertNumberToBits(15));
// console.log(bits.checkOddEven(14));
console.log(bits.nbits(1255));
