export const generateTableConfig = (dataMoM: unknown[]) => {
  if (!Array.isArray(dataMoM) || dataMoM.length === 0) {
    return { listBulan: [], columns: [], data: [] };
  }

  const formattedData = dataMoM as Record<string, unknown>[];
  const uniqueBulanSet = new Set<string>();

  formattedData.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (key.startsWith("bln_")) {
        uniqueBulanSet.add(key.replace("bln_", ""));
      }
    });
  });

  const listBulan = Array.from(uniqueBulanSet).sort();

  const columns = [
    { header: "Baseline (Des T-1)", accessor: "baseline", sticky: "left" as const, width: "150px" },
    ...listBulan.map((bulan) => ({
      header: bulan,
      accessor: `bln_${bulan}`,
      width: "100px",
    })),
    { header: "AVG", accessor: "avg", sticky: "right" as const, width: "100px" },
  ];

  return { listBulan, columns, data: formattedData };
};
