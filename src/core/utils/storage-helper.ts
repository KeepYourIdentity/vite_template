interface ISetterInput<T = unknown> {
  storage: string;
  data: T;
}

const createStorageHelper = (store: Storage) => ({
  set<T = unknown>(input: ISetterInput<T> | ISetterInput<T>[]): void {
    const items = Array.isArray(input) ? input : [input];
    for (const { storage, data } of items) {
      if (!storage.trim() || data === null || data === undefined || data === "") {
        continue;
      }
      store.setItem(storage, JSON.stringify(data));
    }
  },
  get<T = unknown>(key: string): T | null {
    if (!key.trim()) return null;
    const raw = store.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  remove(keys: string | string[]): void {
    const targets = Array.isArray(keys) ? keys : [keys];
    targets.forEach((key) => {
      store.removeItem(key);
    });
  },

  clear(): void {
    store.clear();
  },
});

export const session = createStorageHelper(window.sessionStorage);
export const local = createStorageHelper(window.localStorage);
