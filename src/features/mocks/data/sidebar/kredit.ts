import type { RawSidebarMenuState } from "mocks/types";

export const kreditMenu: RawSidebarMenuState[] = [
  {
    id: 0,
    name: "Proyeksi Kredit Global",
    icon: "CreditCard",
    role: null,
    children: [
      {
        id: 1,
        name: "Pertumbuhan Kredit",
        icon: "",
        role: null,
        path: "/kredit/global/pertumbuhan",
      },
      {
        id: 2,
        name: "Pergerakan Kualitas",
        icon: "",
        role: null,
        path: "/kredit/global/kualitas",
      },
      {
        id: 3,
        name: "Pencadangan Kredit",
        icon: "",
        role: null,
        children: [
          {
            id: 4,
            name: "Proyeksi CKPN",
            icon: "",
            role: null,
            path: "/kredit/global/pencadangan/ckpn",
          },
          {
            id: 5,
            name: "Proyeksi PPKA",
            icon: "",
            role: null,
            path: "/kredit/global/pencadangan/ppka",
          },
        ],
        // path: "/kredit/global/pencadangan",
      },
    ],
  },
  {
    id: 6,
    name: "Proyeksi Pembersihan Kredit",
    icon: "BrushCleaning",
    role: null,
    children: [
      {
        id: 7,
        name: "Perencanaan Hapus Buku",
        icon: "",
        role: null,
        path: "/kredit/pembersihan/rencana-hapus-buku",
      },
      {
        id: 8,
        name: "Perencanaan AYDA",
        icon: "",
        role: null,
        path: "/kredit/pembersihan/rencana-ayda",
      },
    ],
  },
  {
    id: 9,
    name: "Proyeksi Kredit Kategori",
    icon: "Tags",
    role: null,
    children: [
      {
        id: 10,
        name: "Berdasarkan Jenis Penggunaan",
        icon: "UserRound",
        role: null,
        children: [
          {
            id: 11,
            name: "Pertumbuhan Kredit",
            icon: "",
            role: null,
            path: "/kredit/kategori/pertumbuhan/penggunaan",
          },
          {
            id: 12,
            name: "Pergerakan Kualitas",
            icon: "",
            role: null,
            path: "/kredit/kategori/kualitas/penggunaan",
          },
        ],
      },
      {
        id: 13,
        name: "Berdasarkan Jenis Sektor Ekonomi",
        icon: "ChartLine",
        role: null,
        children: [
          {
            id: 14,
            name: "Pertumbuhan Kredit",
            icon: "",
            role: null,
            path: "/kredit/kategori/pertumbuhan/sektor-ekonomi",
          },
          {
            id: 15,
            name: "Pergerakan Kualitas",
            icon: "",
            role: null,
            path: "/kredit/kategori/kualitas/sektor-ekonomi",
          },
        ],
      },
      {
        id: 16,
        name: "Berdasarkan Jenis Usaha",
        icon: "CircleDollarSign",
        role: null,
        children: [
          {
            id: 17,
            name: "Pertumbuhan Kredit",
            icon: "",
            role: null,
            path: "/kredit/kategori/pertumbuhan/usaha",
          },
          {
            id: 18,
            name: "Pergerakan Kualitas",
            icon: "",
            role: null,
            path: "/kredit/kategori/kualitas/usaha",
          },
        ],
      },
    ],
  },
];
