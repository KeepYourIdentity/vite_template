// export interface RowData {
//   bulan: string;
//   mom: number;
//   baki: number;
//   yoy: number;
//   bakiT1: string;
// }

export interface RowData {
  id: string;
  bulan: string;
  mom: number | string;
  nominal: number | string; // Menggantikan 'baki'
  yoy: number;
  nominalT1: string | number; // Menggantikan 'bakiT1'
}

export interface EstimasiData {
  id: string;
  periode: string;
  persen: number;
}

export interface InputTableProps {
  data: RowData[];
  estimasi?: EstimasiData[];
  nominalLabel?: string;
  nominalT1Label?: string;
  onSave?: () => void;
  onCancel?: () => void;
  estimasiTable?: boolean;
}
