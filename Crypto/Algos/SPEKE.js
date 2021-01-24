const crypto = require('crypto');
const bigInt = require('big-integer');
const assert = require('assert');

class SPEKE {
  #_prime = undefined;
  #_generator = undefined;
  #_privateKey = undefined;
  #_publicKey = undefined;

  constructor(sizeOrKey, encoding) {
    if (typeof sizeOrKey === 'number') {
      // The actual Node.js crypto's Diffie-Hellman implementation will never be
      // used. Only its prime number generator will be of use.
      const dh = crypto.createDiffieHellman(sizeOrKey, encoding);
      this._prime = dh.getPrime();
    } else {
      this._prime = sizeOrKey;
    }
  }

  getPrime(primeEncoding) {
    return Buffer.from(this._prime).toString(primeEncoding);
  }

  getPublicKey() {
    return this._publicKey;
  }

  getPrivateKey() {
    return this._privateKey;
  }

  getGenerator() {
    return this._generator;
  }

  encode(str) {
    const codes = str.split('').map(i => { return i.charCodeAt(0) }).join('');
    return bigInt(codes);
  }

  decode(code) {
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

  generateKeys(password, algorithm) {
    algorithm = algorithm || 'sha256';

    const primeBigInt = bigInt(this.encode(this.getPrime('hex')));

    // Create the generator
    const hash = crypto.createHash(algorithm);
    hash.update(password);

    const digest = hash.digest('hex');
    const enc = this.encode(digest);
    const dgb = bigInt(enc);
    this._generator = dgb.modPow(bigInt(2), primeBigInt);

    // Create the private key
    this._privateKey = crypto.randomBytes(this.getPrime('hex').length);
    const pr = Buffer.from(this._privateKey).toString('hex');
    const encpr = this.encode(pr);

    this._privateKey = encpr;

    console.log(this._privateKey);

    // Create the public key
    this._publicKey = bigInt(this._generator).modPow(bigInt(this._privateKey), primeBigInt);
  }

  computeSecret(publicKey, inputEncoding, outputEncoding) {
    const secret = bigInt(publicKey).modPow(bigInt(this._privateKey), bigInt(this.encode(this.getPrime('hex'))));

    console.log(secret);
  }
}

const speke1 = new SPEKE(1024);
const speke2 = new SPEKE(speke1.getPrime('hex'), speke1.getGenerator());

speke1.generateKeys('hjvhjvkjhv');
speke2.generateKeys('hjvhjvkjhv');
//
// console.log(speke1.getPrime('hex'));
// console.log(speke2.getPrime('hex'));

const secret1 = speke1.computeSecret(speke2.getPublicKey(), null, 'hex');
const secret2 = speke2.computeSecret(speke1.getPublicKey(), null, 'hex');

assert(secret1 === secret2);
