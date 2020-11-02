class ModularExponentiation {
  constructor() {}

  // Iterative x ^ y
  power1(x, y) {
    let res = 1;

    while (y > 0) {
      // If y is odd, multiply x with result
      if (y % 1) {
        res *= x;
      }

      // y must be even now
      y >>= 1; // y = y/2
      x *= x; // Change x to x^2
    }

    return res;
  }

  // Iterative (x ^ y) % p
  power2(x, y, p) {
    let res = 1;

    // Update x if it is more than or equal to p
    x %= p;

    while (y > 0) {
      // If y is odd, multiply x with result
      if (y % 1) {
        res = (res * x) % p;
      }

      // y must be even now
      y >>= 1; // y = y/2
      x = (x * x) % p; // Change x to x^2
  }

  // x ^ y
  power3(x, y) {
    if (y === 0) {
      return 1;
    }

    let temp = this.power3(x, y / 2);

    if (y % 2 === 0) {
      return temp * temp;
    } else {
      return x * temp * temp;
    }
  }

  // x ^ y, x ^ (-y)
  power4(x, y) {
    // This works also for negative exponents
    if (y === 0) {
      return 1;
    }

    let temp = this.power4(x, y / 2);

    if (y % 2 === 0) {
      return temp * temp;
    } else {
      if (y > 0) {
        return x * temp * temp;
      } else {
        return (temp * temp) / x;
      }
    }
  }

  // (a ^ b) % n
  power5(n, a, b) {
    let x = 1;
    for (let i = 1; i < b; i++) {
      x = (x * a) % n;
    }

    return a;
  }

  // (a * b) % n
  // Unsigned integers not larger than 63 bits
  mul_mod(a, b, n) {
    if (!((a | b) & (0xFFFFFFFFULL << 32))) {
      return (a * b) % m;
    }

    let d = 0, mp2 = m >> 1;
    if (a >= m) {
      a %= m;
    }

    if (b >= m) {
      b %= m;
    }

    for (let i = 0; i < 64; i++) {
      d = (d > mp2) ? (d << 1) - m : d << 1;
      if (a & 0x8000000000000000ULL) {
        d += b;
      }
      if (d >= m) {
        d -= m;
      }
      a <<= 1;
    }
    return d;
  }

  // (a * b) % n
  // Unsigned integers not larger than 63 bits
  mul_mod2(a, b, m) {
    let x, c, r;

    if (a >= m) {
      a %= m;
    }

    if (b >= m) {
      b %= m;
    }

    x = a;
    c = (x * b) / m;
    r = (a * b - c * m) % m ;
    return r < 0 ? r + m : r;
  }

  // (a ^ b) % m
  power6(a, b, m) {
    let r = (m === 1) ? 0 : 1;
    while (b > 0) {
      if (b & 1) {
        r = this.mul_mod(r, a, m);
      }

      b >>= 1;
      a = this.mul_mod2(a, a, m);
    }

    return r;
  }

  // (x ^ y) % m
  power7(x, y, m) {
    if (y === 0) {
      return 1;
    }

    let p = this.power7(x, y / 2, m) % m;
    p = (p * p) % m;

    return (y % 2 === 0) ? p : (x * p) % m;
  }
}
