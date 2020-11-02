const crypto = require("crypto");

class RC4 {
  constructor() {}

  rc4KeyScheduling(k) {
    let s = [],
      k2 = [];

    for (let i = 0; i < 256; i++) {
      s[i] = i;
      k2[i] = k[i % k.length];
    }

    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + s[i] + k2[i]) % 256;
      let aux = s[i];
      s[i] = s[j];
      s[j] = aux;
    }

    // return String.fromCharCode(s[254]);
    return s;
  }

  rc4Prng(k) {
    const keyScheduling = this.rc4KeyScheduling(k);

    let i = 0,
      j = 0,
      i1 = 0;
    let output = 0;
    while (i1 < 4) {
      i = (i + 1) % 256;
      j = (j + keyScheduling[i]) % 256;
      let aux = keyScheduling[i];
      keyScheduling[i] = keyScheduling[j];
      keyScheduling[j] = aux;
      // output = keyScheduling[(keyScheduling[i] + keyScheduling[j]) % 256];
      output =
        keyScheduling[(keyScheduling[i] + keyScheduling[j]) % 256] <<
        (24 - i1 * 8);
      // output |= keyScheduling[(keyScheduling[i] + keyScheduling[j]) % 256] << (24 - (i1 * 8));
      i1 += 1;
    }
    return output;
  }

  rc4Vmpc(k) {
    const keyScheduling = this.rc4KeyScheduling(k);

    let i = 0,
      j = 0;
    let output = 0;
    while (i < 4) {
      let a = keyScheduling[i];
      j = keyScheduling[(j + a) % 256];

      // output = keyScheduling[keyScheduling[(keyScheduling[j] + 1) % 256]];
      // output = keyScheduling[keyScheduling[(keyScheduling[j] + 1) % 256]] << (24 - (i * 8));
      output |=
        keyScheduling[keyScheduling[(keyScheduling[j] + 1) % 256]] <<
        (24 - i * 8);

      let aux = keyScheduling[i];
      keyScheduling[i] = keyScheduling[j];
      keyScheduling[j] = aux;

      i += 1;
    }
    return output;
  }

  rc4Plus(k) {
    const keyScheduling = this.rc4KeyScheduling(k);

    let i = 0,
      j = 0,
      i1 = 0;
    let output = 0;

    while (i1 < 256) {
      i = (i + 1) % 256;
      let a = keyScheduling[i];
      j = (j + a) % 256;

      let b = keyScheduling[j];
      keyScheduling[i] = b;
      keyScheduling[j] = a;

      let c =
        (keyScheduling[(i << 5) ^ (j >> 3)] +
          keyScheduling[(j << 5) ^ (i >> 3)]) %
        256;
      output =
        (keyScheduling[(a + b) % 256] + keyScheduling[c ^ 0xaa]) % 256 ^
        keyScheduling[(j + b) % 256];

      i1 += 1;
    }

    return output;
  }
}

const rc4 = new RC4();
const k = crypto.randomBytes(16);

// console.log(rc4.rc4KeyScheduling(k));
console.log(rc4.rc4Plus(k));
