// import React from "react";
import { default as Select } from "ui/components/element/ReactSelect";
// import { useFilterPeriode } from "./useFilterPeriode";

import type { FilterPeriodeProps, PeriodeOption } from "./FilterPeriode.types";

export const FilterPeriode = ({ value, onChange }: FilterPeriodeProps) => {
  const formatPeriode = (val: string) => {
    if (!val) return "";
    return val.length === 6 ? `${val.slice(0, 4)}-${val.slice(4, 6)}` : val;
  };

  const periodeOptions: PeriodeOption[] = [
    { value: "202506", label: formatPeriode("202506") },
    { value: "202607", label: formatPeriode("202607") },
  ];

  const selectedValue = {
    value: value,
    label: formatPeriode(value),
  };

  // const displayValue = value.length === 6 ? `${value.slice(0, 4)}-${value.slice(4, 6)}` : value;

  return (
    <div className="flex items-center gap-2">
      {/* <label htmlFor="filterPeriode" className="text-sm font-medium text-slate-700">
        Periode
      </label>
      <input
        id="filterPeriode"
        type="month"
        value={displayValue}
        maxLength={7}
        onChange={(e) => onChange(e.target.value.replace("-", ""))}
        className="w-46 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none"
      /> */}
      <Select
        label="Periode"
        id="filterPeriode"
        name="filterPeriode"
        value={selectedValue}
        options={periodeOptions}
        noOptionsMessage={() => "Periode tidak ditemukan"}
        onChange={(selectedOption: PeriodeOption | null) => {
          onChange(selectedOption?.value ?? "");
        }}
        // parentClassName="py-1.5 text-sm"
      />
    </div>
  );
};

export default FilterPeriode;
