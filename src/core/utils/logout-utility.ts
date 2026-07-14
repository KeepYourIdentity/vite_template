// import { localList, sessionList } from "src/configs/base";
// import { _delete } from "src/libs/api";
import { localStorageList, sessionStorageList } from "core/libs/axios";
import { local, session } from "core/utils";

import type { LocalStorageKey, SessionStorageKey } from "core/libs/axios";

/** Temporary, replace with intercentor then delete this */
const _delete = (url: string): Promise<void> => {
  // Simulasi panggilan API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`API DELETE request to ${url} completed.`);
      resolve();
    }, 1000); // Simulasi delay 1 detik
  });
};

let isLoggingOut = false;
const ENV_STATUS = String(import.meta.env.VITE_ENV || "Development");

export interface CustomErrorType {
  status: boolean;
  responseCode: string;
  message: string;
}

interface LogoutProps {
  callApi?: boolean;
}

/**
 * Memproses aksi logout pengguna, menghapus session/cookie, dan memanggil API logout.
 * @param props - Konfigurasi logout
 * @returns Tuple: [pesan_status, kode_error (0 = sukses, 1 = gagal)]
 */

export const logout = async ({ callApi = true }: LogoutProps): Promise<void> => {
  if (isLoggingOut) {
    // return ["no-act", 1];
    return;
  }

  isLoggingOut = true;
  // let errorMessage: string | null = null;

  try {
    if (callApi) {
      await _delete("/v1/adm/logout");
    }
  } catch (error: unknown) {
    if (ENV_STATUS.trim().toLowerCase() === "development") {
      console.error("Terjadi sesuatu saat logout:", error);
    }
    // if (typeof error === "object" && error !== null && !Array.isArray(error)) {
    // const { message = "" } = error as Partial<CustomErrorType>;
    // errorMessage = message ?? "sys-bad";
    // }
  } finally {
    isLoggingOut = false;

    session.remove(sessionStorageList as SessionStorageKey[]);
    local.remove(localStorageList as LocalStorageKey[]);

    if (document.cookie) {
      document.cookie.split(";").forEach((c) => {
        // biome-ignore lint/suspicious/noDocumentCookie: intentional cookie clearing on logout
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
    }
  }

  // return errorMessage ? [errorMessage, 1] : ["success", 0];
};
