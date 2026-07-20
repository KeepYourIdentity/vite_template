import type { RawSidebarMenuState } from "mocks/types";

export const proyeksiLabaMenu: RawSidebarMenuState[] = [
  {
    id: 0,
    name: "Rencana Laba/Rugi",
    icon: "Scale",
    role: null,
    children: [
      {
        id: 1,
        name: "Proyeksi Laba/Rugi (Gross)",
        icon: "",
        role: null,
        path: "/laba/rencana-labal-rugi/proyeksi",
      },
      {
        id: 2,
        name: "Proyeksi Pajak Penghasilan",
        icon: "",
        role: null,
        path: "/laba/rencana-labal-rugi/pajak-penghasilan",
      },
    ],
  },
  {
    id: 3,
    name: "Proyeksi Biaya",
    icon: "ChartCandlestick",
    role: null,
    children: [
      {
        id: 4,
        name: "Biaya Bunga",
        icon: "",
        role: null,
        path: "/laba/biaya/bunga",
      },
      {
        id: 5,
        name: "Biaya Tenaga Kerja",
        icon: "Users",
        role: null,
        children: [
          {
            id: 6,
            name: "Biaya - Biaya Tenaga Kerja",
            icon: "",
            role: null,
            path: "/laba/biaya/tenaga-kerja/biaya-biaya",
          },
          {
            id: 6,
            name: "Dana Pendidikan Dan Pelatihan",
            icon: "",
            role: null,
            path: "/laba/biaya/tenaga-kerja/dana-pend-pelatih",
          },
        ],
      },
      {
        id: 8,
        name: "Biaya - Biaya Oprasional yang Lain",
        icon: "",
        role: null,
        path: "/laba/biaya/operasional-lain",
      },
      {
        id: 9,
        name: "Biaya Non Operasional",
        icon: "",
        role: null,
        path: "/laba/biaya/non-operasional",
      },
    ],
  },
  {
    id: 10,
    name: "Proyeksi Pendapatan",
    icon: "ChartLine",
    role: null,
    children: [
      {
        id: 11,
        name: "Pendapatan Bunga",
        icon: "",
        role: null,
        path: "/laba/pendapatan/bunga",
      },
      {
        id: 12,
        name: "Pendapatan - Pendapatan Operasional Lainnya",
        icon: "",
        role: null,
        path: "/laba/pendapatan/operasional-lain",
      },
    ],
  },
];
