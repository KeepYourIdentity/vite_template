// import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { registerCharts } from "core/libs/react-chartjs/register";
import { Pie } from "react-chartjs-2";

import type { ChartPieProps } from "./ChartPie.types";

// Registrasi modul internal Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend);
registerCharts(["pie"]);

// // PENGATURAN WARNA CHART
const defaultBackgrounds = [
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(122, 255, 162, 0.7)",
  "rgba(255, 159, 64, 0.7)",
  "rgba(83, 73, 219, 0.7)",
];

const defaultBorders = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(122, 255, 162, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(83, 73, 219, 1)",
];

// //FUNGSI GENERATE WARNA CHART
// function generateChartColors(count: number) {
//   const backgrounds: string[] = [];
//   const borders: string[] = [];

//   for (let i = 0; i < count; i++) {
//     const r = ~~(Math.random() * 256);
//     const g = ~~(Math.random() * 256);
//     const b = ~~(Math.random() * 256);

//     // R, G, B
//     backgrounds.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
//     borders.push(`rgba(${r}, ${g}, ${b}, 1)`);
//   }

//   return { backgrounds, borders };
// }

export default function ChartPie({
  title,
  datasetLabel = "# of Votes",
  dataItems,
  width,
  height,
  legendPosition = "top",
}: ChartPieProps) {
  const chartData = {
    labels: dataItems.map((item) => item.label),
    datasets: [
      {
        label: datasetLabel,
        data: dataItems.map((item) => item.value),
        backgroundColor: dataItems.map(
          (item, index) => item.backgroundColor || defaultBackgrounds[index % defaultBackgrounds.length]
        ),
        borderColor: dataItems.map((item, index) => item.borderColor || defaultBorders[index % defaultBorders.length]),
        borderWidth: 1,
      },
    ],
  };

  // FUNGSI GENERATE WARNA CHART
  // const totalItems = dataItems?.length || 0;
  // const { backgrounds: defaultBackgrounds, borders: defaultBorders } = generateChartColors(totalItems);

  // const chartData = {
  //   labels: dataItems.map(item => item.label),
  //   datasets: [
  //     {
  //       label: datasetLabel,
  //       data: dataItems.map(item => item.value),
  //       backgroundColor: dataItems.map((item, index) => item.backgroundColor || defaultBackgrounds[index]),
  //       borderColor: dataItems.map((item, index) => item.borderColor || defaultBorders[index]),
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    // Diperlukan agar kanvas mematuhi tinggi & lebar yang diberikan via props
    maintainAspectRatio: !height && !width,
    plugins: {
      legend: {
        //Pengaturan posisi kotak petunjuk warna 'top', 'bottom', 'left', atau 'right'
        // position: 'right' as const,
        position: legendPosition,
        labels: {
          font: {
            family: "ui-sans-serif, system-ui, sans-serif",
          },
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
        },
        // onClick: () => {},
      },
    },
  };

  return (
    <div>
      {/* <div className="w-full max-w-fit mx-auto flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100"> */}
      {title && <h3 className="text-lg font-semibold text-slate-800 mb-4 tracking-tight">{title}</h3>}
      {/* Jika props width/height tidak diisi, ia akan otomatis mengikuti gaya default Tailwind */}
      <div
        style={{
          width: width ? `${width}px` : "320px",
          height: height ? `${height}px` : "320px",
        }}
        // className="flex items-center justify-center"
        className="xy-center"
      >
        <Pie data={chartData} options={options} width={width} height={height} />
      </div>
    </div>
  );
}
