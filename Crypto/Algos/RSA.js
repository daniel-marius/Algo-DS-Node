const bigInt = require('big-integer');

class RSA {
  static randomPrime(bits) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();

    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      }
    }
  }

  static generate(keysize) {
    const e = this.randomPrime(8);
    let p, q, totient;

    do {
      p = this.randomPrime(keysize / 2);
      q = this.randomPrime(keysize / 2);
      totient = bigInt.lcm(p.prev(), q.prev());
      // totient = (p - 1) * (q - 1);
    } while (bigInt.gcd(e, totient).notEquals(1));

    return {
      e,
      n: p.multiply(q),
      d: e.modInv(totient),
      p: p,
      q: q
    };
  }

  static encode(str) {
    const codes = str.split('').map(i => { return i.charCodeAt(0) }).join('');
    return bigInt(codes);
  }

  static decode(code) {
    const stringify = code.toString();
    let string = '';

    for (let i = 0; i < stringify.length; i += 2) {
      let num = Number(stringify.substr(i, 2));

      if (num <= 30) {
        string += String.fromCharCode(Number(stringify.substr(i, 3)));
        i += 1;
      } else {
        string += String.fromCharCode(num);
      }
    }

    return string;
  }

  static signMessage(message, d, n) {
    const encodedMessage = this.encode(message);
    return bigInt(encodedMessage).modPow(d, n);
  }

  static verifyMessage(signature, e, n) {
    return bigInt(signature).modPow(e, n);
  }

  static encryptMessage(plaintext, e, n) {
    const encodedPlaintext = this.encode(plaintext);
    return bigInt(encodedPlaintext, e, n);
  }

  static decryptMessage(ciphertext, d, n) {
    return bigInt(ciphertext).modPow(d, n);
  }
}

console.log(RSA.randomPrime(8));
console.log(RSA.generate(1024));
console.log(RSA.decode(RSA.encode("rsa")));
