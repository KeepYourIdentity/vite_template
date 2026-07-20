import { useState } from "react";

export const useFilterPeriode = () => {
  const [filterPeriode, setFilterPeriode] = useState<string>(new Date().toISOString().slice(0, 7).replace("-", ""));

  return {
    filterPeriode,
    setFilterPeriode,
  };
};
