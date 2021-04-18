import { getChangeClass, getChangeIntent } from "./index";

describe("getChangeClass", () => {
  test("0 should return an empty string", () => {
    const result = getChangeClass(0);
    expect(result).toBe("");
  });

  test("A positive number should return up", () => {
    const result = getChangeClass(1);
    expect(result).toBe("up");
  });

  test("A negative number should return down", () => {
    const result = getChangeClass(-5);
    expect(result).toBe("down");
  });

  test("undefined should return an empty string", () => {
    const result = getChangeClass(undefined);
    expect(result).toBe("");
  });
});

describe("getChangeIntent", () => {
  test("0 should return none", () => {
    const result = getChangeIntent(0);
    expect(result).toBe("none");
  });

  test("A positive number should return success", () => {
    const result = getChangeIntent(1);
    expect(result).toBe("success");
  });

  test("A negative number should return danger", () => {
    const result = getChangeIntent(-5);
    expect(result).toBe("danger");
  });

  test("undefined should return none", () => {
    const result = getChangeIntent(undefined);
    expect(result).toBe("none");
  });
});
