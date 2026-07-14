type ParamState = Date | string | number;
type Condition = "NUMBER" | "VERBOSE";
type MsgDaysDiffResult = "invalid-date" | "negative-diff" | "same-day" | "one-day" | "within-a-week" | "within-a-month" | "within-a-year" | "more-than-a-year" | "number";
type DaysDiffResult = [number, MsgDaysDiffResult];

const DAY_MS = 864e5;

export const getDaysDiff = (start: ParamState, end: ParamState = new Date(), condition: Condition = "NUMBER"): DaysDiffResult => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (Number.isNaN(startTime) || Number.isNaN(endTime)) {
    return [0, "invalid-date"];
  }

  const diff = Math.trunc((endTime - startTime) / DAY_MS);

  if (condition === "NUMBER") return [diff, "number"];
  if (diff < 0) return [0, "negative-diff"];
  if (diff === 0) return [0, "same-day"];
  if (diff === 1) return [1, "one-day"];
  if (diff > 1 && diff <= 7) return [diff, "within-a-week"];
  if (diff > 7 && diff <= 30) return [Math.trunc(diff / 7), "within-a-month"];
  if (diff > 30 && diff <= 365) return [Math.trunc(diff / 30), "within-a-year"];

  return [Math.trunc(diff / 365), "more-than-a-year"]
};
