const bigInt = require('big-integer');
const crypto = require('crypto');

const q = bigInt(10079033);
const k = bigInt(2);
const p = bigInt((q * k) + 1);
const h = bigInt(Math.floor(Math.random()*(p - 2)) + 1);
const g = bigInt(h.modPow((p - 1) / q, p));
const privKey = bigInt(Math.floor(Math.random() * q));
const pubKey = bigInt(g.modPow(privKey, p));

class DSA {
  static randomPrimeNBit(N) {
    // N could have 160/224/256 bits
    const min = bigInt.one.shiftLeft(N - 1);
    const max = bigInt.one.shiftLeft(N).prev();

    while (true) {
      let q = bigInt.randBetween(min, max);
      if (q.isProbablePrime(256)) {
        return q;
      }
    }
  }

  static randomPrimeLBit(L, N) {
    // L is a multiple of 64 between 512 and 1024.
    const min = bigInt.one.shiftLeft(L - 1);
    const max = bigInt.one.shiftLeft(L).prev();

    // const q = this.randomPrimeNBit(N);
    // while (true) {
    //   let p = bigInt.randBetween(min, max);
    //   console.log(p);
    //   if (p.minus(1).mod(q).isZero(0)) {
    //     return p;
    //   }
    // }

    let p, q;

    do {
      q = this.randomPrimeNBit(N);
      p = bigInt.randBetween(min, max);
      console.log(p);
    } while (p.minus(1).mod(q).notEquals(0));
  }

  static generateKeys() {
    return { privKey, pubKey };
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

  static signMessage(message, privKey) {
    const messageHashDigest = crypto
      .createHash('sha256')
      .update(message.toString())
      .digest('hex');

    const encodeMessageHashDigest = this.encode(messageHashDigest) % q;

    let s = bigInt(0);
    let k = bigInt(Math.floor(Math.random() * q));
    let r = bigInt((g.modPow(k, p)) % q);

    while (s.equals(0)) {
      k = bigInt(Math.floor(Math.random() * (q - 1) + 1));
      r = bigInt((g.modPow(k, p)) % q);
      s = bigInt((k.modInv(q) * ((encodeMessageHashDigest + (privKey * r)) % q)) % q);
    }

    return { r, s };
  }

  static verifyMessage(message, signature, privKey) {
    const messageHashDigest = crypto
      .createHash('sha256')
      .update(message.toString())
      .digest('hex');

    const encodeMessageHashDigest = this.encode(messageHashDigest) % q;

    const { r, s } = this.signMessage(message, privKey);
    let w = bigInt(s).modInv(q);
    let u1 = (encodeMessageHashDigest * w) % q;
    let u2 = (r * w) % q;
    let verify = bigInt(((g.modPow(u1, p) * pubKey.modPow(u2, p)) % p) % q);
    return verify.minus(r).isZero() ? 'Signature is Valid!' : 'Signature is not Valid!';
  }
}

const keys = DSA.generateKeys();
const signature = DSA.signMessage('mess', keys.privKey);
console.log(DSA.verifyMessage('mess', signature, keys.privKey));
