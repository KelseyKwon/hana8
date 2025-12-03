import { isDeepStrictEqual } from "util";
import { fetchUser, sum, sumId } from "./sum";

const BRET = { id: 1, username: "Bretx" };

describe("mock - fetchUser", async () => {
  // 테스트 하기 전에 한번만 실행됨.
  // mock을 하기 위한 setup
  beforeAll(() => {
    // sum, fetchuser을 임포트 한 것처럼 보인다.
    vi.mock("./sum", () => ({
      sum: vi.fn(),
      fetchUser: vi.fn(),
    })); // module 단위로 mock을 한다. mock은 반드시 객체를 리턴해야 한다!

    // mocked -> mock이 된 놈을 가져온다.
    const sumX = vi.mocked(sum);
    // sumX.mockReturnValue(3); // 뭘 하든 3으로 리턴하기
    sumX.mockImplementation((...args: number[]) => {
      //   if (args[0] === 1 && args[1] === 2) return 3;
      //   if (args[0] === 10 && args[1] === 2) return 12;

      // arguments마다 다르게 세팅
      if (isDeepStrictEqual(args, [1, 2])) return 3;
      if (isDeepStrictEqual(args, [10, 2])) return 12;
      if (isDeepStrictEqual(args, [1, 2, 3, 4, 5])) return 15;
      return 0; // undefined일때는 0을 리턴
    });

    vi.mocked(fetchUser).mockResolvedValue(BRET);
  });
  test("sum - 3 with 1, 2", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("sum - 12 with 10, 2", () => {
    expect(sum(10, 2)).toBe(12);
  });
  test("sum - 15 with 5 args", () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });

  test("fetchUser", async () => {
    const user = await fetchUser(1);
    expect(user).toStrictEqual(BRET);
  });
});
