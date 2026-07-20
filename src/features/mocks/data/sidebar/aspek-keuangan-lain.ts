import type { RawSidebarMenuState } from "mocks/types";

export const aspekKeuanganLainMenu: RawSidebarMenuState[] = [
  {
    id: 0,
    name: "Aset - Aset Lainnya",
    icon: "Gem",
    role: null,
    children: [
      {
        id: 1,
        name: "Aktiva Tetap, Inventaris, Dan Aset Tidak Berwujud",
        icon: "",
        role: null,
        path: "/keuangan/aset/aktiva-non-wujud",
      },
      {
        id: 2,
        name: "Rincian Aset Lainnya",
        icon: "",
        role: null,
        path: "/keuangan/aset/rincian-aset",
      },
      {
        id: 3,
        name: "Kewajiban - Kewajiban Lainnya",
        icon: "",
        role: null,
        path: "/keuangan/aset/kewajiban-lain",
      },
      {
        id: 4,
        name: "Rekening Administratif",
        icon: "",
        role: null,
        path: "/keuangan/aset/rekening-administratif",
      },
      {
        id: 5,
        name: "Rencana Penyedia Kas",
        icon: "",
        role: null,
        path: "/keuangan/aset/rencana-penyedia-kas",
      },
    ],
  },
];
