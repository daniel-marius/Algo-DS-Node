class RC5 {
  constructor() {
    this.w = 32;
    this.r = 12;
    this.b = 16;
    this.S = [];
  }

  RotL32(x, c) { return (((x) << (c)) | ((x) >> (32 - (c)))); }

  RotR32(x, c) { return (((x) >> (c)) | ((x) << (32 - (c)))); }

  rc5KeyExapansion(K) {
    const u = this.w / 8,
          c = Math.max(1, Math.ceil(this.b / u)),
          t = 2 * (this.r + 1),
          P = 0xb7e15163,
          Q = 0x9e3779b9;

    let L = [], A, B, i, j, k;

    for (let i = 0; i < this.b; i++) {
      L[i] = 0;
    }

    for (i = this.b - 1, L[c - 1] = 0; i != -1; i--) {
      L[Math.floor(i / u)] = (L[Math.floor(i / u)] << 8) + K[i];
    }


    for (this.S[0] = P, i = 1; i < t; i++) {
      this.S[i] = this.S[i - 1] + Q;
    }

    const n = Math.max(t, c);

    for(A = B = i = j = k = 0; k < 3 * n; k++, i = (i + 1) % t, j = (j + 1) % c) {
      A = this.S[i] = this.RotL32(this.S[i] + (A + B), 3, this.w);
      B = L[j] = this.RotL32(L[j] + (A + B), (A + B) & (this.w - 1), this.w);
    }

  }

  rc5Enc(plaintext) {
    let A = plaintext[0] + this.S[0],
        B = plaintext[1] + this.S[1];

    for (let i = 1; i <= this.r; i++) {
      // A = ((A ^ B) << B) + S[2 * i];
      A = this.RotL32(A ^ B, B & (this.w - 1), this.w) + this.S[2 * i];

      // B = ((B ^ A) << A) + S[2 * i + 1];
      B = this.RotL32(B ^ A, A & (this.w - 1), this.w) + this.S[2 * i + 1];
    }

    A = A & (Math.pow(2, this.w) - 1);
    B = B & (Math.pow(2, this.w) - 1);

    return [A, B];
  }

  rc5Dec(ciphertext) {
    let B = ciphertext[1], A = ciphertext[0];
    for (let i = this.r; i > 0; i--) {
      B = this.RotR32(B - this.S[2 * i + 1], A & (this.w - 1), this.w) ^ A;
      A = this.RotR32(A - this.S[2 * i], B & (this.w - 1), this.w) ^ B;
    }

    B = (B - this.S[1]) & (Math.pow(2, this.w) - 1);
    A = (A - this.S[0]) & (Math.pow(2, this.w) - 1);

    return [A, B];
  }
}

const rc5 = new RC5();

rc5.rc5KeyExapansion([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
const enc = rc5.rc5Enc([65, 65]);
const dec = rc5.rc5Dec(enc);

console.log(enc, dec);
