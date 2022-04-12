import { extractDateAndTimeFromDate } from "../date";

describe("date", () => {
  test("extractDateAndTimeFromDate returns correct date", () => {
    const newDate = extractDateAndTimeFromDate("12-12-2022 12:12:45");

    expect(newDate).toStrictEqual({ date: "12-12-2022", time: "12:12:45" });
  });
});
