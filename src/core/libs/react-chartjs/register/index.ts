import { Chart as ChartJS, Legend, SubTitle, Title, Tooltip } from "chart.js";
import { CHART_PRESETS } from "../constants";

import type { ChartComponentLike } from "chart.js";
import type { PresetType } from "../types";

export interface RegisterChartsOptions {
  /** Komponen Chart.js tambahan di luar preset (mis. TimeScale). */
  extra?: ChartComponentLike[];
}

/**
 * Daftarkan komponen Chart.js berdasarkan satu atau beberapa preset tipe chart.
 * Title, Tooltip, Legend, dan SubTitle selalu ikut terdaftar.
 *
 * @example
 * registerCharts("line");
 * registerCharts(["bar", "pie"]);
 * registerCharts("line", { extra: [TimeScale] });
 */
export function registerCharts(presets: PresetType | PresetType[], options: RegisterChartsOptions = {}): void {
  const presetList = Array.isArray(presets) ? presets : [presets];
  const components = new Set<ChartComponentLike>([Title, Tooltip, Legend, SubTitle]);

  presetList.forEach((name) => {
    const preset = CHART_PRESETS[name];
    if (!preset) {
      console.warn(`[registerCharts] Preset tidak dikenal: "${name}"`);
      return;
    }
    components.add(preset.controller);
    preset.elements.forEach((element) => {
      components.add(element);
    });
    preset.scales.forEach((scale) => {
      components.add(scale);
    });
  });

  options.extra?.forEach((component) => {
    components.add(component);
  });

  ChartJS.register(...components);
}
