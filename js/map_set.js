const hong = { id: 1, name: "Hong" };
const map = new Map([
  [1, 11],
  [2, 22],
]);
map.set("three", 333); // { three: 333 }
map.set("four", [1, 2, 3, 4]); // { four: [1,2, 3, 4] }
map.set(hong.name, hong);
map.set(hong, hong.name);
console.log("🚀 ~ map:", map);
console.log(map); // Map(6) {  1 => 11, 2 => 22, 'three' => 333, 'four' => [ 1, 2, 3, 4 ],    ?, ?}
console.log(map.get(hong)); // 'Hong'
// hong = null;
console.log(map.get(hong)); // 'Hong'
map.delete(hong); // console.log(hong?.name); // ?  ⇒ hong = null; console.log(map); // ?
console.log("hasHong=", map.has(hong)); // ?
console.log("hasHongName=", map.has(hong?.name)); // ?
map.clear();

map.set(1, 11).set(2, 22).set(3, 33); // ⇐⇒ new Map([[1, 11], [2, 22], [3, 33]);
map.entries(); // key, value가 2차원으로 넘어온다.
map.keys();
map.values(); // { [ 1, 11 ], [ 2, 22 ], … };  { 1, 2, … };  { 11, 22, … }
const map2 = new Map([...map]); // Map(2) { 1 => 11, 2 => 22, 3 => 33 }
const map3 = new Map([...map, ...map2]); // Map(2) { 1 => 11, 2 => 22, 3 => 33 }

console.log("-----------------------");
let kim = { id: 2, name: "Kim" };
const wmap = new WeakMap();
// wmap.set(1, 22); // error가 난다. => primitive가 key로 들어가면 안됨!?
wmap.set(new Number(1), 11);
wmap.set(kim, kim.name);
console.log("🚀 ~ wmap:", wmap);
console.log("🚀 ~ wmap:", wmap.has(new Number(1)));
kim = null;
console.log("🚀 ~ wmap:", wmap.has(kim)); // null의 주소로 바뀜 -> heap에 없음
