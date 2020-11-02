const crypto = require('crypto');
const aes256 = require('aes256');
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

class Cryptography {
  constructor() {}

  static cryptoAlgos() {
    const hash = crypto.createHash('md5').update('password').digest('hex');
    // console.log(hash);

    const secret = 'secret key';
    const hash2 = crypto.createHmac('sha256', secret).update('password').digest('hex');
    // console.log(hash2);

    const algorithm = 'aes-192-cbc';
    const password = 'Password used to generate key';
    const key = crypto.scryptSync(password, 'salt', 24);
    const cipher = crypto.createCipher(algorithm, key);
    const decipher = crypto.createDecipher(algorithm, key);

    let encrypted = '';
    cipher.on('readable', () => {
      let chunk;
      while (null !== (chunk = cipher.read())) {
        encrypted += chunk.toString('hex');
      }
    });

    cipher.on('end', () => console.log(encrypted));
    cipher.write('Some clear text data');
    cipher.end();

    let decrypted = '';
    decipher.on('readable', () => {
      let chunk;
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });

    decipher.on('end', () => console.log(decrypted));
    const encrypted2 = '574008a0d113d4aea4abb49fba0c21a0f39c825fb7a18fea80a7cf7ed6831fde';
    decipher.write(encrypted2, 'hex');
    decipher.end();
  }

  static cryptoAlgos2() {
    // console.log(crypto.getHashes());
    // console.log(crypto.getCiphers());

    crypto.randomBytes(16, (err, buf) => {
      console.log(buf.toString('hex'));
    });

    let iv = crypto.randomBytes(16);

    let hash = crypto.createHash('sha256').update('your message').digest('hex');
    console.log(hash);

    // aes 256-bit cipher block chaining enc/dec
    const secret_message = ':)';
    const key = '12345678123456781234567812345678';

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(secret_message, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    console.log('encrypted: ' + encrypted);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    console.log('decrypted: ' + decrypted);
  }

  static cryptoAlgos3() {
    const alice = crypto.getDiffieHellman('modp15');
    const bob = crypto.getDiffieHellman('modp15');

    // console.log(alice.getPrime().toString('hex'));

    alice.generateKeys();
    bob.generateKeys();

    const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
    const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

    // console.log(aliceSecret);
    // console.log(bobSecret);
    // console.log(aliceSecret === bobSecret);

    // console.log(crypto.getCurves());

    const alice2 = crypto.createECDH('secp256k1');
    alice2.generateKeys();

    const bob2 = crypto.createECDH('secp256k1');
    bob2.generateKeys();

    const alicePublicKeyBase64 = alice2.getPublicKey().toString('base64');
    const bobPublicKeyBase64 = bob2.getPublicKey().toString('base64');

    const aliceSharedKey = alice2.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
    const bobSharedKey = bob2.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

    // console.log(aliceSharedKey === bobSharedKey);

    // aes256
    const message = 'my message';
    const encrypted = aes256.encrypt(aliceSharedKey, message);
    // console.log(encrypted);

    const decrypted = aes256.decrypt(bobSharedKey, encrypted);
    // console.log(decrypted);

    // aes-256-gcm
    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(aliceSharedKey, 'hex'), IV);

    let encrypted2 = cipher.update(message, 'utf8', 'hex');
    encrypted2 += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    console.table({
      IV: IV.toString('hex'),
      encrypted: encrypted2,
      authTag: authTag
    });

    const payload = IV.toString('hex') + encrypted2 + authTag;
    const payloadBase64 = Buffer.from(payload, 'hex').toString('base64');

    // console.log(payloadBase64);

    const bobPayload = Buffer.from(payloadBase64, 'base64').toString('hex');
    const bobIV = bobPayload.substr(0, 32);
    const bobEncrypted = bobPayload.substr(32, bobPayload.length - 32 - 32);
    const bobAuthTag = bobPayload.substr(bobPayload.length - 32, 32);

    console.table({
      bobIV,
      bobEncrypted,
      bobAuthTag
    });

    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(bobSharedKey, 'hex'),
        Buffer.from(bobIV, 'hex')
      );

      decipher.setAuthTag(Buffer.from(bobAuthTag, 'hex'));

      let decrypted = decipher.update(bobEncrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      console.log('Decrypted Message: ' + decrypted);

    } catch (error) {
      console.log(error.message);
    }
  }

  static cryptoAlgos4() {
    // RSA enc/dec
    const secret = 'my secret';
    const key = new NodeRSA({ b: 1024 }); // public & private

    // const encryptedString = key.encrypt(secret, 'base64');
    // console.log(encryptedString);
    //
    // const decryptedString = key.decrypt(encryptedString, 'utf8');
    // console.log(decryptedString);

    const privateKey = key.exportKey('private');
    const publicKey = key.exportKey('public');

    const keyPrivate = new NodeRSA(privateKey);
    const keyPublic = new NodeRSA(publicKey);

    const encryptedString = keyPublic.encrypt(secret, 'base64');
    console.log(encryptedString);

    const decryptedString = keyPrivate.decrypt(encryptedString, 'utf8');
    console.log(decryptedString);

    // JWT RSA Sign/Verify
    let payload = {};
    payload.username = 'username';
    payload.userId = '12345';
    payload.role = 'admin';

    console.log('Payload: ' + JSON.stringify(payload));

    const issuer = 'CompanyX';
    const subject = 'companyx@gmail.com';
    const audience = 'https://youtube.com';
    const expiresIn = '1h';
    const algorithm = 'RS256';

    const signOptions = {
      issuer,
      subject,
      audience,
      expiresIn,
      algorithm
    }

    const token = jwt.sign(payload, privateKey, signOptions);
    console.log('Token: ' + token);

    const verifyOptions = {
      issuer,
      subject,
      audience,
      expiresIn,
      algorithm
    }

    const verifiedToken = jwt.verify(token, publicKey, verifyOptions);
    console.log('Verified Token: ' + JSON.stringify(verifiedToken));

    const decodedToken = jwt.decode(token, { complete: true });
    console.log('Decoded Header: ' + JSON.stringify(decodedToken.header));
    console.log('Decoded Paylod: ' + JSON.stringify(decodedToken.payload));
    console.log('Details from the user: ' + payload.userId + ' are sent back to client');
  }

  static caesarCipher(str, num) {
    num %= 26;
    const lowerCaseStr = str.toLowerCase();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let newStr = '';

    for (let i = 0; i < lowerCaseStr.length; i++) {
      let currentLetter = lowerCaseStr[i];
      if (currentLetter === ' ') {
        newStr += currentLetter;
        continue;
      }

      const currentIndex = alphabet.indexOf(currentLetter);
      let newIndex = currentIndex + num;

      if (newIndex > 25) {
        newIndex -= 26;
      }

      if (newIndex < 0) {
        newIndex += 26;
      }

      if (str[i] === str[i].toUpperCase()) {
        newStr += alphabet[newIndex].toUpperCase();
      } else {
        newStr += alphabet[newIndex];
      }
    }
    return newStr;
  }

}

Cryptography.cryptoAlgos4();
