const Factorial = require('./Factorial');
const ModularExponentiation = require('./ModularExponentiation');
const EuclideanGCD = require('./EuclideanGCD');

class Prime {
  constructor(x) {
    this.x = x;
  }

  isPrime(x) {
    if (x <= 1) {
      return false;
    }

    for (let i = 2; i < x; i++) {
      if (x % i === 0) {
        return false;
      }
    }

    return true;
  }

  isPrime2(x) {
    // Instead of checking till x, we can check till sqrt(x) because a larger factor of x must be a multiple of smaller factor that has been already checked.
    // The algorithm can be improved further by observing that all primes are of the form 6k ± 1, with the exception of 2 and 3.
    // This is because all integers can be expressed as (6k + i) for some integer k and for i = -1, 0, 1, 2, 3, or 4; 2 divides (6k + 0), (6k + 2), (6k + 4); and 3 divides (6k + 3).
    // So a more efficient method is to test if x is divisible by 2 or 3, then to check through all the numbers of form 6k ± 1.
    if (x <= 1) {
      return false;
    }

    if (x <= 3) {
      return true;
    }

    if (x % 2 === 0 || x % 3 === 0) {
      return false;
    }

    let i = 5;

    while (i * i <= x) {
      if ((x % i === 0) || (x % (i + 2) === 0)) {
        return false;
      }
      i += 6;
    }

    return true;
  }

  isPrime3(x) {
    // Any number x is a prime number if, and only if, (x − 1)! + 1 is divisible by x (Wilson's theorem)
    let factX = new Factorial(x);
    if ((factX.factorial(x - 1) + 1) % x === 0) {
      return true;
    }

    return false;
  }

  isPrime4(x, k) {
    if ((x <= 1 ) || (x === 4)) {
      return false;
    }

    if (x <= 3) {
      return true;
    }

    while (k > 0) {

      const a = this.utilGetRandomArbitrary(a, x - 4);
      const gcd = new EuclideanGCD(x, a);
      const power = new ModularExponentiation();

      if (gcd.gcd(x, a) != 1) {
        return false;
      }

      if (power.power2(a, x - 1, x) != 1) {
        return false;
      }

      k -= 1;
    }

    return true;
  }

  millerTest(d, n) {
    const power = new ModularExponentiation();
    const a = this.utilGetRandomArbitrary(a, n - 4);

    let x = power.power(a, d, n);

    if (x === 1 || x === n - 1) {
      return true;
    }

    while (d != n - 1) {
      x = (x * x) % n;
      d *= 2;

      if (x === 1) {
        return false;
      }

      if (x === n - 1) {
        return true;
      }
    }

    return false;
  }

  isPrime5(n, k) {
    if ((n <= 1 ) || (n === 4)) {
      return false;
    }

    if (n <= 3) {
      return true;
    }

    let d = n - 1;
    while (d % 2 === 0) {
      d /= 2;
    }

    for (let i = 0; i < k; i++) {
      if (!this.millerTest(d, n)) {
        return false;
      }
    }

    return true;
  }

  utilGetRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Sieve of Eratosthenes
  // All primes up to m
  computePrimes(m) {
    let p = [];

    for (let k = 1; k <= m; k++) {
      p[k] = 0;
    }

    p[1] = 1;
    let q = 2;

    for (let r = (q*q); r <= m; r++) {
      p[r] = 1;
    }

    q = 3;

    while ((q * q) <= m) {
      for (r = (q * q); r < m; r++) {
        p[r] = 1;
      }

      do {
        q += 2;
      } while (p[q] !== 0);
    }

    for (let r = 1; r <= m; r++) {
      if (p[r] === 0) {
        console.log(r);
      }
    }
  }
}
