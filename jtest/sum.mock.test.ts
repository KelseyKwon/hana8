// sum.test.ts
// 모듈 단위로 mock을 만들 수 있기 때문에 디테일한 테스트를 할 수 있다.
import { sumId } from "./sum";

describe.only("sum", () => {
  // todo: remove when server api complete!
  // ToDo sdlfjdslfj
  beforeAll(() => {
    // mock 파일을 실행할때는 파일을 짝게 쪼개서 실행해야 한다.
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })),
    });
  });

  test("sumId", async () => {
    const totId = await sumId();
    expect(totId).toBe(55);
  });
});
