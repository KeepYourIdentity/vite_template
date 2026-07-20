interface LoginResponse {
  status: boolean;
  responseCode: string;
  message: string;
  data?: {
    role: string | null;
  };
}

export const simulasiLogin = (id: string, username: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validasi: reject jika id kosong, username bukan root, atau password salah
      if (id.trim().length < 1 || username.trim() !== "root" || password.trim() !== "Inticomp1!") {
        return reject({
          status: false,
          responseCode: "03",
          message: "invalid username or password",
          data: undefined,
        });
      }

      // Sukses: resolve dengan data user (tanpa password)
      return resolve({
        status: true,
        responseCode: "00",
        message: "Access Granted",
        data: {
          role: "root",
        },
      });
    }, 500);
  });
};
