// biome-ignore assist/source/organizeImports : sort by features
import { DeepFreeze } from "core/utils";

import { kreditMenu } from "./kredit";
import { dpkMenu } from "./dpk";
import { penempatanBankLainMenu } from "./penempatan-bank-lain";
import { proyeksiLabaMenu } from "./proyeksi-laba";
import { aspekKeuanganLainMenu } from "./aspek-keuangan-lain";
import { aspekPermodalanMenu } from "./aspek-permodalan";

import type { DashboardMenuState } from "mocks/types";

export const sidebarMenu = DeepFreeze<DashboardMenuState[]>([
  {
    parent_name: "Kredit",
    parent_icon: "CreditCard",
    parent_desc: "masih belum ditentukan",
    parent_color: "text-blue-600",
    parent_bg: "bg-blue-100",
    parent_shadow: "hover:shadow-blue-100 border-blue-100 hover:border-blue-300",
    parent_available: true,
    parent_child: kreditMenu,
  },
  {
    parent_name: "DPK (Dana Pihak Ketiga)",
    parent_icon: "Banknote",
    parent_desc: "masih belum ditentukan",
    parent_color: "text-cyan-600",
    parent_bg: "bg-cyan-100",
    parent_shadow: "hover:shadow-cyan-100 border-cyan-100 hover:border-cyan-300",
    parent_available: true,
    parent_child: dpkMenu,
  },
  {
    parent_name: "Penempatan Bank Lain",
    parent_icon: "MapPinned",
    parent_desc: "masih belum ditentukan",
    parent_color: "text-violet-600",
    parent_bg: "bg-violet-100",
    parent_shadow: "hover:shadow-violet-100 border-violet-100 hover:border-violet-300",
    parent_available: true,
    parent_child: penempatanBankLainMenu,
  },
  {
    parent_name: "Proyeksi Laba",
    parent_icon: "HandCoins",
    parent_desc: "masih belum ditentukan",
    parent_color: "text-amber-600",
    parent_bg: "bg-amber-100",
    parent_shadow: "hover:shadow-amber-100 border-amber-100 hover:border-amber-300",
    parent_available: true,
    parent_child: proyeksiLabaMenu,
  },
  {
    parent_name: "Aspek Keuangan Lainnya",
    parent_icon: "Handshake",
    parent_desc: "masih belum ditentukan",
    parent_color: "text-rose-600",
    parent_bg: "bg-rose-100",
    parent_shadow: "hover:shadow-rose-100 border-rose-100 hover:border-rose-300",
    parent_available: true,
    parent_child: aspekKeuanganLainMenu,
  },
  {
    parent_name: "Aspek Permodalan",
    parent_icon: "Coins",
    parent_desc: "masih belum ditentukan",
    parent_color: "text-emerald-600",
    parent_bg: "bg-emerald-100",
    parent_shadow: "hover:shadow-emerald-100 border-emerald-100 hover:border-emerald-300",
    parent_available: true,
    parent_child: aspekPermodalanMenu,
  },
]);
