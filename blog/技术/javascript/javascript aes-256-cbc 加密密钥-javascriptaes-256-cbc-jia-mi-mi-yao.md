```js
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../config/openai_config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const apiKey = config.OPENAI_API_KEY;

function encryptKey(key, password) {
  const algorithm = "aes-256-cbc";
  const keyBuffer = Buffer.from(key, "utf8");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
  let encrypted = cipher.update(keyBuffer);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
}
function decryptKey(encryptedData, password, iv) {
  const algorithm = "aes-256-cbc";
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(Buffer.from(encryptedData, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
}
// 示例用法
const password = "x5PAB4q8DFyoVbw2OSAzhRb2L0mmibhi";
const encryptedKey = encryptKey(apiKey, password);

console.log(decryptKey(data,password,iv));
module.exports = {decryptKey};
```