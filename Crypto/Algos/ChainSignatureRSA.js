const crypto = require('crypto');
const NodeRSA = require('node-rsa');

class ChainSignatureRSA {
  constructor() {
    this.keyChain = [];
    this.signatureChain = [];
  }

  buildKeyChain(keyChainSize) {
    let i = 0;
    while (i < keyChainSize) {
      const key = new NodeRSA({ b: 1024 });
      this.keyChain.push(key);
      i += 1;
    }
  }

  buildSignatureChain(arrMessages) {
    for (let i = 1; i <= this.keyChain.length; i++) {
      let firstMessage = arrMessages[i - 1] + this.keyChain[i];
      let hashedMessage = crypto.createHash('sha256').update(firstMessage.toString()).digest('hex');
      let signedMessage = this.keyChain[i - 1].sign(hashedMessage, 'base64');

      this.signatureChain.push(signedMessage);
    }
    console.log(this.signatureChain);
  }

  verifySignatureChain(arrMessages) {
    for (let i = 1; i <= this.keyChain.length; i++) {
      let firstMessage = arrMessages[i - 1] + this.keyChain[i];
      let hashedMessage = crypto.createHash('sha256').update(firstMessage.toString()).digest('hex');
      let signedMessage = this.signatureChain[i - 1];
      let verifyMessage = this.keyChain[i - 1].verify(hashedMessage, signedMessage, 'utf8', 'base64');

      console.log(verifyMessage);
    }
  }
}

const cs = new ChainSignatureRSA();

cs.buildKeyChain(5);
cs.buildSignatureChain(['m1', 'm2', 'm3', 'm4']);
cs.verifySignatureChain(['m1', 'm2', 'm3', 'm4']);
