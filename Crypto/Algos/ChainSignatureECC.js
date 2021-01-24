const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class ChainSignatureECC {
  constructor() {
    this.keyChain = [];
    this.signatureChain = [];
  }

  buildKeyChain(keyChainSize) {
    let i = 0;

    while (i < keyChainSize) {
      const keyPair = ec.genKeyPair();
      const privateKey = keyPair.getPrivate('hex');
      const publicKey = keyPair.getPublic('hex');
      const psk = [privateKey, publicKey];

      this.keyChain.push(psk);
      i += 1;
    }
  }

  buildSignatureChain(arrMessages) {
    for (let i = 1; i <= this.keyChain.length - 1; i++) {
      let privKey = ec.keyFromPrivate(this.keyChain[i - 1][0], 'hex');

      let firstMessage;
      if (this.keyChain[i][1] !== undefined) {
        let pubKey = ec.keyFromPublic(this.keyChain[i][1], 'hex');
        firstMessage = arrMessages[i - 1] + pubKey;
      }

      let hashedMessage = crypto.createHash('sha256').update(firstMessage.toString()).digest('hex');
      let signedMessage = privKey.sign(hashedMessage, 'base64');
      let signatureFormat = signedMessage.toDER('hex')

      this.signatureChain.push(signatureFormat);
    }

  }

  verifySignatureChain(arrMessages) {
    for (let i = 1; i <= this.keyChain.length - 1; i++) {
      let firstPubKey = ec.keyFromPublic(this.keyChain[i - 1][1], 'hex');

      let firstMessage;
      if (this.keyChain[i][1] !== undefined) {
        let secondPubKey = ec.keyFromPublic(this.keyChain[i][1], 'hex');
        firstMessage = arrMessages[i - 1] + secondPubKey;
      }

      let hashedMessage = crypto.createHash('sha256').update(firstMessage.toString()).digest('hex');
      let signedMessage = this.signatureChain[i - 1];
      let verifyMessage = firstPubKey.verify(hashedMessage, signedMessage);

      console.log(verifyMessage);
    }
  }

  verifyCustomSignature(arrMessages, messageIndex) {
    if (Math.sign(messageIndex) < 0 || messageIndex > this.keyChain.length - 1) {
      console.log('Wrong Index!');
      process.exit(0);
    }

    if (messageIndex + 2 <= this.keyChain.length - 1) {
      const firstPubKey = ec.keyFromPublic(this.keyChain[messageIndex][1], 'hex');
      const secondPubKey = ec.keyFromPublic(this.keyChain[messageIndex + 1][1], 'hex');
      const thirdPubKey = ec.keyFromPublic(this.keyChain[messageIndex + 2][1], 'hex');

      const firstMessage = arrMessages[messageIndex] + secondPubKey;
      const secondMessage  = arrMessages[messageIndex + 1] + thirdPubKey;

      const firstHashedMessage = crypto.createHash('sha256').update(firstMessage.toString()).digest('hex');
      const secondHashedMessage = crypto.createHash('sha256').update(secondMessage.toString()).digest('hex');

      const firstSignedMessage = this.signatureChain[messageIndex];
      const secondSignedMessage = this.signatureChain[messageIndex + 1];

      const verifyFirstSignedMessage = firstPubKey.verify(firstHashedMessage, firstSignedMessage);
      const verifySecondSignedMessage = secondPubKey.verify(secondHashedMessage, secondSignedMessage);

      console.log(verifyFirstSignedMessage + ' ' + verifySecondSignedMessage);
    }

    if (messageIndex + 1 <= this.keyChain.length - 1) {
      const firstPubKey = ec.keyFromPublic(this.keyChain[messageIndex][1], 'hex');
      const secondPubKey = ec.keyFromPublic(this.keyChain[messageIndex + 1][1], 'hex');

      const firstMessage = arrMessages[messageIndex] + secondPubKey;

      const firstHashedMessage = crypto.createHash('sha256').update(firstMessage.toString()).digest('hex');

      const firstSignedMessage = this.signatureChain[messageIndex];

      const verifyFirstSignedMessage = firstPubKey.verify(firstHashedMessage, firstSignedMessage);

      console.log(verifyFirstSignedMessage);
    }
  }
}

const cs = new ChainSignatureECC();

cs.buildKeyChain(5);
cs.buildSignatureChain(['m0', 'm1', 'm2', 'm3']);
// cs.verifySignatureChain(['m0', 'm1', 'm2', 'm3']);
cs.verifyCustomSignature(['m0', 'm1', 'm2', 'm3'], 0);
