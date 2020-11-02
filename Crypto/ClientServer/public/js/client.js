let socket = io();
let aesKey;

// Test accepting and sending dummy message encrypted with RSA
socket.on("rsa server encrypted message", (msg) => {
  // Test accepting dummy RSA message from server
  addLog("RSA server encrypted dummy message", msg);

  // Decrypting server message using wrapper
  rsaWrapper
    .privateDecrypt(document.getElementById("client_private").value, msg)
    .then((decrypted) => {
      addLog("RSA server decrypted message", decrypted);
    });

  // Test send to server dummy RSA message
  rsaWrapper
    .publicEncrypt(
      document.getElementById("server_public").value,
      "Hello from client with RSA"
    )
    .then((encrypted) => {
      addLog("RSA encrypted base64 message from client", encrypted);
      // emit encryption client message to server
      socket.emit("rsa client encrypted message", encrypted);
    });
});

// Test accepting RSA encrypted AES key and sending AES encrypted message to server
socket.on("send key from server to client", (data) => {
  addLog("Accepting RSA encrypted AES key", data);
  // Decrypting RSA encrypted AES key message
  rsaWrapper
    .privateDecrypt(document.getElementById("client_private").value, data)
    .then((key) => {
      addLog("Decrypted AES key from server in base64 format", key);
      aesKey = key;

      // encrypting test AES message from client to server
      aesWrapper
        .encryptMessage(key, "Hello from client with AES")
        .then((encrypted) => {
          addLog(
            "Encrypted AES message from client to server in base64 format",
            encrypted
          );
          //sending encrypting AES message
          socket.emit("aes client encrypted message", encrypted);
        });
    });
});

// Test decrypting AES message from server
socket.on("aes server encrypted message", (msg) => {
  addLog("Encrypted AES message from server", msg);
  // Decrypting AES message from server
  aesWrapper.decryptMessage(aesKey, msg).then((dec) => {
    addLog("Decrypted AES message from server", dec);
  });
});

function addLog(title, content) {
  let iDiv = document.createElement("div");
  let h = document.createElement("h2");
  h.append(title);
  iDiv.appendChild(h);
  let p = document.createElement("p");
  p.append(content);
  iDiv.appendChild(p);
  document.getElementById("log").appendChild(iDiv);
  document.getElementById("log").appendChild(document.createElement("hr"));
}
