const PORT = process.env.PORT || 4000;
const express = require('express');
const path = require('path');

const rsaWrapper = require('./components/rsa-wrapper');
const aesWrapper = require('./components/aes-wrapper');
rsaWrapper.initLoadServerKeys(__dirname);
rsaWrapper.serverExampleEncrypt();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  let encrypted = rsaWrapper.encrypt(rsaWrapper.clientPub, 'Hello RSA message from client to server');
  socket.emit('rsa server encrypted message', encrypted);

  // Also add a handler for received encrypted RSA message from a client:
  // Test accepting dummy RSA message from client
  socket.on('rsa client encrypted message', (data) => {
    console.log('Server received RSA message from client');
    console.log('Encrypted message is', '\n', data);
    console.log('Decrypted message', '\n', rsaWrapper.decrypt(rsaWrapper.serverPrivate, data));
  });

  // Test AES key sending
  const aesKey = aesWrapper.generateKey();
  let encryptedAesKey = rsaWrapper.encrypt(rsaWrapper.clientPub, (aesKey.toString('base64')));
  socket.emit('send key from server to client', encryptedAesKey);

  // Test accepting dummy AES key message
  socket.on('aes client encrypted message', (data) => {
    console.log('Server received AES message from client', '\n', 'Encrypted message is', '\n', data);
    console.log('Decrypted message', '\n', aesWrapper.decrypt(aesKey, data));

    // Test send client dummy AES message
    let message = aesWrapper.createAesMessage(aesKey, 'Server AES message');
    socket.emit('aes server encrypted message', message);
  });
});
