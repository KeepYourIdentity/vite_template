type IParam = Date | string | number;

const DAY_MS: number = 864e5;

export const getDaysDiff = (start: IParam, end: IParam = new Date()): number =>
  Math.trunc((new Date(end).getTime() - new Date(start).getTime()) / DAY_MS);
