const hongx = { id: 1, name: "Hong", dept: "Server" };
const kimx = { id: 2, name: "Kim", dept: "Server" };
const leex = { id: 3, name: "Lee", dept: "Client" };
const users = [hongx, leex, kimx];

// prop : 찾을 키.
declare global {
  interface Array<T> {
    firstObject: T;
    lastObject: T;
    // mapBy: (prop: keyof T) => T[]; -> prop형태로 쓰는 것은 옛날 형태이다.
    mapBy(prop: keyof T): T[];
    // isIncludes에 초기값을 할당했으므로 optional로 할당!
    //   'id' | 'name'     T['id'] | T
    filterBy<K extends keyof T>(
      prop: K,
      value: T[K],
      isIncludes?: boolean
    ): T[];
    rejectBy<K extends keyof T>(
      prop: K,
      value: T[K],
      isIncludes?: boolean
    ): T[];
    findBy<K extends keyof T>(prop: K, value: T[K]): T;
    // sortBy(prop: keyof T | `${keyof T & string}:asc` | `${keyof T & string}:desc`): T[];
    sortBy(prop: keyof T | `${keyof T & string}:${"asc" | "desc"}`): T[];
    // keyof가 올 수 있는 타입을 명시하면 된다. => 미리 정의해놓은 곳이 있음
    // Partial : return이 빈 어레이 또는 객체가 될 수 있다. (optional이 붙음)
    groupByFn<K extends T[keyof T] & PropertyKey>(
      gfn: (a: T) => K
    ): Partial<Record<K, T[]>>;
    groupBy<K extends T[keyof T] & PropertyKey>(
      prop: keyof T
    ): Partial<Record<K, T[]>>;
  }
}

Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};
console.log(users.mapBy("id")); // [1, 3, 2];
console.log(users.mapBy("name")); // ['Hong', 'Lee', 'Kim']);

// 위에서 global에서 추론을 했으므로 따로 정의를 안해도 된다.
// Array.prototype.filterBy = function <T>(
//     prop: keyof T,
//     value: T[keyof T] & string,
//     isIncludes = false
// ) {
//     // callback의 타입을 정의해주면 -> 뒷 부분은 다 유추가 된다
//     const cb: (a: T) => boolean = isIncludes
//     ? (a) => typeof a[prop] === "string" && a[prop]?.includes(value)
//     : (a) => a[prop] === value;

//     return this.filter(cb);
// };
//==== generic을 안 쓰는 방법====//
Array.prototype.filterBy = function (prop, value, isIncludes = false) {
  return this.filter((a) =>
    isIncludes ? a[prop]?.includes(value) : a[prop] === value
  );
  // return type이 추론이 가능한데 boolean을 굳이 쓸 필요가 없다 => 그렇다고 void를 쓰면 안됨!
  //   const cb: (a: typeof this[number]) => boolean = isIncludes
  // ? a => a[prop]?.includes(value)
  // : a => a[prop] === value;
  // const cb = (a: typeof this[number]) =>
  //     isIncludes ? a[prop].includes(value) : a[prop] === value

  //   return this.filter(cb);
};

console.log(users.filterBy("id", 2)); // [kim]);
console.log(users.filterBy("name", "i", true)); // [kim]

Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
  //   const cb: (a: T) => boolean = isIncludes
  //     ? a => typeof a[prop] === 'string' && !a[prop]?.includes(value)
  //     : a => a[prop] !== value;

  //   return this.filter(cb);
  return this.filter((a) =>
    isIncludes ? !a[prop]?.includes(value) : a[prop] !== value
  );
};
console.log(users.rejectBy("id", 2)); // [hong, lee]
console.log(users.rejectBy("name", "i", true)); // [hong, lee]

//==========//
Array.prototype.findBy = function (prop, value) {
  return this.find((a) => a[prop] === value);
};
console.log(users.findBy("name", "Kim")); //  kim;

Array.prototype.sortBy = function (prop) {
  // name | name:desc | name:asc
  // const [key, direction = "asc"] = prop?.split(":");
  // includes :가 안되었을때 이미 끝나버림
  const [key, direction = "asc"] =
    typeof prop === "string" && prop.includes(":")
      ? prop.split(":")
      : [prop, "asc"];
  const dir = direction.toLowerCase() === "desc" ? -1 : 1;
  // console.log('🚀  dir:', dir, prop);
  return this.sort((a, b) => (a[key] > b[key] ? dir : -dir));
};
console.log(users.sortBy("name:desc")); //  [lee, kim, hong];
console.log(users.sortBy("name")); // [hong, kim, lee]

Array.prototype.groupBy = function <T, K extends T[keyof T] & PropertyKey>(
  prop: keyof T
) {
  // return type 일치시키기
  const ret: Partial<Record<K, T[]>> = {};
  for (const a of this) {
    const key: K = a[prop];
    ret[key] ||= [];
    ret[key].push(a);
  }

  return ret;
};
console.log(users.groupBy("dept"));

Array.prototype.groupByFn = function <T, K extends T[keyof T] & PropertyKey>(
  gfn: (a: T) => K
) {
  // return type 일치시키기
  const ret: Partial<Record<K, T[]>> = {};
  for (const a of this) {
    const k = gfn(a); // gfn이 리턴되는 것이 결국 k -> 추론이 가능하다.
    ret[k] ||= [];
    ret[k].push(a);
  }

  return ret;
};
console.log(users.groupByFn(({ dept }) => dept)); //Object.groupBy(users, cb)
// console.log(users.groupBy('dept'));

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(value) {
      this[0] = value;
      // this.with(0, value); // pure fn
    },
  },
  lastObject: {
    get() {
      return this.at([-1]);
    },
    set(value) {
      this[this.length - 1] = value;
      // this.with(-1, value);
    },
  },
});

/*
Server: [
  { id: 1, name: 'Hong', dept: 'Server' },
  { id: 2, name: 'Kim', dept: 'Server' },
],
Client: [
  { id: 3, name: 'Lee', dept: 'Client' }
],
*/

console.log("first/last=", users.firstObject.name, users.lastObject.name); // hong/lee
users.firstObject = kimx;
users.lastObject = hongx;
console.log("first/last=", users.firstObject.name, users.lastObject.name); // kim/hong
