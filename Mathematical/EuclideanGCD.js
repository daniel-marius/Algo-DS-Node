class EuclideanGCD {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  gcd(a, b) {
    if (b === 0) {
      return a;
    }

    return gcd(b, a % b);
  }

  gcd2(a, b) {
    if (b === 0) {
      return a;
    } else if (a === 0) {
      return 0;
    } else if (b > a) {
      return gcd2(a, b % a);
    } else {
      return gcd2(b, a % b);
    }
  }

  gcd3(a, b) {
    if (a === b) {
      return a;
    } else if (a > b) {
      return gcd3(a - b, b);
    } else {
      return gcd3(a, b - a);
    }
  }

  gcd4(a, b) {
    while (b > 0) {
      let c = b;
      b = a % b;
      a = c;
    }

    return a;
  }

  gcd5(a, b) {
    // Extended Euclidean Algorithm
    let d0 = a, d1 = b, x0 = 1, x1 = 0, y0 = 0, y1 = 1;
    while (d1 !== 0) {
      let q = Math.floor(d0/d1);
      let d2 = d1;
      let x2 = x1;
      let y2 = y1;
      d1 = d0 - (q * d1);
      x1 = x0 - (q * x1);
      y1 = y0 - (q * y1);
      d0 = d2;
      x0 = x2;
      y0 = y2;
    }

    // return d0;
    return (x0 * a) + (y0 * b);
  }

  lcm(a, b) {
    if (a === 0 || b === 0) {
      return 0;
    }
    return (a * b) / this.gcd(a, b);
  }
}
