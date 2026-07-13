export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

/**
 * Membekukan (freeze) sebuah objek beserta seluruh objek di dalamnya secara rekursif.
 * Mencegah terjadinya mutasi data pada kedalaman (depth) berapa pun.
 * @template T
 * @param obj - Objek yang akan dibekukan
 * @returns Objek yang sama namun sudah sepenuhnya dibekukan (frozen)
 *
 * @example
 * const CONFIG = deepFreeze({ db: { host: "localhost" } });
 * CONFIG.db.host = "x"; // Silently ignored (atau throw error di strict mode)
 * @KeepYourIdentity - Creator
 * @version 2.0
 */
export function DeepFreeze<T>(obj: T): DeepReadonly<T> {
  if (obj === null || typeof obj !== "object" || Object.isFrozen(obj)) {
    return obj as DeepReadonly<T>;
  }

  const keys = Object.getOwnPropertyNames(obj);

  for (const key of keys) {
    const value = (obj as Record<string, unknown>)[key];
    DeepFreeze(value);
  }

  return Object.freeze(obj) as DeepReadonly<T>;
}
