import crypto from "crypto";
const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.ENCRYPTION_KEY as string, "base64");
const IV_LENGTH = 12;

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encryptedData = cipher.update(text, "utf-8", "base64");
  encryptedData += cipher.final("base64");

  const authTag = cipher.getAuthTag().toString("base64");

  const encryptedPayload = JSON.stringify({
    iv: iv.toString("base64"),
    authTag,
    encryptedData,
  });

  return Buffer.from(encryptedPayload, "utf-8").toString("base64");
}

function decrypt(encryptedString: string) {
  const encryptedPayload = JSON.parse(
    Buffer.from(encryptedString, "base64").toString("utf-8"),
  );

  const { iv, authTag, encryptedData } = encryptedPayload;

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  let decryptedData = decipher.update(encryptedData, "base64", "utf8");
  decryptedData += decipher.final("utf8");

  return decryptedData;
}

module.exports = {
  encrypt,
  decrypt,
};
