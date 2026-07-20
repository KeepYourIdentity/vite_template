import type { RawSidebarMenuState } from "mocks/types";

export const dpkMenu: RawSidebarMenuState[] = [
  {
    id: 0,
    name: "DPK Non BANK",
    icon: "PiggyBank",
    role: null,
    children: [
      {
        id: 1,
        name: "Proyeksi Pertumbuhan Tabungan",
        icon: "",
        role: null,
        path: "/dpk/non-bank/pertumbuhan-tabungan",
      },
      {
        id: 2,
        name: "Proyeksi Pertumbuhan Deposito",
        icon: "",
        role: null,
        path: "/dpk/non-bank/pertumbuhan-deposito",
      },
    ],
  },
  {
    id: 3,
    name: "DPK BANK",
    icon: "",
    role: null,
    path: "/dpk/bank",
  },
];
