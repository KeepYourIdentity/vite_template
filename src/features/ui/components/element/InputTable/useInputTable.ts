import { useState } from "react";

import type { ChangeEvent } from "react";

export function useInputTable(initialValue: string | number = "") {
  const [value, setValue] = useState<string | number>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, type } = e.target;

    // 1. Cek secara otomatis tipe input HTML-nya
    if (type === "number") {
      // Jika input type="number", simpan sebagai Angka (jika kosong, biarkan "")
      setValue(inputValue === "" ? "" : Number(inputValue));
    } else {
      // Jika input type="text" atau lainnya, simpan sebagai String biasa
      setValue(inputValue);
    }
  };

  return { value, onChange };
}

import type { NumberFormatValues } from "react-number-format";

export function useRupiahInput(initialValue: number | string = "") {
  const [value, setValue] = useState<number | undefined>(initialValue === "" ? undefined : Number(initialValue));

  const onValueChange = (values: NumberFormatValues) => {
    // floatValue = angka murni (tanpa titik), cocok untuk disimpan/dikirim ke server
    setValue(values.floatValue);
  };

  return { value, onValueChange };
}
