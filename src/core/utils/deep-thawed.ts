export type DeepMutable<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends ReadonlyArray<infer U>
    ? Array<DeepMutable<U>>
    : T extends object
      ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
      : T;

/**
 * Mencairkan (thaw) sebuah objek yang sudah di-freeze secara rekursif.
 * Karena JavaScript tidak memiliki fitur "unfreeze", fungsi ini bekerja dengan
 * melakukan Deep Clone untuk menghasilkan objek baru yang 100% mutable (bisa diubah).
 * @template T
 * @param obj - Objek (mungkin readonly/frozen) yang akan dicairkan
 * @returns Salinan objek baru yang sepenuhnya mutable
 *
 * @example
 * const frozen = DeepFreeze({ db: { host: "localhost" } });
 * const thawed = DeepThawed(frozen);
 * thawed.db.host = "127.0.0.1"; // Sukses, tidak ada error!
 * @KeepYourIdentity - Creator
 * @version 1.0
 */
export function DeepThawed<T>(obj: T): DeepMutable<T> {
  // 1. Base case: Jika null, bukan objek, atau function, kembalikan apa adanya
  // (Primitive dan Function dilewati dari proses kloning)
  if (obj === null || typeof obj !== "object") {
    return obj as unknown as DeepMutable<T>;
  }

  // 2. Tangani kasus jika objek tersebut adalah sebuah Array
  if (Array.isArray(obj)) {
    return obj.map((item) => DeepThawed(item)) as unknown as DeepMutable<T>;
  }

  // 3. Tangani kasus Object murni. Buat objek kosong baru untuk menampung salinan.
  const thawedObj: Record<string, unknown> = {};
  const keys = Object.getOwnPropertyNames(obj);

  for (const key of keys) {
    // Rekursi untuk setiap properti di dalam objek
    const value = (obj as Record<string, unknown>)[key];
    thawedObj[key] = DeepThawed(value);
  }

  return thawedObj as DeepMutable<T>;
}
