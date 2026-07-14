import { DeepFreeze } from "core/utils";

import type { DeepReadonly } from "core/utils";

export type RandomStringVariant = "MIX" | "UPPERALPHA" | "LOWERALPHA" | "NUMERIC";

const RANDOM_CHOICES: DeepReadonly<Record<RandomStringVariant, string>> = DeepFreeze({
  MIX: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  UPPERALPHA: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  LOWERALPHA: "abcdefghijklmnopqrstuvwxyz",
  NUMERIC: "0123456789",
});

/**
 * Memotong string jika melebihi batas dan menambahkan titik dinamis
 * sesuai sisa karakter yang dipotong (maksimal 3 titik).
 * @param str - String teks yang akan dipotong
 * @param limit - Batas maksimal karakter sebelum dipotong (default: 50)
 * @returns String yang sudah dipotong dengan titik dinamis
 * @KeepYourIdentity - Creator
 * @version 2.0
 */
export function StringTrimmer(str: string, limit: number = 50): string {
  if (str.length < 1) return "";
  if (limit === 0 || str.length <= limit) return str;
  return str.slice(0, limit) + ".".repeat(Math.min(str.length - limit, 3));
}

/**
 * Menghasilkan string acak berdasarkan panjang dan tipe karakter yang ditentukan.
 * @param length - Panjang string acak yang ingin dihasilkan
 * @param variant - Tipe karakter yang digunakan (default: "MIX")
 * @returns String acak
 * @KeepYourIdentity - Creator
 * @version 2.0
 */
export function generatorRandomString(length: number, variant: RandomStringVariant = "MIX"): string {
  const characters = RANDOM_CHOICES[variant];
  const charactersLength = characters.length;
  let result: string = "";

  for (let i = 0; i < length; i++) {
    result += characters[~~(Math.random() * charactersLength)];
  }

  return result;
}
