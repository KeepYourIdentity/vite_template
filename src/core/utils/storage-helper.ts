interface ISetterInput<T = unknown> {
  storage: string;
  data: T;
}

const createStorageHelper = (store: Storage) => {
  // Simpan listener agar bisa di-remove nanti
  const listeners = new Set<(key: string, value: unknown) => void>();

  // Menggunakan event 'storage' dari browser
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === store && event.key) {
        const val = event.newValue ? JSON.parse(event.newValue) : null;
        listeners.forEach((callback) => { callback(event.key as string, val); });
      }
    });
  }

  return {
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

    subscribe(callback: (key: string, value: unknown) => void) {
      listeners.add(callback);
      return () => listeners.delete(callback); // Return unsubscribe function
    }
  };
};

export const session = createStorageHelper(window.sessionStorage);
export const local = createStorageHelper(window.localStorage);
