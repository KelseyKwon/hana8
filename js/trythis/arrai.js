const hong = { id: 1, name: "Hong" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users = [hong, kim, lee, park];

const find3 = (a) => a.id === 3;
const idxId2 = users.findIndex(find3);

// Try this: id가 전달 된 pid인 user를 반환하는 findId 함수를 작성하시오.
const findIdx = (pid) => () =>
  users.find((user) => {
    console.log(pid, user, user.id === pid);
    return user.id === pid;
  });
// const user1 = findId(1);
// console.log(user1, user1());
// const idxId11 = users.findLastIndex(findId(1));
// const idxId11 = users.findLastIndex(user => user.id === 1);
// const findId = pid => user => user.id === pid;
const findId =
  (pid) =>
  ({ id }) =>
    id === pid;
const idxId11 = users.findLastIndex(findId(1));
// const idxId11 = users.findLastIndex(a => a.id === 1);
// console.log(users);
console.log("🚀  idxId11:", idxId11);

// index는 0, 1, 2, 3, 4
const arr = Array.from({ length: 5 }, (_, i) => i + 1);
const isEven = (n) => n % 2 === 0;
const ev1 = arr.map((_, i) => isEven(i));
console.log("🚀 ~ ev1:", ev1); // arr의 개수만큼 항상 ,return 함 -> true, false
// const ev2 = arr.map(a => isEven(i)); // 받는거하고 주는 것이 똑같으면 생략
const ev2 = arr.map(isEven); // 받는거하고 주는 것이 똑같으면 생략
console.log("🚀 ~ ev2:", ev2);

const onlyEvens = arr.filter(isEven); // 짝수인 원소만 return 한다.
console.log("🚀 ~ onlyEvens:", onlyEvens);

/**
 * forEach : 100만개의 원소가 있을떄 -> 중간에 break를 할 수가 없다.
 * 하지만 for a of -> 중간에 break를 할 수 있다. (큰 장점)
 */
arr.forEach((a) => console.log(a, isEven(a)));

for (let i = 0; i < arr.length; i++) console.log(arr[i], isEven(arr[i])); // 잘 안쓴다. 이것대신에 forEach를 더 많이 쓴다.
// iterator로 처리하면 더 가볍다 -> 100만개가 있어도 1개씩 처리한다.
for (const a of arr) {
  console.log(a, isEven(a)); // 성능을 요구할 떄 이것을 쓴다.
  if (a === 3) break;
}

const arr2 = [...arr]; // arr이 다 펼쳐질때까지 -> 메모리 전체를 다 return한다.
console.log("🚀 ~ arr2:", arr2 === arr); // stack에 있는 값은 메모리의 주소 -> 항상 false를 return한다.
const arr3 = arr2.concat(arr); // 새로운 메모리를 할당된다 -> arr이랑 arr2를 합친다.
console.log("🚀 ~ arr3:", arr3);
const arr4 = [...arr2, ...arr]; // concat이랑 같은 방법 -> concat보다 더 직관적인 방법!
console.log("🚀 ~ arr4:", arr4);

//=======find==========//
const a3 = arr.find((a) => a === 3);
console.log("🚀 ~ a3:", a3); // 4, 5는 안돈다. 3이 true이면 중단. findLast는 뒤에서부터 찾음.
const evenOdds = Object.groupBy(arr, (a) => (isEven(a) ? "even" : "odd")); // 배열도 object -> groupby가 됨.
console.log("🚀 ~ evenOdds:", evenOdds);
// const jarr = arr.join(); // 원소들이 합쳐져서 string으로 만들어진다
const jarr = arr.join(", ");
console.log("🚀 ~ jarr:", jarr);

const a = [1, 2, 3, 4, 5, 6, 7];
a.copyWithin(4, 2, 4);
let b = a;
b.push("02", "01", "03", "a", "c", "b", "ab");
const s1 = b.sort(); // sort함수가 a도 변형시킨다.
console.log("🚀 ~ s1:", s1);
b = a;
const s2 = b.sort((a, b) => a - b);
console.log("🚀 ~ s2:", s2);
b = a;
const s3 = b.sort((a, b) => (a > b ? 1 : -1));
console.log("🚀 ~ s3:", s3);
b = a;
const s4 = b.sort((a, b) => (a < b ? -1 : 1));
console.log("🚀 ~ s4:", s4);

//========객체 정렬==========//
[users[1], users[2]] = [users[2], users[1]]; // swap
console.log(users);
const us1 = users.sort(({ id }, { id: id2 }) => id - id2); // 첫번쨰 유저 / 두번째 유저
console.log("🚀 ~ us1:", us1);
console.log("------------------", arr2);
// shallow copy
const shallow = arr2.slice();
console.log("🚀 ~ shallow:", shallow);
const shallow2 = [...arr2];
console.log("🚀 ~ shallow2:", shallow2);
console.log("------------------", arr2);
// [1, 2, 3, 4, 5]
// [ 0, 1, 2, 3, 4 ]
// 2 ,3, 4 없애기
const sp1 = arr2.splice(1, 3);
console.log("🚀 ~ sp1:", sp1, arr2);
// 복원하기
arr2.splice(1, 0, ...sp1);
console.log(arr2);
// 2부터 끝까지
const sp2 = arr2.splice(2);
console.log("🚀 ~ arr2:", arr2);
arr2.splice(2, 0, ...sp2);
console.log("🚀 ~ arr2:", arr2);
