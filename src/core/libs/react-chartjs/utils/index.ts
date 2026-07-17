/** Ubah "rgb(r, g, b)" menjadi "rgba(r, g, b, alpha)". String lain dikembalikan apa adanya. */
export function withAlpha(rgbColor: string, alpha: number): string {
  if (!rgbColor.startsWith("rgb(")) return rgbColor;
  return rgbColor.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}
