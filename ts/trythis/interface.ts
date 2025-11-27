interface User {
  id: number;
  name: string;
}

interface Dept {
  id: number;
  dname: string;
  captain: string;
}

// UdT의 문제점 : User 또는 Dept을 상속 받을 수 없다 -> 하나만 상속받을 수 없다! (모호한 것이 문제점)
// type UdT = (User | Dept) & { addr: string };
type UdT = User & Dept;
type XX = { [k in (keyof User) | (keyof Dept)]: string | number };
// interface Ud2 extends UdT{ //이거는 왜 답이 아니냐?
// interface Ud2 extends Partial<UdT>{ // partial은 모든 것을 optional로 만들어준다. -> 하지만 이것의 문제점 : 모든 것 (id까지도) optional로 만들어버린다.
interface Ud2 {
  // <이 부분을 작성하시오>
  id: number;
  name?: string;
  dname?: string;
  captain?: string;
//   [x: string]: number | string | undefined;
  addr: string;
}

// type만 쓰는 방법

// 다음 코드가 오류가 없으면 통과!
const ud2: Ud2 = { id: 1, name: "HH", addr: "Seoul" };
console.log("🚀 ~ ud2:", ud2)
const ud3: Ud2 = { id: 1, dname: "HH", captain: "HH", addr: "Seoul" };
console.log("🚀 ~ ud3:", ud3)
