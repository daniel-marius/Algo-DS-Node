class ModularInverse {
  constructor() {}

  modInverse(a, m) {
    a %= m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
  }

  // ax + by = gcd(a, b)
  // ax + my = 1
  // ax + my ≡ 1 (mod m)
  // ax  ≡ 1 (mod m) 
  gcdExtended(a, b, x, y) {
    if (a === 0) {
      x = 0, y = 1;
      return b;
    }

    let x1, y1;
    let gcd = this.gcdExtended(b%a, a, x1, y1);

    x = y1 - (b / a) * x1;
    y = x1;

    return gcd;
  }

  modInverse2(a, m) {
    let x, y;
    let g = this.gcdExtended(a, m, x, y);
    if (g != 1) {
      console.log('Inverse does not exist!');
    } else {
      const inv = (x%m + m) % m;
      console.log('Modular multiplicative is: ' + res);
    }
  }
}
