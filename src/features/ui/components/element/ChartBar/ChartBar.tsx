import { registerCharts } from "core/libs/react-chartjs/register";
import { Bar } from "react-chartjs-2";

import type { ChartOptions, TooltipItem } from "chart.js";
import type { MyBarChartProps } from "./ChartBar.types";

registerCharts(["bar"]);

export default function BarChartCustom({
  title,
  dataset,
  xField,
  series,
  // width = 400,
  // height = 300,
  showLegend = true,
  legendPosition,
  yMin,
  yMax,
  yStepSize,
  showYGrid,
  showXGrid,
  backgroundColor = ["#3B82F6", "#FB923C", "#22C55E", "#EF4444", "#8B5CF6", "#06B6D4"],
  valueFormatter = (value) => value.toString(),
  // barWidth,
}: MyBarChartProps) {
  // Membuat label sumbu X
  const labels = dataset.map((item) => item[xField]);

  // Membuat dataset Chart.js
  const datasets = series.map((item, index) => ({
    label: item.label,
    data: dataset.map((row) => row[item.dataKey]),
    backgroundColor: (backgroundColor as string[])[index] ?? "#3b82f6",
    // barThickness: barWidth,
  }));

  // Opsi Chart.js
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      title: {
        display: !!title,
        text: title,
      },

      legend: {
        display: showLegend,
        position: legendPosition,

        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 8,
          boxHeight: 8,
          padding: 10,
          color: "#101111", // gray-500
          // font: {
          // 	size: 11,
          // },
        },

        // onClick: () => {  },
      },

      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,

        callbacks: {
          label(context: TooltipItem<"bar">) {
            const label = context.dataset.label ?? "";
            const value = context.parsed.y ?? 0;

            return `${label}: ${valueFormatter(value)}`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: showXGrid,
        },
        ticks: {
          color: "#101111", // gray-500
          stepSize: yStepSize,
          font: {
            size: 11,
          },
        },
      },

      y: {
        min: yMin,
        max: yMax,

        ticks: {
          color: "#101111", // gray-500
          stepSize: yStepSize,
          font: {
            size: 11,
          },
        },

        grid: {
          display: showYGrid,
        },
      },
    },
  };
  // Data Chart.js
  const data = {
    labels,
    datasets,
  };

  return (
    // <div
    // 	style={{
    // 		width,
    // 		height,
    // 	}}
    // >
    // <div className="w-full h-75">
    <Bar options={options} data={data} />
    // </div>
    // </div>
  );
}
