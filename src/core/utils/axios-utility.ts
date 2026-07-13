const SIGNATURE_ENCODER = new TextEncoder();
const SIGNATURE_HMAC_KEY_CACHE = new Map<string, CryptoKey>();

/**
 * Menghasilkan HMAC SHA-256 signature dari payload string menggunakan Web Crypto API.
 * Dioptimasi dengan Key Caching dan memori O(1) untuk konversi Hex.
 * @param payload - String data yang akan dienkripsi (ditandatangani)
 * @param secret - Kunci rahasia (secret key) untuk HMAC
 * @returns Hasil signature dalam format Hex String
 * @KeepYourIdentity - Creator
 * @version 2.0
 */
export async function generateSignature(payload: string, secret: string): Promise<string> {
  if (!payload || !secret) return "";

  const msgData = SIGNATURE_ENCODER.encode(payload);
  let cryptoKey = SIGNATURE_HMAC_KEY_CACHE.get(secret);

  if (!cryptoKey) {
    const keyData = SIGNATURE_ENCODER.encode(secret);
    cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    SIGNATURE_HMAC_KEY_CACHE.set(secret, cryptoKey);
  }

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);

  const hashArray = new Uint8Array(signatureBuffer);
  let hexString = "";

  for (let i = 0; i < hashArray.length; i++) {
    hexString += hashArray[i].toString(16).padStart(2, "0");
  }

  return hexString;
}

function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);

  const objRecord = obj as Record<string, unknown>;
  const sortedKeys = Object.keys(objRecord).sort();

  const ordered: Record<string, unknown> = {};
  for (const key of sortedKeys) {
    ordered[key] = sortObjectKeys(objRecord[key]);
  }

  return ordered;
}

/**
 * Mengurutkan kunci (keys) di dalam objek secara alfabetis sebelum mengubahnya menjadi JSON string.
 * Sangat berguna untuk memastikan konsistensi hash/signature dari sebuah payload.
 * @param obj - Objek atau array yang akan di-stringify
 * @returns Hasil JSON string dengan kunci yang sudah terurut
 * @example
 * const sample = { z: "1", a: "2" };
 * const ordered = canonicalStringify(sample); // '{"a":"2","z":"1"}'
 * @Anonymous - Creator
 * @version 2.0
 */
export function canonicalStringify<T>(obj: T): string {
  return JSON.stringify(sortObjectKeys(obj) ?? {});
}
