const ENCODER = new TextEncoder();
const DECODER = new TextDecoder();

const AES_KEY_CACHE = new Map<string, CryptoKey>();

/**
 * Mengubah string rahasia menjadi CryptoKey AES-GCM 256-bit menggunakan SHA-256.
 */
const getAesKey = async (secret: string): Promise<CryptoKey> => {
  let cryptoKey = AES_KEY_CACHE.get(secret);

  if (!cryptoKey) {
    const secretBytes = ENCODER.encode(secret);
    const hash = await crypto.subtle.digest("SHA-256", secretBytes);

    cryptoKey = await crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
    AES_KEY_CACHE.set(secret, cryptoKey);
  }

  return cryptoKey;
};

/**
 * Helper untuk mengubah Buffer ke Hex String
 */
const bufToHex = (buffer: ArrayBuffer | Uint8Array): string => {
  const hashArray = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let hexString = "";
  for (let i = 0; i < hashArray.length; i++) {
    hexString += hashArray[i].toString(16).padStart(2, "0");
  }
  return hexString;
};

/**
 * Helper untuk mengubah Hex String ke Uint8Array
 */
const hexToBuf = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

/**
 * Mengenkripsi payload string menggunakan AES-GCM (Web Crypto API)
 * @param payload - Teks yang ingin dienkripsi
 * @param secret - Kunci rahasia (password/secret key)
 * @returns Format "ivHex:encryptedDataHex"
 */
export const encryptData = async (payload: string, secret: string): Promise<string> => {
  if (!payload || !secret) return "";

  const key = await getAesKey(secret);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const msgData = ENCODER.encode(payload);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as unknown as BufferSource },
    key,
    msgData
  );

  const ivHex = bufToHex(iv);
  const encryptedHex = bufToHex(encryptedBuffer);

  return `${ivHex}:${encryptedHex}`;
};

/**
 * Mendekripsi payload hex menggunakan AES-GCM (Web Crypto API)
 * @param encryptedPayload - Format "ivHex:encryptedDataHex"
 * @param secret - Kunci rahasia yang sama dengan saat enkripsi
 * @returns Teks asli (decrypted payload)
 */
export const decryptData = async (encryptedPayload: string, secret: string): Promise<string> => {
  if (!encryptedPayload || !secret) return "";

  const [ivHex, encryptedHex] = encryptedPayload.split(":");
  if (!ivHex || !encryptedHex) throw new Error("Format payload terenkripsi tidak valid");

  const key = await getAesKey(secret);
  const iv = hexToBuf(ivHex);
  const encryptedBytes = hexToBuf(encryptedHex);

  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as unknown as BufferSource },
      key,
      encryptedBytes as unknown as BufferSource
    );

    return DECODER.decode(decryptedBuffer);
  } catch (error) {
    console.error("Gagal mendekripsi data. Kunci rahasia mungkin salah atau data rusak:", error);
    return "";
  }
};
