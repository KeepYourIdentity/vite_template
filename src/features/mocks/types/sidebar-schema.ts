export interface RawSidebarMenuState {
  /**
   * Urutan tampil menu.
   * Digunakan untuk sorting agar konsisten.
   */
  id: number;

  /** Nama menu yang ditampilkan. */
  name: string;

  /** Nama lucide icon. */
  icon: string;

  /**
   * Role yang diizinkan.
   * null = semua role.
   * Multiple role dipisahkan koma.
   *
   * Contoh:
   * "admin"
   * "admin,supervisor"
   */
  role: string | null;

  /**
   * alamat enpoint tertuju
   *
   * @example
   * path: "/user/management"
   */
  path?: string;

  /** submenu dari menu yang tertulis */
  children?: RawSidebarMenuState[];
}

/**
 * Digunakan untuk menampung data mentah dari menu sidebar yang akan ditampilkan.
 * Digunakan untuk interaksi di beranda sebagai menu navigasi.
 */
export interface DashboardMenuState {
  /** nama card */
  parent_name: string;

  /** icon card */
  parent_icon: string;

  /** deskripsi card */
  parent_desc: string;

  /** warna card */
  parent_color: string;

  /** warna latar belakang card beranda */
  parent_bg: string;

  /** bayangan card menu */
  parent_shadow: string;

  /** status ketersediaan menu */
  parent_available: boolean;

  /** daftar menu anak dari card */
  parent_child: RawSidebarMenuState[];
}
