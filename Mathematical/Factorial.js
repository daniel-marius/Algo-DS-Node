class Factorial {
  constructor(x) {
    this.x = x;
  }

  factorial(x) {
    // if (x === 0) {
    //   return 1;
    // }
    //
    // return x * factorial(x - 1);

    return (x === 0 || x === 1) ? 1 : x * factorial(x - 1);
  }

  factorial2(x) {
    let res = 1;
    for (let i = 2; i <= x; i++) {
      res *= i;
    }
    return res;
  }

  factorial3(x) {
    if (x === 0) {
      return 1;
    }

    let i = x, fact = 1;
    while (x / i != x) {
      fact *= i;
      i -= 1;
    }

    return fact;
  }

  factorialLargeNumber(x, maxSize) {
    let arr = [];
    arr[0] = 1;
    let arrSize = 1;

    for (let i = 2; i <= x; i++) {
      arrSize = this.multiply(i, arr, arrSize);
    }

    console.log("Factorial of number: " + x + " is: ");
    for (let i = arrSize - 1; i >= 0; i--) {
      console.log(arr[i]);
    }
  }

  multiply(x, arr, arrSize) {
    let lastDigit = 0;

    for (let i = 0; i < arrSize; i++) {
      let prod = (arr[i] * x) + lastDigit;
      arr[i] = prod % 10;
      lastDigit = prod / 10;
    }

    while (lastDigit) {
      arr[arrSize] = lastDigit % 10;
      lastDigit /= 10;
      arrSize += 1;
    }

    return arrSize;
  }
}

module.exports = Factorial;
