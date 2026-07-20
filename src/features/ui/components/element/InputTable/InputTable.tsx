import { RotateCcw, Save } from "lucide-react";
import { NumericFormat } from "react-number-format";
import Button from "ui/components/element/Button";
// import { rows } from "./InputTable.data";
import { useInputTable, useRupiahInput } from "./useInputTable";

import type { MouseEvent } from "react";
import type { EstimasiData, InputTableProps, RowData } from "./InputTable.type";

export default function InputTable({
  data,
  estimasi,
  nominalLabel = "Baki debet", // Default value
  nominalT1Label = "Baki debet T-1", // Default value
  onSave,
  onCancel,
  estimasiTable = false,
}: InputTableProps) {
  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };

  const _handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSave) onSave();
  };

  return (
    // <div className="w-full max-w-2xl justify-between gap-2 font-sans border border-gray-500 rounded-md py-4 px-3">
    // <div className="w-fit font-sans border border-gray-500 rounded-md py-4 px-4 flex flex-col gap-4">
    <div
      className={`w-fit ${estimasiTable ? "mx-full" : ""} font-sans border border-gray-500 rounded-xl py-4 px-4 flex flex-col gap-4`}
    >
      <div className="flex flex-col lg:flex-row gap-20 justify-start">
        <div className="col-lg-8">
          <div className="hidden sm:flex px-3.5 mb-1.5">
            <span className="flex-[1.1] text-left text-s text-gray-600">Bulan</span>
            <span className="flex-[0.85] text-center text-s text-gray-600">% MoM</span>
            <span className="flex-[1.3] text-center text-s text-gray-600">{nominalLabel}</span>
            <span className="flex-[0.85] text-center text-s text-gray-600">% YoY</span>
            <span className="flex-[1.3] text-right text-s text-gray-600">{nominalT1Label}</span>
            {/* <span className="flex-[1.1] text-left text-xs text-gray-400">Bulan</span>
              <span className="flex-[0.85] text-right text-xs text-gray-400">% MoM</span>
              <span className="flex-[1.3] text-right text-xs text-gray-400">Baki debet</span>
              <span className="flex-[0.85] text-right text-xs text-gray-400">% YoY</span>
              <span className="flex-[1.3] text-right text-xs text-gray-400">Baki debet T-1</span> */}
          </div>

          <div className="flex flex-col gap-2">
            {data.map((row) => (
              <RowItem key={row.id} data={row} />
            ))}
          </div>
        </div>
        {estimasiTable && (
          <div className="col-lg-4">
            <div className="hidden sm:flex px-3.5 mb-1.5 items-center justify-center text-center">
              <span className="flex text-s text-gray-600">Estimasi Suku Bunga</span>
            </div>

            <div className="flex flex-col gap-2">
              {estimasi?.map((row) => (
                <RowEstimasi key={row.id} data={row} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2 mt-4 pt-4">
        <Button
          // type="button"
          // onClick={handleSave}
          type="submit"
          // className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2 sm:px-4 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium border border-transparent rounded transition-all duration-200 shadow-sm bg-green-500 text-white hover:bg-green-600 whitespace-nowrap min-w-0"
          className="flex-1 sm:flex-none xy-center gap-1 px-2 sm:px-4 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium border border-transparent rounded transition-all duration-200 shadow-sm bg-green-500 text-white hover:bg-green-600 whitespace-nowrap min-w-0"
        >
          <Save size={18} className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
          <span className="text-sm font-medium">Simpan</span>
        </Button>

        <Button
          // type="button"
          type="reset"
          onClick={handleReset}
          // className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-2 sm:px-4 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium border border-slate-300 rounded transition-all duration-200 shadow-sm bg-gray-500 text-white hover:bg-gray-600 whitespace-nowrap min-w-0"
          className="flex-1 sm:flex-none xy-center gap-1 px-2 sm:px-4 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium border border-slate-300 rounded transition-all duration-200 shadow-sm bg-gray-500 text-white hover:bg-gray-600 whitespace-nowrap min-w-0"
        >
          <RotateCcw size={18} className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
          <span className="text-sm font-medium">Batal</span>
        </Button>
      </div>
    </div>
  );
}

function RowItem({ data }: { data: RowData }) {
  const momInput = useInputTable(data.mom);
  const nominalInput = useRupiahInput(data.nominal);

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] px-3.5 py-2.5">
      <span className="flex-[1.1] text-sm font-medium text-gray-900 min-w-27.5">{data.bulan}</span>

      <span className="flex-[0.85] flex justify-between items-center gap-1">
        {/* Hapus defaultValue, ganti dengan spread operator {...momInput} */}
        <input
          type="number"
          placeholder="%"
          {...momInput}
          className="w-17 h-8 border border-gray-200 rounded-md bg-white text-right font-mono text-sm px-2 text-gray-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
        <p>%</p>
      </span>

      {/* Input Baki Debet -> format rupiah dengan titik pemisah ribuan */}
      <span className="flex-[1.3] flex justify-end">
        <NumericFormat
          value={nominalInput.value ?? null}
          onValueChange={nominalInput.onValueChange}
          placeholder="0"
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          className="w-32 h-8 border border-gray-200 rounded-md bg-white text-right font-mono text-sm px-2 text-gray-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
      </span>

      <span
        className={`flex-[0.85] text-center text-sm font-medium font-mono rounded-md px-2 py-1 ${
          data.yoy < 0 ? "text-red-700 bg-red-50" : "text-green-700 bg-green-50"
        }`}
      >
        {data.yoy} %
      </span>

      <span className="flex-[1.3] text-right text-sm font-mono text-gray-500">{data.nominalT1}</span>
    </div>
  );
}

function RowEstimasi({ data }: { data: EstimasiData }) {
  const persenInput = useInputTable(data.persen);

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] px-3.5 py-2.5">
      <span className="flex-[1.1] text-sm font-medium text-gray-900 min-w-27.5">{data.periode}</span>

      <span className="flex-[0.85] flex justify-between items-center gap-1">
        <input
          type="number"
          placeholder="%"
          {...persenInput}
          className="w-17 h-8 border border-gray-200 rounded-md bg-white text-right font-mono text-sm px-2 text-gray-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
        <p>%</p>
      </span>
    </div>
  );
}
