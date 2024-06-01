export async function generateKeyPair() {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256'
      },
      true,
      ['encrypt', 'decrypt']
    );

    const publicKey = await window.crypto.subtle.exportKey(
      'spki',
      keyPair.publicKey
    );
    const privateKey = await window.crypto.subtle.exportKey(
      'pkcs8',
      keyPair.privateKey
    );

    return {
      publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))),
      privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey)))
    };
  } catch (err) {
    console.error('Error generating key pair:', err);
    throw err;
  }
}

export async function encryptWithPublicKey(message: string, publicKey: string) {
  try {
    const key = await window.crypto.subtle.importKey(
      'spki',
      Uint8Array.from(atob(publicKey), c => c.charCodeAt(0)),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
      },
      false,
      ['encrypt']
    );

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      key,
      new TextEncoder().encode(message)
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (err) {
    console.error('Error encrypting with public key:', err);
    throw err;
  }
}

export async function decryptWithPrivateKey(encryptedMessage: string, privateKey: string) {
  try {
    const key = await window.crypto.subtle.importKey(
      'pkcs8',
      Uint8Array.from(atob(privateKey), c => c.charCodeAt(0)),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
      },
      false,
      ['decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP'
      },
      key,
      Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0))
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    console.error('Error decrypting with private key:', err);
    throw err;
  }
}

// 生成对称加密密钥并导出为字符串
export async function generateSymmetricKey(): Promise<string> {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // 可导出密钥
    ["encrypt", "decrypt"]
  );

  const exportedKey = await crypto.subtle.exportKey("jwk", key);
  return JSON.stringify(exportedKey);
}

// 将字符串形式的密钥导入为 CryptoKey
async function importSymmetricKey(keyString: string): Promise<CryptoKey> {
  const keyData = JSON.parse(keyString);
  return await crypto.subtle.importKey(
    "jwk",
    keyData,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

// 加密消息
export async function encryptWithSymmetricKey(message: string, keyString: string): Promise<string> {
  const key = await importSymmetricKey(keyString);
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // 生成初始化向量
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  );

  // 将 IV 和密文组合为一个字符串
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return btoa(String.fromCharCode(...combined));
}

// 解密消息
export async function decryptWithSymmetricKey(combinedString: string, keyString: string): Promise<string> {
  const key = await importSymmetricKey(keyString);
  const combined = Uint8Array.from(atob(combinedString), c => c.charCodeAt(0));

  // 从组合字符串中提取 IV 和密文
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12).buffer;

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}