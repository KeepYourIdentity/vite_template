import { _Pending } from "core/libs/react-toastify";
import { _post } from "./";

import type { ResponseSchemaKey } from "./";

const DATA = {
  bankId: "600001",
  username: "dana",
  password: "123456",
};

// const GLOBAL_FALLBACK: ResponseSchemaKey<undefined> = {
//     status: false,
//     responseCode: "50",
//     message: "Terdapat kesalahan sistem"
// };

const loginService = async (payload: typeof DATA): Promise<[0 | 1, ResponseSchemaKey<undefined>]> => {
  try {
    const loading = _Pending("Mohon tunggu sebentar");
    const res = await _post<undefined, typeof DATA>("/auth/login", payload, {}, loading);
    console.log("Hasil diterima:", JSON.stringify(res));
    console.log("Kuki diterima:", document.cookie);
    return [0, res];
  } catch (err) {
    console.error("Hasil diterima:", JSON.stringify(err));
    return [1, err as ResponseSchemaKey<undefined>];
  }
};

describe("login", () => {
  it("should works", async () => {
    const [code, resp] = await loginService(DATA);
    expect(code).toBe(0);
    expect(resp.responseCode).toBe("00");
  });
});
