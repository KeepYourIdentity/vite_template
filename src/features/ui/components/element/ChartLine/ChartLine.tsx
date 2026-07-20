import { registerCharts } from "core/libs/react-chartjs/register";
import { Line } from "react-chartjs-2";

import type { ChartOptions, ScriptableContext, ScriptableLineSegmentContext } from "chart.js";
import type { ChartLineProps } from "./ChartLine.types.ts";

// Registrasi elemen ChartJS
registerCharts(["line"]);

export default function ChartLine({
  legend = false,
  titleText,
  titleColor = "#3a3d41",
  titleWeight = "normal",
  titleSize = 16,
  yMax,
  xData,
  yStepSize,
  yFontSize = 11,
  datasets = [],
  yUnit,
}: ChartLineProps) {
  // Opsi konfigurasi Chart.js
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: legend,
      },
      title: {
        display: true,
        text: titleText,
        color: titleColor,
        font: {
          size: titleSize,
          weight: titleWeight,
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: yMax,
        ticks: {
          stepSize: yStepSize,
          color: "#101111",
          font: {
            size: yFontSize,
          },
          callback: (value) => value + (yUnit ?? ""),
        },
        grid: {
          display: true,
        },
        border: {
          display: true,
        },
      },
      x: {
        ticks: {
          color: "#101111",
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: true,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 10,
        bottom: 10,
      },
    },
  };

  const labels = xData;

  // Dataset angka perkiraan (Sumbu Y)
  const data = {
    labels,
    datasets: datasets.map((ds) => {
      const {
        label,
        yData,
        lineColor = "#60a5fa",
        projectionStartIndex,
        projectionColor = "#bfdbfe",
        defaultColor = "#60a5fa",
        pointColorThresholdIndex,
      } = ds;

      const thresholdIndex = pointColorThresholdIndex ?? projectionStartIndex;

      return {
        label,
        data: yData,
        borderColor: lineColor,
        backgroundColor: lineColor,
        borderWidth: 3,
        pointBackgroundColor: lineColor,
        pointBorderColor: (context: ScriptableContext<"line">) => {
          if (thresholdIndex !== undefined && context.dataIndex >= thresholdIndex) {
            return projectionColor;
          }
          return lineColor;
        },
        pointBorderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0,
        segment: {
          borderColor: (context: ScriptableLineSegmentContext) => {
            if (projectionStartIndex !== undefined && context.p0DataIndex >= projectionStartIndex - 1) {
              return projectionColor;
            }
            return defaultColor;
          },
        },
      };
    }),
  };

  return <Line options={options} data={data} />;
}
