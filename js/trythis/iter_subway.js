const assert = require("assert");

const LINE2 = [
  "신도림",
  "성수",
  "신설동",
  "용두",
  "신답",
  "용답",
  "시청",
  "충정로",
  "아현",
  "이대",
  "신촌",
  "공항철도",
  "홍대입구",
  "합정",
  "당산",
  "영등포구청",
  "문래",
  "대림",
  "구로디지털단지",
  "신대방",
  "신림",
  "봉천",
  "서울대입구",
  "낙성대",
  "사당",
  "방배",
  "서초",
  "교대",
  "강남",
  "역삼",
  "선릉",
  "삼성",
  "종합운동장",
  "신천",
  "잠실",
  "잠실나루",
  "강변",
  "구의",
  "건대입구",
  "뚝섬",
  "한양대",
  "왕십리",
  "상왕십리",
  "신당",
  "동대문역사문화공원",
  "을지로4가",
  "을지로3가",
  "을지로입구",
];

class Subway {
  // 외부에서 접근하지 못하게 private -> #을 붙여야 한다!
  #start;
  #end;
  #currIdx;
  constructor(start, end) {
    this.#start = start;
    this.#end = end;
    this.#currIdx = LINE2.indexOf(start); // 굳이 잡아야 할 필요가 있는가? -> 비교할떄 많이 쓰이지 않는다...
  }

  *[Symbol.iterator]() {
    // for (;;) -> 무한루프.
    /**
     * 왜 while true로 돌리는가?
     * => 경로 길이가 매번 다르고, 반복 횟수는 내부 로직이
     * 직접 판단해야 한다. => 도착역을 만나면 그때 반복을 멈춰야 한다!
     */
    while (true) {
      const nowStation = LINE2[this.#currIdx++];

      if (nowStation === this.#end) {
        yield nowStation; // 종착역 표시해야 함!
        // this.#currIdx = this.#startIdx;
        this.#currIdx = LINE2.indexOf(this.#start);
        break; // 종료
      }

      // 단방향 -> 한바퀴 다 돌았으면
      if (this.#currIdx === LINE2.length) this.#currIdx = 0;

      yield nowStation;
    }
  }

  // routes1.iterator() 라고 부를 수 있게 해준다. 
  iterator() {
    return this[Symbol.iterator]();
  }

  toString() {
    return `${this.#start}역에서 ${this.#end}역까지 가는 열차이며, 현재 ${
      LINE2[this.#currIdx]
    }역입니다`;
    // return `${this.#start}역에서 ${this.#end}역까지 가는 열차이며, 현재 ${LINE2[this.#currIdx]}역입니다`;
  }
}

//============TEST=============//
const routes1 = new Subway("문래", "신림");
console.log([...routes1]);
assert.deepStrictEqual(
  [...routes1],
  ["문래", "대림", "구로디지털단지", "신대방", "신림"]
);

const it1 = routes1.iterator();
["문래", "대림", "구로디지털단지", "신대방", "신림"].forEach((value, i) => {
  assert.deepStrictEqual(it1.next(), { value, done: false });
  console.log(i, routes1.toString());
});
assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

const routes2 = new Subway("구로디지털단지", "성수"); // 32개 정거장

routes2.iterator().next();
assert.strictEqual(
  routes2.toString(),
  "구로디지털단지역에서 성수역까지 가는 열차이며, 현재 신대방역입니다"
);
console.log([...routes2]); // ['신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();
while (true) {
  const x = it2.next();
  console.log(x);
  if (x.done) break;
}

const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
assert.strictEqual([...route3].length, 46);
const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
assert.strictEqual([...route4].length, 48);
/**
 * 내가 푼 거.

class Subway {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  // 경로 찾기
  get route() {
    const s = LINE2.indexOf(this.start);
    const e = LINE2.indexOf(this.end);

    // // 시작 or 도착이 존재 x -> 빈배열
    // 순환 노선도 지원이 되어야 한다.
    // if (s === -1 || e === -1) return [];

    // return LINE2.slice(s, e + 1);

    if (s === -1 || e === -1) return [];

    const result = [];

    let index = s;
    while (true) {
      result.push(LINE2[index]);
      if (index === e) break;
      index = (index + 1) % LINE2.length;
    }

    return result;
  }

  // iterator 구현
  [Symbol.iterator]() {
    const route = this.route;
    let index = 0;

    return {
      next() {
        if (index < route.length) {
          return { value: route[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  toString() {
    return this.route.join(" -> ");
  }
}

 */
