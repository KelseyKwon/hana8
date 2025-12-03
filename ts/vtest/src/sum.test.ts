import { describe, expect, test } from "vitest";
import { fetchUser, sum, sumId } from "./sum";
import { BRET } from "./data.test";

describe("sum - ", () => {
  test("sum - 3 with 1, 2", () => {
    const tot = sum(1, 2);
    expect(tot).toBe(3);
  });

  test("sum - 5 args", () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });

  test("sum - 0 with no args"),
    () => {
      expect(sum()).toBe(0);
    };
});

describe("sumId & fetchUser", () => {
  test("sumId - all"),
    async () => {
      const totId = await sumId();
      expect(totId).toBe(55);
    };

  test("fetchUser - 1", async () => {
    expect(await fetchUser(1)).toStrictEqual(BRET); // 방식 1
    // return expect(fetchUser(1)).resolves.toStrictEqual(BRET); //  방식2. - promise 방식 - return을 써야 경고가 안 뜬다.
  });
});
